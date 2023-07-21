from django.shortcuts import render
from django.views.generic import DetailView, TemplateView
from .models import LkUser


def index(request):
    return render(request, 'messenger/lk.html')


class LkView(DetailView):
    model = LkUser
    template_name = 'messenger/lk.html'
    context_object_name = 'lk'
    queryset = LkUser.objects.all()
