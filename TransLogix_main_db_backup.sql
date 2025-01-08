-- MySQL dump 10.13  Distrib 8.0.37, for Win64 (x86_64)
--
-- Host: localhost    Database: TransLogix_main_db
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add driver',1,'add_driver'),(2,'Can change driver',1,'change_driver'),(3,'Can delete driver',1,'delete_driver'),(4,'Can view driver',1,'view_driver'),(5,'Can add route',2,'add_route'),(6,'Can change route',2,'change_route'),(7,'Can delete route',2,'delete_route'),(8,'Can view route',2,'view_route'),(9,'Can add user',3,'add_user'),(10,'Can change user',3,'change_user'),(11,'Can delete user',3,'delete_user'),(12,'Can view user',3,'view_user'),(13,'Can add vehicle',4,'add_vehicle'),(14,'Can change vehicle',4,'change_vehicle'),(15,'Can delete vehicle',4,'delete_vehicle'),(16,'Can view vehicle',4,'view_vehicle'),(17,'Can add Trip',5,'add_trip'),(18,'Can change Trip',5,'change_trip'),(19,'Can delete Trip',5,'delete_trip'),(20,'Can view Trip',5,'view_trip'),(21,'Can add fuel log',6,'add_fuellog'),(22,'Can change fuel log',6,'change_fuellog'),(23,'Can delete fuel log',6,'delete_fuellog'),(24,'Can view fuel log',6,'view_fuellog'),(25,'Can add feedback',7,'add_feedback'),(26,'Can change feedback',7,'change_feedback'),(27,'Can delete feedback',7,'delete_feedback'),(28,'Can view feedback',7,'view_feedback'),(29,'Can add booking request',8,'add_bookingrequest'),(30,'Can change booking request',8,'change_bookingrequest'),(31,'Can delete booking request',8,'delete_bookingrequest'),(32,'Can view booking request',8,'view_bookingrequest'),(33,'Can add city',9,'add_city'),(34,'Can change city',9,'change_city'),(35,'Can delete city',9,'delete_city'),(36,'Can view city',9,'view_city'),(37,'Can add country',10,'add_country'),(38,'Can change country',10,'change_country'),(39,'Can delete country',10,'delete_country'),(40,'Can view country',10,'view_country'),(41,'Can add passenger',11,'add_passenger'),(42,'Can change passenger',11,'change_passenger'),(43,'Can delete passenger',11,'delete_passenger'),(44,'Can view passenger',11,'view_passenger'),(45,'Can add log entry',12,'add_logentry'),(46,'Can change log entry',12,'change_logentry'),(47,'Can delete log entry',12,'delete_logentry'),(48,'Can view log entry',12,'view_logentry'),(49,'Can add permission',13,'add_permission'),(50,'Can change permission',13,'change_permission'),(51,'Can delete permission',13,'delete_permission'),(52,'Can view permission',13,'view_permission'),(53,'Can add group',14,'add_group'),(54,'Can change group',14,'change_group'),(55,'Can delete group',14,'delete_group'),(56,'Can view group',14,'view_group'),(57,'Can add content type',15,'add_contenttype'),(58,'Can change content type',15,'change_contenttype'),(59,'Can delete content type',15,'delete_contenttype'),(60,'Can view content type',15,'view_contenttype'),(61,'Can add session',16,'add_session'),(62,'Can change session',16,'change_session'),(63,'Can delete session',16,'delete_session'),(64,'Can view session',16,'view_session'),(65,'Can add region',17,'add_region'),(66,'Can change region',17,'change_region'),(67,'Can delete region',17,'delete_region'),(68,'Can view region',17,'view_region'),(69,'Can add passenger route',18,'add_passengerroute'),(70,'Can change passenger route',18,'change_passengerroute'),(71,'Can delete passenger route',18,'delete_passengerroute'),(72,'Can view passenger route',18,'view_passengerroute'),(73,'Can add house',19,'add_house'),(74,'Can change house',19,'change_house'),(75,'Can delete house',19,'delete_house'),(76,'Can view house',19,'view_house'),(77,'Can add street',20,'add_street'),(78,'Can change street',20,'change_street'),(79,'Can delete street',20,'delete_street'),(80,'Can view street',20,'view_street'),(81,'Can add coordinate point',21,'add_coordinatepoint'),(82,'Can change coordinate point',21,'change_coordinatepoint'),(83,'Can delete coordinate point',21,'delete_coordinatepoint'),(84,'Can view coordinate point',21,'view_coordinatepoint'),(85,'Can add district',22,'add_district'),(86,'Can change district',22,'change_district'),(87,'Can delete district',22,'delete_district'),(88,'Can view district',22,'view_district'),(89,'Can add group',23,'add_group'),(90,'Can change group',23,'change_group'),(91,'Can delete group',23,'delete_group'),(92,'Can view group',23,'view_group'),(93,'Can add group membership',24,'add_groupmembership'),(94,'Can change group membership',24,'change_groupmembership'),(95,'Can delete group membership',24,'delete_groupmembership'),(96,'Can view group membership',24,'view_groupmembership'),(97,'Can add Fuel Type',25,'add_fueltype'),(98,'Can change Fuel Type',25,'change_fueltype'),(99,'Can delete Fuel Type',25,'delete_fueltype'),(100,'Can view Fuel Type',25,'view_fueltype'),(101,'Can add Driver Vehicle Assignment',26,'add_drivervehicleassignment'),(102,'Can change Driver Vehicle Assignment',26,'change_drivervehicleassignment'),(103,'Can delete Driver Vehicle Assignment',26,'delete_drivervehicleassignment'),(104,'Can view Driver Vehicle Assignment',26,'view_drivervehicleassignment');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_TransLogi` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2024-10-11 17:16:57.675306','2','user ()',1,'[{\"added\": {}}]',3,1),(2,'2024-10-11 17:36:07.358910','1','westukr1 (westukr1@gmail.com)',2,'[{\"changed\": {\"fields\": [\"Is logistic operator\", \"Is financial manager\", \"Is admin\"]}}]',3,1),(3,'2024-10-11 17:36:24.160037','2','user ()',2,'[{\"changed\": {\"fields\": [\"Staff status\", \"Superuser status\", \"Is logistic operator\", \"Is financial manager\", \"Is admin\"]}}]',3,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (12,'admin','logentry'),(14,'auth','group'),(13,'auth','permission'),(15,'contenttypes','contenttype'),(16,'sessions','session'),(8,'TransLogix_djangoProject','bookingrequest'),(9,'TransLogix_djangoProject','city'),(21,'TransLogix_djangoProject','coordinatepoint'),(10,'TransLogix_djangoProject','country'),(22,'TransLogix_djangoProject','district'),(1,'TransLogix_djangoProject','driver'),(26,'TransLogix_djangoProject','drivervehicleassignment'),(7,'TransLogix_djangoProject','feedback'),(6,'TransLogix_djangoProject','fuellog'),(25,'TransLogix_djangoProject','fueltype'),(23,'TransLogix_djangoProject','group'),(24,'TransLogix_djangoProject','groupmembership'),(19,'TransLogix_djangoProject','house'),(11,'TransLogix_djangoProject','passenger'),(18,'TransLogix_djangoProject','passengerroute'),(17,'TransLogix_djangoProject','region'),(2,'TransLogix_djangoProject','route'),(20,'TransLogix_djangoProject','street'),(5,'TransLogix_djangoProject','trip'),(3,'TransLogix_djangoProject','user'),(4,'TransLogix_djangoProject','vehicle');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'TransLogix_djangoProject','0001_initial','2024-10-11 14:39:10.443847'),(2,'TransLogix_djangoProject','0002_city_country_passenger_alter_route_options_and_more','2024-10-11 14:39:10.564846'),(3,'TransLogix_djangoProject','0003_manual2','2024-10-11 14:39:35.303955'),(4,'TransLogix_djangoProject','0004_manual3','2024-10-11 14:39:49.112039'),(5,'contenttypes','0001_initial','2024-10-11 14:46:24.706222'),(6,'admin','0001_initial','2024-10-11 14:46:24.919640'),(7,'admin','0002_logentry_remove_auto_add','2024-10-11 14:46:24.931644'),(8,'admin','0003_logentry_add_action_flag_choices','2024-10-11 14:46:24.940642'),(9,'contenttypes','0002_remove_content_type_name','2024-10-11 14:46:25.063108'),(10,'auth','0001_initial','2024-10-11 14:46:25.502298'),(11,'auth','0002_alter_permission_name_max_length','2024-10-11 14:46:25.653449'),(12,'auth','0003_alter_user_email_max_length','2024-10-11 14:46:25.664277'),(13,'auth','0004_alter_user_username_opts','2024-10-11 14:46:25.678761'),(14,'auth','0005_alter_user_last_login_null','2024-10-11 14:46:25.691620'),(15,'auth','0006_require_contenttypes_0002','2024-10-11 14:46:25.701827'),(16,'auth','0007_alter_validators_add_error_messages','2024-10-11 14:46:25.716846'),(17,'auth','0008_alter_user_username_max_length','2024-10-11 14:46:25.729216'),(18,'auth','0009_alter_user_last_name_max_length','2024-10-11 14:46:25.741679'),(19,'auth','0010_alter_group_name_max_length','2024-10-11 14:46:25.779171'),(20,'auth','0011_update_proxy_permissions','2024-10-11 14:46:25.798622'),(21,'auth','0012_alter_user_first_name_max_length','2024-10-11 14:46:25.813571'),(22,'sessions','0001_initial','2024-10-11 14:46:25.869738'),(23,'TransLogix_djangoProject','0005_alter_route_options_alter_trip_options_and_more','2024-10-11 15:08:14.377860'),(24,'TransLogix_djangoProject','0006_manual5','2024-10-11 15:25:04.005937'),(25,'TransLogix_djangoProject','0007_manual6','2024-10-11 15:26:45.577686'),(26,'TransLogix_djangoProject','0008_alter_route_options_alter_trip_options_and_more','2024-10-11 15:33:20.226116'),(27,'TransLogix_djangoProject','0009_district','2024-10-11 19:01:21.222947'),(28,'TransLogix_djangoProject','0010_remove_route_id_route_route_id','2024-10-13 10:48:57.643448'),(29,'TransLogix_djangoProject','0011_coordinatepoint_disrict','2024-10-13 11:36:18.608040'),(30,'TransLogix_djangoProject','0012_rename_disrict_coordinatepoint_district_and_more','2024-10-13 13:34:15.328590'),(31,'TransLogix_djangoProject','0013_rename_disrict_coordinatepoint_district','2024-10-13 13:36:01.573568'),(32,'TransLogix_djangoProject','0014_alter_route_estimated_time','2024-10-13 15:52:34.910322'),(33,'TransLogix_djangoProject','0015_alter_passenger_pickup_address','2024-10-15 08:14:41.266010'),(34,'TransLogix_djangoProject','0016_remove_passenger_pickup_address_and_more','2024-10-15 08:14:41.278016'),(35,'TransLogix_djangoProject','0017_rename_pickup_address_id_passenger_pickup_address','2024-10-15 16:31:37.621125'),(36,'TransLogix_djangoProject','0018_coordinatepoint_content_type_and_more','2024-10-15 17:37:56.304666'),(37,'TransLogix_djangoProject','0019_remove_passenger_pickup_address_and_more','2024-10-18 13:54:58.175582'),(38,'TransLogix_djangoProject','0020_alter_passenger_pickup_addresses','2024-10-22 13:03:21.141405'),(39,'TransLogix_djangoProject','0021_coordinatepoint_owner_id_coordinatepoint_owner_type','2024-10-26 18:42:43.782072'),(40,'TransLogix_djangoProject','0022_group_groupmembership','2024-10-27 08:55:06.322526'),(41,'TransLogix_djangoProject','0023_passenger_is_active_passenger_is_selected','2024-10-27 09:36:09.483882'),(42,'TransLogix_djangoProject','0024_coordinatepoint_is_active','2024-11-03 15:33:26.923358'),(43,'TransLogix_djangoProject','0025_remove_coordinatepoint_house_number_and_more','2024-11-11 15:54:18.188591'),(44,'TransLogix_djangoProject','0026_remove_coordinatepoint_house_and_more','2024-11-11 16:44:41.254818'),(45,'TransLogix_djangoProject','0027_remove_coordinatepoint_house_number_and_more','2024-11-11 17:41:06.580783'),(46,'TransLogix_djangoProject','0028_remove_driver_name_remove_driver_user_and_more','2024-12-23 21:40:29.795861'),(47,'TransLogix_djangoProject','0029_remove_driver_name_remove_driver_related_vehicles_and_more','2024-12-25 19:40:47.138908'),(48,'TransLogix_djangoProject','0030_remove_driver_name_remove_driver_related_vehicles_and_more','2024-12-25 20:00:51.037182'),(49,'TransLogix_djangoProject','0031_remove_vehicle_status_vehicle_active','2024-12-25 20:54:20.876314'),(50,'TransLogix_djangoProject','0032_driver_active','2024-12-25 20:56:25.612468'),(51,'TransLogix_djangoProject','0033_vehicle_image_url','2024-12-26 11:15:10.836299'),(52,'TransLogix_djangoProject','0034_driver_image_url','2024-12-26 18:35:06.938809'),(53,'TransLogix_djangoProject','0035_fueltype_drivervehicleassignment','2024-12-27 13:43:30.949617'),(54,'TransLogix_djangoProject','0036_alter_vehicle_fuel_type','2024-12-30 19:04:24.718312'),(55,'TransLogix_djangoProject','0037_alter_vehicle_fuel_type','2024-12-30 20:56:00.973945');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('bx95shagisozxbbdmns8sm9p9yaen2p9','.eJxVjEEOgjAQRe_StWmGoR2sS_ecgQzTjqCmTSisjHdXEha6_e-9_zIDb-s0bDUtwxzNxaA5_W4jyyPlHcQ751uxUvK6zKPdFXvQavsS0_N6uH8HE9fpWxO1iYGceFUPjVcgxRaxVSI3JunYd1EhKKKD0KEQAjMGkTNDksa8P8_cN5E:1tNzL3:8cU9bpSJzQc1eJg2h_oXJA-mXja20sCUloos8rnZmA8','2025-01-01 19:04:05.398073'),('hig99lrailqup0iphbfafkdnjcs7xqys','.eJxVjMsOwiAQRf-FtSEDlJdL934DGWCQqoGktCvjv2uTLnR7zzn3xQJuaw3boCXMmZ2ZYKffLWJ6UNtBvmO7dZ56W5c58l3hBx382jM9L4f7d1Bx1G8Niii6aGNO1mpyVguQQqfJFy_LJIxDa1RRAnySYClLHYvHbAhAYPLs_QHaLjek:1szJF5:LYHt9Rd3KQd-ZfSwrv_P_eDc33EnldLgAiJ5ExsIp9w','2024-10-25 17:15:55.584668');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `passenger_coordinate_point_view`
--

DROP TABLE IF EXISTS `passenger_coordinate_point_view`;
/*!50001 DROP VIEW IF EXISTS `passenger_coordinate_point_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `passenger_coordinate_point_view` AS SELECT 
 1 AS `id`,
 1 AS `point_type`,
 1 AS `latitude`,
 1 AS `longitude`,
 1 AS `house_number`,
 1 AS `city_id`,
 1 AS `city_name`,
 1 AS `country_id`,
 1 AS `country_name`,
 1 AS `created_by_id`,
 1 AS `region_id`,
 1 AS `region_name`,
 1 AS `district_id`,
 1 AS `district_name`,
 1 AS `street_id`,
 1 AS `street_name`,
 1 AS `object_id`,
 1 AS `owner_id`,
 1 AS `owner_type`,
 1 AS `passenger_first_name`,
 1 AS `passenger_last_name`,
 1 AS `passenger_phone`,
 1 AS `passenger_email`,
 1 AS `is_active`,
 1 AS `is_selected`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `passenger_coordinate_point_view3`
--

DROP TABLE IF EXISTS `passenger_coordinate_point_view3`;
/*!50001 DROP VIEW IF EXISTS `passenger_coordinate_point_view3`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `passenger_coordinate_point_view3` AS SELECT 
 1 AS `id`,
 1 AS `point_type`,
 1 AS `latitude`,
 1 AS `longitude`,
 1 AS `house_number`,
 1 AS `city_id`,
 1 AS `city_name`,
 1 AS `country_id`,
 1 AS `country_name`,
 1 AS `created_by_id`,
 1 AS `region_id`,
 1 AS `region_name`,
 1 AS `district_id`,
 1 AS `district_name`,
 1 AS `street_id`,
 1 AS `street_name`,
 1 AS `object_id`,
 1 AS `owner_id`,
 1 AS `owner_type`,
 1 AS `passenger_first_name`,
 1 AS `passenger_last_name`,
 1 AS `passenger_phone`,
 1 AS `passenger_email`,
 1 AS `is_active`,
 1 AS `is_selected`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `translogix_djangoproject_bookingrequest`
--

DROP TABLE IF EXISTS `translogix_djangoproject_bookingrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_bookingrequest` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `status` varchar(20) NOT NULL,
  `route_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `TransLogix_djangoPro_route_id_f242d805_fk_TransLogi` (`route_id`),
  KEY `TransLogix_djangoPro_user_id_2f872cbe_fk_TransLogi` (`user_id`),
  CONSTRAINT `TransLogix_djangoPro_route_id_f242d805_fk_TransLogi` FOREIGN KEY (`route_id`) REFERENCES `translogix_djangoproject_route` (`route_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_bookingrequest`
--

LOCK TABLES `translogix_djangoproject_bookingrequest` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_bookingrequest` DISABLE KEYS */;
/*!40000 ALTER TABLE `translogix_djangoproject_bookingrequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_city`
--

DROP TABLE IF EXISTS `translogix_djangoproject_city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_city` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `region_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_region_id_8c1598aa_fk_TransLogi` (`region_id`),
  CONSTRAINT `TransLogix_djangoPro_region_id_8c1598aa_fk_TransLogi` FOREIGN KEY (`region_id`) REFERENCES `translogix_djangoproject_region` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_city`
--

LOCK TABLES `translogix_djangoproject_city` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_city` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_city` VALUES (1,'Львів',1),(2,'Дрогобич',1),(3,'Червоноград',1),(4,'Самбір',1),(5,'Стрий',1),(6,'Золочів',1),(7,'Броди',1),(8,'Жидачів',1),(9,'Миколаїв',1),(10,'Сокаль',1),(11,'Радехів',1),(12,'Мостиська',1),(13,'Городок',1),(14,'Сколе',1),(15,'Перемишляни',1),(16,'Кам\'янка-Бузька',1),(17,'Жовква',1),(18,'Яворів',1),(19,'Буськ',1),(20,'Новий Розділ',1),(21,'Турка',1),(22,'Пустомити',1),(23,'Старий Самбір',1),(24,'Бібрка',1),(25,'Соснівка',1),(26,'Львів',12),(27,'Дрогобич',12),(28,'Самбір',12),(29,'Стрий',12),(30,'Червоноград',12),(31,'Золочів',12),(32,'Броди',12),(33,'Борислав',12),(34,'Трускавець',12),(35,'Львів',28),(36,'',29),(37,'Львів',29),(38,'',30),(39,'Львів',31),(40,'',31),(41,'Львів',32),(42,'',32),(43,'Test City',32),(44,'Another City',32),(45,'Work City',32),(46,'Test City',33),(47,'Another City',33),(48,'Work City',33),(49,'Test City',34),(50,'Another City',35),(51,'Work City',36),(52,'Стрий',37),(53,'Another City',38),(54,'Work City',39),(55,'Дрогобич',37),(56,'Куликів',NULL),(57,'Куликів',1);
/*!40000 ALTER TABLE `translogix_djangoproject_city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_coordinatepoint`
--

DROP TABLE IF EXISTS `translogix_djangoproject_coordinatepoint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_coordinatepoint` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `point_type` varchar(50) NOT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `city_id` bigint DEFAULT NULL,
  `country_id` bigint DEFAULT NULL,
  `created_by_id` int DEFAULT NULL,
  `region_id` bigint DEFAULT NULL,
  `district_id` bigint DEFAULT NULL,
  `street_id` bigint DEFAULT NULL,
  `content_type_id` int DEFAULT NULL,
  `object_id` int unsigned DEFAULT NULL,
  `owner_id` int unsigned DEFAULT NULL,
  `owner_type` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `house_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_city_id_339ca32c_fk_TransLogi` (`city_id`),
  KEY `TransLogix_djangoPro_country_id_8e260089_fk_TransLogi` (`country_id`),
  KEY `TransLogix_djangoPro_created_by_id_db8e2f0a_fk_TransLogi` (`created_by_id`),
  KEY `fk_region_id` (`region_id`),
  KEY `TransLogix_djangoPro_disrict_id_6f45f0fb_fk_TransLogi` (`district_id`),
  KEY `FK_street_id` (`street_id`),
  KEY `TransLogix_djangoPro_content_type_id_87236fff_fk_django_co` (`content_type_id`),
  KEY `TransLogix_djangoPro_house_id_b99dd941_fk_TransLogi` (`house_id`),
  CONSTRAINT `fk_region_id` FOREIGN KEY (`region_id`) REFERENCES `translogix_djangoproject_region` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FK_street_id` FOREIGN KEY (`street_id`) REFERENCES `translogix_djangoproject_street` (`id`),
  CONSTRAINT `TransLogix_djangoPro_city_id_339ca32c_fk_TransLogi` FOREIGN KEY (`city_id`) REFERENCES `translogix_djangoproject_city` (`id`),
  CONSTRAINT `TransLogix_djangoPro_content_type_id_87236fff_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `TransLogix_djangoPro_country_id_8e260089_fk_TransLogi` FOREIGN KEY (`country_id`) REFERENCES `translogix_djangoproject_country` (`id`),
  CONSTRAINT `TransLogix_djangoPro_disrict_id_6f45f0fb_fk_TransLogi` FOREIGN KEY (`district_id`) REFERENCES `translogix_djangoproject_district` (`id`),
  CONSTRAINT `TransLogix_djangoPro_house_id_b99dd941_fk_TransLogi` FOREIGN KEY (`house_id`) REFERENCES `translogix_djangoproject_house` (`id`),
  CONSTRAINT `translogix_djangoproject_coordinatepoint_chk_1` CHECK ((`object_id` >= 0)),
  CONSTRAINT `translogix_djangoproject_coordinatepoint_chk_2` CHECK ((`owner_id` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=392 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_coordinatepoint`
--

LOCK TABLES `translogix_djangoproject_coordinatepoint` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_coordinatepoint` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_coordinatepoint` VALUES (78,'start',49.838300,24.029700,1,1,1,1,1,1,NULL,NULL,NULL,NULL,0,NULL),(79,'end',49.477200,23.586500,2,1,1,1,4,4,NULL,NULL,NULL,NULL,0,NULL),(80,'start',49.477200,23.586500,2,1,1,1,4,4,NULL,NULL,NULL,NULL,0,NULL),(81,'end',49.634700,23.672800,3,1,1,1,3,NULL,NULL,NULL,NULL,NULL,1,NULL),(82,'start',49.634700,23.672800,3,1,1,1,3,NULL,NULL,NULL,NULL,NULL,1,NULL),(83,'end',49.926600,24.146400,4,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(84,'start',49.926600,24.146400,4,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(85,'end',49.282600,24.359800,5,1,1,1,5,5,NULL,NULL,NULL,NULL,1,NULL),(86,'start',49.282600,24.359800,5,1,1,1,5,5,NULL,NULL,NULL,NULL,1,NULL),(87,'end',49.512300,24.413200,6,1,1,1,6,6,NULL,NULL,NULL,NULL,1,NULL),(88,'start',49.512300,24.413200,6,1,1,1,6,6,NULL,NULL,NULL,NULL,1,NULL),(89,'end',49.779100,23.806600,7,1,1,1,7,7,NULL,NULL,NULL,NULL,1,NULL),(90,'start',49.779100,23.806600,7,1,1,1,7,7,NULL,NULL,NULL,NULL,1,NULL),(91,'end',49.840600,23.504700,8,1,1,1,8,8,NULL,NULL,NULL,NULL,1,NULL),(92,'start',49.840600,23.504700,8,1,1,1,8,8,NULL,NULL,NULL,NULL,1,NULL),(93,'end',49.607100,23.915300,9,1,1,1,9,9,NULL,NULL,NULL,NULL,1,NULL),(94,'start',49.607100,23.915300,9,1,1,1,9,9,NULL,NULL,NULL,NULL,1,NULL),(95,'end',49.553500,24.084900,10,1,1,1,10,10,NULL,NULL,NULL,NULL,1,NULL),(96,'start',49.553500,24.084900,10,1,1,1,10,10,NULL,NULL,NULL,NULL,1,NULL),(97,'end',49.398100,23.517800,11,1,1,1,11,11,NULL,NULL,NULL,NULL,1,NULL),(98,'start',49.398100,23.517800,11,1,1,1,11,11,NULL,NULL,NULL,NULL,1,NULL),(99,'end',49.451700,23.699500,12,1,1,1,12,12,NULL,NULL,NULL,NULL,1,NULL),(100,'start',49.451700,23.699500,12,1,1,1,12,12,NULL,NULL,NULL,NULL,1,NULL),(101,'end',49.323500,24.007900,13,1,1,1,13,13,NULL,NULL,NULL,NULL,1,NULL),(102,'start',49.323500,24.007900,13,1,1,1,13,13,NULL,NULL,NULL,NULL,1,NULL),(103,'end',49.732500,23.570500,14,1,1,1,14,14,NULL,NULL,NULL,NULL,1,NULL),(104,'start',49.732500,23.570500,14,1,1,1,14,14,NULL,NULL,NULL,NULL,1,NULL),(105,'end',49.842900,24.015400,1,1,1,1,1,1,NULL,NULL,NULL,NULL,1,NULL),(106,'start',49.482200,23.592300,2,1,1,1,4,4,NULL,NULL,NULL,NULL,1,NULL),(107,'end',49.482200,23.592300,2,1,1,1,4,4,NULL,NULL,NULL,NULL,1,NULL),(108,'start',49.628800,23.678400,3,1,1,1,3,NULL,NULL,NULL,NULL,NULL,1,NULL),(109,'end',49.926600,24.150400,4,1,1,1,3,NULL,NULL,NULL,NULL,NULL,1,NULL),(110,'start',49.926600,24.150400,4,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(111,'end',49.288200,24.365900,5,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(112,'start',49.288200,24.365900,5,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(113,'end',49.517800,24.421400,6,1,1,1,6,6,NULL,NULL,NULL,NULL,1,NULL),(114,'start',49.517800,24.421400,6,1,1,1,6,6,NULL,NULL,NULL,NULL,1,NULL),(115,'end',49.783400,23.812900,7,1,1,1,7,7,NULL,NULL,NULL,NULL,1,NULL),(116,'start',49.783400,23.812900,7,1,1,1,7,7,NULL,NULL,NULL,NULL,1,NULL),(117,'end',49.845200,23.509200,8,1,1,1,8,8,NULL,NULL,NULL,NULL,1,NULL),(118,'start',49.845200,23.509200,8,1,1,1,8,8,NULL,NULL,NULL,NULL,1,NULL),(119,'end',49.612300,23.920700,9,1,1,1,9,9,NULL,NULL,NULL,NULL,1,NULL),(120,'start',49.612300,23.920700,9,1,1,1,9,9,NULL,NULL,NULL,NULL,1,NULL),(121,'end',49.559100,24.089200,10,1,1,1,10,10,NULL,NULL,NULL,NULL,1,NULL),(122,'start',49.559100,24.089200,10,1,1,1,10,10,NULL,NULL,NULL,NULL,1,NULL),(123,'end',49.402800,23.523900,11,1,1,1,11,11,NULL,NULL,NULL,NULL,1,NULL),(124,'start',49.402800,23.523900,11,1,1,1,11,11,NULL,NULL,NULL,NULL,1,NULL),(125,'end',49.458400,23.706200,12,1,1,1,12,12,NULL,NULL,NULL,NULL,1,NULL),(126,'start',49.458400,23.706200,12,1,1,1,12,12,NULL,NULL,NULL,NULL,1,NULL),(127,'end',49.329100,24.012600,13,1,1,1,13,13,NULL,NULL,NULL,NULL,1,NULL),(128,'start',49.329100,24.012600,13,1,1,1,13,13,NULL,NULL,NULL,NULL,1,NULL),(129,'end',49.738500,23.576300,14,1,1,1,14,14,NULL,NULL,NULL,NULL,1,NULL),(130,'start',49.738500,23.576300,14,1,1,1,14,14,NULL,NULL,NULL,NULL,1,NULL),(131,'end',49.846100,24.022700,1,1,1,1,1,1,NULL,NULL,NULL,NULL,1,NULL),(132,'start',49.485500,23.599100,2,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(133,'end',49.631700,23.681900,3,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(134,'start',49.931100,24.156700,4,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(135,'end',49.292900,24.372600,5,1,1,1,5,5,NULL,NULL,NULL,NULL,1,NULL),(136,'start',49.292900,24.372600,5,1,1,1,5,5,NULL,NULL,NULL,NULL,1,NULL),(137,'end',49.523300,24.429700,6,1,1,1,6,6,NULL,NULL,NULL,NULL,1,NULL),(138,'start',49.523300,24.429700,6,1,1,1,6,6,NULL,NULL,NULL,NULL,1,NULL),(139,'end',49.787400,23.818300,7,1,1,1,7,7,NULL,NULL,NULL,NULL,1,NULL),(140,'start',49.787400,23.818300,7,1,1,1,7,7,NULL,NULL,NULL,NULL,1,NULL),(141,'end',49.850400,23.514800,8,1,1,1,8,8,NULL,NULL,NULL,NULL,1,NULL),(142,'start',49.850400,23.514800,8,1,1,1,8,8,NULL,NULL,NULL,NULL,1,NULL),(143,'end',49.617900,23.926300,9,1,1,1,9,9,NULL,NULL,NULL,NULL,1,NULL),(144,'start',49.617900,23.926300,9,1,1,1,9,9,NULL,NULL,NULL,NULL,1,NULL),(145,'end',49.564700,24.095300,10,1,1,1,10,10,NULL,NULL,NULL,NULL,1,NULL),(146,'start',49.564700,24.095300,10,1,1,1,10,10,NULL,NULL,NULL,NULL,1,NULL),(147,'end',49.407400,23.530900,11,1,1,1,11,11,NULL,NULL,NULL,NULL,1,NULL),(148,'start',49.407400,23.530900,11,1,1,1,11,11,NULL,NULL,NULL,NULL,1,NULL),(149,'end',49.463900,23.712800,12,1,1,1,12,12,NULL,NULL,NULL,NULL,1,NULL),(150,'start',49.463900,23.712800,12,1,1,1,12,12,NULL,NULL,NULL,NULL,1,NULL),(151,'end',49.334600,24.018200,13,1,1,1,13,13,NULL,NULL,NULL,NULL,1,NULL),(152,'start',49.334600,24.018200,13,1,1,1,13,13,NULL,NULL,NULL,NULL,1,NULL),(153,'end',49.743900,23.582100,14,1,1,1,14,14,NULL,NULL,NULL,NULL,1,NULL),(154,'start',49.743900,23.582100,14,1,1,1,14,14,NULL,NULL,NULL,NULL,1,NULL),(155,'pickup',50.449850,30.523151,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(156,'dropoff',49.840063,24.023795,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(157,'work',48.614682,22.275662,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(158,'pickup',49.798296,24.056217,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(159,'dropoff',49.798296,24.056217,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(160,'work',49.801715,24.005329,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(161,'',49.669214,24.559317,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(162,'',49.385339,24.142183,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(163,'',49.854801,24.025761,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(164,'',49.856944,24.046954,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(165,'',49.858041,24.030578,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(166,'',50.078807,25.147894,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(167,'',49.856944,24.046954,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(168,'',49.858041,24.030578,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(169,'',50.078807,25.147894,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(170,'',49.856944,24.046954,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(171,'',49.858041,24.030578,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(172,'',50.078807,25.147894,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(173,'',49.841267,24.032281,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(174,'',49.841268,24.030678,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(175,'',50.078807,25.147894,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(176,'',49.841267,24.032281,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(177,'',49.841268,24.030678,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(178,'',50.078807,25.147894,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(179,'',49.841267,24.032281,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(180,'',49.841268,24.030678,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(181,'',50.078807,25.147894,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(182,'',49.841267,24.032281,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(183,'',49.841268,24.030678,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(184,'',50.078807,25.147894,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(185,'',49.841267,24.032281,1,NULL,NULL,NULL,NULL,149,NULL,NULL,NULL,NULL,1,102),(186,'',49.841268,24.030678,1,NULL,NULL,NULL,NULL,150,NULL,NULL,NULL,NULL,1,103),(187,'',50.078807,25.147894,1,NULL,NULL,NULL,NULL,151,NULL,NULL,NULL,NULL,1,104),(188,'',49.669214,24.559317,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(189,'',49.669851,24.552316,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(190,'',49.854801,24.025761,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(191,'',49.873185,23.946489,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(192,'',49.715484,23.905562,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(193,'',49.797306,24.054102,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(194,'pickup',49.839700,24.029700,26,1,NULL,12,NULL,61,NULL,NULL,NULL,NULL,1,NULL),(195,'dropoff',49.839000,24.029000,26,1,NULL,12,NULL,62,NULL,NULL,NULL,NULL,1,NULL),(196,'work',49.840000,24.030000,26,1,NULL,12,NULL,63,NULL,NULL,NULL,NULL,1,NULL),(197,'pickup',49.839700,24.029700,26,1,NULL,12,NULL,61,NULL,NULL,NULL,NULL,1,NULL),(198,'dropoff',49.839000,24.029000,26,1,NULL,12,NULL,62,NULL,NULL,NULL,NULL,1,NULL),(199,'work',49.840000,24.030000,26,1,NULL,12,NULL,63,NULL,NULL,NULL,NULL,1,NULL),(200,'pickup',49.839700,24.029700,26,1,NULL,12,NULL,61,NULL,NULL,NULL,NULL,1,NULL),(201,'dropoff',49.839000,24.029000,26,1,NULL,12,NULL,62,NULL,NULL,NULL,NULL,1,NULL),(202,'work',49.840000,24.030000,26,1,NULL,12,NULL,63,NULL,NULL,NULL,NULL,1,NULL),(203,'pickup',49.839700,24.029700,26,1,NULL,12,NULL,61,NULL,NULL,NULL,NULL,1,NULL),(204,'dropoff',49.839000,24.029000,26,1,NULL,12,NULL,62,NULL,NULL,NULL,NULL,1,NULL),(205,'work',49.840000,24.030000,26,1,NULL,12,NULL,63,NULL,NULL,NULL,NULL,1,NULL),(206,'pickup',49.839700,24.029700,26,1,NULL,12,NULL,64,NULL,NULL,NULL,NULL,1,NULL),(207,'dropoff',49.839000,24.029000,26,1,NULL,12,NULL,65,NULL,NULL,NULL,NULL,1,NULL),(208,'work',49.840000,24.030000,26,1,NULL,12,NULL,66,NULL,NULL,NULL,NULL,1,NULL),(209,'pickup',49.839700,24.029700,26,1,NULL,12,NULL,64,NULL,NULL,NULL,NULL,1,NULL),(210,'dropoff',49.839000,24.029000,26,1,NULL,12,NULL,65,NULL,NULL,NULL,NULL,1,NULL),(211,'work',49.840000,24.030000,26,1,NULL,12,NULL,66,NULL,NULL,NULL,NULL,1,NULL),(212,'pickup',49.839700,24.029700,26,1,NULL,12,NULL,64,NULL,NULL,NULL,NULL,1,NULL),(213,'dropoff',49.839000,24.029000,26,1,NULL,12,NULL,65,NULL,NULL,NULL,NULL,1,NULL),(214,'work',49.840000,24.030000,26,1,NULL,12,NULL,66,NULL,NULL,NULL,NULL,1,NULL),(215,'pickup',49.839700,24.029700,26,1,NULL,12,NULL,64,NULL,NULL,NULL,NULL,1,NULL),(216,'dropoff',49.839000,24.029000,26,1,NULL,12,NULL,65,NULL,NULL,NULL,NULL,1,NULL),(217,'work',49.840000,24.030000,26,1,NULL,12,NULL,66,NULL,NULL,NULL,NULL,1,NULL),(218,'pickup',49.839700,24.029700,5,1,NULL,12,NULL,152,NULL,NULL,NULL,NULL,1,105),(219,'dropoff',49.839000,24.029000,1,1,NULL,12,NULL,140,NULL,NULL,NULL,NULL,0,91),(220,'work',49.840000,24.030000,1,1,NULL,12,NULL,141,NULL,NULL,NULL,NULL,0,92),(221,'pickup',49.357500,23.512000,27,1,NULL,12,NULL,67,NULL,NULL,NULL,NULL,1,NULL),(222,'dropoff',49.515000,23.199000,28,1,NULL,12,NULL,68,NULL,NULL,NULL,NULL,1,NULL),(223,'work',49.839700,24.029700,26,1,NULL,12,NULL,69,NULL,NULL,NULL,NULL,1,NULL),(224,'pickup',49.256000,23.850000,29,1,NULL,12,NULL,70,NULL,NULL,NULL,NULL,1,NULL),(225,'dropoff',50.391500,24.231700,30,1,NULL,12,NULL,71,NULL,NULL,NULL,NULL,1,NULL),(226,'work',49.839700,24.029700,26,1,NULL,12,NULL,69,NULL,NULL,NULL,NULL,1,NULL),(227,'pickup',49.807800,24.892000,31,1,NULL,12,NULL,72,NULL,NULL,NULL,NULL,1,NULL),(228,'dropoff',50.081400,25.151500,32,1,NULL,12,NULL,73,NULL,NULL,NULL,NULL,1,NULL),(229,'work',49.839700,24.029700,26,1,NULL,12,NULL,69,NULL,NULL,NULL,NULL,1,NULL),(230,'pickup',49.357500,23.512000,27,1,NULL,12,NULL,67,NULL,NULL,NULL,NULL,1,NULL),(231,'pickup',49.256000,23.850000,29,1,NULL,12,NULL,70,NULL,NULL,NULL,NULL,1,NULL),(232,'dropoff',50.391500,24.231700,30,1,NULL,12,NULL,71,NULL,NULL,NULL,NULL,1,NULL),(233,'dropoff',49.807800,24.892000,31,1,NULL,12,NULL,72,NULL,NULL,NULL,NULL,1,NULL),(234,'work',49.839700,24.029700,26,1,NULL,12,NULL,69,NULL,NULL,NULL,NULL,1,NULL),(235,'pickup',49.357500,23.512000,27,1,NULL,12,NULL,67,NULL,NULL,NULL,NULL,1,NULL),(236,'pickup',49.256000,23.850000,29,1,NULL,12,NULL,70,NULL,NULL,NULL,NULL,1,NULL),(237,'dropoff',50.391500,24.231700,30,1,NULL,12,NULL,71,NULL,NULL,NULL,NULL,1,NULL),(238,'dropoff',49.807800,24.892000,31,1,NULL,12,NULL,72,NULL,NULL,NULL,NULL,1,NULL),(239,'work',49.839700,24.029700,26,1,NULL,12,NULL,69,NULL,NULL,NULL,NULL,1,NULL),(240,'pickup',49.357500,23.512000,27,1,NULL,12,NULL,67,NULL,NULL,NULL,NULL,1,NULL),(241,'pickup',49.256000,23.850000,29,1,NULL,12,NULL,70,NULL,NULL,NULL,NULL,1,NULL),(242,'dropoff',50.391500,24.231700,30,1,NULL,12,NULL,71,NULL,NULL,NULL,NULL,1,NULL),(243,'dropoff',49.807800,24.892000,31,1,NULL,12,NULL,72,NULL,NULL,NULL,NULL,1,NULL),(244,'work',49.839700,24.029700,26,1,NULL,12,NULL,69,NULL,NULL,NULL,NULL,1,NULL),(245,'pickup',50.081500,25.144800,32,1,NULL,12,NULL,73,NULL,NULL,NULL,NULL,1,NULL),(246,'pickup',49.350700,23.505100,27,1,NULL,12,NULL,74,NULL,NULL,NULL,NULL,1,NULL),(247,'dropoff',49.518600,23.199800,28,1,NULL,12,NULL,75,NULL,NULL,NULL,NULL,1,NULL),(248,'dropoff',49.810200,24.893200,31,1,NULL,12,NULL,76,NULL,NULL,NULL,NULL,1,NULL),(249,'work',49.856600,24.025600,26,1,NULL,12,NULL,77,NULL,NULL,NULL,NULL,1,NULL),(250,'dropoff',49.856600,24.025600,26,1,NULL,12,NULL,77,NULL,NULL,NULL,NULL,1,NULL),(251,'pickup',49.350700,23.505100,27,1,NULL,12,NULL,74,NULL,NULL,NULL,NULL,1,NULL),(252,'pickup',49.518600,23.199800,28,1,NULL,12,NULL,78,NULL,NULL,NULL,NULL,1,NULL),(253,'dropoff',49.810200,24.893200,33,1,NULL,12,NULL,79,NULL,NULL,NULL,NULL,1,NULL),(255,'dropoff',49.825000,23.505500,34,1,NULL,12,NULL,80,NULL,NULL,NULL,NULL,1,NULL),(256,'work',49.856600,24.025600,26,1,NULL,12,NULL,77,NULL,NULL,NULL,NULL,1,NULL),(257,'pickup',49.799535,24.053083,35,1,NULL,28,NULL,81,NULL,NULL,NULL,NULL,1,NULL),(258,'dropoffAddresses',49.821055,23.962606,35,1,NULL,28,NULL,82,NULL,NULL,NULL,NULL,1,NULL),(259,'work',49.858920,24.033717,35,1,NULL,28,NULL,83,NULL,NULL,NULL,NULL,1,NULL),(260,'pickup',49.799535,24.053083,35,1,NULL,28,NULL,81,NULL,NULL,NULL,NULL,1,NULL),(261,'dropoffAddresses',49.821055,23.962606,35,1,NULL,28,NULL,82,NULL,NULL,NULL,NULL,1,NULL),(262,'work',49.858920,24.033717,35,1,NULL,28,NULL,83,NULL,NULL,NULL,NULL,1,NULL),(263,'pickup',49.799535,24.053083,35,1,NULL,28,NULL,81,NULL,NULL,NULL,NULL,1,NULL),(264,'pickup',49.799535,24.053083,35,1,NULL,28,NULL,81,NULL,NULL,NULL,NULL,1,NULL),(265,'dropoff',49.821055,23.962606,35,1,NULL,28,NULL,82,NULL,NULL,NULL,NULL,1,NULL),(266,'work',49.839683,24.029717,35,1,NULL,28,NULL,84,NULL,NULL,NULL,NULL,1,NULL),(267,'pickup',49.799535,24.053083,35,1,NULL,28,NULL,81,NULL,NULL,NULL,NULL,1,NULL),(268,'dropoff',49.821055,23.962606,35,1,NULL,28,NULL,82,NULL,NULL,NULL,NULL,1,NULL),(269,'work',49.839683,24.029717,35,1,NULL,28,NULL,84,NULL,NULL,NULL,NULL,1,NULL),(270,'pickup',49.799535,24.053083,35,1,NULL,28,NULL,81,NULL,NULL,NULL,NULL,1,NULL),(271,'dropoff',49.821055,23.962606,35,1,NULL,28,NULL,82,NULL,NULL,NULL,NULL,1,NULL),(272,'work',49.839683,24.029717,35,1,NULL,28,NULL,84,NULL,NULL,NULL,NULL,1,NULL),(273,'pickup',49.799535,24.053083,35,1,NULL,28,NULL,81,NULL,NULL,NULL,NULL,1,NULL),(274,'dropoff',49.821055,23.962606,35,1,NULL,28,NULL,82,NULL,NULL,NULL,NULL,1,NULL),(275,'work',49.839683,24.029717,35,1,NULL,28,NULL,84,NULL,NULL,NULL,NULL,1,NULL),(276,'pickup',49.827929,23.967424,35,1,NULL,28,NULL,85,NULL,NULL,NULL,NULL,1,NULL),(277,'dropoff',49.829204,23.967849,35,1,NULL,28,NULL,85,NULL,NULL,NULL,NULL,1,NULL),(278,'work',49.879670,24.037842,35,1,NULL,28,NULL,86,NULL,NULL,NULL,NULL,1,NULL),(279,'pickup',49.799535,24.053083,37,1,NULL,29,NULL,88,NULL,NULL,NULL,NULL,1,NULL),(280,'pickup',49.799535,24.053083,37,1,NULL,29,NULL,88,NULL,NULL,NULL,NULL,1,NULL),(281,'pickup',49.799535,24.053083,39,1,NULL,31,NULL,90,NULL,NULL,NULL,NULL,1,NULL),(282,'pickup',49.799535,24.053083,39,1,NULL,31,NULL,90,NULL,NULL,NULL,NULL,1,NULL),(283,'pickup',49.799535,24.053083,39,1,NULL,31,NULL,90,NULL,NULL,NULL,NULL,1,NULL),(284,'pickup',49.828700,24.031637,41,1,NULL,32,NULL,92,NULL,NULL,NULL,NULL,1,NULL),(285,'pickup',49.839683,24.029717,41,1,NULL,32,NULL,94,NULL,NULL,NULL,NULL,1,NULL),(286,'pickup',49.839683,24.029717,41,1,NULL,32,NULL,94,NULL,NULL,NULL,NULL,1,NULL),(287,'dropoff',49.821055,23.962606,41,1,NULL,32,NULL,95,NULL,NULL,NULL,NULL,1,NULL),(288,'pickup',49.839700,24.029700,43,1,NULL,32,NULL,96,NULL,NULL,NULL,NULL,1,NULL),(289,'dropoff',50.450100,30.523400,44,1,NULL,32,NULL,97,NULL,NULL,NULL,NULL,1,NULL),(290,'work',51.165700,10.451500,45,1,NULL,32,NULL,98,NULL,NULL,NULL,NULL,1,NULL),(291,'pickup',49.839700,24.029700,46,1,NULL,33,NULL,99,NULL,NULL,NULL,NULL,1,NULL),(292,'dropoff',50.450100,30.523400,47,1,NULL,33,NULL,100,NULL,NULL,NULL,NULL,1,NULL),(293,'work',51.165700,10.451500,48,1,NULL,33,NULL,101,NULL,NULL,NULL,NULL,1,NULL),(294,'pickup',49.839700,24.029700,49,1,NULL,34,NULL,102,NULL,NULL,NULL,NULL,1,NULL),(295,'dropoff',50.450100,30.523400,50,1,NULL,35,NULL,103,NULL,NULL,NULL,NULL,1,NULL),(296,'work',51.165700,10.451500,51,1,NULL,36,NULL,104,NULL,NULL,NULL,NULL,1,NULL),(297,'pickup',49.839700,24.029700,49,1,NULL,34,NULL,102,NULL,NULL,NULL,NULL,1,NULL),(298,'dropoff',50.450100,30.523400,50,1,NULL,35,NULL,103,NULL,NULL,NULL,NULL,1,NULL),(299,'work',51.165700,10.451500,51,1,NULL,36,NULL,104,NULL,NULL,NULL,NULL,1,NULL),(300,'pickup',49.265608,23.843134,52,6,NULL,37,NULL,105,NULL,NULL,NULL,NULL,1,NULL),(301,'dropoff',50.450100,30.523400,53,6,NULL,38,NULL,106,NULL,NULL,NULL,NULL,1,NULL),(302,'work',51.165700,10.451500,54,6,NULL,39,NULL,107,NULL,NULL,NULL,NULL,1,NULL),(303,'pickup',49.265608,23.843134,52,6,NULL,37,NULL,105,NULL,NULL,NULL,NULL,1,NULL),(304,'dropoff',50.450100,30.523400,53,6,NULL,38,NULL,106,NULL,NULL,NULL,NULL,1,NULL),(305,'work',51.165700,10.451500,54,6,NULL,39,NULL,107,NULL,NULL,NULL,NULL,1,NULL),(306,'pickup',49.265608,23.843134,52,6,NULL,37,NULL,105,NULL,NULL,NULL,NULL,1,NULL),(307,'dropoff',50.450100,30.523400,53,6,NULL,38,NULL,106,NULL,NULL,NULL,NULL,1,NULL),(308,'work',51.165700,10.451500,54,6,NULL,39,NULL,107,NULL,NULL,NULL,NULL,1,NULL),(309,'pickup',49.255228,23.830535,52,6,NULL,37,NULL,108,NULL,NULL,NULL,NULL,1,NULL),(310,'dropoff',50.450100,30.523400,53,6,NULL,38,NULL,106,NULL,NULL,NULL,NULL,1,NULL),(311,'work',51.165700,10.451500,54,6,NULL,39,NULL,107,NULL,NULL,NULL,NULL,1,NULL),(312,'pickup',49.255228,23.830535,52,6,NULL,37,NULL,108,NULL,NULL,NULL,NULL,1,NULL),(313,'dropoff',50.450100,30.523400,53,6,NULL,38,NULL,106,NULL,NULL,NULL,NULL,1,NULL),(314,'work',51.165700,10.451500,54,6,NULL,39,NULL,107,NULL,NULL,NULL,NULL,1,NULL),(315,'pickup',49.305251,23.526619,55,6,NULL,37,NULL,109,NULL,NULL,NULL,NULL,1,NULL),(316,'dropoff',50.450100,30.523400,53,6,NULL,38,NULL,106,NULL,NULL,NULL,NULL,1,NULL),(317,'work',51.165700,10.451500,54,6,NULL,39,NULL,107,NULL,NULL,NULL,NULL,1,NULL),(318,'pickup',49.305251,23.526619,2,1,2,1,1,110,NULL,NULL,242,'passenger',1,NULL),(319,'pickup',50.084357,25.144362,7,1,2,1,3,111,NULL,NULL,243,'passenger',1,NULL),(320,'pickup',50.084357,25.144362,7,1,2,1,3,111,NULL,NULL,243,'passenger',1,NULL),(321,'dropoff',50.078807,25.147894,7,1,2,1,3,112,NULL,NULL,243,'passenger',1,NULL),(322,'work',49.839683,24.029717,1,1,2,1,1,113,NULL,NULL,243,'passenger',1,NULL),(323,'pickup',49.527173,23.975779,9,1,2,1,9,114,NULL,NULL,244,'passenger',1,116),(324,'dropoff',49.526859,23.977128,9,1,2,1,9,115,NULL,NULL,244,'passenger',1,131),(325,'work',49.858363,24.031239,1,1,2,1,1,113,NULL,NULL,244,'passenger',1,118),(326,'pickup',49.808366,24.043205,1,1,2,1,1,116,NULL,NULL,245,'passenger',1,NULL),(327,'dropoff',49.786614,24.068314,1,1,2,1,1,117,NULL,NULL,245,'passenger',1,NULL),(328,'work',49.852615,24.020734,1,1,2,1,1,118,NULL,NULL,245,'passenger',1,NULL),(329,'pickup',49.808366,24.043205,1,1,2,1,1,116,NULL,NULL,245,'passenger',1,NULL),(330,'dropoff',49.786614,24.068314,1,1,2,1,1,117,NULL,NULL,245,'passenger',1,NULL),(331,'work',49.852615,24.020734,1,1,2,1,1,118,NULL,NULL,245,'passenger',1,NULL),(332,'pickup',49.808366,24.043205,1,1,2,1,1,116,NULL,NULL,245,'passenger',1,NULL),(333,'dropoff',49.786614,24.068314,1,1,2,1,1,117,NULL,NULL,245,'passenger',1,NULL),(334,'work',49.852615,24.020734,1,1,2,1,1,118,NULL,NULL,245,'passenger',1,NULL),(335,'pickup',49.808366,24.043205,1,1,2,1,1,116,NULL,NULL,245,'passenger',1,NULL),(336,'dropoff',49.786614,24.068314,1,1,2,1,1,117,NULL,NULL,245,'passenger',1,NULL),(337,'work',49.852615,24.020734,1,1,2,1,1,118,NULL,NULL,245,'passenger',1,NULL),(338,'pickup',49.808366,24.043205,1,1,2,1,1,116,NULL,NULL,245,'passenger',1,NULL),(339,'dropoff',49.786614,24.068314,1,1,2,1,1,117,NULL,NULL,245,'passenger',1,NULL),(340,'work',49.852615,24.020734,1,1,2,1,1,118,NULL,NULL,245,'passenger',1,NULL),(341,'pickup',49.843251,24.039446,1,1,2,1,1,122,NULL,NULL,248,'passenger',1,NULL),(342,'dropoff',49.826858,24.027894,1,1,2,1,1,123,NULL,NULL,248,'passenger',1,NULL),(343,'work',49.839683,24.029717,1,1,2,1,1,113,NULL,NULL,248,'passenger',1,NULL),(344,'pickup',49.843251,24.039446,1,1,2,1,1,122,NULL,NULL,248,'passenger',1,NULL),(345,'dropoff',49.826858,24.027894,1,1,2,1,1,123,NULL,NULL,248,'passenger',1,NULL),(346,'work',49.839683,24.029717,1,1,2,1,1,113,NULL,NULL,248,'passenger',1,NULL),(347,'pickup',49.843251,24.039446,1,1,2,1,1,122,NULL,NULL,248,'passenger',1,NULL),(348,'dropoff',49.826858,24.027894,1,1,2,1,1,123,NULL,NULL,248,'passenger',1,NULL),(349,'work',49.839683,24.029717,1,1,2,1,1,113,NULL,NULL,248,'passenger',1,NULL),(350,'pickup',49.843251,24.039446,1,1,2,1,1,122,NULL,NULL,248,'passenger',1,NULL),(351,'dropoff',49.826858,24.027894,1,1,2,1,1,123,NULL,NULL,248,'passenger',1,NULL),(352,'work',49.839683,24.029717,1,1,2,1,1,113,NULL,NULL,248,'passenger',1,NULL),(353,'pickup',49.843251,24.039446,1,1,2,1,1,122,NULL,NULL,248,'passenger',1,NULL),(354,'dropoff',49.826858,24.027894,1,1,2,1,1,123,NULL,NULL,248,'passenger',1,NULL),(355,'work',49.839683,24.029717,1,1,2,1,1,113,NULL,NULL,248,'passenger',1,NULL),(356,'pickup',49.843251,24.039446,1,1,2,1,1,122,NULL,NULL,248,'passenger',1,NULL),(357,'dropoff',49.826858,24.027894,1,1,2,1,1,123,NULL,NULL,248,'passenger',1,NULL),(358,'work',49.839683,24.029717,1,1,2,1,1,113,NULL,NULL,248,'passenger',1,NULL),(359,'pickup',49.843251,24.039446,1,1,2,1,1,122,NULL,NULL,248,'passenger',1,NULL),(360,'dropoff',49.826858,24.027894,1,1,2,1,1,123,NULL,NULL,248,'passenger',1,NULL),(361,'work',49.839683,24.029717,1,1,2,1,1,113,NULL,NULL,248,'passenger',1,NULL),(362,'pickup',49.358012,23.512319,2,1,2,1,2,124,NULL,NULL,249,'passenger',1,86),(363,'dropoff',49.358012,23.512319,2,1,2,1,2,124,NULL,NULL,249,'passenger',0,93),(364,'work',49.833722,23.990649,1,1,2,1,1,120,NULL,NULL,249,'passenger',1,87),(365,'pickup',49.111111,23.111111,16,1,2,1,8,125,NULL,NULL,250,'passenger',1,123),(366,'dropoff',50.523000,24.345448,16,1,2,1,4,136,NULL,NULL,250,'passenger',1,85),(367,'work',49.858279,24.030269,1,1,2,1,1,113,NULL,NULL,250,'passenger',1,81),(368,'pickup',49.511000,23.192705,4,1,2,1,1,155,NULL,NULL,250,'passenger',1,111),(369,'pickup',49.522000,23.979996,9,1,2,1,1,135,NULL,NULL,250,'passenger',1,84),(370,'dropoff',49.799928,24.059230,1,1,2,1,1,130,NULL,NULL,250,'passenger',0,120),(371,'work',49.858279,24.030269,1,1,2,1,1,113,NULL,NULL,250,'passenger',1,81),(372,'pickup',50.055912,23.976305,17,1,2,1,1,134,NULL,NULL,209,'passenger',0,73),(373,'dropoff',49.831294,23.989672,1,1,2,1,1,120,NULL,NULL,209,'passenger',0,74),(374,'work',49.839683,24.029717,56,1,2,1,1,133,NULL,NULL,209,'passenger',0,68),(375,'pickup',49.259117,23.852535,5,1,2,1,1,137,NULL,NULL,246,'passenger',0,88),(376,'pickup',49.254471,23.843767,5,1,2,1,1,152,NULL,NULL,246,'passenger',1,132),(377,'dropoff',49.257038,23.818409,5,1,2,1,1,162,NULL,NULL,246,'passenger',1,133),(378,'work',49.858782,24.027108,1,1,2,1,1,113,NULL,NULL,246,'passenger',1,56),(379,'pickup',49.520715,23.206550,4,1,2,1,1,142,NULL,NULL,246,'passenger',0,94),(380,'pickup',50.106825,24.343689,16,1,2,1,8,144,NULL,NULL,194,'passenger',1,96),(381,'pickup',49.843930,24.038682,1,1,2,1,1,145,NULL,NULL,194,'passenger',0,97),(382,'pickup',49.837477,23.976880,1,1,2,1,1,146,NULL,NULL,194,'passenger',1,98),(383,'pickup',49.808366,24.043205,1,1,2,1,1,116,NULL,NULL,194,'passenger',1,99),(384,'pickup',49.669214,24.559317,15,1,2,1,10,147,NULL,NULL,194,'passenger',1,100),(385,'dropoff',49.350763,23.506251,2,1,2,1,2,148,NULL,NULL,194,'passenger',0,101),(386,'pickup',49.980217,24.077833,56,1,2,1,7,154,NULL,NULL,247,'passenger',1,109),(387,'dropoff',49.980217,24.077833,56,1,2,1,7,154,NULL,NULL,247,'passenger',1,110),(388,'work',49.855050,24.027836,1,1,2,1,1,118,NULL,NULL,247,'passenger',1,108),(389,'pickup',49.800247,24.064389,1,1,2,1,1,156,NULL,NULL,251,'passenger',1,121),(390,'pickup',49.715483,23.905562,22,1,2,1,11,163,NULL,NULL,252,'passenger',1,135),(391,'pickup',49.798106,24.057687,1,1,2,1,1,128,NULL,NULL,209,'passenger',1,134);
/*!40000 ALTER TABLE `translogix_djangoproject_coordinatepoint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_country`
--

DROP TABLE IF EXISTS `translogix_djangoproject_country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_country` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_country`
--

LOCK TABLES `translogix_djangoproject_country` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_country` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_country` VALUES (6,'1'),(2,'Country'),(1,'Україна');
/*!40000 ALTER TABLE `translogix_djangoproject_country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_district`
--

DROP TABLE IF EXISTS `translogix_djangoproject_district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_district` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `region_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_region_id_59a74f4c_fk_TransLogi` (`region_id`),
  CONSTRAINT `TransLogix_djangoPro_region_id_59a74f4c_fk_TransLogi` FOREIGN KEY (`region_id`) REFERENCES `translogix_djangoproject_region` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_district`
--

LOCK TABLES `translogix_djangoproject_district` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_district` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_district` VALUES (1,'Львівський район',1),(2,'Дрогобицький район',1),(3,'Бродівський район',1),(4,'Буський район',1),(5,'Городоцький район',1),(6,'Жидачівський район',1),(7,'Жовківський район',1),(8,'Кам\'янка-Бузький район',1),(9,'Миколаївський район',1),(10,'Перемишлянський район',1),(11,'Пустомитівський район',1),(12,'Радехівський район',1),(13,'Сколівський район',1),(14,'Сокальський район',1),(15,'Старосамбірський район',1),(16,'Турківський район',1),(17,'Золочівський район',1),(18,'Яворівський район',1);
/*!40000 ALTER TABLE `translogix_djangoproject_district` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_driver`
--

DROP TABLE IF EXISTS `translogix_djangoproject_driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_driver` (
  `driver_id` int NOT NULL AUTO_INCREMENT,
  `citizenship` varchar(50) NOT NULL,
  `contract_type` varchar(50) NOT NULL,
  `driving_experience` int unsigned DEFAULT NULL,
  `email` varchar(254) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `license_category` varchar(50) NOT NULL,
  `license_issue_date` date DEFAULT NULL,
  `license_issuer` varchar(100) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `registration_address` longtext NOT NULL,
  `residence_address` longtext NOT NULL,
  `year_of_birth` int unsigned DEFAULT NULL,
  `last_name` varchar(50) NOT NULL DEFAULT 'last_name',
  `phone_number` varchar(20) NOT NULL,
  `license_number` varchar(50) DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`driver_id`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `translogix_djangoproject_driver_chk_1` CHECK ((`driving_experience` >= 0)),
  CONSTRAINT `translogix_djangoproject_driver_chk_2` CHECK ((`year_of_birth` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_driver`
--

LOCK TABLES `translogix_djangoproject_driver` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_driver` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_driver` VALUES (1,'Україна','Гіг контракт',5,'test.driver@example.com','Микола','B','2020-01-01','МВС','Рафшанович','Kyiv, Khreshchatyk 1','Kyiv, Independence Square 5',1985,'Забудько','+380123456789','AB123456',1,'https://st.depositphotos.com/19430740/54936/i/1600/depositphotos_549361354-stock-photo-masculine-perfumery-bearded-man-in.jpg'),(3,'Україна','працівник',10,'test.driver2@example.com','Джамшут','D','1999-01-01','МВС','Арнольдович','Стрий, Ринок 7','Стрий, Львівська 11',1986,'Загубитько','+380673332222','AB1234AA',1,'https://st.depositphotos.com/19430740/54936/i/1600/depositphotos_549361354-stock-photo-masculine-perfumery-bearded-man-in.jpg'),(4,'Україна','ФОП',15,'mykola@gmail.com','Мойша','С,Д','1987-01-01','МВС','Петрович','Львів, Замарстинівська 15','Львів, Замарстинівська 15',1979,'Забухайко','+380671111111','АА11111',1,'https://bkit.com.ua/uploadfiles/admin/vo.jpg'),(6,'Україна','ФОП',20,'mychailo@gmail.com','Михайло','С,Д','1988-01-01','МВС','Михайлович','Львів, Сихівська 10','Львів, Сихівська 10',1988,'Роботящий','+380672222222','АА11111',1,'https://st.depositphotos.com/19430740/54936/i/1600/depositphotos_549361354-stock-photo-masculine-perfumery-bearded-man-in.jpg'),(7,'Україна','ФОП',20,'shumacher@gmail.com','Міхаель','С,Д','1999-01-29','МВС','Іванович','Львів, Персенківка 12','Стрийська 7',1988,'Шумахер','+380674444444','АА222222',1,'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/01/03/12/schumacher-afp.jpg?quality=75&width=1250&crop=3%3A2%2Csmart&auto=webp'),(8,'Україна','ФОП',20,'arnold@gmail.com','Арнольд','С,Д','1999-01-01','МВСУ','Артурович','Львів, Любінська 30','Львів, Любінська 30',1988,'Вумний','+380672333111','АА11111',1,'https://st.depositphotos.com/19430740/54936/i/1600/depositphotos_549361354-stock-photo-masculine-perfumery-bearded-man-in.jpg');
/*!40000 ALTER TABLE `translogix_djangoproject_driver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_drivervehicleassignment`
--

DROP TABLE IF EXISTS `translogix_djangoproject_drivervehicleassignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_drivervehicleassignment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `assignment_date` date NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `expiration_date` date DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `driver_id` int NOT NULL,
  `vehicle_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_driver_id_a5252636_fk_TransLogi` (`driver_id`),
  KEY `TransLogix_djangoPro_vehicle_id_2fa82be7_fk_TransLogi` (`vehicle_id`),
  CONSTRAINT `TransLogix_djangoPro_driver_id_a5252636_fk_TransLogi` FOREIGN KEY (`driver_id`) REFERENCES `translogix_djangoproject_driver` (`driver_id`),
  CONSTRAINT `TransLogix_djangoPro_vehicle_id_2fa82be7_fk_TransLogi` FOREIGN KEY (`vehicle_id`) REFERENCES `translogix_djangoproject_vehicle` (`vehicle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_drivervehicleassignment`
--

LOCK TABLES `translogix_djangoproject_drivervehicleassignment` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_drivervehicleassignment` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_drivervehicleassignment` VALUES (39,'2025-01-02','NPL-000001',NULL,0,4,1),(40,'2025-01-03','NPL-000000',NULL,0,1,2),(41,'2025-01-03','NPL-000000',NULL,0,3,1),(42,'2025-01-03','NPL-000000',NULL,0,3,3),(43,'2025-01-03','NPL-000000',NULL,0,4,2),(44,'2025-01-03','NPL-000000',NULL,0,4,1),(45,'2025-01-03','NPL-000000',NULL,0,4,3),(46,'2025-01-03','NPL-000000',NULL,0,4,1),(47,'2025-01-03','NPL-000000',NULL,0,4,1),(48,'2025-01-03','NPL-000000',NULL,0,4,5),(49,'2025-01-03','NPL-000000',NULL,0,7,1),(50,'2025-01-03','NPL-000000',NULL,1,7,4),(51,'2025-01-03','NPL-000000',NULL,0,3,2),(52,'2025-01-03','NPL-000000',NULL,0,3,3),(53,'2025-01-03','NPL-000000',NULL,0,4,3),(54,'2025-01-03','NPL-000000',NULL,1,6,1),(55,'2025-01-03','NPL-000000',NULL,0,4,4),(56,'2025-01-03','NPL-000000',NULL,1,1,1),(57,'2025-01-03','NPL-000000',NULL,1,1,2),(58,'2025-01-03','NPL-000000',NULL,0,3,2),(59,'2025-01-03','NPL-000000',NULL,0,4,1),(60,'2025-01-03','NPL-000000',NULL,1,4,3),(61,'2025-01-03','NPL-000000',NULL,1,6,5),(62,'2025-01-03','NPL-000000',NULL,1,4,1),(63,'2025-01-03','NPL-000000',NULL,0,3,7),(64,'2025-01-03','NPL-000000',NULL,0,3,3),(65,'2025-01-03','NPL-000000',NULL,0,3,1),(66,'2025-01-03','NPL-000000',NULL,0,3,1),(67,'2025-01-03','NPL-000000',NULL,0,3,5),(68,'2025-01-03','NPL-000000',NULL,0,3,2),(69,'2025-01-03','NPL-000000',NULL,1,3,1),(70,'2025-01-03','NPL-000000',NULL,1,8,2),(71,'2025-01-03','NPL-000000',NULL,1,1,3);
/*!40000 ALTER TABLE `translogix_djangoproject_drivervehicleassignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_feedback`
--

DROP TABLE IF EXISTS `translogix_djangoproject_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_feedback` (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `comments` longtext NOT NULL,
  `rating` int NOT NULL,
  `trip_id` int NOT NULL,
  `user_id` int NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `TransLogix_djangoPro_trip_id_246304eb_fk_TransLogi` (`trip_id`),
  KEY `TransLogix_djangoPro_user_id_7861eaec_fk_TransLogi` (`user_id`),
  CONSTRAINT `TransLogix_djangoPro_trip_id_246304eb_fk_TransLogi` FOREIGN KEY (`trip_id`) REFERENCES `translogix_djangoproject_trip` (`trip_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_feedback`
--

LOCK TABLES `translogix_djangoproject_feedback` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `translogix_djangoproject_feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_fuellog`
--

DROP TABLE IF EXISTS `translogix_djangoproject_fuellog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_fuellog` (
  `fuel_log_id` int NOT NULL AUTO_INCREMENT,
  `fuel_amount` double NOT NULL,
  `price` double NOT NULL,
  `date` date NOT NULL,
  `station_name` varchar(255) NOT NULL,
  `trip_id` int NOT NULL,
  PRIMARY KEY (`fuel_log_id`),
  KEY `TransLogix_djangoPro_trip_id_b5888fa9_fk_TransLogi` (`trip_id`),
  CONSTRAINT `TransLogix_djangoPro_trip_id_b5888fa9_fk_TransLogi` FOREIGN KEY (`trip_id`) REFERENCES `translogix_djangoproject_trip` (`trip_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_fuellog`
--

LOCK TABLES `translogix_djangoproject_fuellog` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_fuellog` DISABLE KEYS */;
/*!40000 ALTER TABLE `translogix_djangoproject_fuellog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_fueltype`
--

DROP TABLE IF EXISTS `translogix_djangoproject_fueltype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_fueltype` (
  `fuel_type_id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`fuel_type_id`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_fueltype`
--

LOCK TABLES `translogix_djangoproject_fueltype` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_fueltype` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_fueltype` VALUES (3,'Compressed Natural Gas (CNG)'),(1,'Diesel'),(2,'Electricity'),(4,'Liquefied Petroleum Gas (LPG)'),(6,'Petrol 92 (regular)'),(5,'Petrol 95 (regular)');
/*!40000 ALTER TABLE `translogix_djangoproject_fueltype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_group`
--

DROP TABLE IF EXISTS `translogix_djangoproject_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_group` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `comment` longtext,
  `created_by_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_created_by_id_eadd33b6_fk_TransLogi` (`created_by_id`),
  CONSTRAINT `TransLogix_djangoPro_created_by_id_eadd33b6_fk_TransLogi` FOREIGN KEY (`created_by_id`) REFERENCES `translogix_djangoproject_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_group`
--

LOCK TABLES `translogix_djangoproject_group` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `translogix_djangoproject_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_groupmembership`
--

DROP TABLE IF EXISTS `translogix_djangoproject_groupmembership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_groupmembership` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `object_id` int unsigned NOT NULL,
  `content_type_id` int NOT NULL,
  `group_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_content_type_id_2cc2c76f_fk_django_co` (`content_type_id`),
  KEY `TransLogix_djangoPro_group_id_e62f17cf_fk_TransLogi` (`group_id`),
  CONSTRAINT `TransLogix_djangoPro_content_type_id_2cc2c76f_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `TransLogix_djangoPro_group_id_e62f17cf_fk_TransLogi` FOREIGN KEY (`group_id`) REFERENCES `translogix_djangoproject_group` (`id`),
  CONSTRAINT `translogix_djangoproject_groupmembership_chk_1` CHECK ((`object_id` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_groupmembership`
--

LOCK TABLES `translogix_djangoproject_groupmembership` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_groupmembership` DISABLE KEYS */;
/*!40000 ALTER TABLE `translogix_djangoproject_groupmembership` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_house`
--

DROP TABLE IF EXISTS `translogix_djangoproject_house`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_house` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `house_number` varchar(20) NOT NULL,
  `street_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `TransLogix_djangoProject_street_id_house_number_8ea0df5e_uniq` (`street_id`,`house_number`),
  CONSTRAINT `TransLogix_djangoPro_street_id_74eed726_fk_TransLogi` FOREIGN KEY (`street_id`) REFERENCES `translogix_djangoproject_street` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_house`
--

LOCK TABLES `translogix_djangoproject_house` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_house` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_house` VALUES (1,'1',1),(2,'25',1),(3,'12',2),(4,'7',3),(5,'10',4),(6,'18',5),(7,'22',6),(8,'5',7),(9,'9',8),(10,'3',9),(11,'16',10),(12,'12',11),(13,'34',12),(14,'5',13),(15,'7',14),(16,'9',15),(17,'1',16),(18,'8',17),(19,'11',18),(20,'19',19),(21,'24',20),(22,'7',21),(23,'14',22),(24,'2',23),(25,'4',24),(26,'8',25),(27,'3',26),(28,'17',27),(29,'10',28),(30,'1',29),(31,'15',30),(32,'6',31),(33,'12',32),(34,'9',33),(35,'2',34),(36,'8',35),(37,'5',36),(38,'14',37),(39,'19',38),(40,'11',39),(41,'7',40),(42,'9',41),(43,'13',42),(44,'16',43),(45,'21',44),(46,'5',45),(47,'12',46),(48,'7',47),(49,'18',48),(50,'4',49),(51,'8',50),(118,'1460',113),(115,'22',113),(81,'25',113),(56,'52',113),(113,'22',114),(116,'33',114),(114,'22',115),(117,'33',115),(131,'44',115),(99,'15',116),(108,'2',118),(67,'10',120),(87,'12',120),(63,'18',120),(64,'20',120),(69,'28',120),(66,'30',120),(70,'31',120),(74,'50',120),(86,'12',124),(93,'22',124),(52,'1',125),(122,'10',125),(82,'18',125),(123,'22',125),(76,'25',125),(57,'10',126),(79,'25',126),(54,'7',126),(53,'15',127),(134,'12',128),(55,'22',128),(58,'30',128),(80,'25',130),(59,'30',130),(120,'4',130),(60,'15',131),(78,'25',131),(61,'40',131),(62,'15',132),(83,'18',132),(77,'25',132),(65,'10',133),(68,'17',133),(75,'50',133),(71,'31',134),(72,'34',134),(73,'50',134),(84,'18',135),(85,'25',136),(88,'2',137),(89,'2',138),(90,'20',139),(91,'20',140),(92,'20',141),(94,'11',142),(95,'2',143),(96,'22',144),(97,'10',145),(98,'10',146),(100,'22',147),(101,'1',148),(102,'50',149),(103,'152',150),(104,'44',151),(132,'2',152),(105,'20',152),(106,'10',153),(107,'25',153),(109,'10',154),(110,'25',154),(111,'18',155),(112,'15',156),(121,'2',156),(119,'4444',156),(124,'1',157),(125,'10',157),(126,'12',157),(127,'12',158),(128,'12',159),(129,'12',160),(130,'12',161),(133,'11',162),(135,'12',163);
/*!40000 ALTER TABLE `translogix_djangoproject_house` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_passenger`
--

DROP TABLE IF EXISTS `translogix_djangoproject_passenger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_passenger` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `is_selected` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=253 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_passenger`
--

LOCK TABLES `translogix_djangoproject_passenger` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_passenger` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_passenger` VALUES (1,'Олександр','Ковальчук','Логістика','+380671234001','oleksandr.kov1@example.com',1,0),(2,'Марія','Іваненко','Бухгалтерія','+380671234002','maria.ivan2@example.com',1,0),(3,'Іван','Петренко','Маркетинг','+380671234003','ivan.petr3@example.com',1,0),(4,'Олена','Сидоренко','Продажі','+380671234004','olena.sid4@example.com',1,0),(5,'Андрій','Бойко','Логістика','+380671234005','andriy.boyk5@example.com',1,0),(6,'Наталія','Шевченко','Фінанси','+380671234006','nataliya.shev6@example.com',1,0),(7,'Сергій','Мельник','HR','+380671234007','sergiy.mel7@example.com',1,0),(8,'Оксана','Гнатенко','IT','+380671234008','oksana.gnat8@example.com',1,0),(9,'Юрій','Василенко','Логістика','+380671234009','yuriy.vas9@example.com',1,0),(10,'Світлана','Кравчук','Бухгалтерія','+380671234010','svitlana.kra10@example.com',1,0),(11,'Дмитро','Гриценко','Маркетинг','+380671234011','dmytro.gri11@example.com',1,0),(12,'Ірина','Ткаченко','Продажі','+380671234012','iryna.tkac12@example.com',1,0),(13,'Віктор','Семенюк','Логістика','+380671234013','viktor.sem13@example.com',1,0),(14,'Катерина','Левченко','Фінанси','+380671234014','kateryna.lev14@example.com',1,0),(15,'Богдан','Мороз','HR','+380671234015','bogdan.mor15@example.com',1,0),(16,'Ольга','Зубенко','IT','+380671234016','olga.zub16@example.com',1,0),(17,'Максим','Лисенко','Логістика','+380671234017','maksym.lys17@example.com',1,0),(18,'Лідія','Гончаренко','Бухгалтерія','+380671234018','lidiya.gon18@example.com',1,0),(19,'Олег','Довженко','Маркетинг','+380671234019','oleg.dov19@example.com',1,0),(20,'Тетяна','Поліщук','Продажі','+380671234020','tetyana.pol20@example.com',1,0),(21,'Олег','Зеленський','IT','+380671234567','oleg.zelensky1@example.com',1,0),(22,'Дмитро','Коваль','HR','+380672345678','dmytro.koval2@example.com',1,0),(23,'Юрій','Ткачук','Logistics','+380673456789','yurii.tkachuk3@example.com',1,0),(24,'Андрій','Шевченко','Finance','+380674567890','andriy.shevchenko4@example.com',1,0),(25,'Олександр','Григоренко','Marketing','+380675678901','olexandr.grygorenko5@example.com',1,0),(26,'Микола','Сидоренко','Logistics','+380676789012','mykola.sydorenko6@example.com',1,0),(27,'Іван','Ткачук','IT','+380677890123','ivan.tkachuk7@example.com',1,0),(28,'Іван','Григоренко','Finance','+380672909567','ivan.hryhorenko28@example.com',1,0),(29,'Олег','Сидоренко','Logistics','+380672754422','oleg.sydorenko29@example.com',1,0),(30,'Ігор','Бойко','IT','+380679795262','ihor.boiko30@example.com',1,0),(31,'Олег','Коваль','Marketing','+380675704359','oleg.koval31@example.com',1,0),(32,'Іван','Коваль','Logistics','+380677457931','ivan.koval32@example.com',1,0),(33,'Іван','Мельник','HR','+380672903420','ivan.melnyk33@example.com',1,0),(34,'Дмитро','Григоренко','Marketing','+380672358942','dmytro.hryhorenko34@example.com',1,0),(35,'Юрій','Іванов','HR','+380675904244','yurii.ivanov35@example.com',1,0),(36,'Ігор','Бойко','Finance','+380677420900','ihor.boiko36@example.com',1,0),(37,'Олександр','Коваль','Logistics','+380675702406','oleksandr.koval37@example.com',1,0),(38,'Іван','Ткачук','HR','+380677057419','ivan.tkachuk38@example.com',1,0),(39,'Ігор','Сидоренко','Logistics','+380675569579','ihor.sydorenko39@example.com',1,0),(40,'Олег','Петренко','HR','+380679175768','oleg.petrenko40@example.com',1,0),(41,'Андрій','Ткачук','IT','+380676827408','andrii.tkachuk41@example.com',1,0),(42,'Олег','Ткачук','Logistics','+380673306936','oleg.tkachuk42@example.com',1,0),(43,'Олег','Бойко','Logistics','+380672324884','oleg.boiko43@example.com',1,0),(44,'Олег','Ткачук','Logistics','+380674045380','oleg.tkachuk44@example.com',1,0),(45,'Юрій','Сидоренко','Finance','+380677395543','yurii.sydorenko45@example.com',1,0),(46,'Сергій','Петренко','Finance','+380671038285','serhii.petrenko46@example.com',1,0),(47,'Сергій','Мельник','HR','+380671719845','serhii.melnyk47@example.com',1,0),(48,'Олег','Шевченко','IT','+380675898863','oleg.shevchenko48@example.com',1,0),(49,'Іван','Ткачук','IT','+380674288523','ivan.tkachuk49@example.com',1,0),(50,'Ігор','Мельник','Finance','+380671276095','ihor.melnyk50@example.com',1,0),(51,'Сергій','Іванов','IT','+380672759688','serhii.ivanov51@example.com',1,0),(52,'Іван','Шевченко','Finance','+380675839759','ivan.shevchenko52@example.com',1,0),(53,'Юрій','Петренко','Marketing','+380679631488','yurii.petrenko53@example.com',1,0),(54,'Андрій','Іванов','Logistics','+380679882171','andrii.ivanov54@example.com',1,0),(55,'Олександр','Коваль','Finance','+380675213562','oleksandr.koval55@example.com',1,0),(56,'Іван','Шевченко','HR','+380671418488','ivan.shevchenko56@example.com',1,0),(57,'Микола','Бойко','Marketing','+380676224113','mykola.boiko57@example.com',1,0),(58,'Юрій','Ткачук','HR','+380676538515','yurii.tkachuk58@example.com',1,0),(59,'Олег','Іванов','Marketing','+380674898965','oleg.ivanov59@example.com',1,0),(60,'Сергій','Петренко','Logistics','+380676973607','serhii.petrenko60@example.com',1,0),(61,'Іван','Григоренко','IT','+380673674708','ivan.hryhorenko61@example.com',1,0),(62,'Дмитро','Сидоренко','Logistics','+380673979826','dmytro.sydorenko62@example.com',1,0),(63,'Олег','Мельник','Marketing','+380675139671','oleg.melnyk63@example.com',1,0),(64,'Олександр','Ткачук','Finance','+380673879016','oleksandr.tkachuk64@example.com',1,0),(65,'Віктор','Коваль','Marketing','+380671709316','viktor.koval65@example.com',1,0),(66,'Юрій','Сидоренко','Finance','+380671925783','yurii.sydorenko66@example.com',1,0),(67,'Сергій','Іванов','IT','+380677389062','serhii.ivanov67@example.com',1,0),(68,'Олександр','Петренко','HR','+380677318249','oleksandr.petrenko68@example.com',1,0),(69,'Ігор','Мельник','Marketing','+380671076937','ihor.melnyk69@example.com',1,0),(70,'Микола','Ткачук','Marketing','+380673902116','mykola.tkachuk70@example.com',1,0),(71,'Іван','Іванов','Marketing','+380673826984','ivan.ivanov71@example.com',1,0),(72,'Олександр','Бойко','IT','+380677371086','oleksandr.boiko72@example.com',1,0),(73,'Іван','Сидоренко','Finance','+380675573369','ivan.sydorenko73@example.com',1,0),(74,'Олег','Коваль','Logistics','+380671528863','oleg.koval74@example.com',1,0),(75,'Олександр','Іванов','Finance','+380676183588','oleksandr.ivanov75@example.com',1,0),(76,'Віктор','Ткачук','HR','+380673837922','viktor.tkachuk76@example.com',1,0),(77,'Юрій','Мельник','HR','+380675496194','yurii.melnyk77@example.com',1,0),(78,'Микола','Шевченко','IT','+380676229721','mykola.shevchenko78@example.com',1,0),(79,'Андрій','Сидоренко','Marketing','+380674873265','andrii.sydorenko79@example.com',1,0),(80,'Сергій','Григоренко','Marketing','+380675835274','serhii.hryhorenko80@example.com',1,0),(81,'Іван','Петренко','HR','+380671861023','ivan.petrenko81@example.com',1,0),(82,'Віктор','Іванов','Marketing','+380673196537','viktor.ivanov82@example.com',1,0),(83,'Олег','Григоренко','Logistics','+380674017431','oleg.hryhorenko83@example.com',1,0),(84,'Юрій','Шевченко','Marketing','+380673195536','yurii.shevchenko84@example.com',1,0),(85,'Олександр','Іванов','HR','+380675976849','oleksandr.ivanov85@example.com',1,0),(86,'Сергій','Коваль','Logistics','+380673041952','serhii.koval86@example.com',1,0),(87,'Іван','Мельник','HR','+380676301472','ivan.melnyk87@example.com',1,0),(88,'Микола','Ткачук','Logistics','+380672319577','mykola.tkachuk88@example.com',1,0),(89,'Олександр','Коваль','Marketing','+380676192304','oleksandr.koval89@example.com',1,0),(90,'Віктор','Григоренко','Marketing','+380676903408','viktor.hryhorenko90@example.com',1,0),(91,'Юрій','Сидоренко','Finance','+380677408135','yurii.sydorenko91@example.com',1,0),(92,'Олег','Ткачук','Logistics','+380674713739','oleg.tkachuk92@example.com',1,0),(93,'Андрій','Коваль','Marketing','+380671948817','andrii.koval93@example.com',1,0),(94,'Сергій','Мельник','IT','+380676914586','serhii.melnyk94@example.com',1,0),(95,'Ігор','Григоренко','Logistics','+380673297469','ihor.hryhorenko95@example.com',1,0),(96,'Микола','Шевченко','IT','+380673678201','mykola.shevchenko96@example.com',1,0),(97,'Дмитро','Ткачук','Logistics','+380673086901','dmytro.tkachuk97@example.com',1,0),(98,'Олександр','Іванов','HR','+380676208804','oleksandr.ivanov98@example.com',1,0),(99,'Сергій','Коваль','Logistics','+380673548209','serhii.koval99@example.com',1,0),(100,'Іван','Бойко','Marketing','+380672839587','ivan.boiko100@example.com',1,0),(128,'Олег','Петренко','Finance','+380675364284','oleg.petrenko128@example.com',1,0),(129,'Віктор','Іванов','HR','+380675362759','viktor.ivanov129@example.com',1,0),(130,'Юрій','Ткачук','Marketing','+380673641509','yurii.tkachuk130@example.com',1,0),(131,'Олександр','Іванов','IT','+380671264105','oleksandr.ivanov131@example.com',1,0),(132,'Андрій','Мельник','Logistics','+380676736153','andrii.melnyk132@example.com',1,0),(133,'Іван','Коваль','Marketing','+380673742064','ivan.koval133@example.com',1,0),(134,'Микола','Шевченко','HR','+380672314526','mykola.shevchenko134@example.com',1,0),(135,'Сергій','Бойко','IT','+380675365874','serhii.boiko135@example.com',1,0),(136,'Олександр','Петренко','Marketing','+380673241509','oleksandr.petrenko136@example.com',1,0),(137,'Дмитро','Григоренко','HR','+380674123567','dmytro.hryhorenko137@example.com',1,0),(138,'Ігор','Сидоренко','IT','+380672847651','ihor.sydorenko138@example.com',1,0),(139,'Олег','Коваль','Logistics','+380671493857','oleg.koval139@example.com',1,0),(140,'Юрій','Іванов','Finance','+380671763945','yurii.ivanov140@example.com',1,0),(141,'Микола','Бойко','HR','+380674987236','mykola.boiko141@example.com',1,0),(142,'Сергій','Ткачук','Finance','+380675987234','serhii.tkachuk142@example.com',1,0),(143,'Іван','Григоренко','Marketing','+380675134876','ivan.hryhorenko143@example.com',1,0),(144,'Віктор','Шевченко','IT','+380673465123','viktor.shevchenko144@example.com',1,0),(145,'Олександр','Коваль','Logistics','+380674981256','oleksandr.koval145@example.com',1,0),(146,'Дмитро','Іванов','HR','+380675467821','dmytro.ivanov146@example.com',1,0),(147,'Юрій','Сидоренко','Marketing','+380675423894','yurii.sydorenko147@example.com',1,0),(148,'Микола','Мельник','Finance','+380673986237','mykola.melnyk148@example.com',1,0),(149,'Андрій','Ткачук','HR','+380675134786','andrii.tkachuk149@example.com',1,0),(150,'Сергій','Петренко','IT','+380675123894','serhii.petrenko150@example.com',1,0),(151,'Олександр','Григоренко','Marketing','+380672654218','oleksandr.hryhorenko151@example.com',1,0),(152,'Іван','Шевченко','Logistics','+380671234908','ivan.shevchenko152@example.com',1,0),(153,'Віктор','Мельник','Finance','+380673145621','viktor.melnyk153@example.com',1,0),(154,'Юрій','Бойко','HR','+380674534126','yurii.boiko154@example.com',1,0),(155,'Олександр','Сидоренко','Marketing','+380672865214','oleksandr.sydorenko155@example.com',1,0),(156,'Віктор','Іванов','HR','+380672071675','viktor.ivanov156@example.com',1,0),(157,'Дмитро','Коваль','Marketing','+380675517386','dmytro.koval157@example.com',1,0),(158,'Олександр','Ткачук','Finance','+380675867336','oleksandr.tkachuk158@example.com',1,0),(159,'Юрій','Шевченко','IT','+380677761317','yurii.shevchenko159@example.com',1,0),(160,'Дмитро','Ткачук','IT','+380673741981','dmytro.tkachuk160@example.com',1,0),(161,'Дмитро','Григоренко','Finance','+380671227639','dmytro.hryhorenko161@example.com',1,0),(162,'Дмитро','Шевченко','IT','+380673236749','dmytro.shevchenko162@example.com',1,0),(163,'Юрій','Шевченко','Finance','+380677771219','yurii.shevchenko163@example.com',1,0),(164,'Сергій','Мельник','Marketing','+380674870636','serhii.melnyk164@example.com',1,0),(165,'Юрій','Ткачук','HR','+380676350758','yurii.tkachuk165@example.com',1,0),(166,'Іван','Петренко','IT','+380672361725','ivan.petrenko166@example.com',1,0),(167,'Микола','Бойко','Finance','+380677082944','mykola.boiko167@example.com',1,0),(168,'Іван','Коваль','Logistics','+380671950681','ivan.koval168@example.com',1,0),(169,'Олег','Коваль','Logistics','+380671434859','oleg.koval169@example.com',1,0),(170,'Андрій','Петренко','Finance','+380673986106','andrii.petrenko170@example.com',1,0),(171,'Юрій','Коваль','HR','+380678237733','yurii.koval171@example.com',1,0),(172,'Олександр','Мельник','Logistics','+380676750763','oleksandr.melnyk172@example.com',1,0),(173,'Дмитро','Шевченко','Logistics','+380673814535','dmytro.shevchenko173@example.com',1,0),(174,'Ігор','Сидоренко','HR','+380675444274','ihor.sydorenko174@example.com',1,0),(175,'Микола','Іванов','HR','+380677496226','mykola.ivanov175@example.com',1,0),(176,'Дмитро','Петренко','HR','+380676348437','dmytro.petrenko176@example.com',1,0),(177,'Олександр','Бойко','Marketing','+380676052366','oleksandr.boiko177@example.com',1,0),(178,'Іван','Петренко','Транспортний','+380501234567','ivan.petrenko@example.com',1,0),(179,'Григорій','Непийпиво','IT','06763333333','pivopivo@gmail.com',1,0),(180,'Петро','Срака','Прибирання','+380671111111','sraka@sobaka.com',1,0),(181,'Степан','Дупа','Прибирання','+3806333333333','stepan@stepan.com',1,0),(182,'Степан','Дупа','Прибирання','+3806333333333','stepan@stepan.com',1,0),(183,'Степан','Дупа','Прибирання','+3806333333333','stepan@stepan.com',1,0),(184,'Микола','Підганяло','Управління','+380677777777','Pidganyalo@gmail.com',1,0),(185,'Микола','Підганяло','Управління','+380677777777','Pidganyalo@gmail.com',1,0),(186,'Микола','Підганяло','Управління','+380677777777','Pidganyalo@gmail.com',1,0),(187,'Джамшут','Бабаєвич','Управління','+380671111111','Pidganyalo@ukr.net',1,0),(188,'Джамшут','Бабаєвич','Управління','+380677777777','Pidganyalo@gmail.com',1,0),(189,'Галина','Пашко','Управління','+350505555555','pashko@gmail.com',1,0),(190,'Іван','Півлітренко','охорона','+380676666666','0505@gmail.com',1,0),(191,'Іван','Петренко','Логістика','+380501234567','ivan.petrenko@example.com',1,0),(192,'Іван','Петренко','Логістика','+380501234567','ivan.petrenko@example.com',1,0),(193,'Іван','Петренко','Логістика','+380676229721','ivan.petrenko@example.com',1,0),(194,'Рафік','Алібабаєвич','Самодіяльність','+380676229721','alibaba@example.com',1,0),(195,'Рафік','Коваленко','ІТ','+380671234567','rafik.kovalenko@example.com',1,0),(196,'Рафік','Шевченко','Бухгалтерія','+380671987654','iryna.shevchenko@example.com',1,0),(197,'Рафік','Петренко','Логістика','+380673456789','mariya.petrenko@example.com',1,0),(198,'Дмитро','Іванов','Маркетинг','+380671111111','dmytro.ivanov@example.com',1,0),(199,'Тест','Пасажир','Логістика','+380676229721','test.passenger@example.com',1,0),(200,'Тест','Пасажир','Логістика','+380676229721','test.passenger@example.com',1,0),(201,'Тест','Пасажир','Логістика','+380676229721','test.passenger@example.com',1,0),(202,'Тест','Пасажир','Логістика','+380676229721','test.passenger@example.com',1,0),(203,'Тест','Пасажир','Логістика','+380676229721','test.passenger@example.com',1,0),(204,'Тест','Пасажир','Логістика','+380676229721','test.passenger@example.com',1,0),(205,'Тест','Пасажир','Логістика','+380676229721','test.passenger@example.com',1,0),(206,'Рудік','Наливайко','Логістика','+380671111111','test.passenger@example.com',1,0),(209,'Акакій','Акакійович','Управління','+0503333333','akakiy@ukr.net',1,0),(210,'Іван','Непийпиво','Управління','+380502222222','beer@gmail.com',1,0),(224,'Рудік','Наливайко','Логістика','+380671111111','test.passenger@example.com',1,0),(225,'Рудік','Наливайко','Логістика','+380671111111','test.passenger@example.com',1,0),(226,'Рудік','Наливайко','Логістика','+380671111111','test.passenger@example.com',1,0),(227,'Рудік','Наливайко','Логістика','+380671111111','test.passenger@example.com',1,0),(228,'Рудік','Наливайко','Логістика','+380671111111','test.passenger@example.com',1,0),(240,'Аббас','Фінік','Управління','+380671111111','аштшсл1@gmail.com',1,0),(241,'Абукасим','Інжир','Управління','+380672222222','ingyr@gmail.com',1,0),(242,'Абдурахман','Хурма','Управління','+380673333333','hurma@gmail.com',1,0),(243,'Рулон','Обоєв','Управління','+380502222222','rulon@gmail.com',1,0),(244,'Банан','Ананасович','Управління','+380503333333','bananas@gmail.com',1,0),(245,'Аскольд','Гичка','Управління','380503332233','gychka@gmail.com',1,0),(246,'Абукасим','Абрекович','Випивка і танці','+0502222222','abreck@gmail.com',1,1),(247,'Ашот','Арутюнян','Випивка і танці','+380631111111','ashot@gmail.com',1,0),(248,'Ася','Апанасова','Випивка і танці','+380504444444','asya@gmail.com',1,0),(249,'Ашот','Акопян','Випивка і танці','+380999999999','ashot@gmail.com',0,0),(250,'Арон','Абрикос','Випивка і танці','+05022222222','abrycos@ukr.net',1,0),(251,'Алібаба','Алібаєвич','Випивки і крадіжок','+3805022222222','alibaba@gmail.com',1,0),(252,'Арнольд','Арменович','Управління','+380501201111','arny@gmail.com',1,0);
/*!40000 ALTER TABLE `translogix_djangoproject_passenger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_passenger_dropoff_addresses`
--

DROP TABLE IF EXISTS `translogix_djangoproject_passenger_dropoff_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_passenger_dropoff_addresses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `passenger_id` bigint NOT NULL,
  `coordinatepoint_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `TransLogix_djangoProject_passenger_id_coordinatep_06de781e_uniq` (`passenger_id`,`coordinatepoint_id`),
  KEY `TransLogix_djangoPro_coordinatepoint_id_d300f3fd_fk_TransLogi` (`coordinatepoint_id`),
  CONSTRAINT `TransLogix_djangoPro_coordinatepoint_id_d300f3fd_fk_TransLogi` FOREIGN KEY (`coordinatepoint_id`) REFERENCES `translogix_djangoproject_coordinatepoint` (`id`),
  CONSTRAINT `TransLogix_djangoPro_passenger_id_d79b8cbd_fk_TransLogi` FOREIGN KEY (`passenger_id`) REFERENCES `translogix_djangoproject_passenger` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_passenger_dropoff_addresses`
--

LOCK TABLES `translogix_djangoproject_passenger_dropoff_addresses` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_passenger_dropoff_addresses` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_passenger_dropoff_addresses` VALUES (1,178,156),(2,179,159),(3,180,162),(4,181,165),(5,182,168),(6,183,171),(7,184,174),(8,185,177),(9,186,180),(10,187,183),(11,188,186),(12,189,189),(13,190,192),(14,193,216),(15,194,219),(51,194,385),(16,195,222),(17,196,225),(18,197,228),(20,205,247),(19,205,248),(21,206,253),(22,206,255),(49,209,373),(23,224,253),(24,224,255),(25,225,253),(26,225,255),(27,226,253),(28,226,255),(29,227,253),(30,227,255),(31,228,253),(32,228,255),(33,244,324),(34,245,327),(35,245,330),(36,245,333),(37,245,336),(38,245,339),(50,246,377),(52,247,387),(39,248,342),(40,248,345),(41,248,348),(42,248,351),(43,248,354),(44,248,357),(45,248,360),(46,249,363),(47,250,366),(48,250,370);
/*!40000 ALTER TABLE `translogix_djangoproject_passenger_dropoff_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_passenger_pickup_addresses`
--

DROP TABLE IF EXISTS `translogix_djangoproject_passenger_pickup_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_passenger_pickup_addresses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `passenger_id` bigint NOT NULL,
  `coordinatepoint_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `TransLogix_djangoProject_passenger_id_coordinatep_93a278f3_uniq` (`passenger_id`,`coordinatepoint_id`),
  KEY `TransLogix_djangoPro_coordinatepoint_id_e06de8b4_fk_TransLogi` (`coordinatepoint_id`),
  CONSTRAINT `TransLogix_djangoPro_coordinatepoint_id_e06de8b4_fk_TransLogi` FOREIGN KEY (`coordinatepoint_id`) REFERENCES `translogix_djangoproject_coordinatepoint` (`id`),
  CONSTRAINT `TransLogix_djangoPro_passenger_id_fdc8cd19_fk_TransLogi` FOREIGN KEY (`passenger_id`) REFERENCES `translogix_djangoproject_passenger` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_passenger_pickup_addresses`
--

LOCK TABLES `translogix_djangoproject_passenger_pickup_addresses` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_passenger_pickup_addresses` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_passenger_pickup_addresses` VALUES (1,178,155),(2,179,158),(3,180,161),(4,181,164),(5,182,167),(6,183,170),(7,184,173),(8,185,176),(9,186,179),(10,187,182),(11,188,185),(12,189,188),(13,190,191),(14,193,215),(15,194,218),(54,194,380),(55,194,381),(56,194,382),(57,194,383),(58,194,384),(16,195,221),(17,196,224),(18,197,227),(19,205,245),(20,205,246),(21,206,251),(22,206,252),(50,209,372),(62,209,391),(23,224,251),(24,224,252),(25,225,251),(26,225,252),(27,226,251),(28,226,252),(29,227,251),(30,227,252),(31,228,251),(32,228,252),(33,244,323),(34,245,326),(35,245,329),(36,245,332),(37,245,335),(38,245,338),(51,246,375),(52,246,376),(53,246,379),(59,247,386),(39,248,341),(40,248,344),(41,248,347),(42,248,350),(43,248,353),(44,248,356),(45,248,359),(46,249,362),(47,250,365),(48,250,368),(49,250,369),(60,251,389),(61,252,390);
/*!40000 ALTER TABLE `translogix_djangoproject_passenger_pickup_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_passenger_work_addresses`
--

DROP TABLE IF EXISTS `translogix_djangoproject_passenger_work_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_passenger_work_addresses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `passenger_id` bigint NOT NULL,
  `coordinatepoint_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `TransLogix_djangoProject_passenger_id_coordinatep_621a126e_uniq` (`passenger_id`,`coordinatepoint_id`),
  KEY `TransLogix_djangoPro_coordinatepoint_id_d4852eea_fk_TransLogi` (`coordinatepoint_id`),
  CONSTRAINT `TransLogix_djangoPro_coordinatepoint_id_d4852eea_fk_TransLogi` FOREIGN KEY (`coordinatepoint_id`) REFERENCES `translogix_djangoproject_coordinatepoint` (`id`),
  CONSTRAINT `TransLogix_djangoPro_passenger_id_eba4f9ed_fk_TransLogi` FOREIGN KEY (`passenger_id`) REFERENCES `translogix_djangoproject_passenger` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_passenger_work_addresses`
--

LOCK TABLES `translogix_djangoproject_passenger_work_addresses` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_passenger_work_addresses` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_passenger_work_addresses` VALUES (1,178,157),(2,179,160),(3,180,163),(4,181,166),(5,182,169),(6,183,172),(7,184,175),(8,185,178),(9,186,181),(10,187,184),(11,188,187),(12,189,190),(13,190,193),(14,193,217),(15,194,220),(16,195,223),(17,196,226),(18,197,229),(19,205,249),(20,206,256),(42,209,374),(21,224,256),(22,225,256),(23,226,256),(24,227,256),(25,228,256),(26,244,325),(27,245,328),(28,245,331),(29,245,334),(30,245,337),(31,245,340),(43,246,378),(44,247,388),(32,248,343),(33,248,346),(34,248,349),(35,248,352),(36,248,355),(37,248,358),(38,248,361),(39,249,364),(40,250,367),(41,250,371);
/*!40000 ALTER TABLE `translogix_djangoproject_passenger_work_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_passengerroute`
--

DROP TABLE IF EXISTS `translogix_djangoproject_passengerroute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_passengerroute` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `dropoff_point_id` bigint DEFAULT NULL,
  `passenger_id` bigint NOT NULL,
  `pickup_point_id` bigint DEFAULT NULL,
  `route_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_dropoff_point_id_d62e6c99_fk_TransLogi` (`dropoff_point_id`),
  KEY `TransLogix_djangoPro_passenger_id_6a11c890_fk_TransLogi` (`passenger_id`),
  KEY `TransLogix_djangoPro_pickup_point_id_4f74af11_fk_TransLogi` (`pickup_point_id`),
  KEY `TransLogix_djangoPro_route_id_f12c13f0_fk_TransLogi` (`route_id`),
  CONSTRAINT `TransLogix_djangoPro_dropoff_point_id_d62e6c99_fk_TransLogi` FOREIGN KEY (`dropoff_point_id`) REFERENCES `translogix_djangoproject_coordinatepoint` (`id`),
  CONSTRAINT `TransLogix_djangoPro_passenger_id_6a11c890_fk_TransLogi` FOREIGN KEY (`passenger_id`) REFERENCES `translogix_djangoproject_passenger` (`id`),
  CONSTRAINT `TransLogix_djangoPro_pickup_point_id_4f74af11_fk_TransLogi` FOREIGN KEY (`pickup_point_id`) REFERENCES `translogix_djangoproject_coordinatepoint` (`id`),
  CONSTRAINT `TransLogix_djangoPro_route_id_f12c13f0_fk_TransLogi` FOREIGN KEY (`route_id`) REFERENCES `translogix_djangoproject_route` (`route_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_passengerroute`
--

LOCK TABLES `translogix_djangoproject_passengerroute` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_passengerroute` DISABLE KEYS */;
/*!40000 ALTER TABLE `translogix_djangoproject_passengerroute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_region`
--

DROP TABLE IF EXISTS `translogix_djangoproject_region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_region` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `country_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_country_id_50f7f2f2_fk_TransLogi` (`country_id`),
  CONSTRAINT `TransLogix_djangoPro_country_id_50f7f2f2_fk_TransLogi` FOREIGN KEY (`country_id`) REFERENCES `translogix_djangoproject_country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_region`
--

LOCK TABLES `translogix_djangoproject_region` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_region` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_region` VALUES (1,'Львівська',1),(2,'Волинська область',1),(3,'Дніпропетровська область',1),(4,'Донецька область',1),(5,'Житомирська область',1),(6,'Закарпатська область',1),(7,'Запорізька область',1),(8,'Івано-Франківська область',1),(9,'Київська область',1),(10,'Кіровоградська область',1),(11,'Луганська область',1),(12,'Львівська область',1),(13,'Миколаївська область',1),(14,'Одеська область',1),(15,'Полтавська область',1),(16,'Рівненська область',1),(17,'Сумська область',1),(18,'Тернопільська область',1),(19,'Харківська область',1),(20,'Херсонська область',1),(21,'Хмельницька область',1),(22,'Черкаська область',1),(23,'Чернівецька область',1),(24,'Чернігівська область',1),(25,'місто Київ',1),(26,'місто Севастополь',1),(27,'Вінницька область',1),(28,'',1),(29,'shit',1),(30,'shit',1),(31,'region not found',1),(32,'region not found',1),(33,'1',1),(34,'2',1),(35,'3',1),(36,'4',1),(37,'1',6),(38,'3',6),(39,'4',6);
/*!40000 ALTER TABLE `translogix_djangoproject_region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_route`
--

DROP TABLE IF EXISTS `translogix_djangoproject_route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_route` (
  `route_id` int NOT NULL AUTO_INCREMENT,
  `distance` decimal(6,2) DEFAULT NULL,
  `estimated_time` int DEFAULT NULL,
  `date` datetime(6) NOT NULL,
  `destination_id` bigint DEFAULT NULL,
  `origin_id` bigint DEFAULT NULL,
  `start_point_id` bigint DEFAULT NULL,
  `end_point_id` bigint DEFAULT NULL,
  `route_number` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`route_id`),
  UNIQUE KEY `TransLogix_djangoProject_origin_id_destination_id_5d84134a_uniq` (`origin_id`,`destination_id`,`date`),
  UNIQUE KEY `route_number` (`route_number`),
  KEY `TransLogix_djangoPro_destination_id_82d744c5_fk_TransLogi` (`destination_id`),
  KEY `TransLogix_djangoPro_start_point_id_0d4f287c_fk_TransLogi` (`start_point_id`),
  KEY `TransLogix_djangoPro_end_point_id_c2e59549_fk_TransLogi` (`end_point_id`),
  CONSTRAINT `TransLogix_djangoPro_destination_id_82d744c5_fk_TransLogi` FOREIGN KEY (`destination_id`) REFERENCES `translogix_djangoproject_city` (`id`),
  CONSTRAINT `TransLogix_djangoPro_end_point_id_c2e59549_fk_TransLogi` FOREIGN KEY (`end_point_id`) REFERENCES `translogix_djangoproject_coordinatepoint` (`id`),
  CONSTRAINT `TransLogix_djangoPro_origin_id_e661cebc_fk_TransLogi` FOREIGN KEY (`origin_id`) REFERENCES `translogix_djangoproject_city` (`id`),
  CONSTRAINT `TransLogix_djangoPro_start_point_id_0d4f287c_fk_TransLogi` FOREIGN KEY (`start_point_id`) REFERENCES `translogix_djangoproject_coordinatepoint` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=263 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_route`
--

LOCK TABLES `translogix_djangoproject_route` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_route` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_route` VALUES (174,70.00,90,'2024-12-15 00:00:00.000000',2,1,78,79,'NPL-10-13-24-174'),(175,65.00,80,'2024-12-15 00:00:00.000000',3,1,80,81,'NPL-10-13-24-175'),(176,50.00,60,'2024-12-15 00:00:00.000000',4,1,82,83,'NPL-10-13-24-176'),(177,80.00,100,'2024-12-14 00:00:00.000000',5,1,84,85,'NPL-10-13-24-177'),(178,90.00,120,'2024-11-29 00:00:00.000000',6,1,86,87,'NPL-10-13-24-178'),(179,75.00,95,'2024-11-27 00:00:00.000000',7,1,88,89,'NPL-10-13-24-179'),(180,60.00,75,'2024-12-19 00:00:00.000000',8,1,90,91,'NPL-10-13-24-180'),(181,85.00,105,'2024-12-19 00:00:00.000000',9,1,92,93,'NPL-10-13-24-181'),(182,55.00,70,'2024-12-19 00:00:00.000000',10,1,94,95,'NPL-10-13-24-182'),(183,45.00,55,'2024-11-26 00:00:00.000000',11,1,96,97,'NPL-10-13-24-183'),(184,70.00,90,'2024-11-28 00:00:00.000000',12,1,98,99,'NPL-10-13-24-184'),(185,65.00,80,'2024-11-29 00:00:00.000000',13,1,100,101,'NPL-10-13-24-185'),(186,50.00,60,'2024-11-29 00:00:00.000000',14,1,102,103,'NPL-10-13-24-186'),(187,80.00,100,'2024-11-26 00:00:00.000000',15,1,104,105,'NPL-10-13-24-187'),(188,90.00,120,'2024-11-29 00:00:00.000000',16,1,106,107,'NPL-10-13-24-188'),(189,75.00,95,'2024-11-09 00:00:00.000000',17,1,108,109,'NPL-10-13-24-189'),(190,60.00,75,'2024-11-29 00:00:00.000000',18,1,110,111,'NPL-10-13-24-190'),(191,85.00,105,'2024-11-26 00:00:00.000000',19,1,112,113,'NPL-10-13-24-191'),(192,55.00,70,'2024-11-26 00:00:00.000000',20,1,114,115,'NPL-10-13-24-192'),(193,45.00,55,'2024-11-29 00:00:00.000000',21,1,116,117,'NPL-10-13-24-193'),(194,70.00,90,'2024-11-30 00:00:00.000000',22,1,118,119,'NPL-10-13-24-194'),(195,65.00,80,'2024-11-27 00:00:00.000000',23,1,120,121,'NPL-10-13-24-195'),(196,50.00,60,'2024-11-26 00:00:00.000000',24,1,122,123,'NPL-10-13-24-196'),(197,80.00,100,'2024-11-08 00:00:00.000000',25,1,124,125,'NPL-10-13-24-197'),(198,90.00,120,'2024-11-29 00:00:00.000000',25,1,126,127,'NPL-10-13-24-198'),(199,70.00,90,'2024-11-30 00:00:00.000000',1,2,128,129,'NPL-10-13-24-199'),(200,65.00,80,'2024-11-30 00:00:00.000000',1,3,130,131,'NPL-10-13-24-200'),(201,50.00,60,'2024-12-29 00:00:00.000000',1,4,132,133,'NPL-10-13-24-201'),(202,80.00,100,'2024-12-28 00:00:00.000000',1,5,134,135,'NPL-10-13-24-202'),(203,90.00,120,'2024-12-13 00:00:00.000000',1,6,136,137,'NPL-10-13-24-203'),(204,75.00,95,'2024-12-11 00:00:00.000000',1,7,138,139,'NPL-10-13-24-204'),(205,60.00,75,'2024-12-10 00:00:00.000000',1,8,140,141,'NPL-10-13-24-205'),(206,85.00,105,'2024-12-09 00:00:00.000000',1,9,142,143,'NPL-10-13-24-206'),(207,55.00,70,'2024-12-08 00:00:00.000000',1,10,144,145,'NPL-10-13-24-207'),(208,45.00,55,'2024-12-12 00:00:00.000000',1,11,146,147,'NPL-10-13-24-208'),(209,70.00,90,'2024-12-07 00:00:00.000000',1,12,148,149,'NPL-10-13-24-209'),(210,65.00,80,'2024-12-09 00:00:00.000000',1,13,150,151,'NPL-10-13-24-210'),(211,50.00,60,'2024-12-11 00:00:00.000000',1,14,152,153,'NPL-10-13-24-211'),(212,80.00,100,'2024-12-10 00:00:00.000000',1,15,154,105,'NPL-10-13-24-212'),(238,75.00,100,'2024-12-12 00:00:00.000000',1,2,128,129,'NPL-10-13-24-238'),(239,80.00,110,'2024-12-11 00:00:00.000000',1,3,130,131,'NPL-10-13-24-239'),(240,60.00,90,'2024-12-10 00:00:00.000000',1,4,132,133,'NPL-10-13-24-240'),(241,85.00,115,'2024-12-09 00:00:00.000000',1,5,134,135,'NPL-10-13-24-241'),(242,90.00,120,'2024-12-08 00:00:00.000000',1,6,136,137,'NPL-10-13-24-242'),(243,65.00,85,'2024-12-07 00:00:00.000000',1,7,138,139,'NPL-10-13-24-243'),(244,70.00,95,'2024-12-06 00:00:00.000000',1,8,140,141,'NPL-10-13-24-244'),(245,55.00,75,'2024-10-05 00:00:00.000000',1,9,142,143,'NPL-10-13-24-245'),(246,80.00,100,'2024-12-04 00:00:00.000000',1,10,144,145,'NPL-10-13-24-246'),(247,90.00,125,'2024-11-03 00:00:00.000000',1,11,146,147,'NPL-10-13-24-247'),(248,85.00,110,'2024-10-02 00:00:00.000000',1,12,148,149,'NPL-10-13-24-248'),(249,65.00,85,'2024-10-01 00:00:00.000000',1,13,150,151,'NPL-10-13-24-249'),(250,75.00,95,'2024-12-30 00:00:00.000000',1,14,152,153,'NPL-10-13-24-250'),(251,70.00,90,'2024-12-29 00:00:00.000000',1,15,154,105,'NPL-10-13-24-251'),(252,60.00,80,'2024-12-28 00:00:00.000000',1,16,154,106,'NPL-10-13-24-252'),(253,55.00,75,'2024-12-27 00:00:00.000000',1,17,154,107,'NPL-10-13-24-253'),(254,65.00,85,'2024-12-26 00:00:00.000000',1,18,154,108,'NPL-10-13-24-254'),(255,70.00,100,'2024-12-25 00:00:00.000000',1,19,154,109,'NPL-10-13-24-255'),(256,75.00,95,'2024-11-24 00:00:00.000000',1,20,154,110,'NPL-10-13-24-256'),(257,80.00,110,'2024-11-23 00:00:00.000000',1,21,154,111,'NPL-10-13-24-257'),(258,85.00,120,'2024-11-27 00:00:00.000000',1,22,154,112,'NPL-10-13-24-258'),(259,60.00,90,'2024-11-30 00:00:00.000000',1,23,154,113,'NPL-10-13-24-259'),(260,55.00,80,'2024-11-30 00:00:00.000000',1,24,154,114,'NPL-10-13-24-260'),(261,70.00,95,'2024-11-30 00:00:00.000000',1,25,154,115,'NPL-10-13-24-261'),(262,80.00,105,'2024-11-30 00:00:00.000000',1,22,154,116,'NPL-10-13-24-262');
/*!40000 ALTER TABLE `translogix_djangoproject_route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_street`
--

DROP TABLE IF EXISTS `translogix_djangoproject_street`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_street` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `city_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_city_id_4f39b650_fk_TransLogi` (`city_id`),
  CONSTRAINT `TransLogix_djangoPro_city_id_4f39b650_fk_TransLogi` FOREIGN KEY (`city_id`) REFERENCES `translogix_djangoproject_city` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=164 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_street`
--

LOCK TABLES `translogix_djangoproject_street` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_street` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_street` VALUES (1,'Проспект Свободи',1),(2,'Вулиця Шевченка',1),(3,'Вулиця Івана Франка',1),(4,'Вулиця Тараса Шевченка',2),(5,'Вулиця Пилипа Орлика',2),(6,'Вулиця Сагайдачного',3),(7,'Вулиця Лесі Українки',3),(8,'Вулиця Степана Бандери',4),(9,'Вулиця Мазепи',4),(10,'Вулиця Богдана Хмельницького',5),(11,'Проспект Свободи',1),(12,'Вулиця Шевченка',1),(13,'Вулиця Івана Франка',1),(14,'Вулиця Тараса Шевченка',2),(15,'Вулиця Пилипа Орлика',2),(16,'Вулиця Сагайдачного',3),(17,'Вулиця Лесі Українки',3),(18,'Вулиця Степана Бандери',4),(19,'Вулиця Мазепи',4),(20,'Вулиця Богдана Хмельницького',5),(21,'Вулиця Кульпарківська',1),(22,'Вулиця Городоцька',1),(23,'Вулиця Бандери',1),(24,'Вулиця Липова Алея',1),(25,'Вулиця Зелена',1),(26,'Вулиця Січових Стрільців',1),(27,'Вулиця Князя Романа',1),(28,'Вулиця Пекарська',1),(29,'Вулиця Наукова',1),(30,'Вулиця Личаківська',1),(31,'Вулиця Володимира Великого',1),(32,'Вулиця Дорошенка',1),(33,'Вулиця Грушевського',1),(34,'Вулиця Грабовського',1),(35,'Вулиця Вірменська',1),(36,'Вулиця Краківська',1),(37,'Вулиця Михайла Вербицького',1),(38,'Вулиця Тролейбусна',1),(39,'Вулиця Джерельна',1),(40,'Вулиця Залізнична',1),(41,'Вулиця Червоної Калини',1),(42,'Вулиця Шевченка',3),(43,'Вулиця Лесі Українки',3),(44,'Вулиця Хмельницького',3),(45,'Вулиця Тиха',3),(46,'Вулиця Сонячна',3),(47,'Вулиця Паркова',3),(48,'Вулиця Зоряна',3),(49,'Вулиця Рудницького',3),(50,'Вулиця Грушевського',3),(51,'Вулиця Лермонтова',3),(52,'Вулиця Соборна',4),(53,'Вулиця Вишнева',4),(54,'Вулиця Київська',4),(55,'Вулиця Поштова',4),(56,'Вулиця Шкільна',5),(57,'Вулиця Центральна',5),(58,'Вулиця Садова',5),(59,'Вулиця Богдана Хмельницького',5),(60,'Вулиця Молодіжна',5),(61,'Шевченка',26),(62,'Зелена',26),(63,'Наукова',26),(64,'Шевченка',26),(65,'Зелена',26),(66,'Наукова',26),(67,'Шевченка',27),(68,'Грушевського',28),(69,'Східна',26),(70,'Бандери',29),(71,'Лесі Українки',30),(72,'Івана Франка',31),(73,'Шевченка',32),(74,'Івана Франка',27),(75,'Героїв Майдану',28),(76,'Грушевського',31),(77,'Хімічна',26),(78,'Бандери',28),(79,'Лесі Українки',33),(80,'Крушельницької',34),(81,'вулиця Олександра Довженка',35),(82,'вулиця Патона',35),(83,'вулиця Східна',35),(84,'східна',35),(85,'вулиця Івана Виговського',35),(86,'вулиця Щурата',35),(87,'',36),(88,'вулиця Олександра Довженка',37),(89,'',38),(90,'вулиця Олександра Довженка',39),(91,'',40),(92,'вулиця Стрийська',41),(93,'',42),(94,'Довженко',41),(95,'вулиця Патона',41),(96,'Main Street',43),(97,'Second Street',44),(98,'Office Road',45),(99,'Main Street',46),(100,'Second Street',47),(101,'Office Road',48),(102,'Main Street',49),(103,'Second Street',50),(104,'Office Road',51),(105,'Лесі Українки',52),(106,'Second Street',53),(107,'Office Road',54),(108,'вулиця Симона Петлюри',52),(109,'Львівська',55),(110,'Львівська',2),(111,'вулиця І.Франка',7),(112,'Шевченка',7),(113,'Східна',1),(114,'Львівська',9),(115,'Франка',9),(116,'вулиця Луганська',1),(117,'вулиця Антонича',1),(118,'вулиця Хімічна',1),(119,'вулиця Галицька',1),(120,'вулиця Любінська',1),(121,'вулиця Топольна',1),(122,'вулиця Міклухо-Маклая',1),(123,'вулиця Стрийська',1),(124,'Лесі Українки ',2),(125,'Незалежності',16),(126,'Лесі Укранки',16),(127,'вулиця Сихівська',1),(128,'вулиця Олександра Довженка',1),(129,'Східна ',1),(130,'вулиця Монастирського',1),(131,'вулиця Львівська',5),(132,'Шевченка',4),(133,'Шевченка',56),(134,'вулиця Львівська',17),(135,'вулиця Львівська',9),(136,'Дрогобицька',16),(137,'Нехалежності',5),(138,'Незажежності',5),(139,'Шевченка',1),(140,'Зелена',1),(141,'Наукова',1),(142,'Незалежності',4),(143,'Незалежності',5),(144,'вулиця Незалежності',16),(145,'вулиця Гуцульська',1),(146,'вулиця Сяйво',1),(147,'Незалежності',15),(148,'площа Ринок',2),(149,'Стрийська',1),(150,'Городоцька',1),(151,'Хмельницького ',1),(152,'Шевченка',5),(153,'Львівська',57),(154,'Львівська',56),(155,'Лесі Українки',4),(156,'вулиця Зубрівська',1),(157,'Шевченко',22),(158,'лЬВІВСЬКА',22),(159,'Шевченка',22),(160,'Леніна',22),(161,'Сталіна',22),(162,'Болехівська ',5),(163,'Вуйківська',22);
/*!40000 ALTER TABLE `translogix_djangoproject_street` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_trip`
--

DROP TABLE IF EXISTS `translogix_djangoproject_trip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_trip` (
  `trip_id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `status` varchar(20) NOT NULL,
  `driver_id` int NOT NULL,
  `route_id` int NOT NULL,
  `vehicle_id` int NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  PRIMARY KEY (`trip_id`),
  KEY `TransLogix_djangoPro_driver_id_80325883_fk_TransLogi` (`driver_id`),
  KEY `TransLogix_djangoPro_route_id_c693a0a5_fk_TransLogi` (`route_id`),
  KEY `TransLogix_djangoPro_vehicle_id_9ee9bbcc_fk_TransLogi` (`vehicle_id`),
  CONSTRAINT `TransLogix_djangoPro_route_id_c693a0a5_fk_TransLogi` FOREIGN KEY (`route_id`) REFERENCES `translogix_djangoproject_route` (`route_id`),
  CONSTRAINT `TransLogix_djangoPro_vehicle_id_9ee9bbcc_fk_TransLogi` FOREIGN KEY (`vehicle_id`) REFERENCES `translogix_djangoproject_vehicle` (`vehicle_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_trip`
--

LOCK TABLES `translogix_djangoproject_trip` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_trip` DISABLE KEYS */;
/*!40000 ALTER TABLE `translogix_djangoproject_trip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_user`
--

DROP TABLE IF EXISTS `translogix_djangoproject_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(254) NOT NULL,
  `role` varchar(255) DEFAULT 'guest',
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `is_blocked` tinyint(1) NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `is_superuser` tinyint(1) DEFAULT '0',
  `is_logistic_operator` tinyint(1) DEFAULT '0',
  `is_financial_manager` tinyint(1) DEFAULT '0',
  `is_admin` tinyint(1) DEFAULT '0',
  `first_name` varchar(150) DEFAULT '',
  `last_name` varchar(150) DEFAULT '',
  `is_staff` tinyint(1) DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `date_joined` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_user`
--

LOCK TABLES `translogix_djangoproject_user` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_user` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_user` VALUES (1,'westukr1','pbkdf2_sha256$870000$KMcbRbAxFNyoU170qxQCMz$SPPEA2zb8XHUdLNCeD99HCV+AEdoJxNPV06viReCi8s=','westukr1@gmail.com','guest','2024-10-11 17:08:51.143784','2024-12-12 11:39:17.000115',0,'2024-10-11 17:15:56',1,1,1,1,'','',1,1,'2024-10-11 17:08:51'),(2,'user','pbkdf2_sha256$870000$trHjzWXNy55jAbtSf7v7KX$sEkhn8hSJTvAgEF61v0F2Qg6UfVVd2/sr7qaEBI4zs4=','','guest','2024-10-11 17:16:57.215291','2024-12-12 11:39:17.016120',0,'2024-12-18 19:04:05',1,1,0,1,'','',1,1,'2024-10-11 17:16:57'),(4,'Operator','pbkdf2_sha256$870000$q0OiEm1AVUvXW9UyNelf1f$6DB1q6oR8rV7lXddkMfV+BUj693LNtFcEiQIsvkd4sg=','email@email.com','guest','2024-10-11 17:40:46.998662','2024-12-12 11:39:17.024135',0,NULL,0,1,0,1,'','',1,1,'2024-10-11 17:40:47'),(5,'testuser','pbkdf2_sha256$870000$2CBWHjGVwfCCcLtYpRJwsR$FCFo8LgydxTPBmDowKXsDI3byIgKQOx+4ZiuR1EweUQ=','testuser@example.com','guest','2024-10-11 17:40:53.623323','2024-12-12 11:39:17.031118',0,NULL,0,0,1,0,'','',1,1,'2024-10-11 17:40:54'),(6,'testuser2','pbkdf2_sha256$870000$KbtLlnszuDO5zHWHoMEWsC$MkR/399cI6HdPafkamahFx/LeXNelJ1VYlJBnh8EQ6c=','testuse2r2@example.com','guest','2024-12-12 10:24:07.036123','2024-12-12 11:39:17.036117',0,NULL,0,0,0,0,'','',0,1,'2024-12-12 10:24:07');
/*!40000 ALTER TABLE `translogix_djangoproject_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_user_groups`
--

DROP TABLE IF EXISTS `translogix_djangoproject_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `translogix_djangoproject_user_groups_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `translogix_djangoproject_user` (`id`),
  CONSTRAINT `translogix_djangoproject_user_groups_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_user_groups`
--

LOCK TABLES `translogix_djangoproject_user_groups` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `translogix_djangoproject_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_user_user_permissions`
--

DROP TABLE IF EXISTS `translogix_djangoproject_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `permission_id` (`permission_id`),
  CONSTRAINT `translogix_djangoproject_user_user_permissions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `translogix_djangoproject_user` (`id`),
  CONSTRAINT `translogix_djangoproject_user_user_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_user_user_permissions`
--

LOCK TABLES `translogix_djangoproject_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `translogix_djangoproject_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_vehicle`
--

DROP TABLE IF EXISTS `translogix_djangoproject_vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_vehicle` (
  `vehicle_id` int NOT NULL AUTO_INCREMENT,
  `license_plate` varchar(20) NOT NULL,
  `model` varchar(100) NOT NULL,
  `capacity` int NOT NULL,
  `fuel_type_id` int DEFAULT NULL,
  `chassis_number` varchar(50) NOT NULL,
  `city_fuel_consumption` double NOT NULL,
  `engine_volume` double NOT NULL,
  `highway_fuel_consumption` double NOT NULL,
  `registered_to` varchar(150) NOT NULL,
  `license_plate_format` varchar(10) NOT NULL DEFAULT 'UA',
  `make` varchar(50) NOT NULL DEFAULT 'Unknown',
  `year` int unsigned NOT NULL DEFAULT '1980',
  `active` tinyint(1) NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`vehicle_id`),
  UNIQUE KEY `license_plate` (`license_plate`),
  UNIQUE KEY `chassis_number` (`chassis_number`),
  KEY `TransLogix_djangoProject_vehicle_fuel_type_id_9c4eb3ff` (`fuel_type_id`),
  CONSTRAINT `TransLogix_djangoPro_fuel_type_id_9c4eb3ff_fk_TransLogi` FOREIGN KEY (`fuel_type_id`) REFERENCES `translogix_djangoproject_fueltype` (`fuel_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_vehicle`
--

LOCK TABLES `translogix_djangoproject_vehicle` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_vehicle` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_vehicle` VALUES (1,'AB1234CD','МВ140',24,1,'1234567890ABCDEFG',7.5,3.8,5,'Степан Загуляйко','UA','Богдан',2020,1,'https://sylapravdy.com/wp-content/webpc-passthru.php?src=https://sylapravdy.com/wp-content/uploads/2021/07/shkilnyj-avtobus-ataman.jpg&nocache=1'),(2,'АА1111ББ','БС1',24,3,'WF222333FGH444',24,3.6,18,'Петро Іванович Котигорошко','UA','Еталон',2020,1,'https://images.unian.net/pb/003/thumb_files/h_500/388531.jpg'),(3,'АА2222BB','M240',20,1,'WF3333333FGH555',26,3.6,19,'Степан Іванович Калюжний','UA','Еталон',1988,1,'https://images.unian.net/pb/003/thumb_files/h_500/388531.jpg'),(4,'АА2222ГГ','ББ2А',44,1,'WF666333QWR777',32,4.2,27,'Ігор Петрович Міняйло','UA','Богдан',2000,1,'https://viki-tour.com.ua/wp-content/uploads/2018/04/trafik.jpg'),(5,'АА2222ББ','Спрінтер',20,1,'QSF888999QWWR33',24,2.5,18,'Абрам Свіридович Пульман','UA','Мерседес',2020,1,'https://viki-tour.com.ua/wp-content/uploads/2018/04/sprinter.jpg'),(6,'АА1111СС','ББ2А',22,3,'WF666333QWP999',26,3.4,22,'Петро Іванович Котигорошко','UA','Богдан',1987,1,'https://upload.wikimedia.org/wikipedia/commons/d/d9/Bogdan_A091.JPG'),(7,'АА1111HH','Суперджет',22,1,'WF666333QWN222',26,3.2,24,'Абрам Свіридович Пульман','UA','Богдан',1988,1,'https://bus.ck.ua/images/auto/1.jpg');
/*!40000 ALTER TABLE `translogix_djangoproject_vehicle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `passenger_coordinate_point_view`
--

/*!50001 DROP VIEW IF EXISTS `passenger_coordinate_point_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `passenger_coordinate_point_view` AS select `cp`.`id` AS `id`,`cp`.`point_type` AS `point_type`,`cp`.`latitude` AS `latitude`,`cp`.`longitude` AS `longitude`,`h`.`house_number` AS `house_number`,`cp`.`city_id` AS `city_id`,`c`.`name` AS `city_name`,`cp`.`country_id` AS `country_id`,`co`.`name` AS `country_name`,`cp`.`created_by_id` AS `created_by_id`,`cp`.`region_id` AS `region_id`,`r`.`name` AS `region_name`,`cp`.`district_id` AS `district_id`,`d`.`name` AS `district_name`,`cp`.`street_id` AS `street_id`,`s`.`name` AS `street_name`,`cp`.`object_id` AS `object_id`,`cp`.`owner_id` AS `owner_id`,`cp`.`owner_type` AS `owner_type`,`p`.`first_name` AS `passenger_first_name`,`p`.`last_name` AS `passenger_last_name`,`p`.`phone_number` AS `passenger_phone`,`p`.`email` AS `passenger_email`,`p`.`is_active` AS `is_active`,`p`.`is_selected` AS `is_selected` from (((((((`translogix_djangoproject_coordinatepoint` `cp` left join `translogix_djangoproject_passenger` `p` on(((`cp`.`owner_id` = `p`.`id`) and (`cp`.`owner_type` = 'passenger')))) left join `translogix_djangoproject_city` `c` on((`cp`.`city_id` = `c`.`id`))) left join `translogix_djangoproject_country` `co` on((`cp`.`country_id` = `co`.`id`))) left join `translogix_djangoproject_region` `r` on((`cp`.`region_id` = `r`.`id`))) left join `translogix_djangoproject_district` `d` on((`cp`.`district_id` = `d`.`id`))) left join `translogix_djangoproject_street` `s` on((`cp`.`street_id` = `s`.`id`))) left join `translogix_djangoproject_house` `h` on((`cp`.`house_id` = `h`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `passenger_coordinate_point_view3`
--

/*!50001 DROP VIEW IF EXISTS `passenger_coordinate_point_view3`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `passenger_coordinate_point_view3` AS select `cp`.`id` AS `id`,`cp`.`point_type` AS `point_type`,`cp`.`latitude` AS `latitude`,`cp`.`longitude` AS `longitude`,`h`.`house_number` AS `house_number`,`cp`.`city_id` AS `city_id`,`c`.`name` AS `city_name`,`cp`.`country_id` AS `country_id`,`co`.`name` AS `country_name`,`cp`.`created_by_id` AS `created_by_id`,`cp`.`region_id` AS `region_id`,`r`.`name` AS `region_name`,`cp`.`district_id` AS `district_id`,`d`.`name` AS `district_name`,`cp`.`street_id` AS `street_id`,`s`.`name` AS `street_name`,`cp`.`object_id` AS `object_id`,`cp`.`owner_id` AS `owner_id`,`cp`.`owner_type` AS `owner_type`,`p`.`first_name` AS `passenger_first_name`,`p`.`last_name` AS `passenger_last_name`,`p`.`phone_number` AS `passenger_phone`,`p`.`email` AS `passenger_email`,`p`.`is_active` AS `is_active`,`p`.`is_selected` AS `is_selected` from (((((((`translogix_djangoproject_coordinatepoint` `cp` left join `translogix_djangoproject_passenger` `p` on(((`cp`.`owner_id` = `p`.`id`) and (`cp`.`owner_type` = 'passenger')))) left join `translogix_djangoproject_city` `c` on((`cp`.`city_id` = `c`.`id`))) left join `translogix_djangoproject_country` `co` on((`cp`.`country_id` = `co`.`id`))) left join `translogix_djangoproject_region` `r` on((`cp`.`region_id` = `r`.`id`))) left join `translogix_djangoproject_district` `d` on((`cp`.`district_id` = `d`.`id`))) left join `translogix_djangoproject_street` `s` on((`cp`.`street_id` = `s`.`id`))) left join `translogix_djangoproject_house` `h` on((`cp`.`house_id` = `h`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-04 18:10:52
