# Profilaktykarz

### How to run backend Django server
1. Install Python
2. Create virtual environment in project directory
```
python -m venv venv
```
3. Activate virtual environment
```
source venv\Scripts\activate
```
4. Install Python packages
```
pip install -r requirements.txt
```
5. Fill out database host and password in src/backend/config.yml. Don't commit this file!
6. Go into src directory and start a server
```
cd src
python manage.py runserver
```
