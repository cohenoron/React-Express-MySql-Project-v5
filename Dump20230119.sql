CREATE DATABASE  IF NOT EXISTS `vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `favorite_vacations`
--

DROP TABLE IF EXISTS `favorite_vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite_vacations` (
  `username` varchar(255) DEFAULT NULL,
  `vacation_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite_vacations`
--

LOCK TABLES `favorite_vacations` WRITE;
/*!40000 ALTER TABLE `favorite_vacations` DISABLE KEYS */;
INSERT INTO `favorite_vacations` VALUES ('evia',32),('evia',34),('evia',35),('evia',37),('evia',31),('ori',31),('ori',30),('admin',31),('eee',31),('eee',32);
/*!40000 ALTER TABLE `favorite_vacations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'oron','cohen','oroncohen','$2b$10$d.mx6NlYcrsGV6XCz7Vj1.n4kdM8W9Fq39AkgGh8ffeS.JC2f1INS',1),(3,'john','smith','john','$2b$10$ANVX0cCBRDcV6.02LNpf5eNnED6J6w8iyjXsPJTDPZ1D.tTzqBUqu',0),(4,'evia','cohen','evia','$2b$10$K5zL6bUoZpWiUFqQYMl9N.ySef64LyAnjmnUKa7HM73Srv1itqdYa',0),(8,'ori','cohen','ori','$2b$10$oxMug/eGm2Ubt.To3jvf/us.VQSYd2JK0J.PU108EsV/8DuAtMHmO',0),(9,'ariel','cohen','ariel','$2b$10$F5U18OH/Dun9Ftj6Q6/r/eARudNi1jbRjf5Iv1IrjZ0RtrAGitRoC',0),(11,'admin','admin','admin','$2b$10$JP7Kv2Jjv86CPTBoZWI0.uQFrwavDAIOD0Xi9bI3puawhOCtCm3dq',1),(12,'www','www','www','$2b$10$5jRI/8iGEh2G6ryya8BQLeW0WudBxA8OHclUPVhoBPW2436yoibZ.',0),(13,'fff','fff','fff','$2b$10$KyD00VMeIhOhVPUFmYhyLO41UJ2unJKYUOUytwbaOkzkHEyGxoX3u',0),(14,'eee','eee','eee','$2b$10$to3FygMQyOpBO.d7enuje.23lntqHwnlixXfvgtMz0utlLuEkKDrC',0),(15,'yyy','yyy','yyy','$2b$10$IsD0K19Yp.RNSMkMr4Kq8eRD3Gopd1BXIjxM8hXq4fq4hoO16vtQ6',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacation_list`
--

DROP TABLE IF EXISTS `vacation_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacation_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `description` text,
  `destination` varchar(255) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `price` int DEFAULT NULL,
  `followers` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacation_list`
--

LOCK TABLES `vacation_list` WRITE;
/*!40000 ALTER TABLE `vacation_list` DISABLE KEYS */;
INSERT INTO `vacation_list` VALUES (30,'Glamis Express','Glamis','The place for all off-road','California','https://images.squarespace-cdn.com/content/v1/53758810e4b0e5824b378781/1460137907278-R4ISDIXQ1PFFJ76PUJ4M/image-asset.jpeg?format=1000w','2022-12-20','2022-12-20',3000,0),(31,'Snow for the Brave One','Snowmobile','A number of factors influence how to choose a snowmobile, such as how you plan to ride it and how...','Alaska','https://blog.amsoil.com/wp-content/uploads/2017/12/Mountain_Snowmobile_1200px.jpg','2022-12-12','2022-12-16',5000,0),(32,'Morocco On A dirt bike','dirt bike','6 Day Mini Mountain and Desert Guided Motorcycle Tour in Morocco','Morocco ','https://motomoroccotours.com/wp-content/uploads/2022/04/moto-morocco-tours-ktm-travel-merzouga-sahara-desert-assistance-nomad-rally-13.jpg','2022-12-20','2022-12-13',3000,0),(33,'Extreme Hunting ','Hunting','Embark on a superb riding experience, nearly 90% off-road. The spectacular tracks combine with dramatic mountain landscapes and awesome desert views. Beautiful winding trails, gorges','Africa','https://cff2.earth.com/uploads/2018/04/12142207/The-decline-of-hunting-for-sport-850x500.jpg','2022-12-21','2022-12-14',4000,0),(34,'Beautiful views','4 X 4','Explore the most popular off-road driving trails in Georgia with hand-curated trail maps and driving directions as well as detailed reviews','Georgia','https://tourguide.ge/wp-content/uploads/2019/08/Off-Roading-in-Georgia_1-800x600.jpg','2022-12-15','2022-12-13',4000,0),(35,'Ride To The Sunset','Horses','8 Day Holiday in Italy: Rome Stay and Horse Riding Tour in Latium','italy','https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0c/10/fa/0d.jpg','2022-12-05','2022-12-13',1500,0),(37,'Extremes SBS Trip','sbs','Polaris RZR XP 1000 Series Elite Mid-Travel Suspension Kit Part #: RZR-05800 HCR','USA','https://cdn.shopify.com/s/files/1/0641/7999/4875/products/main.jpg?v=1652150587','2022-12-20','2022-12-14',4000,0),(38,'Swimming With Dolphins','Dolphins','Come face-to-face with gentle and playful bottlenose dolphins in Atlantis Aquaventure Water Park','Dubai','https://cdn.dubai-marina.com/wp-content/uploads/2014/12/Dolphin-Bay.jpg','2022-12-21','2022-12-07',3000,0),(52,'f','f','f','f','f','0032-03-11','2023-01-25',434343,0),(53,'f','f','f','f','f','0032-03-11','2023-01-25',434343,0),(54,'f','f','f','f','f','0032-03-11','2023-01-25',434343,0),(55,'f','f','f','f','f','0032-03-11','2023-01-25',434343,0);
/*!40000 ALTER TABLE `vacation_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-19 18:04:05
