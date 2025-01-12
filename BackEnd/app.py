from routes.streak_route import streak_bp
from models import db  # Assuming db is initialized in models/__init__.py



def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///accountability.db'  # Update for your DB
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Replace with a secure key

    db.init_app(app)
    jwt = JWTManager(app)

    with app.app_context():
        db.create_all()

    app.register_blueprint(streak_bp, url_prefix='/api')

    return app
