from flask import Blueprint,jsonify,request
from flask_login import login_required, current_user
from app.models import Product,User, Shop, db,Image
from ..forms import CreateProductForm
from .auth_routes import validation_errors_to_error_messages
from ..forms import EditProductForm
from sqlalchemy import or_
from sqlalchemy import func



search_routes = Blueprint("search",__name__)

#display searched products
@search_routes.route("",methods=["POST"])
def all_items():
    front_search_data = request.get_json("info")
    print('seardhhhhhdata%%%%%%',front_search_data)
    products1 = Product.query.filter(func.lower(Product.name).contains(front_search_data)).all()
    print("-------------",products1)
    products2 = Product.query.filter(func.lower(Product.category).contains(front_search_data)).all()
    print('>>>>>>>>>>>>>>',products2)

    totalProducts = set(products1 + products2)
    print('88888888888888888',totalProducts)    

    
    
    images = Image.query.all()

    products_list = []
    
    for product in totalProducts:
        for image in images:
            if(image.product_id == product.id):
                product_dict={
                    "id":product.id,
                    "name":product.name,
                    "price":product.price,
                    "description":product.description,
                    "img":image.img,
                    "seller_id":product.seller_id,
                    "shop_id":product.shop_id
                }
                products_list.append(product_dict)
        print("productssssss",products_list)


    return {"allProducts":products_list}
