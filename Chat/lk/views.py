from django.shortcuts import render
from django.views.generic import DetailView, TemplateView
from .models import LkUser


class HomeView(TemplateView):
    template_name = 'lk.html'


class LkView(DetailView):
    model = LkUser
    template_name = 'lk.html'
    context_object_name = 'lk'
    queryset = LkUser.objects.all()
