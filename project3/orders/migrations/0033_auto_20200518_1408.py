# Generated by Django 3.0.6 on 2020-05-18 14:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0032_orderitem_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='price',
            field=models.FloatField(blank=True),
        ),
    ]
