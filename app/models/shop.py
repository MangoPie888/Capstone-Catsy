from .db import db, environment, SCHEMA, add_prefix_for_prod



class Shop(db.Model):
    __tablename__="shops"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    shop_name = db.Column(db.String(255), nullable=False)
    shop_description = db.Column(db.String(1000),nullable=False)
    shop_img = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, default = db.func.now())

    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"),ondelete="CASCADE"))

    user = db.relationship("User", back_populates="shop")
    products= db.relationship("Product", back_populates="shop",cascade="all, delete",passive_deletes=True)
    purchases = db.relationship("Purchase", back_populates="shop",cascade="all, delete",passive_deletes=True )