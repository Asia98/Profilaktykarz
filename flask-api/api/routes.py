# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""
from datetime import datetime, timezone, timedelta
from functools import wraps

import jwt
from sqlalchemy.exc import SQLAlchemyError
from dateutil.parser import parse
from flask import request
from flask_restx import Api, Resource, fields, marshal

from .config import BaseConfig
from .models import db, Users, JWTTokenBlocklist, Factor, UsersMedicalInfo, UsersCheckupHistory, get_users_checkups, \
    get_users_calendar, MedicalCheckup, UsersCustomCheckup

rest_api = Api(version="1.0", title="Users API")

"""
    Flask-Restx models for api request and response data
"""

signup_model = rest_api.model('SignUpModel', {"username": fields.String(required=True, min_length=2, max_length=32),
                                              "email": fields.String(required=True, min_length=4, max_length=64),
                                              "password": fields.String(required=True, min_length=4, max_length=16)
                                              })

login_model = rest_api.model('LoginModel', {"email": fields.String(required=True, min_length=4, max_length=64),
                                            "password": fields.String(required=True, min_length=4, max_length=16)
                                            })

user_edit_model = rest_api.model('UserEditModel', {"userID": fields.String(required=True, min_length=1, max_length=32),
                                                   "username": fields.String(required=True, min_length=2,
                                                                             max_length=32),
                                                   "email": fields.String(required=True, min_length=4, max_length=64)
                                                   })

factors_model = rest_api.model('FactorsModel', {"id": fields.Integer(required=True),
                                                "name": fields.String(required=True, min_length=2, max_length=100,
                                                                      attribute='factor'),
                                                "description": fields.String(required=True, min_length=4,
                                                                             max_length=500, attribute='comment')
                                                })

last_visits_model = rest_api.model('LastVisitsView', {"id": fields.Integer(required=True, attribute='checkup_id'),
                                                      "name": fields.String(required=True, min_length=2,
                                                                            max_length=100, attribute='medical_checkup')
                                                      })

calendar_model = rest_api.model('CalendarView', {"name": fields.String(required=True, min_length=2,
                                                                       max_length=100, attribute='medical_checkup'),
                                                 "date": fields.Date(required=True, attribute='next_checkup_date')
                                                 })

medical_checkup_link = rest_api.model('CheckupLink', {"link": fields.String(required=True, min_length=2,
                                                                            max_length=100, attribute='link')})

custom_checkup_model = rest_api.model('CustomCheckupModel', {"name": fields.String(required=True, min_length=2,
                                                                                   max_length=100,
                                                                                   attribute='checkup_name'),
                                                             "lastCheckup": fields.Date(required=True,
                                                                                        attribute='last_checkup_date'),
                                                             "cycle": fields.Integer(attribute='cycle_days'),
                                                             "nextCheckup": fields.Date(attribute='next_checkup_date')})

"""
   Helper function for JWT token required
"""


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):

        token = None

        if "authorization" in request.headers:
            token = request.headers["authorization"]

        if not token:
            return {"success": False, "msg": "Valid JWT token is missing"}, 400

        try:
            data = jwt.decode(token, BaseConfig.JWT_SECRET_KEY, algorithms=["HS256"])
            current_user = Users.get_by_email(data["email"])

            if not current_user:
                return {"success": False,
                        "msg": "Sorry. Wrong auth token. This user does not exist."}, 400

            token_expired = db.session.query(JWTTokenBlocklist.id).filter_by(jwt_token=token).scalar()

            if token_expired is not None:
                return {"success": False, "msg": "Token revoked."}, 400

            if not current_user.check_jwt_auth_active():
                return {"success": False, "msg": "Token expired."}, 400

        except:
            return {"success": False, "msg": "Token is invalid"}, 400

        return f(current_user, *args, **kwargs)

    return decorator


"""
    Flask-Restx routes
"""


@rest_api.route('/api/users/register')
class Register(Resource):
    """
       Creates a new user by taking 'signup_model' input
    """

    @rest_api.expect(signup_model, validate=True)
    def post(self):
        req_data = request.get_json()

        _username = req_data.get("username")
        _email = req_data.get("email")
        _password = req_data.get("password")

        user_exists = Users.get_by_email(_email)
        if user_exists:
            return {"success": False,
                    "msg": "Email already taken"}, 400

        new_user = Users(username=_username, email=_email)

        new_user.set_password(_password)
        new_user.save()

        return {"success": True,
                "userID": new_user.id,
                "msg": "The user was successfully registered"}, 200


@rest_api.route('/api/users/login')
class Login(Resource):
    """
       Login user by taking 'login_model' input and return JWT token
    """

    @rest_api.expect(login_model, validate=True)
    def post(self):

        req_data = request.get_json()

        _email = req_data.get("email")
        _password = req_data.get("password")

        user_exists = Users.get_by_email(_email)

        if not user_exists:
            return {"success": False,
                    "msg": "This email does not exist."}, 400

        if not user_exists.check_password(_password):
            return {"success": False,
                    "msg": "Wrong credentials."}, 400

        # create access token using JWT
        token = jwt.encode({'id': user_exists.id, 'email': _email,
                            'exp': datetime.utcnow() + BaseConfig.JWT_ACCESS_TOKEN_EXPIRES},
                           BaseConfig.JWT_SECRET_KEY)

        user_exists.set_jwt_auth_active(True)
        user_exists.save()

        return {"success": True,
                "token": token,
                "user": user_exists.toJSON()}, 200


@rest_api.route('/api/users/edit')
class EditUser(Resource):
    """
       Edits User's username or password or both using 'user_edit_model' input
    """

    @rest_api.expect(user_edit_model)
    @token_required
    def post(self, current_user):

        req_data = request.get_json()

        _new_username = req_data.get("username")
        _new_email = req_data.get("email")

        if _new_username:
            self.update_username(_new_username)

        if _new_email:
            self.update_email(_new_email)

        self.save()

        return {"success": True}, 200


@rest_api.route('/api/users/logout')
class LogoutUser(Resource):
    """
       Logs out User using 'logout_model' input
    """

    @token_required
    def post(self, current_user):
        _jwt_token = request.headers["authorization"]

        jwt_block = JWTTokenBlocklist(jwt_token=_jwt_token, created_at=datetime.now(timezone.utc))
        jwt_block.save()

        self.set_jwt_auth_active(False)
        self.save()

        return {"success": True}, 200


@rest_api.route('/api/factors')
class GetFactors(Resource):
    @token_required
    def get(self, api):
        family_factors = Factor.get_family_factors()
        mrsh_family_factors = marshal(family_factors, factors_model, envelope="familyFactors")
        user_factors = Factor.get_all_factors()
        mrsh_user_factors = marshal(user_factors, factors_model, envelope="userFactors")

        response = {
            "success": True,
            "data": {
                "familyFactors": mrsh_family_factors["familyFactors"],
                "userFactors": mrsh_user_factors["userFactors"]
            }
        }
        return response, 200

    @token_required
    def post(self, api):

        def update_factors(user, user_factors, family_factors):
            user.update_user_factors(user_factors)
            user.update_family_factors(family_factors)
            user.save()

        req_data = request.get_json()

        _family_factors = req_data.get("familyFactors")
        _user_factors = req_data.get("userFactors")
        _birth_date = req_data.get("birthDate")
        _gender = req_data.get("gender")

        if _gender != 'K' and _gender != 'M':
            return {"success": False, "msg": "Incorrect value passed as gender."}, 400

        try:
            _birth_date = parse(_birth_date, fuzzy=True)
        except ValueError:
            return {"success": False, "msg": "Incorrect value passed as birthDate."}, 400

        factor_ids = Factor.get_factors_id()
        if _user_factors:
            if isinstance(_user_factors, str):
                _user_factors = [int(f) for f in _user_factors.split(',')]
            if not set(_user_factors).issubset(factor_ids):
                return {"success": False, "msg": "Incorrect values passed as user factors."}, 400
        if _family_factors:
            if isinstance(_family_factors, str):
                _family_factors = [int(f) for f in _family_factors.split(',')]
            if not set(_family_factors).issubset(factor_ids):
                return {"success": False, "msg": "Incorrect values passed as family factors."}, 400

        medical_info_exists = UsersMedicalInfo.get_by_user_id(self.id)
        if medical_info_exists:
            update_factors(medical_info_exists, _user_factors, _family_factors)
        else:
            new_medical_info = UsersMedicalInfo(user_id=self.id, birth_date=_birth_date, gender=_gender)
            update_factors(new_medical_info, _user_factors, _family_factors)

        return {"success": True,
                "msg": "Medical info updated successfully"}, 200


@rest_api.route('/api/last-visits')
class LastVisits(Resource):
    @token_required
    def get(self, api):
        users_checkups = get_users_checkups(self.id)
        mrsh_users_checkups = marshal(users_checkups, last_visits_model, envelope="checkups")

        response = {
            "success": True,
            "data": {
                "checkups": mrsh_users_checkups["checkups"]
            }
        }
        return response, 200

    @token_required
    def post(self, api):
        req_data = request.get_json()

        _users_checkups = req_data.get("checkups")

        for checkup in _users_checkups:
            if checkup['resultGood']:
                checkup_result = 1
            else:
                checkup_result = 0
            new_checkup = UsersCheckupHistory(user_id=self.id, checkup_id=checkup['id'],
                                              last_checkup_date=checkup['lastCheckupDate'],
                                              is_last_checkup_good=checkup_result)
            try:
                new_checkup.save()
            except SQLAlchemyError as e:
                return {"success": False,
                        "msg": f"Saving visits failed with {e}."}, 400

        return {"success": True,
                "msg": f"{len(_users_checkups)} new visits saved to checkup history."}, 200


@rest_api.route('/api/user-calendar')
class CalendarView(Resource):
    @token_required
    def get(self, api):
        users_calendar_events = get_users_calendar(self.id)
        mrsh_users_calendar_events = marshal(users_calendar_events, calendar_model, envelope="events")

        response = {
            "success": True,
            "events": mrsh_users_calendar_events["events"]
        }
        return response, 200


@rest_api.route('/api/user-calendar/checkup_link')
class CheckupLink(Resource):
    def get(self):
        req_data = request.get_json()
        _checkup_name = req_data.get("checkupName")

        checkup_link = MedicalCheckup.get_link_by_checkup_name(_checkup_name)

        if checkup_link is None:
            return {"success": False, "msg": "No checkup with this name could be found in database."}, 400

        else:
            mrsh_checkup_link = marshal(checkup_link, medical_checkup_link)
            response = {
                "success": True,
                "link": mrsh_checkup_link["link"]
            }
            return response, 200


@rest_api.route('/api/custom-visit')
class CustomVisits(Resource):
    @token_required
    @rest_api.expect(custom_checkup_model, validate=True)
    def post(self, api):
        req_data = request.get_json()

        _custom_checkup_name = req_data.get("name")
        _last_checkup_date = req_data.get("lastCheckup")
        _cycle_days = req_data.get("cycle")
        _next_checkup_date = req_data.get("nextCheckup")

        try:
            _last_checkup_date = parse(_last_checkup_date, fuzzy=True)
        except ValueError:
            return {"success": False, "msg": "Incorrect value passed as lastCheckup."}, 400

        if not(_cycle_days and _next_checkup_date):
            return {"success": False, "msg": "One value of the following can't be empty: cycle, nextCheckup"}, 400

        if _cycle_days:
            new_custom_checkup = UsersCustomCheckup(user_id=self.id, checkup_name=_custom_checkup_name,
                                                    last_checkup_date=_last_checkup_date,
                                                    cycle_days=_cycle_days)
        elif _next_checkup_date:
            try:
                _next_checkup_date = parse(_next_checkup_date, fuzzy=True)
            except ValueError:
                return {"success": False, "msg": "Incorrect value passed as lastCheckup."}, 400
            new_custom_checkup = UsersCustomCheckup(user_id=self.id, checkup_name=_custom_checkup_name,
                                                    last_checkup_date=_last_checkup_date,
                                                    next_checkup_date=_next_checkup_date)
        else:
            return {"success": False, "msg": "Unexpected error occurred."}, 400

        try:
            new_custom_checkup.save()
        except SQLAlchemyError as e:
            return {"success": False,
                    "msg": f"Saving custom checkup failed with {e}."}, 400

        return {"success": True,
                "msg": f"Custom checkup saved successfully."}, 200


@rest_api.route('/api/users/info-form-status')
class MedicalFormStatus(Resource):
    @token_required
    def get(self, api):
        medical_info_exists = UsersMedicalInfo.get_by_user_id(self.id)
        if medical_info_exists:
            medical_info_status = True
        else:
            medical_info_status = False

        response = {
            "medicalInfo": medical_info_status
        }
        return response, 200


@rest_api.route('/api/users/checkup-form-status')
class CheckupFormStatus(Resource):
    @token_required
    def get(self, api):
        checkup_history_exists = UsersCheckupHistory.get_by_user_id(self.id)
        if checkup_history_exists:
            checkup_history_status = True
        else:
            checkup_history_status = False

        response = {
            "checkupHistory": checkup_history_status
        }
        return response, 200
