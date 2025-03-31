from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    class TaskStatus(models.TextChoices):
        PENDING = "Pending"
        IN_PROGRESS = "In progress"
        DONE = "Done"

    username = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    title = models.CharField(max_length=300)
    task = models.TextField(null=True)
    state = models.CharField(
        max_length=15, choices=TaskStatus, default=TaskStatus.PENDING
    )
