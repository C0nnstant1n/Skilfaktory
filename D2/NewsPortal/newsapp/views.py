from django.shortcuts import render
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .filters import PostFilter
from .forms import NewsForm, ArticleForm, CommentForm
from django.urls import reverse_lazy
from django.contrib.auth.mixins import PermissionRequiredMixin, LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.db.models import Exists, OuterRef
from django.views.decorators.csrf import csrf_protect
from django.utils import timezone
import pytz     # импортируем стандартный модуль для работы с часовыми поясами
from django.shortcuts import redirect
import logging
from .serializers import *
from rest_framework import viewsets
from .models import *

logger = logging.getLogger(__name__)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class PostsList(ListView):
    # Указываем модель, объекты которой мы будем выводить
    model = Post
    # Поле, которое будет использоваться для сортировки объектов
    ordering = '-post_date'
    # Указываем имя шаблона, в котором будут все инструкции о том,
    # как именно пользователю должны быть показаны наши объекты
    template_name = 'news.html'
    # Это имя списка, в котором будут лежать все объекты.
    # Его надо указать, чтобы обратиться к списку объектов в html-шаблоне.
    context_object_name = 'posts'
    paginate_by = 3

    def __init__(self):
        super().__init__()
        self.filterset = None

    def get_queryset(self):
        queryset = super().get_queryset()
        self.filterset = PostFilter(self.request.GET, queryset)
        return self.filterset.qs

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)
        context['current_time'] = timezone.localtime()
        context['timezones'] = pytz.common_timezones  # добавляем в контекст все доступные часовые пояса
        context['filterset'] = self.filterset
        return context

    #  по пост-запросу будем добавлять в сессию часовой пояс, который и будет обрабатываться
    #  написанным нами ранее middleware
    def post(self, request):
        request.session['django_timezone'] = request.POST['timezone']
        return redirect('/news')


class CommentCreate(LoginRequiredMixin, CreateView):
    raise_exception = True
    form_class = CommentForm
    model = Comment
    template_name = 'create.html'

    def form_valid(self, form):
        # Добавляем автора к создаваемому посту
        form.instance.user = self.request.user  # сохраняем пользователя как Автора
        # Определяем для какой статьи пишется комментарий
        form.instance.post = Post.objects.get(id=int(self.kwargs['pk']))
        return super().form_valid(form)


class PostDetail(DetailView):
    model = Post
    template_name = 'post.html'
    context_object_name = 'post'
    queryset = Post.objects.all()

    def get_object(self, *args, **kwargs):  # переопределяем метод получения объекта, как ни странно
        obj = cache.get(f'post-{self.kwargs["pk"]}', None)
        # Кэш очень похож на словарь, и метод get действует так же. Он забирает значение по ключу,
        # если его нет, то забирает None.

        # если объекта нет в кэше, то получаем его и записываем в кэш
        if not obj:
            obj = super().get_object(queryset=self.queryset)
            cache.set(f'post-{self.kwargs["pk"]}', obj)
        return obj

    def get_context_data(self, date='-time', **kwargs):
        context = super().get_context_data(**kwargs)
        context['comments'] = Comment.objects.order_by(date).filter(post=self.kwargs['pk'])
        context['number_comments'] = len(context['comments'])
        return context


class Search(PostsList):
    template_name = 'search.html'


class CreatePost(PermissionRequiredMixin, CreateView):
    permission_required = ('newsapp.add_post',)
    raise_exception = True
    form_class = NewsForm
    model = Post
    template_name = 'create.html'

    def form_valid(self, form):
        single_post = form.save(commit=False)
        single_post.type = 'NE'
        author = Author.objects.get(user=self.request.user)  # сохраняем пользователя как Автора
        single_post.author = author
        # Добавляем автора к создаваемому посту
        return super().form_valid(form)


class EditPost(PermissionRequiredMixin, UpdateView):
    permission_required = ('newsapp.change_post',)
    raise_exception = True
    form_class = NewsForm
    model = Post
    template_name = 'edit.html'

    def form_valid(self, form):
        single_post = form.save(commit=False)
        single_post.type = 'NE'
        return super().form_valid(form)


class CreateArticle(PermissionRequiredMixin, CreateView):
    permission_required = ('newsapp.add_post',)
    raise_exception = True
    form_class = ArticleForm
    model = Post
    template_name = 'create.html'

    def form_valid(self, form):
        single_post = form.save(commit=False)
        single_post.type = 'AR'
        author = Author.objects.get(user=self.request.user)
        single_post.author = author
        return super().form_valid(form)


class EditArticle(PermissionRequiredMixin, UpdateView):
    permission_required = ('newsapp.change_post',)
    form_class = ArticleForm
    model = Post
    template_name = 'edit.html'

    def form_valid(self, form):
        single_post = form.save(commit=False)
        single_post.type = 'AR'
        return super().form_valid(form)


class DeletePost(PermissionRequiredMixin, DeleteView):
    permission_required = ('newsapp.delete_post',)
    model = Post
    template_name = 'delete.html'
    success_url = reverse_lazy('posts')


@login_required
@csrf_protect
def subscriptions(request):
    if request.method == 'POST':
        category_id = request.POST.get('category_id')
        category = Category.objects.get(id=category_id)
        action = request.POST.get('action')

        if action == 'subscribe':
            Subscriber.objects.create(user=request.user, category=category)
        elif action == 'unsubscribe':
            Subscriber.objects.filter(
                user=request.user,
                category=category,
            ).delete()

    categories_with_subscriptions = Category.objects.annotate(
        user_subscribed=Exists(
            Subscriber.objects.filter(
                user=request.user,
                category=OuterRef('pk'),
            )
        )
    ).order_by('category_name')
    return render(
        request,
        'subscriptions.html',
        {'categories': categories_with_subscriptions},
    )


def clear_cache(request):
    logger.info(f"Redirect to - {request.headers['Referer']}")
    cache.clear()
    return redirect(request.headers['Referer'])
