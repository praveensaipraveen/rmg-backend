-- MySQL dump 10.17  Distrib 10.3.20-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: rmg_1
-- ------------------------------------------------------
-- Server version	10.3.20-MariaDB-1:10.3.20+maria~xenial-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `game_list`
--

DROP TABLE IF EXISTS `game_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_list` (
  `game_id` varchar(30) DEFAULT NULL,
  `game_name` varchar(20) DEFAULT NULL,
  `game_auth_code` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_list`
--

LOCK TABLES `game_list` WRITE;
/*!40000 ALTER TABLE `game_list` DISABLE KEYS */;
INSERT INTO `game_list` VALUES ('2','TestGame2','abcd');
/*!40000 ALTER TABLE `game_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_wallet`
--

DROP TABLE IF EXISTS `game_wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_wallet` (
  `game_id` varchar(30) DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `coins` varchar(10) DEFAULT NULL,
  `real_credits` varchar(10) DEFAULT NULL,
  `promo_credits` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_wallet`
--

LOCK TABLES `game_wallet` WRITE;
/*!40000 ALTER TABLE `game_wallet` DISABLE KEYS */;
/*!40000 ALTER TABLE `game_wallet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournament_data`
--

DROP TABLE IF EXISTS `tournament_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tournament_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tournament_id` varchar(10) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `start_time` varchar(20) DEFAULT NULL,
  `end_time` varchar(20) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournament_data`
--

LOCK TABLES `tournament_data` WRITE;
/*!40000 ALTER TABLE `tournament_data` DISABLE KEYS */;
INSERT INTO `tournament_data` VALUES (1,'8',11,'2019-11-28T11:09:27','2019-11-29T18:18:10',1,'8080808080'),(2,'8',11,'2019-11-28T11:09:52','2019-11-29T18:18:10',NULL,'8080808080'),(3,'8',11,'2019-11-28T11:10:01','2019-11-29T18:18:10',NULL,'8080808080'),(4,'8',4,'2019-11-28T11:10:01',NULL,NULL,'9090909090'),(5,'8',9,'2019-11-28T11:10:01',NULL,NULL,'9090909090'),(6,'8',1,'2019-11-28T11:10:01',NULL,NULL,'9090909090'),(7,'8',9,'2019-11-28T11:10:01',NULL,NULL,'1010101010'),(8,'8',1,'2019-11-28T11:10:01',NULL,NULL,'1010101010'),(9,'8',10,'2019-11-28T11:10:01',NULL,NULL,'1010101010'),(10,'9',10,'2019-11-28T11:10:01',NULL,NULL,'1010101010'),(11,'9',8,'2019-11-28T11:10:01',NULL,NULL,'1010101010'),(12,'8',10,'2019-11-28T11:10:01',NULL,NULL,'9090909090'),(13,'8',11,'2019-11-29T17:54:11','2019-11-29T18:18:10',NULL,'8080808080'),(14,'8',11,'2019-11-29T18:12:15','2019-11-29T18:18:10',NULL,'8080808080'),(15,'8',11,'2019-11-29T18:15:31','2019-11-29T18:59:28',NULL,'8080808080');
/*!40000 ALTER TABLE `tournament_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournaments`
--

DROP TABLE IF EXISTS `tournaments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tournaments` (
  `game_id` varchar(30) DEFAULT NULL,
  `tournament_id` int(11) NOT NULL AUTO_INCREMENT,
  `tournament_name` varchar(30) DEFAULT NULL,
  `occupied_slots` varchar(10) DEFAULT NULL,
  `available_slots` varchar(10) DEFAULT NULL,
  `start_time` varchar(20) DEFAULT NULL,
  `end_time` varchar(20) DEFAULT NULL,
  `entry_fee` int(4) DEFAULT NULL,
  `prize1` int(4) DEFAULT NULL,
  `prize1_quota_pc` int(4) DEFAULT NULL,
  `prize2` int(4) DEFAULT NULL,
  `prize2_quota_pc` int(4) DEFAULT NULL,
  `prize3` int(4) DEFAULT NULL,
  `prize3_quota_pc` int(4) DEFAULT NULL,
  PRIMARY KEY (`tournament_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournaments`
--

LOCK TABLES `tournaments` WRITE;
/*!40000 ALTER TABLE `tournaments` DISABLE KEYS */;
INSERT INTO `tournaments` VALUES ('1',5,'tournament5','0','10','2019-11-26T13:30:00','2019-11-26T14:30:00',10,4,10,3,10,2,20),('2',6,'t21','0','10','2019-11-27T01:00:00','2019-11-27T23:00:00',4,5,10,4,10,3,10),('2',7,'t21','0','10','2019-11-27T01:00:00','2019-11-27T23:00:00',4,5,10,4,10,3,10),('2',8,'t21','0','10','2019-11-27T01:00:00','2019-11-29T23:00:00',4,5,10,4,10,3,10);
/*!40000 ALTER TABLE `tournaments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions_g`
--

DROP TABLE IF EXISTS `transactions_g`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions_g` (
  `user_id` varchar(20) DEFAULT NULL,
  `game_id` varchar(30) DEFAULT NULL,
  `transaction_id` varchar(50) DEFAULT NULL,
  `transaction_time` varchar(20) DEFAULT NULL,
  `value` varchar(10) DEFAULT NULL,
  `value_type` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions_g`
--

LOCK TABLES `transactions_g` WRITE;
/*!40000 ALTER TABLE `transactions_g` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions_g` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions_u`
--

DROP TABLE IF EXISTS `transactions_u`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions_u` (
  `transaction_id` varchar(50) DEFAULT NULL,
  `from_entity` varchar(50) DEFAULT NULL,
  `to_entity` varchar(50) DEFAULT NULL,
  `value` varchar(10) DEFAULT NULL,
  `value_type` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions_u`
--

LOCK TABLES `transactions_u` WRITE;
/*!40000 ALTER TABLE `transactions_u` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions_u` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profiles`
--

DROP TABLE IF EXISTS `user_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_profiles` (
  `user_id` varchar(20) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email_id` varchar(30) DEFAULT NULL,
  `f_name` varchar(20) DEFAULT NULL,
  `l_name` varchar(20) DEFAULT NULL,
  `state` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `verified_at` varchar(20) DEFAULT NULL,
  `otp` varchar(10) DEFAULT NULL,
  `verified` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profiles`
--

LOCK TABLES `user_profiles` WRITE;
/*!40000 ALTER TABLE `user_profiles` DISABLE KEYS */;
INSERT INTO `user_profiles` VALUES ('varun ravula','8080808080','varun@gmail.com','varun','ravula','Guntur','2019-11-25 23:57:53',47,NULL,NULL,1);
/*!40000 ALTER TABLE `user_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_verification`
--

DROP TABLE IF EXISTS `user_verification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_verification` (
  `user_id` varchar(20) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `otp` varchar(10) DEFAULT NULL,
  `game_id` varchar(30) DEFAULT NULL,
  `created_at` varchar(20) DEFAULT NULL,
  `verified_at` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_verification`
--

LOCK TABLES `user_verification` WRITE;
/*!40000 ALTER TABLE `user_verification` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_verification` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-30  0:46:12
