import random
from datetime import datetime

from django.contrib.auth.models import User
from django.db import models


class Game(models.Model):
    random.seed(datetime.now())
    id_to_start_game = models.IntegerField(
        default=random.randint(1111, 9999),
    )


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

    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user_prof.username
