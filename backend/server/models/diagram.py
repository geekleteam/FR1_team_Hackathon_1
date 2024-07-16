from database.session import db
from sqlalchemy.dialects.postgresql import JSON


class Diagram(db.Model):
    __tablename__ = 'diagrams'

    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, nullable=False)
    path = db.Column(db.String(), nullable=False)
    content = db.Column(JSON, nullable=False)

    def __init__(self, board_id, path, content):
        self.board_id = board_id
        self.path = path
        self.content = content

    def to_dict(self):
        return {
            'id': self.id,
            'board_id': self.board_id,
            'path': self.path,
            'content': self.content
        }