from database.session import db


class Chat(db.Model):
    __tablename__ = 'chat'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    board_id = db.Column(db.Integer, nullable=False)
    question = db.Column(db.String(), nullable=False)
    answer = db.Column(db.String(), nullable=False)

    def __init__(self, user_id, board_id, question, answer):
        self.user_id = user_id
        self.board_id = board_id
        self.question = question
        self.answer = answer

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'board_id': self.board_id,
            'question': self.question,
            'answer': self.answer
        }
