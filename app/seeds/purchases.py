from app.models import db, Purchase, environment, SCHEMA

def seed_purchases():
    purchase1= Purchase(
        status="shipped",
        purchaser_id = 3,
        product_id = 1,
        shop_id = 1
    )

    db.session.add(purchase1)
    db.session.commit()

def undo_purchases():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.purchases RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM purchases")

    db.session.commit()