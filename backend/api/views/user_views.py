from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from api.serializers import UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated 
from rest_framework.response import Response
from rest_framework.serializers import Serializer

# Custom token serializer with additional user information
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom token serializer for obtaining user tokens.

    This serializer extends the default TokenObtainPairSerializer to include additional user information 
    in the token response.

    Attributes:
        None

    Methods:
        validate: Validates the token attributes and adds additional user information to the response.
        get_token: Retrieves the token with custom claims.

    """

    def validate(self, attrs):
        """
        Validate the token attributes and add additional user information to the response.

        Args:
            attrs (dict): The token attributes.

        Returns:
            dict: The validated token data with additional user information.

        """

        data = super().validate(attrs)
       
        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data

    @classmethod
    def get_token(cls, user):
        """
        Retrieve the token with custom claims.

        Args:
            user (User): The user object.

        Returns:
            Token: The token with custom claims.

        """

        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['message'] = "Hello Proshop"
        # ...

        return token

# Custom token view using the custom token serializer
class MyTokenObtainPairView(TokenObtainPairView):
    """
    Custom token view for obtaining user tokens.

    This view uses the custom token serializer to generate tokens with additional user information.

    Attributes:
        serializer_class (class): The serializer class to use for token generation.

    Methods:
        None

    """

    serializer_class = MyTokenObtainPairSerializer

# SHOP API

# View to retrieve available API routes
@api_view(['GET'])
def get_routes(request):
    """
    View function to retrieve available API routes.

    Returns:
        Response: A response containing a list of available API routes.

    """

    routes =[
        '/api/products/',
        '/api/products/<id>',
        '/api/users',
        '/api/users/register',
        '/api/users/login',
        '/api/users/profile',
    ]
    return Response(routes)

# View to register a new user
@api_view(['POST'])
def register_user(request):
    """
    View function to register a new user.

    Args:
        request (Request): The HTTP request object.

    Returns:
        Response: A response containing the serialized user data or an error message.

    """

    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            password=make_password(data['password']),
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    
    except:
        message = {"detail":"User with this email is already registered"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

# View to retrieve user profile information
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    """
    View function to retrieve user profile information.

    Args:
        request (Request): The HTTP request object.

    Returns:
        Response: A response containing the serialized user profile data.

    """

    user = request.user 
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

# View to update user profile information
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    """
    View function to update user profile information.

    Args:
        request (Request): The HTTP request object.

    Returns:
        Response: A response containing the serialized updated user profile data.

    """

    user = request.user 
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    if data['password'] != "":
        user.password = make_password(data['password'])
    user.save()
    return Response(serializer.data)

# View to delete a user
@api_view(['DELETE'])
def delete_user(request, pk):
    """
    View function to delete a user.

    Args:
        request (Request): The HTTP request object.
        pk (int): The primary key of the user to delete.

    Returns:
        Response: A response indicating the success of the deletion operation.

    """

    user_for_deletion = User.objects.get(id=pk)
    user_for_deletion.delete()
    return Response("User was deleted")
