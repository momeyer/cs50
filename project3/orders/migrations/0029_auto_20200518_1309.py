# Generated by Django 3.0.6 on 2020-05-18 13:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0028_auto_20200518_1300'),
    ]

    operations = [
        migrations.RenameField(
            model_name='dinnerplate',
            old_name='price',
            new_name='large',
        ),
        migrations.RemoveField(
            model_name='dinnerplate',
            name='size',
        ),
        migrations.AddField(
            model_name='dinnerplate',
            name='small',
            field=models.FloatField(default=0.0),
        ),
    ]
