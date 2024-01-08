from flask import Flask, request
from flask_restx import Namespace, Resource, fields
from config import DevConfig
from models import User, Game
from exts import db
from flask_jwt_extended import get_jwt_identity, jwt_required

games_api = Namespace('Games', 'Anything to do with sending of the games')

game_model = games_api.model('Model', {
    'winner': fields.String(),
    'player_username': fields.String(),
    'moves': fields.String(),
})


@games_api.route('/games')
class GamesResource(Resource):
    @jwt_required()
    @games_api.marshal_list_with(game_model)
    def get(self):
        username = get_jwt_identity()

        games = Game.query.filter_by(player_username=username).all()

        return games if games else jsonify({'message':'no games in the database'})

    @jwt_required()
    @games_api.marshal_with(game_model)
    @games_api.expect(game_model)
    def post(self):
        data = request.get_json()
        username = get_jwt_identity()

        game = Game(winner = data.get('winner'),
                    player_username = username,
                    moves=data.get('moves'))

        game.save()

        return game, 201 
