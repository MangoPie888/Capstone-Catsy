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

    return {"hello":"hi"}
