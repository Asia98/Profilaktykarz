/*
This file contains creation of factors table that may influence medical checkup frequency.
If new record is needed you should add it at the end with new id. 
*/


create table factors (id integer PRIMARY KEY
					, area VARCHAR(50) NOT NULL
					, factor VARCHAR(100) NOT NULL
					, comment VARCHAR(500) NULL);
	
    				
insert into factors (id, area, factor, comment) values 
	(1, 'Choroba przewlekła', 'Choroby układu krążenia', 'np. choroba wieńcowa przewlekła, zaburzenia rytmu serca i przewodzenia, przewlekła niewydolność serca, miażdżyca, nadciśnienie')
	, (2, 'Choroba przewlekła', 'Choroby układu oddechowego', 'np. astma, przewlekła niewydolność płucna, przewlekła obturacyjna choroba płuc')
	, (3, 'Choroba przewlekła', 'Choroby autoimmunologiczne', 'np. alergie, alergie atopowe, Hashimoto, nadczynność/niedoczynność tarczycy')
	, (4, 'Choroba przewlekła', 'Choroby metaboliczne', 'np. osteoporoza, otyłość')
	, (5, 'Choroba przewlekła', 'Choroby układu wewnątrzwydzielniczego', 'np. cukrzyca')
	, (6, 'Choroba przewlekła', 'Choroby układu moczowego', 'np. przewlekła choroba nerek')
	, (7, 'Choroba przewlekła', 'Choroby układu pokarmowego', 'np. przewlekłe zapalenie trzustki')
	, (8, 'Choroba przewlekła', 'Choroby układu nerwowego', 'np. choroba Alzheimera, epilepsja (padaczka)')
	, (9, 'Choroba przewlekła', 'Choroby przenoszone przez patogeny', 'np. AIDS (zespół nabytego niedoboru odporności)')
	, (10, 'Choroba przewlekła', 'Choroby psychiczne', 'np. depresja')
	, (11, 'Choroba przewlekła', 'Rak płuca', null)
	, (12, 'Choroba przewlekła', 'Rak piersi', null)
	, (13, 'Choroba przewlekła', 'Rak jelita grubego', null)
	, (14, 'Choroba przewlekła', 'Nowotwory ginekologiczne', 'np. rak sromu, rak jajnika, rak szyjki macicy, rak trzonu macicy')
	, (15, 'Choroba przewlekła', 'Nowotwory układu moczowo-płciowego', 'np. nowotwory złośliwe jądra, rak prostaty (rak gruczołu krokowego), rak pęcherza moczowego, rak nerki,  rak prącia')
	, (16, 'Choroba przewlekła', 'Nowotwory układu pokarmowego', 'np. rak trzustki, rak wątroby, rak żołądka, rak jelita grubego, nowotwory złośliwe przełyku, rak pęcherzyka żółciowego')
	, (17, 'Choroba przewlekła', 'Guzy mózgu i OUN', null)
	, (18, 'Choroba przewlekła', 'Nowotwory głowy  i szyi', 'np. nowotwory wargi, nowotwory jamy ustnej, nowotwory ustnej, krtaniowej, nosowej części gardła, nowotwory krtani, nowotwory ślinianek, nowotwory zatok obocznych nosa, rak jamy nosa, nowotwory narządu słuchu (rak ucha)')
	, (19, 'Choroba przewlekła', 'Nowotwory skóry', 'np. czerniak, niebarwnikowe nowotwory skóry (rak podstawnokomórkowy, rak kolczystokomórkowy, rak skóry z komórek Merkla)')
	, (20, 'Choroba przewlekła', 'Nowotwory tkanek miękkich i kości', 'mięsaki')
	, (21, 'Szkodliwe czynniki', 'Palenie papierosów', null)
	, (22, 'Szkodliwe czynniki', 'Ciągłe zmęczenie', null)
	, (23, 'Szkodliwe czynniki', 'Wada wzroku', null)
	, (24, 'Szkodliwe czynniki', 'Nadmierne spożywanie alkoholu', null)
	, (25, 'Szkodliwe warunki pracy', 'Czynniki fizyczne', 'np. hałas, praca w pobliżu maszyn, ostre krawędzie, niebezpieczne narzędzia, wysoka lub niska temperatura')
	, (26, 'Szkodliwe warunki pracy', 'Czynniki chemiczne', 'np. działanie substancji rakotwórczych, uczulających, drażniących, toksycznych')
	, (27, 'Szkodliwe warunki pracy', 'Czynniki biologiczne', 'np. bakterie, grzyby, wirusy')
	, (28, 'Szkodliwe czynniki', 'Liczne znamiona barwnikowe', null);