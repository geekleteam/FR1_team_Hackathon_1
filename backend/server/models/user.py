from database.session import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), unique=True, nullable=False)
    profile_picture_url = db.Column(db.String(), nullable=True)
    sub = db.Column(db.String(80), unique=True, nullable=False)

    def __init__(self, name, email, profile_picture_url, sub):
        self.name = name
        self.email = email
        self.profile_picture_url = profile_picture_url
        self.sub = sub

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'profile_picture_url': self.profile_picture_url,
            'sub': self.sub
        }
