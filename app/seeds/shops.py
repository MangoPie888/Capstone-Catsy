from app.models import db, Shop, environment, SCHEMA


def seed_shops():
    shop1= Shop(
        shop_name="kittyCat",
        shop_description= "Cats and Mushrooms made in LA.",
        shop_img ="https://th-thumbnailer.cdn-si-edu.com/bZAar59Bdm95b057iESytYmmAjI=/1400x1050/filters:focal(594x274:595x275)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/95/db/95db799b-fddf-4fde-91f3-77024442b92d/egypt_kitty_social.jpg",
        owner_id = 1
    )

    shop2= Shop(
        shop_name="KinokoCarnival",
        shop_description= "The Pampered Cat",
        shop_img ="https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2020-07/kitten-510651.jpg?h=f54c7448&itok=ZhplzyJ9",
        owner_id = 2
    )

    shop3= Shop(
        shop_name="happycatsfarm",
        shop_description= "Happy Cats Farm",
        shop_img ="https://cdn.vox-cdn.com/thumbor/L-slLNUpdMrQqv6tpDGYYBcNLrg=/0x0:2560x1536/2000x1333/filters:focal(1280x768:1281x769)/cdn.vox-cdn.com/uploads/chorus_asset/file/22438301/fake_cats.jpg",
        owner_id = 3
    )

    shop4= Shop(
        shop_name="MeowyJanes",
        shop_description= "Meow Meow Meow",
        shop_img ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQce4pZ2fQmX8XZJLp7MoR80XplTkDH6A1SLG7kfD3vBHZ42kyfE2BvvpOyXNGIz8LtuMw&usqp=CAU",
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
