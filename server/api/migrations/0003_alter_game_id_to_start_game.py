# Generated by Django 3.2 on 2021-05-03 23:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_game_id_to_start_game'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='id_to_start_game',
            field=models.IntegerField(default=9341),
        ),
    ]