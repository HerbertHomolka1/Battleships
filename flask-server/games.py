from flask import Flask, request
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required
from config import DevConfig
from models import User, Game
from exts import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    jwt_required,
)


game_api = Namespace('Games','Everything related with games.')

game_model = game_api.model(
    'SignUp', {
        'winner' : fields.String(),
        'player_username': fields.String(),
         'moves': fields.String()
    }
)

@game_api.route('/games')
class GamesResource(Resource):
    @jwt_required()
    @game_api.marshal_list_with(game_model)
    def get(self):

        username = get_jwt_identity()

        games = Game.query.filter_by(user_username=username).all()

        return games

    @game_api.marshal_with(game_model)
    @game_api.expect(game_model)
    @jwt_required()
    def post(self):
        
        data = request.json()
        
        game = Game(winner=data.get('winner'),
                    user_username=data.get('username'), 
                    ships=data.get('ships'))

        game.save()
        return game, 201 # created
