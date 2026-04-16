-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: educentre_db
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
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `group_id` int NOT NULL,
  `attendance_date` date NOT NULL,
  `status` enum('present','absent') DEFAULT 'present',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_attendance_student` (`student_id`),
  KEY `fk_attendance_group` (`group_id`),
  CONSTRAINT `fk_attendance_group` FOREIGN KEY (`group_id`) REFERENCES `groups_table` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_attendance_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `subject` varchar(150) DEFAULT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `type` enum('Groupe','Privé') DEFAULT 'Groupe',
  `group_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
INSERT INTO `conversations` VALUES (3,'mmm','Groupe',NULL,'2026-04-13 23:44:11');
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups_table`
--

DROP TABLE IF EXISTS `groups_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `level_id` int DEFAULT NULL,
  `teacher_id` int DEFAULT NULL,
  `schedule` varchar(255) DEFAULT NULL,
  `meeting_link` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_groups_level` (`level_id`),
  KEY `fk_groups_teacher` (`teacher_id`),
  CONSTRAINT `fk_groups_level` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_groups_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups_table`
--

LOCK TABLES `groups_table` WRITE;
/*!40000 ALTER TABLE `groups_table` DISABLE KEYS */;
INSERT INTO `groups_table` VALUES (1,'Maths - Groupe A',1,1,'Lundi & Mercredi 09:00-11:00','https://meet.google.com/maths-a','2026-04-13 23:29:00'),(2,'Physique - Groupe B',1,2,'Mardi & Jeudi 10:00-12:00','https://meet.google.com/phys-b','2026-04-13 23:29:00'),(3,'Informatique - Groupe C',2,3,'Samedi 08:00-12:00','https://meet.google.com/info-c','2026-04-13 23:29:00'),(4,'Anglais - Groupe D',2,4,'Lundi & Vendredi 14:00-16:00','https://meet.google.com/angl-d','2026-04-13 23:29:00');
/*!40000 ALTER TABLE `groups_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_sections`
--

DROP TABLE IF EXISTS `home_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_sections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` text,
  `title` varchar(255) NOT NULL,
  `description` text,
  `display_order` int DEFAULT '1',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_sections`
--

LOCK TABLES `home_sections` WRITE;
/*!40000 ALTER TABLE `home_sections` DISABLE KEYS */;
/*!40000 ALTER TABLE `home_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_settings`
--

DROP TABLE IF EXISTS `home_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `topbar_logo` text,
  `footer_logo` text,
  `topbar_logo_height` int DEFAULT '48',
  `footer_logo_height` int DEFAULT '48',
  `hero_title` varchar(255) DEFAULT NULL,
  `hero_subtitle` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_settings`
--

LOCK TABLES `home_settings` WRITE;
/*!40000 ALTER TABLE `home_settings` DISABLE KEYS */;
INSERT INTO `home_settings` VALUES (1,NULL,NULL,48,48,'مرحباً بكم في منصة EduLive التعليمية',NULL,'2026-04-07 23:07:40','2026-04-07 23:07:40');
/*!40000 ALTER TABLE `home_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `levels`
--

DROP TABLE IF EXISTS `levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `levels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `levels`
--

LOCK TABLES `levels` WRITE;
/*!40000 ALTER TABLE `levels` DISABLE KEYS */;
INSERT INTO `levels` VALUES (1,'BTP','Brevet de Technicien Professionnel','https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800','2026-03-28 20:46:01'),(2,'BTS','Brevet de Technicien Supérieur','https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800','2026-03-28 20:46:01'),(5,'Langues',NULL,'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800','2026-04-08 23:39:47');
/*!40000 ALTER TABLE `levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `conversation_id` int NOT NULL,
  `sender_name` varchar(100) DEFAULT 'Admin',
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `conversation_id` (`conversation_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (8,3,'P. nour Jebali','.','2026-04-13 23:44:20'),(9,3,'Admin','.','2026-04-15 04:22:29');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registrations`
--

DROP TABLE IF EXISTS `registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `level_id` int DEFAULT NULL,
  `message` text,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `rejection_reason` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_registrations_level` (`level_id`),
  CONSTRAINT `fk_registrations_level` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registrations`
--

LOCK TABLES `registrations` WRITE;
/*!40000 ALTER TABLE `registrations` DISABLE KEYS */;
INSERT INTO `registrations` VALUES (1,'Ridha Zoghlami','reseausp@gmail.com','29261711',NULL,'Je souhaite m\'inscrire rapidement','rejected',NULL,'2026-04-03 17:37:45'),(2,'Ahmed Ali','visex15194@akixpres.com','+21688975789',NULL,'Demande d\'inscription au niveau A1','rejected',NULL,'2026-04-03 17:37:45'),(3,'Arayedh Mohamed','arayedhm@gmail.com','26222281',1,'Je veux rejoindre cette formation','rejected',NULL,'2026-04-03 17:37:45'),(4,'Ridha Zoghlami','reseausp@gmail.com','29261711',NULL,'Je souhaite m\'inscrire au niveau C2.','approved',NULL,'2026-04-03 17:50:58'),(5,'Ahmed Ali','visex15194@akixpres.com','+21688975789',NULL,'Je veux rejoindre le niveau A1.','approved',NULL,'2026-04-03 17:50:58'),(6,'Arayedh Mohamed','arayedhm@gmail.com','26222281',1,'Je souhaite commencer en BTP.','approved',NULL,'2026-04-03 17:50:58'),(7,'Mohammed Mohsen','amohmab500@gmail.com','15345024',5,NULL,'rejected',NULL,'2026-04-10 17:00:55'),(8,'Mohammed Mohsen','amohmab500@gmail.com',NULL,NULL,NULL,'approved',NULL,'2026-04-10 22:18:56');
/*!40000 ALTER TABLE `registrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resources`
--

DROP TABLE IF EXISTS `resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resources` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `description` text,
  `type` enum('pdf','video','link') DEFAULT 'pdf',
  `file_url` text,
  `external_url` text,
  `group_id` int DEFAULT NULL,
  `teacher_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `level_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_resources_group` (`group_id`),
  KEY `fk_resources_teacher` (`teacher_id`),
  KEY `fk_resources_level` (`level_id`),
  CONSTRAINT `fk_resources_group` FOREIGN KEY (`group_id`) REFERENCES `groups_table` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_resources_level` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_resources_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resources`
--

LOCK TABLES `resources` WRITE;
/*!40000 ALTER TABLE `resources` DISABLE KEYS */;
/*!40000 ALTER TABLE `resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `job_title` varchar(100) DEFAULT NULL,
  `content` text NOT NULL,
  `rating` int DEFAULT '5',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'Ahmed Ben Ali','Étudiant','Excellente plateforme, très intuitive et facile à utiliser !',5,'active','2026-04-11 14:56:18'),(2,'Salma Trabelsi','Parent','Les cours sont de très bonne qualité. Je recommande vivement !',5,'active','2026-04-11 14:56:18'),(3,'Omar Gharbi','Professionnel','Une expérience d apprentissage unique. Les enseignants sont très compétents.',5,'active','2026-04-11 14:56:18');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_contact_settings`
--

DROP TABLE IF EXISTS `site_contact_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_contact_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `primary_phone` varchar(20) DEFAULT NULL,
  `secondary_phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` text,
  `working_hours` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_contact_settings`
--

LOCK TABLES `site_contact_settings` WRITE;
/*!40000 ALTER TABLE `site_contact_settings` DISABLE KEYS */;
INSERT INTO `site_contact_settings` VALUES (1,'+21648152024',NULL,'mohammed@gmail.com','tunis,tunisia',NULL,'2026-04-07 22:59:23','2026-04-11 21:06:04');
/*!40000 ALTER TABLE `site_contact_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_links`
--

DROP TABLE IF EXISTS `social_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social_links` (
  `id` int NOT NULL AUTO_INCREMENT,
  `icon` varchar(50) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `url` text NOT NULL,
  `display_order` int DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_links`
--

LOCK TABLES `social_links` WRITE;
/*!40000 ALTER TABLE `social_links` DISABLE KEYS */;
INSERT INTO `social_links` VALUES (1,'Facebook','Facebook','https://facebook.com',1,'2026-04-07 23:10:16'),(2,'Instagram','Instagram','https://instagram.com',1,'2026-04-07 23:10:16');
/*!40000 ALTER TABLE `social_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `level_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `group_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'Ahmed Ben Ali','ahmed.benali@gmail.com','55100001',NULL,'2026-04-13 23:29:00',1),(2,'Fatma Zahra','fatma.zahra@gmail.com','55100002',NULL,'2026-04-13 23:29:00',1),(3,'Youssef Hamdi','youssef.hamdi@gmail.com','55100003',NULL,'2026-04-13 23:29:00',1),(4,'Mariem Saidi','mariem.saidi@gmail.com','55100004',NULL,'2026-04-13 23:29:00',2),(5,'Omar Khelifi','omar.khelifi@gmail.com','55100005',NULL,'2026-04-13 23:29:00',2),(6,'Sarra Belhaj','sarra.belhaj@gmail.com','55100006',NULL,'2026-04-13 23:29:00',2),(7,'Khalil Dridi','khalil.dridi@gmail.com','55100007',NULL,'2026-04-13 23:29:00',3),(8,'Nour Essid','nour.essid@gmail.com','55100008',NULL,'2026-04-13 23:29:00',3),(9,'Amine Ouali','amine.ouali@gmail.com','55100009',NULL,'2026-04-13 23:29:00',3),(10,'Rania Gharbi','rania.gharbi@gmail.com','55100010',NULL,'2026-04-13 23:29:00',4),(11,'Tarek Meddeb','tarek.meddeb@gmail.com','55100011',NULL,'2026-04-13 23:29:00',4),(12,'Hana Boughanmi','hana.boughanmi@gmail.com','55100012',NULL,'2026-04-13 23:29:00',4);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teachers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `specialty` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES (1,'Prof. Kamel Mansouri','prof.mansouri@edulive.tn','71000001','Mathématiques','2026-04-13 23:29:00'),(2,'Prof. Sonia Trabelsi','prof.trabelsi@edulive.tn','71000002','Physique-Chimie','2026-04-13 23:29:00'),(3,'Prof. Riadh Bouazizi','prof.bouazizi@edulive.tn','71000003','Informatique','2026-04-13 23:29:00'),(4,'Prof. Amira Jebali','prof.jebali@edulive.tn','71000004','Anglais','2026-04-13 23:29:00');
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('admin','teacher','student') DEFAULT 'admin',
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `teacher_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'مدير المنصة','admin@edulive.tn','$2b$10$OsYs83Nb2fom3vigX.HyieYZ3YQ5.0Iuax5t5zaF5ZuNNISainovK',NULL,'admin',NULL,'2026-04-09 16:41:00',NULL,NULL),(3,'Prof. Kamel Mansouri','prof.mansouri@edulive.tn','$2b$10$OsYs83Nb2fom3vigX.HyieYZ3YQ5.0Iuax5t5zaF5ZuNNISainovK',NULL,'teacher',NULL,'2026-04-13 23:29:00',1,NULL),(4,'Prof. Sonia Trabelsi','prof.trabelsi@edulive.tn','$2b$10$OsYs83Nb2fom3vigX.HyieYZ3YQ5.0Iuax5t5zaF5ZuNNISainovK',NULL,'teacher',NULL,'2026-04-13 23:29:00',2,NULL),(5,'Prof. Riadh Bouazizi','prof.bouazizi@edulive.tn','$2b$10$OsYs83Nb2fom3vigX.HyieYZ3YQ5.0Iuax5t5zaF5ZuNNISainovK',NULL,'teacher',NULL,'2026-04-13 23:29:00',3,NULL),(6,'P. nour Jebali','prof.jebali@edulive.tn','$2b$10$OsYs83Nb2fom3vigX.HyieYZ3YQ5.0Iuax5t5zaF5ZuNNISainovK',NULL,'teacher',NULL,'2026-04-13 23:29:00',4,NULL),(7,'Ahmed Ben Ali','ahmed.benali@edulive.tn','$2b$10$OsYs83Nb2fom3vigX.HyieYZ3YQ5.0Iuax5t5zaF5ZuNNISainovK',NULL,'student',NULL,'2026-04-13 23:29:00',NULL,1),(8,'Fatma Zahra','fatma.zahra@edulive.tn','$2b$10$OsYs83Nb2fom3vigX.HyieYZ3YQ5.0Iuax5t5zaF5ZuNNISainovK',NULL,'student',NULL,'2026-04-13 23:29:00',NULL,2),(9,'Youssef Hamdi','youssef.hamdi@edulive.tn','$2b$10$OsYs83Nb2fom3vigX.HyieYZ3YQ5.0Iuax5t5zaF5ZuNNISainovK',NULL,'student',NULL,'2026-04-13 23:29:00',NULL,3),(10,'Mariem Saidi','mariem.saidi@edulive.tn','$2b$10$OsYs83Nb2fom3vigX.HyieYZ3YQ5.0Iuax5t5zaF5ZuNNISainovK',NULL,'student',NULL,'2026-04-13 23:29:00',NULL,4),(11,'Omar Khelifi','omar.khelifi@edulive.tn','$2b$10$OsYs83Nb2fom3vigX.HyieYZ3YQ5.0Iuax5t5zaF5ZuNNISainovK',NULL,'student',NULL,'2026-04-13 23:29:00',NULL,5),(12,'Sarra Belhaj','sarra.belhaj@edulive.tn','$2b$10$OsYs83Nb2fom3vigX.HyieYZ3YQ5.0Iuax5t5zaF5ZuNNISainovK',NULL,'student',NULL,'2026-04-13 23:29:00',NULL,6),(13,'Khalil Dridi','khalil.dridi@edulive.tn','$2b$10$OsYs83Nb2fom3vigX.HyieYZ3YQ5.0Iuax5t5zaF5ZuNNISainovK',NULL,'student',NULL,'2026-04-13 23:29:00',NULL,7),(14,'Nour Essid','nour.essid@edulive.tn','$2b$10$OsYs83Nb2fom3vigX.HyieYZ3YQ5.0Iuax5t5zaF5ZuNNISainovK',NULL,'student',NULL,'2026-04-13 23:29:00',NULL,8),(15,'Amine Ouali','amine.ouali@edulive.tn','$2b$10$OsYs83Nb2fom3vigX.HyieYZ3YQ5.0Iuax5t5zaF5ZuNNISainovK',NULL,'student',NULL,'2026-04-13 23:29:00',NULL,9),(16,'Rania Gharbi','rania.gharbi@edulive.tn','$2b$10$OsYs83Nb2fom3vigX.HyieYZ3YQ5.0Iuax5t5zaF5ZuNNISainovK',NULL,'student',NULL,'2026-04-13 23:29:00',NULL,10),(17,'Tarek Meddeb','tarek.meddeb@edulive.tn','$2b$10$OsYs83Nb2fom3vigX.HyieYZ3YQ5.0Iuax5t5zaF5ZuNNISainovK',NULL,'student',NULL,'2026-04-13 23:29:00',NULL,11),(18,'Hana Boughanmi','hana.boughanmi@edulive.tn','$2b$10$OsYs83Nb2fom3vigX.HyieYZ3YQ5.0Iuax5t5zaF5ZuNNISainovK',NULL,'student',NULL,'2026-04-13 23:29:00',NULL,12);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-16  7:15:52
