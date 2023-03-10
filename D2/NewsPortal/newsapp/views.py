# from django.shortcuts import render
from django.core.exceptions import ValidationError
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import Post
from .filters import PostFilter
from .forms import NewsForm, ArticleForm
from django.urls import reverse_lazy


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


class CreatePost(CreateView):
    form_class = NewsForm
    model = Post
    template_name = 'edit.html'

    def form_valid(self, form):
        post = form.save(commit=False)
        post.type = 'NE'
        return super().form_valid(form)


class EditPost(UpdateView):
    form_class = NewsForm
    model = Post
    template_name = 'edit.html'

    def form_valid(self, form):
        post = form.save(commit=False)
        if post.type != 'NE':
            raise ValidationError('you can`t change type of news')
        post.type = 'NE'
        return super().form_valid(form)


class CreateArticle(CreateView):
    form_class = ArticleForm
    model = Post
    template_name = 'edit.html'

    def form_valid(self, form):
        post = form.save(commit=False)
        post.type = 'AR'
        return super().form_valid(form)


class EditArticle(UpdateView):
    form_class = ArticleForm
    model = Post
    template_name = 'edit.html'

    def form_valid(self, form):
        post = form.save(commit=False)
        if post.type != 'AR':
            raise ValidationError('you can`t change type of articles')
        post.type = 'AR'
        return super().form_valid(form)


class DeletePost(DeleteView):
    model = Post
    template_name = 'delete.html'
    success_url = reverse_lazy('posts')
