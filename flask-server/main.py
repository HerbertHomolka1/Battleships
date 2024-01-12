from flask import Flask, request
from flask_restx import Api, Resource, fields
from config import DevConfig
from models import User, Game
from exts import db
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from auth import auth_api
from games import game_api
from config import DevConfig
from flask_socketio import SocketIO

def create_app(config):
    app = Flask(__name__)
    app.config.from_object(DevConfig)
    # socketio = SocketIO(auth_api)
    CORS(app)
    
    db.init_app(app)
    # migrate=Migrate(app,db)
    JWTManager(app)
    
    api = Api(app, doc='/docs')

    api.add_namespace(auth_api)
    api.add_namespace(game_api)


    @app.shell_context_processor
    def make_shell_context():
        return {
            'db': db,
            'User': User,
            'Game':Game
        }

    return app

app = create_app(DevConfig)

if __name__ == "__main__":

    app.run()