from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()


class Producer(db.Model, SerializerMixin):
    __tablename__ = "producers"

    serialize_rules = ("-cheeses.producer",)

    id = db.Column(db.Integer, primary_key=True)
    founding_year = db.Column(db.Integer)
    name = db.Column(db.String)
    region = db.Column(db.String)
    operation_size = db.Column(db.String)
    image = db.Column(db.String)

    cheeses = db.relationship("Cheese", backref="producer", lazy=True)

    def __repr__(self):
        return f"<Producer {self.id} Name: {self.name}>"


class Cheese(db.Model, SerializerMixin):
    __tablename__ = "cheeses"

    serialize_rules = ("-producer.cheeses",)

    id = db.Column(db.Integer, primary_key=True)
    kind = db.Column(db.String)
    is_raw_milk = db.Column(db.Boolean)
    production_date = db.Column(db.DateTime)
    image = db.Column(db.String)
    price = db.Column(db.Float)

    producer_id = db.Column(db.Integer, db.ForeignKey("producers.id"), nullable=False)

    def __repr__(self):
        return f"<Cheese {self.id}>"
