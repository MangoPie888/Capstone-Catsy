from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .user import User
# from .cart import Cart

class Product(db.Model):
    __tablename__='products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable = False)
    price = db.Column(db.Integer, nullable = False)
    description = db.Column(db.String(255), nullable = False)
    img = db.Column(db.String(255), nullable= False)

    seller_id =db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"))
    shop_id =db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("shops.id"),ondelete="CASCADE") )

    user = db.relationship("User",back_populates="products")
    cart = db.relationship("Cart", back_populates="products", cascade="all, delete",  
    passive_deletes=True)
    shop = db.relationship("Shop", back_populates="products")