from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review(db.Model):
    __tablename__="reviews"


    if environment == "production":
        __table_args__={"schema":SCHEMA}

    

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(1000), nullable = False)
    rating = db.Column(db.Integer, nullable= False)
    created_at =db.Column(db.DateTime, default = db.func.now())
    image = db.Column(db.String(255))

    reviewer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete = "CASCADE"))
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id"), ondelete="CASCADE"))


    user = db.relationship("User", back_populates="reviews")
    products = db.relationship("Product", back_populates="reviews")