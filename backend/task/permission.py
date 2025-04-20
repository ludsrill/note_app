from rest_framework.permissions import DjangoModelPermissions


class isAdmin(DjangoModelPermissions):
    def has_permission(self, request, view):
        return super().has_permission(request, view)
