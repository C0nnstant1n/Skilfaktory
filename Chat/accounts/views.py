from django.urls import reverse_lazy
from django.views.generic import DetailView
from django.views.generic.edit import CreateView, UpdateView
from .models import User
from .forms import SignUpForm, EditForm


class LkView(DetailView):
    model = User
    template_name = 'accounts/profile.html'
    context_object_name = 'user'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['avatar'] = '1'
        return context


class SignUp(CreateView):
    form_class = SignUpForm
    success_url = '/accounts/login'
    template_name = 'accounts/signup.html'


class EditUser(UpdateView):
    model = User
    form_class = EditForm
    template_name = 'accounts/edit.html'
    success_url = reverse_lazy
