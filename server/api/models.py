# import random

from django.contrib.auth.models import User
from django.db import models

# from datetime import datetime


class Game(models.Model):
    # random.seed(datetime.now())
    id_to_start_game = models.IntegerField(
        # default=random.randint(1111, 9999),
    )
    owner_id = models.CharField(max_length=124, default="")
    joiner_id = models.CharField(max_length=124, default="")
    owner_progress = models.IntegerField(default=0)
    joiner_progress = models.IntegerField(default=0)


class Profile(models.Model):
    user_prof = models.OneToOneField(
        User,
        related_name="profile",
        on_delete=models.CASCADE,
    )
    last_game_seconds = models.IntegerField(default=0)
    last_game_mistake = models.IntegerField(default=0)
    last_game_point = models.IntegerField(default=0)
    game_playing = models.ManyToManyField(Game, blank=True)
    game_progress = models.IntegerField(default=0)
    opponent_game_progress = models.IntegerField(default=0)
    is_game_owner = models.BooleanField(default=False)

    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user_prof.username
