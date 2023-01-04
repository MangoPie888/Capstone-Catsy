from flask import Blueprint,jsonify,request
from flask_login import login_required, current_user
from app.models import Product,User, Shop, db
from ..forms import CreateProductForm
from .auth_routes import validation_errors_to_error_messages
from ..forms import EditProductForm

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
    # product = Product.query.filter(Product.id == product_id).all()
    product = Product.query.get(product_id)
    print("^^^^^^^^^^^^",product)
    # if len(product) == 0:
    if not product:
        return {
                "message": "product couldn't be found",
                "statusCode": 404
            }, 404

    owner = User.query.filter(User.id == product.seller_id).one()
    print("11111111111111",owner)

    return {"id":product.id,
            "name":product.name,
            "price":product.price,
            "description":product.description,
            "img":product.img,
            "seller_id":product.seller_id,
            "shop_id":product.shop_id,
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
    print("userID from backend", userId)
    shop= Shop.query.filter(Shop.owner_id == userId).one()
    print("shop from the backend",shop)
    shopId = shop.id
    print("shoppppppppppppppppppid",shopId)
    form = CreateProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    print("form.data[name]&&&&&&&&&",form.data["name"])
    print("&&&&&&&&&&&&&&&&&",form.data["description"])
    if form.validate_on_submit():
        new_product = Product(
            name = form.data["name"],
            price = form.data["price"],
            description = form.data["description"],
            img = form.data["img"],
            seller_id = int(userId),
            shop_id = shopId
        )

        print("newwwwwwwwwwwwwwwwwww",new_product)
        db.session.add(new_product)
        db.session.commit()

        return {
            "id":new_product.id,
            "name":new_product.name,
            "price":new_product.price,
            "description":new_product.description,
            "img":new_product.img,
            "seller_id":new_product.seller_id,
            "shop_id":new_product.shop_id
        },200





# Edit a product
@product_routes.route("/<int:productId>", methods=["PUT"])
@login_required
def edit_product(productId):
    print("productId backend",productId)
    userId = current_user.get_id()
    print("userId backend",userId)
    product = Product.query.get(productId)
    print("________product",product)

    if not product:
        return{"errors": f'Product {productId} not found'},404

    form=EditProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product.id= productId
        product.name = form.data["name"]
        product.price = form.data["price"]
        product.description = form.data["description"]
        product.img = form.data["img"]
        product.seller_id = int(userId)
        product.shop_id = product.shop_id

        db.session.add(product)
        db.session.commit()

        return {
            "id":product.id,
            "name":product.name,
            "price":product.price,
            "description":product.description,
            "img":product.img,
            "seller_id":product.seller_id,
            "shop_id":product.shop_id
        },200
    else:
        return{'errors': validation_errors_to_error_messages(form.errors)}, 400
    
    

#Delete a product
@product_routes.route("/<int:product_id>", methods=["DELETE"])
@login_required
def delete_product(product_id):
    product = Product.query.filter(Product.id == product_id).one()

    if not product:
        return {'errors': f'product {product_id} not found!'}, 404

    if product.seller_id != current_user.id:
        return {'errors': 'Unauthorized!'}, 400

    db.session.delete(product)
    db.session.commit()
    return {'message': f'Sucessfully deleted product {product_id}'}, 200
