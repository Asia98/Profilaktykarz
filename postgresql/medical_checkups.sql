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
							, cycle_years real not null);
	
    						
insert into medical_checkups (id, age_from, age_to, gender, medical_checkup, family_factors, user_factors, cycle_years) values 
	(1, 0, 999, null, 'Morfologia', null, null, 1)
	, (2, 0, 999, null, 'Odczyn Biernackiego (OB)', null, null, 1)
	, (3, 0, 999, null, 'Stężenie glukozy we krwi', null, null, 1)
	, (4, 0, 999, null, 'Badanie ogólne moczu', null, null, 1)
	, (5, 0, 999, null, 'Pomiar ciśnienia tętniczego', null, null, 1)
	, (6, 0, 999, null, 'Pomiar ciśnienia tętniczego', null, '{1,5,6}', 0.5)
	, (7, 0, 999, null, 'Kontrola znamion i pieprzyków', null, null, 1)
	, (8, 0, 999, null, 'Kontrola znamion i pieprzyków', '{19}', '{28}', 0.5)
	, (9, 0, 999, null, 'Ogólne badanie u lekarza internisty ', null, null, 1)
	, (10, 0, 999, null, 'Pomiar poziomu elektrolitów we krwi', null, '{22}', 3)
	, (11, 0, 999, null, 'Kontrola stomatologiczna', null, null, 0.5)
	, (12, 20, 40, null, 'Lipidogram', null, null, 5)
	, (13, 30, 50, null, 'Lipidogram', '{1,16}', '{4,5,7,24}', 1)
	, (14, 40, 50, null, 'Lipidogram', null, null, 2)
	, (15, 50, 999, null, 'Lipidogram', null, null, 1)
	, (16, 20, 50, null, 'USG jamy brzusznej', null, null, 4)
	, (17, 50, 999, null, 'USG jamy brzusznej', null, null, 1)
	, (18, 20, 40, null, 'RTG klatki piersiowej', null, null, 5)
	, (19, 20, 999, null, 'RTG klatki piersiowej', '{11}', null, 1)
	, (20, 30, 999, null, 'RTG klatki piersiowej', null, '{21,26,27}', 1)
	, (21, 40, 999, null, 'RTG klatki piersiowej', null, null, 2)
	, (22, 18, 999, 'K', 'Badanie ginekologiczne', null, null, 1)
	, (23, 20, 999, 'K', 'Cytologia', null, null, 3)
	, (24, 20, 999, 'K', 'Cytologia', '{14}', '{9}', 1)
	, (25, 21, 999, 'K', 'Badanie USG dna miednicy', null, null, 3)
	, (26, 20, 50, 'K', 'USG narządów rodnych', null, null, 2)
	, (27, 50, 999, 'K', 'USG narządów rodnych', null, null, 1)
	, (28, 40, 50, 'K', 'Mammografia', null, null, 2)
	, (29, 50, 999, 'K', 'Mammografia', null, null, 1)
	, (30, 20, 30, 'K', 'USG piersi', null, null, 0.5)
	, (31, 30, 40, 'K', 'USG piersi', null, null, 1)
	, (32, 40, 999, 'K', 'USG piersi', null, null, 2)
	, (33, 20, 999, 'K', 'Oznaczenie hormonów tarczycy', null, null, 1)
	, (34, 20, 999, 'K', 'USG tarczycy', null, null, 3)
	, (35, 20, 999, 'K', 'USG tarczycy', null, '{3}', 1)
	, (36, 20, 999, 'M', 'Badanie jąder', null, null, 3)
	, (37, 20, 40, 'M', 'Badanie proktologiczne (per rectum)', '{15}', null, 10)
	, (38, 40, 50, 'M', 'Badanie proktologiczne (per rectum)', null, null, 1)
	, (39, 50, 999, 'M', 'Badanie proktologiczne (per rectum)', null, null, 2)
	, (40, 40, 999, 'M', 'Oznaczenie antygenu PSA', '{15}', null, 1)
	, (41, 50, 999, 'M', 'Oznaczenie antygenu PSA', null, null, 1)
	, (42, 2, 50, null, 'Kontrola wzroku u okulisty', null, null, 2)
	, (43, 18, 50, null, 'Kontrola wzroku u okulisty', null, '{23}', 1)
	, (44, 50, 999, null, 'Kontrola wzroku u okulisty', null, null, 1)
	, (45, 20, 40, null, 'Badanie dna oka', null, null, 3)
	, (46, 40, 50, null, 'Badanie dna oka', null, null, 2)
	, (47, 50, 999, null, 'Badanie dna oka', null, null, 1)
	, (48, 20, 40, null, 'EKG', null, '{1}', 3)
	, (49, 40, 50, null, 'EKG', null, null, 3)
	, (50, 50, 999, null, 'EKG', null, null, 1)
	, (51, 40, 999, null, 'Gastroskopia', null, null, 5)
	, (52, 40, 999, null, 'Badanie densytometryczne', '{4}', null, 1)
	, (53, 50, 999, 'K', 'Badanie densytometryczne', null, null, 2)
	, (54, 60, 999, 'M', 'Badanie densytometryczne', null, null, 2)
	, (55, 40, 999, null, 'Kolonoskopia', '{13}', null, 5)
	, (56, 50, 999, null, 'Kolonoskopia', null, null, 10)
	, (57, 50, 999, null, 'Badanie immunochemiczne kału', '{13}', null, 1)
	, (58, 50, 999, null, 'Sigmoidoskopia', null, null, 5)
	, (59, 20, 50, null, 'Badanie słuchu', null, '{25}', 1)
	, (60, 50, 999, null, 'Badanie słuchu', null, null, 1);