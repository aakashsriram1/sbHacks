from flask import Blueprint, request, jsonify
from BackEnd.models import db, Streak
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.streak import Streak


streak_bp = Blueprint('streaks', __name__)

@streak_bp.route('/streaks', methods=['GET'])
@jwt_required()
def get_streaks():
    user_id = get_jwt_identity()
    streaks = Streak.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "id": s.id,
        "name": s.name,
        "total_days": s.total_days,
        "completed_days": s.completed_days,
        "money_amount": s.money_amount,
    } for s in streaks])

@streak_bp.route('/streaks', methods=['POST'])
@jwt_required()
def add_streak():
    user_id = get_jwt_identity()
    data = request.json
    new_streak = Streak(
        user_id=user_id,
        name=data['name'],
        total_days=data['total_days'],
        completed_days=data.get('completed_days', 0),
        money_amount=data['money_amount']
    )
    db.session.add(new_streak)
    db.session.commit()
    return jsonify({"message": "Streak added!"}), 201
