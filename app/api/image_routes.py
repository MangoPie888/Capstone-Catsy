from flask import Blueprint, request
from app.models import db, Image
from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename
)


image_routes = Blueprint("images",__name__)


#add image
@image_routes.route('', methods=["GET","POST"])
@login_required
def upload_image():
    if 'image' not in request.files:
        return {"errors":"image required"}, 400
    
    image = request.files["image"]
    preview = request.form.get("preview")
    productId = request.form.get("productId")


    print("imageeeeeeeeeeeeeeeeeee",image)
    print("previewwwwwwwwwwwwwwwwwwww",preview)
    print("productIddddddddddddddddd",productId)
    print ("typeeeeeeeeeeeee",type(preview))

    if not allowed_file(image.filename):
        return {"errors":"file type not permitted"}, 400
    
    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        return upload, 400
    
    url = upload["url"]
    new_image = Image(img=url,preview=int(preview),product_id=productId,)
    db.session.add(new_image)
    db.session.commit()
    return{"url":url}