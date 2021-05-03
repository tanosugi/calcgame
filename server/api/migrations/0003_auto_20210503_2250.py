# Generated by Django 3.2 on 2021-05-03 13:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_game_id_to_start_game'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='id_to_start_game',
            field=models.IntegerField(default=966),
        ),
        migrations.AlterField(
            model_name='profile',
            name='game_playing',
            field=models.ManyToManyField(blank=True, to='api.Game'),
        ),
    ]