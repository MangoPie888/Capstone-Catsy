from .db import db, environment, SCHEMA, add_prefix_for_prod

# from .shop import Shop
# from .cart import Cart

class Product(db.Model):
    __tablename__='products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable = False)
    price = db.Column(db.Integer, nullable = False)
    description = db.Column(db.String(1000), nullable = False)
    # img = db.Column(db.String(1000), nullable= False)
    category = db.Column(db.String(255))
    inventory = db.Column(db.Integer)

    seller_id =db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"))
    shop_id =db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("shops.id"),ondelete="CASCADE") )

    user = db.relationship("User",back_populates="products")
    cart = db.relationship("Cart", back_populates="products", cascade="all, delete",  
    passive_deletes=True)
    shop = db.relationship("Shop", back_populates="products")
    images =db.relationship("Image", back_populates="products")
    purchases = db.relationship("Purchase",back_populates="products", cascade="all, delete", passive_deletes=True)
    reviews = db.relationship("Review",back_populates="products", cascade="all, delete", passive_deletes=True)

    def to_dict(self):
        return {
            "id":self.product.id,
            "name":self.product.name,
            "price":self.product.price,
            "description":self.product.description,
            # "img":self.product.img,
            "seller_id":self.product.seller_id,
            "shop_id":self.product.shop_id,
            "category":self.product.category,
            "inventory":self.product.inventory
        }