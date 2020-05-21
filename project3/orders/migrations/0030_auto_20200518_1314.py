# Generated by Django 3.0.6 on 2020-05-18 13:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0029_auto_20200518_1309'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pizzapricetable',
            old_name='price',
            new_name='large',
        ),
        migrations.RemoveField(
            model_name='pizzapricetable',
            name='sizeOption',
        ),
        migrations.AddField(
            model_name='pizzapricetable',
            name='small',
            field=models.FloatField(default=0.0),
        ),
    ]