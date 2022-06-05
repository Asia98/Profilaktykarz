from datetime import datetime, timedelta

from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import INTEGER, func as f
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
    def get_all_factors(cls):
        return cls.query.all()

    @classmethod
    def get_family_factors(cls):
        return cls.query.filter(cls.area == "Choroba przewlekła").all()

    @classmethod
    def get_factors_id(cls):
        return [cls.id for cls in cls.get_all_factors()]

    def to_json(self):
        return {'id': self.id, 'factor': self.factor, 'comment': self.comment}


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
    link = db.Column(db.String(100))

    def __repr__(self):
        return f"Medical checkup {self.medical_checkup}"


class UsersMedicalInfo(db.Model):
    __tablename__ = 'users_medical_info'

    user_id = db.Column(db.ForeignKey('users.id'), primary_key=True)
    birth_date = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(1), nullable=False)
    family_factors = db.Column(db.ARRAY(INTEGER()))
    user_factors = db.Column(db.ARRAY(INTEGER()))
    last_filled = db.Column(db.DateTime, nullable=False, server_default=db.FetchedValue())

    user = db.relationship('Users', primaryjoin='UsersMedicalInfo.user_id == Users.id',
                           backref='users_medical_info')

    def save(self):
        self.last_filled = datetime.now()
        db.session.add(self)
        db.session.commit()

    def update_family_factors(self, family_factors):
        if not family_factors:
            family_factors = None
        self.family_factors = family_factors

    def update_user_factors(self, user_factors):
        if not user_factors:
            user_factors = None
        self.user_factors = user_factors

    @classmethod
    def get_by_user_id(cls, user_id):
        return cls.query.get(user_id)


class UsersCheckupHistory(db.Model):
    __tablename__ = 'users_checkup_history'

    id = db.Column(db.Integer, primary_key=True, server_default=db.FetchedValue())
    user_id = db.Column(db.ForeignKey('users.id'), nullable=False)
    checkup_id = db.Column(db.ForeignKey('medical_checkups.id'), nullable=False)
    last_checkup_date = db.Column(db.Date)
    is_last_checkup_good = db.Column(db.SmallInteger)
    last_filled = db.Column(db.DateTime, nullable=False, server_default=db.FetchedValue())

    checkup = db.relationship('MedicalCheckup', primaryjoin='UsersCheckupHistory.checkup_id == MedicalCheckup.id',
                              backref='users_checkup_histories')
    user = db.relationship('Users', primaryjoin='UsersCheckupHistory.user_id == Users.id',
                           backref='users_checkup_histories')

    def save(self):
        self.last_filled = datetime.now()
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_by_user_id(cls, user_id):
        return cls.query.filter_by(user_id=user_id).first()


class UsersCustomCheckup(db.Model):
    __tablename__ = 'users_custom_checkups'

    id = db.Column(db.Integer, primary_key=True, server_default=db.FetchedValue())
    user_id = db.Column(db.ForeignKey('users.id'), nullable=False)
    checkup_name = db.Column(db.String(100), nullable=False)
    last_checkup_date = db.Column(db.Date)
    cycle_days = db.Column(db.Integer)
    next_checkup_date = db.Column(db.Date)
    last_filled = db.Column(db.DateTime, nullable=False, server_default=db.FetchedValue())

    user = db.relationship('Users', primaryjoin='UsersCustomCheckup.user_id == Users.id',
                           backref='users_custom_checkups')

    def save(self):
        self.last_filled = datetime.now()
        db.session.add(self)
        db.session.commit()


t_users_checkups_vw = db.Table(
    'users_checkups_vw',
    db.Column('user_id', db.Integer),
    db.Column('checkup_id', db.Integer),
    db.Column('medical_checkup', db.String(100)),
    db.Column('cycle_years', db.Float)
)


def get_users_checkups(user_id):
    return db.session.query(t_users_checkups_vw).filter_by(user_id=user_id).all()


t_users_calendar_vw = db.Table(
    'users_calendar_vw',
    db.Column('user_id', db.Integer),
    db.Column('checkup_id', db.Integer),
    db.Column('medical_checkup', db.String(100)),
    db.Column('cycle_years', db.Float),
    db.Column('last_checkup', db.Text),
    db.Column('is_last_checkup_good', db.SmallInteger),
    db.Column('next_checkup_date', db.Text)
)


def get_users_calendar(user_id):
    events = db.session.query(t_users_calendar_vw, MedicalCheckup)\
        .filter(t_users_calendar_vw.c.checkup_id == MedicalCheckup.id) \
        .filter(t_users_calendar_vw.c.user_id == user_id).all()
    return events


def get_checkups_within_range(days=90):
    today = datetime.now() + timedelta(days=-1)
    range_days = timedelta(days=days)
    return db.session.query(t_users_calendar_vw).filter(t_users_calendar_vw.c.next_checkup_date
                                                        .between(str(today), str(today + range_days))).all()
