from services.diagram_service import DiagramService
from models.board import Board
from database.session import db


class BoardService():
    def __init__(self) -> None:
        self.diagram_service = DiagramService()

    def create_board(self, name, user_id, requirements):
        try:
            board = Board(name, user_id, requirements)
            db.session.add(board)
            db.session.commit()
            response = self.diagram_service.create_first_diagram(
                board.id, requirements)
            return response

        except:
            raise ValueError("Internal server error. Please try again.")

    def update_board(self, board_id, title) -> Board:
        board = Board.query.get(board_id)
        if board is None:
            raise ValueError("Board not found.")
        board.title = title
        db.session.commit()
        return board
