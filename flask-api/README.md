# Profilaktykarz

### How to run backend Flask server
1. Install Python
2. Create virtual environment in project directory
```
python -m venv venv
```
3. Activate virtual environment
```
source venv\Scripts\activate
or
source venv/Scripts/activate
```
4. Install Python packages
```
pip install -r requirements.txt
```
### Update needed
5. Fill out database host and password in src/backend/config.yml. Don't commit this file! 
6. Go into src directory and start a server
```
cd src
python manage.py runserver
```

export FLASK_APP=run.py
export FLASK_ENV=development
flask run


### How to run project in ReactJS

Requirement: install yarn from cmd:
```
cd <project_path/react-ui
yarn
```

Once installed you can start yarn from VS code (in new terminal!):
```
cd react-ui
yarn start 
```