from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired,ValidationError,Length



class EditProductForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    price = IntegerField("price", validators=[DataRequired()])
    description = StringField("description",validators=[DataRequired()])
    img=StringField("img", validators=[DataRequired()])