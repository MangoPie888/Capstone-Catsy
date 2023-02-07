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



# display user's review
@review_routes.route("/myreviews")
def user_review():
    userId = current_user.get_id()
    reviews = Review.query.filter(Review.reviewer_id == userId).all()
    print("review((((sssssssssssss))))",reviews)


    review_list = []
    for review in reviews:
        review_detail = {
            "id":review.id,
            "content":review.content,
            "rating":review.rating,
            "created_at":review.created_at,
            "image":review.image,
            "reviewer_id":User.query.get(review.reviewer_id).first_name,
            "product_id":review.product_id,
            "product_name":Product.query.get(review.product_id).name,
            "product_img":Image.query.get(review.product_id).img
        }
        review_list.append(review_detail)

    return{"reviews":review_list}



# delete review
@review_routes.route("/<int:review_id>", methods=["DELETE"])
@login_required
def delete_review(review_id):
    review = Review.query.filter(Review.id == review_id).one()

    if not review:
        return {'errors': f'product {review_id} not found!'}, 404

    if review.reviewer_id!= current_user.id:
        return {'errors': 'Unauthorized!'}, 400

    db.session.delete(review)
    db.session.commit()
    return {'message': f'Sucessfully deleted product {review_id}'}, 200


# update review

@review_routes.route("/<int:reviewId>", methods=["PUT"])
@login_required
def edit_review(reviewId):
    print("productId backend",reviewId)
    userId = current_user.get_id()
    print("userId backend",userId)
    review = Review.query.get(reviewId)
    print("________review",review)
    print("revieww........id",review.id)

    if not review:
        return{"errors": f'Product {reviewId} not found'},404

    frontend_Data = request.get_json("info")
    print("fonttttttttttttttdata^^^^^^^",frontend_Data)

    if frontend_Data:
        review.id = reviewId
        review.content = frontend_Data["review"]
        review.rating = frontend_Data["rating"]
        review.image = frontend_Data["reviewImg"]
        review.reviewer_id = userId
        review.product_id = frontend_Data["productId"]

        db.session.add(review)
        db.session.commit()

        return {
            "id":review.id,
            "content":review.content,
            "rating":review.rating,
            "image":review.image,
        },200

    else:
        return{"error":'someting is not right, try it again'}
