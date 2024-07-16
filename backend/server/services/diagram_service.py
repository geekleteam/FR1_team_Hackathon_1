from models.diagram import Diagram
from database.session import db
from services.create_diagram_service import CreateDiagramService


class DiagramService():
    def __init__(self) -> None:
        self.create_diagram_service = CreateDiagramService()

    def create_first_diagram(self, board_id, requirements, path="/"):
        try:
            content = self.create_diagram_service.generate_diagram(
                requirements)
            diagram = Diagram(board_id, path, content)
            db.session.add(diagram)
            db.session.commit()
            return content
        except:
            raise ValueError("Internal server error. Please try again.")

    def update(self, diagram_id, content):
        diagram = Diagram.query.get(diagram_id)
        diagram.content = content
        db.session.commit()
        return diagram

    def regenerate(self, diagram_id, requirements):
        diagram = Diagram.query.get(diagram_id)

        try:
            content = self.create_diagram_service.generate_diagram(
                requirements, temperture=0.5)
            diagram.content = content
            db.session.commit()
            return content
        except:
            raise ValueError("Internal server error. Please try again.")
