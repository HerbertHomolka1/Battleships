from exts import db

#each user can have many maps
class User(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String, nullable=False) 
    hashed_password = db.Column(db.Text,nullable=False)

    maps = db.relationship('Map', backref='user',lazy = True)

    def __repr__(self):
        return f'<User {self.username}>'    

    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()


#theres a list of maps here. each leads to a map db
class Map(db.Model):
    id = db.Column(db.Integer,primary_key=True)

    player_username = db.Column(db.String,db.ForeignKey('user.username'),nullable=False)

    map = db.Column(db.Text)

    def __repr__(self):
        return f'Maps of Player <{self.player_username}>'    


    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()