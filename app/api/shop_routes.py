from flask import Blueprint,request
from flask_login import login_required, current_user
from app.models import Product, User,Cart, Shop,db
from ..forms import AddShoppingCartForm, EditCartForm
from sqlalchemy import and_
from ..forms import CreateStoreForm
from .auth_routes import validation_errors_to_error_messages


shop_routes = Blueprint("shop", __name__)


# get user's store
@shop_routes.route("")
# @login_required
def get_store():
    print("hitting store backend ====================")
    userId = current_user.get_id()
    print('store userId -----------------',userId)
    shop = Shop.query.filter(Shop.owner_id == userId).all()

    print("owener's shop form back end ))))))))))))",shop)

    if len(shop)==0:
        return {}
    
    else:
        return {
            "shopName":shop[0].shop_name,
            "shopDescription":shop[0].shop_description,
            "shopImg":shop[0].shop_img,
            "shopOwner":shop[0].owner_id
        }


# create a new store 
@shop_routes.route("",methods=["POST"])
@login_required
def add_new_store():
    userId = current_user.get_id()
    print("userID from backend++++++++++++++++", userId)

    form = CreateStoreForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    print("form.data[name]&&&&&&&&&",form.data["name"])
    print("&&&&&&&&&&&&&&&&&description",form.data["description"])
    if form.validate_on_submit():
        new_store = Shop(
            shop_name = form.data["name"],
            shop_description = form.data["description"],
            shop_img = form.data["img"],
            owner_id = int(userId),
        )

        print("newwwwwwwwwwwwwwwwwww",new_store)
        db.session.add(new_store)
        db.session.commit()

        return {
            "message":"newstore is built!"
        },200
    
    else:
        return{'errors': validation_errors_to_error_messages(form.errors)}, 400
