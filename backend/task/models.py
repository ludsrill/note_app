from django.db import models


class Task(models.Model):
    class TaskStatus(models.TextChoices):
        PENDING = "Pending"
        IN_PROGRESS = "In progress"
        DONE = "Done"

    title = models.CharField(max_length=300)
    task = models.TextField(null=True)
    state = models.CharField(
        max_length=15, choices=TaskStatus, default=TaskStatus.PENDING
    )
