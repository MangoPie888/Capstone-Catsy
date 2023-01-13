from app.models import db, Product, environment, SCHEMA

def seed_products():
    product1 = Product(
        name ="Made by Nacho Minced Wet Cat Food",
        price = 65,
        description = "Made in the USA.Features sustainably caught salmon and sole. Formulated to satisfy a carnivore’s cravings for animal protein, with savory gravy in every easy-open pouch.",
        img = "https://image.chewy.com/is/image/catalog/554886_MAIN._AC_SL1200_V1657659533_.jpg",
        category = "Food",
        seller_id = 1,
        shop_id = 1,
        inventory= 10

    )

    product2 = Product(
        name ="Purina Nutrients Dry Cat Food ",
        price = 24,
        description = "Natural nutrition with high-quality ingredients like real chicken as the #1 ingredient for a taste your cat will enjoy.100% complete and balanced nutritious diet for adult cats",
        img = "https://image.chewy.com/is/image/catalog/211440_MAIN._AC_SL1200_V1661829655_.jpg",
        category = "Food",
        seller_id = 1,
        shop_id = 1,
        inventory= 15

    )

    product3 = Product(
        name ="Dr.Elsey's Precious Cat Ultra Unscented Clumping Clay Cat Litter",
        price = 19,
        description = "99.9% dust free,hypo-allergenic natural litter to keep your surfaces clean and perfect for families who suffer from allergies.",
        img = "https://image.chewy.com/is/catalog/47183_MAIN._AC_SL1200_V1486131994_.jpg",
        category = "Litter & Litter Boxes",
        seller_id = 2,
        shop_id = 2,
        inventory= 20

    )

    product4 = Product(
        name ="Feline Pine Original Non-Clumping Wood Cat Litter",
        price = 32,
        description = "Made of sustainably sourced pine shavings.Effectively absorbs liquids and odors on contact.",
        img = "https://image.chewy.com/is/image/catalog/47407_MAIN._AC_SL1200_V1663796962_.jpg",
        category = "Litter & Litter Boxes",
        seller_id = 2,
        shop_id = 2,
        inventory= 30

    )

    product5 = Product(
        name ="Frisco Colorful Springs Cat Toy",
        price = 4.75,
        description = "From Frisco by Chewy.Cat springs in a variety of colors are sure to be a playtime favorite for your spring-loaded kitty.",
        img = "https://image.chewy.com/is/image/catalog/161807_MAIN._AC_SL1200_V1565795955_.jpg",
        category = "Toys",
        seller_id = 3,
        shop_id = 3,
        inventory= 35

    )

    product6 = Product(
        name ="Mistletoe Cat Tracks Cat Toy",
        price = 10.25,
        description = "Cat tracks-style toy with interchangeable top teaser toys keeps your kitty playing and playing.",
        img = "https://image.chewy.com/is/image/catalog/233317_MAIN._AC_SL1200_V1600697226_.jpg",
        category = "Toys",
        seller_id = 3,
        shop_id = 3,
        inventory= 12

    )

    product7 = Product(
        name ="Frisco Eyelash Cat & Dog Bolster Bed",
        price = 19.99,
        description = "From Frisco by Chewy.Round,eyelash cat and dog bolster is designed for pets who love snuggling up into a ball.",
        img = "https://image.chewy.com/is/image/catalog/210135_MAIN._AC_SL1200_V1589289189_.jpg",
        category = "Cat Furnitures",
        seller_id = 5,
        shop_id = 4,
        inventory= 5

    )

    product8 = Product(
        name ="Meowfia Premium Felt Cat Cave Bed",
        price = 39.99,
        description = "Handcrafted from 100% New Zealand Merino wool by highly skilled artisans in Nepal;",
        img = "https://image.chewy.com/is/image/catalog/329535_MAIN._AC_SL1200_V1631596580_.jpg",
        category = "Cat Furnitures",
        seller_id = 5,
        shop_id = 4,
        inventory= 14

    )

    product9 = Product(
        name ="Frisco Animal Series Cat Condo",
        price = 56.98,
        description = "Available in three fun animal designs— check out the whimsical unicorn, lovable llama and super-cute sloth.",
        img = "https://image.chewy.com/is/image/catalog/289340_MAIN._AC_SL1200_V1633012080_.jpg",
        category = "Cat Furnitures",
        seller_id = 5,
        shop_id = 4,
        inventory= 80
    )

    product10 = Product(
        name ="Vetericyn Plus Feline Antimicrobial Cat Wound & Skin Spray",
        price = 14.25,
        description = "Helps heal and clean abrasions, cuts and minor wounds on cat companions.",
        img = "https://image.chewy.com/is/image/catalog/110168_MAIN._AC_SL1200_V1541443773_.jpg",
        category = "Health",
        seller_id = 5,
        shop_id = 4,
        inventory= 23
    )

    product11 = Product(
        name ="Catit Flower Plastic Cat Fountain",
        price = 14.25,
        description = "Exclusive design provides 3 different water settings to entice selective drinkers—choose between a gentle flow, bubbling top or calm stream.",
        img = "https://image.chewy.com/is/image/catalog/151262_MAIN._AC_SL1200_V1628020050_.jpg",
        category = "Bowls & Feeders",
        seller_id = 5,
        shop_id = 4,
        inventory= 99
    )

    product12 = Product(
        name ="Frisco Cat Face Non-skid Ceramic Cat Dish",
        price = 6.27,
        description = "Bright, blue ceramic saucer-style dish with a cute black cat design inside.",
        img = "https://image.chewy.com/is/image/catalog/256101_MAIN._AC_SL1200_V1615321300_.jpg",
        category = "Bowls & Feeders",
        seller_id = 5,
        shop_id = 4,
        inventory= 67
    )

    product13 = Product(
        name ="Frisco Cat Face Non-skid Ceramic Cat Dish",
        price = 14.85,
        description = "Each purchase comes with The Frisco Ceramic Water Dog & Cat Bowl with Wood Base & The Frisco Ceramic Food Dog & Cat Bowl with Wood Base.",
        img = "https://image.chewy.com/is/image/catalog/302414_MAIN._AC_SL1200_V1623064349_.jpg",
        category = "Bowls & Feeders",
        seller_id = 5,
        shop_id = 4,
        inventory= 90
    )

    product14 = Product(
        name ="Purina ONE Cat Food ",
        price = 10.99,
        description = "Made with real chicken, turkey or tuna,Three canned food varieties,Promotes lifelong whole-body health",
        img = "https://image.chewy.com/is/image/catalog/102381_MAIN._AC_SL1200_V1560796067_.jpg",
        category = "Food",
        seller_id = 7,
        shop_id = 5,
        inventory= 190
    )

    product15 = Product(
        name ="Frisco Open Top Cat Litter Box With Rim",
        price = 18.99,
        description = "Rim on the sides and back wall provide privacy while keeping litter and spray inside the box. Lowered front wall lets cats come and go easily.",
        img = "https://image.chewy.com/is/image/catalog/102381_MAIN._AC_SL1200_V1560796067_.jpg",
        category = "Litter & Litter Boxes",
        seller_id = 7,
        shop_id = 5,
        inventory= 35
    )

    product16 = Product(
        name ="Good Pet Stuff Hidden Cat Litter Planter",
        price = 18.99,
        description = "Litter box is designed to look like a house plant to cleverly become part of your décor.",
        img = "https://image.chewy.com/is/image/catalog/122853_MAIN._AC_SL1200_V1565284805_.jpg",
        category = "Litter & Litter Boxes",
        seller_id = 7,
        shop_id = 5,
        inventory= 20
    )

    product17 = Product(
        name ="Arm & Hammer Multi-Cat Strength Clean Burst Clumping Litter",
        price = 16.99,
        description = "Made of odor neutralizing clay.Features baking soda crystals and ammonia neutralizers for immediate scent reduction.",
        img = "https://image.chewy.com/is/image/catalog/46674_MAIN._AC_SL1200_V1663797384_.jpg",
        category = "Litter & Litter Boxes",
        seller_id = 7,
        shop_id = 5,
        inventory= 77
    )

    product18 = Product(
        name ="Jespet Foldable Condo Cat Bed",
        price = 16.99,
        description = "Cube-shaped cat condo great for creating vertical territory in small spaces.",
        img = "https://image.chewy.com/is/image/catalog/296189_MAIN._AC_SL1200_V1620221543_.jpg",
        category = "Cat Furnitures",
        seller_id = 7,
        shop_id = 5,
        inventory= 12
    )

    
    product19 = Product(
        name ="STAR WARS C-3PO Plush Kicker Cat Toy with Catnip",
        price = 7.97,
        description = "Cube-shaped cat condo great for creating vertical territory in small spaces.",
        img = "https://image.chewy.com/is/image/catalog/220605_MAIN._AC_SL1200_V1610420846_.jpg",
        category = "Toys",
        seller_id = 7,
        shop_id = 5,
        inventory= 12
    )

    product20 = Product(
        name ="Frisco Cactus Cat Scratching Post",
        price = 57.99,
        description = "From Frisco by Chewy. This sisal-wrapped scratching post promotes satisfying scratching and healthy cat nails.",
        img = "https://image.chewy.com/is/image/catalog/214357_MAIN._AC_SL1200_V1606832413_.jpg",
        category = "Toys",
        seller_id = 7,
        shop_id = 5,
        inventory= 13
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)
    db.session.add(product11)
    db.session.add(product12)
    db.session.add(product13)
    db.session.add(product14)
    db.session.add(product15)
    db.session.add(product16)
    db.session.add(product17)
    db.session.add(product18)
    db.session.add(product19)
    db.session.add(product20)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()

