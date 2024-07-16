import json
from urllib.parse import urlencode
from dotenv import load_dotenv
from flask_migrate import Migrate
load_dotenv()  # noqa
from auth import requires_auth
from models.user import User
from models.board import Board
from models.diagram import Diagram
from models.chat import Chat
from db_config import BaseConfig
from flask import Flask, redirect, request, session, url_for
from flask_cors import CORS
from os import environ as env
from urllib.parse import quote_plus, urlencode
from authlib.integrations.flask_client import OAuth
from database.session import db

app = Flask(__name__)
app.config.from_object(BaseConfig)
CORS(app)
db.init_app(app)
migrate = Migrate(app, db)

app.secret_key = env.get("APP_SECRET_KEY")

oauth = OAuth(app)
app.secret_key = env.get("APP_SECRET_KEY")
oauth.register(
    "auth0",
    client_id=env.get("AUTH0_CLIENT_ID"),
    client_secret=env.get("AUTH0_CLIENT_SECRET"),
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f"https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration"  # noqa
)


@app.route("/api/login")
def login():
    return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("callback", _external=True)
    )


@app.route("/api/callback", methods=["GET", "POST"])
def callback():
    token = oauth.auth0.authorize_access_token()
    if token:
        session["access_token"] = token["access_token"]
        userinfo = token["userinfo"]
        user = db.session.query(User).filter_by(sub=userinfo["sub"]).first()
        if user is None:
            user = User(
                name=userinfo["name"],
                email=userinfo["email"],
                profile_picture_url=userinfo["picture"],
                sub=userinfo["sub"],
            )
            db.session.add(user)
            db.session.commit()

        return json.dumps(user)


@app.route("/api/logout")
def logout():
    session.clear()
    return redirect(
        "https://" + env.get("AUTH0_DOMAIN")
        + "/v2/logout?"
        + urlencode(
            {
                "returnTo": url_for("home", _external=True),
                "client_id": env.get("AUTH0_CLIENT_ID"),
            },
            quote_via=quote_plus,
        )
    )


@app.route("/api/boards/create_board", methods=["POST"])
def create_board():
    from services.board_service import BoardService

    service = BoardService()

    diagram = service.create_board(
        name=request.json["name"], user_id=request.json["user_id"], requirements=request.json["requirements"])
    return diagram


@app.route("/api/boards/update_board", methods=["POST"])
def update_board():
    from services.board_service import BoardService

    service = BoardService()

    board = service.update_board(
        board_id=request.json["board_id"], title=request.json["title"])
    return json.dumps(board.to_dict())


@app.route("/api/boards/chat", methods=["POST"])
def chat():
    from services.chat_service import ChatService

    service = ChatService()

    board = service.chat(
        new_message=request.json["new_message"], board_id=request.json["board_id"])
    return json.dumps(board.to_dict())


@app.route("/api/diagrams/update", methods=["POST"])
def update_diagram():
    from services.diagram_service import DiagramService

    service = DiagramService()

    diagram = service.update(
        diagram_id=request.json["id"], content=request.json["content"])
    return json.dumps(diagram.to_dict())


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
