SELECT * FROM translogix_main_db.passenger_coordinates_view;
CREATE VIEW passenger_full_view AS
SELECT p.first_name, p.last_name, p.department, p.phone_number, p.email,
       c_pickup.name AS pickup_country, r_pickup.name AS pickup_region, 
       ci_pickup.name AS pickup_city, s_pickup.name AS pickup_street, cp_pickup.house_number AS pickup_house_number,
       cp_pickup.latitude AS pickup_latitude, cp_pickup.longitude AS pickup_longitude,
       c_dropoff.name AS dropoff_country, r_dropoff.name AS dropoff_region, 
       ci_dropoff.name AS dropoff_city, s_dropoff.name AS dropoff_street, cp_dropoff.house_number AS dropoff_house_number,
       cp_dropoff.latitude AS dropoff_latitude, cp_dropoff.longitude AS dropoff_longitude,
       c_work.name AS work_country, r_work.name AS work_region, 
       ci_work.name AS work_city, s_work.name AS work_street, cp_work.house_number AS work_house_number,
       cp_work.latitude AS work_latitude, cp_work.longitude AS work_longitude
FROM translogix_djangoproject_passenger p
LEFT JOIN translogix_djangoproject_passenger_pickup_addresses ppa ON p.id = ppa.passenger_id
LEFT JOIN translogix_djangoproject_coordinatepoint cp_pickup ON ppa.coordinatepoint_id = cp_pickup.id
LEFT JOIN translogix_djangoproject_country c_pickup ON cp_pickup.country_id = c_pickup.id
LEFT JOIN translogix_djangoproject_region r_pickup ON cp_pickup.region_id = r_pickup.id
LEFT JOIN translogix_djangoproject_city ci_pickup ON cp_pickup.city_id = ci_pickup.id
LEFT JOIN translogix_djangoproject_street s_pickup ON cp_pickup.street_id = s_pickup.id
LEFT JOIN translogix_djangoproject_passenger_dropoff_addresses pda ON p.id = pda.passenger_id
LEFT JOIN translogix_djangoproject_coordinatepoint cp_dropoff ON pda.coordinatepoint_id = cp_dropoff.id
LEFT JOIN translogix_djangoproject_country c_dropoff ON cp_dropoff.country_id = c_dropoff.id
LEFT JOIN translogix_djangoproject_region r_dropoff ON cp_dropoff.region_id = r_dropoff.id
LEFT JOIN translogix_djangoproject_city ci_dropoff ON cp_dropoff.city_id = ci_dropoff.id
LEFT JOIN translogix_djangoproject_street s_dropoff ON cp_dropoff.street_id = s_dropoff.id
LEFT JOIN translogix_djangoproject_passenger_work_addresses pwa ON p.id = pwa.passenger_id
LEFT JOIN translogix_djangoproject_coordinatepoint cp_work ON pwa.coordinatepoint_id = cp_work.id
LEFT JOIN translogix_djangoproject_country c_work ON cp_work.country_id = c_work.id
LEFT JOIN translogix_djangoproject_region r_work ON cp_work.region_id = r_work.id
LEFT JOIN translogix_djangoproject_city ci_work ON cp_work.city_id = ci_work.id
LEFT JOIN translogix_djangoproject_street s_work ON cp_work.street_id = s_work.id;

