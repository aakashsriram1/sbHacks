# from routes.auth_routes import auth_bp
# from routes.streak_routes import streak_bp
from BackEnd.models import payment_bp
from flask import Flask

from models.user import db as user_db
from models.streak import db as streak_db

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///accountability.db'  # or another DB engine
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize the shared db instance
    user_db.init_app(app)
    streak_db.init_app(app)

    with app.app_context():
        # Create tables if they don't exist
        user_db.create_all()
        streak_db.create_all()

    # Register blueprints
    # app.register_blueprint(auth_bp)
    # app.register_blueprint(streak_bp)
    app.register_blueprint(payment_bp)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)