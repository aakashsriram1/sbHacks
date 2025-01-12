
# models/streak.py
from datetime import datetime
from BackEnd.models import db

class Streak(db.Model):
    __tablename__ = 'streaks'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    goal_date = db.Column(db.DateTime, nullable=False)
    locked_fee = db.Column(db.Float, nullable=False)
    current_streak_days = db.Column(db.Integer, default=0)
    status = db.Column(db.String(20), default='ongoing')  # could be 'ongoing', 'completed', 'failed'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship back to User
    user = db.relationship('User', back_populates='streaks')

    def __init__(self, user_id, goal_date, locked_fee, current_streak_days=0, status='ongoing', created_at=None, updated_at=None):
        self.user_id = user_id
        self.goal_date = goal_date
        self.locked_fee = locked_fee
        self.current_streak_days = current_streak_days
        self.status = status
        self.created_at = created_at or datetime.utcnow()
        self.updated_at = updated_at or datetime.utcnow()

    def __repr__(self):
        return f'<Streak {self.id}, User {self.user_id}, Status {self.status}>'