from flask import url_for
from apis.main import bp


@bp.route('/')
def index():
    return "Hello world"

@bp.route("/login")
def login():
    return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("callback", _external=True)
    )


@bp.route("/callback", methods=["GET", "POST"])
def callback():
    token = oauth.auth0.authorize_access_token()
    if token:
        session["user"] = token
        user_info = oauth.auth0.userinfo(token)
        user = db.session.query(User).filter_by(sub=user_info["sub"]).first()
        if user is None:
            user = User(
                name=user_info["name"],
                email=user_info["email"],
                profile_picture_url=user_info["picture"],
                sub=user_info["sub"],
            )
            db.session.add(user)
            db.session.commit()

    return redirect("/")


@bp.route("/logout")
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