from app.models import db, Shop, environment, SCHEMA


def seed_shops():
    shop1= Shop(
        shop_name="kittyCat",
        shop_description= "Cats and Mushrooms made in LA.",
        shop_img ="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-cat-photos-1593441022.jpg?crop=0.670xw:1.00xh;0.167xw,0&resize=640:*",
        owner_id = 1
    )

    shop2= Shop(
        shop_name="KinokoCarnival",
        shop_description= "The Pampered Cat",
        shop_img ="https://static01.nyt.com/images/2019/10/01/science/00SCI-CATS1/00SCI-CATS1-facebookJumbo.jpg?year=2019&h=549&w=1050&s=a12758d1b750010957f6d8dcafd0fb707ac2f98675c4cd264adc01b93205d41e&k=ZQJBKqZ0VN",
        owner_id = 2
    )

    shop3= Shop(
        shop_name="happycatsfarm",
        shop_description= "Happy Cats Farm",
        shop_img ="https://th-thumbnailer.cdn-si-edu.com/bZAar59Bdm95b057iESytYmmAjI=/1400x1050/filters:focal(594x274:595x275)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/95/db/95db799b-fddf-4fde-91f3-77024442b92d/egypt_kitty_social.jpg",
        owner_id = 3
    )

    shop4= Shop(
        shop_name="MeowyJanes",
        shop_description= "Meow Meow Meow",
        shop_img ="https://www.freeportvet.com/sites/default/files/interesting-cat-facts.jpg",
        owner_id = 5
    )

    shop5= Shop(
        shop_name="Love Cats",
        shop_description= "We all love cats",
        shop_img ="https://www.freewebheaders.com/wp-content/uploads/cute-sleepy-kitten.jpg",
        owner_id = 7
    )


    db.session.add(shop1)
    db.session.add(shop2)
    db.session.add(shop3)
    db.session.add(shop4)
    db.session.add(shop5)
    db.session.commit()


def undo_shops():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shops RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM shops")

    db.session.commit()
