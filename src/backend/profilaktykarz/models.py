from django.db import models


class Users(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'users'
