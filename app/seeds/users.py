from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name="demo", email='demo@aa.io', password='password')
    marnie = User(
        first_name='marnie', last_name="marnie", email='marnie@aa.io', password='password')
    bobbie = User(
        first_name='bobbie', last_name="bob", email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    

    user_seeds = [
        {"first_name": "Adam", "last_name": "Adams", "email": "adam@adams.com", "hashed_password": "password"},
        {"first_name": "Brian", "last_name": "Brians", "email": "brian@brians.com", "hashed_password": "password"},
        {"first_name": "Charlie", "last_name": "Charlies","email": "charlie@charlies.com", "hashed_password": "password"},
        {"first_name": "Don", "last_name": "Dons",  "email": "don@dons.com", "hashed_password": "password"},
        {"first_name": "Edward", "last_name": "Edwards",  "email": "edward@edwards.com", "hashed_password": "password"},
        {"first_name": "Finn", "last_name": "Finns",  "email": "finn@finns.com", "hashed_password": "password"},
        {"first_name": "George", "last_name": "Georges", "email": "george@georges.com", "hashed_password": "password"},
        {"first_name": "Henry", "last_name": "Henrys", "email": "henry@henrys.com", "hashed_password": "password"}
        ]

    for user in user_seeds:
        data = User(first_name=user["first_name"], last_name=user["last_name"], email=user["email"], password=user["hashed_password"])

        db.session.add(data)

    db.session.commit()

def delete_test():
    User.query.filter(User.id == 1).delete()
    db.session.commit()
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()