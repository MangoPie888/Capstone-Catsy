from app.models import db, Shop, environment, SCHEMA


def seed_shops():
    shop1= Shop(
        shop_name="kittyCat",
        shop_description= "Cats and Mushrooms made in LA.",
        shop_img ="image.png",
        owner_id = 1
    )

    shop2= Shop(
        shop_name="KinokoCarnival",
        shop_description= "The Pampered Cat",
        shop_img ="image.png",
        owner_id = 2
    )

    shop3= Shop(
        shop_name="happycatsfarm",
        shop_description= "Happy Cats Farm",
        shop_img ="image.png",
        owner_id = 3
    )

    shop4= Shop(
        shop_name="MeowyJanes",
        shop_description= "Meow Meow Meow",
        shop_img ="image.png",
        owner_id = 5
    )


    db.session.add(shop1)
    db.session.add(shop2)
    db.session.add(shop3)
    db.session.add(shop4)
    db.session.commit()


def undo_shops():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shops RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM shops")

    db.session.commit()
