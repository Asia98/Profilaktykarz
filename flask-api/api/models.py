# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from datetime import datetime

from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import INTEGER
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()
migrate = Migrate()


class Users(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(32), nullable=False)
    email = db.Column(db.String(64), nullable=False)
    password = db.Column(db.Text())
    jwt_auth_active = db.Column(db.Boolean())
    date_joined = db.Column(db.DateTime(), default=datetime.utcnow)

    def __repr__(self):
        return f"User {self.username}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def update_email(self, new_email):
        self.email = new_email

    def update_username(self, new_username):
        self.username = new_username

    def check_jwt_auth_active(self):
        return self.jwt_auth_active

    def set_jwt_auth_active(self, set_status):
        self.jwt_auth_active = set_status

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def toDICT(self):
        cls_dict = {}
        cls_dict['_id'] = self.id
        cls_dict['username'] = self.username
        cls_dict['email'] = self.email

        return cls_dict

    def toJSON(self):
        return self.toDICT()


class JWTTokenBlocklist(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    jwt_token = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)

    def __repr__(self):
        return f"Expired Token: {self.jwt_token}"

    def save(self):
        db.session.add(self)
        db.session.commit()


class Factor(db.Model):
    __tablename__ = 'factors'

    id = db.Column(db.Integer, primary_key=True)
    area = db.Column(db.String(50), nullable=False)
    factor = db.Column(db.String(100), nullable=False)
    comment = db.Column(db.String(500))

    def __repr__(self):
        return f"Factor {self.factor}"

    @classmethod
    def get_all(cls):
        return cls.query.all()


class MedicalCheckup(db.Model):
    __tablename__ = 'medical_checkups'

    id = db.Column(db.Integer, primary_key=True)
    age_from = db.Column(db.SmallInteger, nullable=False)
    age_to = db.Column(db.SmallInteger, nullable=False)
    gender = db.Column(db.String(1))
    medical_checkup = db.Column(db.String(100), nullable=False)
    family_factors = db.Column(db.ARRAY(INTEGER()))
    user_factors = db.Column(db.ARRAY(INTEGER()))
    cycle_years = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f"Medical checkup {self.medical_checkup}"


class UsersMedicalInfo(Users):
    __tablename__ = 'users_medical_info'

    user_id = db.Column(db.ForeignKey('users.id'), primary_key=True)
    birth_date = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(1), nullable=False)
    family_factors = db.Column(db.ARRAY(INTEGER()))
    user_factors = db.Column(db.ARRAY(INTEGER()))
    last_filled = db.Column(db.DateTime, nullable=False, server_default=db.FetchedValue())


class UsersCheckupHistory(db.Model):
    __tablename__ = 'users_checkup_history'

    id = db.Column(db.Integer, primary_key=True, server_default=db.FetchedValue())
    user_id = db.Column(db.ForeignKey('users.id'), nullable=False)
    checkup_id = db.Column(db.ForeignKey('medical_checkups.id'), nullable=False)
    medical_checkup = db.Column(db.String(100), nullable=False)
    last_checkup_date = db.Column(db.Date)
    is_last_checkup_good = db.Column(db.SmallInteger)
    last_filled = db.Column(db.DateTime, nullable=False, server_default=db.FetchedValue())

    checkup = db.relationship('MedicalCheckup', primaryjoin='UsersCheckupHistory.checkup_id == MedicalCheckup.id',
                              backref='users_checkup_histories')
    user = db.relationship('Users', primaryjoin='UsersCheckupHistory.user_id == Users.id',
                           backref='users_checkup_histories')
