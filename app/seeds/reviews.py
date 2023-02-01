from app.models import db, Review, environment, SCHEMA

def seed_reviews():
    review1 = Review(
        content ="I really like this cat product",
        rating = 5,
        image = "https://www.litter-robot.com/media/catalog/product/cache/14233517527c0727f4c9637add7b0fa0/l/r/lr4_black_cat_1xz.png",
        reviewer_id = 2,
        product_id = 1
    )

    db.session.add(review1)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
