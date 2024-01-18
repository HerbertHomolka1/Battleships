from flask import Flask
from flask_restx import Api
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from auth import auth_api
from games import game_api
from config import DevConfig
from auth import socketio as auth_socketio
from models import User, Game
from exts import db

def create_app(config):
    app = Flask(__name__)
    app.config.from_object(DevConfig)

    # Enable CORS for all routes
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "supports_credentials": True}})

    db.init_app(app)
    JWTManager(app)
    
    api = Api(app, doc='/docs')

    api.add_namespace(auth_api)
    api.add_namespace(game_api)

    # Attach SocketIO instance to the app
    auth_socketio.init_app(app, cors_allowed_origins="http://localhost:3000")


    @app.shell_context_processor
    def make_shell_context():
        return {
            'db': db,
            'User': User,
            'Game': Game
        }

    return app

app = create_app(DevConfig)

if __name__ == "__main__":
    # Use socketio.run instead of app.run to include SocketIO functionality
    auth_socketio.run(app, debug=True)
