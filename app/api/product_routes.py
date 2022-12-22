from flask import Blueprint,jsonify,request
from flask_login import login_required, current_user
from app.models import Product,User, Shop, db


product_routes = Blueprint("products",__name__)


#display all products
@product_routes.route("")
def all_products():
    products = Product.query.all()
   

    products_list = []
    for product in products:
        product_dict={
            "id":product.id,
            "name":product.name,
            "price":product.price,
            "description":product.description,
            "img":product.img,
            "seller_id":product.seller_id,
            "shop_id":product.shop_id
        }
        products_list.append(product_dict)
    print("productssssss",products_list)
    return {"allProducts":products_list}


# get all products owened by the current user
@product_routes.route("/current")
@login_required
def curr_user_product():
    userId = current_user.get_id()
    print("&&&&&&&&&&&&&&",userId)
    products = Product.query.filter(Product.seller_id == userId).all()
    print("%%%%%%%%%%%%",products)

    product_lst =[]
    for product in products:
        product_dict={
            "id":product.id,
            "name":product.name,
            "price":product.price,
            "description":product.description,
            "img":product.img,
            "seller_id":product.seller_id,
            "shop_id":product.shop_id
        }
        product_lst.append(product_dict)
    return {"currentUserProducts":product_lst}




# get details of a product by its id.
@product_routes.route("/<int:product_id>")
def product_detail(product_id):
    product = Product.query.filter(Product.id == product_id).all()
    print("^^^^^^^^^^^^",product)
    if len(product) == 0:
        return {
                "message": "product couldn't be found",
                "statusCode": 404
            }

    owner = User.query.filter(User.id == product[0].seller_id).one()
    print("11111111111111",owner)

    return {"id":product[0].id,
            "name":product[0].name,
            "price":product[0].price,
            "description":product[0].description,
            "img":product[0].img,
            "seller_id":product[0].seller_id,
            "shop_id":product[0].shop_id,
            "Owner":{
                "id":owner.id,
                "firstName":owner.first_name,
                "lastName":owner.last_name
            }
    }



# Create a product
@product_routes.route("", methods=["POST"])
@login_required
def create_product():
    userId = current_user.get_id()
    shopId = Shop.query.filter(Shop.owner_id == userId).one()
    name = request.get_data["name"]
    price = request.get_data["price"]
    description = request.get_data["description"]
    img = request.get_data["img"]

    new_product = Product(
        name,
        price,
        description,
        img,
        seller_id = userId,
        shop_id = shopId 
    )

    db.session.add(new_product)
    db.sesson.commt()

    return new_product.to_dict(),201
