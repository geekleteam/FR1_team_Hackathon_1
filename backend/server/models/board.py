from database.session import db
from sqlalchemy.dialects.postgresql import JSON


class Board(db.Model):
    __tablename__ = 'boards'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    requirements = db.Column(JSON, nullable=False)

    def __init__(self, title, user_id, requirements):
        self.title = title
        self.user_id = user_id
        self.requirements = requirements

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'user_id': self.user_id,
            'requirements': self.requirements
        }
