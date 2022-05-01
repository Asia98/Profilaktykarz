/*
This file contains creation of view storing information about next medical checkups dates to users 
based on their age, family factors, users factors and gender.
If new user is created and he/she fills or updates the form with their medical information or last checkups dates
, this view will be automatically updated/show new records.
*/


create or replace view users_calendar_vw as (
  select c.user_id
      , c.checkup_id
      , c.medical_checkup
      , c.cycle_years
      , to_char(his.last_checkup_date :: date, 'yyyy-mm-dd') last_checkup
      , his.is_last_checkup_good 
      , case when his.last_checkup_date is null then to_char(localtimestamp :: date, 'yyyy-mm-dd') 
             when his.is_last_checkup_good = 1 then to_char((his.last_checkup_date + interval '1' year * c.cycle_years) :: date, 'yyyy-mm-dd') 
             else to_char((his.last_checkup_date + interval '1' year * c.cycle_years * 0.5) :: date, 'yyyy-mm-dd') 
             end as next_checkup_date
  from users_checkups_vw c 
  inner join (select * from (
    			select *, row_number() over (partition by user_id, checkup_id order by last_checkup_date desc) AS checkup_order 
                from users_checkup_history 
    			) x where checkup_order = 1) his
              on his.user_id = c.user_id and his.checkup_id = c.checkup_id
);