# Generated by Django 3.0.5 on 2023-01-23 14:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0003_transactionmodel_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transactionmodel',
            name='category',
            field=models.CharField(default='OTHER', max_length=20),
        ),
    ]