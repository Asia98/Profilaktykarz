/*
This file contains creation of medical checkups table with specified frequency based on user's parameters.
If new record is needed you should add it at the end with new id. 
*/


create table medical_checkups (id integer PRIMARY KEY
							, age_from smallint not null
							, age_to smallint not null
							, gender char(1) null
							, medical_checkup varchar(100) not null
							, family_factors integer[] null -- varchar(100) null
							, user_factors integer[] null -- varchar(100) null
							, cycle_years real not null
							, link varchar(100) null);


insert into medical_checkups (id, age_from, age_to, gender, medical_checkup, family_factors, user_factors, cycle_years, link) values 
	(1, 0, 999, null, 'Morfologia', null, null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/POZ?&ow=5')
	, (2, 0, 999, null, 'Odczyn Biernackiego (OB)', null, null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/POZ?&ow=5')
	, (3, 0, 999, null, 'Stężenie glukozy we krwi', null, null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/POZ?&ow=5')
	, (4, 0, 999, null, 'Badanie ogólne moczu', null, null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/POZ?&ow=5')
	, (5, 0, 999, null, 'Pomiar ciśnienia tętniczego', null, null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/POZ?&ow=5')
	, (6, 0, 999, null, 'Pomiar ciśnienia tętniczego', null, '{1,5,6}', 0.5, 'https://gsl.nfz.gov.pl/GSL/GSL/POZ?&ow=5')
	, (7, 0, 999, null, 'Kontrola znamion i pieprzyków', null, null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1050')
	, (8, 0, 999, null, 'Kontrola znamion i pieprzyków', '{19}', '{28}', 0.5, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1050')
	, (9, 0, 999, null, 'Ogólne badanie u lekarza internisty', null, null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/POZ?&ow=5')
	, (10, 0, 999, null, 'Pomiar poziomu elektrolitów we krwi', null, '{22}', 3, 'https://gsl.nfz.gov.pl/GSL/GSL/POZ?&ow=5')
	, (11, 0, 999, null, 'Kontrola stomatologiczna', null, null, 0.5, 'https://gsl.nfz.gov.pl/GSL/GSL/LeczenieStomatologiczne?&ow=5&specjalizacja=1248')
	, (12, 20, 40, null, 'Lipidogram', null, null, 5, 'https://gsl.nfz.gov.pl/GSL/GSL/POZ?&ow=5')
	, (13, 30, 50, null, 'Lipidogram', '{1,16}', '{4,5,7,24}', 1, 'https://gsl.nfz.gov.pl/GSL/GSL/POZ?&ow=5')
	, (14, 40, 50, null, 'Lipidogram', null, null, 2, 'https://gsl.nfz.gov.pl/GSL/GSL/POZ?&ow=5')
	, (15, 50, 999, null, 'Lipidogram', null, null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/POZ?&ow=5')
	, (16, 20, 50, null, 'USG jamy brzusznej', null, null, 4, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1063')
	, (17, 50, 999, null, 'USG jamy brzusznej', null, null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1063')
	, (18, 20, 40, null, 'RTG klatki piersiowej', null, null, 5, 'https://gsl.nfz.gov.pl/GSL/GSL/POZ?&ow=5')
	, (19, 20, 999, null, 'RTG klatki piersiowej', '{11}', null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/POZ?&ow=5')
	, (20, 30, 999, null, 'RTG klatki piersiowej', null, '{21,26,27}', 1, 'https://gsl.nfz.gov.pl/GSL/GSL/POZ?&ow=5')
	, (21, 40, 999, null, 'RTG klatki piersiowej', null, null, 2, 'https://gsl.nfz.gov.pl/GSL/GSL/POZ?&ow=5')
	, (22, 18, 999, 'K', 'Badanie ginekologiczne', null, null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1068')
	, (23, 20, 999, 'K', 'Cytologia', null, null, 3, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1068')
	, (24, 20, 999, 'K', 'Cytologia', '{14}', '{9}', 1, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1068')
	, (25, 21, 999, 'K', 'Badanie USG dna miednicy', null, null, 3, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1068')
	, (26, 20, 50, 'K', 'USG narządów rodnych', null, null, 2, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1068')
	, (27, 50, 999, 'K', 'USG narządów rodnych', null, null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1068')
	, (28, 40, 50, 'K', 'Mammografia', null, null, 2, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1068')
	, (29, 50, 999, 'K', 'Mammografia', null, null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1068')
	, (30, 20, 30, 'K', 'USG piersi', null, null, 0.5, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1068')
	, (31, 30, 40, 'K', 'USG piersi', null, null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1068')
	, (32, 40, 999, 'K', 'USG piersi', null, null, 2, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1068')
	, (33, 20, 999, 'K', 'Oznaczenie hormonów tarczycy', null, null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1055')
	, (34, 20, 999, 'K', 'USG tarczycy', null, null, 3, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1055')
	, (35, 20, 999, 'K', 'USG tarczycy', null, '{3}', 1, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1055')
	, (36, 20, 999, 'M', 'Badanie jąder', null, null, 3, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1231')
	, (37, 20, 40, 'M', 'Badanie proktologiczne (per rectum)', '{15}', null, 10, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1231')
	, (38, 40, 50, 'M', 'Badanie proktologiczne (per rectum)', null, null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1231')
	, (39, 50, 999, 'M', 'Badanie proktologiczne (per rectum)', null, null, 2, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1231')
	, (40, 40, 999, 'M', 'Oznaczenie antygenu PSA', '{15}', null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/POZ?&ow=5')
	, (41, 50, 999, 'M', 'Oznaczenie antygenu PSA', null, null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/POZ?&ow=5')
	, (42, 2, 50, null, 'Kontrola wzroku u okulisty', null, null, 2, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1184')
	, (43, 18, 50, null, 'Kontrola wzroku u okulisty', null, '{23}', 1, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1184')
	, (44, 50, 999, null, 'Kontrola wzroku u okulisty', null, null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1184')
	, (45, 20, 40, null, 'Badanie dna oka', null, null, 3, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1184')
	, (46, 40, 50, null, 'Badanie dna oka', null, null, 2, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1184')
	, (47, 50, 999, null, 'Badanie dna oka', null, null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1184')
	, (48, 20, 40, null, 'EKG', null, '{1}', 3, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1079')
	, (49, 40, 50, null, 'EKG', null, null, 3, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1079')
	, (50, 50, 999, null, 'EKG', null, null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1079')
	, (51, 40, 999, null, 'Gastroskopia', null, null, 5, 'https://gsl.nfz.gov.pl/GSL/GSL/BadaniaDiagnostyczne?&ow=5&specjalizacja=1065')
	, (52, 40, 999, null, 'Badanie densytometryczne', '{4}', null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1220')
	, (53, 50, 999, 'K', 'Badanie densytometryczne', null, null, 2, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1220')
	, (54, 60, 999, 'M', 'Badanie densytometryczne', null, null, 2, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1220')
	, (55, 40, 999, null, 'Kolonoskopia', '{13}', null, 5, 'https://gsl.nfz.gov.pl/GSL/GSL/BadaniaDiagnostyczne?&ow=5&specjalizacja=1081')
	, (56, 50, 999, null, 'Kolonoskopia', null, null, 10, 'https://gsl.nfz.gov.pl/GSL/GSL/BadaniaDiagnostyczne?&ow=5&specjalizacja=1081')
	, (57, 50, 999, null, 'Badanie immunochemiczne kału', '{13}', null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1061')
	, (58, 50, 999, null, 'Sigmoidoskopia', null, null, 5, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1061')
	, (59, 20, 50, null, 'Badanie słuchu', null, '{25}', 1, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1082')
	, (60, 50, 999, null, 'Badanie słuchu', null, null, 1, 'https://gsl.nfz.gov.pl/GSL/GSL/PrzychodnieSpecjalistyczne?&ow=5&specjalizacja=1082')

