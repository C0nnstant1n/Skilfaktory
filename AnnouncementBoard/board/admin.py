from django_summernote.admin import SummernoteModelAdmin
from django.contrib import admin
from .models import Advert, Reply


# add summernote WYSIWYG editor to admin panel
class AdvertAdmin(SummernoteModelAdmin):
    summernote_fields = ('content',)


admin.site.register(Reply)
admin.site.register(Advert, AdvertAdmin)

