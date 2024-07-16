import anthropic
from langchain.memory import ConversationSummaryMemory, ChatMessageHistory

from models.diagram import Diagram
from models.chat import Chat
from models.board import Board
from database.session import db
from langchain.chains import ConversationChain
json_template = """
{
         "nodes": [
                {
                "id": "nodeId",
                "type": "service",
                "position": {
                    "x": 0,
                    "y": 0
                },
                "data": {
                    "icon": "emoji",
                    "label": "Node Label"
                },
                "measured": {
                    "width": 100,
                    "height": 50
                }
                },
                ...
            ],
            "edges": [
                {
                "id": "edgeId",
                "source": "sourceNodeId",
                "target": "targetNodeId"
                },
                ...
            ],
            "message": "<interactive message with user explaining the changes in the diagram>"
        }
"""


class ChatService():
    def __init__(self):
        self.model = 'claude-3-haiku-20240307'
        self.llm = anthropic.Anthropic()

    def chat(self, new_message, board_id):
        board = db.session.query(Board).filter_by(
            id=board_id).first()
        diagram = db.session.query(Diagram).filter_by(
            board_id=board_id).first()
        requirements = ""
        if board:
            requirements = board.requirements
        content = ""
        if diagram:
            content = diagram.content

        buffer = f"""
        The user has the following requirements: {requirements}.
        The diagram is as follows: {content}
        Strictly response with the following JSON format:
        {json_template}"""

        chat_history = db.session.query(
            Chat).filter_by(board_id=board_id).all()
        history = ChatMessageHistory()
        for chat in chat_history:
            history.add_user_message(chat.question)
            history.add_ai_message(chat.answer)

        memory = ConversationSummaryMemory(
            llm=self.llm,
            buffer=buffer,
            chat_memory=history)

        conversation = ConversationChain(
            llm=self.llm,
            memory=memory,
        )

        answer = conversation.predict(input=new_message)

        chat = Chat(board_id, new_message, answer)
        db.session.add(chat)
        db.session.commit()
        return answer
