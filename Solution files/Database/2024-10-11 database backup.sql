-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: translogix_main_db
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add driver',1,'add_driver'),(2,'Can change driver',1,'change_driver'),(3,'Can delete driver',1,'delete_driver'),(4,'Can view driver',1,'view_driver'),(5,'Can add route',2,'add_route'),(6,'Can change route',2,'change_route'),(7,'Can delete route',2,'delete_route'),(8,'Can view route',2,'view_route'),(9,'Can add user',3,'add_user'),(10,'Can change user',3,'change_user'),(11,'Can delete user',3,'delete_user'),(12,'Can view user',3,'view_user'),(13,'Can add vehicle',4,'add_vehicle'),(14,'Can change vehicle',4,'change_vehicle'),(15,'Can delete vehicle',4,'delete_vehicle'),(16,'Can view vehicle',4,'view_vehicle'),(17,'Can add Trip',5,'add_trip'),(18,'Can change Trip',5,'change_trip'),(19,'Can delete Trip',5,'delete_trip'),(20,'Can view Trip',5,'view_trip'),(21,'Can add fuel log',6,'add_fuellog'),(22,'Can change fuel log',6,'change_fuellog'),(23,'Can delete fuel log',6,'delete_fuellog'),(24,'Can view fuel log',6,'view_fuellog'),(25,'Can add feedback',7,'add_feedback'),(26,'Can change feedback',7,'change_feedback'),(27,'Can delete feedback',7,'delete_feedback'),(28,'Can view feedback',7,'view_feedback'),(29,'Can add booking request',8,'add_bookingrequest'),(30,'Can change booking request',8,'change_bookingrequest'),(31,'Can delete booking request',8,'delete_bookingrequest'),(32,'Can view booking request',8,'view_bookingrequest'),(33,'Can add city',9,'add_city'),(34,'Can change city',9,'change_city'),(35,'Can delete city',9,'delete_city'),(36,'Can view city',9,'view_city'),(37,'Can add country',10,'add_country'),(38,'Can change country',10,'change_country'),(39,'Can delete country',10,'delete_country'),(40,'Can view country',10,'view_country'),(41,'Can add passenger',11,'add_passenger'),(42,'Can change passenger',11,'change_passenger'),(43,'Can delete passenger',11,'delete_passenger'),(44,'Can view passenger',11,'view_passenger'),(45,'Can add log entry',12,'add_logentry'),(46,'Can change log entry',12,'change_logentry'),(47,'Can delete log entry',12,'delete_logentry'),(48,'Can view log entry',12,'view_logentry'),(49,'Can add permission',13,'add_permission'),(50,'Can change permission',13,'change_permission'),(51,'Can delete permission',13,'delete_permission'),(52,'Can view permission',13,'view_permission'),(53,'Can add group',14,'add_group'),(54,'Can change group',14,'change_group'),(55,'Can delete group',14,'delete_group'),(56,'Can view group',14,'view_group'),(57,'Can add content type',15,'add_contenttype'),(58,'Can change content type',15,'change_contenttype'),(59,'Can delete content type',15,'delete_contenttype'),(60,'Can view content type',15,'view_contenttype'),(61,'Can add session',16,'add_session'),(62,'Can change session',16,'change_session'),(63,'Can delete session',16,'delete_session'),(64,'Can view session',16,'view_session'),(65,'Can add region',17,'add_region'),(66,'Can change region',17,'change_region'),(67,'Can delete region',17,'delete_region'),(68,'Can view region',17,'view_region'),(69,'Can add passenger route',18,'add_passengerroute'),(70,'Can change passenger route',18,'change_passengerroute'),(71,'Can delete passenger route',18,'delete_passengerroute'),(72,'Can view passenger route',18,'view_passengerroute'),(73,'Can add house',19,'add_house'),(74,'Can change house',19,'change_house'),(75,'Can delete house',19,'delete_house'),(76,'Can view house',19,'view_house'),(77,'Can add street',20,'add_street'),(78,'Can change street',20,'change_street'),(79,'Can delete street',20,'delete_street'),(80,'Can view street',20,'view_street'),(81,'Can add coordinate point',21,'add_coordinatepoint'),(82,'Can change coordinate point',21,'change_coordinatepoint'),(83,'Can delete coordinate point',21,'delete_coordinatepoint'),(84,'Can view coordinate point',21,'view_coordinatepoint');
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (12,'admin','logentry'),(14,'auth','group'),(13,'auth','permission'),(15,'contenttypes','contenttype'),(16,'sessions','session'),(8,'TransLogix_djangoProject','bookingrequest'),(9,'TransLogix_djangoProject','city'),(21,'TransLogix_djangoProject','coordinatepoint'),(10,'TransLogix_djangoProject','country'),(1,'TransLogix_djangoProject','driver'),(7,'TransLogix_djangoProject','feedback'),(6,'TransLogix_djangoProject','fuellog'),(19,'TransLogix_djangoProject','house'),(11,'TransLogix_djangoProject','passenger'),(18,'TransLogix_djangoProject','passengerroute'),(17,'TransLogix_djangoProject','region'),(2,'TransLogix_djangoProject','route'),(20,'TransLogix_djangoProject','street'),(5,'TransLogix_djangoProject','trip'),(3,'TransLogix_djangoProject','user'),(4,'TransLogix_djangoProject','vehicle');
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'TransLogix_djangoProject','0001_initial','2024-10-11 14:39:10.443847'),(2,'TransLogix_djangoProject','0002_city_country_passenger_alter_route_options_and_more','2024-10-11 14:39:10.564846'),(3,'TransLogix_djangoProject','0003_manual2','2024-10-11 14:39:35.303955'),(4,'TransLogix_djangoProject','0004_manual3','2024-10-11 14:39:49.112039'),(5,'contenttypes','0001_initial','2024-10-11 14:46:24.706222'),(6,'admin','0001_initial','2024-10-11 14:46:24.919640'),(7,'admin','0002_logentry_remove_auto_add','2024-10-11 14:46:24.931644'),(8,'admin','0003_logentry_add_action_flag_choices','2024-10-11 14:46:24.940642'),(9,'contenttypes','0002_remove_content_type_name','2024-10-11 14:46:25.063108'),(10,'auth','0001_initial','2024-10-11 14:46:25.502298'),(11,'auth','0002_alter_permission_name_max_length','2024-10-11 14:46:25.653449'),(12,'auth','0003_alter_user_email_max_length','2024-10-11 14:46:25.664277'),(13,'auth','0004_alter_user_username_opts','2024-10-11 14:46:25.678761'),(14,'auth','0005_alter_user_last_login_null','2024-10-11 14:46:25.691620'),(15,'auth','0006_require_contenttypes_0002','2024-10-11 14:46:25.701827'),(16,'auth','0007_alter_validators_add_error_messages','2024-10-11 14:46:25.716846'),(17,'auth','0008_alter_user_username_max_length','2024-10-11 14:46:25.729216'),(18,'auth','0009_alter_user_last_name_max_length','2024-10-11 14:46:25.741679'),(19,'auth','0010_alter_group_name_max_length','2024-10-11 14:46:25.779171'),(20,'auth','0011_update_proxy_permissions','2024-10-11 14:46:25.798622'),(21,'auth','0012_alter_user_first_name_max_length','2024-10-11 14:46:25.813571'),(22,'sessions','0001_initial','2024-10-11 14:46:25.869738'),(23,'TransLogix_djangoProject','0005_alter_route_options_alter_trip_options_and_more','2024-10-11 15:08:14.377860'),(24,'TransLogix_djangoProject','0006_manual5','2024-10-11 15:25:04.005937'),(25,'TransLogix_djangoProject','0007_manual6','2024-10-11 15:26:45.577686'),(26,'TransLogix_djangoProject','0008_alter_route_options_alter_trip_options_and_more','2024-10-11 15:33:20.226116');
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
INSERT INTO `django_session` VALUES ('hig99lrailqup0iphbfafkdnjcs7xqys','.eJxVjMsOwiAQRf-FtSEDlJdL934DGWCQqoGktCvjv2uTLnR7zzn3xQJuaw3boCXMmZ2ZYKffLWJ6UNtBvmO7dZ56W5c58l3hBx382jM9L4f7d1Bx1G8Niii6aGNO1mpyVguQQqfJFy_LJIxDa1RRAnySYClLHYvHbAhAYPLs_QHaLjek:1szJF5:LYHt9Rd3KQd-ZfSwrv_P_eDc33EnldLgAiJ5ExsIp9w','2024-10-25 17:15:55.584668');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `point_type` varchar(50) NOT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `house_number` varchar(10) DEFAULT NULL,
  `city_id` bigint DEFAULT NULL,
  `country_id` bigint DEFAULT NULL,
  `created_by_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_city_id_339ca32c_fk_TransLogi` (`city_id`),
  KEY `TransLogix_djangoPro_country_id_8e260089_fk_TransLogi` (`country_id`),
  KEY `TransLogix_djangoPro_created_by_id_db8e2f0a_fk_TransLogi` (`created_by_id`),
  CONSTRAINT `TransLogix_djangoPro_city_id_339ca32c_fk_TransLogi` FOREIGN KEY (`city_id`) REFERENCES `translogix_djangoproject_city` (`id`),
  CONSTRAINT `TransLogix_djangoPro_country_id_8e260089_fk_TransLogi` FOREIGN KEY (`country_id`) REFERENCES `translogix_djangoproject_country` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `name` varchar(255) NOT NULL,
  `license_number` varchar(50) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `user_id` int NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `vehicle_id` int DEFAULT NULL,
  PRIMARY KEY (`driver_id`),
  UNIQUE KEY `license_number` (`license_number`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `TransLogix_djangoPro_vehicle_id_498a3464_fk_TransLogi` (`vehicle_id`),
  CONSTRAINT `TransLogix_djangoPro_vehicle_id_498a3464_fk_TransLogi` FOREIGN KEY (`vehicle_id`) REFERENCES `translogix_djangoproject_vehicle` (`vehicle_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
-- Table structure for table `translogix_djangoproject_house`
--

DROP TABLE IF EXISTS `translogix_djangoproject_house`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_house` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `house_number` varchar(20) NOT NULL,
  `street_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_street_id_74eed726_fk_TransLogi` (`street_id`),
  CONSTRAINT `TransLogix_djangoPro_street_id_74eed726_fk_TransLogi` FOREIGN KEY (`street_id`) REFERENCES `translogix_djangoproject_street` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `pickup_address` varchar(200) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `email` varchar(254) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `country_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_country_id_50f7f2f2_fk_TransLogi` (`country_id`),
  CONSTRAINT `TransLogix_djangoPro_country_id_50f7f2f2_fk_TransLogi` FOREIGN KEY (`country_id`) REFERENCES `translogix_djangoproject_country` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `start_point_id` bigint DEFAULT NULL,
  `end_point_id` bigint DEFAULT NULL,
  PRIMARY KEY (`route_id`),
  UNIQUE KEY `TransLogix_djangoProject_origin_id_destination_id_5d84134a_uniq` (`origin_id`,`destination_id`,`date`),
  KEY `TransLogix_djangoPro_destination_id_82d744c5_fk_TransLogi` (`destination_id`),
  KEY `TransLogix_djangoPro_start_point_id_0d4f287c_fk_TransLogi` (`start_point_id`),
  KEY `TransLogix_djangoPro_end_point_id_c2e59549_fk_TransLogi` (`end_point_id`),
  CONSTRAINT `TransLogix_djangoPro_destination_id_82d744c5_fk_TransLogi` FOREIGN KEY (`destination_id`) REFERENCES `translogix_djangoproject_city` (`id`),
  CONSTRAINT `TransLogix_djangoPro_end_point_id_c2e59549_fk_TransLogi` FOREIGN KEY (`end_point_id`) REFERENCES `translogix_djangoproject_coordinatepoint` (`id`),
  CONSTRAINT `TransLogix_djangoPro_origin_id_e661cebc_fk_TransLogi` FOREIGN KEY (`origin_id`) REFERENCES `translogix_djangoproject_city` (`id`),
  CONSTRAINT `TransLogix_djangoPro_start_point_id_0d4f287c_fk_TransLogi` FOREIGN KEY (`start_point_id`) REFERENCES `translogix_djangoproject_coordinatepoint` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `name` varchar(100) NOT NULL,
  `city_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_city_id_4f39b650_fk_TransLogi` (`city_id`),
  CONSTRAINT `TransLogix_djangoPro_city_id_4f39b650_fk_TransLogi` FOREIGN KEY (`city_id`) REFERENCES `translogix_djangoproject_city` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  CONSTRAINT `TransLogix_djangoPro_driver_id_80325883_fk_TransLogi` FOREIGN KEY (`driver_id`) REFERENCES `translogix_djangoproject_driver` (`driver_id`),
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_user`
--

LOCK TABLES `translogix_djangoproject_user` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_user` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_user` VALUES (1,'westukr1','pbkdf2_sha256$870000$KMcbRbAxFNyoU170qxQCMz$SPPEA2zb8XHUdLNCeD99HCV+AEdoJxNPV06viReCi8s=','westukr1@gmail.com','guest','2024-10-11 17:08:51.143784','2024-10-11 17:41:33.770653',0,'2024-10-11 17:15:56',1,1,1,1,'','',1,1,'2024-10-11 17:08:51'),(2,'user','pbkdf2_sha256$870000$trHjzWXNy55jAbtSf7v7KX$sEkhn8hSJTvAgEF61v0F2Qg6UfVVd2/sr7qaEBI4zs4=','','guest','2024-10-11 17:16:57.215291','2024-10-11 17:41:33.773652',0,NULL,1,1,1,1,'','',1,1,'2024-10-11 17:16:57'),(4,'Operator','pbkdf2_sha256$870000$q0OiEm1AVUvXW9UyNelf1f$6DB1q6oR8rV7lXddkMfV+BUj693LNtFcEiQIsvkd4sg=','email@email.com','guest','2024-10-11 17:40:46.998662','2024-10-11 17:41:33.776655',0,NULL,0,1,0,1,'','',1,1,'2024-10-11 17:40:47'),(5,'testuser','pbkdf2_sha256$870000$2CBWHjGVwfCCcLtYpRJwsR$FCFo8LgydxTPBmDowKXsDI3byIgKQOx+4ZiuR1EweUQ=','testuser@example.com','guest','2024-10-11 17:40:53.623323','2024-10-11 17:41:33.778654',0,NULL,0,0,1,0,'','',1,1,'2024-10-11 17:40:54');
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
  `fuel_type` varchar(50) NOT NULL,
  PRIMARY KEY (`vehicle_id`),
  UNIQUE KEY `license_plate` (`license_plate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_vehicle`
--

LOCK TABLES `translogix_djangoproject_vehicle` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_vehicle` DISABLE KEYS */;
/*!40000 ALTER TABLE `translogix_djangoproject_vehicle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'translogix_main_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-11 20:50:44
