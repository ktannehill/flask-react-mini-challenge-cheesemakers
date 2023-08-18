from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import Cheese, Producer, db

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)


# @app.route("/")
# def index():
#     response = make_response({"message": "Hello Fromagers!"}, 200)
#     return response


class Producers(Resource):
    def get(self):
        producers = [
            producer.to_dict(rules=("-cheeses",)) for producer in Producer.query.all()
        ]
        response = make_response(jsonify(producers), 200)
        return response


class ProducersById(Resource):
    def get(self, id):
        producer = Producer.query.get_or_404(id)
        response = make_response(jsonify(producer.to_dict()), 200)
        return response


api.add_resource(Producers, "/producers")
api.add_resource(ProducersById, "/producers/<int:id>")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
