import os
from datetime import timedelta

import yaml

BASE_DIR = os.path.dirname(os.path.realpath(__file__))


class BaseConfig:
    with open('api/config.yml', 'r') as file:
        conf = yaml.safe_load(file)

    db_name = conf['postgresDB']['name']
    db_user = conf['postgresDB']['user']
    db_password = conf['postgresDB']['password']
    db_host = conf['postgresDB']['host']
    db_port = conf['postgresDB']['port']

    SQLALCHEMY_DATABASE_URI = f'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = conf['flask_secret']
    JWT_SECRET_KEY = conf['jwt_secret']
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=2)
    EMAIL_PASSWORD = conf['email_password']

