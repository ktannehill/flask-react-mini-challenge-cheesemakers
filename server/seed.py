from random import choice as rc
from random import randint, uniform

from app import app
from faker import Faker
from models import Cheese, Producer, db

fake = Faker()


def clear_tables():
    print("Clearing database...")
    Producer.query.delete()
    Cheese.query.delete()


def seed_producers():
    print("Adding producers...")
    OPERATIONS = ["small", "medium", "large", "family", "corporate"]

    for _ in range(10):
        producer = Producer(
            name=fake.company(),
            founding_year=randint(1900, 2020),
            region=fake.state(),
            operation_size=rc(OPERATIONS),
            image=fake.image_url(),
        )
        db.session.add(producer)
        db.session.commit()


def seed_cheeses():
    print("Adding cheeses...")

    CHEESE_KINDS = [
        "cheddar",
        "gouda",
        "brie",
        "camembert",
        "swiss",
        "blue",
        "goat",
        "asiago",
        "parmesan",
        "pecorino",
        "manchego",
        "feta",
        "halloumi",
        "mozzarella",
        "provolone",
        "ricotta",
        "paneer",
        "queso blanco",
        "queso fresco",
        "queso oaxaca",
    ]

    CHEESE_IMAGE_URLS = [
        "https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/306801/pexels-photo-306801.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/4187779/pexels-photo-4187779.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/4109946/pexels-photo-4109946.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/4109943/pexels-photo-4109943.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/4187778/pexels-photo-4187778.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/4187782/pexels-photo-4187782.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/4198114/pexels-photo-4198114.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/128839/pexels-photo-128839.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/793129/pexels-photo-793129.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3522515/pexels-photo-3522515.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ]

    for c in CHEESE_KINDS:
        cheese = Cheese(
            kind=c,
            price=round(uniform(1.99, 34.86), 2),
            producer_id=rc(Producer.query.all()).id,
            image=rc(CHEESE_IMAGE_URLS),
            is_raw_milk=fake.boolean(),
            production_date=fake.date_between(start_date="-5y", end_date="today"),
        )
        db.session.add(cheese)
        db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        clear_tables()
        seed_producers()
        seed_cheeses()
        print("Done!")
