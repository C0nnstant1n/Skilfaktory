from django.shortcuts import render
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import Category, Author, Advert
from django.utils import timezone
from django.views.decorators.csrf import csrf_protect
from .filter import AdvertFilter
from django.http import HttpResponse


def index(request):
    return render(request, 'board/index.html')


class AdvertList(ListView):
    # Указываем модель, объекты которой мы будем выводить
    model = Advert
    # Поле, которое будет использоваться для сортировки объектов
    ordering = '-date'
    # Указываем имя шаблона, в котором будут все инструкции о том,
    # как именно пользователю должны быть показаны наши объекты
    template_name = 'board/adverts.html'
    # Это имя списка, в котором будут лежать все объекты.
    # Его надо указать, чтобы обратиться к списку объектов в html-шаблоне.
    context_object_name = 'adverts'
    paginate_by = 3

    def __init__(self):
        super().__init__()
        self.filterset = None

    def get_queryset(self):
        queryset = super().get_queryset()
        self.filterset = AdvertFilter(self.request.GET, queryset)
        return self.filterset.qs

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['current_time'] = timezone.localtime()
        context['filterset'] = self.filterset
        return context


class AdvertDetail(DetailView):
    model = Advert
    template_name = 'board/advert.html'
    context_object_name = 'advert'
    # queryset = Advert.objects.all()

    def get_context_data(self, date='-time', **kwargs):
        context = super().get_context_data(**kwargs)
        return context

    def get_content(self,  **kwargs):
        return HttpResponse(self.model.text)
