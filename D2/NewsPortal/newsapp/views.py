from django.shortcuts import render
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import Post, Author, Category, Subscriber
from .filters import PostFilter
from .forms import NewsForm, ArticleForm
from django.urls import reverse_lazy
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.contrib.auth.decorators import login_required
from django.db.models import Exists, OuterRef
from django.views.decorators.csrf import csrf_protect


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

    def get_queryset(self):
        queryset = super().get_queryset()
        self.filterset = PostFilter(self.request.GET, queryset)
        return self.filterset.qs

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['filterset'] = self.filterset
        return context


class PostDetail(DetailView):
    model = Post
    template_name = 'post.html'
    context_object_name = 'post'


class Search(PostsList):
    template_name = 'search.html'


class CreatePost(PermissionRequiredMixin, CreateView):
    permission_required = ('newsapp.add_post',)
    raise_exception = True
    form_class = NewsForm
    model = Post
    template_name = 'create.html'

    def form_valid(self, form):
        post = form.save(commit=False)
        post.type = 'NE'
        author = Author.objects.get(user=self.request.user)     # сохраняем пользователя как Автора
        post.author = author                                    # Добавляем автора к создаваемому посту
        return super().form_valid(form)


class EditPost(PermissionRequiredMixin, UpdateView):
    permission_required = ('newsapp.change_post',)
    raise_exception = True
    form_class = NewsForm
    model = Post
    template_name = 'edit.html'

    def form_valid(self, form):
        post = form.save(commit=False)
        post.type = 'NE'
        return super().form_valid(form)


class CreateArticle(PermissionRequiredMixin, CreateView):
    permission_required = ('newsapp.add_post',)
    form_class = ArticleForm
    model = Post
    template_name = 'create.html'

    def form_valid(self, form):
        post = form.save(commit=False)
        post.type = 'AR'
        author = Author.objects.get(user=self.request.user)
        post.author = author
        return super().form_valid(form)


class EditArticle(PermissionRequiredMixin, UpdateView):
    permission_required = ('newsapp.change_post',)
    form_class = ArticleForm
    model = Post
    template_name = 'edit.html'

    def form_valid(self, form):
        post = form.save(commit=False)
        post.type = 'AR'
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
