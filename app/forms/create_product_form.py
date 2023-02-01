from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired,ValidationError,Length,URL



class CreateProductForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(),Length(min=1, max=255, message='Product name must be less than 255 characters')])
    price = IntegerField("price", validators=[DataRequired()])
    description = StringField("description",validators=[DataRequired(),Length(min=1, max=1000, message='Description must be less than 1000 characters')])
    # img=StringField("img", validators=[DataRequired(),URL(require_tld=True, message='Image url is invalid')])
    inventory= IntegerField("inventory", validators=[DataRequired()])
    category = StringField("category",validators=[DataRequired()] )