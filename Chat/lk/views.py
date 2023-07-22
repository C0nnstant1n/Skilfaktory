from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import DetailView, CreateView
from .models import LkUser
from .forms import EditLkForm


def index(request):
    return render(request, 'messenger/lk.html')


class LkView(DetailView):
    model = LkUser
    template_name = 'messenger/lk.html'
    context_object_name = 'lk'


class EditLk(CreateView):
    model = LkUser
    form_class = EditLkForm
    template_name = 'lk/editlk.html'
    success_url = reverse_lazy
