from django.urls import include, path

from product import views

urlpatterns = [
    path("latest-products/", views.LatesProductsList.as_view()),
]
