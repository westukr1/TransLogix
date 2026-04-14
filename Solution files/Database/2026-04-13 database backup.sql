-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: translogix_main_db
-- ------------------------------------------------------
-- Server version	8.0.41

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
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add driver',1,'add_driver'),(2,'Can change driver',1,'change_driver'),(3,'Can delete driver',1,'delete_driver'),(4,'Can view driver',1,'view_driver'),(5,'Can add route',2,'add_route'),(6,'Can change route',2,'change_route'),(7,'Can delete route',2,'delete_route'),(8,'Can view route',2,'view_route'),(9,'Can add user',3,'add_user'),(10,'Can change user',3,'change_user'),(11,'Can delete user',3,'delete_user'),(12,'Can view user',3,'view_user'),(13,'Can add vehicle',4,'add_vehicle'),(14,'Can change vehicle',4,'change_vehicle'),(15,'Can delete vehicle',4,'delete_vehicle'),(16,'Can view vehicle',4,'view_vehicle'),(17,'Can add Trip',5,'add_trip'),(18,'Can change Trip',5,'change_trip'),(19,'Can delete Trip',5,'delete_trip'),(20,'Can view Trip',5,'view_trip'),(21,'Can add fuel log',6,'add_fuellog'),(22,'Can change fuel log',6,'change_fuellog'),(23,'Can delete fuel log',6,'delete_fuellog'),(24,'Can view fuel log',6,'view_fuellog'),(25,'Can add feedback',7,'add_feedback'),(26,'Can change feedback',7,'change_feedback'),(27,'Can delete feedback',7,'delete_feedback'),(28,'Can view feedback',7,'view_feedback'),(29,'Can add booking request',8,'add_bookingrequest'),(30,'Can change booking request',8,'change_bookingrequest'),(31,'Can delete booking request',8,'delete_bookingrequest'),(32,'Can view booking request',8,'view_bookingrequest'),(33,'Can add city',9,'add_city'),(34,'Can change city',9,'change_city'),(35,'Can delete city',9,'delete_city'),(36,'Can view city',9,'view_city'),(37,'Can add country',10,'add_country'),(38,'Can change country',10,'change_country'),(39,'Can delete country',10,'delete_country'),(40,'Can view country',10,'view_country'),(41,'Can add passenger',11,'add_passenger'),(42,'Can change passenger',11,'change_passenger'),(43,'Can delete passenger',11,'delete_passenger'),(44,'Can view passenger',11,'view_passenger'),(45,'Can add log entry',12,'add_logentry'),(46,'Can change log entry',12,'change_logentry'),(47,'Can delete log entry',12,'delete_logentry'),(48,'Can view log entry',12,'view_logentry'),(49,'Can add permission',13,'add_permission'),(50,'Can change permission',13,'change_permission'),(51,'Can delete permission',13,'delete_permission'),(52,'Can view permission',13,'view_permission'),(53,'Can add group',14,'add_group'),(54,'Can change group',14,'change_group'),(55,'Can delete group',14,'delete_group'),(56,'Can view group',14,'view_group'),(57,'Can add content type',15,'add_contenttype'),(58,'Can change content type',15,'change_contenttype'),(59,'Can delete content type',15,'delete_contenttype'),(60,'Can view content type',15,'view_contenttype'),(61,'Can add session',16,'add_session'),(62,'Can change session',16,'change_session'),(63,'Can delete session',16,'delete_session'),(64,'Can view session',16,'view_session'),(65,'Can add region',17,'add_region'),(66,'Can change region',17,'change_region'),(67,'Can delete region',17,'delete_region'),(68,'Can view region',17,'view_region'),(69,'Can add passenger route',18,'add_passengerroute'),(70,'Can change passenger route',18,'change_passengerroute'),(71,'Can delete passenger route',18,'delete_passengerroute'),(72,'Can view passenger route',18,'view_passengerroute'),(73,'Can add house',19,'add_house'),(74,'Can change house',19,'change_house'),(75,'Can delete house',19,'delete_house'),(76,'Can view house',19,'view_house'),(77,'Can add street',20,'add_street'),(78,'Can change street',20,'change_street'),(79,'Can delete street',20,'delete_street'),(80,'Can view street',20,'view_street'),(81,'Can add coordinate point',21,'add_coordinatepoint'),(82,'Can change coordinate point',21,'change_coordinatepoint'),(83,'Can delete coordinate point',21,'delete_coordinatepoint'),(84,'Can view coordinate point',21,'view_coordinatepoint'),(85,'Can add district',22,'add_district'),(86,'Can change district',22,'change_district'),(87,'Can delete district',22,'delete_district'),(88,'Can view district',22,'view_district'),(89,'Can add group',23,'add_group'),(90,'Can change group',23,'change_group'),(91,'Can delete group',23,'delete_group'),(92,'Can view group',23,'view_group'),(93,'Can add group membership',24,'add_groupmembership'),(94,'Can change group membership',24,'change_groupmembership'),(95,'Can delete group membership',24,'delete_groupmembership'),(96,'Can view group membership',24,'view_groupmembership'),(97,'Can add Fuel Type',25,'add_fueltype'),(98,'Can change Fuel Type',25,'change_fueltype'),(99,'Can delete Fuel Type',25,'delete_fueltype'),(100,'Can view Fuel Type',25,'view_fueltype'),(101,'Can add Driver Vehicle Assignment',26,'add_drivervehicleassignment'),(102,'Can change Driver Vehicle Assignment',26,'change_drivervehicleassignment'),(103,'Can delete Driver Vehicle Assignment',26,'delete_drivervehicleassignment'),(104,'Can view Driver Vehicle Assignment',26,'view_drivervehicleassignment'),(105,'Can add Route Point',27,'add_routepoint'),(106,'Can change Route Point',27,'change_routepoint'),(107,'Can delete Route Point',27,'delete_routepoint'),(108,'Can view Route Point',27,'view_routepoint'),(109,'Can add Passenger Trip Request',28,'add_passengertriprequest'),(110,'Can change Passenger Trip Request',28,'change_passengertriprequest'),(111,'Can delete Passenger Trip Request',28,'delete_passengertriprequest'),(112,'Can view Passenger Trip Request',28,'view_passengertriprequest'),(113,'Can add user settings',29,'add_usersettings'),(114,'Can change user settings',29,'change_usersettings'),(115,'Can delete user settings',29,'delete_usersettings'),(116,'Can view user settings',29,'view_usersettings'),(117,'Can add ordered passenger list',30,'add_orderedpassengerlist'),(118,'Can change ordered passenger list',30,'change_orderedpassengerlist'),(119,'Can delete ordered passenger list',30,'delete_orderedpassengerlist'),(120,'Can view ordered passenger list',30,'view_orderedpassengerlist'),(121,'Can add temporary passenger list',31,'add_temporarypassengerlist'),(122,'Can change temporary passenger list',31,'change_temporarypassengerlist'),(123,'Can delete temporary passenger list',31,'delete_temporarypassengerlist'),(124,'Can view temporary passenger list',31,'view_temporarypassengerlist'),(125,'Can add cron job log',32,'add_cronjoblog'),(126,'Can change cron job log',32,'change_cronjoblog'),(127,'Can delete cron job log',32,'delete_cronjoblog'),(128,'Can view cron job log',32,'view_cronjoblog'),(129,'Can add cron job lock',33,'add_cronjoblock'),(130,'Can change cron job lock',33,'change_cronjoblock'),(131,'Can delete cron job lock',33,'delete_cronjoblock'),(132,'Can view cron job lock',33,'view_cronjoblock'),(133,'Can add route plan draft',34,'add_routeplandraft'),(134,'Can change route plan draft',34,'change_routeplandraft'),(135,'Can delete route plan draft',34,'delete_routeplandraft'),(136,'Can view route plan draft',34,'view_routeplandraft'),(137,'Can add route draft list',35,'add_routedraftlist'),(138,'Can change route draft list',35,'change_routedraftlist'),(139,'Can delete route draft list',35,'delete_routedraftlist'),(140,'Can view route draft list',35,'view_routedraftlist');
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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (12,'admin','logentry'),(14,'auth','group'),(13,'auth','permission'),(15,'contenttypes','contenttype'),(33,'django_cron','cronjoblock'),(32,'django_cron','cronjoblog'),(16,'sessions','session'),(8,'TransLogix_djangoProject','bookingrequest'),(9,'TransLogix_djangoProject','city'),(21,'TransLogix_djangoProject','coordinatepoint'),(10,'TransLogix_djangoProject','country'),(22,'TransLogix_djangoProject','district'),(1,'TransLogix_djangoProject','driver'),(26,'TransLogix_djangoProject','drivervehicleassignment'),(7,'TransLogix_djangoProject','feedback'),(6,'TransLogix_djangoProject','fuellog'),(25,'TransLogix_djangoProject','fueltype'),(23,'TransLogix_djangoProject','group'),(24,'TransLogix_djangoProject','groupmembership'),(19,'TransLogix_djangoProject','house'),(30,'TransLogix_djangoProject','orderedpassengerlist'),(11,'TransLogix_djangoProject','passenger'),(18,'TransLogix_djangoProject','passengerroute'),(28,'TransLogix_djangoProject','passengertriprequest'),(17,'TransLogix_djangoProject','region'),(2,'TransLogix_djangoProject','route'),(35,'TransLogix_djangoProject','routedraftlist'),(34,'TransLogix_djangoProject','routeplandraft'),(27,'TransLogix_djangoProject','routepoint'),(20,'TransLogix_djangoProject','street'),(31,'TransLogix_djangoProject','temporarypassengerlist'),(5,'TransLogix_djangoProject','trip'),(3,'TransLogix_djangoProject','user'),(29,'TransLogix_djangoProject','usersettings'),(4,'TransLogix_djangoProject','vehicle');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_cron_cronjoblock`
--

DROP TABLE IF EXISTS `django_cron_cronjoblock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_cron_cronjoblock` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `job_name` varchar(200) NOT NULL,
  `locked` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `job_name` (`job_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_cron_cronjoblock`
--

LOCK TABLES `django_cron_cronjoblock` WRITE;
/*!40000 ALTER TABLE `django_cron_cronjoblock` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_cron_cronjoblock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_cron_cronjoblog`
--

DROP TABLE IF EXISTS `django_cron_cronjoblog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_cron_cronjoblog` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(64) NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `is_success` tinyint(1) NOT NULL,
  `message` longtext NOT NULL,
  `ran_at_time` time(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `django_cron_code_966ed3_idx` (`code`,`start_time`),
  KEY `django_cron_code_89ad04_idx` (`code`,`is_success`,`ran_at_time`),
  KEY `django_cron_code_21f381_idx` (`code`,`start_time`,`ran_at_time`),
  KEY `django_cron_cronjoblog_code_48865653` (`code`),
  KEY `django_cron_cronjoblog_start_time_d68c0dd9` (`start_time`),
  KEY `django_cron_cronjoblog_end_time_7918602a` (`end_time`),
  KEY `django_cron_cronjoblog_ran_at_time_7fed2751` (`ran_at_time`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_cron_cronjoblog`
--

LOCK TABLES `django_cron_cronjoblog` WRITE;
/*!40000 ALTER TABLE `django_cron_cronjoblog` DISABLE KEYS */;
INSERT INTO `django_cron_cronjoblog` VALUES (1,'TransLogix_djangoProject.delete_expired_lists','2025-03-03 20:25:51.367813','2025-03-03 20:25:51.401096',1,'',NULL);
/*!40000 ALTER TABLE `django_cron_cronjoblog` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'TransLogix_djangoProject','0001_initial','2024-10-11 14:39:10.443847'),(2,'TransLogix_djangoProject','0002_city_country_passenger_alter_route_options_and_more','2024-10-11 14:39:10.564846'),(3,'TransLogix_djangoProject','0003_manual2','2024-10-11 14:39:35.303955'),(4,'TransLogix_djangoProject','0004_manual3','2024-10-11 14:39:49.112039'),(5,'contenttypes','0001_initial','2024-10-11 14:46:24.706222'),(6,'admin','0001_initial','2024-10-11 14:46:24.919640'),(7,'admin','0002_logentry_remove_auto_add','2024-10-11 14:46:24.931644'),(8,'admin','0003_logentry_add_action_flag_choices','2024-10-11 14:46:24.940642'),(9,'contenttypes','0002_remove_content_type_name','2024-10-11 14:46:25.063108'),(10,'auth','0001_initial','2024-10-11 14:46:25.502298'),(11,'auth','0002_alter_permission_name_max_length','2024-10-11 14:46:25.653449'),(12,'auth','0003_alter_user_email_max_length','2024-10-11 14:46:25.664277'),(13,'auth','0004_alter_user_username_opts','2024-10-11 14:46:25.678761'),(14,'auth','0005_alter_user_last_login_null','2024-10-11 14:46:25.691620'),(15,'auth','0006_require_contenttypes_0002','2024-10-11 14:46:25.701827'),(16,'auth','0007_alter_validators_add_error_messages','2024-10-11 14:46:25.716846'),(17,'auth','0008_alter_user_username_max_length','2024-10-11 14:46:25.729216'),(18,'auth','0009_alter_user_last_name_max_length','2024-10-11 14:46:25.741679'),(19,'auth','0010_alter_group_name_max_length','2024-10-11 14:46:25.779171'),(20,'auth','0011_update_proxy_permissions','2024-10-11 14:46:25.798622'),(21,'auth','0012_alter_user_first_name_max_length','2024-10-11 14:46:25.813571'),(22,'sessions','0001_initial','2024-10-11 14:46:25.869738'),(23,'TransLogix_djangoProject','0005_alter_route_options_alter_trip_options_and_more','2024-10-11 15:08:14.377860'),(24,'TransLogix_djangoProject','0006_manual5','2024-10-11 15:25:04.005937'),(25,'TransLogix_djangoProject','0007_manual6','2024-10-11 15:26:45.577686'),(26,'TransLogix_djangoProject','0008_alter_route_options_alter_trip_options_and_more','2024-10-11 15:33:20.226116'),(27,'TransLogix_djangoProject','0009_district','2024-10-11 19:01:21.222947'),(28,'TransLogix_djangoProject','0010_remove_route_id_route_route_id','2024-10-13 10:48:57.643448'),(29,'TransLogix_djangoProject','0011_coordinatepoint_disrict','2024-10-13 11:36:18.608040'),(30,'TransLogix_djangoProject','0012_rename_disrict_coordinatepoint_district_and_more','2024-10-13 13:34:15.328590'),(31,'TransLogix_djangoProject','0013_rename_disrict_coordinatepoint_district','2024-10-13 13:36:01.573568'),(32,'TransLogix_djangoProject','0014_alter_route_estimated_time','2024-10-13 15:52:34.910322'),(33,'TransLogix_djangoProject','0015_alter_passenger_pickup_address','2024-10-15 08:14:41.266010'),(34,'TransLogix_djangoProject','0016_remove_passenger_pickup_address_and_more','2024-10-15 08:14:41.278016'),(35,'TransLogix_djangoProject','0017_rename_pickup_address_id_passenger_pickup_address','2024-10-15 16:31:37.621125'),(36,'TransLogix_djangoProject','0018_coordinatepoint_content_type_and_more','2024-10-15 17:37:56.304666'),(37,'TransLogix_djangoProject','0019_remove_passenger_pickup_address_and_more','2024-10-18 13:54:58.175582'),(38,'TransLogix_djangoProject','0020_alter_passenger_pickup_addresses','2024-10-22 13:03:21.141405'),(39,'TransLogix_djangoProject','0021_coordinatepoint_owner_id_coordinatepoint_owner_type','2024-10-26 18:42:43.782072'),(40,'TransLogix_djangoProject','0022_group_groupmembership','2024-10-27 08:55:06.322526'),(41,'TransLogix_djangoProject','0023_passenger_is_active_passenger_is_selected','2024-10-27 09:36:09.483882'),(42,'TransLogix_djangoProject','0024_coordinatepoint_is_active','2024-11-03 15:33:26.923358'),(43,'TransLogix_djangoProject','0025_remove_coordinatepoint_house_number_and_more','2024-11-11 15:54:18.188591'),(44,'TransLogix_djangoProject','0026_remove_coordinatepoint_house_and_more','2024-11-11 16:44:41.254818'),(45,'TransLogix_djangoProject','0027_remove_coordinatepoint_house_number_and_more','2024-11-11 17:41:06.580783'),(46,'TransLogix_djangoProject','0028_remove_driver_name_remove_driver_user_and_more','2024-12-23 21:40:29.795861'),(47,'TransLogix_djangoProject','0029_remove_driver_name_remove_driver_related_vehicles_and_more','2024-12-25 19:40:47.138908'),(48,'TransLogix_djangoProject','0030_remove_driver_name_remove_driver_related_vehicles_and_more','2024-12-25 20:00:51.037182'),(49,'TransLogix_djangoProject','0031_remove_vehicle_status_vehicle_active','2024-12-25 20:54:20.876314'),(50,'TransLogix_djangoProject','0032_driver_active','2024-12-25 20:56:25.612468'),(51,'TransLogix_djangoProject','0033_vehicle_image_url','2024-12-26 11:15:10.836299'),(52,'TransLogix_djangoProject','0034_driver_image_url','2024-12-26 18:35:06.938809'),(53,'TransLogix_djangoProject','0035_fueltype_drivervehicleassignment','2024-12-27 13:43:30.949617'),(54,'TransLogix_djangoProject','0036_alter_vehicle_fuel_type','2024-12-30 19:04:24.718312'),(55,'TransLogix_djangoProject','0037_alter_vehicle_fuel_type','2024-12-30 20:56:00.973945'),(56,'TransLogix_djangoProject','0038_alter_route_route_id_routepoint','2025-01-09 19:36:41.393071'),(57,'TransLogix_djangoProject','0039_alter_route_destination_alter_route_end_point_and_more','2025-01-09 20:16:26.493937'),(58,'TransLogix_djangoProject','0040_passengertriprequest','2025-01-09 21:10:05.441621'),(59,'TransLogix_djangoProject','0041_remove_passengertriprequest_planned_datetime_and_more','2025-01-16 16:35:47.838077'),(60,'TransLogix_djangoProject','0042_alter_passengertriprequest_direction','2025-01-16 17:32:03.961708'),(61,'TransLogix_djangoProject','0043_alter_passengertriprequest_direction','2025-01-16 18:02:26.363178'),(62,'TransLogix_djangoProject','0044_remove_passengertriprequest_endpoint_type','2025-01-16 18:54:27.742270'),(63,'TransLogix_djangoProject','0045_usersettings','2025-01-24 11:32:49.758087'),(64,'TransLogix_djangoProject','0046_usersettings_allow_multiple_work_addresses_and_more','2025-01-24 14:38:48.401074'),(65,'TransLogix_djangoProject','0047_orderedpassengerlist','2025-01-30 12:46:51.890598'),(68,'TransLogix_djangoProject','0048_rename_end_passenger_name_orderedpassengerlist','2025-03-03 19:31:10.206341'),(69,'TransLogix_djangoProject','0049_alter_passengertriprequest_options_and_more','2025-03-03 21:45:10.206341'),(70,'TransLogix_djangoProject','0050_temporarypassengerlist','2025-03-03 19:48:44.001269'),(71,'django_cron','0001_initial','2025-03-03 20:25:26.393529'),(72,'django_cron','0002_remove_max_length_from_CronJobLog_message','2025-03-03 20:25:26.402526'),(73,'django_cron','0003_cronjoblock','2025-03-03 20:25:26.461309'),(74,'django_cron','0004_rename_cronjoblog_code_is_success_ran_at_time_django_cron_code_89ad04_idx_and_more','2025-03-03 20:25:26.851414'),(75,'TransLogix_djangoProject','0051_remove_temporarypassengerlist_passengers_and_more','2025-03-03 22:15:11.500473'),(76,'TransLogix_djangoProject','0052_alter_temporarypassengerlist_session_id','2025-03-04 19:05:20.306532'),(77,'TransLogix_djangoProject','0053_routeplandraft_routedraftlist','2025-04-30 18:37:49.682689'),(78,'django_cron','0004_alter_cronjoblock_id_alter_cronjoblog_id','2025-04-30 18:37:49.734410'),(79,'TransLogix_djangoProject','0054_usersettings_save_usersettings_strategy','2025-05-01 19:08:01.646150'),(80,'TransLogix_djangoProject','0055_rename_save_usersettings_auto_save','2025-05-01 19:44:16.364519'),(81,'TransLogix_djangoProject','0056_add_route_tracking_fields','2025-10-14 15:13:07.089032');
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
INSERT INTO `django_session` VALUES ('7c5pfihft25a4sd5q2474g4risf4zcle','.eJxVjDEOwjAMRe-SGUWx07SEkZ0zVLZjSAElUtNOiLtDpQ6w_vfef5mR1iWPa9N5nJI5GTSH341JHlo2kO5UbtVKLcs8sd0Uu9NmLzXp87y7fweZWv7WXjlyh46E-6gDBi_EGjUEHxIqAPTCLrAT7NRfEY6QdHA-RkkIyub9AfCKOBg:1vvLvS:fscSyysCc6bNBdjur0kWulSCbuh6dirQ23KJYPQXtdc','2026-03-11 20:56:06.507784'),('7xwbp4atgs872jvzvyfqv3yyhbvomye3','.eJxVjDsOAiEUAO9CbQiwwKKlvWcg77eyaiDZT2W8uyHZQtuZybxVhn0reV9lyTOri3Lq9MsQ6Cm1C35AvTdNrW7LjLon-rCrvjWW1_Vo_wYF1tK3TsbkQwQxjOKTGy1ztAnPk_MGOQGOaOJgHUxAYaJITGScTwMAhkF9vusjOHk:1tVYu4:76Sw779hu-cH6ixRI9FGq4oyQg1_lYz7IXIZFaXOGIE','2025-01-22 16:27:32.684258'),('bx95shagisozxbbdmns8sm9p9yaen2p9','.eJxVjEEOgjAQRe_StWmGoR2sS_ecgQzTjqCmTSisjHdXEha6_e-9_zIDb-s0bDUtwxzNxaA5_W4jyyPlHcQ751uxUvK6zKPdFXvQavsS0_N6uH8HE9fpWxO1iYGceFUPjVcgxRaxVSI3JunYd1EhKKKD0KEQAjMGkTNDksa8P8_cN5E:1tNzL3:8cU9bpSJzQc1eJg2h_oXJA-mXja20sCUloos8rnZmA8','2025-01-01 19:04:05.398073'),('hig99lrailqup0iphbfafkdnjcs7xqys','.eJxVjMsOwiAQRf-FtSEDlJdL934DGWCQqoGktCvjv2uTLnR7zzn3xQJuaw3boCXMmZ2ZYKffLWJ6UNtBvmO7dZ56W5c58l3hBx382jM9L4f7d1Bx1G8Niii6aGNO1mpyVguQQqfJFy_LJIxDa1RRAnySYClLHYvHbAhAYPLs_QHaLjek:1szJF5:LYHt9Rd3KQd-ZfSwrv_P_eDc33EnldLgAiJ5ExsIp9w','2024-10-25 17:15:55.584668'),('r0tepcgr3uqsmjkr98jmzpdcfkij9h8e','.eJxVjDsOAiEUAO9CbQiwwKKlvWcg77eyaiDZT2W8uyHZQtuZybxVhn0reV9lyTOri3Lq9MsQ6Cm1C35AvTdNrW7LjLon-rCrvjWW1_Vo_wYF1tK3TsbkQwQxjOKTGy1ztAnPk_MGOQGOaOJgHUxAYaJITGScTwMAhkF9vusjOHk:1tdU3s:kH6nzZHXXGhl3pY69oGxu0q41yiQTv4ZD2tIjs-xVfI','2025-02-13 12:54:24.273667');
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
) ENGINE=InnoDB AUTO_INCREMENT=407 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_coordinatepoint`
--

LOCK TABLES `translogix_djangoproject_coordinatepoint` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_coordinatepoint` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_coordinatepoint` VALUES (78,'start',49.838300,24.029700,1,1,1,1,1,1,NULL,NULL,NULL,NULL,0,NULL),(79,'end',49.477200,23.586500,2,1,1,1,4,4,NULL,NULL,NULL,NULL,0,NULL),(80,'start',49.477200,23.586500,2,1,1,1,4,4,NULL,NULL,NULL,NULL,0,NULL),(81,'end',49.634700,23.672800,3,1,1,1,3,NULL,NULL,NULL,NULL,NULL,1,NULL),(82,'start',49.634700,23.672800,3,1,1,1,3,NULL,NULL,NULL,NULL,NULL,1,NULL),(83,'end',49.926600,24.146400,4,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(84,'start',49.926600,24.146400,4,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(85,'end',49.282600,24.359800,5,1,1,1,5,5,NULL,NULL,NULL,NULL,1,NULL),(86,'start',49.282600,24.359800,5,1,1,1,5,5,NULL,NULL,NULL,NULL,1,NULL),(87,'end',49.512300,24.413200,6,1,1,1,6,6,NULL,NULL,NULL,NULL,1,NULL),(88,'start',49.512300,24.413200,6,1,1,1,6,6,NULL,NULL,NULL,NULL,1,NULL),(89,'end',49.779100,23.806600,7,1,1,1,7,7,NULL,NULL,NULL,NULL,1,NULL),(90,'start',49.779100,23.806600,7,1,1,1,7,7,NULL,NULL,NULL,NULL,1,NULL),(91,'end',49.840600,23.504700,8,1,1,1,8,8,NULL,NULL,NULL,NULL,1,NULL),(92,'start',49.840600,23.504700,8,1,1,1,8,8,NULL,NULL,NULL,NULL,1,NULL),(93,'end',49.607100,23.915300,9,1,1,1,9,9,NULL,NULL,NULL,NULL,1,NULL),(94,'start',49.607100,23.915300,9,1,1,1,9,9,NULL,NULL,NULL,NULL,1,NULL),(95,'end',49.553500,24.084900,10,1,1,1,10,10,NULL,NULL,NULL,NULL,1,NULL),(96,'start',49.553500,24.084900,10,1,1,1,10,10,NULL,NULL,NULL,NULL,1,NULL),(97,'end',49.398100,23.517800,11,1,1,1,11,11,NULL,NULL,NULL,NULL,1,NULL),(98,'start',49.398100,23.517800,11,1,1,1,11,11,NULL,NULL,NULL,NULL,1,NULL),(99,'end',49.451700,23.699500,12,1,1,1,12,12,NULL,NULL,NULL,NULL,1,NULL),(100,'start',49.451700,23.699500,12,1,1,1,12,12,NULL,NULL,NULL,NULL,1,NULL),(101,'end',49.323500,24.007900,13,1,1,1,13,13,NULL,NULL,NULL,NULL,1,NULL),(102,'start',49.323500,24.007900,13,1,1,1,13,13,NULL,NULL,NULL,NULL,1,NULL),(103,'end',49.732500,23.570500,14,1,1,1,14,14,NULL,NULL,NULL,NULL,1,NULL),(104,'start',49.732500,23.570500,14,1,1,1,14,14,NULL,NULL,NULL,NULL,1,NULL),(105,'end',49.842900,24.015400,1,1,1,1,1,1,NULL,NULL,NULL,NULL,1,NULL),(106,'start',49.482200,23.592300,2,1,1,1,4,4,NULL,NULL,NULL,NULL,1,NULL),(107,'end',49.482200,23.592300,2,1,1,1,4,4,NULL,NULL,NULL,NULL,1,NULL),(108,'start',49.628800,23.678400,3,1,1,1,3,NULL,NULL,NULL,NULL,NULL,1,NULL),(109,'end',49.926600,24.150400,4,1,1,1,3,NULL,NULL,NULL,NULL,NULL,1,NULL),(110,'start',49.926600,24.150400,4,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(111,'end',49.288200,24.365900,5,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(112,'start',49.288200,24.365900,5,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(113,'end',49.517800,24.421400,6,1,1,1,6,6,NULL,NULL,NULL,NULL,1,NULL),(114,'start',49.517800,24.421400,6,1,1,1,6,6,NULL,NULL,NULL,NULL,1,NULL),(115,'end',49.783400,23.812900,7,1,1,1,7,7,NULL,NULL,NULL,NULL,1,NULL),(116,'start',49.783400,23.812900,7,1,1,1,7,7,NULL,NULL,NULL,NULL,1,NULL),(117,'end',49.845200,23.509200,8,1,1,1,8,8,NULL,NULL,NULL,NULL,1,NULL),(118,'start',49.845200,23.509200,8,1,1,1,8,8,NULL,NULL,NULL,NULL,1,NULL),(119,'end',49.612300,23.920700,9,1,1,1,9,9,NULL,NULL,NULL,NULL,1,NULL),(120,'start',49.612300,23.920700,9,1,1,1,9,9,NULL,NULL,NULL,NULL,1,NULL),(121,'end',49.559100,24.089200,10,1,1,1,10,10,NULL,NULL,NULL,NULL,1,NULL),(122,'start',49.559100,24.089200,10,1,1,1,10,10,NULL,NULL,NULL,NULL,1,NULL),(123,'end',49.402800,23.523900,11,1,1,1,11,11,NULL,NULL,NULL,NULL,1,NULL),(124,'start',49.402800,23.523900,11,1,1,1,11,11,NULL,NULL,NULL,NULL,1,NULL),(125,'end',49.458400,23.706200,12,1,1,1,12,12,NULL,NULL,NULL,NULL,1,NULL),(126,'start',49.458400,23.706200,12,1,1,1,12,12,NULL,NULL,NULL,NULL,1,NULL),(127,'end',49.329100,24.012600,13,1,1,1,13,13,NULL,NULL,NULL,NULL,1,NULL),(128,'start',49.329100,24.012600,13,1,1,1,13,13,NULL,NULL,NULL,NULL,1,NULL),(129,'end',49.738500,23.576300,14,1,1,1,14,14,NULL,NULL,NULL,NULL,1,NULL),(130,'start',49.738500,23.576300,14,1,1,1,14,14,NULL,NULL,NULL,NULL,1,NULL),(131,'end',49.846100,24.022700,1,1,1,1,1,1,NULL,NULL,NULL,NULL,1,NULL),(132,'start',49.485500,23.599100,2,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(133,'end',49.631700,23.681900,3,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(134,'start',49.931100,24.156700,4,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(135,'end',49.292900,24.372600,5,1,1,1,5,5,NULL,NULL,NULL,NULL,1,NULL),(136,'start',49.292900,24.372600,5,1,1,1,5,5,NULL,NULL,NULL,NULL,1,NULL),(137,'end',49.523300,24.429700,6,1,1,1,6,6,NULL,NULL,NULL,NULL,1,NULL),(138,'start',49.523300,24.429700,6,1,1,1,6,6,NULL,NULL,NULL,NULL,1,NULL),(139,'end',49.787400,23.818300,7,1,1,1,7,7,NULL,NULL,NULL,NULL,1,NULL),(140,'start',49.787400,23.818300,7,1,1,1,7,7,NULL,NULL,NULL,NULL,1,NULL),(141,'end',49.850400,23.514800,8,1,1,1,8,8,NULL,NULL,NULL,NULL,1,NULL),(142,'start',49.850400,23.514800,8,1,1,1,8,8,NULL,NULL,NULL,NULL,1,NULL),(143,'end',49.617900,23.926300,9,1,1,1,9,9,NULL,NULL,NULL,NULL,1,NULL),(144,'start',49.617900,23.926300,9,1,1,1,9,9,NULL,NULL,NULL,NULL,1,NULL),(145,'end',49.564700,24.095300,10,1,1,1,10,10,NULL,NULL,NULL,NULL,1,NULL),(146,'start',49.564700,24.095300,10,1,1,1,10,10,NULL,NULL,NULL,NULL,1,NULL),(147,'end',49.407400,23.530900,11,1,1,1,11,11,NULL,NULL,NULL,NULL,1,NULL),(148,'start',49.407400,23.530900,11,1,1,1,11,11,NULL,NULL,NULL,NULL,1,NULL),(149,'end',49.463900,23.712800,12,1,1,1,12,12,NULL,NULL,NULL,NULL,1,NULL),(150,'start',49.463900,23.712800,12,1,1,1,12,12,NULL,NULL,NULL,NULL,1,NULL),(151,'end',49.334600,24.018200,13,1,1,1,13,13,NULL,NULL,NULL,NULL,1,NULL),(152,'start',49.334600,24.018200,13,1,1,1,13,13,NULL,NULL,NULL,NULL,1,NULL),(153,'end',49.743900,23.582100,14,1,1,1,14,14,NULL,NULL,NULL,NULL,1,NULL),(154,'start',49.743900,23.582100,14,1,1,1,14,14,NULL,NULL,NULL,NULL,1,NULL),(155,'pickup',50.449850,30.523151,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(156,'dropoff',49.840063,24.023795,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(157,'work',48.614682,22.275662,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(158,'pickup',49.798296,24.056217,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(159,'dropoff',49.798296,24.056217,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(160,'work',49.801715,24.005329,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(161,'',49.669214,24.559317,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(162,'',49.385339,24.142183,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(163,'',49.854801,24.025761,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(164,'',49.856944,24.046954,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(165,'',49.858041,24.030578,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(166,'',50.078807,25.147894,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(167,'',49.856944,24.046954,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(168,'',49.858041,24.030578,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(169,'',50.078807,25.147894,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(170,'',49.856944,24.046954,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(171,'',49.858041,24.030578,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(172,'',50.078807,25.147894,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(173,'',49.841267,24.032281,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(174,'',49.841268,24.030678,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(175,'',50.078807,25.147894,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(176,'',49.841267,24.032281,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(177,'',49.841268,24.030678,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(178,'',50.078807,25.147894,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(179,'',49.841267,24.032281,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(180,'',49.841268,24.030678,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(181,'',50.078807,25.147894,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(182,'',49.841267,24.032281,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(183,'',49.841268,24.030678,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(184,'',50.078807,25.147894,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(185,'',49.841267,24.032281,1,NULL,NULL,NULL,NULL,149,NULL,NULL,NULL,NULL,1,102),(186,'',49.841268,24.030678,1,NULL,NULL,NULL,NULL,150,NULL,NULL,NULL,NULL,1,103),(187,'',50.078807,25.147894,1,NULL,NULL,NULL,NULL,151,NULL,NULL,NULL,NULL,1,104),(188,'',49.669214,24.559317,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(189,'',49.669851,24.552316,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(190,'',49.854801,24.025761,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(191,'',49.873185,23.946489,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(192,'',49.715484,23.905562,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(193,'',49.797306,24.054102,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(194,'pickup',49.839700,24.029700,26,1,NULL,12,NULL,61,NULL,NULL,NULL,NULL,1,NULL),(195,'dropoff',49.839000,24.029000,26,1,NULL,12,NULL,62,NULL,NULL,NULL,NULL,1,NULL),(196,'work',49.840000,24.030000,26,1,NULL,12,NULL,63,NULL,NULL,NULL,NULL,1,NULL),(197,'pickup',49.839700,24.029700,26,1,NULL,12,NULL,61,NULL,NULL,NULL,NULL,1,NULL),(198,'dropoff',49.839000,24.029000,26,1,NULL,12,NULL,62,NULL,NULL,NULL,NULL,1,NULL),(199,'work',49.840000,24.030000,26,1,NULL,12,NULL,63,NULL,NULL,NULL,NULL,1,NULL),(200,'pickup',49.839700,24.029700,26,1,NULL,12,NULL,61,NULL,NULL,NULL,NULL,1,NULL),(201,'dropoff',49.839000,24.029000,26,1,NULL,12,NULL,62,NULL,NULL,NULL,NULL,1,NULL),(202,'work',49.840000,24.030000,26,1,NULL,12,NULL,63,NULL,NULL,NULL,NULL,1,NULL),(203,'pickup',49.839700,24.029700,26,1,NULL,12,NULL,61,NULL,NULL,NULL,NULL,1,NULL),(204,'dropoff',49.839000,24.029000,26,1,NULL,12,NULL,62,NULL,NULL,NULL,NULL,1,NULL),(205,'work',49.840000,24.030000,26,1,NULL,12,NULL,63,NULL,NULL,NULL,NULL,1,NULL),(206,'pickup',49.839700,24.029700,26,1,NULL,12,NULL,64,NULL,NULL,NULL,NULL,1,NULL),(207,'dropoff',49.839000,24.029000,26,1,NULL,12,NULL,65,NULL,NULL,NULL,NULL,1,NULL),(208,'work',49.840000,24.030000,26,1,NULL,12,NULL,66,NULL,NULL,NULL,NULL,1,NULL),(209,'pickup',49.839700,24.029700,26,1,NULL,12,NULL,64,NULL,NULL,NULL,NULL,1,NULL),(210,'dropoff',49.839000,24.029000,26,1,NULL,12,NULL,65,NULL,NULL,NULL,NULL,1,NULL),(211,'work',49.840000,24.030000,26,1,NULL,12,NULL,66,NULL,NULL,NULL,NULL,1,NULL),(212,'pickup',49.839700,24.029700,26,1,NULL,12,NULL,64,NULL,NULL,NULL,NULL,1,NULL),(213,'dropoff',49.839000,24.029000,26,1,NULL,12,NULL,65,NULL,NULL,NULL,NULL,1,NULL),(214,'work',49.840000,24.030000,26,1,NULL,12,NULL,66,NULL,NULL,NULL,NULL,1,NULL),(215,'pickup',49.839700,24.029700,26,1,NULL,12,NULL,64,NULL,NULL,NULL,NULL,1,NULL),(216,'dropoff',49.839000,24.029000,26,1,NULL,12,NULL,65,NULL,NULL,NULL,NULL,1,NULL),(217,'work',49.840000,24.030000,26,1,NULL,12,NULL,66,NULL,NULL,NULL,NULL,1,NULL),(218,'pickup',49.253934,23.827237,5,1,NULL,12,NULL,152,NULL,NULL,NULL,NULL,1,105),(219,'dropoff',49.839000,24.029000,1,1,NULL,12,NULL,140,NULL,NULL,NULL,NULL,0,91),(220,'work',49.840000,24.030000,1,1,NULL,12,NULL,141,NULL,NULL,NULL,NULL,1,92),(221,'pickup',49.357500,23.512000,27,1,NULL,12,NULL,67,NULL,NULL,NULL,NULL,1,NULL),(222,'dropoff',49.515000,23.199000,28,1,NULL,12,NULL,68,NULL,NULL,NULL,NULL,1,NULL),(223,'work',49.839700,24.029700,26,1,NULL,12,NULL,69,NULL,NULL,NULL,NULL,1,NULL),(224,'pickup',49.256000,23.850000,29,1,NULL,12,NULL,70,NULL,NULL,NULL,NULL,1,NULL),(225,'dropoff',50.391500,24.231700,30,1,NULL,12,NULL,71,NULL,NULL,NULL,NULL,1,NULL),(226,'work',49.839700,24.029700,26,1,NULL,12,NULL,69,NULL,NULL,NULL,NULL,1,NULL),(227,'pickup',49.807800,24.892000,31,1,NULL,12,NULL,72,NULL,NULL,NULL,NULL,1,NULL),(228,'dropoff',50.081400,25.151500,32,1,NULL,12,NULL,73,NULL,NULL,NULL,NULL,1,NULL),(229,'work',49.839700,24.029700,26,1,NULL,12,NULL,69,NULL,NULL,NULL,NULL,1,NULL),(230,'pickup',49.357500,23.512000,27,1,NULL,12,NULL,67,NULL,NULL,NULL,NULL,1,NULL),(231,'pickup',49.256000,23.850000,29,1,NULL,12,NULL,70,NULL,NULL,NULL,NULL,1,NULL),(232,'dropoff',50.391500,24.231700,30,1,NULL,12,NULL,71,NULL,NULL,NULL,NULL,1,NULL),(233,'dropoff',49.807800,24.892000,31,1,NULL,12,NULL,72,NULL,NULL,NULL,NULL,1,NULL),(234,'work',49.839700,24.029700,26,1,NULL,12,NULL,69,NULL,NULL,NULL,NULL,1,NULL),(235,'pickup',49.357500,23.512000,27,1,NULL,12,NULL,67,NULL,NULL,NULL,NULL,1,NULL),(236,'pickup',49.256000,23.850000,29,1,NULL,12,NULL,70,NULL,NULL,NULL,NULL,1,NULL),(237,'dropoff',50.391500,24.231700,30,1,NULL,12,NULL,71,NULL,NULL,NULL,NULL,1,NULL),(238,'dropoff',49.807800,24.892000,31,1,NULL,12,NULL,72,NULL,NULL,NULL,NULL,1,NULL),(239,'work',49.839700,24.029700,26,1,NULL,12,NULL,69,NULL,NULL,NULL,NULL,1,NULL),(240,'pickup',49.357500,23.512000,27,1,NULL,12,NULL,67,NULL,NULL,NULL,NULL,1,NULL),(241,'pickup',49.256000,23.850000,29,1,NULL,12,NULL,70,NULL,NULL,NULL,NULL,1,NULL),(242,'dropoff',50.391500,24.231700,30,1,NULL,12,NULL,71,NULL,NULL,NULL,NULL,1,NULL),(243,'dropoff',49.807800,24.892000,31,1,NULL,12,NULL,72,NULL,NULL,NULL,NULL,1,NULL),(244,'work',49.839700,24.029700,26,1,NULL,12,NULL,69,NULL,NULL,NULL,NULL,1,NULL),(245,'pickup',50.081500,25.144800,32,1,NULL,12,NULL,73,NULL,NULL,NULL,NULL,1,NULL),(246,'pickup',49.350700,23.505100,27,1,NULL,12,NULL,74,NULL,NULL,NULL,NULL,1,NULL),(247,'dropoff',49.518600,23.199800,28,1,NULL,12,NULL,75,NULL,NULL,NULL,NULL,1,NULL),(248,'dropoff',49.810200,24.893200,31,1,NULL,12,NULL,76,NULL,NULL,NULL,NULL,1,NULL),(249,'work',49.856600,24.025600,26,1,NULL,12,NULL,77,NULL,NULL,NULL,NULL,1,NULL),(250,'dropoff',49.856600,24.025600,26,1,NULL,12,NULL,77,NULL,NULL,NULL,NULL,1,NULL),(251,'pickup',49.350700,23.505100,27,1,NULL,12,NULL,74,NULL,NULL,NULL,NULL,1,NULL),(252,'pickup',49.518600,23.199800,28,1,NULL,12,NULL,78,NULL,NULL,NULL,NULL,1,NULL),(253,'dropoff',49.810200,24.893200,33,1,NULL,12,NULL,79,NULL,NULL,NULL,NULL,1,NULL),(255,'dropoff',49.825000,23.505500,34,1,NULL,12,NULL,80,NULL,NULL,NULL,NULL,1,NULL),(256,'work',49.856600,24.025600,26,1,NULL,12,NULL,77,NULL,NULL,NULL,NULL,1,NULL),(257,'pickup',49.799535,24.053083,35,1,NULL,28,NULL,81,NULL,NULL,NULL,NULL,1,NULL),(258,'dropoffAddresses',49.821055,23.962606,35,1,NULL,28,NULL,82,NULL,NULL,NULL,NULL,1,NULL),(259,'work',49.858920,24.033717,35,1,NULL,28,NULL,83,NULL,NULL,NULL,NULL,1,NULL),(260,'pickup',49.799535,24.053083,35,1,NULL,28,NULL,81,NULL,NULL,NULL,NULL,1,NULL),(261,'dropoffAddresses',49.821055,23.962606,35,1,NULL,28,NULL,82,NULL,NULL,NULL,NULL,1,NULL),(262,'work',49.858920,24.033717,35,1,NULL,28,NULL,83,NULL,NULL,NULL,NULL,1,NULL),(263,'pickup',49.799535,24.053083,35,1,NULL,28,NULL,81,NULL,NULL,NULL,NULL,1,NULL),(264,'pickup',49.799535,24.053083,35,1,NULL,28,NULL,81,NULL,NULL,NULL,NULL,1,NULL),(265,'dropoff',49.821055,23.962606,35,1,NULL,28,NULL,82,NULL,NULL,NULL,NULL,1,NULL),(266,'work',49.839683,24.029717,35,1,NULL,28,NULL,84,NULL,NULL,NULL,NULL,1,NULL),(267,'pickup',49.799535,24.053083,35,1,NULL,28,NULL,81,NULL,NULL,NULL,NULL,1,NULL),(268,'dropoff',49.821055,23.962606,35,1,NULL,28,NULL,82,NULL,NULL,NULL,NULL,1,NULL),(269,'work',49.839683,24.029717,35,1,NULL,28,NULL,84,NULL,NULL,NULL,NULL,1,NULL),(270,'pickup',49.799535,24.053083,35,1,NULL,28,NULL,81,NULL,NULL,NULL,NULL,1,NULL),(271,'dropoff',49.821055,23.962606,35,1,NULL,28,NULL,82,NULL,NULL,NULL,NULL,1,NULL),(272,'work',49.839683,24.029717,35,1,NULL,28,NULL,84,NULL,NULL,NULL,NULL,1,NULL),(273,'pickup',49.799535,24.053083,35,1,NULL,28,NULL,81,NULL,NULL,NULL,NULL,1,NULL),(274,'dropoff',49.821055,23.962606,35,1,NULL,28,NULL,82,NULL,NULL,NULL,NULL,1,NULL),(275,'work',49.839683,24.029717,35,1,NULL,28,NULL,84,NULL,NULL,NULL,NULL,1,NULL),(276,'pickup',49.827929,23.967424,35,1,NULL,28,NULL,85,NULL,NULL,NULL,NULL,1,NULL),(277,'dropoff',49.829204,23.967849,35,1,NULL,28,NULL,85,NULL,NULL,NULL,NULL,1,NULL),(278,'work',49.879670,24.037842,35,1,NULL,28,NULL,86,NULL,NULL,NULL,NULL,1,NULL),(279,'pickup',49.799535,24.053083,37,1,NULL,29,NULL,88,NULL,NULL,NULL,NULL,1,NULL),(280,'pickup',49.799535,24.053083,37,1,NULL,29,NULL,88,NULL,NULL,NULL,NULL,1,NULL),(281,'pickup',49.799535,24.053083,39,1,NULL,31,NULL,90,NULL,NULL,NULL,NULL,1,NULL),(282,'pickup',49.799535,24.053083,39,1,NULL,31,NULL,90,NULL,NULL,NULL,NULL,1,NULL),(283,'pickup',49.799535,24.053083,39,1,NULL,31,NULL,90,NULL,NULL,NULL,NULL,1,NULL),(284,'pickup',49.828700,24.031637,41,1,NULL,32,NULL,92,NULL,NULL,NULL,NULL,1,NULL),(285,'pickup',49.839683,24.029717,41,1,NULL,32,NULL,94,NULL,NULL,NULL,NULL,1,NULL),(286,'pickup',49.839683,24.029717,41,1,NULL,32,NULL,94,NULL,NULL,NULL,NULL,1,NULL),(287,'dropoff',49.821055,23.962606,41,1,NULL,32,NULL,95,NULL,NULL,NULL,NULL,1,NULL),(288,'pickup',49.839700,24.029700,43,1,NULL,32,NULL,96,NULL,NULL,NULL,NULL,1,NULL),(289,'dropoff',50.450100,30.523400,44,1,NULL,32,NULL,97,NULL,NULL,NULL,NULL,1,NULL),(290,'work',51.165700,10.451500,45,1,NULL,32,NULL,98,NULL,NULL,NULL,NULL,1,NULL),(291,'pickup',49.839700,24.029700,46,1,NULL,33,NULL,99,NULL,NULL,NULL,NULL,1,NULL),(292,'dropoff',50.450100,30.523400,47,1,NULL,33,NULL,100,NULL,NULL,NULL,NULL,1,NULL),(293,'work',51.165700,10.451500,48,1,NULL,33,NULL,101,NULL,NULL,NULL,NULL,1,NULL),(294,'pickup',49.839700,24.029700,49,1,NULL,34,NULL,102,NULL,NULL,NULL,NULL,1,NULL),(295,'dropoff',50.450100,30.523400,50,1,NULL,35,NULL,103,NULL,NULL,NULL,NULL,1,NULL),(296,'work',51.165700,10.451500,51,1,NULL,36,NULL,104,NULL,NULL,NULL,NULL,1,NULL),(297,'pickup',49.839700,24.029700,49,1,NULL,34,NULL,102,NULL,NULL,NULL,NULL,1,NULL),(298,'dropoff',50.450100,30.523400,50,1,NULL,35,NULL,103,NULL,NULL,NULL,NULL,1,NULL),(299,'work',51.165700,10.451500,51,1,NULL,36,NULL,104,NULL,NULL,NULL,NULL,1,NULL),(300,'pickup',49.265608,23.843134,52,6,NULL,37,NULL,105,NULL,NULL,NULL,NULL,1,NULL),(301,'dropoff',50.450100,30.523400,53,6,NULL,38,NULL,106,NULL,NULL,NULL,NULL,1,NULL),(302,'work',51.165700,10.451500,54,6,NULL,39,NULL,107,NULL,NULL,NULL,NULL,1,NULL),(303,'pickup',49.265608,23.843134,52,6,NULL,37,NULL,105,NULL,NULL,NULL,NULL,1,NULL),(304,'dropoff',50.450100,30.523400,53,6,NULL,38,NULL,106,NULL,NULL,NULL,NULL,1,NULL),(305,'work',51.165700,10.451500,54,6,NULL,39,NULL,107,NULL,NULL,NULL,NULL,1,NULL),(306,'pickup',49.265608,23.843134,52,6,NULL,37,NULL,105,NULL,NULL,NULL,NULL,1,NULL),(307,'dropoff',50.450100,30.523400,53,6,NULL,38,NULL,106,NULL,NULL,NULL,NULL,1,NULL),(308,'work',51.165700,10.451500,54,6,NULL,39,NULL,107,NULL,NULL,NULL,NULL,1,NULL),(309,'pickup',49.255228,23.830535,52,6,NULL,37,NULL,108,NULL,NULL,NULL,NULL,1,NULL),(310,'dropoff',50.450100,30.523400,53,6,NULL,38,NULL,106,NULL,NULL,NULL,NULL,1,NULL),(311,'work',51.165700,10.451500,54,6,NULL,39,NULL,107,NULL,NULL,NULL,NULL,1,NULL),(312,'pickup',49.255228,23.830535,52,6,NULL,37,NULL,108,NULL,NULL,NULL,NULL,1,NULL),(313,'dropoff',50.450100,30.523400,53,6,NULL,38,NULL,106,NULL,NULL,NULL,NULL,1,NULL),(314,'work',51.165700,10.451500,54,6,NULL,39,NULL,107,NULL,NULL,NULL,NULL,1,NULL),(315,'pickup',49.305251,23.526619,55,6,NULL,37,NULL,109,NULL,NULL,NULL,NULL,1,NULL),(316,'dropoff',50.450100,30.523400,53,6,NULL,38,NULL,106,NULL,NULL,NULL,NULL,1,NULL),(317,'work',51.165700,10.451500,54,6,NULL,39,NULL,107,NULL,NULL,NULL,NULL,1,NULL),(318,'pickup',49.305251,23.526619,2,1,2,1,1,110,NULL,NULL,242,'passenger',1,NULL),(319,'pickup',50.084357,25.144362,7,1,2,1,3,111,NULL,NULL,243,'passenger',1,NULL),(320,'pickup',50.084357,25.144362,7,1,2,1,3,111,NULL,NULL,243,'passenger',1,NULL),(321,'dropoff',50.078807,25.147894,7,1,2,1,3,112,NULL,NULL,243,'passenger',1,NULL),(322,'work',49.839683,24.029717,1,1,2,1,1,113,NULL,NULL,243,'passenger',1,NULL),(323,'pickup',49.527173,23.975779,9,1,2,1,9,114,NULL,NULL,244,'passenger',1,116),(324,'dropoff',49.526859,23.977128,9,1,2,1,9,115,NULL,NULL,244,'passenger',1,131),(325,'work',49.858363,24.031239,1,1,2,1,1,113,NULL,NULL,244,'passenger',1,118),(326,'pickup',49.808366,24.043205,1,1,2,1,1,116,NULL,NULL,245,'passenger',1,NULL),(327,'dropoff',49.786614,24.068314,1,1,2,1,1,117,NULL,NULL,245,'passenger',1,NULL),(328,'work',49.852615,24.020734,1,1,2,1,1,118,NULL,NULL,245,'passenger',1,NULL),(329,'pickup',49.808366,24.043205,1,1,2,1,1,116,NULL,NULL,245,'passenger',1,NULL),(330,'dropoff',49.786614,24.068314,1,1,2,1,1,117,NULL,NULL,245,'passenger',1,NULL),(331,'work',49.852615,24.020734,1,1,2,1,1,118,NULL,NULL,245,'passenger',1,NULL),(332,'pickup',49.808366,24.043205,1,1,2,1,1,116,NULL,NULL,245,'passenger',1,NULL),(333,'dropoff',49.786614,24.068314,1,1,2,1,1,117,NULL,NULL,245,'passenger',1,NULL),(334,'work',49.852615,24.020734,1,1,2,1,1,118,NULL,NULL,245,'passenger',1,NULL),(335,'pickup',49.808366,24.043205,1,1,2,1,1,116,NULL,NULL,245,'passenger',1,NULL),(336,'dropoff',49.786614,24.068314,1,1,2,1,1,117,NULL,NULL,245,'passenger',1,NULL),(337,'work',49.852615,24.020734,1,1,2,1,1,118,NULL,NULL,245,'passenger',1,NULL),(338,'pickup',49.808366,24.043205,1,1,2,1,1,116,NULL,NULL,245,'passenger',1,NULL),(339,'dropoff',49.786614,24.068314,1,1,2,1,1,117,NULL,NULL,245,'passenger',1,NULL),(340,'work',49.852615,24.020734,1,1,2,1,1,118,NULL,NULL,245,'passenger',1,NULL),(341,'pickup',49.843251,24.039446,1,1,2,1,1,122,NULL,NULL,248,'passenger',1,NULL),(342,'dropoff',49.826858,24.027894,1,1,2,1,1,123,NULL,NULL,248,'passenger',1,NULL),(343,'work',49.839683,24.029717,1,1,2,1,1,113,NULL,NULL,248,'passenger',1,NULL),(344,'pickup',49.843251,24.039446,1,1,2,1,1,122,NULL,NULL,248,'passenger',0,NULL),(345,'dropoff',49.826858,24.027894,1,1,2,1,1,123,NULL,NULL,248,'passenger',1,NULL),(346,'work',49.839683,24.029717,1,1,2,1,1,113,NULL,NULL,248,'passenger',0,NULL),(347,'pickup',49.843251,24.039446,1,1,2,1,1,122,NULL,NULL,248,'passenger',0,NULL),(348,'dropoff',49.826858,24.027894,1,1,2,1,1,123,NULL,NULL,248,'passenger',1,NULL),(349,'work',49.839683,24.029717,1,1,2,1,1,113,NULL,NULL,248,'passenger',0,NULL),(350,'pickup',49.843251,24.039446,1,1,2,1,1,122,NULL,NULL,248,'passenger',0,NULL),(351,'dropoff',49.826858,24.027894,1,1,2,1,1,123,NULL,NULL,248,'passenger',1,NULL),(352,'work',49.839683,24.029717,1,1,2,1,1,113,NULL,NULL,248,'passenger',0,NULL),(353,'pickup',49.843251,24.039446,1,1,2,1,1,122,NULL,NULL,248,'passenger',0,NULL),(354,'dropoff',49.826858,24.027894,1,1,2,1,1,123,NULL,NULL,248,'passenger',1,NULL),(355,'work',49.839683,24.029717,1,1,2,1,1,113,NULL,NULL,248,'passenger',0,NULL),(356,'pickup',49.843251,24.039446,1,1,2,1,1,122,NULL,NULL,248,'passenger',0,NULL),(357,'dropoff',49.826858,24.027894,1,1,2,1,1,123,NULL,NULL,248,'passenger',1,NULL),(358,'work',49.839683,24.029717,1,1,2,1,1,113,NULL,NULL,248,'passenger',0,NULL),(359,'pickup',49.843251,24.039446,1,1,2,1,1,122,NULL,NULL,248,'passenger',0,NULL),(360,'dropoff',49.826858,24.027894,1,1,2,1,1,123,NULL,NULL,248,'passenger',1,NULL),(361,'work',49.839683,24.029717,1,1,2,1,1,113,NULL,NULL,248,'passenger',0,NULL),(362,'pickup',49.358012,23.512319,2,1,2,1,2,124,NULL,NULL,249,'passenger',1,86),(363,'dropoff',49.358012,23.512319,2,1,2,1,2,124,NULL,NULL,249,'passenger',0,93),(364,'work',49.833722,23.990649,1,1,2,1,1,120,NULL,NULL,249,'passenger',1,87),(365,'pickup',49.111111,23.111111,16,1,2,1,8,125,NULL,NULL,250,'passenger',1,123),(366,'dropoff',50.523000,24.345448,16,1,2,1,4,136,NULL,NULL,250,'passenger',1,85),(367,'work',49.858279,24.030269,1,1,2,1,1,113,NULL,NULL,250,'passenger',1,81),(368,'pickup',49.511000,23.192705,4,1,2,1,1,155,NULL,NULL,250,'passenger',1,111),(369,'pickup',49.522000,23.979996,9,1,2,1,1,135,NULL,NULL,250,'passenger',1,84),(370,'dropoff',49.800620,24.062792,1,1,2,1,1,130,NULL,NULL,250,'passenger',0,120),(371,'work',49.858279,24.030269,1,1,2,1,1,113,NULL,NULL,250,'passenger',1,81),(372,'pickup',50.055912,23.976305,17,1,2,1,1,134,NULL,NULL,209,'passenger',0,73),(373,'dropoff',49.831294,23.989672,1,1,2,1,1,120,NULL,NULL,209,'passenger',0,74),(374,'work',49.839683,24.029717,56,1,2,1,1,133,NULL,NULL,209,'passenger',0,68),(375,'pickup',49.259117,23.852535,5,1,2,1,1,137,NULL,NULL,246,'passenger',0,88),(376,'pickup',49.254471,23.843767,5,1,2,1,1,152,NULL,NULL,246,'passenger',1,132),(377,'dropoff',49.257038,23.818409,5,1,2,1,1,162,NULL,NULL,246,'passenger',1,133),(378,'work',49.858782,24.027108,1,1,2,1,1,113,NULL,NULL,246,'passenger',1,56),(379,'pickup',49.520715,23.206550,4,1,2,1,1,142,NULL,NULL,246,'passenger',0,94),(380,'pickup',50.106825,24.343689,16,1,2,1,8,144,NULL,NULL,194,'passenger',1,96),(381,'pickup',49.843930,24.038682,1,1,2,1,1,145,NULL,NULL,194,'passenger',0,97),(382,'pickup',49.837449,23.976017,1,1,2,1,1,146,NULL,NULL,194,'passenger',1,98),(383,'pickup',49.808366,24.043205,1,1,2,1,1,116,NULL,NULL,194,'passenger',1,99),(384,'pickup',49.672324,24.555026,15,1,2,1,10,147,NULL,NULL,194,'passenger',1,100),(385,'dropoff',49.350763,23.506251,2,1,2,1,2,148,NULL,NULL,194,'passenger',0,101),(386,'pickup',49.980217,24.077833,56,1,2,1,7,154,NULL,NULL,247,'passenger',1,109),(387,'dropoff',49.980217,24.077833,56,1,2,1,7,154,NULL,NULL,247,'passenger',1,110),(388,'work',49.855050,24.027836,1,1,2,1,1,118,NULL,NULL,247,'passenger',1,108),(389,'pickup',49.833558,24.007984,1,1,2,1,1,165,NULL,NULL,251,'passenger',1,141),(390,'pickup',49.715483,23.905562,22,1,2,1,11,163,NULL,NULL,252,'passenger',1,135),(391,'pickup',49.798106,24.057687,1,1,2,1,1,128,NULL,NULL,209,'passenger',1,134),(392,'pickup',49.799535,24.053083,1,1,2,1,1,128,NULL,NULL,253,'passenger',1,136),(393,'pickup',49.827957,24.030648,1,1,2,1,1,123,NULL,NULL,254,'passenger',1,137),(394,'work',49.858920,24.033717,1,1,2,1,1,164,NULL,NULL,251,'passenger',1,138),(395,'work',49.858920,24.033717,1,1,2,1,1,164,NULL,NULL,252,'passenger',1,138),(396,'work',49.858920,24.033717,1,1,2,1,1,164,NULL,NULL,194,'passenger',1,138),(397,'pickup',49.831327,23.989692,1,1,2,1,1,120,NULL,NULL,100,'passenger',1,64),(398,'work',49.858920,24.033717,1,1,2,1,1,164,NULL,NULL,100,'passenger',1,138),(399,'pickup',49.828917,24.044909,1,1,2,1,1,123,NULL,NULL,187,'passenger',1,139),(400,'work',49.856845,24.021916,1,1,2,1,1,164,NULL,NULL,187,'passenger',1,138),(401,'pickup',49.358012,23.512319,2,1,2,1,2,110,NULL,NULL,141,'passenger',1,142),(402,'work',49.858920,24.033717,1,1,2,1,1,164,NULL,NULL,141,'passenger',1,138),(403,'pickup',49.806058,24.004535,1,1,2,1,1,29,NULL,NULL,177,'passenger',1,143),(404,'work',49.858920,24.033717,1,1,2,1,1,164,NULL,NULL,177,'passenger',1,138),(405,'pickup',49.798296,24.056217,1,1,2,1,1,128,NULL,NULL,255,'passenger',1,136),(406,'work',49.821055,23.962606,1,1,2,1,1,166,NULL,NULL,255,'passenger',1,144);
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
INSERT INTO `translogix_djangoproject_driver` VALUES (1,'Україна','Гіг контракт',5,'test.driver@example.com','Микола','B','2020-01-01','МВС','Рафшанович','Kyiv, Khreshchatyk 1','Kyiv, Independence Square 5',1985,'Забудько','+380123456789','AB123456',1,'https://st.depositphotos.com/19430740/54936/i/1600/depositphotos_549361354-stock-photo-masculine-perfumery-bearded-man-in.jpg'),(3,'Україна','працівник',10,'test.driver2@example.com','Джамшут','D','1999-01-01','МВС','Арнольдович','Стрий, Ринок 7','Стрий, Львівська 11',1986,'Загубитько','+380673332222','AB1234AA',1,'https://st.depositphotos.com/19430740/54936/i/1600/depositphotos_549361354-stock-photo-masculine-perfumery-bearded-man-in.jpg'),(4,'Україна','ФОП',15,'mykola@gmail.com','Мойша','С,Д','1987-01-01','МВС','Петрович','Львів, Замарстинівська 15','Львів, Замарстинівська 15',1979,'Забухайко','+380671111111','АА11111',1,'https://bkit.com.ua/uploadfiles/admin/vo.jpg'),(6,'Україна','ФОП',20,'mychailo@gmail.com','Михайло','С,Д','1988-01-01','МВС','Михайлович','Львів, Сихівська 10','Львів, Сихівська 10',1988,'Роботящий','+380672222445','АА11111',1,'https://st.depositphotos.com/19430740/54936/i/1600/depositphotos_549361354-stock-photo-masculine-perfumery-bearded-man-in.jpg'),(7,'Україна','ФОП',20,'shumacher@gmail.com','Міхаель','С,Д','1999-01-29','МВС','Іванович','Львів, Персенківка 12','Стрийська 7',1988,'Шумахер','+380674444444','АА222222',1,'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/01/03/12/schumacher-afp.jpg?quality=75&width=1250&crop=3%3A2%2Csmart&auto=webp'),(8,'Україна','ФОП',20,'arnold@gmail.com','Арнольд','С,Д','1999-01-01','МВСУ','Артурович','Львів, Любінська 30','Львів, Любінська 30',1988,'Вумний','+380672333111','АА11111',1,'https://st.depositphotos.com/19430740/54936/i/1600/depositphotos_549361354-stock-photo-masculine-perfumery-bearded-man-in.jpg');
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
INSERT INTO `translogix_djangoproject_drivervehicleassignment` VALUES (39,'2025-01-02','NPL-000001',NULL,0,4,1),(40,'2025-01-03','NPL-000000',NULL,0,1,2),(41,'2025-01-03','NPL-000000',NULL,0,3,1),(42,'2025-01-03','NPL-000000',NULL,0,3,3),(43,'2025-01-03','NPL-000000',NULL,0,4,2),(44,'2025-01-03','NPL-000000',NULL,0,4,1),(45,'2025-01-03','NPL-000000',NULL,0,4,3),(46,'2025-01-03','NPL-000000',NULL,0,4,1),(47,'2025-01-03','NPL-000000',NULL,0,4,1),(48,'2025-01-03','NPL-000000',NULL,0,4,5),(49,'2025-01-03','NPL-000000',NULL,0,7,1),(50,'2025-01-03','NPL-000000',NULL,1,7,4),(51,'2025-01-03','NPL-000000',NULL,0,3,2),(52,'2025-01-03','NPL-000000',NULL,0,3,3),(53,'2025-01-03','NPL-000000',NULL,0,4,3),(54,'2025-01-03','NPL-000000',NULL,1,6,1),(55,'2025-01-03','NPL-000000',NULL,0,4,4),(56,'2025-01-03','NPL-000000',NULL,1,1,1),(57,'2025-01-03','NPL-000000',NULL,1,1,2),(58,'2025-01-03','NPL-000000',NULL,0,3,2),(59,'2025-01-03','NPL-000000',NULL,0,4,1),(60,'2025-01-03','NPL-000000',NULL,1,4,3),(61,'2025-01-03','NPL-000000',NULL,1,6,5),(62,'2025-01-03','NPL-000000',NULL,1,4,1),(63,'2025-01-03','NPL-000000',NULL,0,3,7),(64,'2025-01-03','NPL-000000',NULL,0,3,3),(65,'2025-01-03','NPL-000000',NULL,0,3,1),(66,'2025-01-03','NPL-000000',NULL,0,3,1),(67,'2025-01-03','NPL-000000',NULL,0,3,5),(68,'2025-01-03','NPL-000000',NULL,0,3,2),(69,'2025-01-03','NPL-000000',NULL,1,3,1),(70,'2025-01-03','NPL-000000',NULL,1,8,2),(71,'2025-01-03','NPL-000000',NULL,0,1,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_house`
--

LOCK TABLES `translogix_djangoproject_house` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_house` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_house` VALUES (1,'1',1),(2,'25',1),(3,'12',2),(4,'7',3),(5,'10',4),(6,'18',5),(7,'22',6),(8,'5',7),(9,'9',8),(10,'3',9),(11,'16',10),(12,'12',11),(13,'34',12),(14,'5',13),(15,'7',14),(16,'9',15),(17,'1',16),(18,'8',17),(19,'11',18),(20,'19',19),(21,'24',20),(22,'7',21),(23,'14',22),(24,'2',23),(25,'4',24),(26,'8',25),(27,'3',26),(28,'17',27),(29,'10',28),(30,'1',29),(143,'10',29),(31,'15',30),(32,'6',31),(33,'12',32),(34,'9',33),(35,'2',34),(36,'8',35),(37,'5',36),(38,'14',37),(39,'19',38),(40,'11',39),(41,'7',40),(42,'9',41),(43,'13',42),(44,'16',43),(45,'21',44),(46,'5',45),(47,'12',46),(48,'7',47),(49,'18',48),(50,'4',49),(51,'8',50),(142,'15',110),(118,'1460',113),(115,'22',113),(81,'25',113),(56,'52',113),(113,'22',114),(116,'33',114),(114,'22',115),(117,'33',115),(131,'44',115),(99,'15',116),(108,'2',118),(67,'10',120),(87,'12',120),(63,'18',120),(64,'20',120),(69,'28',120),(66,'30',120),(70,'31',120),(74,'50',120),(140,'15',123),(137,'20',123),(139,'7',123),(86,'12',124),(93,'22',124),(52,'1',125),(122,'10',125),(82,'18',125),(123,'22',125),(76,'25',125),(57,'10',126),(79,'25',126),(54,'7',126),(53,'15',127),(136,'10',128),(134,'12',128),(55,'22',128),(58,'30',128),(80,'25',130),(59,'30',130),(120,'4',130),(60,'15',131),(78,'25',131),(61,'40',131),(62,'15',132),(83,'18',132),(77,'25',132),(65,'10',133),(68,'17',133),(75,'50',133),(71,'31',134),(72,'34',134),(73,'50',134),(84,'18',135),(85,'25',136),(88,'2',137),(89,'2',138),(90,'20',139),(91,'20',140),(92,'20',141),(94,'11',142),(95,'2',143),(96,'22',144),(97,'10',145),(98,'10',146),(100,'22',147),(101,'1',148),(102,'50',149),(103,'152',150),(104,'44',151),(132,'2',152),(105,'20',152),(106,'10',153),(107,'25',153),(109,'10',154),(110,'25',154),(111,'18',155),(112,'15',156),(121,'2',156),(119,'4444',156),(124,'1',157),(125,'10',157),(126,'12',157),(127,'12',158),(128,'12',159),(129,'12',160),(130,'12',161),(133,'11',162),(135,'12',163),(138,'52',164),(141,'15',165),(144,'19',166);
/*!40000 ALTER TABLE `translogix_djangoproject_house` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_orderedpassengerlist`
--

DROP TABLE IF EXISTS `translogix_djangoproject_orderedpassengerlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_orderedpassengerlist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `start_city` varchar(255) NOT NULL,
  `start_street` varchar(255) NOT NULL,
  `start_building` varchar(50) NOT NULL,
  `start_latitude` double NOT NULL,
  `start_longitude` double NOT NULL,
  `end_passenger_last_name` varchar(255) NOT NULL,
  `start_passenger_id` int DEFAULT NULL,
  `start_address_type` varchar(20) NOT NULL,
  `start_coordinate_id` int DEFAULT NULL,
  `start_request_id` int DEFAULT NULL,
  `end_city` varchar(255) NOT NULL,
  `end_street` varchar(255) NOT NULL,
  `end_building` varchar(50) NOT NULL,
  `end_latitude` double NOT NULL,
  `end_longitude` double NOT NULL,
  `end_passenger_first_name` varchar(255) NOT NULL,
  `end_passenger_id` int DEFAULT NULL,
  `end_address_type` varchar(20) NOT NULL,
  `end_coordinate_id` int DEFAULT NULL,
  `end_request_id` int DEFAULT NULL,
  `direction` varchar(20) NOT NULL,
  `estimated_start_time` datetime(6) NOT NULL,
  `estimated_end_time` datetime(6) NOT NULL,
  `estimated_travel_time` int unsigned NOT NULL,
  `estimated_wait_time` int unsigned NOT NULL,
  `has_both_directions` tinyint(1) NOT NULL,
  `route_distance_km` double NOT NULL,
  `stop_count` int unsigned NOT NULL,
  `passenger_count` int unsigned NOT NULL,
  `multiple_work_addresses_allowed` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `allow_copy` tinyint(1) NOT NULL,
  `allow_edit` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `deactivated_at` datetime(6) DEFAULT NULL,
  `assigned_route_id_id` int DEFAULT NULL,
  `start_passenger_first_name` varchar(255) NOT NULL,
  `start_passenger_last_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_assigned_route_id_id_e57c3e45_fk_TransLogi` (`assigned_route_id_id`),
  CONSTRAINT `TransLogix_djangoPro_assigned_route_id_id_e57c3e45_fk_TransLogi` FOREIGN KEY (`assigned_route_id_id`) REFERENCES `translogix_djangoproject_route` (`route_id`),
  CONSTRAINT `translogix_djangoproject_orderedpassengerlist_chk_1` CHECK ((`estimated_travel_time` >= 0)),
  CONSTRAINT `translogix_djangoproject_orderedpassengerlist_chk_2` CHECK ((`estimated_wait_time` >= 0)),
  CONSTRAINT `translogix_djangoproject_orderedpassengerlist_chk_3` CHECK ((`stop_count` >= 0)),
  CONSTRAINT `translogix_djangoproject_orderedpassengerlist_chk_4` CHECK ((`passenger_count` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_orderedpassengerlist`
--

LOCK TABLES `translogix_djangoproject_orderedpassengerlist` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_orderedpassengerlist` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_orderedpassengerlist` VALUES (95,'Львів','Східна','',49.839683,24.029717,'Арменович',248,'pickup',343,464,'Пустомити','Вуйківська','12',49.715483,23.905562,'Арнольд',252,'dropoff',390,570,'WORK_TO_HOME','2025-02-24 14:40:00.000000','2025-02-24 13:30:12.000000',0,10,0,0,2,4,0,1,1,1,'2025-09-24 11:26:47.474497','2025-09-24 11:26:47.474497',NULL,NULL,'Ася','Апанасова'),(97,'Львів','вулиця Східна','52',49.85892,24.033717,'Абрекович',251,'pickup',394,220,'Стрий','Шевченка','2',49.254471,23.843767,'Абукасим',246,'dropoff',376,272,'WORK_TO_HOME','2025-02-24 16:00:00.000000','2025-02-24 13:20:31.000000',0,10,0,0,1,3,0,1,1,1,'2025-09-25 07:37:37.290333','2025-09-25 07:37:37.290333',NULL,NULL,'Алібаба','Алібаєвич'),(98,'Львів','вулиця Східна','52',49.85892,24.033717,'Апанасова',177,'pickup',404,622,'Львів','вулиця Міклухо-Маклая','',49.843251,24.039446,'Ася',248,'dropoff',341,469,'WORK_TO_HOME','2025-02-11 13:30:15.000000','2025-02-11 14:40:00.000000',0,10,0,97,3,5,0,1,1,1,'2025-10-13 20:01:40.127559','2025-10-13 20:01:40.127559',NULL,NULL,'Олександр','Бойко'),(99,'Львів','Східна','',49.839683,24.029717,'Абрекович',248,'pickup',343,467,'Стрий','Шевченка','2',49.254471,23.843767,'Абукасим',246,'dropoff',376,276,'WORK_TO_HOME','2025-02-04 14:40:00.000000','2025-02-04 13:20:31.000000',0,10,0,0,5,7,0,1,1,1,'2025-10-14 17:21:40.554566','2025-10-14 17:21:40.554566',NULL,NULL,'Ася','Апанасова');
/*!40000 ALTER TABLE `translogix_djangoproject_orderedpassengerlist` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=256 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_passenger`
--

LOCK TABLES `translogix_djangoproject_passenger` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_passenger` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_passenger` VALUES (1,'Олександр','Ковальчук','Логістика','+380671234001','oleksandr.kov1@example.com',1,0),(2,'Марія','Іваненко','Бухгалтерія','+380671234002','maria.ivan2@example.com',1,0),(3,'Іван','Петренко','Маркетинг','+380671234003','ivan.petr3@example.com',1,0),(4,'Олена','Сидоренко','Продажі','+380671234004','olena.sid4@example.com',1,0),(5,'Андрій','Бойко','Логістика','+380671234005','andriy.boyk5@example.com',1,0),(6,'Наталія','Шевченко','Фінанси','+380671234006','nataliya.shev6@example.com',1,0),(7,'Сергій','Мельник','HR','+380671234007','sergiy.mel7@example.com',1,0),(8,'Оксана','Гнатенко','IT','+380671234008','oksana.gnat8@example.com',1,0),(9,'Юрій','Василенко','Логістика','+380671234009','yuriy.vas9@example.com',1,0),(10,'Світлана','Кравчук','Бухгалтерія','+380671234010','svitlana.kra10@example.com',1,0),(11,'Дмитро','Гриценко','Маркетинг','+380671234011','dmytro.gri11@example.com',1,0),(12,'Ірина','Ткаченко','Продажі','+380671234012','iryna.tkac12@example.com',1,0),(13,'Віктор','Семенюк','Логістика','+380671234013','viktor.sem13@example.com',1,0),(14,'Катерина','Левченко','Фінанси','+380671234014','kateryna.lev14@example.com',1,0),(15,'Богдан','Мороз','HR','+380671234015','bogdan.mor15@example.com',1,0),(16,'Ольга','Зубенко','IT','+380671234016','olga.zub16@example.com',1,0),(17,'Максим','Лисенко','Логістика','+380671234017','maksym.lys17@example.com',1,0),(18,'Лідія','Гончаренко','Бухгалтерія','+380671234018','lidiya.gon18@example.com',1,0),(19,'Олег','Довженко','Маркетинг','+380671234019','oleg.dov19@example.com',1,0),(20,'Тетяна','Поліщук','Продажі','+380671234020','tetyana.pol20@example.com',1,0),(21,'Олег','Зеленський','IT','+380671234567','oleg.zelensky1@example.com',1,0),(22,'Дмитро','Коваль','HR','+380672345678','dmytro.koval2@example.com',1,0),(23,'Юрій','Ткачук','Logistics','+380673456789','yurii.tkachuk3@example.com',1,0),(24,'Андрій','Шевченко','Finance','+380674567890','andriy.shevchenko4@example.com',1,0),(25,'Олександр','Григоренко','Marketing','+380675678901','olexandr.grygorenko5@example.com',1,0),(26,'Микола','Сидоренко','Logistics','+380676789012','mykola.sydorenko6@example.com',1,0),(27,'Іван','Ткачук','IT','+380677890123','ivan.tkachuk7@example.com',1,0),(28,'Іван','Григоренко','Finance','+380672909567','ivan.hryhorenko28@example.com',1,0),(29,'Олег','Сидоренко','Logistics','+380672754422','oleg.sydorenko29@example.com',1,0),(30,'Ігор','Бойко','IT','+380679795262','ihor.boiko30@example.com',1,0),(31,'Олег','Коваль','Marketing','+380675704359','oleg.koval31@example.com',1,0),(32,'Іван','Коваль','Logistics','+380677457931','ivan.koval32@example.com',1,0),(33,'Іван','Мельник','HR','+380672903420','ivan.melnyk33@example.com',1,0),(34,'Дмитро','Григоренко','Marketing','+380672358942','dmytro.hryhorenko34@example.com',1,0),(35,'Юрій','Іванов','HR','+380675904244','yurii.ivanov35@example.com',1,0),(36,'Ігор','Бойко','Finance','+380677420900','ihor.boiko36@example.com',1,0),(37,'Олександр','Коваль','Logistics','+380675702406','oleksandr.koval37@example.com',1,0),(38,'Іван','Ткачук','HR','+380677057419','ivan.tkachuk38@example.com',1,0),(39,'Ігор','Сидоренко','Logistics','+380675569579','ihor.sydorenko39@example.com',1,0),(40,'Олег','Петренко','HR','+380679175768','oleg.petrenko40@example.com',1,0),(41,'Андрій','Ткачук','IT','+380676827408','andrii.tkachuk41@example.com',1,0),(42,'Олег','Ткачук','Logistics','+380673306936','oleg.tkachuk42@example.com',1,0),(43,'Олег','Бойко','Logistics','+380672324884','oleg.boiko43@example.com',1,0),(44,'Олег','Ткачук','Logistics','+380674045380','oleg.tkachuk44@example.com',1,0),(45,'Юрій','Сидоренко','Finance','+380677395543','yurii.sydorenko45@example.com',1,0),(46,'Сергій','Петренко','Finance','+380671038285','serhii.petrenko46@example.com',1,0),(47,'Сергій','Мельник','HR','+380671719845','serhii.melnyk47@example.com',1,0),(48,'Олег','Шевченко','IT','+380675898863','oleg.shevchenko48@example.com',1,0),(49,'Іван','Ткачук','IT','+380674288523','ivan.tkachuk49@example.com',1,0),(50,'Ігор','Мельник','Finance','+380671276095','ihor.melnyk50@example.com',1,0),(51,'Сергій','Іванов','IT','+380672759688','serhii.ivanov51@example.com',1,0),(52,'Іван','Шевченко','Finance','+380675839759','ivan.shevchenko52@example.com',1,0),(53,'Юрій','Петренко','Marketing','+380679631488','yurii.petrenko53@example.com',1,0),(54,'Андрій','Іванов','Logistics','+380679882171','andrii.ivanov54@example.com',1,0),(55,'Олександр','Коваль','Finance','+380675213562','oleksandr.koval55@example.com',1,0),(56,'Іван','Шевченко','HR','+380671418488','ivan.shevchenko56@example.com',1,0),(57,'Микола','Бойко','Marketing','+380676224113','mykola.boiko57@example.com',1,0),(58,'Юрій','Ткачук','HR','+380676538515','yurii.tkachuk58@example.com',1,0),(59,'Олег','Іванов','Marketing','+380674898965','oleg.ivanov59@example.com',1,0),(60,'Сергій','Петренко','Logistics','+380676973607','serhii.petrenko60@example.com',1,0),(61,'Іван','Григоренко','IT','+380673674708','ivan.hryhorenko61@example.com',1,0),(62,'Дмитро','Сидоренко','Logistics','+380673979826','dmytro.sydorenko62@example.com',1,0),(63,'Олег','Мельник','Marketing','+380675139671','oleg.melnyk63@example.com',1,0),(64,'Олександр','Ткачук','Finance','+380673879016','oleksandr.tkachuk64@example.com',1,0),(65,'Віктор','Коваль','Marketing','+380671709316','viktor.koval65@example.com',1,0),(66,'Юрій','Сидоренко','Finance','+380671925783','yurii.sydorenko66@example.com',1,0),(67,'Сергій','Іванов','IT','+380677389062','serhii.ivanov67@example.com',1,0),(68,'Олександр','Петренко','HR','+380677318249','oleksandr.petrenko68@example.com',1,0),(69,'Ігор','Мельник','Marketing','+380671076937','ihor.melnyk69@example.com',1,0),(70,'Микола','Ткачук','Marketing','+380673902116','mykola.tkachuk70@example.com',1,0),(71,'Іван','Іванов','Marketing','+380673826984','ivan.ivanov71@example.com',1,0),(72,'Олександр','Бойко','IT','+380677371086','oleksandr.boiko72@example.com',1,0),(73,'Іван','Сидоренко','Finance','+380675573369','ivan.sydorenko73@example.com',1,0),(74,'Олег','Коваль','Logistics','+380671528863','oleg.koval74@example.com',1,0),(75,'Олександр','Іванов','Finance','+380676183588','oleksandr.ivanov75@example.com',1,0),(76,'Віктор','Ткачук','HR','+380673837922','viktor.tkachuk76@example.com',1,0),(77,'Юрій','Мельник','HR','+380675496194','yurii.melnyk77@example.com',1,0),(78,'Микола','Шевченко','IT','+380676229721','mykola.shevchenko78@example.com',1,0),(79,'Андрій','Сидоренко','Marketing','+380674873265','andrii.sydorenko79@example.com',1,0),(80,'Сергій','Григоренко','Marketing','+380675835274','serhii.hryhorenko80@example.com',1,0),(81,'Іван','Петренко','HR','+380671861023','ivan.petrenko81@example.com',1,0),(82,'Віктор','Іванов','Marketing','+380673196537','viktor.ivanov82@example.com',1,0),(83,'Олег','Григоренко','Logistics','+380674017431','oleg.hryhorenko83@example.com',1,0),(84,'Юрій','Шевченко','Marketing','+380673195536','yurii.shevchenko84@example.com',1,0),(85,'Олександр','Іванов','HR','+380675976849','oleksandr.ivanov85@example.com',1,0),(86,'Сергій','Коваль','Logistics','+380673041952','serhii.koval86@example.com',1,0),(87,'Іван','Мельник','HR','+380676301472','ivan.melnyk87@example.com',1,0),(88,'Микола','Ткачук','Logistics','+380672319577','mykola.tkachuk88@example.com',1,0),(89,'Олександр','Коваль','Marketing','+380676192304','oleksandr.koval89@example.com',1,0),(90,'Віктор','Григоренко','Marketing','+380676903408','viktor.hryhorenko90@example.com',1,0),(91,'Юрій','Сидоренко','Finance','+380677408135','yurii.sydorenko91@example.com',1,0),(92,'Олег','Ткачук','Logistics','+380674713739','oleg.tkachuk92@example.com',1,0),(93,'Андрій','Коваль','Marketing','+380671948817','andrii.koval93@example.com',1,0),(94,'Сергій','Мельник','IT','+380676914586','serhii.melnyk94@example.com',1,0),(95,'Ігор','Григоренко','Logistics','+380673297469','ihor.hryhorenko95@example.com',1,0),(96,'Микола','Шевченко','IT','+380673678201','mykola.shevchenko96@example.com',1,0),(97,'Дмитро','Ткачук','Logistics','+380673086901','dmytro.tkachuk97@example.com',1,0),(98,'Олександр','Іванов','HR','+380676208804','oleksandr.ivanov98@example.com',1,0),(99,'Сергій','Коваль','Logistics','+380673548209','serhii.koval99@example.com',1,0),(100,'Іван','Бойко','Marketing','+380672839587','ivan.boiko100@example.com',1,0),(128,'Олег','Петренко','Finance','+380675364284','oleg.petrenko128@example.com',1,0),(129,'Віктор','Іванов','HR','+380675362759','viktor.ivanov129@example.com',1,0),(130,'Юрій','Ткачук','Marketing','+380673641509','yurii.tkachuk130@example.com',1,0),(131,'Олександр','Іванов','IT','+380671264105','oleksandr.ivanov131@example.com',1,0),(132,'Андрій','Мельник','Logistics','+380676736153','andrii.melnyk132@example.com',1,0),(133,'Іван','Коваль','Marketing','+380673742064','ivan.koval133@example.com',1,0),(134,'Микола','Шевченко','HR','+380672314526','mykola.shevchenko134@example.com',1,0),(135,'Сергій','Бойко','IT','+380675365874','serhii.boiko135@example.com',1,0),(136,'Олександр','Петренко','Marketing','+380673241509','oleksandr.petrenko136@example.com',1,0),(137,'Дмитро','Григоренко','HR','+380674123567','dmytro.hryhorenko137@example.com',1,0),(138,'Ігор','Сидоренко','IT','+380672847651','ihor.sydorenko138@example.com',1,0),(139,'Олег','Коваль','Logistics','+380671493857','oleg.koval139@example.com',1,0),(140,'Юрій','Іванов','Finance','+380671763945','yurii.ivanov140@example.com',1,0),(141,'Микола','Бойко','HR','+380674987236','mykola.boiko141@example.com',1,0),(142,'Сергій','Ткачук','Finance','+380675987234','serhii.tkachuk142@example.com',1,0),(143,'Іван','Григоренко','Marketing','+380675134876','ivan.hryhorenko143@example.com',1,0),(144,'Віктор','Шевченко','IT','+380673465123','viktor.shevchenko144@example.com',1,0),(145,'Олександр','Коваль','Logistics','+380674981256','oleksandr.koval145@example.com',1,0),(146,'Дмитро','Іванов','HR','+380675467821','dmytro.ivanov146@example.com',1,0),(147,'Юрій','Сидоренко','Marketing','+380675423894','yurii.sydorenko147@example.com',1,0),(148,'Микола','Мельник','Finance','+380673986237','mykola.melnyk148@example.com',1,0),(149,'Андрій','Ткачук','HR','+380675134786','andrii.tkachuk149@example.com',1,0),(150,'Сергій','Петренко','IT','+380675123894','serhii.petrenko150@example.com',1,0),(151,'Олександр','Григоренко','Marketing','+380672654218','oleksandr.hryhorenko151@example.com',1,0),(152,'Іван','Шевченко','Logistics','+380671234908','ivan.shevchenko152@example.com',1,0),(153,'Віктор','Мельник','Finance','+380673145621','viktor.melnyk153@example.com',1,0),(154,'Юрій','Бойко','HR','+380674534126','yurii.boiko154@example.com',1,0),(155,'Олександр','Сидоренко','Marketing','+380672865214','oleksandr.sydorenko155@example.com',1,0),(156,'Віктор','Іванов','HR','+380672071675','viktor.ivanov156@example.com',1,0),(157,'Дмитро','Коваль','Marketing','+380675517386','dmytro.koval157@example.com',1,0),(158,'Олександр','Ткачук','Finance','+380675867336','oleksandr.tkachuk158@example.com',1,0),(159,'Юрій','Шевченко','IT','+380677761317','yurii.shevchenko159@example.com',1,0),(160,'Дмитро','Ткачук','IT','+380673741981','dmytro.tkachuk160@example.com',1,0),(161,'Дмитро','Григоренко','Finance','+380671227639','dmytro.hryhorenko161@example.com',1,0),(162,'Дмитро','Шевченко','IT','+380673236749','dmytro.shevchenko162@example.com',1,0),(163,'Юрій','Шевченко','Finance','+380677771219','yurii.shevchenko163@example.com',1,0),(164,'Сергій','Мельник','Marketing','+380674870636','serhii.melnyk164@example.com',1,0),(165,'Юрій','Ткачук','HR','+380676350758','yurii.tkachuk165@example.com',1,0),(166,'Іван','Петренко','IT','+380672361725','ivan.petrenko166@example.com',1,0),(167,'Микола','Бойко','Finance','+380677082944','mykola.boiko167@example.com',1,0),(168,'Іван','Коваль','Logistics','+380671950681','ivan.koval168@example.com',1,0),(169,'Олег','Коваль','Logistics','+380671434859','oleg.koval169@example.com',1,0),(170,'Андрій','Петренко','Finance','+380673986106','andrii.petrenko170@example.com',1,0),(171,'Юрій','Коваль','HR','+380678237733','yurii.koval171@example.com',1,0),(172,'Олександр','Мельник','Logistics','+380676750763','oleksandr.melnyk172@example.com',1,0),(173,'Дмитро','Шевченко','Logistics','+380673814535','dmytro.shevchenko173@example.com',1,0),(174,'Ігор','Сидоренко','HR','+380675444274','ihor.sydorenko174@example.com',1,0),(175,'Микола','Іванов','HR','+380677496226','mykola.ivanov175@example.com',1,0),(176,'Дмитро','Петренко','HR','+380676348437','dmytro.petrenko176@example.com',1,0),(177,'Олександр','Бойко','Marketing','+380676052366','oleksandr.boiko177@example.com',1,0),(178,'Іван','Петренко','Транспортний','+380501234567','ivan.petrenko@example.com',1,0),(179,'Григорій','Непийпиво','IT','06763333333','pivopivo@gmail.com',1,0),(180,'Петро','Срака','Прибирання','+380671111111','sraka@sobaka.com',1,0),(181,'Степан','Дупа','Прибирання','+3806333333333','stepan@stepan.com',1,0),(182,'Степан','Дупа','Прибирання','+3806333333333','stepan@stepan.com',1,0),(183,'Степан','Дупа','Прибирання','+3806333333333','stepan@stepan.com',1,0),(184,'Микола','Підганяло','Управління','+380677777777','Pidganyalo@gmail.com',1,0),(185,'Микола','Підганяло','Управління','+380677777777','Pidganyalo@gmail.com',1,0),(186,'Микола','Підганяло','Управління','+380677777777','Pidganyalo@gmail.com',1,0),(187,'Джамшут','Бабаєвич','Управління','+380671111111','Pidganyalo@ukr.net',1,0),(188,'Джамшут','Бабаєвич','Управління','+380677777777','Pidganyalo@gmail.com',1,0),(189,'Галина','Пашко','Управління','+350505555555','pashko@gmail.com',1,0),(190,'Іван','Півлітренко','охорона','+380676666666','0505@gmail.com',1,0),(191,'Іван','Петренко','Логістика','+380501234567','ivan.petrenko@example.com',1,0),(192,'Іван','Петренко','Логістика','+380501234567','ivan.petrenko@example.com',1,0),(193,'Іван','Петренко','Логістика','+380676229721','ivan.petrenko@example.com',1,0),(194,'Рафік','Алібабаєвич','Самодіяльність','+380676229721','alibaba@example.com',1,0),(195,'Рафік','Коваленко','ІТ','+380671234567','rafik.kovalenko@example.com',1,0),(196,'Рафік','Шевченко','Бухгалтерія','+380671987654','iryna.shevchenko@example.com',1,0),(197,'Рафік','Петренко','Логістика','+380673456789','mariya.petrenko@example.com',1,0),(198,'Дмитро','Іванов','Маркетинг','+380671111111','dmytro.ivanov@example.com',1,0),(199,'Тест','Пасажир','Логістика','+380676229721','test.passenger@example.com',1,0),(200,'Тест','Пасажир','Логістика','+380676229721','test.passenger@example.com',1,0),(201,'Тест','Пасажир','Логістика','+380676229721','test.passenger@example.com',1,0),(202,'Тест','Пасажир','Логістика','+380676229721','test.passenger@example.com',1,0),(203,'Тест','Пасажир','Логістика','+380676229721','test.passenger@example.com',1,0),(204,'Тест','Пасажир','Логістика','+380676229721','test.passenger@example.com',1,0),(205,'Тест','Пасажир','Логістика','+380676229721','test.passenger@example.com',1,0),(206,'Рудік','Наливайко','Логістика','+380671111111','test.passenger@example.com',1,0),(209,'Акакій','Акакійович','Управління','+0503333333','akakiy@ukr.net',0,0),(210,'Іван','Непийпиво','Управління','+380502222222','beer@gmail.com',1,0),(224,'Рудік','Наливайко','Логістика','+380671111111','test.passenger@example.com',1,0),(225,'Рудік','Наливайко','Логістика','+380671111111','test.passenger@example.com',1,0),(226,'Рудік','Наливайко','Логістика','+380671111111','test.passenger@example.com',1,0),(227,'Рудік','Наливайко','Логістика','+380671111111','test.passenger@example.com',1,0),(228,'Рудік','Наливайко','Логістика','+380671111111','test.passenger@example.com',1,0),(240,'Аббас','Фінік','Управління','+380671111111','аштшсл1@gmail.com',1,0),(241,'Абукасим','Інжир','Управління','+380672222222','ingyr@gmail.com',1,0),(242,'Абдурахман','Хурма','Управління','+380673333333','hurma@gmail.com',1,0),(243,'Рулон','Обоєв','Управління','+380502222222','rulon@gmail.com',1,0),(244,'Банан','Ананасович','Управління','+380503333333','bananas@gmail.com',0,0),(245,'Аскольд','Гичка','Управління','380503332233','gychka@gmail.com',1,0),(246,'Абукасим','Абрекович','Випивка і танці','+0502222222','abreck@gmail.com',1,0),(247,'Ашот','Арутюнян','Випивка і танці','+380631111111','ashot@gmail.com',1,0),(248,'Ася','Апанасова','Випивка і танці','+380504444444','asya@gmail.com',1,1),(249,'Ашот','Акопян','Випивка і танці','+380999999999','ashot@gmail.com',0,0),(250,'Арон','Абрикос','Виїздна торгівля','+05022222222','abrycos@ukr.net',1,0),(251,'Алібаба','Алібаєвич','сервіс випивки і танців на дому','+3805022222222','alibaba@gmail.com',1,0),(252,'Арнольд','Арменович','Управління','+380501201111','arny@gmail.com',1,0),(253,'Ярослав','Пюрик','Управління','0676333424','westukr1@gmail.com',1,0),(254,'Ярослав','Пюрик','Випивка і танці','0676333424','westukr1@gmail.com',1,0),(255,'Ярослав','Пюрик','Управління','0676333424','westukr1@gmail.com',1,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_passenger_pickup_addresses`
--

LOCK TABLES `translogix_djangoproject_passenger_pickup_addresses` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_passenger_pickup_addresses` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_passenger_pickup_addresses` VALUES (65,100,397),(67,141,401),(68,177,403),(1,178,155),(2,179,158),(3,180,161),(4,181,164),(5,182,167),(6,183,170),(7,184,173),(8,185,176),(9,186,179),(10,187,182),(66,187,399),(11,188,185),(12,189,188),(13,190,191),(14,193,215),(15,194,218),(54,194,380),(55,194,381),(56,194,382),(57,194,383),(58,194,384),(16,195,221),(17,196,224),(18,197,227),(19,205,245),(20,205,246),(21,206,251),(22,206,252),(50,209,372),(62,209,391),(23,224,251),(24,224,252),(25,225,251),(26,225,252),(27,226,251),(28,226,252),(29,227,251),(30,227,252),(31,228,251),(32,228,252),(33,244,323),(34,245,326),(35,245,329),(36,245,332),(37,245,335),(38,245,338),(51,246,375),(52,246,376),(53,246,379),(59,247,386),(39,248,341),(40,248,344),(41,248,347),(42,248,350),(43,248,353),(44,248,356),(45,248,359),(46,249,362),(47,250,365),(48,250,368),(49,250,369),(60,251,389),(61,252,390),(63,253,392),(64,254,393),(69,255,405);
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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_passenger_work_addresses`
--

LOCK TABLES `translogix_djangoproject_passenger_work_addresses` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_passenger_work_addresses` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_passenger_work_addresses` VALUES (48,100,398),(50,141,402),(51,177,404),(1,178,157),(2,179,160),(3,180,163),(4,181,166),(5,182,169),(6,183,172),(7,184,175),(8,185,178),(9,186,181),(10,187,184),(49,187,400),(11,188,187),(12,189,190),(13,190,193),(14,193,217),(15,194,220),(47,194,396),(16,195,223),(17,196,226),(18,197,229),(19,205,249),(20,206,256),(42,209,374),(21,224,256),(22,225,256),(23,226,256),(24,227,256),(25,228,256),(26,244,325),(27,245,328),(28,245,331),(29,245,334),(30,245,337),(31,245,340),(43,246,378),(44,247,388),(32,248,343),(33,248,346),(34,248,349),(35,248,352),(36,248,355),(37,248,358),(38,248,361),(39,249,364),(40,250,367),(41,250,371),(45,251,394),(46,252,395),(52,255,406);
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
  CONSTRAINT `TransLogix_djangoProject_passengerroute_route_id_f12c13f0_fk` FOREIGN KEY (`route_id`) REFERENCES `translogix_djangoproject_route` (`route_id`)
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
-- Table structure for table `translogix_djangoproject_passengertriprequest`
--

DROP TABLE IF EXISTS `translogix_djangoproject_passengertriprequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_passengertriprequest` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `pickup_latitude` decimal(9,6) NOT NULL,
  `pickup_longitude` decimal(9,6) NOT NULL,
  `dropoff_latitude` decimal(9,6) NOT NULL,
  `dropoff_longitude` decimal(9,6) NOT NULL,
  `direction` varchar(20) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `comment` longtext,
  `dropoff_point_id` bigint DEFAULT NULL,
  `passenger_id` bigint NOT NULL,
  `pickup_point_id` bigint DEFAULT NULL,
  `arrival_time` datetime(6) DEFAULT NULL,
  `departure_time` datetime(6) DEFAULT NULL,
  `dropoff_time_in_route` datetime(6) DEFAULT NULL,
  `included_in_list` tinyint(1) NOT NULL,
  `included_in_route` tinyint(1) NOT NULL,
  `included_in_trip` tinyint(1) NOT NULL,
  `ordered_list_id` bigint DEFAULT NULL,
  `pickup_time_in_route` datetime(6) DEFAULT NULL,
  `sequence_number` int unsigned DEFAULT NULL,
  `travel_time_in_route` int DEFAULT NULL,
  `wait_time_at_work` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_dropoff_point_id_a1404474_fk_TransLogi` (`dropoff_point_id`),
  KEY `TransLogix_djangoPro_passenger_id_1e52b9ab_fk_TransLogi` (`passenger_id`),
  KEY `TransLogix_djangoPro_pickup_point_id_9d00ec4a_fk_TransLogi` (`pickup_point_id`),
  KEY `TransLogix_djangoPro_ordered_list_id_4a3a1f10_fk_TransLogi` (`ordered_list_id`),
  CONSTRAINT `TransLogix_djangoPro_dropoff_point_id_a1404474_fk_TransLogi` FOREIGN KEY (`dropoff_point_id`) REFERENCES `translogix_djangoproject_coordinatepoint` (`id`),
  CONSTRAINT `TransLogix_djangoPro_ordered_list_id_4a3a1f10_fk_TransLogi` FOREIGN KEY (`ordered_list_id`) REFERENCES `translogix_djangoproject_orderedpassengerlist` (`id`),
  CONSTRAINT `TransLogix_djangoPro_passenger_id_1e52b9ab_fk_TransLogi` FOREIGN KEY (`passenger_id`) REFERENCES `translogix_djangoproject_passenger` (`id`),
  CONSTRAINT `TransLogix_djangoPro_pickup_point_id_9d00ec4a_fk_TransLogi` FOREIGN KEY (`pickup_point_id`) REFERENCES `translogix_djangoproject_coordinatepoint` (`id`),
  CONSTRAINT `translogix_djangoproject_passengertriprequest_chk_1` CHECK ((`sequence_number` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=785 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_passengertriprequest`
--

LOCK TABLES `translogix_djangoproject_passengertriprequest` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_passengertriprequest` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_passengertriprequest` VALUES (63,'2025-01-17 19:31:22.133113','2025-01-17 19:31:22.133113',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-01-20 21:29:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(64,'2025-01-17 19:31:22.176813','2025-01-17 19:31:22.176813',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-01-27 19:29:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(65,'2025-01-17 19:36:05.204660','2025-01-17 19:36:05.204660',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-01-22 21:34:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(66,'2025-01-17 19:36:05.223725','2025-01-17 19:36:05.223725',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-01-28 19:34:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(67,'2025-01-17 19:36:05.244961','2025-01-17 19:36:05.244961',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-01-29 19:34:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(68,'2025-01-17 19:51:19.970944','2025-01-25 19:46:04.002597',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',0,'',395,252,390,'2025-01-22 21:34:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(69,'2025-01-17 19:51:20.014562','2025-01-17 19:51:20.014562',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-01-27 19:34:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(70,'2025-01-17 19:51:20.093562','2025-01-17 19:51:20.094563',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-01-28 19:34:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(71,'2025-01-17 19:52:36.631724','2025-01-17 19:52:36.631724',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-01-17 21:52:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(72,'2025-01-17 20:00:45.444066','2025-01-17 20:00:45.444066',49.828022,24.031307,49.858920,24.033717,'HOME_TO_WORK',1,'',400,187,399,'2025-01-17 21:59:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(73,'2025-01-17 20:00:45.464810','2025-01-17 20:00:45.464810',49.828022,24.031307,49.858920,24.033717,'HOME_TO_WORK',1,'',400,187,399,'2025-01-20 19:59:01.036000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(74,'2025-01-17 20:00:45.487282','2025-01-17 20:00:45.488323',49.828022,24.031307,49.858920,24.033717,'HOME_TO_WORK',1,'',400,187,399,'2025-01-27 19:59:01.036000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(75,'2025-01-17 20:30:32.577414','2025-01-17 20:30:32.577414',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-01-22 22:29:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(76,'2025-01-17 20:30:32.615359','2025-01-17 20:30:32.615359',49.858782,24.027108,49.257038,23.818409,'WORK_TO_HOME',1,'',377,246,378,NULL,'2025-01-17 23:30:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(77,'2025-01-17 20:30:32.637372','2025-01-17 20:30:32.637372',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-01-17 20:29:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(78,'2025-01-17 20:30:32.656389','2025-01-17 20:30:32.656389',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-01-24 20:29:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(79,'2025-01-17 20:30:32.675367','2025-01-17 20:30:32.675367',49.858782,24.027108,49.257038,23.818409,'WORK_TO_HOME',1,'',377,246,378,NULL,'2025-01-24 21:30:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(80,'2025-01-17 20:30:32.696360','2025-01-17 20:30:32.696360',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-01-31 20:29:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(81,'2025-01-17 20:30:32.716360','2025-01-17 20:30:32.716360',49.858782,24.027108,49.257038,23.818409,'WORK_TO_HOME',1,'',377,246,378,NULL,'2025-01-31 21:30:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(82,'2025-01-17 20:30:32.733359','2025-01-17 20:30:32.733359',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-07 20:29:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(83,'2025-01-17 20:30:32.750359','2025-01-17 20:30:32.750359',49.858782,24.027108,49.257038,23.818409,'WORK_TO_HOME',1,'',377,246,378,NULL,'2025-02-07 21:30:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(84,'2025-01-17 20:30:32.770359','2025-01-17 20:30:32.770359',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-14 20:29:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(85,'2025-01-17 20:30:32.786390','2025-01-17 20:30:32.786390',49.858782,24.027108,49.257038,23.818409,'WORK_TO_HOME',1,'',377,246,378,NULL,'2025-02-14 21:30:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(86,'2025-01-17 20:30:32.806393','2025-01-17 20:30:32.806393',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-21 20:29:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(87,'2025-01-17 20:30:32.823361','2025-01-17 20:30:32.823361',49.858782,24.027108,49.257038,23.818409,'WORK_TO_HOME',1,'',377,246,378,NULL,'2025-02-21 21:30:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(88,'2025-01-17 20:30:32.841391','2025-01-17 20:30:32.841391',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-28 20:29:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(89,'2025-01-17 20:30:32.862393','2025-01-17 20:30:32.862393',49.858782,24.027108,49.257038,23.818409,'WORK_TO_HOME',1,'',377,246,378,NULL,'2025-02-28 21:30:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(90,'2025-01-17 20:39:43.567170','2025-01-17 20:39:43.567170',49.800247,24.064389,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-01-23 22:39:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(91,'2025-01-17 20:42:57.826092','2025-01-17 20:42:57.826092',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-01-26 22:42:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(92,'2025-01-17 20:42:57.847964','2025-01-17 20:42:57.847964',49.839683,24.029717,49.826858,24.027894,'WORK_TO_HOME',1,'',345,248,343,NULL,'2025-01-27 08:45:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(93,'2025-01-17 20:42:57.868009','2025-01-17 20:42:57.868009',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-01-29 20:42:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(94,'2025-01-17 20:42:57.887065','2025-01-17 20:42:57.887065',49.839683,24.029717,49.826858,24.027894,'WORK_TO_HOME',1,'',345,248,343,NULL,'2025-01-29 06:45:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(95,'2025-01-17 20:42:57.907069','2025-01-17 20:42:57.907069',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-05 20:42:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(96,'2025-01-17 20:42:57.926069','2025-01-17 20:42:57.926069',49.839683,24.029717,49.826858,24.027894,'WORK_TO_HOME',1,'',345,248,343,NULL,'2025-02-05 06:45:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(97,'2025-01-17 20:42:57.945040','2025-01-17 20:42:57.945040',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-12 20:42:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(98,'2025-01-17 20:42:57.964069','2025-01-17 20:42:57.964069',49.839683,24.029717,49.826858,24.027894,'WORK_TO_HOME',1,'',345,248,343,NULL,'2025-02-12 06:45:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(99,'2025-01-17 20:42:57.982039','2025-01-17 20:42:57.982039',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-19 20:42:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(100,'2025-01-17 20:42:58.005069','2025-01-17 20:42:58.005069',49.839683,24.029717,49.826858,24.027894,'WORK_TO_HOME',1,'',345,248,343,NULL,'2025-02-19 06:45:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(101,'2025-01-17 20:42:58.024069','2025-01-17 20:42:58.024069',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-26 20:42:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(102,'2025-01-17 20:42:58.043070','2025-01-17 20:42:58.043070',49.839683,24.029717,49.826858,24.027894,'WORK_TO_HOME',1,'',345,248,343,NULL,'2025-02-26 06:45:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(103,'2025-01-17 20:42:58.176041','2025-01-17 20:42:58.176041',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-01-31 20:42:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(104,'2025-01-17 20:42:58.192070','2025-01-17 20:42:58.192070',49.839683,24.029717,49.826858,24.027894,'WORK_TO_HOME',1,'',345,248,343,NULL,'2025-01-31 06:45:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(105,'2025-01-17 20:42:58.210072','2025-01-17 20:42:58.210072',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-07 20:42:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(106,'2025-01-17 20:42:58.231073','2025-01-17 20:42:58.231073',49.839683,24.029717,49.826858,24.027894,'WORK_TO_HOME',1,'',345,248,343,NULL,'2025-02-07 06:45:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(107,'2025-01-17 20:42:58.247065','2025-01-17 20:42:58.247065',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-14 20:42:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(108,'2025-01-17 20:42:58.267072','2025-01-17 20:42:58.267072',49.839683,24.029717,49.826858,24.027894,'WORK_TO_HOME',1,'',345,248,343,NULL,'2025-02-14 06:45:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(109,'2025-01-17 20:42:58.289042','2025-01-17 20:42:58.289042',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-21 20:42:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(110,'2025-01-17 20:42:58.308072','2025-01-17 20:42:58.308072',49.839683,24.029717,49.826858,24.027894,'WORK_TO_HOME',1,'',345,248,343,NULL,'2025-02-21 06:45:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(111,'2025-01-17 20:42:58.325072','2025-01-17 20:42:58.325072',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-28 20:42:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(112,'2025-01-17 20:42:58.342074','2025-01-17 20:42:58.342074',49.839683,24.029717,49.826858,24.027894,'WORK_TO_HOME',1,'',345,248,343,NULL,'2025-02-28 06:45:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(113,'2025-01-20 12:10:56.062477','2025-01-20 12:10:56.062477',49.800247,24.064389,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-01-21 08:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(114,'2025-01-20 12:10:56.090313','2025-01-20 12:10:56.090313',49.858920,24.033717,49.800247,24.064389,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-01-20 17:30:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(115,'2025-01-23 13:23:46.757413','2025-01-23 13:23:46.757413',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-01-24 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(116,'2025-01-23 13:23:46.853421','2025-01-23 13:23:46.853421',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-01-24 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(117,'2025-01-23 13:23:46.878199','2025-01-23 13:23:46.878199',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-01-27 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(118,'2025-01-23 13:23:46.900118','2025-01-23 13:23:46.900118',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-01-27 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(119,'2025-01-23 13:23:46.925166','2025-01-23 13:23:46.925166',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-02-03 06:10:00.000000',NULL,NULL,1,0,0,NULL,NULL,1,NULL,NULL),(120,'2025-01-23 13:23:46.954112','2025-01-23 13:23:46.954112',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-02-03 16:25:00.000000',NULL,1,0,0,NULL,NULL,1,NULL,NULL),(121,'2025-01-23 13:23:46.994141','2025-01-23 13:23:46.994141',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-02-10 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(122,'2025-01-23 13:23:47.015112','2025-01-23 13:23:47.015112',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-02-10 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(123,'2025-01-23 13:23:47.035113','2025-01-23 13:23:47.036119',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-02-17 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(124,'2025-01-23 13:23:47.055140','2025-01-23 13:23:47.055140',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-02-17 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(125,'2025-01-23 13:23:47.074141','2025-01-23 13:23:47.074141',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-02-24 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(126,'2025-01-23 13:23:47.093118','2025-01-23 13:23:47.093118',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-02-24 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(127,'2025-01-23 13:23:47.113141','2025-01-23 13:23:47.113141',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-03 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(128,'2025-01-23 13:23:47.130141','2025-01-23 13:23:47.130141',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-03 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(129,'2025-01-23 13:23:47.148141','2025-03-17 11:34:27.499853',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',0,'',396,194,380,'2025-03-10 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(130,'2025-01-23 13:23:47.169145','2025-01-23 13:23:47.169145',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-10 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(131,'2025-01-23 13:23:47.192114','2025-03-17 18:57:00.107612',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-17 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(132,'2025-01-23 13:23:47.209142','2025-01-23 13:23:47.209142',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-17 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(133,'2025-01-23 13:23:47.226141','2025-03-17 10:01:38.944596',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',0,'',396,194,380,'2025-03-24 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(134,'2025-01-23 13:23:47.247113','2025-01-23 13:23:47.247113',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-24 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(135,'2025-01-23 13:23:47.266146','2025-01-23 13:23:47.266146',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-31 05:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(136,'2025-01-23 13:23:47.282144','2025-01-23 13:23:47.282144',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-31 15:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(137,'2025-01-23 13:23:47.305174','2025-01-23 13:23:47.305174',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-01-28 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(138,'2025-01-23 13:23:47.324143','2025-01-23 13:23:47.324143',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-01-28 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(139,'2025-01-23 13:23:47.342113','2025-01-23 13:23:47.342113',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-02-04 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(140,'2025-01-23 13:23:47.361142','2025-01-23 13:23:47.361142',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-02-04 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(141,'2025-01-23 13:23:47.379114','2025-01-23 13:23:47.379114',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-02-11 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(142,'2025-01-23 13:23:47.397143','2025-01-23 13:23:47.397143',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-02-11 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(143,'2025-01-23 13:23:47.417150','2025-01-23 13:23:47.417150',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-02-18 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(144,'2025-01-23 13:23:47.436149','2025-01-23 13:23:47.436149',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-02-18 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(145,'2025-01-23 13:23:47.458115','2025-01-23 13:23:47.458115',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-02-25 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(146,'2025-01-23 13:23:47.475143','2025-01-23 13:23:47.475143',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-02-25 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(147,'2025-01-23 13:23:47.493113','2025-03-17 11:14:55.377762',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',0,'',396,194,380,'2025-03-04 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(148,'2025-01-23 13:23:47.512113','2025-03-04 08:50:46.467444',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',0,'',380,194,396,NULL,'2025-03-04 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(149,'2025-01-23 13:23:47.530144','2025-01-23 13:23:47.530144',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-11 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(150,'2025-01-23 13:23:47.549144','2025-01-23 13:23:47.549144',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-11 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(151,'2025-01-23 13:23:47.566147','2025-01-23 13:23:47.566147',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-18 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(152,'2025-01-23 13:23:47.585133','2025-01-23 13:23:47.585133',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-18 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(153,'2025-01-23 13:23:47.604116','2025-01-23 13:23:47.604116',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-25 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(154,'2025-01-23 13:23:47.624114','2025-01-23 13:23:47.624114',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-25 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(155,'2025-01-23 13:23:47.642145','2025-01-23 13:23:47.642145',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-01-29 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(156,'2025-01-23 13:23:47.660144','2025-01-23 13:23:47.660144',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-01-29 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(157,'2025-01-23 13:23:47.679145','2025-01-23 13:23:47.679145',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-02-05 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(158,'2025-01-23 13:23:47.698115','2025-01-23 13:23:47.698115',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-02-05 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(159,'2025-01-23 13:23:47.716144','2025-01-23 13:23:47.716144',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-02-12 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(160,'2025-01-23 13:23:47.736154','2025-01-23 13:23:47.736154',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-02-12 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(161,'2025-01-23 13:23:47.757147','2025-01-23 13:23:47.757147',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-02-19 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(162,'2025-01-23 13:23:47.819149','2025-01-23 13:23:47.819149',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-02-19 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(163,'2025-01-23 13:23:47.838116','2025-01-23 13:23:47.838116',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-02-26 06:10:00.000000',NULL,NULL,1,0,0,NULL,NULL,1,NULL,NULL),(164,'2025-01-23 13:23:47.857145','2025-01-23 13:23:47.857145',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-02-26 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(165,'2025-01-23 13:23:47.876116','2025-03-17 11:15:04.025031',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',0,'',396,194,380,'2025-03-05 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(166,'2025-01-23 13:23:47.895116','2025-03-04 08:50:49.518644',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',0,'',380,194,396,NULL,'2025-03-05 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(167,'2025-01-23 13:23:47.914146','2025-01-23 13:23:47.914146',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-12 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(168,'2025-01-23 13:23:47.933124','2025-01-23 13:23:47.933124',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-12 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(169,'2025-01-23 13:23:47.956115','2025-01-23 13:23:47.956115',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-19 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(170,'2025-01-23 13:23:47.976117','2025-01-23 13:23:47.977145',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-19 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(171,'2025-01-23 13:23:47.996144','2025-01-23 13:23:47.996144',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-26 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(172,'2025-01-23 13:23:48.015118','2025-03-18 14:47:31.936308',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',0,'',380,194,396,NULL,'2025-03-26 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(173,'2025-01-23 13:23:48.035150','2025-01-23 13:23:48.035150',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-01-30 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(174,'2025-01-23 13:23:48.057145','2025-01-23 13:23:48.057145',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-01-30 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(175,'2025-01-23 13:23:48.075147','2025-01-23 13:23:48.075147',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-02-06 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(176,'2025-01-23 13:23:48.094149','2025-01-23 13:23:48.094149',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-02-06 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(177,'2025-01-23 13:23:48.116118','2025-01-23 13:23:48.116118',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-02-13 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(178,'2025-01-23 13:23:48.137148','2025-01-23 13:23:48.137148',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-02-13 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(179,'2025-01-23 13:23:48.155147','2025-01-23 13:23:48.155147',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-02-20 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(180,'2025-01-23 13:23:48.173148','2025-01-23 13:23:48.173148',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-02-20 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(181,'2025-01-23 13:23:48.193153','2025-01-23 13:23:48.193153',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-02-27 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(182,'2025-01-23 13:23:48.214151','2025-01-23 13:23:48.214151',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-02-27 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(183,'2025-01-23 13:23:48.231120','2025-03-17 11:32:40.098030',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',0,'',396,194,380,'2025-03-06 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(184,'2025-01-23 13:23:48.253120','2025-01-23 13:23:48.253120',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-06 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(185,'2025-01-23 13:23:48.271152','2025-01-23 13:23:48.271152',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-13 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(186,'2025-01-23 13:23:48.289148','2025-01-23 13:23:48.289148',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-13 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(187,'2025-01-23 13:23:48.309148','2025-03-17 19:27:07.288379',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',0,'',396,194,380,'2025-03-20 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(188,'2025-01-23 13:23:48.327142','2025-01-23 13:23:48.327142',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-20 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(189,'2025-01-23 13:23:48.354149','2025-01-23 13:23:48.354149',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-27 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(190,'2025-01-23 13:23:48.376123','2025-03-18 14:47:48.107120',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',0,'',380,194,396,NULL,'2025-03-27 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(191,'2025-01-23 13:23:48.398151','2025-01-23 13:23:48.398151',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-01-31 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(192,'2025-01-23 13:23:48.418123','2025-01-23 13:23:48.418123',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-01-31 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(193,'2025-01-23 13:23:48.439119','2025-01-23 13:23:48.439119',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-02-07 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(194,'2025-01-23 13:23:48.459119','2025-01-23 13:23:48.459119',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-02-07 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(195,'2025-01-23 13:23:48.480121','2025-01-23 13:23:48.480121',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-02-14 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(196,'2025-01-23 13:23:48.500118','2025-01-23 13:23:48.500118',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-02-14 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(197,'2025-01-23 13:23:48.522149','2025-01-23 13:23:48.522149',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-02-21 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(198,'2025-01-23 13:23:48.542150','2025-01-23 13:23:48.542150',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-02-21 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(199,'2025-01-23 13:23:48.561150','2025-01-23 13:23:48.561150',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-02-28 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(200,'2025-01-23 13:23:48.582120','2025-01-23 13:23:48.582120',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-02-28 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(201,'2025-01-23 13:23:48.606149','2025-03-17 11:33:43.019467',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',0,'',396,194,380,'2025-03-07 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(202,'2025-01-23 13:23:48.624150','2025-01-23 13:23:48.624150',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-07 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(203,'2025-01-23 13:23:48.642153','2025-01-23 13:23:48.642153',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-14 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(204,'2025-01-23 13:23:48.661152','2025-01-23 13:23:48.661152',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-14 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(205,'2025-01-23 13:23:48.679161','2025-01-23 13:23:48.679161',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-21 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(206,'2025-01-23 13:23:48.698122','2025-01-23 13:23:48.698122',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-21 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(207,'2025-01-23 13:23:48.718130','2025-01-23 13:23:48.718130',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-28 06:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(208,'2025-01-23 13:23:48.738124','2025-01-23 13:23:48.738124',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-28 16:25:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(209,'2025-01-23 20:47:20.468134','2025-01-23 20:47:20.468134',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-01-24 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(210,'2025-01-23 20:47:20.489134','2025-01-23 20:47:20.489134',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-01-24 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(211,'2025-01-23 20:47:20.507889','2025-01-23 20:47:20.507889',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-01-27 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(212,'2025-01-23 20:47:20.528892','2025-01-23 20:47:20.528892',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-01-27 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(213,'2025-01-23 20:47:20.545861','2025-01-23 20:47:20.545861',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-02-03 05:20:00.000000',NULL,NULL,1,0,0,NULL,NULL,2,NULL,NULL),(214,'2025-01-23 20:47:20.564861','2025-01-23 20:47:20.564861',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-02-03 18:00:00.000000',NULL,1,0,0,NULL,NULL,2,NULL,NULL),(215,'2025-01-23 20:47:20.582888','2025-01-23 20:47:20.582888',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-02-10 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(216,'2025-01-23 20:47:20.603889','2025-01-23 20:47:20.603889',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-02-10 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(217,'2025-01-23 20:47:20.620861','2025-01-23 20:47:20.620861',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-02-17 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(218,'2025-01-23 20:47:20.637860','2025-01-23 20:47:20.637860',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-02-17 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(219,'2025-01-23 20:47:20.656861','2025-01-23 20:47:20.656861',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-02-24 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(220,'2025-01-23 20:47:20.674862','2025-01-23 20:47:20.674862',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-02-24 18:00:00.000000',NULL,1,0,0,97,NULL,1,NULL,NULL),(221,'2025-01-23 20:47:20.692860','2025-01-23 20:47:20.692860',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-01-28 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(222,'2025-01-23 20:47:20.709861','2025-01-23 20:47:20.709861',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-01-28 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(223,'2025-01-23 20:47:20.727861','2025-01-23 20:47:20.727861',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-02-04 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(224,'2025-01-23 20:47:20.743861','2025-01-23 20:47:20.743861',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-02-04 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(225,'2025-01-23 20:47:20.762861','2025-01-23 20:47:20.762861',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-02-11 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(226,'2025-01-23 20:47:20.778862','2025-01-23 20:47:20.778862',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-02-11 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(227,'2025-01-23 20:47:20.795862','2025-01-23 20:47:20.795862',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-02-18 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(228,'2025-01-23 20:47:20.816862','2025-01-23 20:47:20.816862',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-02-18 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(229,'2025-01-23 20:47:20.835863','2025-01-23 20:47:20.835863',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-02-25 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(230,'2025-01-23 20:47:20.854862','2025-01-23 20:47:20.854862',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-02-25 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(231,'2025-01-23 20:47:20.872862','2025-01-23 20:47:20.872862',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-01-29 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(232,'2025-01-23 20:47:20.889862','2025-01-23 20:47:20.889862',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-01-29 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(233,'2025-01-23 20:47:20.908863','2025-01-23 20:47:20.908863',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-02-05 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(234,'2025-01-23 20:47:20.926865','2025-01-23 20:47:20.926865',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-02-05 18:00:00.000000',NULL,1,0,0,NULL,NULL,2,NULL,NULL),(235,'2025-01-23 20:47:20.944864','2025-01-23 20:47:20.944864',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-02-12 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(236,'2025-01-23 20:47:20.961863','2025-01-23 20:47:20.961863',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-02-12 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(237,'2025-01-23 20:47:20.977863','2025-01-23 20:47:20.977863',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-02-19 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(238,'2025-01-23 20:47:20.994866','2025-01-23 20:47:20.994866',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-02-19 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(239,'2025-01-23 20:47:21.012864','2025-01-23 20:47:21.012864',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-02-26 05:20:00.000000',NULL,NULL,1,0,0,NULL,NULL,2,NULL,NULL),(240,'2025-01-23 20:47:21.031863','2025-01-23 20:47:21.031863',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-02-26 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(241,'2025-01-23 20:47:21.049864','2025-01-23 20:47:21.049864',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-01-30 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(242,'2025-01-23 20:47:21.066864','2025-01-23 20:47:21.066864',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-01-30 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(243,'2025-01-23 20:47:21.084864','2025-01-23 20:47:21.084864',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-02-06 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(244,'2025-01-23 20:47:21.102864','2025-01-23 20:47:21.102864',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-02-06 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(245,'2025-01-23 20:47:21.118864','2025-01-23 20:47:21.118864',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-02-13 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(246,'2025-01-23 20:47:21.135864','2025-01-23 20:47:21.135864',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-02-13 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(247,'2025-01-23 20:47:21.152864','2025-01-23 20:47:21.152864',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-02-20 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(248,'2025-01-23 20:47:21.169864','2025-01-23 20:47:21.169864',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-02-20 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(249,'2025-01-23 20:47:21.188865','2025-01-23 20:47:21.188865',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-02-27 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(250,'2025-01-23 20:47:21.204864','2025-01-23 20:47:21.204864',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-02-27 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(251,'2025-01-23 20:47:21.223866','2025-01-23 20:47:21.223866',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-01-31 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(252,'2025-01-23 20:47:21.243866','2025-01-23 20:47:21.243866',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-01-31 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(253,'2025-01-23 20:47:21.259865','2025-01-23 20:47:21.259865',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-02-07 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(254,'2025-01-23 20:47:21.276865','2025-01-23 20:47:21.276865',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-02-07 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(255,'2025-01-23 20:47:21.291865','2025-01-23 20:47:21.291865',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-02-14 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(256,'2025-01-23 20:47:21.307865','2025-01-23 20:47:21.307865',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-02-14 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(257,'2025-01-23 20:47:21.327866','2025-01-23 20:47:21.327866',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-02-21 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(258,'2025-01-23 20:47:21.343864','2025-01-23 20:47:21.343864',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-02-21 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(259,'2025-01-23 20:47:21.359865','2025-01-23 20:47:21.359865',49.833558,24.007984,49.858920,24.033717,'HOME_TO_WORK',1,'',394,251,389,'2025-02-28 05:20:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(260,'2025-01-23 20:47:21.375866','2025-01-23 20:47:21.375866',49.858920,24.033717,49.833558,24.007984,'WORK_TO_HOME',1,'',389,251,394,NULL,'2025-02-28 18:00:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(261,'2025-01-24 17:20:02.923649','2025-01-24 17:20:02.923649',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-01-25 05:30:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(262,'2025-01-24 17:20:02.964644','2025-01-24 17:20:02.964644',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-01-24 15:20:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(263,'2025-01-24 17:20:02.991639','2025-01-24 17:20:02.991639',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-01-27 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(264,'2025-01-24 17:20:03.016641','2025-01-24 17:20:03.016641',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-01-27 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(265,'2025-01-24 17:20:03.042641','2025-01-24 17:20:03.042641',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-03 05:30:31.816000',NULL,NULL,1,0,0,NULL,NULL,3,NULL,NULL),(266,'2025-01-24 17:20:03.066642','2025-01-24 17:20:03.066642',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-03 15:20:31.816000',NULL,1,0,0,NULL,NULL,3,NULL,NULL),(267,'2025-01-24 17:20:03.088642','2025-01-24 17:20:03.088642',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-10 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(268,'2025-01-24 17:20:03.111642','2025-01-24 17:20:03.111642',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-10 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(269,'2025-01-24 17:20:03.136642','2025-01-24 17:20:03.136642',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-17 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(270,'2025-01-24 17:20:03.158641','2025-01-24 17:20:03.158641',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-17 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(271,'2025-01-24 17:20:03.179642','2025-01-24 17:20:03.179642',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-24 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(272,'2025-01-24 17:20:03.201678','2025-01-24 17:20:03.201678',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-24 15:20:31.816000',NULL,1,0,0,97,NULL,3,NULL,NULL),(273,'2025-01-24 17:20:03.226642','2025-01-24 17:20:03.226642',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-01-28 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(274,'2025-01-24 17:20:03.246642','2025-01-24 17:20:03.246642',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-01-28 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(275,'2025-01-24 17:20:03.269642','2025-01-24 17:20:03.269642',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-04 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(276,'2025-01-24 17:20:03.290654','2025-01-24 17:20:03.290654',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-04 15:20:31.816000',NULL,1,0,0,99,NULL,7,NULL,NULL),(277,'2025-01-24 17:20:03.313643','2025-01-24 17:20:03.313643',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-11 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(278,'2025-01-24 17:20:03.332643','2025-01-24 17:20:03.332643',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-11 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(279,'2025-01-24 17:20:03.349641','2025-01-24 17:20:03.349641',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-18 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(280,'2025-01-24 17:20:03.373643','2025-01-24 17:20:03.373643',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-18 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(281,'2025-01-24 17:20:03.398643','2025-01-24 17:20:03.398643',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-25 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(282,'2025-01-24 17:20:03.425642','2025-01-24 17:20:03.425642',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-25 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(283,'2025-01-24 17:20:03.451645','2025-01-24 17:20:03.451645',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-01-29 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(284,'2025-01-24 17:20:03.475644','2025-01-24 17:20:03.475644',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-01-29 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(285,'2025-01-24 17:20:03.500643','2025-01-24 17:20:03.500643',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-05 05:30:31.816000',NULL,NULL,1,0,0,NULL,NULL,1,NULL,NULL),(286,'2025-01-24 17:20:03.525644','2025-01-24 17:20:03.525644',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-05 15:20:31.816000',NULL,1,0,0,NULL,NULL,3,NULL,NULL),(287,'2025-01-24 17:20:03.545644','2025-01-24 17:20:03.545644',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-12 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(288,'2025-01-24 17:20:03.566644','2025-01-24 17:20:03.566644',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-12 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(289,'2025-01-24 17:20:03.587645','2025-01-24 17:20:03.587645',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-19 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(290,'2025-01-24 17:20:03.608643','2025-01-24 17:20:03.608643',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-19 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(291,'2025-01-24 17:20:03.630645','2025-01-24 17:20:03.630645',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-26 05:30:31.816000',NULL,NULL,1,0,0,NULL,NULL,3,NULL,NULL),(292,'2025-01-24 17:20:03.649643','2025-01-24 17:20:03.649643',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-26 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(293,'2025-01-24 17:20:03.666644','2025-01-24 17:20:03.666644',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-01-30 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(294,'2025-01-24 17:20:03.682645','2025-01-24 17:20:03.683646',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-01-30 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(295,'2025-01-24 17:20:03.698644','2025-01-24 17:20:03.698644',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-06 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(296,'2025-01-24 17:20:03.714647','2025-01-24 17:20:03.714647',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-06 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(297,'2025-01-24 17:20:03.733644','2025-01-24 17:20:03.733644',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-13 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(298,'2025-01-24 17:20:03.749644','2025-01-24 17:20:03.749644',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-13 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(299,'2025-01-24 17:20:03.764645','2025-01-24 17:20:03.764645',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-20 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(300,'2025-01-24 17:20:03.780645','2025-01-24 17:20:03.780645',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-20 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(301,'2025-01-24 17:20:03.797645','2025-01-24 17:20:03.797645',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-27 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(302,'2025-01-24 17:20:03.815645','2025-01-24 17:20:03.815645',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-27 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(303,'2025-01-24 17:20:03.832645','2025-01-24 17:20:03.832645',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-01-24 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(304,'2025-01-24 17:20:03.847645','2025-01-24 17:20:03.847645',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-01-31 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(305,'2025-01-24 17:20:03.862645','2025-01-24 17:20:03.862645',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-01-31 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(306,'2025-01-24 17:20:03.882645','2025-01-24 17:20:03.882645',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-07 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(307,'2025-01-24 17:20:03.898646','2025-01-24 17:20:03.898646',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-07 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(308,'2025-01-24 17:20:03.915646','2025-01-24 17:20:03.915646',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-14 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(309,'2025-01-24 17:20:03.932646','2025-01-24 17:20:03.932646',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-14 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(310,'2025-01-24 17:20:03.949646','2025-01-24 17:20:03.949646',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-21 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(311,'2025-01-24 17:20:03.965646','2025-01-24 17:20:03.965646',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-21 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(312,'2025-01-24 17:20:03.985648','2025-01-24 17:20:03.985648',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-28 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(313,'2025-01-24 17:20:04.003647','2025-01-24 17:20:04.003647',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-28 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(314,'2025-01-24 17:20:04.021646','2025-01-24 17:20:04.021646',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-01-25 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(315,'2025-01-24 17:20:04.038646','2025-01-24 17:20:04.038646',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-01 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(316,'2025-01-24 17:20:04.055646','2025-01-24 17:20:04.055646',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-01 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(317,'2025-01-24 17:20:04.071646','2025-01-24 17:20:04.071646',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-08 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(318,'2025-01-24 17:20:04.090648','2025-01-24 17:20:04.090648',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-08 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(319,'2025-01-24 17:20:04.108646','2025-01-24 17:20:04.108646',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-15 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(320,'2025-01-24 17:20:04.126647','2025-01-24 17:20:04.126647',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-15 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(321,'2025-01-24 17:20:04.145647','2025-01-24 17:20:04.145647',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-02-22 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(322,'2025-01-24 17:20:04.163647','2025-01-24 17:20:04.163647',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-02-22 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(323,'2025-01-24 17:20:04.182647','2025-01-24 17:20:04.182647',49.254471,23.843767,49.858782,24.027108,'HOME_TO_WORK',1,'',378,246,376,'2025-03-01 05:30:31.816000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(324,'2025-01-24 17:20:04.200652','2025-01-24 17:20:04.200652',49.858782,24.027108,49.254471,23.843767,'WORK_TO_HOME',1,'',376,246,378,NULL,'2025-03-01 15:20:31.816000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(325,'2025-01-24 17:21:50.686413','2025-01-24 17:21:50.686413',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-01-24 05:30:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(326,'2025-01-24 17:21:50.712392','2025-01-24 17:21:50.712392',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-01-24 05:20:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(327,'2025-01-24 17:21:50.736392','2025-01-24 17:21:50.736392',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-01-27 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(328,'2025-01-24 17:21:50.755371','2025-01-24 17:21:50.755371',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-01-27 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(329,'2025-01-24 17:21:50.776367','2025-01-24 17:21:50.776367',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-03 05:30:29.199000',NULL,NULL,1,0,0,NULL,NULL,4,NULL,NULL),(330,'2025-01-24 17:21:50.794369','2025-01-24 17:21:50.794369',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-03 05:20:29.199000',NULL,1,0,0,NULL,NULL,4,NULL,NULL),(331,'2025-01-24 17:21:50.813368','2025-01-24 17:21:50.813368',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-10 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(332,'2025-01-24 17:21:50.831367','2025-01-24 17:21:50.831367',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-10 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(333,'2025-01-24 17:21:50.849367','2025-01-24 17:21:50.849367',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-17 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(334,'2025-01-24 17:21:50.867367','2025-01-24 17:21:50.867367',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-17 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(335,'2025-01-24 17:21:50.883368','2025-01-24 17:21:50.883368',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-24 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(336,'2025-01-24 17:21:50.902369','2025-01-24 17:21:50.902369',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-24 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(337,'2025-01-24 17:21:50.919368','2025-01-25 20:47:02.088348',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-01-28 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(338,'2025-01-24 17:21:50.936368','2025-01-24 17:21:50.936368',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-01-28 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(339,'2025-01-24 17:21:50.952368','2025-01-24 17:21:50.952368',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-04 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(340,'2025-01-24 17:21:50.970369','2025-01-24 17:21:50.970369',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-04 05:20:29.199000',NULL,1,0,0,99,NULL,6,NULL,NULL),(341,'2025-01-24 17:21:50.988371','2025-01-24 17:21:50.988371',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-11 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(342,'2025-01-24 17:21:51.005369','2025-01-24 17:21:51.005369',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-11 05:20:29.199000',NULL,1,0,0,99,NULL,5,NULL,NULL),(343,'2025-01-24 17:21:51.022368','2025-01-24 17:21:51.022368',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-18 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(344,'2025-01-24 17:21:51.039368','2025-01-24 17:21:51.040368',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-18 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(345,'2025-01-24 17:21:51.055418','2025-01-24 17:21:51.055418',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-25 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(346,'2025-01-24 17:21:51.071381','2025-01-24 17:21:51.071381',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-25 05:20:29.199000',NULL,1,0,0,97,NULL,2,NULL,NULL),(347,'2025-01-24 17:21:51.089404','2025-01-24 17:21:51.089404',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-01-29 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(348,'2025-01-24 17:21:51.108386','2025-01-24 17:21:51.108386',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-01-29 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(349,'2025-01-24 17:21:51.126412','2025-01-24 17:21:51.126412',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-05 05:30:29.199000',NULL,NULL,1,0,0,NULL,NULL,2,NULL,NULL),(350,'2025-01-24 17:21:51.146419','2025-01-24 17:21:51.146419',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-05 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(351,'2025-01-24 17:21:51.163406','2025-01-24 17:21:51.163406',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-12 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(352,'2025-01-24 17:21:51.179407','2025-01-24 17:21:51.179407',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-12 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(353,'2025-01-24 17:21:51.196405','2025-01-24 17:21:51.196405',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-19 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(354,'2025-01-24 17:21:51.213408','2025-01-24 17:21:51.213408',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-19 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(355,'2025-01-24 17:21:51.229422','2025-01-24 17:21:51.229422',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-26 05:30:29.199000',NULL,NULL,1,0,0,NULL,NULL,1,NULL,NULL),(356,'2025-01-24 17:21:51.248409','2025-01-24 17:21:51.248409',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-26 05:20:29.199000',NULL,1,0,0,NULL,NULL,2,NULL,NULL),(357,'2025-01-24 17:21:51.264406','2025-01-25 20:47:01.647884',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-01-30 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(358,'2025-01-24 17:21:51.280409','2025-01-24 17:21:51.280409',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-01-30 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(359,'2025-01-24 17:21:51.301403','2025-01-24 17:21:51.301403',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-06 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(360,'2025-01-24 17:21:51.321412','2025-01-24 17:21:51.321412',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-06 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(361,'2025-01-24 17:21:51.337411','2025-01-24 17:21:51.337411',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-13 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(362,'2025-01-24 17:21:51.354395','2025-01-24 17:21:51.354395',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-13 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(363,'2025-01-24 17:21:51.370406','2025-01-24 17:21:51.370406',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-20 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(364,'2025-01-24 17:21:51.386406','2025-01-24 17:21:51.386406',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-20 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(365,'2025-01-24 17:21:51.409403','2025-01-24 17:21:51.409403',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-27 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(366,'2025-01-24 17:21:51.427420','2025-01-24 17:21:51.427420',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-27 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(367,'2025-01-24 17:21:51.444406','2025-01-24 17:21:51.444406',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-01-31 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(368,'2025-01-24 17:21:51.461406','2025-01-24 17:21:51.461406',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-01-31 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(369,'2025-01-24 17:21:51.478408','2025-01-24 17:21:51.478408',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-07 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(370,'2025-01-24 17:21:51.495407','2025-01-24 17:21:51.495407',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-07 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(371,'2025-01-24 17:21:51.513409','2025-01-24 17:21:51.513409',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-14 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(372,'2025-01-24 17:21:51.530407','2025-01-24 17:21:51.530407',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-14 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(373,'2025-01-24 17:21:51.546407','2025-01-24 17:21:51.546407',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-21 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(374,'2025-01-24 17:21:51.566373','2025-01-24 17:21:51.566373',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-21 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(375,'2025-01-24 17:21:51.586373','2025-01-24 17:21:51.586373',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-28 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(376,'2025-01-24 17:21:51.605371','2025-01-24 17:21:51.605371',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-28 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(377,'2025-01-24 17:21:51.628373','2025-01-25 20:47:00.912742',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-01-25 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(378,'2025-01-24 17:21:51.650408','2025-01-24 17:21:51.650408',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-01-25 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(379,'2025-01-24 17:21:51.669408','2025-01-24 17:21:51.669408',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-01 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(380,'2025-01-24 17:21:51.687406','2025-01-24 17:21:51.687406',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-01 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(381,'2025-01-24 17:21:51.705408','2025-01-24 17:21:51.705408',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-08 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(382,'2025-01-24 17:21:51.722411','2025-01-24 17:21:51.723408',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-08 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(383,'2025-01-24 17:21:51.741387','2025-01-24 17:21:51.742376',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-15 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(384,'2025-01-24 17:21:51.762405','2025-01-24 17:21:51.762405',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-15 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(385,'2025-01-24 17:21:51.781375','2025-01-24 17:21:51.781375',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-02-22 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(386,'2025-01-24 17:21:51.803376','2025-01-24 17:21:51.803376',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-02-22 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(387,'2025-01-24 17:21:51.822406','2025-01-24 17:21:51.822406',49.522000,23.979996,49.858279,24.030269,'HOME_TO_WORK',1,'',367,250,369,'2025-03-01 05:30:29.199000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(388,'2025-01-24 17:21:51.839407','2025-01-24 17:21:51.839407',49.858279,24.030269,49.522000,23.979996,'WORK_TO_HOME',1,'',369,250,367,NULL,'2025-03-01 05:20:29.199000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(389,'2025-01-24 17:23:54.761149','2025-01-24 17:23:54.761149',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-01-24 05:30:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(390,'2025-01-24 17:23:54.788714','2025-01-24 21:01:16.656136',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',0,'',384,194,396,NULL,'2025-01-24 15:22:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(391,'2025-01-24 17:23:54.808713','2025-01-24 17:23:54.808713',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-01-27 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(392,'2025-01-24 17:23:54.828684','2025-01-27 21:00:07.677050',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',0,'',384,194,396,NULL,'2025-01-27 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(393,'2025-01-24 17:23:54.847713','2025-01-24 17:23:54.847713',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-03 05:30:19.301000',NULL,NULL,1,0,0,NULL,NULL,5,NULL,NULL),(394,'2025-01-24 17:23:54.866684','2025-01-24 17:23:54.866684',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-03 15:22:19.301000',NULL,1,0,0,NULL,NULL,5,NULL,NULL),(395,'2025-01-24 17:23:54.884684','2025-01-24 17:23:54.884684',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-10 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(396,'2025-01-24 17:23:54.906715','2025-01-24 17:23:54.906715',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-10 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(397,'2025-01-24 17:23:54.925410','2025-01-24 17:23:54.925410',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-17 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(398,'2025-01-24 17:23:54.945381','2025-01-24 17:23:54.945381',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-17 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(399,'2025-01-24 17:23:54.964415','2025-01-24 17:23:54.964415',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-24 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(400,'2025-01-24 17:23:54.985381','2025-01-24 17:23:54.985381',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-24 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(401,'2025-01-24 17:23:55.005413','2025-01-25 20:47:00.512025',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-01-28 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(402,'2025-01-24 17:23:55.024412','2025-01-27 21:04:26.411013',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-01-28 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(403,'2025-01-24 17:23:55.043411','2025-01-24 17:23:55.043411',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-04 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(404,'2025-01-24 17:23:55.062417','2025-01-24 17:23:55.062417',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-04 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(405,'2025-01-24 17:23:55.081417','2025-01-24 17:23:55.081417',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-11 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(406,'2025-01-24 17:23:55.100426','2025-01-24 17:23:55.100426',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-11 15:22:19.301000',NULL,1,0,0,98,NULL,2,NULL,NULL),(407,'2025-01-24 17:23:55.117382','2025-01-24 17:23:55.117382',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-18 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(408,'2025-01-24 17:23:55.134412','2025-01-24 17:23:55.134412',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-18 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(409,'2025-01-24 17:23:55.150412','2025-01-24 17:23:55.150412',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-25 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(410,'2025-01-24 17:23:55.167382','2025-01-24 17:23:55.167382',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-25 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(411,'2025-01-24 17:23:55.185414','2025-01-25 20:47:00.162672',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-01-29 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(412,'2025-01-24 17:23:55.200416','2025-01-24 17:23:55.200416',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-01-29 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(413,'2025-01-24 17:23:55.218413','2025-01-24 17:23:55.218413',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-05 05:30:19.301000',NULL,NULL,1,0,0,NULL,NULL,3,NULL,NULL),(414,'2025-01-24 17:23:55.235382','2025-01-24 17:23:55.235382',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-05 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(415,'2025-01-24 17:23:55.255414','2025-01-24 17:23:55.255414',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-12 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(416,'2025-01-24 17:23:55.278415','2025-01-24 17:23:55.278415',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-12 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(417,'2025-01-24 17:23:55.297393','2025-01-24 17:23:55.297393',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-19 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(418,'2025-01-24 17:23:55.318398','2025-01-24 17:23:55.319388',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-19 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(419,'2025-01-24 17:23:55.344388','2025-01-24 17:23:55.345387',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-26 05:30:19.301000',NULL,NULL,1,0,0,NULL,NULL,2,NULL,NULL),(420,'2025-01-24 17:23:55.376385','2025-01-24 17:23:55.376385',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-26 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(421,'2025-01-24 17:23:55.398382','2025-01-25 20:46:59.788476',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-01-30 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(422,'2025-01-24 17:23:55.428384','2025-01-25 20:53:20.800898',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',0,'',384,194,396,NULL,'2025-01-30 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(423,'2025-01-24 17:23:55.450383','2025-01-24 17:23:55.450383',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-06 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(424,'2025-01-24 17:23:55.474384','2025-01-24 17:23:55.474384',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-06 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(425,'2025-01-24 17:23:55.494384','2025-01-24 17:23:55.494384',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-13 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(426,'2025-01-24 17:23:55.515383','2025-01-24 17:23:55.515383',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-13 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(427,'2025-01-24 17:23:55.534391','2025-01-24 17:23:55.534391',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-20 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(428,'2025-01-24 17:23:55.564385','2025-01-24 17:23:55.564385',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-20 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(429,'2025-01-24 17:23:55.590385','2025-01-24 17:23:55.590385',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-27 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(430,'2025-01-24 17:23:55.608392','2025-01-24 17:23:55.608392',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-27 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(431,'2025-01-24 17:23:55.626385','2025-01-25 20:53:19.684135',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',0,'',396,194,384,'2025-01-31 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(432,'2025-01-24 17:23:55.642385','2025-01-25 20:53:18.810015',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',0,'',384,194,396,NULL,'2025-01-31 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(433,'2025-01-24 17:23:55.657384','2025-01-24 17:23:55.657384',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-07 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(434,'2025-01-24 17:23:55.672384','2025-01-24 17:23:55.672384',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-07 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(435,'2025-01-24 17:23:55.689384','2025-01-24 17:23:55.689384',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-14 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(436,'2025-01-24 17:23:55.705384','2025-01-24 17:23:55.705384',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-14 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(437,'2025-01-24 17:23:55.720394','2025-01-24 17:23:55.720394',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-21 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(438,'2025-01-24 17:23:55.736426','2025-01-24 17:23:55.736426',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-21 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(439,'2025-01-24 17:23:55.753417','2025-01-24 17:23:55.753417',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-28 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(440,'2025-01-24 17:23:55.770393','2025-01-24 17:23:55.770393',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-28 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(441,'2025-01-24 17:23:55.786458','2025-01-25 20:53:17.764173',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',0,'',396,194,384,'2025-01-25 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(442,'2025-01-24 17:23:55.807417','2025-01-25 20:53:16.449976',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',0,'',384,194,396,NULL,'2025-01-25 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(443,'2025-01-24 17:23:55.824386','2025-01-24 17:23:55.824386',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-01 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(444,'2025-01-24 17:23:55.840420','2025-01-24 17:23:55.840420',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-01 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(445,'2025-01-24 17:23:55.857417','2025-01-24 17:23:55.857417',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-08 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(446,'2025-01-24 17:23:55.874386','2025-01-25 20:46:58.645726',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-08 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(447,'2025-01-24 17:23:55.892417','2025-01-24 17:23:55.892417',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-15 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(448,'2025-01-24 17:23:55.909418','2025-01-25 20:46:58.234719',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-15 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(449,'2025-01-24 17:23:55.927416','2025-01-24 17:23:55.927416',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-02-22 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(450,'2025-01-24 17:23:55.944417','2025-01-25 09:16:09.304060',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-02-22 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(451,'2025-01-24 17:23:55.961418','2025-01-25 20:46:56.967850',49.672324,24.555026,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,384,'2025-03-01 05:30:19.301000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(452,'2025-01-24 17:23:55.983413','2025-01-24 17:23:55.983413',49.858920,24.033717,49.672324,24.555026,'WORK_TO_HOME',1,'',384,194,396,NULL,'2025-03-01 15:22:19.301000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(453,'2025-01-27 12:39:13.250136','2025-01-27 12:39:13.250136',49.831327,23.989692,49.858920,24.033717,'HOME_TO_WORK',1,'',398,100,397,'2025-01-28 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(454,'2025-01-27 12:40:38.657709','2025-01-27 12:40:38.657709',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-01-28 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(455,'2025-01-27 12:40:38.700039','2025-01-27 21:04:45.366049',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',0,'',341,248,343,NULL,'2025-01-27 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(456,'2025-01-27 12:40:38.734834','2025-01-27 12:40:38.734834',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-01-27 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(457,'2025-01-27 12:40:38.768834','2025-01-27 12:40:38.768834',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-03 05:00:00.000000',NULL,NULL,1,0,0,NULL,NULL,6,NULL,NULL),(458,'2025-01-27 12:40:38.803834','2025-01-27 12:40:38.803834',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-03 16:40:00.000000',NULL,1,0,0,NULL,NULL,6,NULL,NULL),(459,'2025-01-27 12:40:38.833843','2025-01-27 12:40:38.833843',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-10 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(460,'2025-01-27 12:40:38.884835','2025-01-27 12:40:38.884835',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-10 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(461,'2025-01-27 12:40:38.913844','2025-01-27 12:40:38.913844',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-17 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(462,'2025-01-27 12:40:38.945835','2025-01-27 12:40:38.945835',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-17 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(463,'2025-01-27 12:40:38.979842','2025-01-27 12:40:38.979842',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-24 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(464,'2025-01-27 12:40:39.006844','2025-01-27 12:40:39.006844',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-24 16:40:00.000000',NULL,1,0,0,95,NULL,1,NULL,NULL),(465,'2025-01-27 12:40:39.033835','2025-01-27 12:40:39.033835',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-01-28 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(466,'2025-01-27 12:40:39.064836','2025-01-27 12:40:39.064836',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-04 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(467,'2025-01-27 12:40:39.094843','2025-01-27 12:40:39.095854',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-04 16:40:00.000000',NULL,1,0,0,99,NULL,1,NULL,NULL),(468,'2025-01-27 12:40:39.117836','2025-01-27 12:40:39.117836',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-11 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(469,'2025-01-27 12:40:39.149836','2025-01-27 12:40:39.149836',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-11 16:40:00.000000',NULL,1,0,0,98,NULL,5,NULL,NULL),(470,'2025-01-27 12:40:39.187840','2025-01-27 12:40:39.187840',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-18 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(471,'2025-01-27 12:40:39.225839','2025-01-27 12:40:39.225839',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-18 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(472,'2025-01-27 12:40:39.258840','2025-01-27 12:40:39.258840',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-25 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(473,'2025-01-27 12:40:39.284837','2025-01-27 12:40:39.284837',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-25 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(474,'2025-01-27 12:40:39.321868','2025-01-27 12:40:39.321868',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-01-29 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(475,'2025-01-27 12:40:39.363840','2025-01-27 12:40:39.363840',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-01-29 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(476,'2025-01-27 12:40:39.399839','2025-01-27 12:40:39.399839',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-05 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(477,'2025-01-27 12:40:39.424838','2025-01-27 12:40:39.424838',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-05 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(478,'2025-01-27 12:40:39.456848','2025-01-27 12:40:39.456848',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-12 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(479,'2025-01-27 12:40:39.486839','2025-01-27 12:40:39.486839',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-12 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(480,'2025-01-27 12:40:39.509844','2025-01-27 12:40:39.509844',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-19 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(481,'2025-01-27 12:40:39.542843','2025-01-27 12:40:39.542843',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-19 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(482,'2025-01-27 12:40:39.576838','2025-01-27 12:40:39.576838',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-26 05:00:00.000000',NULL,NULL,1,0,0,NULL,NULL,3,NULL,NULL),(483,'2025-01-27 12:40:39.602838','2025-01-27 12:40:39.602838',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-26 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(484,'2025-01-27 12:40:39.627841','2025-01-27 12:40:39.627841',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-01-30 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(485,'2025-01-27 12:40:39.659839','2025-01-27 12:40:39.659839',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-01-30 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(486,'2025-01-27 12:40:39.691850','2025-01-27 12:40:39.691850',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-06 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(487,'2025-01-27 12:40:39.717839','2025-01-27 12:40:39.717839',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-06 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(488,'2025-01-27 12:40:39.741839','2025-01-27 12:40:39.741839',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-13 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(489,'2025-01-27 12:40:39.770839','2025-01-27 12:40:39.770839',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-13 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(490,'2025-01-27 12:40:39.808842','2025-01-27 12:40:39.808842',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-20 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(491,'2025-01-27 12:40:39.840841','2025-01-27 12:40:39.840841',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-20 16:40:00.000000',NULL,1,0,0,NULL,NULL,1,NULL,NULL),(492,'2025-01-27 12:40:39.871841','2025-01-27 12:40:39.871841',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-27 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(493,'2025-01-27 12:40:39.910841','2025-01-27 12:40:39.910841',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-27 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(494,'2025-01-27 12:40:39.951845','2025-01-27 12:40:39.951845',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-01-31 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(495,'2025-01-27 12:40:39.985842','2025-01-27 12:40:39.985842',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-01-31 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(496,'2025-01-27 12:40:40.022845','2025-01-27 12:40:40.022845',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-07 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(497,'2025-01-27 12:40:40.065844','2025-01-27 12:40:40.065844',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-07 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(498,'2025-01-27 12:40:40.106848','2025-01-27 12:40:40.106848',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-14 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(499,'2025-01-27 12:40:40.131840','2025-01-27 12:40:40.131840',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-14 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(500,'2025-01-27 12:40:40.157840','2025-01-27 12:40:40.157840',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-21 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(501,'2025-01-27 12:40:40.189841','2025-01-27 12:40:40.189841',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-21 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(502,'2025-01-27 12:40:40.219841','2025-01-27 12:40:40.219841',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-28 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(503,'2025-01-27 12:40:40.241840','2025-01-27 12:40:40.241840',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-28 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(504,'2025-01-27 12:40:40.268842','2025-01-27 12:40:40.268842',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-01 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(505,'2025-01-27 12:40:40.306858','2025-01-27 12:40:40.306858',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-01 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(506,'2025-01-27 12:40:40.426842','2025-01-27 12:40:40.426842',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-08 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(507,'2025-01-27 12:40:40.456848','2025-01-27 12:40:40.456848',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-08 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(508,'2025-01-27 12:40:40.488849','2025-01-27 12:40:40.488849',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-15 05:00:00.000000',NULL,NULL,1,0,0,NULL,NULL,NULL,NULL,NULL),(509,'2025-01-27 12:40:40.531845','2025-01-27 12:40:40.531845',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-15 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(510,'2025-01-27 12:40:40.573850','2025-01-27 12:40:40.573850',49.843251,24.039446,49.839683,24.029717,'HOME_TO_WORK',1,'',343,248,341,'2025-02-22 05:00:00.000000',NULL,NULL,1,0,0,NULL,NULL,NULL,NULL,NULL),(511,'2025-01-27 12:40:40.599844','2025-01-27 12:40:40.599844',49.839683,24.029717,49.843251,24.039446,'WORK_TO_HOME',1,'',341,248,343,NULL,'2025-02-22 16:40:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(512,'2025-01-27 12:42:27.585671','2025-01-27 12:42:27.585671',49.831327,23.989692,49.858920,24.033717,'HOME_TO_WORK',1,'',398,100,397,'2025-01-29 05:00:00.000000',NULL,NULL,1,1,0,NULL,NULL,1,NULL,NULL),(513,'2025-02-02 14:43:12.478164','2025-02-02 14:44:06.574265',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',0,'',400,187,399,'2025-02-02 06:59:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(514,'2025-02-02 14:43:12.522479','2025-02-02 14:43:12.522479',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-02 15:30:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(515,'2025-02-02 14:43:12.549449','2025-02-02 14:44:09.002393',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',0,'',400,187,399,'2025-02-03 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(516,'2025-02-02 14:43:12.577480','2025-02-02 14:43:12.577480',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-03 15:30:36.856000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(517,'2025-02-02 14:43:12.609480','2025-02-02 14:43:12.609480',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-10 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(518,'2025-02-02 14:43:12.637450','2025-02-02 14:43:12.637450',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-10 15:30:36.856000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(519,'2025-02-02 14:43:12.662499','2025-02-02 14:43:12.662499',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-17 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(520,'2025-02-02 14:43:12.691482','2025-02-02 14:43:12.691482',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-17 15:30:36.856000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(521,'2025-02-02 14:43:12.722476','2025-02-02 14:43:12.722476',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-24 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(522,'2025-02-02 14:43:12.752484','2025-02-02 14:43:12.752484',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-24 15:30:36.856000',NULL,1,0,0,95,NULL,2,NULL,NULL),(523,'2025-02-02 14:43:12.779452','2025-02-02 14:43:12.779452',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-04 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(524,'2025-02-02 14:43:12.807475','2025-02-02 14:43:12.807475',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-04 15:30:36.856000',NULL,1,0,0,99,NULL,2,NULL,NULL),(525,'2025-02-02 14:43:12.840473','2025-02-02 14:43:12.841480',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-11 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(526,'2025-02-02 14:43:12.873479','2025-02-02 14:43:12.874479',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-11 15:30:36.856000',NULL,1,0,0,98,NULL,4,NULL,NULL),(527,'2025-02-02 14:43:12.898480','2025-02-02 14:43:12.898480',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-18 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(528,'2025-02-02 14:43:12.926480','2025-02-02 14:43:12.926480',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-18 15:30:36.856000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(529,'2025-02-02 14:43:12.952484','2025-02-02 14:43:12.952484',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-25 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(530,'2025-02-02 14:43:12.975734','2025-02-02 14:43:12.975734',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-25 15:30:36.856000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(531,'2025-02-02 14:43:12.999215','2025-02-02 14:43:12.999215',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-05 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(532,'2025-02-02 14:43:13.030863','2025-02-02 14:43:13.030863',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-05 15:30:36.856000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(533,'2025-02-02 14:43:13.060222','2025-02-02 14:43:13.060222',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-12 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(534,'2025-02-02 14:43:13.085498','2025-02-02 14:43:13.086505',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-12 15:30:36.856000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(535,'2025-02-02 14:43:13.112124','2025-02-02 14:43:13.112124',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-19 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(536,'2025-02-02 14:43:13.144250','2025-02-02 14:43:13.144250',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-19 15:30:36.856000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(537,'2025-02-02 14:43:13.177201','2025-02-02 14:43:13.177201',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-26 06:59:36.856000',NULL,NULL,1,0,0,NULL,NULL,1,NULL,NULL),(538,'2025-02-02 14:43:13.210238','2025-02-02 14:43:13.210238',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-26 15:30:36.856000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(539,'2025-02-02 14:43:13.245259','2025-02-02 14:43:13.245259',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-06 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(540,'2025-02-02 14:43:13.334257','2025-02-02 14:43:13.334257',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-06 15:30:36.856000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(541,'2025-02-02 14:43:13.364256','2025-02-02 14:43:13.364256',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-13 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(542,'2025-02-02 14:43:13.406258','2025-02-02 14:43:13.406258',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-13 15:30:36.856000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(543,'2025-02-02 14:43:13.435299','2025-02-02 14:43:13.435299',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-20 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(544,'2025-02-02 14:43:13.473299','2025-02-02 14:43:13.473299',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-20 15:30:36.856000',NULL,1,0,0,NULL,NULL,2,NULL,NULL),(545,'2025-02-02 14:43:13.511263','2025-02-02 14:43:13.511263',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-27 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(546,'2025-02-02 14:43:13.542300','2025-02-02 14:43:13.542300',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-27 15:30:36.856000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(547,'2025-02-02 14:43:13.577301','2025-02-02 14:43:13.577301',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-07 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(548,'2025-02-02 14:43:13.612301','2025-02-02 14:43:13.612301',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-07 15:30:36.856000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(549,'2025-02-02 14:43:13.647297','2025-02-02 14:43:13.647297',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-14 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(550,'2025-02-02 14:43:13.671294','2025-02-02 14:43:13.671294',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-14 15:30:36.856000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(551,'2025-02-02 14:43:13.693290','2025-02-02 14:43:13.693290',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-21 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(552,'2025-02-02 14:43:13.728300','2025-02-02 14:43:13.728300',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-21 15:30:36.856000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(553,'2025-02-02 14:43:13.767500','2025-02-02 14:43:13.767500',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-28 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(554,'2025-02-02 14:43:13.793850','2025-02-02 14:43:13.793850',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-28 15:30:36.856000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(555,'2025-02-02 14:43:13.822834','2025-02-02 14:43:13.822834',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-08 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(556,'2025-02-02 14:43:13.855190','2025-02-02 14:43:13.855190',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-08 15:30:36.856000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(557,'2025-02-02 14:43:13.882516','2025-02-02 14:43:13.882516',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-15 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(558,'2025-02-02 14:43:13.906516','2025-02-02 14:43:13.906516',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-15 15:30:36.856000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(559,'2025-02-02 14:43:13.932518','2025-02-02 14:43:13.932518',49.828114,24.031219,49.856845,24.021916,'HOME_TO_WORK',1,'',400,187,399,'2025-02-22 06:59:36.856000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(560,'2025-02-02 14:43:13.967516','2025-02-02 14:43:13.967516',49.856845,24.021916,49.828114,24.031219,'WORK_TO_HOME',1,'',399,187,400,NULL,'2025-02-22 15:30:36.856000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(561,'2025-02-02 14:46:36.315391','2025-02-02 14:46:36.315391',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-02 05:00:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(562,'2025-02-02 14:46:36.350384','2025-02-02 14:46:36.350384',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-02 15:30:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(563,'2025-02-02 14:46:36.373141','2025-02-02 14:46:36.373141',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-03 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(564,'2025-02-02 14:46:36.396404','2025-02-02 14:46:36.396404',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-03 15:30:12.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(565,'2025-02-02 14:46:36.429403','2025-02-02 14:46:36.429403',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-10 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(566,'2025-02-02 14:46:36.456375','2025-02-02 14:46:36.456375',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-10 15:30:12.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(567,'2025-02-02 14:46:36.479371','2025-02-02 14:46:36.479371',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-17 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(568,'2025-02-02 14:46:36.506374','2025-02-02 14:46:36.506374',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-17 15:30:12.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(569,'2025-02-02 14:46:36.536388','2025-02-02 14:46:36.536388',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-24 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(570,'2025-02-02 14:46:36.568372','2025-02-02 14:46:36.568372',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-24 15:30:12.000000',NULL,1,0,0,95,NULL,4,NULL,NULL),(571,'2025-02-02 14:46:36.592373','2025-02-02 14:46:36.592373',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-04 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(572,'2025-02-02 14:46:36.618373','2025-02-02 14:46:36.618373',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-04 15:30:12.000000',NULL,1,0,0,99,NULL,4,NULL,NULL),(573,'2025-02-02 14:46:36.648412','2025-02-02 14:46:36.648412',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-11 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(574,'2025-02-02 14:46:36.679388','2025-02-02 14:46:36.679388',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-11 15:30:12.000000',NULL,1,0,0,98,NULL,3,NULL,NULL),(575,'2025-02-02 14:46:36.704372','2025-02-02 14:46:36.704372',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-18 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(576,'2025-02-02 14:46:36.733373','2025-02-02 14:46:36.733373',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-18 15:30:12.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(577,'2025-02-02 14:46:36.763374','2025-02-02 14:46:36.763374',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-25 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(578,'2025-02-02 14:46:36.792374','2025-02-02 14:46:36.792374',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-25 15:30:12.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(579,'2025-02-02 14:46:36.820389','2025-02-02 14:46:36.820389',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-05 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(580,'2025-02-02 14:46:36.870375','2025-02-02 14:46:36.870375',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-05 15:30:12.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(581,'2025-02-02 14:46:36.901374','2025-02-02 14:46:36.901374',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-12 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(582,'2025-02-02 14:46:36.934375','2025-02-02 14:46:36.934375',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-12 15:30:12.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(583,'2025-02-02 14:46:36.960373','2025-02-02 14:46:36.960373',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-19 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(584,'2025-02-02 14:46:36.982374','2025-02-02 14:46:36.982374',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-19 15:30:12.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(585,'2025-02-02 14:46:37.007375','2025-02-02 14:46:37.007375',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-26 05:00:12.000000',NULL,NULL,1,0,0,NULL,NULL,2,NULL,NULL),(586,'2025-02-02 14:46:37.039376','2025-02-02 14:46:37.039376',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-26 15:30:12.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(587,'2025-02-02 14:46:37.071380','2025-02-02 14:46:37.071380',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-06 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(588,'2025-02-02 14:46:37.095375','2025-02-02 14:46:37.095375',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-06 15:30:12.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(589,'2025-02-02 14:46:37.117375','2025-02-02 14:46:37.117375',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-13 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(590,'2025-02-02 14:46:37.146375','2025-02-02 14:46:37.146375',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-13 15:30:12.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(591,'2025-02-02 14:46:37.174375','2025-02-02 14:46:37.174375',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-20 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(592,'2025-02-02 14:46:37.199375','2025-02-02 14:46:37.199375',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-20 15:30:12.000000',NULL,1,0,0,NULL,NULL,3,NULL,NULL),(593,'2025-02-02 14:46:37.221383','2025-02-02 14:46:37.222376',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-27 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(594,'2025-02-02 14:46:37.252376','2025-02-02 14:46:37.252376',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-27 15:30:12.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(595,'2025-02-02 14:46:37.283383','2025-02-02 14:46:37.283383',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-07 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(596,'2025-02-02 14:46:37.305382','2025-02-02 14:46:37.305382',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-07 15:30:12.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(597,'2025-02-02 14:46:37.328378','2025-02-02 14:46:37.329376',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-14 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(598,'2025-02-02 14:46:37.360377','2025-02-02 14:46:37.360377',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-14 15:30:12.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(599,'2025-02-02 14:46:37.394377','2025-02-02 14:46:37.394377',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-21 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(600,'2025-02-02 14:46:37.419378','2025-02-02 14:46:37.419378',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-21 15:30:12.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(601,'2025-02-02 14:46:37.442377','2025-02-02 14:46:37.442377',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-28 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(602,'2025-02-02 14:46:37.472378','2025-02-02 14:46:37.472378',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-28 15:30:12.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(603,'2025-02-02 14:46:37.506381','2025-02-02 14:46:37.506381',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-08 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(604,'2025-02-02 14:46:37.530377','2025-02-02 14:46:37.530377',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-08 15:30:12.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(605,'2025-02-02 14:46:37.556380','2025-02-02 14:46:37.556380',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-15 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(606,'2025-02-02 14:46:37.588379','2025-02-02 14:46:37.588379',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-15 15:30:12.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(607,'2025-02-02 14:46:37.615379','2025-02-02 14:46:37.615379',49.715483,23.905562,49.858920,24.033717,'HOME_TO_WORK',1,'',395,252,390,'2025-02-22 05:00:12.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(608,'2025-02-02 14:46:37.637378','2025-02-02 14:46:37.637378',49.858920,24.033717,49.715483,23.905562,'WORK_TO_HOME',1,'',390,252,395,NULL,'2025-02-22 15:30:12.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(609,'2025-02-02 14:49:31.659066','2025-02-02 14:49:31.659066',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-02 05:10:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(610,'2025-02-02 14:49:31.696503','2025-02-02 14:49:31.696503',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-02 15:30:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(611,'2025-02-02 14:49:31.720532','2025-02-02 14:49:31.720532',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-03 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(612,'2025-02-02 14:49:31.746536','2025-02-02 14:49:31.746536',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-03 15:30:15.244000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(613,'2025-02-02 14:49:31.772538','2025-02-02 14:49:31.772538',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-10 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(614,'2025-02-02 14:49:31.798535','2025-02-02 14:49:31.798535',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-10 15:30:15.244000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(615,'2025-02-02 14:49:31.824541','2025-02-02 14:49:31.824541',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-17 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(616,'2025-02-02 14:49:31.852542','2025-02-02 14:49:31.852542',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-17 15:30:15.244000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(617,'2025-02-02 14:49:31.884537','2025-02-02 14:49:31.884537',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-24 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(618,'2025-02-02 14:49:31.906537','2025-02-02 14:49:31.906537',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-24 15:30:15.244000',NULL,1,0,0,95,NULL,3,NULL,NULL),(619,'2025-02-02 14:49:31.930536','2025-02-02 14:49:31.930536',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-04 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(620,'2025-02-02 14:49:31.955541','2025-02-02 14:49:31.955541',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-04 15:30:15.244000',NULL,1,0,0,99,NULL,3,NULL,NULL),(621,'2025-02-02 14:49:32.003550','2025-02-02 14:49:32.003550',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-11 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(622,'2025-02-02 14:49:32.089537','2025-02-02 14:49:32.089537',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-11 15:30:15.244000',NULL,1,0,0,98,NULL,1,NULL,NULL),(623,'2025-02-02 14:49:32.115542','2025-02-02 14:49:32.115542',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-18 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(624,'2025-02-02 14:49:32.140539','2025-02-02 14:49:32.140539',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-18 15:30:15.244000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(625,'2025-02-02 14:49:32.161540','2025-02-02 14:49:32.161540',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-25 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(626,'2025-02-02 14:49:32.214538','2025-02-02 14:49:32.214538',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-25 15:30:15.244000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(627,'2025-02-02 14:49:32.247538','2025-02-02 14:49:32.247538',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-05 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(628,'2025-02-02 14:49:32.279541','2025-02-02 14:49:32.279541',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-05 15:30:15.244000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(629,'2025-02-02 14:49:32.311542','2025-02-02 14:49:32.311542',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-12 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(630,'2025-02-02 14:49:32.343540','2025-02-02 14:49:32.343540',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-12 15:30:15.244000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(631,'2025-02-02 14:49:32.377539','2025-02-02 14:49:32.378539',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-19 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(632,'2025-02-02 14:49:32.401539','2025-02-02 14:49:32.402538',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-19 15:30:15.244000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(633,'2025-02-02 14:49:32.432543','2025-02-02 14:49:32.432543',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-26 05:10:15.244000',NULL,NULL,1,0,0,NULL,NULL,3,NULL,NULL),(634,'2025-02-02 14:49:32.462540','2025-02-02 14:49:32.462540',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-26 15:30:15.244000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(635,'2025-02-02 14:49:32.487539','2025-02-02 14:49:32.487539',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-06 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(636,'2025-02-02 14:49:32.511539','2025-02-02 14:49:32.511539',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-06 15:30:15.244000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(637,'2025-02-02 14:49:32.535540','2025-02-02 14:49:32.535540',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-13 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(638,'2025-02-02 14:49:32.558539','2025-02-02 14:49:32.558539',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-13 15:30:15.244000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(639,'2025-02-02 14:49:32.584540','2025-02-02 14:49:32.584540',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-20 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(640,'2025-02-02 14:49:32.609541','2025-02-02 14:49:32.609541',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-20 15:30:15.244000',NULL,1,0,0,NULL,NULL,4,NULL,NULL),(641,'2025-02-02 14:49:32.634540','2025-02-02 14:49:32.634540',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-27 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(642,'2025-02-02 14:49:32.656540','2025-02-02 14:49:32.656540',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-27 15:30:15.244000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(643,'2025-02-02 14:49:32.681547','2025-02-02 14:49:32.681547',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-07 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(644,'2025-02-02 14:49:32.738542','2025-02-02 14:49:32.738542',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-07 15:30:15.244000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(645,'2025-02-02 14:49:32.800551','2025-02-02 14:49:32.800551',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-14 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(646,'2025-02-02 14:49:32.829541','2025-02-02 14:49:32.829541',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-14 15:30:15.244000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(647,'2025-02-02 14:49:32.859546','2025-02-02 14:49:32.859546',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-21 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(648,'2025-02-02 14:49:32.890545','2025-02-02 14:49:32.890545',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-21 15:30:15.244000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(649,'2025-02-02 14:49:32.920545','2025-02-02 14:49:32.920545',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-28 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(650,'2025-02-02 14:49:32.950553','2025-02-02 14:49:32.950553',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-28 15:30:15.244000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(651,'2025-02-02 14:49:32.983546','2025-02-02 14:49:32.983546',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-08 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(652,'2025-02-02 14:49:33.015552','2025-02-02 14:49:33.015552',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-08 15:30:15.244000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(653,'2025-02-02 14:49:33.045545','2025-02-02 14:49:33.045545',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-15 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(654,'2025-02-02 14:49:33.072548','2025-02-02 14:49:33.072548',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-15 15:30:15.244000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(655,'2025-02-02 14:49:33.099543','2025-02-02 14:49:33.099543',49.806058,24.004535,49.858920,24.033717,'HOME_TO_WORK',1,'',404,177,403,'2025-02-22 05:10:15.244000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(656,'2025-02-02 14:49:33.125544','2025-02-02 14:49:33.125544',49.858920,24.033717,49.806058,24.004535,'WORK_TO_HOME',1,'',403,177,404,NULL,'2025-02-22 15:30:15.244000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(657,'2025-03-04 08:50:19.039430','2025-03-04 08:50:19.039449',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-04 08:49:00.000000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(658,'2025-03-04 08:50:19.067344','2025-03-04 08:50:52.544543',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',0,'',380,194,396,NULL,'2025-03-04 08:49:00.000000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(659,'2025-03-04 08:50:19.091798','2025-03-04 08:50:19.091815',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-11 08:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(660,'2025-03-04 08:50:19.114636','2025-03-04 08:50:19.114658',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-11 08:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(661,'2025-03-04 08:50:19.137583','2025-03-17 20:05:35.645545',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',0,'',396,194,380,'2025-03-18 08:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(662,'2025-03-04 08:50:19.157871','2025-03-17 20:06:13.883629',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',0,'',380,194,396,NULL,'2025-03-18 08:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(663,'2025-03-04 08:50:19.176308','2025-03-17 20:16:18.234813',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',0,'',396,194,380,'2025-03-25 08:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(664,'2025-03-04 08:50:19.200465','2025-03-18 14:47:55.236140',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',0,'',380,194,396,NULL,'2025-03-25 08:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(665,'2025-03-04 08:50:19.288291','2025-03-04 08:50:19.288313',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-01 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(666,'2025-03-04 08:50:19.307516','2025-03-04 08:50:19.307538',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-01 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(667,'2025-03-04 08:50:19.332064','2025-03-04 08:50:19.332093',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-08 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(668,'2025-03-04 08:50:19.366552','2025-03-04 08:50:19.366569',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-08 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(669,'2025-03-04 08:50:19.383614','2025-03-04 08:50:19.383631',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-15 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(670,'2025-03-04 08:50:19.398699','2025-03-04 08:50:19.398718',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-15 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(671,'2025-03-04 08:50:19.414129','2025-03-04 08:50:19.414147',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-22 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(672,'2025-03-04 08:50:19.430188','2025-03-04 08:50:19.430206',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-22 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(673,'2025-03-04 08:50:19.450990','2025-03-04 08:50:19.451012',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-29 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(674,'2025-03-04 08:50:19.466543','2025-03-04 08:50:19.466561',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-29 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(675,'2025-03-04 08:50:19.489642','2025-03-04 08:50:19.489677',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-06 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(676,'2025-03-04 08:50:19.515597','2025-03-04 08:50:19.515631',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-06 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(677,'2025-03-04 08:50:19.538643','2025-03-04 08:50:19.538676',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-13 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(678,'2025-03-04 08:50:19.563521','2025-03-04 08:50:19.563548',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-13 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(679,'2025-03-04 08:50:19.584559','2025-03-04 08:50:19.584580',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-20 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(680,'2025-03-04 08:50:19.599977','2025-03-04 08:50:19.600000',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-20 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(681,'2025-03-04 08:50:19.617861','2025-03-04 08:50:19.617879',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-27 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(682,'2025-03-04 08:50:19.634330','2025-03-04 08:50:19.634348',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-27 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(683,'2025-03-04 08:50:19.650575','2025-03-04 08:50:19.650592',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-05 08:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(684,'2025-03-04 08:50:19.683050','2025-03-04 08:50:19.683068',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-05 08:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(685,'2025-03-04 08:50:19.699702','2025-03-17 20:16:51.030730',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',0,'',396,194,380,'2025-03-12 08:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(686,'2025-03-04 08:50:19.716258','2025-03-04 08:50:19.716276',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-12 08:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(687,'2025-03-04 08:50:19.733106','2025-03-17 20:05:18.085975',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',0,'',396,194,380,'2025-03-19 08:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(688,'2025-03-04 08:50:19.751636','2025-03-04 08:50:19.751652',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-19 08:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(689,'2025-03-04 08:50:19.770361','2025-03-17 20:16:30.304523',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',0,'',396,194,380,'2025-03-26 08:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(690,'2025-03-04 08:50:19.785591','2025-03-04 08:50:19.785608',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-26 08:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(691,'2025-03-04 08:50:19.802853','2025-03-04 08:50:19.802871',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-02 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(692,'2025-03-04 08:50:19.822421','2025-03-04 08:50:19.822441',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-02 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(693,'2025-03-04 08:50:19.842043','2025-03-04 08:50:19.842064',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-09 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(694,'2025-03-04 08:50:19.858698','2025-03-04 08:50:19.858764',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-09 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(695,'2025-03-04 08:50:19.878009','2025-03-04 08:50:19.878118',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-16 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(696,'2025-03-04 08:50:19.899671','2025-03-04 08:50:19.899689',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-16 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(697,'2025-03-04 08:50:19.918934','2025-03-04 08:50:19.918956',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-23 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(698,'2025-03-04 08:50:19.939633','2025-03-04 08:50:19.939651',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-23 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(699,'2025-03-04 08:50:19.958697','2025-03-04 08:50:19.958716',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-30 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(700,'2025-03-04 08:50:19.982260','2025-03-04 08:50:19.982279',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-30 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(701,'2025-03-04 08:50:20.006480','2025-03-04 08:50:20.006502',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-07 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(702,'2025-03-04 08:50:20.034595','2025-03-04 08:50:20.034621',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-07 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(703,'2025-03-04 08:50:20.056649','2025-03-04 08:50:20.056669',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-14 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(704,'2025-03-04 08:50:20.087569','2025-03-04 08:50:20.087611',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-14 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(705,'2025-03-04 08:50:20.107755','2025-03-04 08:50:20.107772',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-21 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(706,'2025-03-04 08:50:20.133337','2025-03-04 08:50:20.133355',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-21 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(707,'2025-03-04 08:50:20.151543','2025-03-04 08:50:20.151561',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-28 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(708,'2025-03-04 08:50:20.166671','2025-03-04 08:50:20.166689',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-28 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(709,'2025-03-04 08:50:20.182400','2025-03-04 08:50:20.182417',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-10 08:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(710,'2025-03-04 08:50:20.200176','2025-03-04 08:50:20.200207',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-10 08:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(711,'2025-03-04 08:50:20.218437','2025-03-04 08:50:20.218454',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-17 08:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(712,'2025-03-04 08:50:20.234892','2025-03-04 08:50:20.234909',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-17 08:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(713,'2025-03-04 08:50:20.252434','2025-03-04 08:50:20.252451',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-24 08:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(714,'2025-03-04 08:50:20.269982','2025-03-17 20:09:23.183445',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',0,'',380,194,396,NULL,'2025-03-24 08:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(715,'2025-03-04 08:50:20.287249','2025-03-04 08:50:20.287265',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-31 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(716,'2025-03-04 08:50:20.303533','2025-03-04 08:50:20.303550',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-31 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(717,'2025-03-04 08:50:20.318065','2025-03-04 08:50:20.318081',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-07 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(718,'2025-03-04 08:50:20.334528','2025-03-04 08:50:20.334546',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-07 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(719,'2025-03-04 08:50:20.350423','2025-03-04 08:50:20.350441',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-14 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(720,'2025-03-04 08:50:20.373941','2025-03-04 08:50:20.373981',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-14 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(721,'2025-03-04 08:50:20.398290','2025-03-04 08:50:20.398318',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-21 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(722,'2025-03-04 08:50:20.419015','2025-03-04 08:50:20.419039',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-21 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(723,'2025-03-04 08:50:20.437017','2025-03-04 08:50:20.437038',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-28 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(724,'2025-03-04 08:50:20.454425','2025-03-04 08:50:20.454442',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-28 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(725,'2025-03-04 08:50:20.471731','2025-03-04 08:50:20.471747',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-05 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(726,'2025-03-04 08:50:20.489083','2025-03-04 08:50:20.489099',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-05 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(727,'2025-03-04 08:50:20.506977','2025-03-04 08:50:20.506995',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-12 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(728,'2025-03-04 08:50:20.524197','2025-03-04 08:50:20.524214',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-12 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(729,'2025-03-04 08:50:20.540356','2025-03-04 08:50:20.540373',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-19 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(730,'2025-03-04 08:50:20.559169','2025-03-04 08:50:20.559186',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-19 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(731,'2025-03-04 08:50:20.579287','2025-03-04 08:50:20.579312',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-26 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(732,'2025-03-04 08:50:20.597678','2025-03-04 08:50:20.597695',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-26 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(733,'2025-03-04 08:50:20.614739','2025-03-04 08:50:20.614757',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-06 08:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(734,'2025-03-04 08:50:20.635281','2025-03-18 06:58:45.814818',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',0,'',380,194,396,NULL,'2025-03-06 08:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(735,'2025-03-04 08:50:20.652848','2025-03-17 20:16:12.165490',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',0,'',396,194,380,'2025-03-13 08:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(736,'2025-03-04 08:50:20.667372','2025-03-04 08:50:20.667388',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-13 08:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(737,'2025-03-04 08:50:20.685783','2025-03-04 08:50:20.685801',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-20 08:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(738,'2025-03-04 08:50:20.702793','2025-03-17 20:06:32.078882',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',0,'',380,194,396,NULL,'2025-03-20 08:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(739,'2025-03-04 08:50:20.718177','2025-03-04 08:50:20.718194',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-27 08:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(740,'2025-03-04 08:50:20.735292','2025-03-04 08:50:20.735309',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-27 08:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(741,'2025-03-04 08:50:20.753206','2025-03-04 08:50:20.753223',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-03 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(742,'2025-03-04 08:50:20.773513','2025-03-04 08:50:20.773546',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-03 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(743,'2025-03-04 08:50:20.795791','2025-03-04 08:50:20.795812',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-10 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(744,'2025-03-04 08:50:20.810750','2025-03-04 08:50:20.810863',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-10 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(745,'2025-03-04 08:50:20.826194','2025-03-04 08:50:20.826315',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-17 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(746,'2025-03-04 08:50:20.846551','2025-03-04 08:50:20.846568',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-17 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(747,'2025-03-04 08:50:20.939868','2025-03-04 08:50:20.939884',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-24 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(748,'2025-03-04 08:50:20.956445','2025-03-04 08:50:20.956476',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-24 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(749,'2025-03-04 08:50:20.973889','2025-03-04 08:50:20.973906',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-01 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(750,'2025-03-04 08:50:20.990947','2025-03-04 08:50:20.990963',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-01 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(751,'2025-03-04 08:50:21.007723','2025-03-04 08:50:21.007740',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-08 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(752,'2025-03-04 08:50:21.024944','2025-03-04 08:50:21.024962',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-08 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(753,'2025-03-04 08:50:21.041689','2025-03-04 08:50:21.041705',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-15 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(754,'2025-03-04 08:50:21.058107','2025-03-04 08:50:21.058132',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-15 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(755,'2025-03-04 08:50:21.075764','2025-03-04 08:50:21.075781',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-22 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(756,'2025-03-04 08:50:21.092471','2025-03-04 08:50:21.092487',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-22 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(757,'2025-03-04 08:50:21.113983','2025-03-04 08:50:21.114009',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-29 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(758,'2025-03-04 08:50:21.130284','2025-03-04 08:50:21.130302',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-29 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(759,'2025-03-04 08:50:21.150009','2025-03-04 08:50:21.150037',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-07 08:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(760,'2025-03-04 08:50:21.167150','2025-03-04 08:50:21.167167',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-07 08:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(761,'2025-03-04 08:50:21.184198','2025-03-04 08:50:21.184214',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-14 08:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(762,'2025-03-04 08:50:21.202577','2025-03-04 08:50:21.202594',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-14 08:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(763,'2025-03-04 08:50:21.220488','2025-03-17 19:26:52.675173',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',0,'',396,194,380,'2025-03-21 08:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(764,'2025-03-04 08:50:21.239722','2025-03-04 08:50:21.239740',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-21 08:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(765,'2025-03-04 08:50:21.255561','2025-03-04 08:50:21.255578',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-03-28 08:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(766,'2025-03-04 08:50:21.275315','2025-03-04 08:50:21.275332',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-03-28 08:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(767,'2025-03-04 08:50:21.292057','2025-03-04 08:50:21.292074',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-04 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(768,'2025-03-04 08:50:21.313018','2025-03-04 08:50:21.313036',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-04 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(769,'2025-03-04 08:50:21.330972','2025-03-04 08:50:21.330989',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-11 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(770,'2025-03-04 08:50:21.350097','2025-03-04 08:50:21.350114',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-11 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(771,'2025-03-04 08:50:21.367608','2025-03-04 08:50:21.367626',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-18 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(772,'2025-03-04 08:50:21.386368','2025-03-04 08:50:21.386385',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-18 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(773,'2025-03-04 08:50:21.407036','2025-03-04 08:50:21.407070',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-04-25 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(774,'2025-03-04 08:50:21.427222','2025-03-04 08:50:21.427278',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-04-25 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(775,'2025-03-04 08:50:21.447025','2025-03-04 08:50:21.447064',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-02 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(776,'2025-03-04 08:50:21.467715','2025-03-04 08:50:21.467749',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-02 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(777,'2025-03-04 08:50:21.490586','2025-03-04 08:50:21.490604',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-09 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(778,'2025-03-04 08:50:21.516975','2025-03-04 08:50:21.516994',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-09 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(779,'2025-03-04 08:50:21.537065','2025-03-04 08:50:21.537083',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-16 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(780,'2025-03-04 08:50:21.555269','2025-03-04 08:50:21.555287',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-16 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(781,'2025-03-04 08:50:21.573364','2025-03-04 08:50:21.573382',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-23 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(782,'2025-03-04 08:50:21.590706','2025-03-04 08:50:21.590723',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-23 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(783,'2025-03-04 08:50:21.615465','2025-03-04 08:50:21.615483',50.106825,24.343689,49.858920,24.033717,'HOME_TO_WORK',1,'',396,194,380,'2025-05-30 07:49:48.164000',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(784,'2025-03-04 08:50:21.631458','2025-03-04 08:50:21.631475',49.858920,24.033717,50.106825,24.343689,'WORK_TO_HOME',1,'',380,194,396,NULL,'2025-05-30 07:49:48.164000',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `translogix_djangoproject_passengertriprequest` ENABLE KEYS */;
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
  `driver_id` int DEFAULT NULL,
  `is_actual` tinyint(1) NOT NULL,
  `is_completed` tinyint(1) NOT NULL,
  `ordered_passenger_list_id` bigint DEFAULT NULL,
  `trip_id` int DEFAULT NULL,
  `vehicle_id` int DEFAULT NULL,
  PRIMARY KEY (`route_id`),
  UNIQUE KEY `TransLogix_djangoProject_origin_id_destination_id_5d84134a_uniq` (`origin_id`,`destination_id`,`date`),
  UNIQUE KEY `route_number` (`route_number`),
  KEY `TransLogix_djangoPro_destination_id_82d744c5_fk_TransLogi` (`destination_id`),
  KEY `TransLogix_djangoPro_start_point_id_0d4f287c_fk_TransLogi` (`start_point_id`),
  KEY `TransLogix_djangoPro_end_point_id_c2e59549_fk_TransLogi` (`end_point_id`),
  KEY `TransLogix_djangoPro_driver_id_7ede4c58_fk_TransLogi` (`driver_id`),
  KEY `TransLogix_djangoPro_ordered_passenger_li_02c98fd4_fk_TransLogi` (`ordered_passenger_list_id`),
  KEY `TransLogix_djangoPro_trip_id_d0ba2ee2_fk_TransLogi` (`trip_id`),
  KEY `TransLogix_djangoPro_vehicle_id_50c9eecd_fk_TransLogi` (`vehicle_id`),
  CONSTRAINT `TransLogix_djangoPro_destination_id_82d744c5_fk_TransLogi` FOREIGN KEY (`destination_id`) REFERENCES `translogix_djangoproject_city` (`id`),
  CONSTRAINT `TransLogix_djangoPro_driver_id_7ede4c58_fk_TransLogi` FOREIGN KEY (`driver_id`) REFERENCES `translogix_djangoproject_driver` (`driver_id`),
  CONSTRAINT `TransLogix_djangoPro_end_point_id_c2e59549_fk_TransLogi` FOREIGN KEY (`end_point_id`) REFERENCES `translogix_djangoproject_coordinatepoint` (`id`),
  CONSTRAINT `TransLogix_djangoPro_ordered_passenger_li_02c98fd4_fk_TransLogi` FOREIGN KEY (`ordered_passenger_list_id`) REFERENCES `translogix_djangoproject_orderedpassengerlist` (`id`),
  CONSTRAINT `TransLogix_djangoPro_origin_id_e661cebc_fk_TransLogi` FOREIGN KEY (`origin_id`) REFERENCES `translogix_djangoproject_city` (`id`),
  CONSTRAINT `TransLogix_djangoPro_start_point_id_0d4f287c_fk_TransLogi` FOREIGN KEY (`start_point_id`) REFERENCES `translogix_djangoproject_coordinatepoint` (`id`),
  CONSTRAINT `TransLogix_djangoPro_trip_id_d0ba2ee2_fk_TransLogi` FOREIGN KEY (`trip_id`) REFERENCES `translogix_djangoproject_trip` (`trip_id`),
  CONSTRAINT `TransLogix_djangoPro_vehicle_id_50c9eecd_fk_TransLogi` FOREIGN KEY (`vehicle_id`) REFERENCES `translogix_djangoproject_vehicle` (`vehicle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=263 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_route`
--

LOCK TABLES `translogix_djangoproject_route` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_route` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_route` VALUES (174,70.00,90,'2025-01-07 00:00:00.000000',2,1,78,79,'NPL-10-13-24-174',NULL,1,0,NULL,NULL,NULL),(175,65.00,80,'2025-01-07 00:00:00.000000',3,1,80,81,'NPL-10-13-24-175',NULL,1,0,NULL,NULL,NULL),(176,50.00,60,'2025-01-07 00:00:00.000000',4,1,82,83,'NPL-10-13-24-176',NULL,1,0,NULL,NULL,NULL),(177,80.00,100,'2025-01-07 00:00:00.000000',5,1,84,85,'NPL-10-13-24-177',NULL,1,0,NULL,NULL,NULL),(178,90.00,120,'2024-11-29 00:00:00.000000',6,1,86,87,'NPL-10-13-24-178',NULL,1,0,NULL,NULL,NULL),(179,75.00,95,'2024-11-27 00:00:00.000000',7,1,88,89,'NPL-10-13-24-179',NULL,1,0,NULL,NULL,NULL),(180,60.00,75,'2024-12-19 00:00:00.000000',8,1,90,91,'NPL-10-13-24-180',NULL,1,0,NULL,NULL,NULL),(181,85.00,105,'2024-12-19 00:00:00.000000',9,1,92,93,'NPL-10-13-24-181',NULL,1,0,NULL,NULL,NULL),(182,55.00,70,'2024-12-19 00:00:00.000000',10,1,94,95,'NPL-10-13-24-182',NULL,1,0,NULL,NULL,NULL),(183,45.00,55,'2024-11-26 00:00:00.000000',11,1,96,97,'NPL-10-13-24-183',NULL,1,0,NULL,NULL,NULL),(184,70.00,90,'2024-11-28 00:00:00.000000',12,1,98,99,'NPL-10-13-24-184',NULL,1,0,NULL,NULL,NULL),(185,65.00,80,'2024-11-29 00:00:00.000000',13,1,100,101,'NPL-10-13-24-185',NULL,1,0,NULL,NULL,NULL),(186,50.00,60,'2024-11-29 00:00:00.000000',14,1,102,103,'NPL-10-13-24-186',NULL,1,0,NULL,NULL,NULL),(187,80.00,100,'2024-11-26 00:00:00.000000',15,1,104,105,'NPL-10-13-24-187',NULL,1,0,NULL,NULL,NULL),(188,90.00,120,'2024-11-29 00:00:00.000000',16,1,106,107,'NPL-10-13-24-188',NULL,1,0,NULL,NULL,NULL),(189,75.00,95,'2024-11-09 00:00:00.000000',17,1,108,109,'NPL-10-13-24-189',NULL,1,0,NULL,NULL,NULL),(190,60.00,75,'2024-11-29 00:00:00.000000',18,1,110,111,'NPL-10-13-24-190',NULL,1,0,NULL,NULL,NULL),(191,85.00,105,'2024-11-26 00:00:00.000000',19,1,112,113,'NPL-10-13-24-191',NULL,1,0,NULL,NULL,NULL),(192,55.00,70,'2024-11-26 00:00:00.000000',20,1,114,115,'NPL-10-13-24-192',NULL,1,0,NULL,NULL,NULL),(193,45.00,55,'2024-11-29 00:00:00.000000',21,1,116,117,'NPL-10-13-24-193',NULL,1,0,NULL,NULL,NULL),(194,70.00,90,'2024-11-30 00:00:00.000000',22,1,118,119,'NPL-10-13-24-194',NULL,1,0,NULL,NULL,NULL),(195,65.00,80,'2024-11-27 00:00:00.000000',23,1,120,121,'NPL-10-13-24-195',NULL,1,0,NULL,NULL,NULL),(196,50.00,60,'2024-11-26 00:00:00.000000',24,1,122,123,'NPL-10-13-24-196',NULL,1,0,NULL,NULL,NULL),(197,80.00,100,'2024-11-08 00:00:00.000000',25,1,124,125,'NPL-10-13-24-197',NULL,1,0,NULL,NULL,NULL),(198,90.00,120,'2024-11-29 00:00:00.000000',25,1,126,127,'NPL-10-13-24-198',NULL,1,0,NULL,NULL,NULL),(199,70.00,90,'2024-11-30 00:00:00.000000',1,2,128,129,'NPL-10-13-24-199',NULL,1,0,NULL,NULL,NULL),(200,65.00,80,'2024-11-30 00:00:00.000000',1,3,130,131,'NPL-10-13-24-200',NULL,1,0,NULL,NULL,NULL),(201,50.00,60,'2024-12-29 00:00:00.000000',1,4,132,133,'NPL-10-13-24-201',NULL,1,0,NULL,NULL,NULL),(202,80.00,100,'2024-12-28 00:00:00.000000',1,5,134,135,'NPL-10-13-24-202',NULL,1,0,NULL,NULL,NULL),(203,90.00,120,'2024-12-13 00:00:00.000000',1,6,136,137,'NPL-10-13-24-203',NULL,1,0,NULL,NULL,NULL),(204,75.00,95,'2024-12-11 00:00:00.000000',1,7,138,139,'NPL-10-13-24-204',NULL,1,0,NULL,NULL,NULL),(205,60.00,75,'2024-12-10 00:00:00.000000',1,8,140,141,'NPL-10-13-24-205',NULL,1,0,NULL,NULL,NULL),(206,85.00,105,'2024-12-09 00:00:00.000000',1,9,142,143,'NPL-10-13-24-206',NULL,1,0,NULL,NULL,NULL),(207,55.00,70,'2024-12-08 00:00:00.000000',1,10,144,145,'NPL-10-13-24-207',NULL,1,0,NULL,NULL,NULL),(208,45.00,55,'2024-12-12 00:00:00.000000',1,11,146,147,'NPL-10-13-24-208',NULL,1,0,NULL,NULL,NULL),(209,70.00,90,'2024-12-07 00:00:00.000000',1,12,148,149,'NPL-10-13-24-209',NULL,1,0,NULL,NULL,NULL),(210,65.00,80,'2024-12-09 00:00:00.000000',1,13,150,151,'NPL-10-13-24-210',NULL,1,0,NULL,NULL,NULL),(211,50.00,60,'2024-12-11 00:00:00.000000',1,14,152,153,'NPL-10-13-24-211',NULL,1,0,NULL,NULL,NULL),(212,80.00,100,'2024-12-10 00:00:00.000000',1,15,154,105,'NPL-10-13-24-212',NULL,1,0,NULL,NULL,NULL),(238,75.00,100,'2024-12-12 00:00:00.000000',1,2,128,129,'NPL-10-13-24-238',NULL,1,0,NULL,NULL,NULL),(239,80.00,110,'2024-12-11 00:00:00.000000',1,3,130,131,'NPL-10-13-24-239',NULL,1,0,NULL,NULL,NULL),(240,60.00,90,'2024-12-10 00:00:00.000000',1,4,132,133,'NPL-10-13-24-240',NULL,1,0,NULL,NULL,NULL),(241,85.00,115,'2024-12-09 00:00:00.000000',1,5,134,135,'NPL-10-13-24-241',NULL,1,0,NULL,NULL,NULL),(242,90.00,120,'2024-12-08 00:00:00.000000',1,6,136,137,'NPL-10-13-24-242',NULL,1,0,NULL,NULL,NULL),(243,65.00,85,'2024-12-07 00:00:00.000000',1,7,138,139,'NPL-10-13-24-243',NULL,1,0,NULL,NULL,NULL),(244,70.00,95,'2024-12-06 00:00:00.000000',1,8,140,141,'NPL-10-13-24-244',NULL,1,0,NULL,NULL,NULL),(245,55.00,75,'2024-10-05 00:00:00.000000',1,9,142,143,'NPL-10-13-24-245',NULL,1,0,NULL,NULL,NULL),(246,80.00,100,'2024-12-04 00:00:00.000000',1,10,144,145,'NPL-10-13-24-246',NULL,1,0,NULL,NULL,NULL),(247,90.00,125,'2024-11-03 00:00:00.000000',1,11,146,147,'NPL-10-13-24-247',NULL,1,0,NULL,NULL,NULL),(248,85.00,110,'2024-10-02 00:00:00.000000',1,12,148,149,'NPL-10-13-24-248',NULL,1,0,NULL,NULL,NULL),(249,65.00,85,'2024-10-01 00:00:00.000000',1,13,150,151,'NPL-10-13-24-249',NULL,1,0,NULL,NULL,NULL),(250,75.00,95,'2024-12-30 00:00:00.000000',1,14,152,153,'NPL-10-13-24-250',NULL,1,0,NULL,NULL,NULL),(251,70.00,90,'2024-12-29 00:00:00.000000',1,15,154,105,'NPL-10-13-24-251',NULL,1,0,NULL,NULL,NULL),(252,60.00,80,'2024-12-28 00:00:00.000000',1,16,154,106,'NPL-10-13-24-252',NULL,1,0,NULL,NULL,NULL),(253,55.00,75,'2024-12-27 00:00:00.000000',1,17,154,107,'NPL-10-13-24-253',NULL,1,0,NULL,NULL,NULL),(254,65.00,85,'2024-12-26 00:00:00.000000',1,18,154,108,'NPL-10-13-24-254',NULL,1,0,NULL,NULL,NULL),(255,70.00,100,'2024-12-25 00:00:00.000000',1,19,154,109,'NPL-10-13-24-255',NULL,1,0,NULL,NULL,NULL),(256,75.00,95,'2024-11-24 00:00:00.000000',1,20,154,110,'NPL-10-13-24-256',NULL,1,0,NULL,NULL,NULL),(257,80.00,110,'2024-11-23 00:00:00.000000',1,21,154,111,'NPL-10-13-24-257',NULL,1,0,NULL,NULL,NULL),(258,85.00,120,'2024-11-27 00:00:00.000000',1,22,154,112,'NPL-10-13-24-258',NULL,1,0,NULL,NULL,NULL),(259,60.00,90,'2024-11-30 00:00:00.000000',1,23,154,113,'NPL-10-13-24-259',NULL,1,0,NULL,NULL,NULL),(260,55.00,80,'2024-11-30 00:00:00.000000',1,24,154,114,'NPL-10-13-24-260',NULL,1,0,NULL,NULL,NULL),(261,70.00,95,'2024-11-30 00:00:00.000000',1,25,154,115,'NPL-10-13-24-261',NULL,1,0,NULL,NULL,NULL),(262,80.00,105,'2024-11-30 00:00:00.000000',1,22,154,116,'NPL-10-13-24-262',NULL,1,0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `translogix_djangoproject_route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_routedraftlist`
--

DROP TABLE IF EXISTS `translogix_djangoproject_routedraftlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_routedraftlist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `route_index` int NOT NULL,
  `data_json` json NOT NULL,
  `distance_km` double NOT NULL,
  `duration_min` double NOT NULL,
  `fuel_liters` double DEFAULT NULL,
  `plan_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_plan_id_b7014a5e_fk_TransLogi` (`plan_id`),
  CONSTRAINT `TransLogix_djangoPro_plan_id_b7014a5e_fk_TransLogi` FOREIGN KEY (`plan_id`) REFERENCES `translogix_djangoproject_routeplandraft` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_routedraftlist`
--

LOCK TABLES `translogix_djangoproject_routedraftlist` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_routedraftlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `translogix_djangoproject_routedraftlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_routeplandraft`
--

DROP TABLE IF EXISTS `translogix_djangoproject_routeplandraft`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_routeplandraft` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `route_date` date NOT NULL,
  `total_distance_km` double NOT NULL,
  `total_duration_min` double NOT NULL,
  `total_fuel_liters` double DEFAULT NULL,
  `notes` longtext NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_user_id_170a1100_fk_TransLogi` (`user_id`),
  CONSTRAINT `TransLogix_djangoPro_user_id_170a1100_fk_TransLogi` FOREIGN KEY (`user_id`) REFERENCES `translogix_djangoproject_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_routeplandraft`
--

LOCK TABLES `translogix_djangoproject_routeplandraft` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_routeplandraft` DISABLE KEYS */;
/*!40000 ALTER TABLE `translogix_djangoproject_routeplandraft` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_routepoint`
--

DROP TABLE IF EXISTS `translogix_djangoproject_routepoint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_routepoint` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `sequence_number` int NOT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `recorded_at` datetime(6) NOT NULL,
  `coordinate_point_id` bigint NOT NULL,
  `passenger_id` bigint DEFAULT NULL,
  `route_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_coordinate_point_id_7e393427_fk_TransLogi` (`coordinate_point_id`),
  KEY `TransLogix_djangoPro_passenger_id_778d32ee_fk_TransLogi` (`passenger_id`),
  KEY `TransLogix_djangoPro_route_id_a380e53b_fk_TransLogi` (`route_id`),
  CONSTRAINT `TransLogix_djangoPro_coordinate_point_id_7e393427_fk_TransLogi` FOREIGN KEY (`coordinate_point_id`) REFERENCES `translogix_djangoproject_coordinatepoint` (`id`),
  CONSTRAINT `TransLogix_djangoPro_passenger_id_778d32ee_fk_TransLogi` FOREIGN KEY (`passenger_id`) REFERENCES `translogix_djangoproject_passenger` (`id`),
  CONSTRAINT `TransLogix_djangoPro_route_id_a380e53b_fk_TransLogi` FOREIGN KEY (`route_id`) REFERENCES `translogix_djangoproject_route` (`route_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_routepoint`
--

LOCK TABLES `translogix_djangoproject_routepoint` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_routepoint` DISABLE KEYS */;
/*!40000 ALTER TABLE `translogix_djangoproject_routepoint` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_street`
--

LOCK TABLES `translogix_djangoproject_street` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_street` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_street` VALUES (1,'Проспект Свободи',1),(2,'Вулиця Шевченка',1),(3,'Вулиця Івана Франка',1),(4,'Вулиця Тараса Шевченка',2),(5,'Вулиця Пилипа Орлика',2),(6,'Вулиця Сагайдачного',3),(7,'Вулиця Лесі Українки',3),(8,'Вулиця Степана Бандери',4),(9,'Вулиця Мазепи',4),(10,'Вулиця Богдана Хмельницького',5),(11,'Проспект Свободи',1),(12,'Вулиця Шевченка',1),(13,'Вулиця Івана Франка',1),(14,'Вулиця Тараса Шевченка',2),(15,'Вулиця Пилипа Орлика',2),(16,'Вулиця Сагайдачного',3),(17,'Вулиця Лесі Українки',3),(18,'Вулиця Степана Бандери',4),(19,'Вулиця Мазепи',4),(20,'Вулиця Богдана Хмельницького',5),(21,'Вулиця Кульпарківська',1),(22,'Вулиця Городоцька',1),(23,'Вулиця Бандери',1),(24,'Вулиця Липова Алея',1),(25,'Вулиця Зелена',1),(26,'Вулиця Січових Стрільців',1),(27,'Вулиця Князя Романа',1),(28,'Вулиця Пекарська',1),(29,'Вулиця Наукова',1),(30,'Вулиця Личаківська',1),(31,'Вулиця Володимира Великого',1),(32,'Вулиця Дорошенка',1),(33,'Вулиця Грушевського',1),(34,'Вулиця Грабовського',1),(35,'Вулиця Вірменська',1),(36,'Вулиця Краківська',1),(37,'Вулиця Михайла Вербицького',1),(38,'Вулиця Тролейбусна',1),(39,'Вулиця Джерельна',1),(40,'Вулиця Залізнична',1),(41,'Вулиця Червоної Калини',1),(42,'Вулиця Шевченка',3),(43,'Вулиця Лесі Українки',3),(44,'Вулиця Хмельницького',3),(45,'Вулиця Тиха',3),(46,'Вулиця Сонячна',3),(47,'Вулиця Паркова',3),(48,'Вулиця Зоряна',3),(49,'Вулиця Рудницького',3),(50,'Вулиця Грушевського',3),(51,'Вулиця Лермонтова',3),(52,'Вулиця Соборна',4),(53,'Вулиця Вишнева',4),(54,'Вулиця Київська',4),(55,'Вулиця Поштова',4),(56,'Вулиця Шкільна',5),(57,'Вулиця Центральна',5),(58,'Вулиця Садова',5),(59,'Вулиця Богдана Хмельницького',5),(60,'Вулиця Молодіжна',5),(61,'Шевченка',26),(62,'Зелена',26),(63,'Наукова',26),(64,'Шевченка',26),(65,'Зелена',26),(66,'Наукова',26),(67,'Шевченка',27),(68,'Грушевського',28),(69,'Східна',26),(70,'Бандери',29),(71,'Лесі Українки',30),(72,'Івана Франка',31),(73,'Шевченка',32),(74,'Івана Франка',27),(75,'Героїв Майдану',28),(76,'Грушевського',31),(77,'Хімічна',26),(78,'Бандери',28),(79,'Лесі Українки',33),(80,'Крушельницької',34),(81,'вулиця Олександра Довженка',35),(82,'вулиця Патона',35),(83,'вулиця Східна',35),(84,'східна',35),(85,'вулиця Івана Виговського',35),(86,'вулиця Щурата',35),(87,'',36),(88,'вулиця Олександра Довженка',37),(89,'',38),(90,'вулиця Олександра Довженка',39),(91,'',40),(92,'вулиця Стрийська',41),(93,'',42),(94,'Довженко',41),(95,'вулиця Патона',41),(96,'Main Street',43),(97,'Second Street',44),(98,'Office Road',45),(99,'Main Street',46),(100,'Second Street',47),(101,'Office Road',48),(102,'Main Street',49),(103,'Second Street',50),(104,'Office Road',51),(105,'Лесі Українки',52),(106,'Second Street',53),(107,'Office Road',54),(108,'вулиця Симона Петлюри',52),(109,'Львівська',55),(110,'Львівська',2),(111,'вулиця І.Франка',7),(112,'Шевченка',7),(113,'Східна',1),(114,'Львівська',9),(115,'Франка',9),(116,'вулиця Луганська',1),(117,'вулиця Антонича',1),(118,'вулиця Хімічна',1),(119,'вулиця Галицька',1),(120,'вулиця Любінська',1),(121,'вулиця Топольна',1),(122,'вулиця Міклухо-Маклая',1),(123,'вулиця Стрийська',1),(124,'Лесі Українки ',2),(125,'Незалежності',16),(126,'Лесі Укранки',16),(127,'вулиця Сихівська',1),(128,'вулиця Олександра Довженка',1),(129,'Східна ',1),(130,'вулиця Монастирського',1),(131,'вулиця Львівська',5),(132,'Шевченка',4),(133,'Шевченка',56),(134,'вулиця Львівська',17),(135,'вулиця Львівська',9),(136,'Дрогобицька',16),(137,'Нехалежності',5),(138,'Незажежності',5),(139,'Шевченка',1),(140,'Зелена',1),(141,'Наукова',1),(142,'Незалежності',4),(143,'Незалежності',5),(144,'вулиця Незалежності',16),(145,'вулиця Гуцульська',1),(146,'вулиця Сяйво',1),(147,'Незалежності',15),(148,'площа Ринок',2),(149,'Стрийська',1),(150,'Городоцька',1),(151,'Хмельницького ',1),(152,'Шевченка',5),(153,'Львівська',57),(154,'Львівська',56),(155,'Лесі Українки',4),(156,'вулиця Зубрівська',1),(157,'Шевченко',22),(158,'лЬВІВСЬКА',22),(159,'Шевченка',22),(160,'Леніна',22),(161,'Сталіна',22),(162,'Болехівська ',5),(163,'Вуйківська',22),(164,'вулиця Східна',1),(165,'вулиця Антоновича',1),(166,'вулиця Патона',1);
/*!40000 ALTER TABLE `translogix_djangoproject_street` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translogix_djangoproject_temporarypassengerlist`
--

DROP TABLE IF EXISTS `translogix_djangoproject_temporarypassengerlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_temporarypassengerlist` (
  `id` char(32) NOT NULL,
  `session_id` char(36) NOT NULL,
  `filter_params` json NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `last_modified` datetime(6) NOT NULL,
  `expires_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  `direction` varchar(20) DEFAULT NULL,
  `estimated_end_time` datetime(6) DEFAULT NULL,
  `estimated_start_time` datetime(6) DEFAULT NULL,
  `estimated_travel_time` bigint DEFAULT NULL,
  `estimated_wait_time` bigint DEFAULT NULL,
  `passenger_count` int NOT NULL,
  `requests` json NOT NULL DEFAULT (_utf8mb3'[]'),
  `route_distance_km` double DEFAULT NULL,
  `stop_count` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TransLogix_djangoPro_user_id_f9defe6e_fk_TransLogi` (`user_id`),
  CONSTRAINT `TransLogix_djangoPro_user_id_f9defe6e_fk_TransLogi` FOREIGN KEY (`user_id`) REFERENCES `translogix_djangoproject_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_temporarypassengerlist`
--

LOCK TABLES `translogix_djangoproject_temporarypassengerlist` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_temporarypassengerlist` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_temporarypassengerlist` VALUES ('bdf8b82ebcb0496a98d646cc886f7d51','bd1e7f30-12d3-4b56-92a3-bc46e2c84cda','{\"requests\": []}','2025-04-10 19:21:17.490569','2025-10-15 06:31:08.013557','2025-10-16 06:31:07.888000',2,NULL,NULL,NULL,NULL,NULL,0,'[]',NULL,0);
/*!40000 ALTER TABLE `translogix_djangoproject_temporarypassengerlist` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_user`
--

LOCK TABLES `translogix_djangoproject_user` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_user` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_user` VALUES (1,'westukr1','pbkdf2_sha256$870000$KMcbRbAxFNyoU170qxQCMz$SPPEA2zb8XHUdLNCeD99HCV+AEdoJxNPV06viReCi8s=','westukr1@gmail.com','guest','2024-10-11 17:08:51.143784','2025-02-04 16:18:24.666370',0,'2024-10-11 17:15:56',1,1,1,1,'','',1,1,'2024-10-11 17:08:51'),(2,'user','pbkdf2_sha256$870000$eaweaEPh9tbAMo1785W1Xg$xem9E7q1yBcPhd0VOTZg8+81KTCloEgMxbG3FxSh31E=','','guest','2024-10-11 17:16:57.215291','2025-02-04 16:18:24.682118',0,'2026-02-25 20:56:07',1,1,0,1,'','',1,1,'2024-10-11 17:16:57'),(4,'Operator','pbkdf2_sha256$870000$q0OiEm1AVUvXW9UyNelf1f$6DB1q6oR8rV7lXddkMfV+BUj693LNtFcEiQIsvkd4sg=','email@email.com','guest','2024-10-11 17:40:46.998662','2025-02-04 16:18:24.693467',0,NULL,1,1,0,1,'','',1,1,'2024-10-11 17:40:47'),(5,'testuser','pbkdf2_sha256$870000$2CBWHjGVwfCCcLtYpRJwsR$FCFo8LgydxTPBmDowKXsDI3byIgKQOx+4ZiuR1EweUQ=','testuser@example.com','guest','2024-10-11 17:40:53.623323','2025-02-04 16:18:24.702519',0,NULL,1,0,1,0,'','',1,1,'2024-10-11 17:40:54'),(6,'testuser2','pbkdf2_sha256$870000$KbtLlnszuDO5zHWHoMEWsC$MkR/399cI6HdPafkamahFx/LeXNelJ1VYlJBnh8EQ6c=','testuse2r2@example.com','guest','2024-12-12 10:24:07.036123','2025-02-04 16:18:24.718510',0,NULL,1,1,0,1,'','',1,1,'2024-12-12 10:24:07'),(9,'user1111','pbkdf2_sha256$720000$V91sIZKMImAnHJWXZjcv2h$Wla9V29iFiw6n0K9mfLIxwg71vuxsCIKJDP61LdkcYI=','testuser1111@example.com','guest','2025-02-04 16:16:35.567136','2025-02-04 16:18:24.732275',0,NULL,1,1,0,1,'','',1,1,'2025-02-04 16:16:36');
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
-- Table structure for table `translogix_djangoproject_usersettings`
--

DROP TABLE IF EXISTS `translogix_djangoproject_usersettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translogix_djangoproject_usersettings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date_interval` int unsigned NOT NULL,
  `arrival_time_tolerance` int unsigned NOT NULL,
  `allow_mixed_directions` tinyint(1) NOT NULL,
  `max_route_duration` int unsigned NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  `allow_multiple_work_addresses` tinyint(1) NOT NULL,
  `max_passengers` int unsigned NOT NULL,
  `max_route_distance` int unsigned NOT NULL,
  `max_stops` int unsigned NOT NULL,
  `min_passengers` int unsigned NOT NULL,
  `auto_save` tinyint(1) NOT NULL,
  `strategy` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `TransLogix_djangoPro_user_id_65414fb5_fk_TransLogi` FOREIGN KEY (`user_id`) REFERENCES `translogix_djangoproject_user` (`id`),
  CONSTRAINT `translogix_djangoproject_usersettings_chk_1` CHECK ((`date_interval` >= 0)),
  CONSTRAINT `translogix_djangoproject_usersettings_chk_2` CHECK ((`arrival_time_tolerance` >= 0)),
  CONSTRAINT `translogix_djangoproject_usersettings_chk_3` CHECK ((`max_route_duration` >= 0)),
  CONSTRAINT `translogix_djangoproject_usersettings_chk_4` CHECK ((`max_passengers` >= 0)),
  CONSTRAINT `translogix_djangoproject_usersettings_chk_5` CHECK ((`max_route_distance` >= 0)),
  CONSTRAINT `translogix_djangoproject_usersettings_chk_6` CHECK ((`max_stops` >= 0)),
  CONSTRAINT `translogix_djangoproject_usersettings_chk_7` CHECK ((`min_passengers` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translogix_djangoproject_usersettings`
--

LOCK TABLES `translogix_djangoproject_usersettings` WRITE;
/*!40000 ALTER TABLE `translogix_djangoproject_usersettings` DISABLE KEYS */;
INSERT INTO `translogix_djangoproject_usersettings` VALUES (1,1,30,0,240,'2025-01-24 11:56:09.766592','2025-05-01 20:34:21.269493',2,0,50,100,10,1,0,'min_duration');
/*!40000 ALTER TABLE `translogix_djangoproject_usersettings` ENABLE KEYS */;
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
INSERT INTO `translogix_djangoproject_vehicle` VALUES (1,'AB1234CD','МВ140',24,1,'1234567890ABCDEFG',7.5,3.8,5,'Степан Загуляйко','UA','Богдан',2020,1,'https://sylapravdy.com/wp-content/webpc-passthru.php?src=https://sylapravdy.com/wp-content/uploads/2021/07/shkilnyj-avtobus-ataman.jpg&nocache=1'),(2,'АА1111ББ','БС112',24,3,'WF222333FGH444',24,3.6,18,'Петро Іванович Котигорошко','UA','Еталон',2020,1,'https://images.unian.net/pb/003/thumb_files/h_500/388531.jpg'),(3,'АА2222BB','M240',20,1,'WF3333333FGH555',26,4,19,'Степан Іванович Калюжний','UA','Еталон',1988,1,'https://images.unian.net/pb/003/thumb_files/h_500/388531.jpg'),(4,'АА2222ГГ','ББ2А',44,1,'WF666333QWR777',32,4.2,27,'Ігор Петрович Міняйло','UA','Богдан',2000,1,'https://viki-tour.com.ua/wp-content/uploads/2018/04/trafik.jpg'),(5,'АА2222ББ','Спрінтер',20,3,'QSF888999QWWR33',24,2.5,18,'Абрам Свіридович Пульман','UA','Мерседес',2020,1,'https://viki-tour.com.ua/wp-content/uploads/2018/04/sprinter.jpg'),(6,'АА1111СС','ББ2А',22,3,'WF666333QWP999',26,3.4,22,'Петро Іванович Котигорошко','UA','Богдан',1987,1,'https://upload.wikimedia.org/wikipedia/commons/d/d9/Bogdan_A091.JPG'),(7,'АА1111HH','Суперджет',22,1,'WF666333QWN222',26,3.2,24,'Абрам Свіридович Пульман','UA','Богдан',1988,1,'https://bus.ck.ua/images/auto/1.jpg');
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

-- Dump completed on 2026-04-13 17:11:23
