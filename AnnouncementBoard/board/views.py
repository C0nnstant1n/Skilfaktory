from django.shortcuts import render
from django.views.generic import (
    ListView,
    DetailView,
    CreateView,
    UpdateView,
    DeleteView
)
from .models import Advert, Reply
from django.http import HttpResponse
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms import AdvertForm, ReplyForm
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from .filters import ReplyFilter


def index(request):
    return render(request, 'board/index.html')


class AdvertList(ListView):
    # Указываем модель, объекты которой мы будем выводить
    model = Advert
    # Указываем имя шаблона, в котором будут все инструкции о том,
    # как именно пользователю должны быть показаны наши объекты
    template_name = 'board/adverts.html'
    # Это имя списка, в котором будут лежать все объекты.
    # Его надо указать, чтобы обратиться к списку объектов в html-шаблоне.
    context_object_name = 'adverts'
    paginate_by = 5


class AdvertDetail(DetailView):
    model = Advert
    template_name = 'board/advert.html'
    context_object_name = 'advert'

    def get_context_data(self, date='-time', **kwargs):
        context = super().get_context_data(**kwargs)
        return context

    def get_content(self):
        return HttpResponse(self.model.content)


class CreateAdvert(LoginRequiredMixin, CreateView):

    form_class = AdvertForm
    model = Advert
    template_name = 'board/create.html'

    def form_valid(self, form):
        single_post = form.save(commit=False)
        author = User.objects.get(username=self.request.user)  # сохраняем пользователя как Автора
        single_post.author = author
        # Добавляем автора к создаваемому посту
        return super().form_valid(form)


class EditAdvert(LoginRequiredMixin, UpdateView):
    form_class = AdvertForm
    model = Advert
    template_name = 'board/edit.html'


class DeleteAdvert(LoginRequiredMixin, DeleteView):
    model = Advert
    template_name = 'board/delete.html'
    success_url = reverse_lazy('adverts')


class ReplyAdvert(LoginRequiredMixin, CreateView):
    model = Reply
    form_class = ReplyForm
    template_name = 'board/reply.html'

    def form_valid(self, form):
        # Добавляем автора к создаваемому отклику
        form.instance.author = self.request.user  # сохраняем пользователя как Автора
        # Определяем для какой статьи пишется комментарий
        form.instance.advert = Advert.objects.get(id=int(self.kwargs['pk']))
        return super().form_valid(form)


class RepliesList(LoginRequiredMixin, ListView):
    model = Reply
    template_name = 'board/replies.html'
    context_object_name = 'replies'
    paginate_by = 5

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['filter'] = self.filterset
        return context

    def get_queryset(self, **kwargs):
        # так как мы должны получать отклики только на свои объявления
        # переопределим queryset
        queryset = Reply.objects.filter(advert__author=self.request.user)
        # отправляем request для определения текущего пользователя
        self.filterset = ReplyFilter(self.request.GET, queryset, request=self.request)
        return self.filterset.qs
