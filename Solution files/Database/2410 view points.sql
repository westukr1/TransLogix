CREATE VIEW passenger_coordinates_view AS
SELECT 
    p.first_name, 
    p.last_name, 
    p.phone_number, 
    p.email, 
    cp.latitude, 
    cp.longitude, 
    cp.house_number, 
    c.name AS city_name, 
    r.name AS region_name, 
    d.name AS district_name, 
    co.name AS country_name, 
    'pickup' AS point_type
FROM 
    translogix_djangoproject_passenger p
JOIN 
    translogix_djangoproject_passenger_pickup_addresses ppa ON p.id = ppa.passenger_id
JOIN 
    translogix_djangoproject_coordinatepoint cp ON ppa.coordinatepoint_id = cp.id
LEFT JOIN 
    translogix_djangoproject_city c ON cp.city_id = c.id
LEFT JOIN 
    translogix_djangoproject_region r ON cp.region_id = r.id
LEFT JOIN 
    translogix_djangoproject_district d ON cp.district_id = d.id
LEFT JOIN 
    translogix_djangoproject_country co ON cp.country_id = co.id;