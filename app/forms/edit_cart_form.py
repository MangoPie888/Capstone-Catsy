from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired,ValidationError,Length



class EditCartForm(FlaskForm):
    # productId = IntegerField("productId",validators=[DataRequired()])
    quantity = IntegerField("quantity",validators=[DataRequired()])