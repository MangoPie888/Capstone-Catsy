from flask import Blueprint,jsonify,request
from flask_login import login_required, current_user
from app.models import Purchase,User, Shop, db,Image, Product
from ..forms import CreateProductForm
from .auth_routes import validation_errors_to_error_messages
from ..forms import EditProductForm


purchase_routes = Blueprint("purchases",__name__)


#display purchased Items
@purchase_routes.route('')
@login_required
def all_purchases():
    userId = current_user.get_id()
    print("userIDDDDDDDDDDDDDDD", userId)

    images = Image.query.filter(Image.preview == True).all()

    purchasedItems = Purchase.query.filter(Purchase.purchaser_id == userId).all()
    print("purchasedItemsssssssssssssssssss",purchasedItems)

    products = []
    for item in purchasedItems:
        product = Product.query.filter(Product.id == item.product_id).one()
        products.append(product)
    
    print("products listinggggggggggggggggggg",products)
    
    products_list = []
    for product in products:
        for image in images:
            for good in purchasedItems:
                if(image.product_id == product.id and product.id == good.product_id):
                    purchased_products= {
                        "id":product.id,
                        "name":product.name,
                        "price":product.price,
                        "description":product.description,
                        "img":image.img,
                        "seller_id":product.seller_id,
                        "shop_id":product.shop_id,
                        "purchaser_id":good.purchaser_id,
                        "purchase_time":good.create_at,
                        "status":good.status
                    }
                    products_list.append(purchased_products)
    

    print("purchased_products without date and shop", products_list)

    return{"purchased_item":products_list}







#add purchased Item
@purchase_routes.route("", methods=["POST"])
@login_required
def add_purchased_item():
    userId = current_user.get_id()
    print("userID from backend++++++++++++++++", userId)

    frontend_Data = request.get_json("items")
    print("frontendddd dta^^^^^^^^^^^^^^", frontend_Data)


    purchasedItems_list =[]
    for item in frontend_Data.values():
        purchasedItems_list.append(item)

    
    print("purchasedItems-lllllllll from backenddddddddddd", purchasedItems_list)

    print("type of producttttttttttttttt________listtttttttttt", type(purchasedItems_list))

    for item in purchasedItems_list:
        purchaseItem = Purchase(
            status = None,
            purchaser_id = userId,
            product_id = item["product"]["id"],
            shop_id = item["product"]["shop_id"]
    
        )

        db.session.add(purchaseItem)
        db.session.commit()

    return {"purchase":"ok"}