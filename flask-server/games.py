from flask import Flask, request
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required
from config import DevConfig
from models import User, Map
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

map_model = game_api.model(
    'SignUp', {
        'winner' : fields.String(),
        'player_username': fields.String(),
         'moves': fields.String()
    }
)

@game_api.route('/maps')
class GamesResource(Resource):
    @jwt_required()
    @game_api.marshal_list_with(map_model)
    def get(self):

        username = get_jwt_identity()

        maps = Map.query.filter_by(user_username=username).all()

        return maps

    @game_api.marshal_with(map_model)
    @game_api.expect(map_model)
    @jwt_required()
    def post(self):
        
        data = request.json()
        
        map = Map(map=data.get('map'),
                    user_username=data.get('username'), 
                    )

        map.save()
        return map, 201 # created
