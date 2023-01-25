from .db import db, environment, SCHEMA, add_prefix_for_prod

class Image(db.Model):
    __tablename__='images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key = True)
    img = db.Column(db.String(1000), nullable = False)
    preview = db.Column(db.Boolean, nullable = False)
    

    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id"), ondelete="CASCADE"))

    products = db.relationship("Product", back_populates='images')