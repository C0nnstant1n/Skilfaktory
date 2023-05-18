from django.contrib import admin
from .models import Post, Comment, Category, PostCategory, Author
from modeltranslation.admin import TranslationAdmin


class CategoryAdmin(TranslationAdmin):
    model = Category


class MyModelAdmin(TranslationAdmin):
    model = Post


admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Category)
admin.site.register(PostCategory)
admin.site.register(Author)
