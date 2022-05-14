/*
This file contains creation of view storing information about assigned medical checkups to users 
based on their age, family factors, users factors and gender.
If new user is created and he/she fills or updates the form with their medical information, this view 
will be automatically updated/show new records.
*/


create or replace view users_checkups_vw as (
  select user_id, checkup_id, medical_checkup, cycle_years--, record_date, next_default_checkup_date 
    from (
      with user_data as (select *, date_part('year', age(current_date, birth_date)) as user_age from users_medical_info)
      select ud.user_id
            , mc.id checkup_id
            , mc.medical_checkup
            , mc.cycle_years
			      --, to_char(ud.last_filled :: date, 'yyyy-mm-dd') record_date
            --, to_char((ud.last_filled + interval '1' year * mc.cycle_years) :: date, 'yyyy-mm-dd') next_default_checkup_date
            , row_number() over (partition by medical_checkup, ud.user_id order by cycle_years) AS year_order 
          from medical_checkups mc, user_data ud
          where ud.user_age between age_from and age_to
            and (mc.family_factors is null or mc.family_factors && ud.family_factors)
            and (mc.user_factors is null or mc.user_factors && ud.user_factors)
            and (mc.gender is null or mc.gender = ud.gender)
          order by mc.id
    ) x 
    where year_order = 1);