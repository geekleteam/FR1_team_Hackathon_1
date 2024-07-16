from flask import Blueprint


bp = Blueprint('posts', __name__)

from apis.users import routes  # noqa
