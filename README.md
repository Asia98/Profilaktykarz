# Profilaktykarz

First terminal: starting backend
```
cd flask-api
python -m venv venv
source venv/Scripts/activate
pip install -r requirements.txt
export FLASK_APP=run.py
export FLASK_ENV=development
flask run
```

Second terminal: starting frontend
```
cd client
npm install && npm start 
```

Once executed, open browser: http://localhost:3000/login
