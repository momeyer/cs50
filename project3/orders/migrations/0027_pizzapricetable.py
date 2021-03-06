# Generated by Django 3.0.6 on 2020-05-14 08:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0026_auto_20200512_1212'),
    ]

    operations = [
        migrations.CreateModel(
            name='PizzaPriceTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.FloatField(default=0.0)),
                ('baseOption', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.PizzaBaseType')),
                ('sizeOption', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.Size')),
                ('toppingsOpition', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.PizzaTopping')),
            ],
        ),
    ]
