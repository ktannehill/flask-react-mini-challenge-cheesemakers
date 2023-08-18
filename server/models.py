from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}

metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata, engine_options={"echo": True})


class TimestampMixin:
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now()
    )


class Producer(db.Model, SerializerMixin, TimestampMixin):
    __tablename__ = "producers"

    serialize_rules = ("-cheeses.producer", "-created_at", "-updated_at")

    id = db.Column(db.Integer, primary_key=True)
    founding_year = db.Column(db.Integer)
    name = db.Column(db.String)
    region = db.Column(db.String)
    operation_size = db.Column(db.String)
    image = db.Column(db.String)

    cheeses = db.relationship("Cheese", backref="producer", lazy=True)

    def __repr__(self):
        return f"<Producer {self.id} Name: {self.name}>"


class Cheese(db.Model, SerializerMixin, TimestampMixin):
    __tablename__ = "cheeses"

    serialize_rules = ("-producer.cheeses", "-created_at", "-updated_at")

    id = db.Column(db.Integer, primary_key=True)
    kind = db.Column(db.String)
    is_raw_milk = db.Column(db.Boolean)
    production_date = db.Column(db.DateTime)
    image = db.Column(db.String)
    price = db.Column(db.Float)

    producer_id = db.Column(db.Integer, db.ForeignKey("producers.id"), nullable=False)

    def __repr__(self):
        return f"<Cheese {self.id}>"

    @validates("price")
    def validate_price(self, key, price):
        if not 1.00 <= price <= 45.00:
            raise ValueError("Price must be between 1.00 and 45.00")
        return price
