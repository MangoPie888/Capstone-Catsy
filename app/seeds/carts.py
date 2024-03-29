from app.models import db, Cart, environment, SCHEMA


def seed_carts():
    cart1= Cart(
        user_id = 1,
        product_id = 4,
        quantity = 1
    )


    cart2= Cart(
        user_id = 1,
        product_id = 7,
        quantity = 2
    )

    cart3= Cart(
        user_id = 6,
        product_id = 1,
        quantity = 1
    )

    cart4= Cart(
        user_id = 6,
        product_id = 2,
        quantity = 1
    )


    db.session.add(cart1)
    db.session.add(cart2)
    db.session.add(cart3)
    db.session.add(cart4)
    db.session.commit()

def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM carts")

    db.session.commit()
