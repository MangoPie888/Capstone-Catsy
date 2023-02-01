from .db import db, environment, SCHEMA, add_prefix_for_prod


class Purchase(db.Model):
    __tablename__="purchases"


    if environment == "production":
        __table_args__ = {"schema":SCHEMA}
    

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(255))
    create_at = db.Column(db.DateTime, default = db.func.now())

    purchaser_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete = "CASCADE"))
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id"), ondelete="CASCADE"))
    shop_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("shops.id"),ondelete="CASCADE"))

    user = db.relationship("User", back_populates="purchases")
    products = db.relationship("Product", back_populates="purchases")
    shop = db.relationship("Shop", back_populates="purchases")
