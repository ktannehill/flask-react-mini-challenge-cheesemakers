from flask import Flask, request
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from datetime import datetime
from models import Cheese, Producer, db

# from flask_restful import Api, Resource


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)

# api = Api(app)
api = Api(app)

@app.route("/")
def index():
    return {"message": "Hello Fromagers!"}, 200

class Producers(Resource):
    def get(self):
        prod_dict = [producer.to_dict(rules=("-cheeses",)) for producer in Producer.query.all()]
        return prod_dict, 200
    
api.add_resource(Producers, '/producers')

class ProducersById(Resource):
    def get(self, id):
        prod = db.session.get(Producer, id)
        return prod.to_dict(), 200
    
    def delete(self, id):
        prod = db.session.get(Producer, id)
        try:
            db.session.delete(prod)
            db.session.commit()
            return {}, 204
        except:
            db.session.rollback()
            return {'error': 'Resource not found'}, 404
    
api.add_resource(ProducersById, '/producers/<int:id>', methods=['GET', 'PATCH', 'DELETE'])

class Cheeses(Resource):
    def get(self):
        cheese_dict = [cheese.to_dict() for cheese in Cheese.query.all()]
        return cheese_dict, 200
    
    def post(self):
        try:
            data = request.get_json()
            data["production_date"] = datetime.strptime(data["production_date"], "%Y-%m-%d").date()
            new_cheese = Cheese(**data)
            db.session.add(new_cheese)
            db.session.commit()
            return new_cheese.to_dict(), 201
        # except:
        #     db.session.rollback()
        #     return {'errors': ['validation errors']}, 400
        except ValueError as ve:
            db.session.rollback()
            return {'errors': [str(ve)]}, 400
        except Exception as e:
            db.session.rollback()
            return {'errors': [str(e)]}, 400

api.add_resource(Cheeses, '/cheeses', methods=['GET', 'POST'])

class CheesesById(Resource):
    def patch(self, id):
        cheese = db.session.get(Cheese, id)
        try:
            data = request.get_json()
            data["production_date"] = datetime.strptime(data["production_date"], "%Y-%m-%d").date()
            for k, v in data.items():
                setattr(cheese, k, v)
            db.session.commit()
            return cheese.to_dict(), 200
        except:
            db.session.rollback()
            return {"errors": ["validation errors"]}, 400
        
    def delete(self, id):
        cheese = db.session.get(Cheese, id)
        try:
            db.session.delete(cheese)
            db.session.commit()
            return {}, 204
        except:
            return {'error': 'Rescource not found'}, 404


api.add_resource(CheesesById, '/cheeses/<int:id>', methods=['GET', 'PATCH', 'DELETE'])

if __name__ == "__main__":
    app.run(port=5555, debug=True)
