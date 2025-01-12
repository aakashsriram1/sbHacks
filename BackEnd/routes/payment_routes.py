# routes/payment_routes.py
from flask import Blueprint, request, jsonify
from services.payment_service import lock_funds, unlock_funds, forfeit_funds

payment_bp = Blueprint('payment_bp', __name__, url_prefix='/api/payment')

@payment_bp.route('/lock', methods=['POST'])
def lock():
    data = request.json
    user_id = data.get('userId')
    amount = data.get('amount')

    if not all([user_id, amount]):
        return jsonify({"error": "Missing userId or amount"}), 400

    transaction_id = lock_funds(user_id, amount)
    return jsonify({
        "message": "Funds locked successfully",
        "transactionId": transaction_id
    }), 200

@payment_bp.route('/unlock', methods=['POST'])
def unlock():
    data = request.json
    user_id = data.get('userId')
    streak_id = data.get('streakId')

    if not all([user_id, streak_id]):
        return jsonify({"error": "Missing userId or streakId"}), 400

    success = unlock_funds(user_id, streak_id)
    if success:
        return jsonify({"message": "Funds unlocked successfully"}), 200
    else:
        return jsonify({"error": "Could not unlock funds"}), 400

@payment_bp.route('/forfeit', methods=['POST'])
def forfeit():
    data = request.json
    user_id = data.get('userId')
    streak_id = data.get('streakId')

    if not all([user_id, streak_id]):
        return jsonify({"error": "Missing userId or streakId"}), 400

    success = forfeit_funds(user_id, streak_id)
    if success:
        return jsonify({"message": "Funds forfeited"}), 200
    else:
        return jsonify({"error": "Could not forfeit funds"}), 400