SELECT * FROM translogix_main_db.translogix_djangoproject_coordinatepoint;

CREATE VIEW coordinate_point_view AS
SELECT 
    cp.id,
    cp.point_type,
    cp.latitude,
    cp.longitude,
    cp.house_number,
    cp.city_id,
    c.name AS city_name,
    cp.country_id,
    co.name AS country_name,
    cp.created_by_id,
    cp.region_id,
    r.name AS region_name,
    cp.district_id,
    d.name AS district_name,
    cp.street_id,
    s.name AS street_name,
    cp.object_id,
    cp.owner_id,
    cp.owner_type,
	p.first_name AS passenger_first_name,
    p.last_name AS passenger_last_name,
    p.phone_number AS passenger_phone,
    p.email AS passenger_email
FROM 
    translogix_djangoproject_coordinatepoint AS cp
LEFT JOIN 
    translogix_djangoproject_city AS c ON cp.city_id = c.id
LEFT JOIN 
    translogix_djangoproject_country AS co ON cp.country_id = co.id
LEFT JOIN 
    translogix_djangoproject_region AS r ON cp.region_id = r.id
LEFT JOIN 
    translogix_djangoproject_district AS d ON cp.district_id = d.id
LEFT JOIN 
    translogix_djangoproject_street AS s ON cp.street_id = s.id
LEFT JOIN 
    translogix_djangoproject_passenger AS p ON cp.owner_id = p.id AND cp.owner_type = 'passenger'
ORDER BY 
    cp.id;
