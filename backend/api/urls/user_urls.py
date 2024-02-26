from django.urls import path
from api.views import user_views as views

urlpatterns = [

    path('register/',views.register_user,name='register'),
    path('profile/',views.get_user_profile,name="user_profile"),
    path('profile/update/',views.update_user_profile,name="user_profile_update"),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('delete/<str:pk>/',views.delete_user,name="deleteUser"),
]
