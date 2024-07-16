from models.user import User
from database.session import db


class UserService():
    def __init__(self) -> None:
        pass

    def create_user(self, name, email, profile_picture_url, sub):
        user = User(name, email, profile_picture_url, sub)
        db.session.add(user)
        db.session.commit()
        return user
