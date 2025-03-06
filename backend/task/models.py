from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=300)
    task = models.TextField(null=True)
