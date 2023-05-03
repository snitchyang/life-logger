# Generated by Django 4.2 on 2023-05-02 11:23

import uuid

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('api', '0006_alter_diary_tag'),
    ]

    operations = [
        # migrations.RemoveField(
        #     model_name='diary',
        #     name='image',
        # ),
        # migrations.RemoveField(
        #     model_name='post',
        #     name='image',
        # ),
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(default='avatars/default.jpg', upload_to='avatar/', verbose_name='头像'),
        ),
        migrations.CreateModel(
            name='PostImage',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('path', models.ImageField(upload_to='image/post/', verbose_name='路径')),
                ('post',
                 models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='api.post',
                                   verbose_name='图片')),
            ],
        ),
        migrations.CreateModel(
            name='DiaryImage',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('path', models.ImageField(upload_to='image/diary/', verbose_name='路径')),
                ('diary',
                 models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='api.diary',
                                   verbose_name='图片')),
            ],
        ),
    ]