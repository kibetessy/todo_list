from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    due_date = models.DateTimeField(null=True, blank=True)
    priority = models.CharField(
        max_length=10,
        choices=[("High", "High"), ("Medium", "Medium"), ("Low", "Low")],
        default="Medium",
    )

    def __str__(self):
        return self.title
