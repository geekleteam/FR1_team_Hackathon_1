from flask import Blueprint

bp = Blueprint('board', __name__)


from apis.boards import routes
