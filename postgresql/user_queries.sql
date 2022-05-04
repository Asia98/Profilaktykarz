/*
This file contains sample queries for a specific user.
*/


-- Calculating user's age
select date_part('year', age(current_date, birth_date)) as user_age
	from users_medical_info
	where user_id = 1; -- CHANGE TO PROPER ID
	

-- Extracting medical checkups for user based on his age
with user_age as (select date_part('year', age(current_date, birth_date)) as user_age
                    from users_medical_info
                    where user_id = 1) -- CHANGE TO PROPER ID
select * from medical_checkups
	where (select * from user_age) between age_from and age_to;
	

-- Extracting medical checkups for user only with condition on his user_factors
select * from medical_checkups 
	where user_factors && (select user_factors
                                from users_medical_info
                                where user_id = 2); -- CHANGE TO PROPER ID


-- Extracting all valid medical checkups for given user
select user_id, record_date, checkup_id, medical_checkup, next_default_checkup_date 
  from (
    with user_data as (select *, date_part('year', age(current_date, birth_date)) as user_age
                        from users_medical_info
                        where user_id = 1)
    select ud.user_id
          , to_char(ud.last_filled :: date, 'yyyy-mm-dd') record_date
          , mc.id checkup_id
          , mc.medical_checkup
          , to_char((ud.last_filled + interval '1' year * mc.cycle_years) :: date, 'yyyy-mm-dd') next_default_checkup_date
          , row_number() over (partition by medical_checkup order by cycle_years) AS year_order 
        from medical_checkups mc, user_data ud
        where ud.user_age between age_from and age_to
          and (mc.family_factors is null or mc.family_factors && ud.family_factors)
          and (mc.user_factors is null or mc.user_factors && ud.user_factors)
          and (mc.gender is null or mc.gender = ud.gender)
        order by mc.id
  ) x 
  where year_order = 1;