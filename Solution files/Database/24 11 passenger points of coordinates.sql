CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `passenger_coordinate_point_view` AS
    SELECT 
        `cp`.`id` AS `id`,
        `cp`.`point_type` AS `point_type`,
        `cp`.`latitude` AS `latitude`,
        `cp`.`longitude` AS `longitude`,
        `h`.`house_number` AS `house_number`,
        `cp`.`city_id` AS `city_id`,
        `c`.`name` AS `city_name`,
        `cp`.`country_id` AS `country_id`,
        `co`.`name` AS `country_name`,
        `cp`.`created_by_id` AS `created_by_id`,
        `cp`.`region_id` AS `region_id`,
        `r`.`name` AS `region_name`,
        `cp`.`district_id` AS `district_id`,
        `d`.`name` AS `district_name`,
        `cp`.`street_id` AS `street_id`,
        `s`.`name` AS `street_name`,
        `cp`.`object_id` AS `object_id`,
        `cp`.`owner_id` AS `owner_id`,
        `cp`.`owner_type` AS `owner_type`,
        `p`.`first_name` AS `passenger_first_name`,
        `p`.`last_name` AS `passenger_last_name`,
        `p`.`phone_number` AS `passenger_phone`,
        `p`.`email` AS `passenger_email`,
        `p`.`is_active` AS `is_active`,
        `p`.`is_selected` AS `is_selected`
    FROM
        (((((( `translogix_djangoproject_coordinatepoint` `cp`
        LEFT JOIN `translogix_djangoproject_passenger` `p` ON (`cp`.`owner_id` = `p`.`id` AND `cp`.`owner_type` = 'passenger'))
        LEFT JOIN `translogix_djangoproject_city` `c` ON (`cp`.`city_id` = `c`.`id`))
        LEFT JOIN `translogix_djangoproject_country` `co` ON (`cp`.`country_id` = `co`.`id`))
        LEFT JOIN `translogix_djangoproject_region` `r` ON (`cp`.`region_id` = `r`.`id`))
        LEFT JOIN `translogix_djangoproject_district` `d` ON (`cp`.`district_id` = `d`.`id`))
        LEFT JOIN `translogix_djangoproject_street` `s` ON (`cp`.`street_id` = `s`.`id`))
        LEFT JOIN `translogix_djangoproject_house` `h` ON (`cp`.`house_id` = `h`.`id`);