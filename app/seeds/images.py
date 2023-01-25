from app.models import db, Image, environment, SCHEMA

def seed_images():
    image1 = Image(
        img = "https://image.chewy.com/is/image/catalog/554886_MAIN._AC_SL1200_V1657659533_.jpg",
        preview = True,
        product_id = 1
    )


    image2 = Image(
        img = "https://image.chewy.com/is/image/catalog/211440_MAIN._AC_SL1200_V1661829655_.jpg",
        preview = True,
        product_id = 2
    )


    image3 = Image(
        img = "https://image.chewy.com/is/catalog/47183_MAIN._AC_SL1200_V1486131994_.jpg",
        preview = True,
        product_id = 3
    )


    image4 = Image(
         img = "https://image.chewy.com/is/image/catalog/47407_MAIN._AC_SL1200_V1663796962_.jpg",
        preview = True,
        product_id = 4
    )


    image5 = Image(
        img = "https://image.chewy.com/is/image/catalog/161807_MAIN._AC_SL1200_V1565795955_.jpg",
        preview = True,
        product_id = 5
    )


    image6 = Image(
        img = "https://image.chewy.com/is/image/catalog/233317_MAIN._AC_SL1200_V1600697226_.jpg",
        preview = True,
        product_id = 6
    )


    image7 = Image(
        img = "https://image.chewy.com/is/image/catalog/210135_MAIN._AC_SL1200_V1589289189_.jpg",
        preview = True,
        product_id = 7
    )


    image8 = Image(
        img = "https://image.chewy.com/is/image/catalog/329535_MAIN._AC_SL1200_V1631596580_.jpg",
        preview = True,
        product_id = 8
    )


    image9 = Image(
        img = "https://image.chewy.com/is/image/catalog/289340_MAIN._AC_SL1200_V1633012080_.jpg",
        preview = True,
        product_id = 9
    )


    image10 = Image(
        img = "https://image.chewy.com/is/image/catalog/110168_MAIN._AC_SL1200_V1541443773_.jpg",
        preview = True,
        product_id = 10
    )


    image2 = Image(
        img = "https://image.chewy.com/is/image/catalog/211440_MAIN._AC_SL1200_V1661829655_.jpg",
        preview = True,
        product_id = 2
    )


    image11 = Image(
        img = "https://image.chewy.com/is/image/catalog/151262_MAIN._AC_SL1200_V1628020050_.jpg",
        preview = True,
        product_id =11
    )


    image12 = Image(
        img = "https://image.chewy.com/is/image/catalog/256101_MAIN._AC_SL1200_V1615321300_.jpg",
        preview = True,
        product_id = 12
    )


    image13 = Image(
        img = "https://image.chewy.com/is/image/catalog/302414_MAIN._AC_SL1200_V1623064349_.jpg",
        preview = True,
        product_id = 13
    )


    image14 = Image(
        img = "https://image.chewy.com/is/image/catalog/102381_MAIN._AC_SL1200_V1560796067_.jpg",
        preview = True,
        product_id = 14
    )


    image15 = Image(
        img = "https://image.chewy.com/is/image/catalog/102381_MAIN._AC_SL1200_V1560796067_.jpg",
        preview = True,
        product_id = 15
    )


    image16 = Image(
        img = "https://image.chewy.com/is/image/catalog/122853_MAIN._AC_SL1200_V1565284805_.jpg",
        preview = True,
        product_id = 16
    )


    image17 = Image(
        img = "https://image.chewy.com/is/image/catalog/46674_MAIN._AC_SL1200_V1663797384_.jpg",
        preview = True,
        product_id = 17
    )


    image18 = Image(
        img = "https://image.chewy.com/is/image/catalog/296189_MAIN._AC_SL1200_V1620221543_.jpg",
        preview = True,
        product_id = 18
    )

    image19 = Image(
        img = "https://image.chewy.com/is/image/catalog/220605_MAIN._AC_SL1200_V1610420846_.jpg",
        preview = True,
        product_id = 19
    )


    image20 = Image(
        img = "https://image.chewy.com/is/image/catalog/214357_MAIN._AC_SL1200_V1606832413_.jpg",
        preview = True,
        product_id = 20
    )


    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)
    db.session.add(image11)
    db.session.add(image12)
    db.session.add(image13)
    db.session.add(image14)
    db.session.add(image15)
    db.session.add(image16)
    db.session.add(image17)
    db.session.add(image18)
    db.session.add(image19)
    db.session.add(image20)
    db.session.commit()


def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM images")

    db.session.commit()
