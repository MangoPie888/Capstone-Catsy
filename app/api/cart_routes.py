from flask import Blueprint,request
from flask_login import login_required, current_user
from app.models import Product, User,Cart, Shop,db
from ..forms import AddShoppingCartForm
from flask_login import login_required, current_user
from flask import request
from sqlalchemy import and_


cart_routes = Blueprint("carts", __name__)



# display all added product in cart
@cart_routes.route("")
@login_required
def display_carted_product():
    userId = current_user.get_id()
    carts = Cart.query.filter(Cart.user_id == userId).all()
    print("carts+++++++++",carts)
    
    product_lst = []
    whole_info = {}
    for cart in carts:
        allProduct = Product.query.filter(Product.id == cart.product_id).all()
        print("allproduct_____________",allProduct)
        for product in allProduct:
            whole_info={
                "product":{"id":product.id,
                "name":product.name,
                "price":product.price,
                "description":product.description,
                "img":product.img,
                "seller_id":product.seller_id,
                "shop_id":product.shop_id},
                "cart":
                {"id":cart.id,
                "quantity":cart.quantity,
                "userId":cart.user_id,
                "productId":cart.product_id
                }
            }

            product_lst.append(whole_info)
    
    
    print("..............",product_lst)


    return {"carts":product_lst}
 







# add product to cart
@cart_routes.route("",methods=["POST"])
@login_required
def add_product_to_cart():
    print("???????????????hited backend route")
    form = AddShoppingCartForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    
    userId = current_user.get_id()
    print(",,,,,,,,,,,,,,,backend userId",userId)

    if form.validate_on_submit():
        number_quantity = form.data["quantity"]
        productId =form.data["productId"]
    
        print(">>>>>>>>>>>>>>quantity",number_quantity)
        print(">>>>>>>>>>>>>>>productId",productId)
    
        existProduct = Cart.query.filter(and_(Cart.user_id == userId, Cart.product_id == productId)).all()
        print("existProduct=============",existProduct)
        if existProduct:
            print("number of quantity from backend-------------",number_quantity)
            existProduct[0].id = existProduct[0].id
            existProduct[0].quantity = existProduct[0].quantity + number_quantity
            existProduct[0].user_id = userId
            existProduct[0].product_id = productId
            db.session.add(existProduct[0])
            db.session.commit()

            return {
                "id":existProduct[0].id,
                "quantity":existProduct[0].quantity,
                "userId":existProduct[0].user_id,
                "productId":existProduct[0].product_id
                }
        if not existProduct:
            new_cart = Cart(quantity=number_quantity,user_id=userId,product_id=productId)
            db.session.add(new_cart)
            db.session.commit()

            return {
                "id":new_cart.id,
                "quantity":new_cart.quantity,
                "userId":new_cart.user_id,
                "productId":new_cart.product_id
                }


# delete product from carts
@cart_routes.route("/<int:cart_id>", methods=["DELETE"])
@login_required
def delete_product(cart_id):
    userId = current_user.get_id()
    cart = Cart.query.get(cart_id)
    
    print("??????????????????CART_ID",cart_id)
    if not cart:
        return {'errors': f'product {cart} not found!'}, 404

    # if Cart.user_id != current_user.id:
    #     return {'errors': 'Unauthorized!'}, 400
    
    db.session.delete(cart)
    db.session.commit()
    
    return {'message': f'Sucessfully deleted product {cart} from cart'}, 200
