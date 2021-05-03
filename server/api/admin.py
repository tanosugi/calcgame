from django.contrib import admin

from .models import Game, Profile

admin.site.register([Game, Profile])
