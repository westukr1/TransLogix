-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: TransLogix_main_db
-- ------------------------------------------------------
-- Server version	8.0.45

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
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
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
  `app` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2026-04-13 11:43:44.194769'),(2,'contenttypes','0002_remove_content_type_name','2026-04-13 11:43:45.682003'),(3,'auth','0001_initial','2026-04-13 11:43:50.350496'),(4,'auth','0002_alter_permission_name_max_length','2026-04-13 11:43:51.414321'),(5,'auth','0003_alter_user_email_max_length','2026-04-13 11:43:51.477947'),(6,'auth','0004_alter_user_username_opts','2026-04-13 11:43:51.609376'),(7,'auth','0005_alter_user_last_login_null','2026-04-13 11:43:51.660959'),(8,'auth','0006_require_contenttypes_0002','2026-04-13 11:43:51.686522'),(9,'auth','0007_alter_validators_add_error_messages','2026-04-13 11:43:51.722431'),(10,'auth','0008_alter_user_username_max_length','2026-04-13 11:43:51.767278'),(11,'auth','0009_alter_user_last_name_max_length','2026-04-13 11:43:51.797859'),(12,'auth','0010_alter_group_name_max_length','2026-04-13 11:43:51.896472'),(13,'auth','0011_update_proxy_permissions','2026-04-13 11:43:51.945121'),(14,'auth','0012_alter_user_first_name_max_length','2026-04-13 11:43:51.981132'),(15,'TransLogix_djangoProject','0001_initial','2026-04-13 11:44:03.848854'),(16,'TransLogix_djangoProject','0002_city_country_passenger_alter_route_options_and_more','2026-04-13 11:44:05.155380'),(17,'TransLogix_djangoProject','0003_manual2','2026-04-13 11:44:08.581341'),(18,'TransLogix_djangoProject','0004_manual3','2026-04-13 11:44:10.818943'),(19,'TransLogix_djangoProject','0005_alter_route_options_alter_trip_options_and_more','2026-04-13 11:44:24.579332'),(20,'TransLogix_djangoProject','0006_manual5','2026-04-13 11:44:24.626664'),(21,'TransLogix_djangoProject','0007_manual6','2026-04-13 11:44:26.680323');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_bookingrequest`
--

DROP TABLE IF EXISTS `translogix_djangoproject_bookingrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_bookingrequest` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `TransLogix_djangoPro_user_id_2f872cbe_fk_TransLogi` (`user_id`),
  CONSTRAINT `TransLogix_djangoPro_user_id_2f872cbe_fk_TransLogi` FOREIGN KEY (`user_id`) REFERENCES `translogix_djangoproject_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_city`
--

LOCK TABLES `translogix_djangoproject_city` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_city` DISABLE KEYS */;
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
  `point_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `house_number` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city_id` bigint DEFAULT NULL,
  `country_id` bigint DEFAULT NULL,
  `created_by_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_city_id_339ca32c_fk_TransLogi` (`city_id`),
  KEY `TransLogix_djangoPro_country_id_8e260089_fk_TransLogi` (`country_id`),
  KEY `TransLogix_djangoPro_created_by_id_db8e2f0a_fk_TransLogi` (`created_by_id`),
  CONSTRAINT `TransLogix_djangoPro_city_id_339ca32c_fk_TransLogi` FOREIGN KEY (`city_id`) REFERENCES `translogix_djangoproject_city` (`id`),
  CONSTRAINT `TransLogix_djangoPro_country_id_8e260089_fk_TransLogi` FOREIGN KEY (`country_id`) REFERENCES `translogix_djangoproject_country` (`id`),
  CONSTRAINT `TransLogix_djangoPro_created_by_id_db8e2f0a_fk_TransLogi` FOREIGN KEY (`created_by_id`) REFERENCES `translogix_djangoproject_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_coordinatepoint`
--

LOCK TABLES `translogix_djangoproject_coordinatepoint` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_coordinatepoint` DISABLE KEYS */;
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
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_country`
--

LOCK TABLES `translogix_djangoproject_country` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_country` DISABLE KEYS */;
/*!40000 ALTER TABLE `translogix_djangoproject_country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_driver`
--

DROP TABLE IF EXISTS `translogix_djangoproject_driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_driver` (
  `driver_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `license_number` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vehicle_id` int DEFAULT NULL,
  PRIMARY KEY (`driver_id`),
  UNIQUE KEY `license_number` (`license_number`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `TransLogix_djangoPro_vehicle_id_498a3464_fk_TransLogi` (`vehicle_id`),
  CONSTRAINT `TransLogix_djangoPro_user_id_3e70b6bb_fk_TransLogi` FOREIGN KEY (`user_id`) REFERENCES `translogix_djangoproject_user` (`user_id`),
  CONSTRAINT `TransLogix_djangoPro_vehicle_id_498a3464_fk_TransLogi` FOREIGN KEY (`vehicle_id`) REFERENCES `translogix_djangoproject_vehicle` (`vehicle_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_driver`
--

LOCK TABLES `translogix_djangoproject_driver` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_driver` DISABLE KEYS */;
/*!40000 ALTER TABLE `translogix_djangoproject_driver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_feedback`
--

DROP TABLE IF EXISTS `translogix_djangoproject_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_feedback` (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `comments` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int NOT NULL,
  `trip_id` int NOT NULL,
  `user_id` int NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `TransLogix_djangoPro_trip_id_246304eb_fk_TransLogi` (`trip_id`),
  KEY `TransLogix_djangoPro_user_id_7861eaec_fk_TransLogi` (`user_id`),
  CONSTRAINT `TransLogix_djangoPro_trip_id_246304eb_fk_TransLogi` FOREIGN KEY (`trip_id`) REFERENCES `translogix_djangoproject_trip` (`trip_id`),
  CONSTRAINT `TransLogix_djangoPro_user_id_7861eaec_fk_TransLogi` FOREIGN KEY (`user_id`) REFERENCES `translogix_djangoproject_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  `station_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trip_id` int NOT NULL,
  PRIMARY KEY (`fuel_log_id`),
  KEY `TransLogix_djangoPro_trip_id_b5888fa9_fk_TransLogi` (`trip_id`),
  CONSTRAINT `TransLogix_djangoPro_trip_id_b5888fa9_fk_TransLogi` FOREIGN KEY (`trip_id`) REFERENCES `translogix_djangoproject_trip` (`trip_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_fuellog`
--

LOCK TABLES `translogix_djangoproject_fuellog` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_fuellog` DISABLE KEYS */;
/*!40000 ALTER TABLE `translogix_djangoproject_fuellog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_house`
--

DROP TABLE IF EXISTS `translogix_djangoproject_house`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_house` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `house_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `street_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_street_id_74eed726_fk_TransLogi` (`street_id`),
  CONSTRAINT `TransLogix_djangoPro_street_id_74eed726_fk_TransLogi` FOREIGN KEY (`street_id`) REFERENCES `translogix_djangoproject_street` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_house`
--

LOCK TABLES `translogix_djangoproject_house` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_house` DISABLE KEYS */;
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
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pickup_address` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_passenger`
--

LOCK TABLES `translogix_djangoproject_passenger` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_passenger` DISABLE KEYS */;
/*!40000 ALTER TABLE `translogix_djangoproject_passenger` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_country_id_50f7f2f2_fk_TransLogi` (`country_id`),
  CONSTRAINT `TransLogix_djangoPro_country_id_50f7f2f2_fk_TransLogi` FOREIGN KEY (`country_id`) REFERENCES `translogix_djangoproject_country` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_region`
--

LOCK TABLES `translogix_djangoproject_region` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_region` DISABLE KEYS */;
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
  `distance` double NOT NULL,
  `estimated_time` bigint NOT NULL,
  `date` datetime(6) NOT NULL,
  `destination_id` bigint DEFAULT NULL,
  `origin_id` bigint DEFAULT NULL,
  PRIMARY KEY (`route_id`),
  UNIQUE KEY `TransLogix_djangoProject_origin_id_destination_id_5d84134a_uniq` (`origin_id`,`destination_id`,`date`),
  KEY `TransLogix_djangoPro_destination_id_82d744c5_fk_TransLogi` (`destination_id`),
  CONSTRAINT `TransLogix_djangoPro_destination_id_82d744c5_fk_TransLogi` FOREIGN KEY (`destination_id`) REFERENCES `translogix_djangoproject_city` (`id`),
  CONSTRAINT `TransLogix_djangoPro_origin_id_e661cebc_fk_TransLogi` FOREIGN KEY (`origin_id`) REFERENCES `translogix_djangoproject_city` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_route`
--

LOCK TABLES `translogix_djangoproject_route` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_route` DISABLE KEYS */;
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
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_city_id_4f39b650_fk_TransLogi` (`city_id`),
  CONSTRAINT `TransLogix_djangoPro_city_id_4f39b650_fk_TransLogi` FOREIGN KEY (`city_id`) REFERENCES `translogix_djangoproject_city` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_street`
--

LOCK TABLES `translogix_djangoproject_street` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_street` DISABLE KEYS */;
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
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `driver_id` int NOT NULL,
  `route_id` int NOT NULL,
  `vehicle_id` int NOT NULL,
  PRIMARY KEY (`trip_id`),
  KEY `TransLogix_djangoPro_driver_id_80325883_fk_TransLogi` (`driver_id`),
  KEY `TransLogix_djangoPro_route_id_c693a0a5_fk_TransLogi` (`route_id`),
  KEY `TransLogix_djangoPro_vehicle_id_9ee9bbcc_fk_TransLogi` (`vehicle_id`),
  CONSTRAINT `TransLogix_djangoPro_driver_id_80325883_fk_TransLogi` FOREIGN KEY (`driver_id`) REFERENCES `translogix_djangoproject_driver` (`driver_id`),
  CONSTRAINT `TransLogix_djangoPro_route_id_c693a0a5_fk_TransLogi` FOREIGN KEY (`route_id`) REFERENCES `translogix_djangoproject_route` (`route_id`),
  CONSTRAINT `TransLogix_djangoPro_vehicle_id_9ee9bbcc_fk_TransLogi` FOREIGN KEY (`vehicle_id`) REFERENCES `translogix_djangoproject_vehicle` (`vehicle_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_user`
--

LOCK TABLES `translogix_djangoproject_user` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `translogix_djangoproject_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_vehicle`
--

DROP TABLE IF EXISTS `translogix_djangoproject_vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_vehicle` (
  `vehicle_id` int NOT NULL AUTO_INCREMENT,
  `license_plate` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacity` int NOT NULL,
  `fuel_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`vehicle_id`),
  UNIQUE KEY `license_plate` (`license_plate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_vehicle`
--

LOCK TABLES `translogix_djangoproject_vehicle` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_vehicle` DISABLE KEYS */;
/*!40000 ALTER TABLE `translogix_djangoproject_vehicle` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-13 12:14:34
