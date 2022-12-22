from flask_wtf import FlaskForm
from wtforms import StringField,DateField 
from wtforms.validators import DataRequired,ValidationError



class CreateProductForm(FlaskForm):
    name = StringField("name", validators=[DataRequired])
    price = StringField