# Django Import
from django.core import paginator
from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from rest_framework import status
# Rest Framework Import
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated  
from rest_framework.response import Response
from rest_framework.serializers import Serializer


# Local Import
# from api.products import products
from api.models import *
from api.serializers import ProductSerializer

"""
    The function `GetProducts` is an API view that retrieves products based on a keyword query and
    paginates the results.
    
    :param request: The `request` parameter is an object that represents the HTTP request made by the
    client. It contains information such as the request method (GET, POST, etc.), headers, query
    parameters, and body
    :return: a Response object containing a dictionary with the following keys:
    - 'products': A serialized representation of the products that match the given query and are
    paginated.
    - 'page': The current page number.
    - 'pages': The total number of pages available for the paginated products.
"""
# Get all the products with query
@api_view(['GET'])
def GetProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    products = Product.objects.filter(name__icontains=query).order_by('-_id')
    page = request.query_params.get('page')
    if page is None or page.strip() == '':
        page = 1
    else:
        try:
            page = int(page)
        except ValueError:
            page = 1
    paginator = Paginator(products, 8)
       
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})



    """
    This function retrieves the top 5 products with a rating of 4 or higher and returns them as
    serialized data.
    
    :param request: The request object represents the HTTP request made by the client. It contains
    information such as the request method (GET, POST, etc.), headers, and query parameters
    :return: a response containing the serialized data of the top 5 products with a rating of 4 or
    higher.
    """
# Top Products
@api_view(['GET'])
def GetTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# Get single products
    """
    This function retrieves a single product from the database and returns its serialized data.
    
    :param request: The request object contains information about the current HTTP request, such as the
    request method, headers, and body
    :param pk: The `pk` parameter in the `GetProduct` function is used to identify the specific product
    to retrieve. It is typically an identifier, such as the primary key of the product in the database
    :return: the serialized data of a single product.
    """
@api_view(['GET'])
def GetProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


    """
    This function creates a product review if it doesn't already exist, calculates the average rating
    for the product, and updates the product's number of reviews and rating.
    
    :param request: The request object contains information about the current HTTP request, such as the
    user making the request and the data being sent
    :param pk: The "pk" parameter in the CreateProductReview function represents the primary key of the
    product for which the review is being created. It is used to retrieve the specific product from the
    database using the Product model's "_id" field
    :return: a Response object with the message 'Review Added' if the review is successfully created.
    """
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def CreateProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data
    
    # 1 Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please Select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0

        for i in reviews:
            total += i.rating
        product.rating = total / len(reviews)
        product.save()
        return Response('Review Added')
    