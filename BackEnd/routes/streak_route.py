# routes/streak_routes.py
from datetime import datetime

from flask import Blueprint, request, jsonify
from BackEnd.models.streak import Streak
from BackEnd.models.user import User
from BackEnd.services.ai_validation import validate_report
from BackEnd.models import db

streak_bp = Blueprint('streak_bp', __name__, url_prefix='/api/streak')

@streak_bp.route('/create', methods=['POST'])
def create_streak():
    data = request.json
    goal_date = data.get('goalDate')
    locked_fee = data.get('lockedFee')
    user_id = data.get('userId')

    # Validate inputs
    if not all([goal_date, locked_fee, user_id]):
        return jsonify({"error": "Missing fields"}), 400

    # Create streak
    new_streak = Streak(
        user_id=user_id,
        goal_date=goal_date,
        locked_fee=locked_fee,
        current_streak_days=0,
        status='ongoing',
        created_at = datetime.utcnow(),
    )
    db.session.add(new_streak)
    db.session.commit()

    return jsonify({
        "message": "Streak created successfully",
        "streakId": new_streak.id
    }), 201

@streak_bp.route('/<int:streak_id>/checkin', methods=['POST'])
def checkin(streak_id):
    # Fetch the streak from DB
    streak = Streak.query.get_or_404(streak_id)
    # Perform check-in logic (e.g., ensure not already checked in today)
    # ...
    # check if last update was within 24 hours

    return jsonify({"message": "Check-in successful"}), 200

@streak_bp.route('/<int:streak_id>/report', methods=['POST'])
def submit_report(streak_id):
    streak = Streak.query.get_or_404(streak_id)
    data = request.json
    # e.g., { "solutionDetails": "...", "timeSpent": 30, "additionalQuestions": "..." }
    # AI validation
    is_valid = validate_report(data)
    if not is_valid:
        return jsonify({"error": "Report validation failed"}), 400

    # If valid, increment streak day
    streak.current_streak_days += 1
    # Check if goal is met or exceeded
    # ...
    # db.session.commit()

    return jsonify({"message": "Report submitted successfully"}), 200

@streak_bp.route('/<int:streak_id>', methods=['GET'])
def get_streak_details(streak_id):
    streak = Streak.query.get_or_404(streak_id)
    return jsonify({
        "streakId": streak.id,
        "currentStreakDays": streak.current_streak_days,
        "goalDate": str(streak.goal_date),
        "status": streak.status
    }), 200

@streak_bp.route('/<int:streak_id>/fail', methods=['POST'])
def fail_streak(streak_id):
    streak = Streak.query.get_or_404(streak_id)
    # Mark as failed in DB
    streak.status = 'failed'
    # db.session.commit()
    return jsonify({"message": "Streak has been marked as failed"}), 200