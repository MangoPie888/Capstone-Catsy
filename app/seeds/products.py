from app.models import db, Product, environment, SCHEMA

def seed_products():
    product1 = Product(
        name ="Made by Nacho Minced Wet Cat Food",
        price = 65,
        description = "Made in the USA.Features sustainably caught salmon and sole. Formulated to satisfy a carnivore’s cravings for animal protein, with savory gravy in every easy-open pouch.",
        img = "https://image.chewy.com/is/image/catalog/554886_MAIN._AC_SL1200_V1657659533_.jpg",
        seller_id = 1,
        shop_id = 1

    )

    product2 = Product(
        name ="Purina Nutrients Dry Cat Food ",
        price = 24,
        description = "Natural nutrition with high-quality ingredients like real chicken as the #1 ingredient for a taste your cat will enjoy.100% complete and balanced nutritious diet for adult cats",
        img = "https://image.chewy.com/is/image/catalog/211440_MAIN._AC_SL1200_V1661829655_.jpg",
        seller_id = 1,
        shop_id = 1

    )

    product3 = Product(
        name ="Dr.Elsey's Precious Cat Ultra Unscented Clumping Clay Cat Litter",
        price = 19,
        description = "99.9% dust free,hypo-allergenic natural litter to keep your surfaces clean and perfect for families who suffer from allergies.",
        img = "https://image.chewy.com/is/catalog/47183_MAIN._AC_SL1200_V1486131994_.jpg",
        seller_id = 2,
        shop_id = 2

    )

    product4 = Product(
        name ="Feline Pine Original Non-Clumping Wood Cat Litter",
        price = 32,
        description = "Made of sustainably sourced pine shavings.Effectively absorbs liquids and odors on contact.",
        img = "https://image.chewy.com/is/image/catalog/47407_MAIN._AC_SL1200_V1663796962_.jpg",
        seller_id = 2,
        shop_id = 2

    )

    product5 = Product(
        name ="Frisco Colorful Springs Cat Toy",
        price = 4.75,
        description = "From Frisco by Chewy.Cat springs in a variety of colors are sure to be a playtime favorite for your spring-loaded kitty.",
        img = "https://image.chewy.com/is/image/catalog/161807_MAIN._AC_SL1200_V1565795955_.jpg",
        seller_id = 3,
        shop_id = 3

    )

    product6 = Product(
        name ="Mistletoe Cat Tracks Cat Toy",
        price = 10.25,
        description = "Cat tracks-style toy with interchangeable top teaser toys keeps your kitty playing and playing.",
        img = "https://image.chewy.com/is/image/catalog/233317_MAIN._AC_SL1200_V1600697226_.jpg",
        seller_id = 3,
        shop_id = 3

    )

    product7 = Product(
        name ="Frisco Eyelash Cat & Dog Bolster Bed",
        price = 19.99,
        description = "From Frisco by Chewy.Round,eyelash cat and dog bolster is designed for pets who love snuggling up into a ball.",
        img = "https://image.chewy.com/is/image/catalog/210135_MAIN._AC_SL1200_V1589289189_.jpg",
        seller_id = 5,
        shop_id = 4

    )

    product8 = Product(
        name ="Meowfia Premium Felt Cat Cave Bed",
        price = 39.99,
        description = "Handcrafted from 100% New Zealand Merino wool by highly skilled artisans in Nepal;",
        img = "https://image.chewy.com/is/image/catalog/329535_MAIN._AC_SL1200_V1631596580_.jpg",
        seller_id = 5,
        shop_id = 4

    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()

