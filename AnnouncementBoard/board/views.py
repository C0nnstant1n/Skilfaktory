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
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import redirect
from django.core.mail import send_mail


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
    ordering = '-date'


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
        user = form.instance.advert.author
        send_mail(
            subject=f'Новый отклик на ваше объявление',
            message=f'Пользователь {self.request.user} откликнулся на ваше объявление "{form.instance.advert.title}"',
            from_email=None,  # будет использовано значение DEFAULT_FROM_EMAIL
            recipient_list=[user.email],
        )
        return super().form_valid(form)


class RepliesList(LoginRequiredMixin, ListView):
    model = Reply
    template_name = 'board/replies.html'
    context_object_name = 'replies'
    ordering = '-advert__date'

    def __init__(self):
        super().__init__()
        self.filterset = None

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['filter'] = self.filterset
        return context

    def get_queryset(self, **kwargs):
        queryset = super().get_queryset()
        # отправляем request для определения текущего пользователя
        self.filterset = ReplyFilter(self.request.GET, queryset, request=self.request)
        return self.filterset.qs


class DeleteReply(LoginRequiredMixin, DeleteView):
    model = Reply
    template_name = 'board/delete.html'
    success_url = reverse_lazy('replies')


@login_required
@csrf_protect
def confirm_reply(request):
    if request.method == 'POST':
        reply_id = request.POST.get('reply_id')
        reply = Reply.objects.get(id=reply_id)
        action = request.POST.get('action')

        if action == 'confirm':
            reply.status = True
            reply.save()
            user = reply.author
            send_mail(
                subject=f'Новый отклик на ваше объявление',
                message=f'Пользователь {request.user} принял ваш отклик "{reply.text[:20]}"',
                from_email=None,  # будет использовано значение DEFAULT_FROM_EMAIL
                recipient_list=[user.email],
            )
    return redirect('replies')
