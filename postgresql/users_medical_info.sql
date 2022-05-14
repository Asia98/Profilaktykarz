/*
This file contains creation of users_medical_info table that stores user form output. 
Record insertion is meant to be handled in code.
*/


create table users_medical_info (user_id integer PRIMARY KEY references users(id)
                                , birth_date date not null
                                , gender char(1) not null
                                , family_factors integer[] null -- varchar(100) null
                                , user_factors integer[] null -- varchar(100) null
                                , last_filled timestamp not null default localtimestamp);


/*
Form logic: inserting factors

For example: user selects 'Choroby układu oddechowego' and 'Wada wzroku' in the form for user factors.

First way (When form relies only on names and there is no ID handled):
    Ouput will be stored as array userFactorsArray.
    userFactorsArray = ['Choroby układu oddechowego', 'Wada wzroku']
    Query below will take names of factor from form and extract their IDs from the database:
    select array_agg(id) as id_array -- if needed to store as string use the following: array_to_string(array_agg(id), ',') as id_array
        from factors
        where factor in ('Choroby układu oddechowego', 'Wada wzroku') -- change here for userFactorsArray

Second way (When form displays names and in code names are already linked to IDs)
    You can directly go to insert statements
				
After getting IDs from selected by users factors, we can insert records to users_medical_info just like in the exemplary inserts below:  
*/

insert into users_medical_info (user_id, birth_date, gender, family_factors, user_factors) values 
	(1, '1998-09-03', 'M', null, '{2,23}')
	, (2, '1996-10-19', 'M', null, '{5,22}')
	, (3, '1938-09-01', 'K', '{2, 3, 4}', '{11}');

-- In case when change of record is needed you can use following command:
update users_medical_info 
set birth_date = '1900-01-01'
where user_id = 1;