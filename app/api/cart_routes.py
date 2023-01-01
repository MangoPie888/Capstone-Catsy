from flask import Blueprint,request
from flask_login import login_required, current_user
from app.models import Product, User,Cart, Shop,db


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
 







# # add product to cart
# @cart_routes.route("")
# def add_product_to_cart(productId):
#     product = Product.query.get(productId)

#     return {
#         "id":product.id,
#         "name":product.name,
#         "price":product.price,
#         "description":product.description,
#         "img":product.img,
#         "seller_id":product.seller_id,
#         "shop_id":product.shop_id,
#     }

