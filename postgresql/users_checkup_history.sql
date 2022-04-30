/*
This file contains creation of users_checkup_history table that stores user second part of form output 
regarding last date of assigned before medical checkup (users_checkups view) and its result (whether is was good or bad). 
Record insertion is meant to be handled in code.
*/


create table users_checkup_history (user_id integer not null
									, checkup_id integer not null
									, medical_checkup varchar(100) not null
									, last_checkup_date date null
									, is_last_checkup_good smallint null
									, last_filled timestamp null);

/*
For each of assigned in users_checkups checkup user should be asked separately for the last date.
Each answer for each checkup will be stored as a new row, just like in the example below:
*/
									
insert into users_checkup_history (user_id, checkup_id, medical_checkup, last_checkup_date, is_last_checkup_good, last_filled) values
	(1, 1, 'Morfologia', '2022-01-23', 1, localtimestamp)
	, (1, 2, 'Odczyn Biernackiego (OB)', '2022-01-30', 1, localtimestamp)
	, (1, 3, 'Stężenie glukozy we krwi', '2022-03-27', 1, localtimestamp)
	, (1, 4, 'Badanie ogólne moczu', null, null, localtimestamp)
	, (1, 5, 'Pomiar ciśnienia tętniczego', '2022-04-09', 0, localtimestamp)
	, (1, 7, 'Kontrola znamion i pieprzyków', null, null, localtimestamp)
	, (1, 9, 'Ogólne badanie u lekarza internisty', '2022-03-05', 0, localtimestamp)
	, (1, 11, 'Kontrola stomatologiczna', '2022-03-21', 0, localtimestamp)
	, (1, 12, 'Lipidogram', '2022-03-24', 1, localtimestamp)
	, (1, 16, 'USG jamy brzusznej', '2022-03-14', 0, localtimestamp)
	, (1, 18, 'RTG klatki piersiowej', '2022-02-06', 1, localtimestamp)
	, (1, 36, 'Badanie jąder', '2022-02-27', 0, localtimestamp)
	, (1, 43, 'Kontrola wzroku u okulisty', null, null, localtimestamp)
	, (1, 45, 'Badanie dna oka', '2022-02-25', 1, localtimestamp);


-- Testing users_calendar view whether it will show only the newest checkup 
insert into users_checkup_history (user_id, checkup_id, medical_checkup, last_checkup_date, is_last_checkup_good, last_filled) values
	(1, 1, 'Morfologia', '2055-07-13', 1, localtimestamp);