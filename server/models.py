from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

db = SQLAlchemy()


class Producer(db.Model, SerializerMixin):
    __tablename__ = "producers"

    id = db.Column(db.Integer, primary_key=True)
    founding_year = db.Column(db.Integer)
    name = db.Column(db.String)
    region = db.Column(db.String)
    operation_size = db.Column(db.String)
    image = db.Column(db.String)

    cheeses = db.relationship('Cheese', back_populates='producer', cascade="all, delete-orphan")
    serialize_rules = ("-cheeses.producer",)

    @validates('name')
    def validate_name(self, _, name):
        if not name:
            raise ValueError("Must have name")
        return name
    
    @validates('founding_year')
    def validate_year(self, _, year):
        if 1900 > year > 2023:
            raise ValueError("Year must be between 1900-2023")
        return year
    
    @validates('operation_size')
    def validate_operation(self, _, size):
        if size not in ['small', 'medium', 'large', 'family', 'corporate']:
            raise ValueError("Options are: small, medium, large, family, or corporate")
        return size

    def __repr__(self):
        return f"<Producer {self.id}>"


class Cheese(db.Model, SerializerMixin):
    __tablename__ = "cheeses"

    id = db.Column(db.Integer, primary_key=True)
    producer_id = db.Column(db.Integer, db.ForeignKey("producers.id"))
    kind = db.Column(db.String)
    is_raw_milk = db.Column(db.Boolean)
    production_date = db.Column(db.DateTime)
    image = db.Column(db.String)
    price = db.Column(db.Float)

    producer = db.relationship("Producer", back_populates="cheeses")
    serialize_rules = ("-producer.cheeses",)

    @validates('production_date')
    def validate_production(self, _, date):
        if date > db.session.query(db.func.now()).scalar().date():
            raise ValueError("Cannot be produced in future")
        return date
    
    @validates('price')
    def validate_price(self, _, price):
        if price < 1.00 or price > 45.00:
            raise ValueError("Price must be between $1.00 and $45.00")
        return price

    def __repr__(self):
        return f"<Cheese {self.id}>"
