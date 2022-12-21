from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .user import User
# from .product import Product

class Cart(db.Model):
    __tablename__="carts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    
    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.DateTime, default = db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"))
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id"),ondelete="CASCADE"))

    user = db.relationship("User",back_populates="carts")
    products = db.relationship("Product",back_populates="cart")