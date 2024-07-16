from flask import jsonify
from models.user import User


def index():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])