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
from flask import Flask, request, jsonify, make_response
from flask_cors import cross_origin
from flask_socketio import SocketIO 


auth_api = Namespace('auth', description='Resource handling related to authentication.')
socketio = SocketIO()

auth_model = auth_api.model(
    'auth', {
        'username' : fields.String(),
        'password': fields.String()
    }
)

# class Users:
#     def __init__(self):
#         self.logged = set()
#     def add_logged(username):
#         self.logged.add(username)
#     def remove_logged(username):
#         self.logged.remove(username)

# users = Users()

lobby = []


# @socketio.on('connect', namespace='/auth')
# def connect():
#     # username = 'nnn'
#     # users.add_logged(username)
#     socketio.emit('update users', 'backend: all is good')

# @socketio.on('connect', namespace='/auth')
# def connect():
#     print('got connect')
#     socketio.emit('update users', lobby, namespace='/auth')


@socketio.on('connect', namespace='/auth')
@jwt_required()
def connect():
    print('got connect')
    
    username = get_jwt_identity()
    if username not in [user['username'] for user in lobby]:
        sid= request.sid
        print(username)
        print('appending lobby...')
        lobby.append({'username': username, 'sid':sid, 'challengers': []})
        print('lobby: ', lobby)
    

    socketio.emit('update users', [user['username'] for user in lobby], namespace='/auth')

@socketio.on('disconnect', namespace='/auth')
def disconnect():
    sid = request.sid
    user_to_remove = None
    for i,user in enumerate(lobby):
        if user['sid'] == sid:
            del lobby[i]
            print(f'User disconnected: {user['username']}')
            print('Updated lobby:', lobby)
            socketio.emit('update users', [user['username'] for user in lobby], namespace='/auth')
            break

def new_duel():
    pass

@socketio.on('challenge',namespace='/auth')
@jwt_required
def send_challenge():
    data = request.get_json()

    username = get_jwt_identity()
    opponent = data.get('opponent')

    oponent_ready = False
    search_successful = False
    for user in lobby.items():
        if name == opponent:
            search_successful = True
            user1_ready = True
            user['challerngers'] += 'opponent'
            
    
    if search_successful:
        if oponent_ready:
            new_duel() #create a new room for both. they shall duel
        else:
            payload = {'opponent': user['username'], 'status': 'waiting'}
            socketio.emit('challenge', payload.jsonify() , room=username['sid']) 
    else:
        payload = {'opponent': opponent, 'status': 'rejected'}
        socketio.emit('challenge', payload.jsonify(), room=request.sid) 
        

        

@auth_api.route('/signup')
class SignUp(Resource):
    @auth_api.expect(auth_model)
    def post(self):

        data = request.get_json()
        username = data.get('username')
        db_user = User.query.filter_by(username=username).first()
        if db_user is not None: # such username already taken in the db
            return jsonify({'message': f'{username} is already taken'})
        
        new_user = User(
            username=data.get('username'),
            hashed_password=generate_password_hash(data.get('password'))
        )

        new_user.save()

        return make_response(jsonify({'message':'user created successfully'}),201) # 201 created

@auth_api.route('/login')
class Login(Resource):
    @auth_api.expect(auth_model)
    def post(self):

        data = request.get_json()

        username = data.get('username')
        password = data.get('password')

        db_user = User.query.filter_by(username=username).first()

        if db_user is None or not check_password_hash(db_user.hashed_password,password): # no such username in db or passwords dont match
            return jsonify({'message':'incorrect username or password'})
        

        access_token = create_access_token(identity=db_user.username)
        refresh_token = create_refresh_token(identity=db_user.username)

        # connect() # here we connect again, now with the access token

        return jsonify({
            'access_token': access_token,
            'refresh_token': refresh_token
        })


@auth_api.route('/refresh')
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):

        user = get_jwt_identity()
        new_access_token = create_access_token(identity=user)

        return make_response(jsonify({'access_token': new_access_token}),200)