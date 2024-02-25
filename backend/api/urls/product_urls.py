from django.urls import path
from api.views import product_views as views


urlpatterns = [
    path('',views.get_products,name="products"),
    path('<str:pk>/reviews/',views.create_product_review,name="create-review"),
    path('top/',views.get_top_products,name="top-products"),
    path('<str:pk>/',views.get_product,name="product"),
]
