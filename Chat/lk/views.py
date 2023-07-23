from django.urls import reverse_lazy
from django.views.generic import DetailView
from django.views.generic.edit import CreateView, UpdateView
from django.contrib.auth.models import User
from .models import UserAvatar
from .forms import SignUpForm, EditForm


class LkView(DetailView):
    model = User
    template_name = 'lk/lk.html'
    context_object_name = 'user'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['avatar'] = UserAvatar.objects.get(user=self.request.user).avatar
        return context


class SignUp(CreateView):
    model = User
    form_class = SignUpForm
    success_url = 'accounts/login'
    template_name = 'lk/signup.html'


class EditUser(UpdateView):
    model = User
    form_class = EditForm
    template_name = 'lk/edit.html'
    success_url = reverse_lazy
