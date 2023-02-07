from flask import Blueprint,jsonify,request
from flask_login import login_required, current_user
from app.models import Product,User, Shop, db,Image, Review
from ..forms import CreateProductForm
from .auth_routes import validation_errors_to_error_messages
from ..forms import EditProductForm


review_routes = Blueprint("reviews",__name__)

# create new review
@review_routes.route("",methods=['POST'])
@login_required
def create_review():
    userId = current_user.get_id()

    frontend_Data = request.get_json("info")
    print("frontend-dataaaaaaaaaaaaaa", frontend_Data)
    productId = frontend_Data["productId"]
    img = frontend_Data["img"]
    review = frontend_Data["review"]
    rating = frontend_Data["rating"]

    newReview = Review(
        content = review,
        rating = rating,
        image = img,
        reviewer_id = userId,
        product_id = productId,
    )

    db.session.add(newReview)
    db.session.commit()

    

    return {"purchase":"ok"}


# display single product review
@review_routes.route("/<int:product_id>")
def product_review(product_id):
    reviews = Review.query.filter(Review.product_id == product_id).all()
    print("reviewsssssssssssss",reviews)

    # user = User.query.get(reviews[0].reviewer_id).first_name
  
  
    review_list = []
    for review in reviews:
        review_detail = {
            "id":review.id,
            "content":review.content,
            "rating":review.rating,
            "created_at":review.created_at,
            "image":review.image,
            "reviewer_id":User.query.get(review.reviewer_id).first_name,
            "product_id":review.product_id
        }
        review_list.append(review_detail)

    return{"reviews":review_list}
