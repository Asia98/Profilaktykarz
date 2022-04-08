from rest_framework import viewsets

from backend.profilaktykarz.models import Users
from backend.profilaktykarz.serializers import UsersSerializer


class UsersViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Users.objects.all().order_by('name')
    serializer_class = UsersSerializer
