from flask_restx import Resource, Namespace, fields
from models import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    jwt_required,
)
from flask import Flask, request, jsonify, make_response


auth_api = Namespace("auth", description="Anything to do with Authentication.")


auth_model = auth_api.model(
    "SignUp",
    {
        "username": fields.String(),
        "password": fields.String()
    }
)

@auth_api.route('/signup')
class SignUp(Resource):
    @auth_api.expect(auth_model)
    def post(self):

        data = request.get_json()

        username = data.get('username')
        password = data.get('password')

        db_user = User.query.filter_by(username=username).first()
        print('db_user is:', db_user, 'type(db_user)', type(db_user))
        if db_user is not None:
            print('there is already a user with that name')
            return jsonify({'message': f'{username} is already taken'})

        user = User(username=username,
                    hashed_password = generate_password_hash(password))
        user.save()

        print('success. nice')
        return make_response(jsonify({'message': f'user {username} created successfully'}),201)
        
@auth_api.route('/login')
class LogIn(Resource):
    @auth_api.expect(auth_model)
    def post(self):

        data = request.get_json()

        username = data.get('username')
        password = data.get('password')

        db_user = User.query.filter_by(username=username).first()

        if db_user is None or not check_password_hash(db_user.hashed_password, password):
            return jsonify({'message': 'username or password are incorrect'})

        access_token = create_access_token(identity=db_user.username)
        refresh_token = create_refresh_token(identity=db_user.username)

        return jsonify({'access_token':access_token,
                        'refresh_token':refresh_token})
        
@auth_api.route('/refresh')
class Refresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        user = get_jwt_identity()

        access_token = create_access_token(identity=user)

        return make_response(jsonify({'access_token':access_token}),200)