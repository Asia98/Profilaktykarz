# Profilaktykarz

## Opis
Nie wszyscy dbają o swoje zdrowie jak powinni. Jednym z czynników jest brak wiedzy o istniejącej ofercie badań profilaktycznych. W takim przypadku, badania z określonej dziedziny są wyko-nywane jedynie gdy pojawi się znaczący dyskomfort bądź ból. Niewiele osób jest również świa-domych o tym, że Narodowy Fundusz Zdrowotny zapewnia takie badania okresowo, w dużej mierze bezpłatnie. Proponowane rozwiązanie, aplikacja o nazwie Profilaktykarz, stanowi centrum wiedzy o badaniach profilaktycznych. Przetwarza dane użytkownika, dobierając dla niego od-powiednie badania wraz z sugerowaną datą, na którą powinien się umówić. Integracja frame-worka Flask wraz z biblioteką React, poszerzona o bazę PostgreSQL, pozwala na swobodną współpracę z użytkownikiem. Ta aplikacja ma potencjalne zastosowania dla ludzi, którzy chcieliby zadbać o swoje zdrowie bez potrzeby czasochłonnego wyszukiwania odpowiednich badań.

## Uruchomienie aplikacji

Pierwszy terminal: uruchomienie Backendu
```
cd flask-api
python -m venv venv
source venv/Scripts/activate
pip install -r requirements.txt
export FLASK_APP=run.py
export FLASK_ENV=development
flask run
```

Drugi terminal: uruchomienie Frontendu
```
cd client
npm install --force && npm start 
```

URL: http://localhost:3000
