import os

from flask import Flask
from os import environ as env
from flask_cors import CORS
from authlib.integrations.flask_client import OAuth
from database.session import db

def init_app(app_name=__name__):
    environment = os.getenv('ENVIRONMENT', 'development')
    flask_app = Flask(app_name, instance_relative_config=True)
    flask_app.url_map.strict_slashes = False
    CORS(flask_app)
    flask_app.secret_key = env.get("APP_SECRET_KEY")

    oauth = OAuth(flask_app)

    oauth.register(
        "auth0",
        client_id=env.get("AUTH0_CLIENT_ID"),
        client_secret=env.get("AUTH0_CLIENT_SECRET"),
        client_kwargs={
            "scope": "openid profile email",
        },
        server_metadata_url=f'https://{env.get("AUTH0_DOMAIN")
                                       }/.well-known/openid-configuration'
    )
    # Config DB
    
    db.init_app(flask_app)

    __config_blueprints(flask_app)
def __config_blueprints(flask_app):
    from server.apis import api
    flask_app.register_blueprint(api)