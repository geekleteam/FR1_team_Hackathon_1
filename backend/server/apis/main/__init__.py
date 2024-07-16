from flask import Blueprint

bp = Blueprint('main', __name__)


from apis.main import routes
