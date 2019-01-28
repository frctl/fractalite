-- MySQL dump 10.13  Distrib 5.7.17, for Linux (x86_64)
--
-- Host: localhost    Database: clearleftretreats
-- ------------------------------------------------------
-- Server version	5.7.17-0ubuntu0.16.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assetindexdata`
--

DROP TABLE IF EXISTS `assetindexdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assetindexdata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sessionId` varchar(36) NOT NULL DEFAULT '',
  `volumeId` int(11) NOT NULL,
  `uri` text,
  `size` bigint(20) unsigned DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `recordId` int(11) DEFAULT NULL,
  `inProgress` tinyint(1) DEFAULT '0',
  `completed` tinyint(1) DEFAULT '0',
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `assetindexdata_sessionId_volumeId_idx` (`sessionId`,`volumeId`),
  KEY `assetindexdata_volumeId_idx` (`volumeId`),
  CONSTRAINT `assetindexdata_volumeId_fk` FOREIGN KEY (`volumeId`) REFERENCES `volumes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assetindexdata`
--

LOCK TABLES `assetindexdata` WRITE;
/*!40000 ALTER TABLE `assetindexdata` DISABLE KEYS */;
/*!40000 ALTER TABLE `assetindexdata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assets`
--

DROP TABLE IF EXISTS `assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assets` (
  `id` int(11) NOT NULL,
  `volumeId` int(11) DEFAULT NULL,
  `folderId` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `kind` varchar(50) NOT NULL DEFAULT 'unknown',
  `width` int(11) unsigned DEFAULT NULL,
  `height` int(11) unsigned DEFAULT NULL,
  `size` bigint(20) unsigned DEFAULT NULL,
  `focalPoint` varchar(13) DEFAULT NULL,
  `dateModified` datetime DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `assets_filename_folderId_unq_idx` (`filename`,`folderId`),
  KEY `assets_folderId_idx` (`folderId`),
  KEY `assets_volumeId_idx` (`volumeId`),
  CONSTRAINT `assets_folderId_fk` FOREIGN KEY (`folderId`) REFERENCES `volumefolders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `assets_id_fk` FOREIGN KEY (`id`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `assets_volumeId_fk` FOREIGN KEY (`volumeId`) REFERENCES `volumes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assets`
--

LOCK TABLES `assets` WRITE;
/*!40000 ALTER TABLE `assets` DISABLE KEYS */;
INSERT INTO `assets` VALUES (24,1,1,'cotswolds-masthead-1600.jpg','image',1600,1067,133048,NULL,'2018-11-23 16:39:22','2018-11-23 16:39:25','2018-11-23 16:41:00','5f4d2b44-f47c-4e94-b7a4-3ed31415cb59'),(25,1,1,'cotswolds-house.jpg','image',1500,859,242757,NULL,'2018-11-23 16:41:41','2018-11-23 16:41:45','2018-11-23 16:45:32','6097d5ad-6f18-4fb0-96bf-b6a7fdf7c705'),(26,1,1,'cotswolds-room.jpg','image',1500,859,115728,NULL,'2018-11-23 16:41:48','2018-11-23 16:41:50','2018-11-23 16:46:06','bdc34c42-4a5e-4f8e-b324-1540c8234461'),(27,1,1,'cotswolds-contemplating.jpg','image',1024,684,87380,NULL,'2018-11-23 16:41:58','2018-11-23 16:42:01','2018-11-23 16:45:01','3b86a3f5-f118-4e3b-94f5-2c92a1fdbc58'),(28,1,1,'cotswolds-chatting.jpg','image',1024,684,64032,NULL,'2018-11-23 16:42:03','2018-11-23 16:42:05','2018-11-23 16:44:31','f1177e54-d931-428e-ad26-88c7b71d617e'),(29,1,1,'cotswolds-chairs.jpg','image',1000,736,80824,NULL,'2018-11-23 16:42:15','2018-11-23 16:42:17','2018-11-23 16:43:41','67997ba4-2dd4-41e2-8de6-2a3941b242ef'),(30,1,1,'cotswolds-writing.jpg','image',1024,684,98786,NULL,'2018-11-23 16:48:32','2018-11-23 16:48:33','2018-11-25 10:28:14','4687eee4-473d-404f-993c-10e305fc8baf'),(31,1,1,'cotswolds-walking.jpg','image',1024,684,131001,NULL,'2018-11-23 16:50:07','2018-11-23 16:50:10','2018-11-25 10:28:26','7930a57f-2c8d-4b54-9ff0-3495208b3082'),(43,1,1,'invision.png','image',181,61,5816,NULL,'2018-11-23 18:23:43','2018-11-23 18:23:44','2018-11-23 18:23:44','af055945-62f4-4e1d-b3ff-f3b95b49c8ae');
/*!40000 ALTER TABLE `assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assettransformindex`
--

DROP TABLE IF EXISTS `assettransformindex`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assettransformindex` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `assetId` int(11) NOT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `format` varchar(255) DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `volumeId` int(11) DEFAULT NULL,
  `fileExists` tinyint(1) NOT NULL DEFAULT '0',
  `inProgress` tinyint(1) NOT NULL DEFAULT '0',
  `dateIndexed` datetime DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `assettransformindex_volumeId_assetId_location_idx` (`volumeId`,`assetId`,`location`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assettransformindex`
--

LOCK TABLES `assettransformindex` WRITE;
/*!40000 ALTER TABLE `assettransformindex` DISABLE KEYS */;
INSERT INTO `assettransformindex` VALUES (1,29,'cotswolds-chairs.jpg',NULL,'_320xAUTO_crop_center-center_none',1,1,0,'2018-11-23 17:03:16','2018-11-23 17:03:16','2018-11-23 17:03:22','e05db524-0363-43f7-bf4a-4a6452e1dbc3'),(2,29,'cotswolds-chairs.jpg',NULL,'_640xAUTO_crop_center-center_none',1,1,0,'2018-11-23 17:03:16','2018-11-23 17:03:16','2018-11-23 17:03:24','59bcb901-97e7-425e-a881-4ca92cf795c6'),(3,29,'cotswolds-chairs.jpg',NULL,'_1000xAUTO_crop_center-center_none',1,1,0,'2018-11-23 17:03:16','2018-11-23 17:03:16','2018-11-23 17:03:20','5d84b2b0-ba03-4e91-bf02-41f27a4a099f'),(4,27,'cotswolds-contemplating.jpg',NULL,'_320xAUTO_crop_center-center_none',1,1,0,'2018-11-23 17:07:25','2018-11-23 17:07:25','2018-11-23 17:07:35','74765614-cf20-4333-9040-eec1d8c4dc9d'),(5,27,'cotswolds-contemplating.jpg',NULL,'_640xAUTO_crop_center-center_none',1,1,0,'2018-11-23 17:07:25','2018-11-23 17:07:25','2018-11-23 17:07:36','5d15bf8a-718e-4d37-ac5a-0f5b934e08c8'),(6,27,'cotswolds-contemplating.jpg',NULL,'_1024xAUTO_crop_center-center_none',1,1,0,'2018-11-23 17:07:25','2018-11-23 17:07:25','2018-11-23 17:07:29','dbb8a4db-7fac-48c5-996f-a0cd1254ab5c'),(13,28,'cotswolds-chatting.jpg',NULL,'_320xAUTO_crop_center-center_none',1,1,0,'2018-11-23 17:07:25','2018-11-23 17:07:25','2018-11-23 17:07:45','df9b459d-d146-4423-a381-26a6d5367ccf'),(14,28,'cotswolds-chatting.jpg',NULL,'_640xAUTO_crop_center-center_none',1,1,0,'2018-11-23 17:07:25','2018-11-23 17:07:25','2018-11-23 17:07:46','846fbe71-0ed5-44a8-a58a-ab8638ef375e'),(15,28,'cotswolds-chatting.jpg',NULL,'_1024xAUTO_crop_center-center_none',1,1,0,'2018-11-23 17:07:25','2018-11-23 17:07:25','2018-11-23 17:07:33','a36d01c8-e730-4b05-9389-2ab38b65c12a'),(16,25,'cotswolds-house.jpg',NULL,'_320xAUTO_crop_center-center_none',1,1,0,'2018-11-23 17:14:16','2018-11-23 17:14:16','2018-11-23 17:14:30','e08f0743-dbd4-45de-b2d8-16f2275d3dba'),(17,25,'cotswolds-house.jpg',NULL,'_640xAUTO_crop_center-center_none',1,1,0,'2018-11-23 17:14:16','2018-11-23 17:14:16','2018-11-23 17:14:31','288f7b13-a145-4539-b849-03b2e1ab0643'),(18,25,'cotswolds-house.jpg',NULL,'_1024xAUTO_crop_center-center_none',1,1,0,'2018-11-23 17:14:16','2018-11-23 17:14:16','2018-11-23 17:14:32','5898a039-8bf4-4166-a895-e517d47d28ae'),(19,25,'cotswolds-house.jpg',NULL,'_1500xAUTO_crop_center-center_none',1,1,0,'2018-11-23 17:14:16','2018-11-23 17:14:16','2018-11-23 17:14:28','712a3fed-4c27-4a67-8aec-2a8e91b6e56a'),(20,26,'cotswolds-room.jpg',NULL,'_320xAUTO_crop_center-center_none',1,1,0,'2018-11-23 17:14:16','2018-11-23 17:14:16','2018-11-23 17:14:33','a71b9396-ff46-48dd-9d7d-cb6777f8e52c'),(21,26,'cotswolds-room.jpg',NULL,'_640xAUTO_crop_center-center_none',1,1,0,'2018-11-23 17:14:16','2018-11-23 17:14:16','2018-11-23 17:14:34','516964d6-9006-490c-b2e3-efc532969dea'),(22,26,'cotswolds-room.jpg',NULL,'_1024xAUTO_crop_center-center_none',1,1,0,'2018-11-23 17:14:16','2018-11-23 17:14:16','2018-11-23 17:14:35','9df5e23f-9be5-466b-8209-22861419c6f6'),(23,26,'cotswolds-room.jpg',NULL,'_1500xAUTO_crop_center-center_none',1,1,0,'2018-11-23 17:14:16','2018-11-23 17:14:16','2018-11-23 17:14:20','d6528358-dba0-43b4-941f-60f2536f5818'),(24,24,'cotswolds-masthead-1600.jpg',NULL,'_640xAUTO_crop_center-center_none',1,1,0,'2018-11-23 17:16:22','2018-11-23 17:16:22','2018-11-23 17:16:28','74ec2c38-9b8e-460d-97c7-6c9557b7feac'),(25,30,'cotswolds-writing.jpg',NULL,'_320xAUTO_crop_center-center_none',1,1,0,'2018-11-25 10:32:51','2018-11-25 10:32:51','2018-11-25 10:33:02','6abbb767-9894-430d-b185-e89be8d5333c'),(26,30,'cotswolds-writing.jpg',NULL,'_640xAUTO_crop_center-center_none',1,1,0,'2018-11-25 10:32:51','2018-11-25 10:32:51','2018-11-25 10:33:04','60063ebf-6988-4fca-bfc4-46f627454a87'),(27,30,'cotswolds-writing.jpg',NULL,'_1024xAUTO_crop_center-center_none',1,1,0,'2018-11-25 10:32:51','2018-11-25 10:32:51','2018-11-25 10:32:55','a7448231-69b1-47e2-bdb6-5da4c3f1cf4e'),(28,31,'cotswolds-walking.jpg',NULL,'_320xAUTO_crop_center-center_none',1,1,0,'2018-11-25 10:32:51','2018-11-25 10:32:51','2018-11-25 10:33:05','b205b20b-be88-4875-ba34-17e4e888a2d6'),(29,31,'cotswolds-walking.jpg',NULL,'_640xAUTO_crop_center-center_none',1,1,0,'2018-11-25 10:32:51','2018-11-25 10:32:51','2018-11-25 10:33:06','04fdfb63-a96b-4112-8191-6e45f5dc6178'),(30,31,'cotswolds-walking.jpg',NULL,'_1024xAUTO_crop_center-center_none',1,1,0,'2018-11-25 10:32:51','2018-11-25 10:32:51','2018-11-25 10:32:59','17661c13-6ff4-4d25-b37e-815e24414c13');
/*!40000 ALTER TABLE `assettransformindex` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assettransforms`
--

DROP TABLE IF EXISTS `assettransforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assettransforms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `mode` enum('stretch','fit','crop') NOT NULL DEFAULT 'crop',
  `position` enum('top-left','top-center','top-right','center-left','center-center','center-right','bottom-left','bottom-center','bottom-right') NOT NULL DEFAULT 'center-center',
  `width` int(11) unsigned DEFAULT NULL,
  `height` int(11) unsigned DEFAULT NULL,
  `format` varchar(255) DEFAULT NULL,
  `quality` int(11) DEFAULT NULL,
  `interlace` enum('none','line','plane','partition') NOT NULL DEFAULT 'none',
  `dimensionChangeTime` datetime DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `assettransforms_name_unq_idx` (`name`),
  UNIQUE KEY `assettransforms_handle_unq_idx` (`handle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assettransforms`
--

LOCK TABLES `assettransforms` WRITE;
/*!40000 ALTER TABLE `assettransforms` DISABLE KEYS */;
/*!40000 ALTER TABLE `assettransforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `categories_groupId_idx` (`groupId`),
  CONSTRAINT `categories_groupId_fk` FOREIGN KEY (`groupId`) REFERENCES `categorygroups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `categories_id_fk` FOREIGN KEY (`id`) REFERENCES `elements` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorygroups`
--

DROP TABLE IF EXISTS `categorygroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorygroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `structureId` int(11) NOT NULL,
  `fieldLayoutId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `categorygroups_name_unq_idx` (`name`),
  UNIQUE KEY `categorygroups_handle_unq_idx` (`handle`),
  KEY `categorygroups_structureId_idx` (`structureId`),
  KEY `categorygroups_fieldLayoutId_idx` (`fieldLayoutId`),
  CONSTRAINT `categorygroups_fieldLayoutId_fk` FOREIGN KEY (`fieldLayoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE SET NULL,
  CONSTRAINT `categorygroups_structureId_fk` FOREIGN KEY (`structureId`) REFERENCES `structures` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorygroups`
--

LOCK TABLES `categorygroups` WRITE;
/*!40000 ALTER TABLE `categorygroups` DISABLE KEYS */;
/*!40000 ALTER TABLE `categorygroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorygroups_sites`
--

DROP TABLE IF EXISTS `categorygroups_sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorygroups_sites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `hasUrls` tinyint(1) NOT NULL DEFAULT '1',
  `uriFormat` text,
  `template` varchar(500) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `categorygroups_sites_groupId_siteId_unq_idx` (`groupId`,`siteId`),
  KEY `categorygroups_sites_siteId_idx` (`siteId`),
  CONSTRAINT `categorygroups_sites_groupId_fk` FOREIGN KEY (`groupId`) REFERENCES `categorygroups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `categorygroups_sites_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorygroups_sites`
--

LOCK TABLES `categorygroups_sites` WRITE;
/*!40000 ALTER TABLE `categorygroups_sites` DISABLE KEYS */;
/*!40000 ALTER TABLE `categorygroups_sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elementId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  `field_startDate` datetime DEFAULT NULL,
  `field_endDate` datetime DEFAULT NULL,
  `field_sectionTitle` text,
  `field_sectionSubtitle` text,
  `field_bodyText` text,
  `field_pageBody` text,
  `field_contactEmail` varchar(255) DEFAULT NULL,
  `field_ticketPrice` int(10) DEFAULT NULL,
  `field_sectionStyle` varchar(255) DEFAULT NULL,
  `field_altText` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `content_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `content_siteId_idx` (`siteId`),
  KEY `content_title_idx` (`title`),
  CONSTRAINT `content_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `content_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
INSERT INTO `content` VALUES (1,1,1,NULL,'2018-11-07 16:34:56','2018-11-07 16:34:56','a3373827-a065-471c-a16f-b3ad989dc5a8',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,3,1,'Cotswolds','2018-11-08 16:50:20','2018-11-25 10:41:09','bcab587d-d480-48a6-b585-17c980304035','2019-03-04 00:00:00','2019-03-07 00:00:00',NULL,NULL,NULL,NULL,NULL,1995,NULL,NULL),(6,5,1,NULL,'2018-11-22 13:53:47','2018-11-25 10:41:10','d2ff78ba-6b06-4151-999f-35731109952e',NULL,NULL,'What can you expect?',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,6,1,NULL,'2018-11-22 13:53:47','2018-11-25 10:41:10','42d39e86-ef14-40a1-b5be-463c70d12596',NULL,NULL,NULL,NULL,'<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>',NULL,NULL,NULL,NULL,NULL),(8,7,1,NULL,'2018-11-22 13:53:47','2018-11-25 10:41:10','58853ea7-eac6-45e2-b1b9-4faa0b82766b',NULL,NULL,'Who is it for?',NULL,NULL,NULL,NULL,NULL,'muted',NULL),(9,8,1,NULL,'2018-11-22 13:53:47','2018-11-25 10:41:10','57ef5f1c-daa3-41bf-a8d2-755d977d2c18',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,12,1,'Privacy Policy','2018-11-22 14:57:20','2018-11-22 15:39:16','b232acd5-4d0f-4495-b1ff-166bb5f0035d',NULL,NULL,NULL,NULL,NULL,'<h2>Cus­tomer service</h2>\n<p>We com­mu­ni­cate with users on a reg­u­lar basis to pro­vide request­ed ser­vices and about issues relat­ing to their account. We reply via email or phone.</p>\n<h2>Shar­ing</h2>\n<p>Clear­left does not pass on or sell infor­ma­tion about our cus­tomers to any oth­er busi­ness or organ­i­sa­tion. The only excep­tion to this is where we are legal­ly oblig­ed to do so to com­ply with a cur­rent judi­cial pro­ceed­ing, a court order or legal process served on our Website.</p>\n<h2>Busi­ness transitions</h2>\n<p>In the event Clear­left Ltd goes through a busi­ness tran­si­tion, users will be noti­fied via a promi­nent notice on our Website for 30 days pri­or to a change of own­er­ship or con­trol of their per­son­al infor­ma­tion. If as a result of the busi­ness tran­si­tion, the users’ per­son­al­ly iden­ti­fi­able infor­ma­tion will be used dif­fer­ent­ly from that stat­ed at the time of col­lec­tion, they will be giv­en choice con­sis­tent with our noti­fi­ca­tion of changes section.</p>\n<h2>Choice/opt-out</h2>\n<p>Users who no longer wish to receive pro­mo­tion­al com­mu­ni­ca­tions may opt-out of receiv­ing these com­mu­ni­ca­tions by reply­ing with ​‘unsub­scribe’ in the sub­ject line of the email, or email us at <a href=\"mailto:info@clearleft.com\">info@​clearleft.​com</a>, tele­phone on +44 (0)845 838 6163, or write to Clear­left Ltd, 68 Mid­dle Street, Brighton, BN11AL, UK.</p>\n<h2>Links</h2>\n<p>Our web­site con­tains links to oth­er sites. We are not respon­si­ble for the pri­va­cy prac­tices of such oth­er sites. This pri­va­cy state­ment applies sole­ly to infor­ma­tion col­lect­ed by this website.</p>\n<h2>Sur­veys &amp; contests</h2>\n<p>From time-to-time our site requests infor­ma­tion from users via sur­veys or con­tests. Par­tic­i­pa­tion in these sur­veys or con­tests is com­plete­ly vol­un­tary and the user has a choice whether or not to dis­close this infor­ma­tion. The request­ed infor­ma­tion typ­i­cal­ly includes con­tact infor­ma­tion (such as name and email address), and busi­ness infor­ma­tion. Con­tact infor­ma­tion will be used to noti­fy the win­ners and award prizes. Sur­vey infor­ma­tion will be used for pur­pos­es of mon­i­tor­ing or improv­ing the use and sat­is­fac­tion of this site. Users’ per­son­al­ly iden­ti­fi­able infor­ma­tion is not shared with third parties.</p>',NULL,NULL,NULL,NULL),(11,13,1,'Terms and Conditions','2018-11-22 15:01:35','2018-11-22 15:39:16','3abac1e9-e1f7-4cfb-b336-fafac51fbee6',NULL,NULL,NULL,NULL,NULL,'<p>These terms and conditions apply to any booking to attend our events.</p>\n<p>We draw your attention to clause 6, which contains a limitation of our liability, and clause 9.2, which contains an indemnity in respect of your data protection obligations.</p>\n<h2>1. INTRODUCTION</h2>\n<p>1.1 The event is organised and managed by Clearleft Limited, a company registered in England and Wales with registration number 05466565 The Old Casino, 28 Fourth Avenue, Hove, BN3 2PJ.</p>\n<p>1.2 References to “us” means Clearleft Limited and references to “we” and “our” shall be construed accordingly. Reference to “you” means the entity completing a booking request and references to “your” shall be construed accordingly.</p>\n<p>1.3 All applications to register for the event, and all orders to purchase the relevant documentation pack, are made subject to these terms &amp; conditions (which shall apply to the exclusion of any terms you attempt to be incorporate into our agreement with you).</p>\n<p>1.4 You acknowledge and accept that we have the right to publicly announce our business relationship with you which shall include but not be limited to announcements on social media. Such announcements shall not be disparaging or otherwise adverse to your business.</p>\n<h2>2. BOOKINGS</h2>\n<p>2.1 All applications to register for the event are subject to availability and full payment being received by us.</p>\n<p>2.2 Delegate passes issued for the event are valid for the named attendee only and, subject to clause 4.2 below, cannot be transferred to any other person. Delegates may be asked for a valid photographic ID during the event. If valid photographic ID is not produced or is produced and does not, in our reasonable opinion, match the delegate pass we shall have the discretion to require the delegate to leave the event and, if exercised, the delegate must leave the event and premises the event is held at.</p>\n<h2>3. PRICES AND PAYMENT</h2>\n<p>3.1 The prices for attending the event, are set out on the relevant registration booking form or on our website You may also obtain prices from us on request. Prices may be subject to change from time to time.</p>\n<p>3.2 If you apply to register for the event less than two (2) weeks before the date of the event we will only accept payment by a credit card, unless we expressly agree otherwise in writing. If for any reason we have not received payment in full prior to the date of the event you (or the attending delegate) will be asked as a condition of being permitted to attend the event to provide payment by credit card on the day of the event. We reserve the right to cancel your booking at any time and refuse entry if full payment has not been received.</p>\n<p>3.3 You acknowledge and accept that If payment is not made in accordance with this Clause 3, interest on the overdue balances (including any period after the date of any judgment or decree against the Customer), and late payment fees, fall due and payable and are calculated upon the basis set out in the Late Payment of Commercial Debts (Interest) Act 1998 (as amended).</p>\n<h2>4. CHANGES TO THE EVENT AND CANCELLATIONS</h2>\n<p>4.1 It may be necessary for reasons beyond our reasonable control to alter the advertised content, timing and/or location of the event or the advertised speakers. We reserve the right to do this at any time. Where we alter the date and/or location of the event, we will provide you with notice of the same and will offer you the choice of either: (a) credit for a future event of your choice (up to the value of sums paid by you in respect of the event) to be used within 12 months of the alteration notice; or (b) the opportunity to attend the event as varied.</p>\n<p>4.2 If a delegate is unable to attend the event we welcome a substitute delegate attending at no extra cost provided that we have at least two (2) days’ prior notice of the name of your proposed substitute and payment has been received in full. Please notify us of any substitutions by email at <a href=\"mailto:alis@clearleft.com\">alis@clearleft.com</a>.</p>\n<p>4.3 We ask that you notify us if a delegate cannot attend the event. If you would like to make a cancellation in respect of a booking, no refunds will be given except in accordance with this clause.</p>\n<p>You may cancel a booking only by sending an email to alis@clearleft.com clearly identifying the event, the number of delegates and the delegate names the cancellation is in respect of. If we receive a valid cancellation email:</p>\n<p>4.3.1 more than two (2) months prior to the planned date of the event, a 50% refund will be issued;</p>\n<p>4.3.2 between two (2) months and one (1) month prior to the planned date of the event, a 25% refund will be issued; and</p>\n<p>4.3.3 less than one (1) month prior to the planned date of the event, no refund will be given.</p>\n<p>4.4 Any refund due under clause 4.3 shall be paid within 28 days of receipt of the cancellation notice.</p>\n<p>4.5 We shall not be liable to you for travel, accommodation or other costs and expenses incurred (included wasted costs and expenses) if we are required to cancel or relocate the event as a result of an event outside our reasonable control (including, without limitation, to acts of God, floods, lightning, storm, fire, explosion, war, military operations, acts or threats of terrorism, strike action, lock-outs or other industrial action or a pandemic, epidemic or other widespread illness).</p>\n<p>4.6 You have no right to cancel a booking except in accordance with this clause 4.</p>\n<h2>5. CONTENT</h2>\n<p>5.1 All rights in all presentations, documentation and materials published or otherwise made available as part of the event (including but not limited to any documentation packs or audio or audio-visual recording of the event) (“Content”) are owned by us or are included with the permission of the owner of the rights. No (i) photography, filming or recording; or (ii) republication, broadcast or other dissemination of the Content is permitted. You shall not distribute, reproduce, modify, store, transfer or in any other way use any of the Content (save that use by the relevant delegate for internal business purposes shall be permitted), and in particular (but without limitation) you shall not (and shall procure that each of your delegates shall not):</p>\n<p>5.1.1 upload any Content into any shared system;</p>\n<p>5.1.2 include any Content in a database;</p>\n<p>5.1.3 include any Content in a website or on any intranet;</p>\n<p>5.1.4 transmit, re-circulate or otherwise make available any Content to anyone else;</p>\n<p>5.1.5 make any commercial use of the Content whatsoever; or</p>\n<p>5.1.6 use Content in any way that might infringe third party rights or that may bring us or any of our affiliates into disrepute.</p>\n<p>5.2 The Content does not necessarily reflect our views or opinions.</p>\n<p>5.3 Suggestions or advice contained in the Content should not be relied upon in place of professional or other advice. Whilst we take reasonable care to ensure that the Content created by us is accurate and complete, some of it is supplied by third parties and we are unable to check its accuracy or completeness. You should verify the accuracy of any information (whether supplied by us or third parties) before relying on it. The Content is provided on an “as is” basis without any warranties of any kind (express or implied). We hereby exclude to the fullest extent permitted by law all liabilities, costs, claims, damages, losses and/or expenses arising from any inaccuracy or omission in the Content or arising from any infringing, defamatory or otherwise unlawful material in the Content.</p>\n<p>5.4 To the extent that any Content is made available by us online or in any other way other than physical hard copy form we reserve the right to suspend or remove access to such Content at any time.</p>\n<h2>6. LIABILITY</h2>\n<p>6.1 Subject to Clause 6.4, our aggregate liability to you, whether such liability arises in contract, tort (including negligence) or otherwise, for any damages, loss, costs, claims or expenses of any kind howsoever arising, out of in connection with any booking (or requested booking) made by you or otherwise in relation to a event, shall be limited to the price paid by you in respect of your booking to attend the event.</p>\n<p>6.2 Subject to Clause 6.4, we shall not be liable to you for: (i) any loss of profit, loss of or damage to data, loss of anticipated savings or interest, loss of or damage to reputation or goodwill; or (ii) any indirect, special or consequential damages, loss, costs, claims or expenses of any kind.</p>\n<p>6.3 You agree to indemnify us, our staff and our affiliates and to hold us harmless to the fullest extent permitted by law, against all loss, costs, claims or expenses of any kind arising from any act or omission by you (including your delegates) during or otherwise in relation to an event.</p>\n<p>6.4 Nothing in this these Terms and Conditions shall limit or exclude a party\'s liability for:</p>\n<p>6.4.1 death or personal injury caused by its negligence, or the negligence of its employees, agents or subcontractors;</p>\n<p>6.4.2 fraud or fraudulent misrepresentation; or</p>\n<p>6.4.3 any other liability which cannot be limited or excluded by applicable law.</p>\n<h2>7. GENERAL</h2>\n<p>7.1 These terms and conditions (together with any documents referred to herein or required to be entered into pursuant to these terms and conditions) contain the entire agreement and understanding between us and supersede all prior agreements, understandings or arrangements (both oral and written) relating to the subject matter of these terms and conditions and any such document.</p>\n<p>7.2 You acknowledge that in registering a delegate place you have not relied on, and shall have no remedy in respect of, any statement, representation, warranty, understanding, promise or assurance (whether negligently or innocently made) of any person other than as expressly set out in these terms and conditions.</p>\n<p>7.3 Clearleft Limited is part of an enlarged group which pledges to trade legally and respect all laws including the trade sanctions imposed by EU and US Governments. We operate a group sanctions policy which means that we cannot allow attendees at our events or awards to be based, residing or connected with a country or organisation subject to EU and/or US Government sanctions and we reserve the right to refuse bookings from or entry to any such persons or organisations.</p>\n<p>7.4 These terms and conditions shall not create, nor shall they be construed as creating, any partnership or agency relationship between us.</p>\n<p>7.5 You accept that communication with us may be electronic. We may contact you by e-mail or provide you with information by posting notices on our website. You agree to this electronic means of communication and you acknowledge that all such communications that we provide to you electronically comply with any legal or contractual requirement that such communication be made in writing.</p>\n<p>7.6 Save as set out in Clause 4.2 you are not permitted to re-sell, transfer, assign or otherwise dispose of any of your rights or obligations arising under these terms and conditions.</p>\n<p>7.7 These terms and conditions and the rights and obligations of both parties shall be governed by, and construed in accordance with, the laws of England and Wales and both parties irrevocably agree to submit to the exclusive jurisdiction of the courts of England and Wales in respect of any dispute which arises hereunder.</p>\n<p>7.8 A contract formed under these terms shall terminate at the later of: (a) the end of the event (as reasonably determined by us) or (b) on completion of all your obligations under the contract.</p>\n<h2>8. CONSUMER RIGHTS</h2>\n<p>8.1 If you are booking to attend an event and are a consumer within the definition in the Consumer Rights Act 2015 or under other applicable consumer protection laws, nothing in these terms shall exclude or limit any consumer rights that cannot be excluded or limited by law.</p>\n<h2>9. DATA PROTECTION AND PRIVACY POLICY</h2>\n<p>9.1 We are the Data Controller for the purposes of the Data Protection Act 2018 and the General Data Protection Regulation (Regulation (EU) 2016/679)) (“GDPR”).</p>\n<p>9.2 By making a booking and providing any delegate personal data (as defined in the GDPR) to us, you warrant that: (i) you have a lawful basis for processing the personal data, including (where applicable) fully-informed consent (as defined in the GDPR) and notices in place to enable lawful transfer of the data to us; (ii) you have brought our privacy policy to the attention of each delegate you are booking to attend an event; and (iii) agree to fully indemnify us for any and all loss suffered in connection with a breach of your obligations under this clause 9.2.</p>\n<p>9.3 If making a booking to attend the event yourself, you acknowledge that we may process your personal data in accordance with our <a href=\"{entry:12:url}\">privacy policy</a>.</p>',NULL,NULL,NULL,NULL),(12,14,1,'Accessibility','2018-11-22 15:02:01','2018-11-22 15:39:16','5bbd5805-ad46-4b47-b9b3-b9b6f9642d90',NULL,NULL,NULL,NULL,NULL,'<p>The Clearleft Retreats web­site has been designed and built to be acces­si­ble to as wide an audi­ence as pos­si­ble. Some peo­ple with dis­abil­i­ties find using the web dif­fi­cult and while we know that it is impos­si­ble to design a site that every­one can use, if you have prob­lems using our site, please let us know and we will do our utmost to help.</p>\n<h2>Retreat accessibility</h2>\n<p>We aim to chose venues to ensure full access for peo­ple with a wide range of dis­abil­i­ties from wheel­chair users to those with sen­so­ry and learn­ing difficulties.</p>\n<p>Please do let us know in plenty of time if you require help with accessibility.</p>',NULL,NULL,NULL,NULL),(13,15,1,'Code of Conduct','2018-11-22 15:02:54','2018-11-22 15:39:16','9034b4f7-f26e-4db4-a583-e536d8da9792',NULL,NULL,NULL,NULL,NULL,'<p>Clearleft Retreats are inclu­sive events based on treat­ing all indi­vid­u­als respect­ful­ly, regard­less of gen­der, sex­u­al ori­en­ta­tion, age, dis­abil­i­ty, eth­nic­i­ty, reli­gion (or lack there­of), or soft­ware pref­er­ences. So please don’t be nasty or mean. Be nice. Be con­sid­er­ate. Be civ­il. It’s easy.</p>\n<p>If you are being harassed, notice that some­one else is being harassed, or have any oth­er con­cerns, please con­tact a mem­ber of Clearleft staff.</p>\n<p>Harass­ment includes offen­sive ver­bal com­ments relat­ed to gen­der, age, sex­u­al ori­en­ta­tion, dis­abil­i­ty, phys­i­cal appear­ance, body size, race, reli­gion, sex­u­al images in pub­lic spaces, delib­er­ate intim­i­da­tion, stalk­ing, fol­low­ing, harass­ing pho­tog­ra­phy or record­ing,, inap­pro­pri­ate phys­i­cal con­tact, and unwel­come sex­u­al attention.</p>\n<p>Par­tic­i­pants asked to stop any harass­ing behav­ior must imme­di­ate­ly com­ply. If a par­tic­i­pant engages in any of the afore­men­tioned behav­ior, we may take any action we deem appro­pri­ate, from warn­ing the offend­er to imme­di­ate­ly expelling the offend­er with no refund.</p>\n<p>This doc­u­ment is based on <a href=\"http://confcodeofconduct.com/\">code​of​con​duct​.com</a>, licensed under a <a href=\"http://creativecommons.org/licenses/by/3.0/deed.en_US\">Cre­ative Com­mons Attri­bu­tion 3.0 Unport­ed License</a>.</p>',NULL,NULL,NULL,NULL),(14,16,1,NULL,'2018-11-22 15:03:36','2018-11-22 15:36:28','78a40ee7-5478-4553-8266-764b097392aa',NULL,NULL,NULL,NULL,NULL,NULL,'alis@clearleft.com',NULL,NULL,NULL),(15,19,1,NULL,'2018-11-23 10:50:32','2018-11-25 10:41:10','11f1bd7e-5886-4454-b48d-01c54d0c1892',NULL,NULL,'By the end of this retreat',NULL,NULL,NULL,NULL,NULL,'muted',NULL),(16,20,1,NULL,'2018-11-23 10:50:32','2018-11-25 10:41:10','bf9b0547-86e7-4200-8892-e27495350574',NULL,NULL,NULL,NULL,'<p>You’ll return to your work refreshed, inspired with increased energy and resilience, buoyed by your deeper connection to this community of design leaders. Hopefully having formed connections that will be long-lasting throughout your career.</p>',NULL,NULL,NULL,NULL,NULL),(17,21,1,NULL,'2018-11-23 11:21:21','2018-11-25 10:41:10','ee684799-3f5d-4589-a04a-6bbb9c2a5c73',NULL,NULL,NULL,'Why the rectory in the Cotswolds?',NULL,NULL,NULL,NULL,NULL,NULL),(18,22,1,NULL,'2018-11-23 11:21:21','2018-11-25 10:41:10','008ebe6e-4c85-4f7e-926e-6e569841c6c2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,24,1,'Cotswolds masthead','2018-11-23 16:39:22','2018-11-23 16:41:00','81aef419-c35b-470f-bf59-fa652e353422',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,25,1,'Cotswolds house','2018-11-23 16:41:41','2018-11-23 16:45:30','e27b9a29-1481-4351-bdff-9afcb5b519f1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Flower filled garden of a country house on a sunny day.'),(21,26,1,'Cotswolds room','2018-11-23 16:41:48','2018-11-23 16:46:05','4e1af0ce-f5df-44ba-9fdb-c537bbeb38db',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Elegant living room with fireplace, light shining in the window onto the dusky blue interior.'),(22,27,1,'Cotswolds contemplating','2018-11-23 16:41:58','2018-11-23 16:44:59','95bafa74-85d3-4c43-9439-57333d81337c',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'A group of professionals contemplating something out of frame.'),(23,28,1,'Cotswolds chatting','2018-11-23 16:42:03','2018-11-23 16:44:30','735c2b53-b495-4759-b3e7-0b6899c07a66',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Two men sitting on a wooden veranda in a forest, smiling and chatting.'),(24,29,1,'Cotswolds chairs','2018-11-23 16:42:15','2018-11-23 16:43:40','9a150344-403f-48ad-b40d-a82b354ad89c',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Two inviting chairs with a cafetiere and plates laid out on the table between them'),(25,30,1,'Cotswolds writing','2018-11-23 16:48:31','2018-11-25 10:28:12','a1e7802c-0e1b-4df5-8e45-09bd92af0664',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'A couple of men taking notes outside on a mossy rock.'),(26,31,1,'Cotswolds walking','2018-11-23 16:50:07','2018-11-25 10:28:26','fe9cf0ff-9f6c-4f36-8726-8e334cbfc0d3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'A friendly group walking along a road with beautiful scenery, one man is pulling a silly face.'),(27,32,1,NULL,'2018-11-23 16:53:44','2018-11-25 10:41:10','07905305-228d-448f-b2bf-6e0949edbf55',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(28,34,1,NULL,'2018-11-23 16:53:44','2018-11-25 10:41:10','7fa4f033-9267-45f2-b531-7b498cd51098',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(30,37,1,NULL,'2018-11-23 16:53:44','2018-11-25 10:41:10','6d3d3acd-c81f-4145-80d0-de0d71c792f7',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(32,40,1,NULL,'2018-11-23 16:53:44','2018-11-25 10:41:10','ab95bb83-8128-4a6d-a022-6758957a5da1',NULL,NULL,'Ticket information',NULL,NULL,NULL,NULL,NULL,'muted',NULL),(33,41,1,NULL,'2018-11-23 16:53:44','2018-11-25 10:41:10','43c6ed0b-03f2-4812-a6c6-ef0b13f93e09',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(34,43,1,'Invision','2018-11-23 18:23:43','2018-11-23 18:23:43','3fa8c798-43af-46a3-80c6-5e255a1abf08',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(35,45,1,NULL,'2018-11-23 18:56:42','2018-11-25 10:41:10','806a54a8-6492-4992-9a90-7e2103ee0008',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(36,46,1,NULL,'2018-11-23 18:56:42','2018-11-25 10:41:10','0e8ecd92-0caa-4f58-a413-b3bc91ad7660',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `craftidtokens`
--

DROP TABLE IF EXISTS `craftidtokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `craftidtokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `accessToken` text NOT NULL,
  `expiryDate` datetime DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `craftidtokens_userId_fk` (`userId`),
  CONSTRAINT `craftidtokens_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `craftidtokens`
--

LOCK TABLES `craftidtokens` WRITE;
/*!40000 ALTER TABLE `craftidtokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `craftidtokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deprecationerrors`
--

DROP TABLE IF EXISTS `deprecationerrors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deprecationerrors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `fingerprint` varchar(255) NOT NULL,
  `lastOccurrence` datetime NOT NULL,
  `file` varchar(255) NOT NULL,
  `line` smallint(6) unsigned DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `traces` text,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `deprecationerrors_key_fingerprint_unq_idx` (`key`,`fingerprint`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deprecationerrors`
--

LOCK TABLES `deprecationerrors` WRITE;
/*!40000 ALTER TABLE `deprecationerrors` DISABLE KEYS */;
/*!40000 ALTER TABLE `deprecationerrors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `elementindexsettings`
--

DROP TABLE IF EXISTS `elementindexsettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `elementindexsettings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `settings` text,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `elementindexsettings_type_unq_idx` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `elementindexsettings`
--

LOCK TABLES `elementindexsettings` WRITE;
/*!40000 ALTER TABLE `elementindexsettings` DISABLE KEYS */;
INSERT INTO `elementindexsettings` VALUES (1,'craft\\elements\\Entry','{\"sources\":{\"section:3\":{\"tableAttributes\":{\"1\":\"link\"}},\"section:2\":{\"tableAttributes\":{\"1\":\"link\"}}}}','2018-11-22 14:56:18','2018-11-22 14:56:18','b635988f-e25e-481a-a5aa-85f714a2e364');
/*!40000 ALTER TABLE `elementindexsettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `elements`
--

DROP TABLE IF EXISTS `elements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `elements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fieldLayoutId` int(11) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `archived` tinyint(1) NOT NULL DEFAULT '0',
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `elements_fieldLayoutId_idx` (`fieldLayoutId`),
  KEY `elements_type_idx` (`type`),
  KEY `elements_enabled_idx` (`enabled`),
  KEY `elements_archived_dateCreated_idx` (`archived`,`dateCreated`),
  CONSTRAINT `elements_fieldLayoutId_fk` FOREIGN KEY (`fieldLayoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `elements`
--

LOCK TABLES `elements` WRITE;
/*!40000 ALTER TABLE `elements` DISABLE KEYS */;
INSERT INTO `elements` VALUES (1,NULL,'craft\\elements\\User',1,0,'2018-11-07 16:34:56','2018-11-07 16:34:56','eeb5d712-adff-4853-ba6a-8c5ddfbe6381'),(3,5,'craft\\elements\\Entry',1,0,'2018-11-08 16:50:20','2018-11-25 10:41:09','de258aaf-e042-486f-88ad-f0614d0534e5'),(4,27,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2018-11-22 13:53:47','2018-11-25 10:41:09','e3cb5034-a1a0-49fe-a2c7-81e197f4f4d0'),(5,143,'benf\\neo\\elements\\Block',1,0,'2018-11-22 13:53:47','2018-11-25 10:41:10','d1de49e1-8673-4033-a445-8bc8196d4a9f'),(6,144,'benf\\neo\\elements\\Block',1,0,'2018-11-22 13:53:47','2018-11-25 10:41:10','586722f6-f5a0-4419-bfb0-27b33b9e367e'),(7,143,'benf\\neo\\elements\\Block',1,0,'2018-11-22 13:53:47','2018-11-25 10:41:10','dbc232b6-81b3-401c-9041-dad371d01b11'),(8,146,'benf\\neo\\elements\\Block',1,0,'2018-11-22 13:53:47','2018-11-25 10:41:10','24d355dc-2fb9-40ed-9784-9dd6fc1c2aa9'),(9,33,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2018-11-22 13:53:47','2018-11-25 10:41:10','f5e62511-fa93-4c43-8d9a-0fdb5bb09831'),(10,89,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2018-11-22 14:45:32','2018-11-25 10:41:09','17dfbb9a-01be-49f8-ab69-4e30186aaf2b'),(11,90,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2018-11-22 14:45:32','2018-11-25 10:41:10','8552c5a7-1e63-4009-a75b-5aec6238eca5'),(12,91,'craft\\elements\\Entry',1,0,'2018-11-22 14:57:20','2018-11-22 15:39:16','3c707895-fd86-458f-802d-7df02190e8e2'),(13,91,'craft\\elements\\Entry',1,0,'2018-11-22 15:01:35','2018-11-22 15:39:16','f27338b2-a220-44bf-8b74-659ac4b1cd44'),(14,91,'craft\\elements\\Entry',1,0,'2018-11-22 15:02:01','2018-11-22 15:39:16','812b5792-2a47-4580-a74e-ac5f13394489'),(15,91,'craft\\elements\\Entry',1,0,'2018-11-22 15:02:54','2018-11-22 15:39:16','feab003a-e6ff-46c9-a1fd-bbd80840b49a'),(16,92,'craft\\elements\\GlobalSet',1,0,'2018-11-22 15:03:36','2018-11-22 15:36:28','1e1c95d3-111a-407c-b96b-4a8c9e97b37a'),(17,93,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2018-11-22 16:17:35','2018-11-25 10:41:10','db824e35-bb81-4541-a7c8-92aae4a316d2'),(18,94,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2018-11-22 16:48:36','2018-11-25 10:41:10','e6a0f87e-13aa-40a3-b1e3-cf9c198bf609'),(19,143,'benf\\neo\\elements\\Block',1,0,'2018-11-23 10:50:32','2018-11-25 10:41:10','0be511b9-5423-45c8-8022-b7effccfab30'),(20,144,'benf\\neo\\elements\\Block',1,0,'2018-11-23 10:50:32','2018-11-25 10:41:10','9814a8d3-b860-4df4-ae9c-42f9792d33b8'),(21,145,'benf\\neo\\elements\\Block',1,0,'2018-11-23 11:21:21','2018-11-25 10:41:10','f661a49a-918a-418b-abd5-16cf22fb371d'),(22,147,'benf\\neo\\elements\\Block',1,0,'2018-11-23 11:21:21','2018-11-25 10:41:10','65850ef0-d0a8-41c8-bba6-87de1b53dc39'),(23,59,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2018-11-23 11:21:21','2018-11-25 10:41:10','f078d859-4caf-4715-9986-85ab417830b9'),(24,116,'craft\\elements\\Asset',1,0,'2018-11-23 16:39:22','2018-11-23 16:41:00','01f706bd-bcbc-45d8-9cf2-375d1d973fca'),(25,116,'craft\\elements\\Asset',1,0,'2018-11-23 16:41:41','2018-11-23 16:45:30','85f3b1db-d941-4821-a549-6d428d4d5aac'),(26,116,'craft\\elements\\Asset',1,0,'2018-11-23 16:41:48','2018-11-23 16:46:05','8e0a9411-ad2a-487c-8caf-a5ca3313c0b5'),(27,116,'craft\\elements\\Asset',1,0,'2018-11-23 16:41:58','2018-11-23 16:44:59','7660f7d9-1cae-4ebc-a362-3602316a48d1'),(28,116,'craft\\elements\\Asset',1,0,'2018-11-23 16:42:03','2018-11-23 16:44:30','f98b1d40-c6a3-439b-b5fc-0d2ae1bfb5f5'),(29,116,'craft\\elements\\Asset',1,0,'2018-11-23 16:42:15','2018-11-23 16:43:40','0729f940-b8af-419b-b51b-bd1af9441ef0'),(30,116,'craft\\elements\\Asset',1,0,'2018-11-23 16:48:31','2018-11-25 10:28:12','ba6d08ef-64ff-4537-a574-52e851d3da9a'),(31,116,'craft\\elements\\Asset',1,0,'2018-11-23 16:50:07','2018-11-25 10:28:26','c1ba9daa-cafc-423a-9f78-351d65a7e64c'),(32,148,'benf\\neo\\elements\\Block',1,0,'2018-11-23 16:53:44','2018-11-25 10:41:10','80927b29-c130-4555-b43e-12c8a4bf4b01'),(33,74,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2018-11-23 16:53:44','2018-11-25 10:41:10','526f3e39-52d8-4f45-aa71-84156f2935d7'),(34,148,'benf\\neo\\elements\\Block',1,0,'2018-11-23 16:53:44','2018-11-25 10:41:10','ed4618b1-412d-4e21-9c61-a214122d95cc'),(35,74,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2018-11-23 16:53:44','2018-11-25 10:41:10','78c0a13e-e17e-4124-b5e4-c5155cada9ea'),(37,146,'benf\\neo\\elements\\Block',1,0,'2018-11-23 16:53:44','2018-11-25 10:41:10','52efe582-7dd8-4ecf-bcac-e639ade29c6e'),(38,33,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2018-11-23 16:53:44','2018-11-25 10:41:10','73453e9d-3c37-49ed-bae8-19268e36f163'),(40,143,'benf\\neo\\elements\\Block',1,0,'2018-11-23 16:53:44','2018-11-25 10:41:10','5a199907-b44d-4da8-9876-20df9b681dd0'),(41,146,'benf\\neo\\elements\\Block',1,0,'2018-11-23 16:53:44','2018-11-25 10:41:10','f7b12787-fc0b-4a85-b7ab-88e8549bef9a'),(42,33,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2018-11-23 16:53:44','2018-11-25 10:41:10','b9cacf29-5a63-46c5-83d7-dc74786be23c'),(43,116,'craft\\elements\\Asset',1,0,'2018-11-23 18:23:43','2018-11-23 18:23:43','55d6394d-44a4-4d9f-8ce3-597f35ab2d00'),(44,117,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2018-11-23 18:24:20','2018-11-25 10:41:10','c938843b-6c92-4c58-916d-a9ddd0ba4bd5'),(45,149,'benf\\neo\\elements\\Block',1,0,'2018-11-23 18:56:42','2018-11-25 10:41:10','0a59709e-9d87-46a0-9748-e6a73eb6f5d0'),(46,149,'benf\\neo\\elements\\Block',1,0,'2018-11-23 18:56:42','2018-11-25 10:41:10','49381d84-c040-448d-9ac0-a84cbb698f12'),(47,155,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2018-11-25 10:27:00','2018-11-25 10:41:10','4971b4c6-b766-476a-a1d3-7341c4b094d1'),(48,152,'craft\\elements\\MatrixBlock',1,0,'2018-11-25 10:27:00','2018-11-25 10:41:10','03399491-2d66-491d-9dfd-6ad87da93fd6'),(49,154,'craft\\elements\\MatrixBlock',1,0,'2018-11-25 10:27:00','2018-11-25 10:41:10','857d9db8-a668-44d2-838e-412903cd7fb1'),(50,156,'craft\\elements\\MatrixBlock',1,0,'2018-11-25 10:41:10','2018-11-25 10:41:10','9dcb04c1-240a-4558-a254-09ec1f683ed5'),(51,155,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2018-11-25 10:41:10','2018-11-25 10:41:10','0630c7bd-7680-466e-aa1e-9a8fd92cdfa3'),(52,152,'craft\\elements\\MatrixBlock',1,0,'2018-11-25 10:41:10','2018-11-25 10:41:10','c85a1fda-1963-4d61-9a52-3f93015696a0'),(53,158,'craft\\elements\\MatrixBlock',1,0,'2018-11-25 10:41:10','2018-11-25 10:41:10','b994c464-78d9-4b97-94cb-46c91de95313'),(54,156,'craft\\elements\\MatrixBlock',1,0,'2018-11-25 10:41:10','2018-11-25 10:41:10','e5d160f8-6799-4335-9f8d-7957e22175ca'),(55,155,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2018-11-25 10:41:10','2018-11-25 10:41:10','60ac4529-b2fd-40bc-b01f-94610022d309'),(56,157,'craft\\elements\\MatrixBlock',1,0,'2018-11-25 10:41:10','2018-11-25 10:41:10','c729c467-b0fb-4c6d-9a64-b6ac188c1b8f'),(57,155,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2018-11-25 10:41:10','2018-11-25 10:41:10','076fc330-f944-4787-93c1-8b8cc8600cf7'),(58,152,'craft\\elements\\MatrixBlock',1,0,'2018-11-25 10:41:10','2018-11-25 10:41:10','074e9199-e2e2-43ac-a703-c6faaa7df747'),(59,154,'craft\\elements\\MatrixBlock',1,0,'2018-11-25 10:41:10','2018-11-25 10:41:10','93605360-6338-47d1-a24a-1c72c99e5a25'),(60,158,'craft\\elements\\MatrixBlock',1,0,'2018-11-25 10:41:10','2018-11-25 10:41:10','3542ac63-42c6-4e6d-a2f9-4a4594b70eb4'),(61,153,'craft\\elements\\MatrixBlock',1,0,'2018-11-25 10:41:10','2018-11-25 10:41:10','23ff9b83-5488-45d8-b643-f592788ac690'),(62,159,'craft\\elements\\MatrixBlock',1,0,'2018-11-25 10:41:10','2018-11-25 10:41:10','de855dd0-b964-425b-9d98-3a526a5ebb69'),(63,155,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2018-11-25 10:41:10','2018-11-25 10:41:10','405bba98-abfa-4915-8aed-fb3a825cd671'),(64,157,'craft\\elements\\MatrixBlock',1,0,'2018-11-25 10:41:10','2018-11-25 10:41:10','31a27af1-d106-43e3-b925-8178af57f4f6'),(65,155,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2018-11-25 10:41:10','2018-11-25 10:41:10','c648bca5-7f58-4fd7-9b69-64c812ec046b'),(66,152,'craft\\elements\\MatrixBlock',1,0,'2018-11-25 10:41:10','2018-11-25 10:41:10','a0534c4f-d968-4436-811e-27e026278e1c'),(67,158,'craft\\elements\\MatrixBlock',1,0,'2018-11-25 10:41:10','2018-11-25 10:41:10','dbbe84cf-fbdd-44b2-b220-454e0ca4ab68');
/*!40000 ALTER TABLE `elements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `elements_sites`
--

DROP TABLE IF EXISTS `elements_sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `elements_sites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elementId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `uri` varchar(255) DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `elements_sites_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `elements_sites_siteId_idx` (`siteId`),
  KEY `elements_sites_slug_siteId_idx` (`slug`,`siteId`),
  KEY `elements_sites_enabled_idx` (`enabled`),
  KEY `elements_sites_uri_siteId_idx` (`uri`,`siteId`),
  CONSTRAINT `elements_sites_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `elements_sites_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `elements_sites`
--

LOCK TABLES `elements_sites` WRITE;
/*!40000 ALTER TABLE `elements_sites` DISABLE KEYS */;
INSERT INTO `elements_sites` VALUES (1,1,1,NULL,NULL,1,'2018-11-07 16:34:56','2018-11-07 16:34:56','f36e83c0-7148-411d-8cd6-52d417eae48e'),(5,3,1,'cotswolds','cotswolds',1,'2018-11-08 16:50:20','2018-11-25 10:41:09','e90876d5-2ee7-44db-b8a3-b0bde6a28652'),(6,4,1,NULL,NULL,1,'2018-11-22 13:53:47','2018-11-25 10:41:09','032e63b4-665c-4061-b630-4fac218c99ce'),(7,5,1,NULL,NULL,1,'2018-11-22 13:53:47','2018-11-25 10:41:10','08ccceea-cc90-4595-ad54-a2d91c70084a'),(8,6,1,NULL,NULL,1,'2018-11-22 13:53:47','2018-11-25 10:41:10','d413b91e-c240-41fd-afcc-b44a3c0b8c23'),(9,7,1,NULL,NULL,1,'2018-11-22 13:53:47','2018-11-25 10:41:10','12e99837-bf10-4060-8740-fcc2b00c9286'),(10,8,1,NULL,NULL,1,'2018-11-22 13:53:47','2018-11-25 10:41:10','8264d76f-b539-4485-a737-140012be0ba1'),(11,9,1,NULL,NULL,1,'2018-11-22 13:53:47','2018-11-25 10:41:10','987c529b-e248-41ad-b7e1-385f33a69e00'),(12,10,1,NULL,NULL,1,'2018-11-22 14:45:32','2018-11-25 10:41:09','e9255d02-5a0f-437c-bd74-1cae79f99094'),(13,11,1,NULL,NULL,1,'2018-11-22 14:45:32','2018-11-25 10:41:10','2c0d4b79-3a6a-4fde-8ead-b41e3fae3e47'),(14,12,1,'privacy','privacy',1,'2018-11-22 14:57:20','2018-11-22 15:39:16','34dcc864-9f8c-43da-927b-a3b64df7a17b'),(15,13,1,'terms','terms',1,'2018-11-22 15:01:35','2018-11-22 15:39:16','3f86952f-9adc-4717-9ff5-c9b7d88ce546'),(16,14,1,'accessibility','accessibility',1,'2018-11-22 15:02:01','2018-11-22 15:39:16','74dc1ecf-b8ad-472d-864e-6fea42c9c489'),(17,15,1,'code-of-conduct','code-of-conduct',1,'2018-11-22 15:02:54','2018-11-22 15:39:16','cb9ef134-be1e-474b-b49c-19927e56dfdf'),(18,16,1,NULL,NULL,1,'2018-11-22 15:03:36','2018-11-22 15:36:28','5e7586ba-30ff-4419-92c0-5d5815ab96fd'),(19,17,1,NULL,NULL,1,'2018-11-22 16:17:35','2018-11-25 10:41:10','100f5dbe-8393-4a2e-ae6b-a78493a3e815'),(20,18,1,NULL,NULL,1,'2018-11-22 16:48:36','2018-11-25 10:41:10','ffc946ee-75a6-4cb1-b195-53c7cbbd444a'),(21,19,1,NULL,NULL,1,'2018-11-23 10:50:32','2018-11-25 10:41:10','c4101003-0278-46e3-9e4c-bb1560ce0168'),(22,20,1,NULL,NULL,1,'2018-11-23 10:50:32','2018-11-25 10:41:10','d019c98d-66a6-4be7-849f-21aa8a837e08'),(23,21,1,NULL,NULL,1,'2018-11-23 11:21:21','2018-11-25 10:41:10','7ddb66e7-bbdd-4c1a-af16-c43bd6c34af4'),(24,22,1,NULL,NULL,1,'2018-11-23 11:21:21','2018-11-25 10:41:10','682580e0-590a-47db-a080-2ccc588d377d'),(25,23,1,NULL,NULL,1,'2018-11-23 11:21:21','2018-11-25 10:41:10','f648a583-8fe3-44a9-8239-f926c0ba7bcc'),(26,24,1,NULL,NULL,1,'2018-11-23 16:39:22','2018-11-23 16:41:00','a8209f76-6782-46be-b007-b6949b1906f7'),(27,25,1,NULL,NULL,1,'2018-11-23 16:41:41','2018-11-23 16:45:30','8afcc917-fca9-4867-bf52-840aaa127c40'),(28,26,1,NULL,NULL,1,'2018-11-23 16:41:48','2018-11-23 16:46:05','9fe17380-583b-4e8d-a06e-32adb20e8b56'),(29,27,1,NULL,NULL,1,'2018-11-23 16:41:58','2018-11-23 16:44:59','9c880e8d-e622-483a-9cfd-8abb744378e2'),(30,28,1,NULL,NULL,1,'2018-11-23 16:42:03','2018-11-23 16:44:30','a7e6580d-a64b-466a-a31c-975e7a889b4d'),(31,29,1,NULL,NULL,1,'2018-11-23 16:42:15','2018-11-23 16:43:40','0e3e3b71-beee-4da3-883b-6523bde98367'),(32,30,1,NULL,NULL,1,'2018-11-23 16:48:31','2018-11-25 10:28:12','78ef10ed-0aff-47ca-b176-d7bdcd6ea241'),(33,31,1,NULL,NULL,1,'2018-11-23 16:50:07','2018-11-25 10:28:26','7595cf5d-823a-4ac9-b00c-2eefede7b6fd'),(34,32,1,NULL,NULL,1,'2018-11-23 16:53:44','2018-11-25 10:41:10','7a7fc117-5292-4ba2-a473-ef1e381e1a8b'),(35,33,1,NULL,NULL,1,'2018-11-23 16:53:44','2018-11-25 10:41:10','af1202ed-bdd7-44b1-a502-73d3667e3030'),(36,34,1,NULL,NULL,1,'2018-11-23 16:53:44','2018-11-25 10:41:10','7a1294e1-64a9-411c-a4c2-942139bfc239'),(37,35,1,NULL,NULL,1,'2018-11-23 16:53:44','2018-11-25 10:41:10','58898fc6-e5d5-453b-9bff-72053b0a9c21'),(39,37,1,NULL,NULL,1,'2018-11-23 16:53:44','2018-11-25 10:41:10','732a355d-5993-4cbd-9369-d1a4fed3313a'),(40,38,1,NULL,NULL,1,'2018-11-23 16:53:44','2018-11-25 10:41:10','d6fd7bb5-8137-43ab-aec0-903a1c6ab743'),(42,40,1,NULL,NULL,1,'2018-11-23 16:53:44','2018-11-25 10:41:10','999372ca-f044-42c6-a0cd-e275b25668ed'),(43,41,1,NULL,NULL,1,'2018-11-23 16:53:44','2018-11-25 10:41:10','bd940994-d446-4de6-a67c-6bada1cb19d6'),(44,42,1,NULL,NULL,1,'2018-11-23 16:53:44','2018-11-25 10:41:10','553c8f55-8d48-4b01-94c2-6027ec3d7ecc'),(45,43,1,NULL,NULL,1,'2018-11-23 18:23:43','2018-11-23 18:23:43','8231efcc-8a7d-4c66-863a-45141a9336aa'),(46,44,1,NULL,NULL,1,'2018-11-23 18:24:20','2018-11-25 10:41:10','f1216823-a460-4c07-a048-e0cca0511579'),(47,45,1,NULL,NULL,1,'2018-11-23 18:56:42','2018-11-25 10:41:10','93db5770-892a-4f5b-b47c-cf447cfa8c69'),(48,46,1,NULL,NULL,1,'2018-11-23 18:56:42','2018-11-25 10:41:10','efcc3c28-85ed-4321-befc-6bcd627f30dd'),(49,47,1,NULL,NULL,1,'2018-11-25 10:27:00','2018-11-25 10:41:10','3fd8a2af-3d4e-47d8-b17c-6815c4e71190'),(50,48,1,NULL,NULL,1,'2018-11-25 10:27:00','2018-11-25 10:41:10','ac39ec1d-21de-42b1-8e04-86a17d32439b'),(51,49,1,NULL,NULL,1,'2018-11-25 10:27:00','2018-11-25 10:41:10','f3ca892e-f3b1-4eca-8ff4-cba1525d257f'),(52,50,1,NULL,NULL,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','86d69388-0ccd-45be-bf51-327e48a84566'),(53,51,1,NULL,NULL,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','2d91ccdd-2eed-4e4d-8dec-cafe21e76336'),(54,52,1,NULL,NULL,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','ee8aebdf-3032-4dd5-97ac-7a09385b3b48'),(55,53,1,NULL,NULL,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','00142c27-5918-4bb7-810e-603773fbf858'),(56,54,1,NULL,NULL,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','d52ee349-748e-43fb-a364-1c1769c1e651'),(57,55,1,NULL,NULL,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','373332bc-15c0-40b2-a43a-e03d47470a3b'),(58,56,1,NULL,NULL,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','f295e3b8-1d80-4f37-b109-6cdeb0c5494b'),(59,57,1,NULL,NULL,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','dcf2ddd0-4517-46dc-b6c1-aa55766931f0'),(60,58,1,NULL,NULL,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','3ed61a88-127a-4542-828f-0b8a6f6998ea'),(61,59,1,NULL,NULL,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','549592f9-5213-45ea-a3c2-2277b463cd05'),(62,60,1,NULL,NULL,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','0c773b86-fd01-4b9e-8b5f-6af807e65a0b'),(63,61,1,NULL,NULL,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','5ceecb06-79dd-47a0-a4d8-5cf3bb7f1658'),(64,62,1,NULL,NULL,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','d5afa5db-ef19-46db-b2dd-88369f03d564'),(65,63,1,NULL,NULL,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','1465c079-a914-4edc-82df-67b00098d06b'),(66,64,1,NULL,NULL,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','92b10512-da66-4f6c-8401-b03e69cc15a2'),(67,65,1,NULL,NULL,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','bf854b36-cc0f-4749-bd33-38017fa62aa6'),(68,66,1,NULL,NULL,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','fb193e02-d033-44b5-a441-df424b8ff174'),(69,67,1,NULL,NULL,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','c48560d5-bbd9-4bca-ab27-97632728204e');
/*!40000 ALTER TABLE `elements_sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entries`
--

DROP TABLE IF EXISTS `entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entries` (
  `id` int(11) NOT NULL,
  `sectionId` int(11) NOT NULL,
  `typeId` int(11) NOT NULL,
  `authorId` int(11) DEFAULT NULL,
  `postDate` datetime DEFAULT NULL,
  `expiryDate` datetime DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `entries_postDate_idx` (`postDate`),
  KEY `entries_expiryDate_idx` (`expiryDate`),
  KEY `entries_authorId_idx` (`authorId`),
  KEY `entries_sectionId_idx` (`sectionId`),
  KEY `entries_typeId_idx` (`typeId`),
  CONSTRAINT `entries_authorId_fk` FOREIGN KEY (`authorId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `entries_id_fk` FOREIGN KEY (`id`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `entries_sectionId_fk` FOREIGN KEY (`sectionId`) REFERENCES `sections` (`id`) ON DELETE CASCADE,
  CONSTRAINT `entries_typeId_fk` FOREIGN KEY (`typeId`) REFERENCES `entrytypes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entries`
--

LOCK TABLES `entries` WRITE;
/*!40000 ALTER TABLE `entries` DISABLE KEYS */;
INSERT INTO `entries` VALUES (3,2,2,1,'2018-11-08 16:50:00',NULL,'2018-11-08 16:50:20','2018-11-25 10:41:09','92f22bf7-cffe-4c8e-83e8-96b9b19d7f84'),(12,3,3,1,'2018-11-22 14:57:00',NULL,'2018-11-22 14:57:20','2018-11-22 15:39:16','9a67ed83-da8b-47db-9f3f-217faf73c7e5'),(13,3,3,1,'2018-11-22 15:01:00',NULL,'2018-11-22 15:01:35','2018-11-22 15:39:16','26fb8cb5-a952-44bc-b4d8-07876e32acb1'),(14,3,3,1,'2018-11-22 15:02:00',NULL,'2018-11-22 15:02:01','2018-11-22 15:39:16','6775a56a-b397-4467-97a8-90a1351b91db'),(15,3,3,1,'2018-11-22 15:02:00',NULL,'2018-11-22 15:02:54','2018-11-22 15:39:16','52a7b99e-aae7-451c-8331-72ebda0342ad');
/*!40000 ALTER TABLE `entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entrydrafts`
--

DROP TABLE IF EXISTS `entrydrafts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entrydrafts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entryId` int(11) NOT NULL,
  `sectionId` int(11) NOT NULL,
  `creatorId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `notes` text,
  `data` mediumtext NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `entrydrafts_sectionId_idx` (`sectionId`),
  KEY `entrydrafts_entryId_siteId_idx` (`entryId`,`siteId`),
  KEY `entrydrafts_siteId_idx` (`siteId`),
  KEY `entrydrafts_creatorId_idx` (`creatorId`),
  CONSTRAINT `entrydrafts_creatorId_fk` FOREIGN KEY (`creatorId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `entrydrafts_entryId_fk` FOREIGN KEY (`entryId`) REFERENCES `entries` (`id`) ON DELETE CASCADE,
  CONSTRAINT `entrydrafts_sectionId_fk` FOREIGN KEY (`sectionId`) REFERENCES `sections` (`id`) ON DELETE CASCADE,
  CONSTRAINT `entrydrafts_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entrydrafts`
--

LOCK TABLES `entrydrafts` WRITE;
/*!40000 ALTER TABLE `entrydrafts` DISABLE KEYS */;
/*!40000 ALTER TABLE `entrydrafts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entrytypes`
--

DROP TABLE IF EXISTS `entrytypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entrytypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sectionId` int(11) NOT NULL,
  `fieldLayoutId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `hasTitleField` tinyint(1) NOT NULL DEFAULT '1',
  `titleLabel` varchar(255) DEFAULT 'Title',
  `titleFormat` varchar(255) DEFAULT NULL,
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `entrytypes_name_sectionId_unq_idx` (`name`,`sectionId`),
  UNIQUE KEY `entrytypes_handle_sectionId_unq_idx` (`handle`,`sectionId`),
  KEY `entrytypes_sectionId_idx` (`sectionId`),
  KEY `entrytypes_fieldLayoutId_idx` (`fieldLayoutId`),
  CONSTRAINT `entrytypes_fieldLayoutId_fk` FOREIGN KEY (`fieldLayoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE SET NULL,
  CONSTRAINT `entrytypes_sectionId_fk` FOREIGN KEY (`sectionId`) REFERENCES `sections` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entrytypes`
--

LOCK TABLES `entrytypes` WRITE;
/*!40000 ALTER TABLE `entrytypes` DISABLE KEYS */;
INSERT INTO `entrytypes` VALUES (2,2,5,'Retreat','retreat',1,'Title',NULL,1,'2018-11-08 15:21:35','2018-11-25 10:14:27','b44b3327-1cce-4970-b8a0-859bc44cfcab'),(3,3,91,'Pages','pages',1,'Title',NULL,1,'2018-11-22 14:46:16','2018-11-22 14:59:20','b446888d-3f56-44cc-9f59-1faebbf789ff');
/*!40000 ALTER TABLE `entrytypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entryversions`
--

DROP TABLE IF EXISTS `entryversions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entryversions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entryId` int(11) NOT NULL,
  `sectionId` int(11) NOT NULL,
  `creatorId` int(11) DEFAULT NULL,
  `siteId` int(11) NOT NULL,
  `num` smallint(6) unsigned NOT NULL,
  `notes` text,
  `data` mediumtext NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `entryversions_sectionId_idx` (`sectionId`),
  KEY `entryversions_entryId_siteId_idx` (`entryId`,`siteId`),
  KEY `entryversions_siteId_idx` (`siteId`),
  KEY `entryversions_creatorId_idx` (`creatorId`),
  CONSTRAINT `entryversions_creatorId_fk` FOREIGN KEY (`creatorId`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `entryversions_entryId_fk` FOREIGN KEY (`entryId`) REFERENCES `entries` (`id`) ON DELETE CASCADE,
  CONSTRAINT `entryversions_sectionId_fk` FOREIGN KEY (`sectionId`) REFERENCES `sections` (`id`) ON DELETE CASCADE,
  CONSTRAINT `entryversions_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entryversions`
--

LOCK TABLES `entryversions` WRITE;
/*!40000 ALTER TABLE `entryversions` DISABLE KEYS */;
INSERT INTO `entryversions` VALUES (8,3,2,1,1,1,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotsadd\",\"slug\":\"cotsadd\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"17\":[]}}','2018-11-08 16:50:20','2018-11-08 16:50:20','df6d96b5-1d4e-4f6f-9e59-3d8278c33073'),(9,3,2,1,1,2,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotswolds\",\"slug\":\"cotsadd\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"17\":[]}}','2018-11-08 17:06:19','2018-11-08 17:06:19','9cc545bb-4223-4345-b82c-99a0fa6b552e'),(10,3,2,1,1,3,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotswolds\",\"slug\":\"cotswolds\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"17\":[]}}','2018-11-08 17:49:50','2018-11-08 17:49:50','9ebe4cce-2789-47d2-afdd-e61b3493d974'),(11,3,2,1,1,4,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotswolds\",\"slug\":\"cotswolds\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"49\":{\"4\":{\"type\":\"2\",\"fields\":{\"ctaLabel\":\"Apply Now\",\"ctaUrl\":\"https://clearleftretreats.typeform.com/to/g5O1Ff\"}}},\"35\":\"2019-03-07 08:00:00\",\"48\":{\"5\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionTitle\":\"What can you expect?\"}},\"6\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>\"}},\"7\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionTitle\":\"Who is it for?\"}},\"8\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"9\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>\",\"secondColumn\":\"<p>asd</p>\"}}}}}},\"34\":\"2019-03-04 08:00:00\"}}','2018-11-22 13:53:47','2018-11-22 13:53:47','70a8898c-1162-4541-8919-658b1b07b269'),(12,3,2,1,1,5,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotswolds\",\"slug\":\"cotswolds\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"49\":{\"4\":{\"type\":\"2\",\"fields\":{\"ctaLabel\":\"Apply Now\",\"ctaUrl\":\"https://clearleftretreats.typeform.com/to/g5O1Ff\"}}},\"35\":\"2019-03-07 08:00:00\",\"48\":{\"5\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionTitle\":\"What can you expect?\"}},\"6\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>\"}},\"7\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionTitle\":\"Who is it for?\"}},\"8\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"9\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>\",\"secondColumn\":\"<ul><li>You have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work.</li><li>You have been looking for opportunities to be part of a group of peers for mentoring and support; to share experiences and learn from one another’s stories.</li><li>You need to pause, reflect and reconnect with your own sense of purpose as a leader, in order to be able to lead others.</li></ul>\"}}}}}},\"34\":\"2019-03-04 08:00:00\"}}','2018-11-22 14:23:23','2018-11-22 14:23:23','610248e0-a8d7-43ca-8258-b156b5edff6c'),(13,3,2,1,1,6,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotswolds\",\"slug\":\"cotswolds\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"49\":{\"4\":{\"type\":\"2\",\"fields\":{\"ctaLabel\":\"Apply Now\",\"ctaUrl\":\"https://clearleftretreats.typeform.com/to/g5O1Ff\"}}},\"35\":\"2019-03-07 08:00:00\",\"48\":{\"5\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionTitle\":\"What can you expect?\"}},\"6\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>\"}},\"7\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionTitle\":\"Who is it for?\"}},\"8\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"9\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>\",\"secondColumn\":\"<ul><li>You have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work.</li><li>You have been looking for opportunities to be part of a group of peers for mentoring and support; to share experiences and learn from one another’s stories.</li><li>You need to pause, reflect and reconnect with your own sense of purpose as a leader, in order to be able to lead others.</li></ul>\"}}}}}},\"67\":{\"11\":{\"type\":\"7\",\"fields\":{\"footerTitle\":\"Join us in the Cotswolds.\",\"footerContent\":\"<p>If you’d be interested in booking a place on this retreat please pencil the dates in your calendar and apply here — we’ll send you further information by Monday 7th January.</p>\\n<p>If you think of someone else that it would be appropriate to invite, please let us know and we can invite them along.</p>\"}}},\"34\":\"2019-03-04 08:00:00\",\"63\":{\"10\":{\"type\":\"6\",\"fields\":{\"venueName\":\"Rectory Hotel\",\"venueUrl\":\"http://therectoryhotel.com/\",\"venueAddress\":\"Rectory Hotel, Crudwell The Cotswolds\"}}}}}','2018-11-22 14:45:32','2018-11-22 14:45:32','a456cbd3-7700-4af6-b0f0-e509e46004eb'),(14,12,3,1,1,1,'','{\"typeId\":\"3\",\"authorId\":\"1\",\"title\":\"Privacy Policy\",\"slug\":\"privacy-policy\",\"postDate\":1542898620,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":[]}','2018-11-22 14:57:20','2018-11-22 14:57:20','28dc37dd-41fd-478d-9e86-d27ff1abeec8'),(15,12,3,1,1,2,'','{\"typeId\":\"3\",\"authorId\":\"1\",\"title\":\"Privacy Policy\",\"slug\":\"privacy-policy\",\"postDate\":1542898620,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"70\":\"<h2>Cus­tomer service</h2>\\n<p>We com­mu­ni­cate with users on a reg­u­lar basis to pro­vide request­ed ser­vices and about issues relat­ing to their account. We reply via email or phone.</p>\\n<h2>Shar­ing</h2>\\n<p>Clear­left does not pass on or sell infor­ma­tion about our cus­tomers to any oth­er busi­ness or organ­i­sa­tion. The only excep­tion to this is where we are legal­ly oblig­ed to do so to com­ply with a cur­rent judi­cial pro­ceed­ing, a court order or legal process served on our Website.</p>\\n<h2>Busi­ness transitions</h2>\\n<p>In the event Clear­left Ltd goes through a busi­ness tran­si­tion, users will be noti­fied via a promi­nent notice on our Website for 30 days pri­or to a change of own­er­ship or con­trol of their per­son­al infor­ma­tion. If as a result of the busi­ness tran­si­tion, the users’ per­son­al­ly iden­ti­fi­able infor­ma­tion will be used dif­fer­ent­ly from that stat­ed at the time of col­lec­tion, they will be giv­en choice con­sis­tent with our noti­fi­ca­tion of changes section.</p>\\n<h2>Choice/opt-out</h2>\\n<p>Users who no longer wish to receive pro­mo­tion­al com­mu­ni­ca­tions may opt-out of receiv­ing these com­mu­ni­ca­tions by reply­ing with ​‘unsub­scribe’ in the sub­ject line of the email, or email us at <a href=\\\"mailto:info@clearleft.com\\\">info@​clearleft.​com</a>, tele­phone on +44 (0)845 838 6163, or write to Clear­left Ltd, 68 Mid­dle Street, Brighton, BN11AL, UK.</p>\\n<h2>Links</h2>\\n<p>Our web­site con­tains links to oth­er sites. We are not respon­si­ble for the pri­va­cy prac­tices of such oth­er sites. This pri­va­cy state­ment applies sole­ly to infor­ma­tion col­lect­ed by this website.</p>\\n<h2>Sur­veys &amp; contests</h2>\\n<p>From time-to-time our site requests infor­ma­tion from users via sur­veys or con­tests. Par­tic­i­pa­tion in these sur­veys or con­tests is com­plete­ly vol­un­tary and the user has a choice whether or not to dis­close this infor­ma­tion. The request­ed infor­ma­tion typ­i­cal­ly includes con­tact infor­ma­tion (such as name and email address), and busi­ness infor­ma­tion. Con­tact infor­ma­tion will be used to noti­fy the win­ners and award prizes. Sur­vey infor­ma­tion will be used for pur­pos­es of mon­i­tor­ing or improv­ing the use and sat­is­fac­tion of this site. Users’ per­son­al­ly iden­ti­fi­able infor­ma­tion is not shared with third parties.</p>\"}}','2018-11-22 15:00:12','2018-11-22 15:00:12','718b47bb-19ef-4410-98b2-effcb7c6f98d'),(16,12,3,1,1,3,'','{\"typeId\":\"3\",\"authorId\":\"1\",\"title\":\"Privacy Policy\",\"slug\":\"privacy\",\"postDate\":1542898620,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"70\":\"<h2>Cus­tomer service</h2>\\n<p>We com­mu­ni­cate with users on a reg­u­lar basis to pro­vide request­ed ser­vices and about issues relat­ing to their account. We reply via email or phone.</p>\\n<h2>Shar­ing</h2>\\n<p>Clear­left does not pass on or sell infor­ma­tion about our cus­tomers to any oth­er busi­ness or organ­i­sa­tion. The only excep­tion to this is where we are legal­ly oblig­ed to do so to com­ply with a cur­rent judi­cial pro­ceed­ing, a court order or legal process served on our Website.</p>\\n<h2>Busi­ness transitions</h2>\\n<p>In the event Clear­left Ltd goes through a busi­ness tran­si­tion, users will be noti­fied via a promi­nent notice on our Website for 30 days pri­or to a change of own­er­ship or con­trol of their per­son­al infor­ma­tion. If as a result of the busi­ness tran­si­tion, the users’ per­son­al­ly iden­ti­fi­able infor­ma­tion will be used dif­fer­ent­ly from that stat­ed at the time of col­lec­tion, they will be giv­en choice con­sis­tent with our noti­fi­ca­tion of changes section.</p>\\n<h2>Choice/opt-out</h2>\\n<p>Users who no longer wish to receive pro­mo­tion­al com­mu­ni­ca­tions may opt-out of receiv­ing these com­mu­ni­ca­tions by reply­ing with ​‘unsub­scribe’ in the sub­ject line of the email, or email us at <a href=\\\"mailto:info@clearleft.com\\\">info@​clearleft.​com</a>, tele­phone on +44 (0)845 838 6163, or write to Clear­left Ltd, 68 Mid­dle Street, Brighton, BN11AL, UK.</p>\\n<h2>Links</h2>\\n<p>Our web­site con­tains links to oth­er sites. We are not respon­si­ble for the pri­va­cy prac­tices of such oth­er sites. This pri­va­cy state­ment applies sole­ly to infor­ma­tion col­lect­ed by this website.</p>\\n<h2>Sur­veys &amp; contests</h2>\\n<p>From time-to-time our site requests infor­ma­tion from users via sur­veys or con­tests. Par­tic­i­pa­tion in these sur­veys or con­tests is com­plete­ly vol­un­tary and the user has a choice whether or not to dis­close this infor­ma­tion. The request­ed infor­ma­tion typ­i­cal­ly includes con­tact infor­ma­tion (such as name and email address), and busi­ness infor­ma­tion. Con­tact infor­ma­tion will be used to noti­fy the win­ners and award prizes. Sur­vey infor­ma­tion will be used for pur­pos­es of mon­i­tor­ing or improv­ing the use and sat­is­fac­tion of this site. Users’ per­son­al­ly iden­ti­fi­able infor­ma­tion is not shared with third parties.</p>\"}}','2018-11-22 15:00:38','2018-11-22 15:00:38','d5409e23-146d-42d6-a7de-8e8cbb28ca32'),(17,13,3,1,1,1,'','{\"typeId\":\"3\",\"authorId\":\"1\",\"title\":\"Terms and Conditions\",\"slug\":\"terms\",\"postDate\":1542898860,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"70\":\"<p>These terms and conditions apply to any booking to attend our events.</p>\\n<p>We draw your attention to clause 6, which contains a limitation of our liability, and clause 9.2, which contains an indemnity in respect of your data protection obligations.</p>\\n<h2>1. INTRODUCTION</h2>\\n<p>1.1 The event is organised and managed by Clearleft Limited, a company registered in England and Wales with registration number 05466565 The Old Casino, 28 Fourth Avenue, Hove, BN3 2PJ.</p>\\n<p>1.2 References to “us” means Clearleft Limited and references to “we” and “our” shall be construed accordingly. Reference to “you” means the entity completing a booking request and references to “your” shall be construed accordingly.</p>\\n<p>1.3 All applications to register for the event, and all orders to purchase the relevant documentation pack, are made subject to these terms &amp; conditions (which shall apply to the exclusion of any terms you attempt to be incorporate into our agreement with you).</p>\\n<p>1.4 You acknowledge and accept that we have the right to publicly announce our business relationship with you which shall include but not be limited to announcements on social media. Such announcements shall not be disparaging or otherwise adverse to your business.</p>\\n<h2>2. BOOKINGS</h2>\\n<p>2.1 All applications to register for the event are subject to availability and full payment being received by us.</p>\\n<p>2.2 Delegate passes issued for the event are valid for the named attendee only and, subject to clause 4.2 below, cannot be transferred to any other person. Delegates may be asked for a valid photographic ID during the event. If valid photographic ID is not produced or is produced and does not, in our reasonable opinion, match the delegate pass we shall have the discretion to require the delegate to leave the event and, if exercised, the delegate must leave the event and premises the event is held at.</p>\\n<h2>3. PRICES AND PAYMENT</h2>\\n<p>3.1 The prices for attending the event, are set out on the relevant registration booking form or on our website You may also obtain prices from us on request. Prices may be subject to change from time to time.</p>\\n<p>3.2 If you apply to register for the event less than two (2) weeks before the date of the event we will only accept payment by a credit card, unless we expressly agree otherwise in writing. If for any reason we have not received payment in full prior to the date of the event you (or the attending delegate) will be asked as a condition of being permitted to attend the event to provide payment by credit card on the day of the event. We reserve the right to cancel your booking at any time and refuse entry if full payment has not been received.</p>\\n<p>3.3 You acknowledge and accept that If payment is not made in accordance with this Clause 3, interest on the overdue balances (including any period after the date of any judgment or decree against the Customer), and late payment fees, fall due and payable and are calculated upon the basis set out in the Late Payment of Commercial Debts (Interest) Act 1998 (as amended).</p>\\n<h2>4. CHANGES TO THE EVENT AND CANCELLATIONS</h2>\\n<p>4.1 It may be necessary for reasons beyond our reasonable control to alter the advertised content, timing and/or location of the event or the advertised speakers. We reserve the right to do this at any time. Where we alter the date and/or location of the event, we will provide you with notice of the same and will offer you the choice of either: (a) credit for a future event of your choice (up to the value of sums paid by you in respect of the event) to be used within 12 months of the alteration notice; or (b) the opportunity to attend the event as varied.</p>\\n<p>4.2 If a delegate is unable to attend the event we welcome a substitute delegate attending at no extra cost provided that we have at least two (2) days’ prior notice of the name of your proposed substitute and payment has been received in full. Please notify us of any substitutions by email at <a href=\\\"mailto:alis@clearleft.com\\\">alis@clearleft.com</a>.</p>\\n<p>4.3 We ask that you notify us if a delegate cannot attend the event. If you would like to make a cancellation in respect of a booking, no refunds will be given except in accordance with this clause.</p>\\n<p>You may cancel a booking only by sending an email to alis@clearleft.com clearly identifying the event, the number of delegates and the delegate names the cancellation is in respect of. If we receive a valid cancellation email:</p>\\n<p>4.3.1 more than two (2) months prior to the planned date of the event, a 50% refund will be issued;</p>\\n<p>4.3.2 between two (2) months and one (1) month prior to the planned date of the event, a 25% refund will be issued; and</p>\\n<p>4.3.3 less than one (1) month prior to the planned date of the event, no refund will be given.</p>\\n<p>4.4 Any refund due under clause 4.3 shall be paid within 28 days of receipt of the cancellation notice.</p>\\n<p>4.5 We shall not be liable to you for travel, accommodation or other costs and expenses incurred (included wasted costs and expenses) if we are required to cancel or relocate the event as a result of an event outside our reasonable control (including, without limitation, to acts of God, floods, lightning, storm, fire, explosion, war, military operations, acts or threats of terrorism, strike action, lock-outs or other industrial action or a pandemic, epidemic or other widespread illness).</p>\\n<p>4.6 You have no right to cancel a booking except in accordance with this clause 4.</p>\\n<h2>5. CONTENT</h2>\\n<p>5.1 All rights in all presentations, documentation and materials published or otherwise made available as part of the event (including but not limited to any documentation packs or audio or audio-visual recording of the event) (“Content”) are owned by us or are included with the permission of the owner of the rights. No (i) photography, filming or recording; or (ii) republication, broadcast or other dissemination of the Content is permitted. You shall not distribute, reproduce, modify, store, transfer or in any other way use any of the Content (save that use by the relevant delegate for internal business purposes shall be permitted), and in particular (but without limitation) you shall not (and shall procure that each of your delegates shall not):</p>\\n<p>5.1.1 upload any Content into any shared system;</p>\\n<p>5.1.2 include any Content in a database;</p>\\n<p>5.1.3 include any Content in a website or on any intranet;</p>\\n<p>5.1.4 transmit, re-circulate or otherwise make available any Content to anyone else;</p>\\n<p>5.1.5 make any commercial use of the Content whatsoever; or</p>\\n<p>5.1.6 use Content in any way that might infringe third party rights or that may bring us or any of our affiliates into disrepute.</p>\\n<p>5.2 The Content does not necessarily reflect our views or opinions.</p>\\n<p>5.3 Suggestions or advice contained in the Content should not be relied upon in place of professional or other advice. Whilst we take reasonable care to ensure that the Content created by us is accurate and complete, some of it is supplied by third parties and we are unable to check its accuracy or completeness. You should verify the accuracy of any information (whether supplied by us or third parties) before relying on it. The Content is provided on an “as is” basis without any warranties of any kind (express or implied). We hereby exclude to the fullest extent permitted by law all liabilities, costs, claims, damages, losses and/or expenses arising from any inaccuracy or omission in the Content or arising from any infringing, defamatory or otherwise unlawful material in the Content.</p>\\n<p>5.4 To the extent that any Content is made available by us online or in any other way other than physical hard copy form we reserve the right to suspend or remove access to such Content at any time.</p>\\n<h2>6. LIABILITY</h2>\\n<p>6.1 Subject to Clause 6.4, our aggregate liability to you, whether such liability arises in contract, tort (including negligence) or otherwise, for any damages, loss, costs, claims or expenses of any kind howsoever arising, out of in connection with any booking (or requested booking) made by you or otherwise in relation to a event, shall be limited to the price paid by you in respect of your booking to attend the event.</p>\\n<p>6.2 Subject to Clause 6.4, we shall not be liable to you for: (i) any loss of profit, loss of or damage to data, loss of anticipated savings or interest, loss of or damage to reputation or goodwill; or (ii) any indirect, special or consequential damages, loss, costs, claims or expenses of any kind.</p>\\n<p>6.3 You agree to indemnify us, our staff and our affiliates and to hold us harmless to the fullest extent permitted by law, against all loss, costs, claims or expenses of any kind arising from any act or omission by you (including your delegates) during or otherwise in relation to an event.</p>\\n<p>6.4 Nothing in this these Terms and Conditions shall limit or exclude a party\'s liability for:</p>\\n<p>6.4.1 death or personal injury caused by its negligence, or the negligence of its employees, agents or subcontractors;</p>\\n<p>6.4.2 fraud or fraudulent misrepresentation; or</p>\\n<p>6.4.3 any other liability which cannot be limited or excluded by applicable law.</p>\\n<h2>7. GENERAL</h2>\\n<p>7.1 These terms and conditions (together with any documents referred to herein or required to be entered into pursuant to these terms and conditions) contain the entire agreement and understanding between us and supersede all prior agreements, understandings or arrangements (both oral and written) relating to the subject matter of these terms and conditions and any such document.</p>\\n<p>7.2 You acknowledge that in registering a delegate place you have not relied on, and shall have no remedy in respect of, any statement, representation, warranty, understanding, promise or assurance (whether negligently or innocently made) of any person other than as expressly set out in these terms and conditions.</p>\\n<p>7.3 Clearleft Limited is part of an enlarged group which pledges to trade legally and respect all laws including the trade sanctions imposed by EU and US Governments. We operate a group sanctions policy which means that we cannot allow attendees at our events or awards to be based, residing or connected with a country or organisation subject to EU and/or US Government sanctions and we reserve the right to refuse bookings from or entry to any such persons or organisations.</p>\\n<p>7.4 These terms and conditions shall not create, nor shall they be construed as creating, any partnership or agency relationship between us.</p>\\n<p>7.5 You accept that communication with us may be electronic. We may contact you by e-mail or provide you with information by posting notices on our website. You agree to this electronic means of communication and you acknowledge that all such communications that we provide to you electronically comply with any legal or contractual requirement that such communication be made in writing.</p>\\n<p>7.6 Save as set out in Clause 4.2 you are not permitted to re-sell, transfer, assign or otherwise dispose of any of your rights or obligations arising under these terms and conditions.</p>\\n<p>7.7 These terms and conditions and the rights and obligations of both parties shall be governed by, and construed in accordance with, the laws of England and Wales and both parties irrevocably agree to submit to the exclusive jurisdiction of the courts of England and Wales in respect of any dispute which arises hereunder.</p>\\n<p>7.8 A contract formed under these terms shall terminate at the later of: (a) the end of the event (as reasonably determined by us) or (b) on completion of all your obligations under the contract.</p>\\n<h2>8. CONSUMER RIGHTS</h2>\\n<p>8.1 If you are booking to attend an event and are a consumer within the definition in the Consumer Rights Act 2015 or under other applicable consumer protection laws, nothing in these terms shall exclude or limit any consumer rights that cannot be excluded or limited by law.</p>\\n<h2>9. DATA PROTECTION AND PRIVACY POLICY</h2>\\n<p>9.1 We are the Data Controller for the purposes of the Data Protection Act 2018 and the General Data Protection Regulation (Regulation (EU) 2016/679)) (“GDPR”).</p>\\n<p>9.2 By making a booking and providing any delegate personal data (as defined in the GDPR) to us, you warrant that: (i) you have a lawful basis for processing the personal data, including (where applicable) fully-informed consent (as defined in the GDPR) and notices in place to enable lawful transfer of the data to us; (ii) you have brought our privacy policy to the attention of each delegate you are booking to attend an event; and (iii) agree to fully indemnify us for any and all loss suffered in connection with a breach of your obligations under this clause 9.2.</p>\\n<p>9.3 If making a booking to attend the event yourself, you acknowledge that we may process your personal data in accordance with our <a href=\\\"{entry:12:url}\\\">privacy policy</a>.</p>\"}}','2018-11-22 15:01:35','2018-11-22 15:01:35','08d4e184-713d-4dca-afdb-4fddcd39883c'),(18,14,3,1,1,1,'','{\"typeId\":\"3\",\"authorId\":\"1\",\"title\":\"Accessibility\",\"slug\":\"accessibility\",\"postDate\":1542898920,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"70\":\"<p>The Clearleft Retreats web­site has been designed and built to be acces­si­ble to as wide an audi­ence as pos­si­ble. Some peo­ple with dis­abil­i­ties find using the web dif­fi­cult and while we know that it is impos­si­ble to design a site that every­one can use, if you have prob­lems using our site, please let us know and we will do our utmost to help.</p>\\n<h2>Retreat accessibility</h2>\\n<p>We aim to chose venues to ensure full access for peo­ple with a wide range of dis­abil­i­ties from wheel­chair users to those with sen­so­ry and learn­ing difficulties.</p>\\n<p>Please do let us know in plenty of time if you require help with accessibility.</p>\"}}','2018-11-22 15:02:01','2018-11-22 15:02:01','44ab99a8-3815-49c1-8a76-216a6ff1468d'),(19,15,3,1,1,1,'','{\"typeId\":\"3\",\"authorId\":\"1\",\"title\":\"Code of Conduct\",\"slug\":\"code-of-conduct\",\"postDate\":1542898920,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"70\":\"<p>Clearleft Retreats are inclu­sive events based on treat­ing all indi­vid­u­als respect­ful­ly, regard­less of gen­der, sex­u­al ori­en­ta­tion, age, dis­abil­i­ty, eth­nic­i­ty, reli­gion (or lack there­of), or soft­ware pref­er­ences. So please don’t be nasty or mean. Be nice. Be con­sid­er­ate. Be civ­il. It’s easy.</p>\\n<p>If you are being harassed, notice that some­one else is being harassed, or have any oth­er con­cerns, please con­tact a mem­ber of Clearleft staff.</p>\\n<p>Harass­ment includes offen­sive ver­bal com­ments relat­ed to gen­der, age, sex­u­al ori­en­ta­tion, dis­abil­i­ty, phys­i­cal appear­ance, body size, race, reli­gion, sex­u­al images in pub­lic spaces, delib­er­ate intim­i­da­tion, stalk­ing, fol­low­ing, harass­ing pho­tog­ra­phy or record­ing,, inap­pro­pri­ate phys­i­cal con­tact, and unwel­come sex­u­al attention.</p>\\n<p>Par­tic­i­pants asked to stop any harass­ing behav­ior must imme­di­ate­ly com­ply. If a par­tic­i­pant engages in any of the afore­men­tioned behav­ior, we may take any action we deem appro­pri­ate, from warn­ing the offend­er to imme­di­ate­ly expelling the offend­er with no refund.</p>\\n<p>This doc­u­ment is based on <a href=\\\"http://confcodeofconduct.com/\\\">code​of​con​duct​.com</a>, licensed under a <a href=\\\"http://creativecommons.org/licenses/by/3.0/deed.en_US\\\">Cre­ative Com­mons Attri­bu­tion 3.0 Unport­ed License</a>.</p>\"}}','2018-11-22 15:02:54','2018-11-22 15:02:54','0e9c2d3d-49b3-4fba-bfbd-f76356671b0f'),(20,3,2,1,1,7,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotswolds\",\"slug\":\"cotswolds\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"49\":{\"4\":{\"type\":\"2\",\"fields\":{\"ctaLabel\":\"Apply Now\",\"ctaUrl\":\"https://clearleftretreats.typeform.com/to/g5O1Ff\"}}},\"35\":\"2019-03-07 08:00:00\",\"48\":{\"5\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionTitle\":\"What can you expect?\"}},\"6\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>\"}},\"7\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionTitle\":\"Who is it for?\"}},\"8\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"9\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>\",\"secondColumn\":\"<ul><li>You have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work.</li><li>You have been looking for opportunities to be part of a group of peers for mentoring and support; to share experiences and learn from one another’s stories.</li><li>You need to pause, reflect and reconnect with your own sense of purpose as a leader, in order to be able to lead others.</li></ul>\"}}}}}},\"67\":{\"11\":{\"type\":\"7\",\"fields\":{\"footerTitle\":\"Join us in the Cotswolds.\",\"footerContent\":\"<p>If you’d be interested in booking a place on this retreat please pencil the dates in your calendar and apply here — we’ll send you further information by Monday 7th January.</p>\\n<p>If you think of someone else that it would be appropriate to invite, please let us know and we can invite them along.</p>\"}}},\"34\":\"2019-03-04 08:00:00\",\"73\":\"1995\",\"63\":{\"10\":{\"type\":\"6\",\"fields\":{\"venueName\":\"Rectory Hotel\",\"venueLocation\":\"Crudwell\",\"venueAddress\":\"Rectory Hotel, Crudwell, The Cotswolds\",\"venueUrl\":\"http://therectoryhotel.com/\"}}}}}','2018-11-22 15:18:52','2018-11-22 15:18:52','239bca2c-60dd-48aa-a203-061b7db67441'),(21,3,2,1,1,8,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotswolds\",\"slug\":\"cotswolds\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"49\":{\"4\":{\"type\":\"2\",\"fields\":{\"ctaLabel\":\"Apply Now\",\"ctaUrl\":\"https://clearleftretreats.typeform.com/to/g5O1Ff\"}}},\"35\":\"2019-03-07 08:00:00\",\"74\":{\"17\":{\"type\":\"8\",\"fields\":{\"mastheadTitle\":\"Join your peers at our Design Leadership Retreat and hone your Leadership skills\",\"mastheadImage\":[]}}},\"48\":{\"5\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionTitle\":\"What can you expect?\"}},\"6\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>\"}},\"7\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionTitle\":\"Who is it for?\"}},\"8\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"9\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>\",\"secondColumn\":\"<ul><li>You have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work.</li><li>You have been looking for opportunities to be part of a group of peers for mentoring and support; to share experiences and learn from one another’s stories.</li><li>You need to pause, reflect and reconnect with your own sense of purpose as a leader, in order to be able to lead others.</li></ul>\"}}}}}},\"67\":{\"11\":{\"type\":\"7\",\"fields\":{\"footerTitle\":\"Join us in the Cotswolds.\",\"footerContent\":\"<p>If you’d be interested in booking a place on this retreat please pencil the dates in your calendar and apply here — we’ll send you further information by Monday 7th January.</p>\\n<p>If you think of someone else that it would be appropriate to invite, please let us know and we can invite them along.</p>\"}}},\"34\":\"2019-03-04 08:00:00\",\"73\":\"1995\",\"63\":{\"10\":{\"type\":\"6\",\"fields\":{\"venueName\":\"Rectory Hotel\",\"venueLocation\":\"Crudwell\",\"venueAddress\":\"Rectory Hotel, Crudwell, The Cotswolds\",\"venueUrl\":\"http://therectoryhotel.com/\"}}}}}','2018-11-22 16:17:35','2018-11-22 16:17:35','de1db89a-ceed-4fff-a375-93416a210596'),(22,3,2,1,1,9,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotswolds\",\"slug\":\"cotswolds\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"49\":{\"4\":{\"type\":\"2\",\"fields\":{\"ctaLabel\":\"Apply Now\",\"ctaUrl\":\"https://clearleftretreats.typeform.com/to/g5O1Ff\"}}},\"35\":\"2019-03-07 08:00:00\",\"74\":{\"17\":{\"type\":\"8\",\"fields\":{\"mastheadTitle\":\"Join your peers at our Design Leadership Retreat and hone your Leadership skills\",\"mastheadImage\":[]}}},\"48\":{\"5\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionTitle\":\"What can you expect?\"}},\"6\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>\"}},\"7\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionTitle\":\"Who is it for?\"}},\"8\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"9\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>\",\"secondColumn\":\"<ul><li>You have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work.</li><li>You have been looking for opportunities to be part of a group of peers for mentoring and support; to share experiences and learn from one another’s stories.</li><li>You need to pause, reflect and reconnect with your own sense of purpose as a leader, in order to be able to lead others.</li></ul>\"}}}}}},\"67\":{\"11\":{\"type\":\"7\",\"fields\":{\"footerTitle\":\"Join us in the Cotswolds.\",\"footerContent\":\"<p>If you’d be interested in booking a place on this retreat please pencil the dates in your calendar and apply here — we’ll send you further information by Monday 7th January.</p>\\n<p>If you think of someone else that it would be appropriate to invite, please let us know and we can invite them along.</p>\"}}},\"34\":\"2019-03-04 08:00:00\",\"77\":{\"18\":{\"type\":\"9\",\"fields\":{\"themeMain\":\"#b88800\",\"themeAccent\":\"#644094\",\"themeTextDark\":\"#727272\",\"themeTextLight\":\"#767676\",\"themeLight\":\"#ffffff\",\"themeDark\":\"#0f0f0f\",\"themeMuted\":\"#f8f8f8\"}}},\"73\":\"1995\",\"63\":{\"10\":{\"type\":\"6\",\"fields\":{\"venueName\":\"Rectory Hotel\",\"venueLocation\":\"Crudwell\",\"venueAddress\":\"Rectory Hotel, Crudwell, The Cotswolds\",\"venueUrl\":\"http://therectoryhotel.com/\"}}}}}','2018-11-22 16:48:36','2018-11-22 16:48:36','8878cc16-bbf9-4e5e-99f9-91c776b27144'),(23,3,2,1,1,10,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotswolds\",\"slug\":\"cotswolds\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"49\":{\"4\":{\"type\":\"2\",\"fields\":{\"ctaLabel\":\"Apply Now\",\"ctaUrl\":\"https://clearleftretreats.typeform.com/to/g5O1Ff\"}}},\"35\":\"2019-03-07 00:00:00\",\"74\":{\"17\":{\"type\":\"8\",\"fields\":{\"mastheadTitle\":\"Join your peers at our Design Leadership Retreat and hone your Leadership skills\",\"mastheadImage\":[]}}},\"48\":{\"5\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionTitle\":\"What can you expect?\"}},\"6\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>\"}},\"7\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionTitle\":\"Who is it for?\"}},\"8\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"9\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>\",\"secondColumn\":\"<ul><li>You have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work.</li><li>You have been looking for opportunities to be part of a group of peers for mentoring and support; to share experiences and learn from one another’s stories.</li><li>You need to pause, reflect and reconnect with your own sense of purpose as a leader, in order to be able to lead others.</li></ul>\"}}}}}},\"67\":{\"11\":{\"type\":\"7\",\"fields\":{\"footerTitle\":\"Join us in the Cotswolds.\",\"footerContent\":\"<p>If you’d be <strong>interested</strong> in booking a place on this retreat please pencil the dates in your calendar and apply here — we’ll send you further information by Monday 7th January.</p>\\n<p>If you think of someone else that it would be appropriate to invite, please let us know and we can invite them along.</p>\"}}},\"34\":\"2019-03-04 00:00:00\",\"77\":{\"18\":{\"type\":\"9\",\"fields\":{\"themeMain\":\"#b88800\",\"themeAccent\":\"#644094\",\"themeTextDark\":\"#727272\",\"themeTextLight\":\"#767676\",\"themeLight\":\"#ffffff\",\"themeDark\":\"#0f0f0f\",\"themeMuted\":\"#f8f8f8\"}}},\"73\":\"1995\",\"63\":{\"10\":{\"type\":\"6\",\"fields\":{\"venueName\":\"Rectory Hotel\",\"venueLocation\":\"Crudwell\",\"venueAddress\":\"Rectory Hotel, Crudwell, The Cotswolds\",\"venueUrl\":\"http://therectoryhotel.com/\"}}}}}','2018-11-23 10:38:24','2018-11-23 10:38:24','7747759b-61c5-4472-91bd-decbc44f3e74'),(24,3,2,1,1,11,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotswolds\",\"slug\":\"cotswolds\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"49\":{\"4\":{\"type\":\"2\",\"fields\":{\"ctaLabel\":\"Apply Now\",\"ctaUrl\":\"https://clearleftretreats.typeform.com/to/g5O1Ff\"}}},\"35\":\"2019-03-07 00:00:00\",\"74\":{\"17\":{\"type\":\"8\",\"fields\":{\"mastheadTitle\":\"Join your peers at our Design Leadership Retreat and hone your Leadership skills\",\"mastheadImage\":[]}}},\"48\":{\"5\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionTitle\":\"What can you expect?\"}},\"6\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>\"}},\"7\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionTitle\":\"Who is it for?\"}},\"8\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"9\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>\",\"secondColumn\":\"<ul><li>You have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work.</li><li>You have been looking for opportunities to be part of a group of peers for mentoring and support; to share experiences and learn from one another’s stories.</li><li>You need to pause, reflect and reconnect with your own sense of purpose as a leader, in order to be able to lead others.</li></ul>\"}}}}}},\"67\":{\"11\":{\"type\":\"7\",\"fields\":{\"footerTitle\":\"Join us in the Cotswolds.\",\"footerContent\":\"<p>If you’d be interested in booking a place on this retreat please pencil the dates in your calendar and apply here — we’ll send you further information by Monday 7th January.</p>\\n<p>If you think of someone else that it would be appropriate to invite, please let us know and we can invite them along.</p>\"}}},\"34\":\"2019-03-04 00:00:00\",\"77\":{\"18\":{\"type\":\"9\",\"fields\":{\"themeMain\":\"#b88800\",\"themeAccent\":\"#644094\",\"themeTextDark\":\"#727272\",\"themeTextLight\":\"#767676\",\"themeLight\":\"#ffffff\",\"themeDark\":\"#0f0f0f\",\"themeMuted\":\"#f8f8f8\"}}},\"73\":\"1995\",\"63\":{\"10\":{\"type\":\"6\",\"fields\":{\"venueName\":\"Rectory Hotel\",\"venueLocation\":\"Crudwell\",\"venueAddress\":\"Rectory Hotel, Crudwell, The Cotswolds\",\"venueUrl\":\"http://therectoryhotel.com/\"}}}}}','2018-11-23 10:38:50','2018-11-23 10:38:50','37817d41-b203-4d91-8a61-a226328946f9'),(25,3,2,1,1,12,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotswolds\",\"slug\":\"cotswolds\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"49\":{\"4\":{\"type\":\"2\",\"fields\":{\"ctaLabel\":\"Apply Now\",\"ctaUrl\":\"https://clearleftretreats.typeform.com/to/g5O1Ff\"}}},\"35\":\"2019-03-07 00:00:00\",\"74\":{\"17\":{\"type\":\"8\",\"fields\":{\"mastheadTitle\":\"Join your peers at our Design Leadership Retreat and hone your Leadership skills\",\"mastheadImage\":[]}}},\"48\":{\"5\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionTitle\":\"What can you expect?\"}},\"6\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>\"}},\"7\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionTitle\":\"Who is it for?\"}},\"8\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"9\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>\",\"secondColumn\":\"<ul><li>You have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work.</li><li>You have been looking for opportunities to be part of a group of peers for mentoring and support; to share experiences and learn from one another’s stories.</li><li>You need to pause, reflect and reconnect with your own sense of purpose as a leader, in order to be able to lead others.</li></ul>\"}}}}},\"19\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionTitle\":\"By the end of this retreat\"}},\"20\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>You’ll return to your work refreshed, inspired with increased energy and resilience, buoyed by your deeper connection to this community of design leaders. Hopefully having formed connections that will be long-lasting throughout your career.</p>\"}}},\"67\":{\"11\":{\"type\":\"7\",\"fields\":{\"footerTitle\":\"Join us in the Cotswolds.\",\"footerContent\":\"<p>If you’d be interested in booking a place on this retreat please pencil the dates in your calendar and apply here — we’ll send you further information by Monday 7th January.</p>\\n<p>If you think of someone else that it would be appropriate to invite, please let us know and we can invite them along.</p>\"}}},\"34\":\"2019-03-04 00:00:00\",\"77\":{\"18\":{\"type\":\"9\",\"fields\":{\"themeMain\":\"#b88800\",\"themeAccent\":\"#644094\",\"themeTextDark\":\"#727272\",\"themeTextLight\":\"#767676\",\"themeLight\":\"#ffffff\",\"themeDark\":\"#0f0f0f\",\"themeMuted\":\"#f8f8f8\"}}},\"73\":\"1995\",\"63\":{\"10\":{\"type\":\"6\",\"fields\":{\"venueName\":\"Rectory Hotel\",\"venueLocation\":\"Crudwell\",\"venueAddress\":\"Rectory Hotel, Crudwell, The Cotswolds\",\"venueUrl\":\"http://therectoryhotel.com/\"}}}}}','2018-11-23 10:50:35','2018-11-23 10:50:35','d2ad2dad-4b4a-4657-a25f-d55ba102cd85'),(26,3,2,1,1,13,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotswolds\",\"slug\":\"cotswolds\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"49\":{\"4\":{\"type\":\"2\",\"fields\":{\"ctaLabel\":\"Apply Now\",\"ctaUrl\":\"https://clearleftretreats.typeform.com/to/g5O1Ff\"}}},\"35\":\"2019-03-07 00:00:00\",\"74\":{\"17\":{\"type\":\"8\",\"fields\":{\"mastheadTitle\":\"Join your peers at our Design Leadership Retreat and hone your Leadership skills\",\"mastheadImage\":[]}}},\"48\":{\"5\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":null,\"sectionTitle\":\"What can you expect?\"}},\"6\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>\"}},\"7\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":null,\"sectionTitle\":\"Who is it for?\"}},\"8\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"9\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>\",\"secondColumn\":\"<ul><li>You have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work.</li><li>You have been looking for opportunities to be part of a group of peers for mentoring and support; to share experiences and learn from one another’s stories.</li><li>You need to pause, reflect and reconnect with your own sense of purpose as a leader, in order to be able to lead others.</li></ul>\"}}}}},\"19\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":null,\"sectionTitle\":\"By the end of this retreat\"}},\"20\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>You’ll return to your work refreshed, inspired with increased energy and resilience, buoyed by your deeper connection to this community of design leaders. Hopefully having formed connections that will be long-lasting throughout your career.</p>\"}}},\"67\":{\"11\":{\"type\":\"7\",\"fields\":{\"footerTitle\":\"Join us in the Cotswolds.\",\"footerContent\":\"<p>If you’d be interested in booking a place on this retreat please pencil the dates in your calendar and apply here — we’ll send you further information by Monday 7th January.</p>\\n<p>If you think of someone else that it would be appropriate to invite, please let us know and we can invite them along.</p>\"}}},\"34\":\"2019-03-04 00:00:00\",\"77\":{\"18\":{\"type\":\"9\",\"fields\":{\"themeMain\":\"#b88800\",\"themeAccent\":\"#644094\",\"themeTextDark\":\"#727272\",\"themeTextLight\":\"#767676\",\"themeLight\":\"#ffffff\",\"themeDark\":\"#0f0f0f\",\"themeMuted\":\"#f8f8f8\"}}},\"73\":\"1995\",\"63\":{\"10\":{\"type\":\"6\",\"fields\":{\"venueName\":\"Rectory Hotel\",\"venueLocation\":\"Crudwell\",\"venueAddress\":\"Rectory Hotel, Crudwell, The Cotswolds\",\"venueUrl\":\"http://therectoryhotel.com/\"}}}}}','2018-11-23 11:05:58','2018-11-23 11:05:58','0e1369f5-b1b7-4db1-baba-07c2aecc2206'),(27,3,2,1,1,14,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotswolds\",\"slug\":\"cotswolds\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"49\":{\"4\":{\"type\":\"2\",\"fields\":{\"ctaLabel\":\"Apply Now\",\"ctaUrl\":\"https://clearleftretreats.typeform.com/to/g5O1Ff\"}}},\"35\":\"2019-03-07 00:00:00\",\"74\":{\"17\":{\"type\":\"8\",\"fields\":{\"mastheadTitle\":\"Join your peers at our Design Leadership Retreat and hone your Leadership skills\",\"mastheadImage\":[]}}},\"48\":{\"5\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":null,\"sectionTitle\":\"What can you expect?\"}},\"6\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>\"}},\"7\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"Who is it for?\"}},\"8\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"9\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>\",\"secondColumn\":\"<ul><li>You have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work.</li><li>You have been looking for opportunities to be part of a group of peers for mentoring and support; to share experiences and learn from one another’s stories.</li><li>You need to pause, reflect and reconnect with your own sense of purpose as a leader, in order to be able to lead others.</li></ul>\"}}}}},\"19\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"By the end of this retreat\"}},\"20\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>You’ll return to your work refreshed, inspired with increased energy and resilience, buoyed by your deeper connection to this community of design leaders. Hopefully having formed connections that will be long-lasting throughout your career.</p>\"}}},\"67\":{\"11\":{\"type\":\"7\",\"fields\":{\"footerTitle\":\"Join us in the Cotswolds.\",\"footerContent\":\"<p>If you’d be interested in booking a place on this retreat please pencil the dates in your calendar and apply here — we’ll send you further information by Monday 7th January.</p>\\n<p>If you think of someone else that it would be appropriate to invite, please let us know and we can invite them along.</p>\"}}},\"34\":\"2019-03-04 00:00:00\",\"77\":{\"18\":{\"type\":\"9\",\"fields\":{\"themeMain\":\"#b88800\",\"themeAccent\":\"#644094\",\"themeTextDark\":\"#727272\",\"themeTextLight\":\"#767676\",\"themeLight\":\"#ffffff\",\"themeDark\":\"#0f0f0f\",\"themeMuted\":\"#f8f8f8\"}}},\"73\":\"1995\",\"63\":{\"10\":{\"type\":\"6\",\"fields\":{\"venueName\":\"Rectory Hotel\",\"venueLocation\":\"Crudwell\",\"venueAddress\":\"Rectory Hotel, Crudwell, The Cotswolds\",\"venueUrl\":\"http://therectoryhotel.com/\"}}}}}','2018-11-23 11:15:41','2018-11-23 11:15:41','60c8aed7-c266-4841-9085-a20fb738e5ea'),(28,3,2,1,1,15,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotswolds\",\"slug\":\"cotswolds\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"49\":{\"4\":{\"type\":\"2\",\"fields\":{\"ctaLabel\":\"Apply Now\",\"ctaUrl\":\"https://clearleftretreats.typeform.com/to/g5O1Ff\"}}},\"35\":\"2019-03-07 00:00:00\",\"74\":{\"17\":{\"type\":\"8\",\"fields\":{\"mastheadTitle\":\"Join your peers at our Design Leadership Retreat and hone your Leadership skills\",\"mastheadImage\":[]}}},\"48\":{\"5\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":null,\"sectionTitle\":\"What can you expect?\"}},\"6\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>\"}},\"7\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"Who is it for?\"}},\"8\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"9\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>\",\"secondColumn\":\"<ul><li>You have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work.</li><li>You have been looking for opportunities to be part of a group of peers for mentoring and support; to share experiences and learn from one another’s stories.</li><li>You need to pause, reflect and reconnect with your own sense of purpose as a leader, in order to be able to lead others.</li></ul>\"}}}}},\"19\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"By the end of this retreat\"}},\"20\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>You’ll return to your work refreshed, inspired with increased energy and resilience, buoyed by your deeper connection to this community of design leaders. Hopefully having formed connections that will be long-lasting throughout your career.</p>\"}},\"21\":{\"type\":\"subtitle\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"sectionSubtitle\":\"Why the rectory in the Cotswolds?\"}},\"22\":{\"type\":\"textAndImage\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"imageAndTextPanel\":{\"23\":{\"type\":\"4\",\"fields\":{\"text\":\"<p>We’re so excited to host our retreat at the beautiful Rectory hotel — it’s just small enough to make it feel like home, but there is plenty of space for breakout sessions.</p>\\n<p>We’ll relax in this lovely low key country house hotel with its beautiful English garden. Its Georgian proportions and stylish interiors make it an elegant home from home. There will be roaring fires to help us unwind as we we discuss the days learnings.</p>\",\"image\":[]}}}}}},\"67\":{\"11\":{\"type\":\"7\",\"fields\":{\"footerTitle\":\"Join us in the Cotswolds.\",\"footerContent\":\"<p>If you’d be interested in booking a place on this retreat please pencil the dates in your calendar and apply here — we’ll send you further information by Monday 7th January.</p>\\n<p>If you think of someone else that it would be appropriate to invite, please let us know and we can invite them along.</p>\"}}},\"34\":\"2019-03-04 00:00:00\",\"77\":{\"18\":{\"type\":\"9\",\"fields\":{\"themeMain\":\"#b88800\",\"themeAccent\":\"#644094\",\"themeTextDark\":\"#727272\",\"themeTextLight\":\"#767676\",\"themeLight\":\"#ffffff\",\"themeDark\":\"#0f0f0f\",\"themeMuted\":\"#f8f8f8\"}}},\"73\":\"1995\",\"63\":{\"10\":{\"type\":\"6\",\"fields\":{\"venueName\":\"Rectory Hotel\",\"venueLocation\":\"Crudwell\",\"venueAddress\":\"Rectory Hotel, Crudwell, The Cotswolds\",\"venueUrl\":\"http://therectoryhotel.com/\"}}}}}','2018-11-23 11:21:22','2018-11-23 11:21:22','431a6fae-466d-4416-94d2-345fa937a641'),(29,3,2,1,1,16,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotswolds\",\"slug\":\"cotswolds\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"49\":{\"4\":{\"type\":\"2\",\"fields\":{\"ctaLabel\":\"Apply Now\",\"ctaUrl\":\"https://clearleftretreats.typeform.com/to/g5O1Ff\"}}},\"35\":\"2019-03-07 00:00:00\",\"74\":{\"17\":{\"type\":\"8\",\"fields\":{\"mastheadTitle\":\"Join your peers at our Design Leadership Retreat and hone your Leadership skills\",\"mastheadImage\":[\"24\"]}}},\"48\":{\"5\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":null,\"sectionTitle\":\"What can you expect?\"}},\"6\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>\"}},\"32\":{\"type\":\"imagePair\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"imagePair\":{\"33\":{\"type\":\"5\",\"fields\":{\"firstImage\":[\"27\"],\"secondImage\":[\"30\"]}}}}},\"7\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"Who is it for?\"}},\"8\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"9\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>\",\"secondColumn\":\"<ul><li>You have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work.</li><li>You have been looking for opportunities to be part of a group of peers for mentoring and support; to share experiences and learn from one another’s stories.</li><li>You need to pause, reflect and reconnect with your own sense of purpose as a leader, in order to be able to lead others.</li></ul>\"}}}}},\"34\":{\"type\":\"imagePair\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"imagePair\":{\"35\":{\"type\":\"5\",\"fields\":{\"firstImage\":[\"31\"],\"secondImage\":[\"28\"]}}}}},\"36\":{\"type\":\"singleImage\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"image\":[\"25\"]}},\"19\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"By the end of this retreat\"}},\"20\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>You’ll return to your work refreshed, inspired with increased energy and resilience, buoyed by your deeper connection to this community of design leaders. Hopefully having formed connections that will be long-lasting throughout your career.</p>\"}},\"37\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"38\":{\"type\":\"3\",\"fields\":{\"panelTitle\":\"You will have\",\"firstColumn\":\"<ul><li>Renewed your individual definition of success</li><li>Connected with your values, purpose and sense of joy in your work</li><li>Gained deeper insight into your individual practices as a leader</li><li>Investigated what’s holding you back by challenging your beliefs and assumptions</li></ul>\",\"secondColumn\":\"<ul><li>Shared your stories and techniques and hear from others in your position</li><li>Transformed the way you work so that you can pursue your ambitions</li><li>Established strategies for re-prioritising your work and making changes that last</li></ul>\"}}}}},\"21\":{\"type\":\"subtitle\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"sectionSubtitle\":\"Why the rectory in the Cotswolds?\"}},\"22\":{\"type\":\"textAndImagePanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textAndImagePanel\":{\"23\":{\"type\":\"4\",\"fields\":{\"panelText\":\"<p>We’re so excited to host our retreat at the beautiful Rectory hotel — it’s just small enough to make it feel like home, but there is plenty of space for breakout sessions.</p>\\n<p>We’ll relax in this lovely low key country house hotel with its beautiful English garden. Its Georgian proportions and stylish interiors make it an elegant home from home. There will be roaring fires to help us unwind as we we discuss the days learnings.</p>\",\"panelImage\":[\"29\"]}}}}},\"39\":{\"type\":\"singleImage\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"image\":[\"26\"]}},\"40\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"Ticket information\"}},\"41\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"42\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>This is a small event with very limited tickets, which are by application only. We’ll be in touch to let you know once your place is confirmed.</p>\\n<p>Tickets prices include all workshop sessions, excursions, accomodation and food at The Rectory.</p>\",\"secondColumn\":\"<p>You will be responsible for your own travel to and from the venue, and for any travel insurance needed for your stay.</p><a href=\\\"{entry:13:url}\\\">\\nPlease see our terms and conditions</a>\"}}}}}},\"67\":{\"11\":{\"type\":\"7\",\"fields\":{\"footerTitle\":\"Join us in the Cotswolds.\",\"footerContent\":\"<p>If you’d be interested in booking a place on this retreat please pencil the dates in your calendar and apply here — we’ll send you further information by Monday 7th January.</p>\\n<p>If you think of someone else that it would be appropriate to invite, please let us know and we can invite them along.</p>\"}}},\"34\":\"2019-03-04 00:00:00\",\"77\":{\"18\":{\"type\":\"9\",\"fields\":{\"themeMain\":\"#b88800\",\"themeAccent\":\"#644094\",\"themeTextDark\":\"#727272\",\"themeTextLight\":\"#767676\",\"themeLight\":\"#ffffff\",\"themeDark\":\"#0f0f0f\",\"themeMuted\":\"#f8f8f8\"}}},\"73\":\"1995\",\"63\":{\"10\":{\"type\":\"6\",\"fields\":{\"venueName\":\"Rectory Hotel\",\"venueLocation\":\"Crudwell\",\"venueAddress\":\"Rectory Hotel, Crudwell, The Cotswolds\",\"venueUrl\":\"http://therectoryhotel.com/\"}}}}}','2018-11-23 16:53:44','2018-11-23 16:53:44','fb84918a-e8f8-49fe-9fef-4b795cc41d4d'),(30,3,2,1,1,17,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotswolds\",\"slug\":\"cotswolds\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"49\":{\"4\":{\"type\":\"2\",\"fields\":{\"ctaLabel\":\"Apply Now\",\"ctaUrl\":\"https://clearleftretreats.typeform.com/to/g5O1Ff\"}}},\"35\":\"2019-03-07 00:00:00\",\"74\":{\"17\":{\"type\":\"8\",\"fields\":{\"mastheadTitle\":\"Join your peers at our Design Leadership Retreat and hone your Leadership skills\",\"mastheadImage\":[\"24\"]}}},\"48\":{\"5\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":null,\"sectionTitle\":\"What can you expect?\"}},\"6\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>\"}},\"32\":{\"type\":\"imagePair\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"imagePair\":{\"33\":{\"type\":\"5\",\"fields\":{\"firstImage\":[\"27\"],\"secondImage\":[\"30\"]}}}}},\"7\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"Who is it for?\"}},\"8\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"9\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>\",\"secondColumn\":\"<ul><li>You have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work.</li><li>You have been looking for opportunities to be part of a group of peers for mentoring and support; to share experiences and learn from one another’s stories.</li><li>You need to pause, reflect and reconnect with your own sense of purpose as a leader, in order to be able to lead others.</li></ul>\"}}}}},\"34\":{\"type\":\"imagePair\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"imagePair\":{\"35\":{\"type\":\"5\",\"fields\":{\"firstImage\":[\"31\"],\"secondImage\":[\"28\"]}}}}},\"36\":{\"type\":\"singleImage\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"image\":[\"25\"]}},\"19\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"By the end of this retreat\"}},\"20\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>You’ll return to your work refreshed, inspired with increased energy and resilience, buoyed by your deeper connection to this community of design leaders. Hopefully having formed connections that will be long-lasting throughout your career.</p>\"}},\"37\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"38\":{\"type\":\"3\",\"fields\":{\"panelTitle\":\"You will have\",\"firstColumn\":\"<ul><li>Renewed your individual definition of success</li><li>Connected with your values, purpose and sense of joy in your work</li><li>Gained deeper insight into your individual practices as a leader</li><li>Investigated what’s holding you back by challenging your beliefs and assumptions</li></ul>\",\"secondColumn\":\"<ul><li>Shared your stories and techniques and hear from others in your position</li><li>Transformed the way you work so that you can pursue your ambitions</li><li>Established strategies for re-prioritising your work and making changes that last</li></ul>\"}}}}},\"21\":{\"type\":\"subtitle\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"sectionSubtitle\":\"Why the rectory in the Cotswolds?\"}},\"22\":{\"type\":\"textAndImagePanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textAndImagePanel\":{\"23\":{\"type\":\"4\",\"fields\":{\"panelText\":\"<p>We’re so excited to host our retreat at the beautiful Rectory hotel — it’s just small enough to make it feel like home, but there is plenty of space for breakout sessions.</p>\\n<p>We’ll relax in this lovely low key country house hotel with its beautiful English garden. Its Georgian proportions and stylish interiors make it an elegant home from home. There will be roaring fires to help us unwind as we we discuss the days learnings.</p>\",\"panelImage\":[\"29\"]}}}}},\"39\":{\"type\":\"singleImage\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"image\":[\"26\"]}},\"40\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"Ticket information\"}},\"41\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"42\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>This is a small event with very limited tickets, which are by application only. We’ll be in touch to let you know once your place is confirmed.</p>\\n<p>Tickets prices include all workshop sessions, excursions, accomodation and food at The Rectory.</p>\",\"secondColumn\":\"<p>You will be responsible for your own travel to and from the venue, and for any travel insurance needed for your stay.</p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p><a href=\\\"{entry:13:url}\\\">\\n</a><p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\">Please see our terms and conditions</a></p>\"}}}}}},\"67\":{\"11\":{\"type\":\"7\",\"fields\":{\"footerTitle\":\"Join us in the Cotswolds.\",\"footerContent\":\"<p>If you’d be interested in booking a place on this retreat please pencil the dates in your calendar and apply here — we’ll send you further information by Monday 7th January.</p>\\n<p>If you think of someone else that it would be appropriate to invite, please let us know and we can invite them along.</p>\"}}},\"87\":{\"44\":{\"type\":\"10\",\"fields\":{\"sponsorLogo\":[\"43\"],\"sponsorBlurb\":\"<p>We\'re thrilled that InVision are joining us for this groundbreaking retreat — they\'re the world’s leading product design collaboration platform empowering teams of all sizes to prototype, review, iterate, manage and test web and mobile products — all without a single line of code. Founded in 2011 and headquartered in New York City, InVision helps millions of designers at companies like Disney, Netflix and Twitter unlock the power of design-driven product development. You can visit them <a href=\\\"https://www.invisionapp.com/\\\">here.</a></p>\"}}},\"34\":\"2019-03-04 00:00:00\",\"77\":{\"18\":{\"type\":\"9\",\"fields\":{\"themeMain\":\"#b88800\",\"themeAccent\":\"#644094\",\"themeTextDark\":\"#727272\",\"themeTextLight\":\"#767676\",\"themeLight\":\"#ffffff\",\"themeDark\":\"#0f0f0f\",\"themeMuted\":\"#f8f8f8\"}}},\"73\":\"1995\",\"90\":[],\"63\":{\"10\":{\"type\":\"6\",\"fields\":{\"venueName\":\"Rectory Hotel\",\"venueLocation\":\"Crudwell\",\"venueAddress\":\"Rectory Hotel, Crudwell, The Cotswolds\",\"venueUrl\":\"http://therectoryhotel.com/\"}}}}}','2018-11-23 18:24:21','2018-11-23 18:24:21','7bedb31a-1f62-4383-b0ee-5a10cdb61c6b'),(31,3,2,1,1,18,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotswolds\",\"slug\":\"cotswolds\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"49\":{\"4\":{\"type\":\"2\",\"fields\":{\"ctaLabel\":\"Apply Now\",\"ctaUrl\":\"https://clearleftretreats.typeform.com/to/g5O1Ff\"}}},\"35\":\"2019-03-07 00:00:00\",\"74\":{\"17\":{\"type\":\"8\",\"fields\":{\"mastheadTitle\":\"Join your peers at our Design Leadership Retreat and hone your Leadership skills\",\"mastheadImage\":[\"24\"]}}},\"48\":{\"5\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":null,\"sectionTitle\":\"What can you expect?\"}},\"6\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>\"}},\"32\":{\"type\":\"imagePair\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"imagePair\":{\"33\":{\"type\":\"5\",\"fields\":{\"firstImage\":[\"27\"],\"secondImage\":[\"30\"]}}}}},\"7\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"Who is it for?\"}},\"8\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"9\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>\",\"secondColumn\":\"<ul><li>You have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work.</li><li>You have been looking for opportunities to be part of a group of peers for mentoring and support; to share experiences and learn from one another’s stories.</li><li>You need to pause, reflect and reconnect with your own sense of purpose as a leader, in order to be able to lead others.</li></ul>\"}}}}},\"34\":{\"type\":\"imagePair\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"imagePair\":{\"35\":{\"type\":\"5\",\"fields\":{\"firstImage\":[\"31\"],\"secondImage\":[\"28\"]}}}}},\"36\":{\"type\":\"singleImage\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"image\":[\"25\"]}},\"19\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"By the end of this retreat\"}},\"20\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>You’ll return to your work refreshed, inspired with increased energy and resilience, buoyed by your deeper connection to this community of design leaders. Hopefully having formed connections that will be long-lasting throughout your career.</p>\"}},\"37\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"38\":{\"type\":\"3\",\"fields\":{\"panelTitle\":\"You will have\",\"firstColumn\":\"<ul><li>Renewed your individual definition of success</li><li>Connected with your values, purpose and sense of joy in your work</li><li>Gained deeper insight into your individual practices as a leader</li><li>Investigated what’s holding you back by challenging your beliefs and assumptions</li></ul>\",\"secondColumn\":\"<ul><li>Shared your stories and techniques and hear from others in your position</li><li>Transformed the way you work so that you can pursue your ambitions</li><li>Established strategies for re-prioritising your work and making changes that last</li></ul>\"}}}}},\"21\":{\"type\":\"subtitle\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"sectionSubtitle\":\"Why the rectory in the Cotswolds?\"}},\"22\":{\"type\":\"textAndImagePanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textAndImagePanel\":{\"23\":{\"type\":\"4\",\"fields\":{\"panelText\":\"<p>We’re so excited to host our retreat at the beautiful Rectory hotel — it’s just small enough to make it feel like home, but there is plenty of space for breakout sessions.</p>\\n<p>We’ll relax in this lovely low key country house hotel with its beautiful English garden. Its Georgian proportions and stylish interiors make it an elegant home from home. There will be roaring fires to help us unwind as we we discuss the days learnings.</p>\",\"panelImage\":[\"29\"]}}}}},\"39\":{\"type\":\"singleImage\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"image\":[\"26\"]}},\"40\":{\"type\":\"slat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"Ticket information\"}},\"41\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"42\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>This is a small event with very limited tickets, which are by application only. We’ll be in touch to let you know once your place is confirmed.</p>\\n<p>Tickets prices include all workshop sessions, excursions, accomodation and food at The Rectory.</p>\",\"secondColumn\":\"<p>You will be responsible for your own travel to and from the venue, and for any travel insurance needed for your stay.</p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p><a href=\\\"{entry:13:url}\\\">\\n</a><p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\">Please see our terms and conditions</a></p>\"}}}}}},\"67\":{\"11\":{\"type\":\"7\",\"fields\":{\"footerTitle\":\"Join us in the Cotswolds.\",\"footerContent\":\"<p>If you’d be interested in booking a place on this retreat please pencil the dates in your calendar and apply here — we’ll send you further information by Monday 7th January.</p>\\n<p>If you think of someone else that it would be appropriate to invite, please let us know and we can invite them along.</p>\"}}},\"87\":{\"44\":{\"type\":\"10\",\"fields\":{\"sponsorName\":\"Invision\",\"sponsorBlurb\":\"<p>We\'re thrilled that InVision are joining us for this groundbreaking retreat — they\'re the world’s leading product design collaboration platform empowering teams of all sizes to prototype, review, iterate, manage and test web and mobile products — all without a single line of code. Founded in 2011 and headquartered in New York City, InVision helps millions of designers at companies like Disney, Netflix and Twitter unlock the power of design-driven product development. You can visit them <a href=\\\"https://www.invisionapp.com/\\\">here.</a></p>\",\"sponsorLogo\":[\"43\"],\"sponsorUrl\":\"https://www.invisionapp.com/\"}}},\"34\":\"2019-03-04 00:00:00\",\"77\":{\"18\":{\"type\":\"9\",\"fields\":{\"themeMain\":\"#b88800\",\"themeAccent\":\"#644094\",\"themeTextDark\":\"#727272\",\"themeTextLight\":\"#767676\",\"themeLight\":\"#ffffff\",\"themeDark\":\"#0f0f0f\",\"themeMuted\":\"#f8f8f8\"}}},\"73\":\"1995\",\"90\":[],\"63\":{\"10\":{\"type\":\"6\",\"fields\":{\"venueName\":\"Rectory Hotel\",\"venueLocation\":\"Crudwell\",\"venueAddress\":\"Rectory Hotel, Crudwell, The Cotswolds\",\"venueUrl\":\"http://therectoryhotel.com/\"}}}}}','2018-11-23 18:36:41','2018-11-23 18:36:41','3f41de69-754d-486c-90be-10a2ebd3a8ff'),(32,3,2,1,1,19,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotswolds\",\"slug\":\"cotswolds\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"49\":{\"4\":{\"type\":\"2\",\"fields\":{\"ctaLabel\":\"Apply Now\",\"ctaUrl\":\"https://clearleftretreats.typeform.com/to/g5O1Ff\"}}},\"35\":\"2019-03-07 00:00:00\",\"74\":{\"17\":{\"type\":\"8\",\"fields\":{\"mastheadTitle\":\"Join your peers at our Design Leadership Retreat and hone your Leadership skills\",\"mastheadImage\":[\"24\"]}}},\"48\":{\"5\":{\"type\":\"contentSlat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":null,\"sectionTitle\":\"What can you expect?\"}},\"6\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>\"}},\"32\":{\"type\":\"imagePair\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"imagePair\":{\"33\":{\"type\":\"5\",\"fields\":{\"firstImage\":[\"27\"],\"secondImage\":[\"30\"]}}}}},\"7\":{\"type\":\"contentSlat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"Who is it for?\"}},\"8\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"9\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>\",\"secondColumn\":\"<ul><li>You have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work.</li><li>You have been looking for opportunities to be part of a group of peers for mentoring and support; to share experiences and learn from one another’s stories.</li><li>You need to pause, reflect and reconnect with your own sense of purpose as a leader, in order to be able to lead others.</li></ul>\"}}}}},\"34\":{\"type\":\"imagePair\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"imagePair\":{\"35\":{\"type\":\"5\",\"fields\":{\"firstImage\":[\"31\"],\"secondImage\":[\"28\"]}}}}},\"45\":{\"type\":\"heroSlat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"image\":[\"25\"]}},\"19\":{\"type\":\"contentSlat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"By the end of this retreat\"}},\"20\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>You’ll return to your work refreshed, inspired with increased energy and resilience, buoyed by your deeper connection to this community of design leaders. Hopefully having formed connections that will be long-lasting throughout your career.</p>\"}},\"37\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"38\":{\"type\":\"3\",\"fields\":{\"panelTitle\":\"You will have\",\"firstColumn\":\"<ul><li>Renewed your individual definition of success</li><li>Connected with your values, purpose and sense of joy in your work</li><li>Gained deeper insight into your individual practices as a leader</li><li>Investigated what’s holding you back by challenging your beliefs and assumptions</li></ul>\",\"secondColumn\":\"<ul><li>Shared your stories and techniques and hear from others in your position</li><li>Transformed the way you work so that you can pursue your ambitions</li><li>Established strategies for re-prioritising your work and making changes that last</li></ul>\"}}}}},\"21\":{\"type\":\"subtitle\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"sectionSubtitle\":\"Why the rectory in the Cotswolds?\"}},\"22\":{\"type\":\"textAndImagePanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textAndImagePanel\":{\"23\":{\"type\":\"4\",\"fields\":{\"panelText\":\"<p>We’re so excited to host our retreat at the beautiful Rectory hotel — it’s just small enough to make it feel like home, but there is plenty of space for breakout sessions.</p>\\n<p>We’ll relax in this lovely low key country house hotel with its beautiful English garden. Its Georgian proportions and stylish interiors make it an elegant home from home. There will be roaring fires to help us unwind as we we discuss the days learnings.</p>\",\"panelImage\":[\"29\"]}}}}},\"46\":{\"type\":\"heroSlat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"image\":[\"26\"]}},\"40\":{\"type\":\"contentSlat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"Ticket information\"}},\"41\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"42\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>This is a small event with very limited tickets, which are by application only. We’ll be in touch to let you know once your place is confirmed.</p>\\n<p>Tickets prices include all workshop sessions, excursions, accomodation and food at The Rectory.</p>\",\"secondColumn\":\"<p>You will be responsible for your own travel to and from the venue, and for any travel insurance needed for your stay.</p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p><a href=\\\"{entry:13:url}\\\">\\n</a><p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\">Please see our terms and conditions</a></p>\"}}}}}},\"67\":{\"11\":{\"type\":\"7\",\"fields\":{\"footerTitle\":\"Join us in the Cotswolds.\",\"footerContent\":\"<p>If you’d be interested in booking a place on this retreat please pencil the dates in your calendar and apply here — we’ll send you further information by Monday 7th January.</p>\\n<p>If you think of someone else that it would be appropriate to invite, please let us know and we can invite them along.</p>\"}}},\"87\":{\"44\":{\"type\":\"10\",\"fields\":{\"sponsorName\":\"Invision\",\"sponsorBlurb\":\"<p>We\'re thrilled that InVision are joining us for this groundbreaking retreat — they\'re the world’s leading product design collaboration platform empowering teams of all sizes to prototype, review, iterate, manage and test web and mobile products — all without a single line of code. Founded in 2011 and headquartered in New York City, InVision helps millions of designers at companies like Disney, Netflix and Twitter unlock the power of design-driven product development. You can visit them <a href=\\\"https://www.invisionapp.com/\\\">here.</a></p>\",\"sponsorLogo\":[\"43\"],\"sponsorUrl\":\"https://www.invisionapp.com/\"}}},\"34\":\"2019-03-04 00:00:00\",\"77\":{\"18\":{\"type\":\"9\",\"fields\":{\"themeMain\":\"#b88800\",\"themeAccent\":\"#644094\",\"themeTextDark\":\"#727272\",\"themeTextLight\":\"#767676\",\"themeLight\":\"#ffffff\",\"themeDark\":\"#0f0f0f\",\"themeMuted\":\"#f8f8f8\"}}},\"73\":\"1995\",\"90\":[],\"63\":{\"10\":{\"type\":\"6\",\"fields\":{\"venueName\":\"Rectory Hotel\",\"venueLocation\":\"Crudwell\",\"venueAddress\":\"Rectory Hotel, Crudwell, The Cotswolds\",\"venueUrl\":\"http://therectoryhotel.com/\"}}}}}','2018-11-23 18:56:42','2018-11-23 18:56:42','4b8ffe64-a1cb-4d60-8a9d-7b022920f301'),(33,3,2,1,1,20,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotswolds\",\"slug\":\"cotswolds\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"49\":{\"4\":{\"type\":\"2\",\"fields\":{\"ctaLabel\":\"Apply Now\",\"ctaUrl\":\"https://clearleftretreats.typeform.com/to/g5O1Ff\"}}},\"101\":{\"47\":{\"type\":\"13\",\"fields\":{\"slatStyle\":null,\"slatContents\":{\"48\":{\"type\":\"slatTitle\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"text\":\"What can you expect?\"}},\"49\":{\"type\":\"prose\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"text\":\"<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>\"}}}}}},\"35\":\"2019-03-07 00:00:00\",\"74\":{\"17\":{\"type\":\"8\",\"fields\":{\"mastheadTitle\":\"Join your peers at our Design Leadership Retreat and hone your Leadership skills\",\"mastheadImage\":[\"24\"]}}},\"48\":{\"5\":{\"type\":\"contentSlat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":null,\"sectionTitle\":\"What can you expect?\"}},\"6\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>\"}},\"32\":{\"type\":\"imagePair\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"imagePair\":{\"33\":{\"type\":\"5\",\"fields\":{\"firstImage\":[\"27\"],\"secondImage\":[\"30\"]}}}}},\"7\":{\"type\":\"contentSlat\",\"enabled\":true,\"collapsed\":true,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"Who is it for?\"}},\"8\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"9\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>\",\"secondColumn\":\"<ul><li>You have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work.</li><li>You have been looking for opportunities to be part of a group of peers for mentoring and support; to share experiences and learn from one another’s stories.</li><li>You need to pause, reflect and reconnect with your own sense of purpose as a leader, in order to be able to lead others.</li></ul>\"}}}}},\"34\":{\"type\":\"imagePair\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"imagePair\":{\"35\":{\"type\":\"5\",\"fields\":{\"firstImage\":[\"31\"],\"secondImage\":[\"28\"]}}}}},\"45\":{\"type\":\"heroSlat\",\"enabled\":true,\"collapsed\":true,\"level\":\"1\",\"fields\":{\"image\":[\"25\"]}},\"19\":{\"type\":\"contentSlat\",\"enabled\":true,\"collapsed\":true,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"By the end of this retreat\"}},\"20\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>You’ll return to your work refreshed, inspired with increased energy and resilience, buoyed by your deeper connection to this community of design leaders. Hopefully having formed connections that will be long-lasting throughout your career.</p>\"}},\"37\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"38\":{\"type\":\"3\",\"fields\":{\"panelTitle\":\"You will have\",\"firstColumn\":\"<ul><li>Renewed your individual definition of success</li><li>Connected with your values, purpose and sense of joy in your work</li><li>Gained deeper insight into your individual practices as a leader</li><li>Investigated what’s holding you back by challenging your beliefs and assumptions</li></ul>\",\"secondColumn\":\"<ul><li>Shared your stories and techniques and hear from others in your position</li><li>Transformed the way you work so that you can pursue your ambitions</li><li>Established strategies for re-prioritising your work and making changes that last</li></ul>\"}}}}},\"21\":{\"type\":\"subtitle\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"sectionSubtitle\":\"Why the rectory in the Cotswolds?\"}},\"22\":{\"type\":\"textAndImagePanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textAndImagePanel\":{\"23\":{\"type\":\"4\",\"fields\":{\"panelText\":\"<p>We’re so excited to host our retreat at the beautiful Rectory hotel — it’s just small enough to make it feel like home, but there is plenty of space for breakout sessions.</p>\\n<p>We’ll relax in this lovely low key country house hotel with its beautiful English garden. Its Georgian proportions and stylish interiors make it an elegant home from home. There will be roaring fires to help us unwind as we we discuss the days learnings.</p>\",\"panelImage\":[\"29\"]}}}}},\"46\":{\"type\":\"heroSlat\",\"enabled\":true,\"collapsed\":true,\"level\":\"1\",\"fields\":{\"image\":[\"26\"]}},\"40\":{\"type\":\"contentSlat\",\"enabled\":true,\"collapsed\":true,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"Ticket information\"}},\"41\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"42\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>This is a small event with very limited tickets, which are by application only. We’ll be in touch to let you know once your place is confirmed.</p>\\n<p>Tickets prices include all workshop sessions, excursions, accomodation and food at The Rectory.</p>\",\"secondColumn\":\"<p>You will be responsible for your own travel to and from the venue, and for any travel insurance needed for your stay.</p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p><a href=\\\"{entry:13:url}\\\">\\n</a><p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\">Please see our terms and conditions</a></p>\"}}}}}},\"67\":{\"11\":{\"type\":\"7\",\"fields\":{\"footerTitle\":\"Join us in the Cotswolds.\",\"footerContent\":\"<p>If you’d be interested in booking a place on this retreat please pencil the dates in your calendar and apply here — we’ll send you further information by Monday 7th January.</p>\\n<p>If you think of someone else that it would be appropriate to invite, please let us know and we can invite them along.</p>\"}}},\"87\":{\"44\":{\"type\":\"10\",\"fields\":{\"sponsorName\":\"Invision\",\"sponsorBlurb\":\"<p>We\'re thrilled that InVision are joining us for this groundbreaking retreat — they\'re the world’s leading product design collaboration platform empowering teams of all sizes to prototype, review, iterate, manage and test web and mobile products — all without a single line of code. Founded in 2011 and headquartered in New York City, InVision helps millions of designers at companies like Disney, Netflix and Twitter unlock the power of design-driven product development. You can visit them <a href=\\\"https://www.invisionapp.com/\\\">here.</a></p>\",\"sponsorLogo\":[\"43\"],\"sponsorUrl\":\"https://www.invisionapp.com/\"}}},\"34\":\"2019-03-04 00:00:00\",\"77\":{\"18\":{\"type\":\"9\",\"fields\":{\"themeMain\":\"#b88800\",\"themeAccent\":\"#644094\",\"themeTextDark\":\"#727272\",\"themeTextLight\":\"#767676\",\"themeLight\":\"#ffffff\",\"themeDark\":\"#0f0f0f\",\"themeMuted\":\"#f8f8f8\"}}},\"73\":\"1995\",\"90\":[],\"63\":{\"10\":{\"type\":\"6\",\"fields\":{\"venueName\":\"Rectory Hotel\",\"venueLocation\":\"Crudwell\",\"venueAddress\":\"Rectory Hotel, Crudwell, The Cotswolds\",\"venueUrl\":\"http://therectoryhotel.com/\"}}}}}','2018-11-25 10:27:00','2018-11-25 10:27:00','9a020bc7-7c39-4bd4-8412-28ea2b2dfe03'),(34,3,2,1,1,21,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Cotswolds\",\"slug\":\"cotswolds\",\"postDate\":1541695800,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"49\":{\"4\":{\"type\":\"2\",\"fields\":{\"ctaLabel\":\"Apply Now\",\"ctaUrl\":\"https://clearleftretreats.typeform.com/to/g5O1Ff\"}}},\"101\":{\"47\":{\"type\":\"13\",\"fields\":{\"slatStyle\":null,\"slatContents\":{\"48\":{\"type\":\"slatTitle\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"text\":\"What can you expect?\"}},\"49\":{\"type\":\"prose\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"text\":\"<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>\"}},\"50\":{\"type\":\"imagePair\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"firstImage\":[\"27\"],\"secondImage\":[\"30\"]}}}}},\"51\":{\"type\":\"13\",\"fields\":{\"slatStyle\":\"muted\",\"slatContents\":{\"52\":{\"type\":\"slatTitle\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"text\":\"Who is it for?\"}},\"53\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"panelTitle\":null,\"textFirst\":\"<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>\",\"textSecond\":\"<ul><li>You have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work.</li><li>You have been looking for opportunities to be part of a group of peers for mentoring and support; to share experiences and learn from one another’s stories.</li><li>You need to pause, reflect and reconnect with your own sense of purpose as a leader, in order to be able to lead others.</li></ul>\"}},\"54\":{\"type\":\"imagePair\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"firstImage\":[\"31\"],\"secondImage\":[\"28\"]}}}}},\"55\":{\"type\":\"13\",\"fields\":{\"slatStyle\":\"muted\",\"slatContents\":{\"56\":{\"type\":\"heroImage\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"image\":[\"25\"]}}}}},\"57\":{\"type\":\"13\",\"fields\":{\"slatStyle\":\"muted\",\"slatContents\":{\"58\":{\"type\":\"slatTitle\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"text\":\"By the end of this retreat\"}},\"59\":{\"type\":\"prose\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"text\":\"<p>You’ll return to your work refreshed, inspired with increased energy and resilience, buoyed by your deeper connection to this community of design leaders. Hopefully having formed connections that will be long-lasting throughout your career.</p>\"}},\"60\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"panelTitle\":\"You will have\",\"textFirst\":\"<ul><li>Renewed your individual definition of success</li><li>Connected with your values, purpose and sense of joy in your work</li><li>Gained deeper insight into your individual practices as a leader</li><li>Investigated what’s holding you back by challenging your beliefs and assumptions</li></ul>\",\"textSecond\":\"<ul><li>Shared your stories and techniques and hear from others in your position</li><li>Transformed the way you work so that you can pursue your ambitions</li><li>Established strategies for re-prioritising your work and making changes that last</li></ul>\"}},\"61\":{\"type\":\"subTitle\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"text\":\"Why the Rectory in the Cotswolds?\"}},\"62\":{\"type\":\"textImagePanel\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"text\":\"<p>We’re so excited to host our retreat at the beautiful Rectory hotel — it’s just small enough to make it feel like home, but there is plenty of space for breakout sessions.</p>\\n<p>We’ll relax in this lovely low key country house hotel with its beautiful English garden. Its Georgian proportions and stylish interiors make it an elegant home from home. There will be roaring fires to help us unwind as we we discuss the days learnings.</p>\",\"image\":[\"29\"]}}}}},\"63\":{\"type\":\"13\",\"fields\":{\"slatStyle\":\"muted\",\"slatContents\":{\"64\":{\"type\":\"heroImage\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"image\":[\"26\"]}}}}},\"65\":{\"type\":\"13\",\"fields\":{\"slatStyle\":\"muted\",\"slatContents\":{\"66\":{\"type\":\"slatTitle\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"text\":\"Ticket information\"}},\"67\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"panelTitle\":null,\"textFirst\":\"<p>This is a small event with very limited tickets, which are by application only. We’ll be in touch to let you know once your place is confirmed.</p>\\n<p>Tickets prices include all workshop sessions, excursions, accomodation and food at The Rectory.</p>\",\"textSecond\":\"<p>You will be responsible for your own travel to and from the venue, and for any travel insurance needed for your stay.</p>\\n<p><a href=\\\"{entry:13:url}\\\">Please see our terms and conditions</a></p>\"}}}}}},\"35\":\"2019-03-07 00:00:00\",\"74\":{\"17\":{\"type\":\"8\",\"fields\":{\"mastheadTitle\":\"Join your peers at our Design Leadership Retreat and hone your Leadership skills\",\"mastheadImage\":[\"24\"]}}},\"48\":{\"5\":{\"type\":\"contentSlat\",\"enabled\":true,\"collapsed\":false,\"level\":\"1\",\"fields\":{\"sectionStyle\":null,\"sectionTitle\":\"What can you expect?\"}},\"6\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>\"}},\"32\":{\"type\":\"imagePair\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"imagePair\":{\"33\":{\"type\":\"5\",\"fields\":{\"firstImage\":[\"27\"],\"secondImage\":[\"30\"]}}}}},\"7\":{\"type\":\"contentSlat\",\"enabled\":true,\"collapsed\":true,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"Who is it for?\"}},\"8\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"9\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>\",\"secondColumn\":\"<ul><li>You have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work.</li><li>You have been looking for opportunities to be part of a group of peers for mentoring and support; to share experiences and learn from one another’s stories.</li><li>You need to pause, reflect and reconnect with your own sense of purpose as a leader, in order to be able to lead others.</li></ul>\"}}}}},\"34\":{\"type\":\"imagePair\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"imagePair\":{\"35\":{\"type\":\"5\",\"fields\":{\"firstImage\":[\"31\"],\"secondImage\":[\"28\"]}}}}},\"45\":{\"type\":\"heroSlat\",\"enabled\":true,\"collapsed\":true,\"level\":\"1\",\"fields\":{\"image\":[\"25\"]}},\"19\":{\"type\":\"contentSlat\",\"enabled\":true,\"collapsed\":true,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"By the end of this retreat\"}},\"20\":{\"type\":\"bodyText\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"bodyText\":\"<p>You’ll return to your work refreshed, inspired with increased energy and resilience, buoyed by your deeper connection to this community of design leaders. Hopefully having formed connections that will be long-lasting throughout your career.</p>\"}},\"37\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"38\":{\"type\":\"3\",\"fields\":{\"panelTitle\":\"You will have\",\"firstColumn\":\"<ul><li>Renewed your individual definition of success</li><li>Connected with your values, purpose and sense of joy in your work</li><li>Gained deeper insight into your individual practices as a leader</li><li>Investigated what’s holding you back by challenging your beliefs and assumptions</li></ul>\",\"secondColumn\":\"<ul><li>Shared your stories and techniques and hear from others in your position</li><li>Transformed the way you work so that you can pursue your ambitions</li><li>Established strategies for re-prioritising your work and making changes that last</li></ul>\"}}}}},\"21\":{\"type\":\"subtitle\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"sectionSubtitle\":\"Why the rectory in the Cotswolds?\"}},\"22\":{\"type\":\"textAndImagePanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textAndImagePanel\":{\"23\":{\"type\":\"4\",\"fields\":{\"panelText\":\"<p>We’re so excited to host our retreat at the beautiful Rectory hotel — it’s just small enough to make it feel like home, but there is plenty of space for breakout sessions.</p>\\n<p>We’ll relax in this lovely low key country house hotel with its beautiful English garden. Its Georgian proportions and stylish interiors make it an elegant home from home. There will be roaring fires to help us unwind as we we discuss the days learnings.</p>\",\"panelImage\":[\"29\"]}}}}},\"46\":{\"type\":\"heroSlat\",\"enabled\":true,\"collapsed\":true,\"level\":\"1\",\"fields\":{\"image\":[\"26\"]}},\"40\":{\"type\":\"contentSlat\",\"enabled\":true,\"collapsed\":true,\"level\":\"1\",\"fields\":{\"sectionStyle\":\"muted\",\"sectionTitle\":\"Ticket information\"}},\"41\":{\"type\":\"textPanel\",\"enabled\":true,\"collapsed\":false,\"level\":\"2\",\"fields\":{\"textPanel\":{\"42\":{\"type\":\"3\",\"fields\":{\"panelTitle\":null,\"firstColumn\":\"<p>This is a small event with very limited tickets, which are by application only. We’ll be in touch to let you know once your place is confirmed.</p>\\n<p>Tickets prices include all workshop sessions, excursions, accomodation and food at The Rectory.</p>\",\"secondColumn\":\"<p>You will be responsible for your own travel to and from the venue, and for any travel insurance needed for your stay.</p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p><a href=\\\"{entry:13:url}\\\">\\n</a><p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\"></a></p>\\n<p><a href=\\\"{entry:13:url}\\\">Please see our terms and conditions</a></p>\"}}}}}},\"67\":{\"11\":{\"type\":\"7\",\"fields\":{\"footerTitle\":\"Join us in the Cotswolds.\",\"footerContent\":\"<p>If you’d be interested in booking a place on this retreat please pencil the dates in your calendar and apply here — we’ll send you further information by Monday 7th January.</p>\\n<p>If you think of someone else that it would be appropriate to invite, please let us know and we can invite them along.</p>\"}}},\"87\":{\"44\":{\"type\":\"10\",\"fields\":{\"sponsorName\":\"Invision\",\"sponsorBlurb\":\"<p>We\'re thrilled that InVision are joining us for this groundbreaking retreat — they\'re the world’s leading product design collaboration platform empowering teams of all sizes to prototype, review, iterate, manage and test web and mobile products — all without a single line of code. Founded in 2011 and headquartered in New York City, InVision helps millions of designers at companies like Disney, Netflix and Twitter unlock the power of design-driven product development. You can visit them <a href=\\\"https://www.invisionapp.com/\\\">here.</a></p>\",\"sponsorLogo\":[\"43\"],\"sponsorUrl\":\"https://www.invisionapp.com/\"}}},\"34\":\"2019-03-04 00:00:00\",\"77\":{\"18\":{\"type\":\"9\",\"fields\":{\"themeMain\":\"#b88800\",\"themeAccent\":\"#644094\",\"themeTextDark\":\"#727272\",\"themeTextLight\":\"#767676\",\"themeLight\":\"#ffffff\",\"themeDark\":\"#0f0f0f\",\"themeMuted\":\"#f8f8f8\"}}},\"73\":\"1995\",\"90\":[],\"63\":{\"10\":{\"type\":\"6\",\"fields\":{\"venueName\":\"Rectory Hotel\",\"venueLocation\":\"Crudwell\",\"venueAddress\":\"Rectory Hotel, Crudwell, The Cotswolds\",\"venueUrl\":\"http://therectoryhotel.com/\"}}}}}','2018-11-25 10:41:10','2018-11-25 10:41:10','cefb1d81-aae6-40c2-9aab-c1defb5dba16');
/*!40000 ALTER TABLE `entryversions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fieldgroups`
--

DROP TABLE IF EXISTS `fieldgroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fieldgroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `fieldgroups_name_unq_idx` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fieldgroups`
--

LOCK TABLES `fieldgroups` WRITE;
/*!40000 ALTER TABLE `fieldgroups` DISABLE KEYS */;
INSERT INTO `fieldgroups` VALUES (4,'Content','2018-11-08 16:21:30','2018-11-08 16:21:30','593c1deb-0960-4e84-a7b7-3e94cd2e258f'),(5,'Global','2018-11-08 17:54:38','2018-11-08 17:54:38','fb2527b7-816f-456d-b95e-e68f52075424'),(6,'Assets','2018-11-23 16:23:52','2018-11-23 16:23:52','0324a080-8ff6-43e3-a58f-60cd7a74cb1d');
/*!40000 ALTER TABLE `fieldgroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fieldlayoutfields`
--

DROP TABLE IF EXISTS `fieldlayoutfields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fieldlayoutfields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `layoutId` int(11) NOT NULL,
  `tabId` int(11) NOT NULL,
  `fieldId` int(11) NOT NULL,
  `required` tinyint(1) NOT NULL DEFAULT '0',
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `fieldlayoutfields_layoutId_fieldId_unq_idx` (`layoutId`,`fieldId`),
  KEY `fieldlayoutfields_sortOrder_idx` (`sortOrder`),
  KEY `fieldlayoutfields_tabId_idx` (`tabId`),
  KEY `fieldlayoutfields_fieldId_idx` (`fieldId`),
  CONSTRAINT `fieldlayoutfields_fieldId_fk` FOREIGN KEY (`fieldId`) REFERENCES `fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fieldlayoutfields_layoutId_fk` FOREIGN KEY (`layoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fieldlayoutfields_tabId_fk` FOREIGN KEY (`tabId`) REFERENCES `fieldlayouttabs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=522 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fieldlayoutfields`
--

LOCK TABLES `fieldlayoutfields` WRITE;
/*!40000 ALTER TABLE `fieldlayoutfields` DISABLE KEYS */;
INSERT INTO `fieldlayoutfields` VALUES (116,27,56,50,1,1,'2018-11-22 13:39:45','2018-11-22 13:39:45','c825d895-4765-48a6-8aac-46065bc14b1d'),(117,27,56,51,1,2,'2018-11-22 13:39:45','2018-11-22 13:39:45','b7d89899-e3be-4da9-9f77-3ea736c9725b'),(140,33,73,53,0,1,'2018-11-22 13:56:37','2018-11-22 13:56:37','f9abd59a-893e-4b83-86f5-d8cfa5602bc7'),(141,33,73,54,1,2,'2018-11-22 13:56:37','2018-11-22 13:56:37','439b35ad-53b3-449c-bdd4-e1abd8be5adb'),(142,33,73,55,1,3,'2018-11-22 13:56:37','2018-11-22 13:56:37','88cd75ef-d367-4df6-96ed-dd7616a07a85'),(203,90,115,68,1,1,'2018-11-22 14:43:27','2018-11-22 14:43:27','9743f8ce-5e16-48b3-94d1-f6ac57eda3bf'),(204,90,115,69,1,2,'2018-11-22 14:43:27','2018-11-22 14:43:27','fcd9e7eb-72c2-486c-8742-6293c52b069c'),(206,91,117,70,0,1,'2018-11-22 14:59:20','2018-11-22 14:59:20','4f29ba98-1555-42b2-bbc6-7aa1b0a56675'),(207,92,118,71,0,1,'2018-11-22 15:04:44','2018-11-22 15:04:44','c37a40a2-bb9f-47f8-bd6f-615a585b284d'),(265,94,133,78,1,1,'2018-11-22 16:47:18','2018-11-22 16:47:18','42567b4f-3497-4775-8abe-fe806f0b0705'),(266,94,133,79,1,2,'2018-11-22 16:47:18','2018-11-22 16:47:18','175e994f-86b5-4fd1-895b-90e6e6908dbc'),(267,94,133,80,1,3,'2018-11-22 16:47:18','2018-11-22 16:47:18','579bcdd0-fc77-4323-9a6b-0124a14a4a76'),(268,94,133,81,1,4,'2018-11-22 16:47:18','2018-11-22 16:47:18','09b42799-fef3-41cf-bc99-41e9a473c587'),(269,94,133,82,1,5,'2018-11-22 16:47:18','2018-11-22 16:47:18','88b7e733-3659-4a23-a3d4-ae1f4b26884d'),(270,94,133,83,1,6,'2018-11-22 16:47:18','2018-11-22 16:47:18','bab4df23-eef4-4cbd-ba6b-97b8b8dd094e'),(271,94,133,84,1,7,'2018-11-22 16:47:18','2018-11-22 16:47:18','e1a8ef1a-90c5-4c89-be29-361a8473d1a0'),(300,116,157,86,0,1,'2018-11-23 16:30:00','2018-11-23 16:30:00','18bd8066-216a-486b-a223-eb0cc692784a'),(303,59,159,57,1,1,'2018-11-23 16:34:32','2018-11-23 16:34:32','184fd8a7-9042-43d6-b2e8-ae302fb61e3e'),(304,59,159,58,1,2,'2018-11-23 16:34:32','2018-11-23 16:34:32','0bc08f3c-ed9c-4640-bf95-a01d386bdeb9'),(307,74,161,61,1,1,'2018-11-23 16:35:20','2018-11-23 16:35:20','3dc6e499-fbf1-4210-96bb-08d326fc1870'),(308,74,161,62,1,2,'2018-11-23 16:35:20','2018-11-23 16:35:20','778b3afc-e708-4f9c-9810-e63c0b3d6151'),(309,93,162,75,1,1,'2018-11-23 16:35:59','2018-11-23 16:35:59','13b02283-8b10-4523-a049-984f9ad09b62'),(310,93,162,76,0,2,'2018-11-23 16:35:59','2018-11-23 16:35:59','9a47670a-a773-4b96-b355-70d15ddb9dbd'),(330,118,169,91,1,1,'2018-11-23 18:27:54','2018-11-23 18:27:54','353eb1c3-c020-4721-a23b-849d24de10bf'),(331,118,169,92,1,2,'2018-11-23 18:27:54','2018-11-23 18:27:54','5e7e9eb2-2a2f-4f50-b2e9-ebaa7a8b2245'),(332,118,169,94,0,3,'2018-11-23 18:27:54','2018-11-23 18:27:54','096e361b-fcee-4c65-b15e-393e3015e4c2'),(333,118,169,93,0,4,'2018-11-23 18:27:54','2018-11-23 18:27:54','40318678-2130-4aa6-926b-1b21cdf6994c'),(343,117,173,96,1,1,'2018-11-23 18:32:32','2018-11-23 18:32:32','42e80dc5-b55f-4384-8f4a-5ee6f9a293e8'),(344,117,173,89,1,2,'2018-11-23 18:32:32','2018-11-23 18:32:32','8432e2d0-5143-4252-a6ec-afe6757fd0f8'),(345,117,173,88,1,3,'2018-11-23 18:32:32','2018-11-23 18:32:32','4a7f10ad-fad0-4bf8-a3e1-45206443aea5'),(346,117,173,95,0,4,'2018-11-23 18:32:32','2018-11-23 18:32:32','2337b014-769e-4029-ac05-4cc41ccb6e3d'),(374,143,198,85,0,1,'2018-11-23 18:53:04','2018-11-23 18:53:04','84e36bec-2252-45af-b845-f49652f63fe1'),(375,143,198,45,0,2,'2018-11-23 18:53:04','2018-11-23 18:53:04','0df6de34-26a2-4447-902a-e8e32522e66a'),(376,144,199,47,0,1,'2018-11-23 18:53:04','2018-11-23 18:53:04','b21d1231-d093-4ec4-880d-6fdadce194dc'),(377,145,200,46,0,1,'2018-11-23 18:53:04','2018-11-23 18:53:04','ee5dd700-e708-4dff-b01f-b676de0989fb'),(378,146,201,52,0,1,'2018-11-23 18:53:04','2018-11-23 18:53:04','18517a05-b9a7-4dbc-be40-ee7e5fc0f5c4'),(379,147,202,56,0,1,'2018-11-23 18:53:04','2018-11-23 18:53:04','5bfe5430-8050-47cb-b1d9-6f546329233a'),(380,148,203,60,0,1,'2018-11-23 18:53:04','2018-11-23 18:53:04','824791e5-33cd-4584-988f-328e2cbe6e91'),(381,149,204,59,0,1,'2018-11-23 18:53:04','2018-11-23 18:53:04','65c98fd6-4ef3-45b7-b993-f53775d47c71'),(437,89,229,64,1,1,'2018-11-25 09:38:37','2018-11-25 09:38:37','028c3e7e-f94b-4c12-9d18-f4e6fdeebcea'),(438,89,229,72,1,2,'2018-11-25 09:38:37','2018-11-25 09:38:37','b1789a34-f12c-414d-80ee-087d118cac58'),(439,89,229,66,1,3,'2018-11-25 09:38:37','2018-11-25 09:38:37','5f16067e-a7bd-4c93-a8eb-8685235c27e8'),(440,89,229,65,0,4,'2018-11-25 09:38:37','2018-11-25 09:38:37','4d2f76c0-de3e-4aba-a0d7-0a31cb64e4b4'),(471,5,251,34,1,1,'2018-11-25 10:14:27','2018-11-25 10:14:27','9ebb62c8-7f10-413a-910e-89620b4b5046'),(472,5,251,35,1,2,'2018-11-25 10:14:27','2018-11-25 10:14:27','9600821d-f578-48b9-8b13-a135b6676c8d'),(473,5,251,49,1,3,'2018-11-25 10:14:27','2018-11-25 10:14:27','6ce16058-d1bc-4aae-ae78-08abf13fe145'),(474,5,251,73,1,4,'2018-11-25 10:14:27','2018-11-25 10:14:27','f8a78133-084f-4979-9741-643ccc709f54'),(475,5,251,90,0,5,'2018-11-25 10:14:27','2018-11-25 10:14:27','d2b51190-6c2e-4d17-b8e1-da8d364a4202'),(476,5,251,63,1,6,'2018-11-25 10:14:27','2018-11-25 10:14:27','2c7fdbf1-04b4-40b9-93f7-d3fc38e904e9'),(477,5,251,87,0,7,'2018-11-25 10:14:27','2018-11-25 10:14:27','afb006ea-cd1d-4bb7-8d7a-c898bbeee8d4'),(478,5,252,74,0,1,'2018-11-25 10:14:27','2018-11-25 10:14:27','749374d3-cbba-471a-8aa9-f23710190fbc'),(479,5,252,48,0,2,'2018-11-25 10:14:27','2018-11-25 10:14:27','fc8d543a-3cb7-42b7-a1df-857ac3343f45'),(480,5,252,67,0,3,'2018-11-25 10:14:27','2018-11-25 10:14:27','4f4fc368-a2c7-478f-8133-d7db1bd43e54'),(481,5,253,77,0,1,'2018-11-25 10:14:27','2018-11-25 10:14:27','82154f91-7d2f-4f83-9a9c-869880d24d23'),(482,5,254,101,0,1,'2018-11-25 10:14:27','2018-11-25 10:14:27','b31fa3cc-4738-410d-a1e3-f61a63804925'),(509,152,271,104,1,1,'2018-11-25 11:35:07','2018-11-25 11:35:07','ea1abf7b-56f6-41e9-9369-8c72088ec839'),(510,153,272,105,1,1,'2018-11-25 11:35:07','2018-11-25 11:35:07','40b2b81b-1b74-405b-8d4c-4b1e795aaa8a'),(511,154,273,106,1,1,'2018-11-25 11:35:07','2018-11-25 11:35:07','1882aae0-733a-4ec0-9ef8-417b2c233e7b'),(512,156,274,107,1,1,'2018-11-25 11:35:07','2018-11-25 11:35:07','5609970b-0a62-4a57-8adf-55a1363c90da'),(513,156,274,108,1,2,'2018-11-25 11:35:07','2018-11-25 11:35:07','84f14de6-519e-4cfd-a6e0-f89e185fd1e4'),(514,157,275,109,1,1,'2018-11-25 11:35:07','2018-11-25 11:35:07','4db75e0c-6d9a-4145-8b6a-27f023965763'),(515,158,276,112,0,1,'2018-11-25 11:35:07','2018-11-25 11:35:07','79e60dba-8843-4154-900a-9d152b84d76d'),(516,158,276,110,1,2,'2018-11-25 11:35:07','2018-11-25 11:35:07','081f0d31-8f6a-4631-b0f0-bf1fe012ac37'),(517,158,276,111,1,3,'2018-11-25 11:35:07','2018-11-25 11:35:07','486545dc-48b8-4907-83f8-e84b342057ec'),(518,159,277,113,1,1,'2018-11-25 11:35:07','2018-11-25 11:35:07','b48f150a-c95b-4b6f-aed6-80cc125b0a7e'),(519,159,277,114,1,2,'2018-11-25 11:35:07','2018-11-25 11:35:07','0301f52c-e252-4c71-b738-b6d2bf8434cf'),(520,155,278,102,0,1,'2018-11-25 11:35:07','2018-11-25 11:35:07','e870ccd7-6b19-40c4-9df8-1df403984893'),(521,155,278,103,1,2,'2018-11-25 11:35:07','2018-11-25 11:35:07','da4353c7-f878-4751-a576-24a7e0359311');
/*!40000 ALTER TABLE `fieldlayoutfields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fieldlayouts`
--

DROP TABLE IF EXISTS `fieldlayouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fieldlayouts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fieldlayouts_type_idx` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fieldlayouts`
--

LOCK TABLES `fieldlayouts` WRITE;
/*!40000 ALTER TABLE `fieldlayouts` DISABLE KEYS */;
INSERT INTO `fieldlayouts` VALUES (5,'craft\\elements\\Entry','2018-11-08 15:21:35','2018-11-25 10:14:27','00527c75-2190-487d-bd7f-0daabb5c3f48'),(27,'verbb\\supertable\\elements\\SuperTableBlockElement','2018-11-22 13:39:30','2018-11-22 13:39:45','bda26bb6-8eda-4438-9380-0222f0909a41'),(33,'verbb\\supertable\\elements\\SuperTableBlockElement','2018-11-22 13:48:28','2018-11-22 13:56:37','2a16de2c-4d31-4752-929e-2872eb7279a1'),(59,'verbb\\supertable\\elements\\SuperTableBlockElement','2018-11-22 14:05:51','2018-11-23 16:34:32','423cc412-b8b4-44d6-8fe4-37556bfddfe6'),(74,'verbb\\supertable\\elements\\SuperTableBlockElement','2018-11-22 14:22:16','2018-11-23 16:35:20','4d57ded4-6c6b-4209-bfc3-1ecb370ee3e8'),(89,'verbb\\supertable\\elements\\SuperTableBlockElement','2018-11-22 14:27:55','2018-11-25 09:38:37','bb9fa144-3459-45ff-b91e-44cc80b78d66'),(90,'verbb\\supertable\\elements\\SuperTableBlockElement','2018-11-22 14:42:31','2018-11-22 14:43:27','98d4c860-c59a-48a1-a85e-05586144ab32'),(91,'craft\\elements\\Entry','2018-11-22 14:46:16','2018-11-22 14:59:20','2c8f26c2-ba11-4db9-bc61-d7089776832d'),(92,'craft\\elements\\GlobalSet','2018-11-22 15:03:36','2018-11-22 15:04:44','94dd8e37-e86a-4a1e-856b-2e2ee2c0b24e'),(93,'verbb\\supertable\\elements\\SuperTableBlockElement','2018-11-22 16:16:25','2018-11-23 16:35:59','856df102-e01f-4bf5-b161-6f6faa64803e'),(94,'verbb\\supertable\\elements\\SuperTableBlockElement','2018-11-22 16:31:45','2018-11-22 16:47:18','54006841-c491-48a2-a787-75ff4e64befe'),(116,'craft\\elements\\Asset','2018-11-23 16:23:28','2018-11-23 16:30:00','d1b979d9-bd31-4fb2-b07a-908512334795'),(117,'verbb\\supertable\\elements\\SuperTableBlockElement','2018-11-23 17:53:37','2018-11-23 18:32:32','0117aade-06a5-4645-8465-1ebef50d1128'),(118,'verbb\\supertable\\elements\\SuperTableBlockElement','2018-11-23 18:20:42','2018-11-23 18:27:54','29bbdf91-a199-472f-b067-c2d18d68520f'),(143,'benf\\neo\\elements\\Block','2018-11-23 18:53:04','2018-11-23 18:53:04','3f821cee-c0c0-401e-a2ae-6b45b33ee226'),(144,'benf\\neo\\elements\\Block','2018-11-23 18:53:04','2018-11-23 18:53:04','36f277a9-4d80-4da3-a3a0-f7009842e71f'),(145,'benf\\neo\\elements\\Block','2018-11-23 18:53:04','2018-11-23 18:53:04','860754ea-3bad-4e23-98d5-f79916e1eec8'),(146,'benf\\neo\\elements\\Block','2018-11-23 18:53:04','2018-11-23 18:53:04','504e5cdb-2cc2-46d5-9c78-53e6934e5c10'),(147,'benf\\neo\\elements\\Block','2018-11-23 18:53:04','2018-11-23 18:53:04','e6248dde-f7d6-47c9-aadb-dec09e1471b9'),(148,'benf\\neo\\elements\\Block','2018-11-23 18:53:04','2018-11-23 18:53:04','4a57a980-c5ef-450e-9f99-8eb596526083'),(149,'benf\\neo\\elements\\Block','2018-11-23 18:53:04','2018-11-23 18:53:04','b8415908-b13a-41bd-a80d-b12338deec5a'),(152,'craft\\elements\\MatrixBlock','2018-11-25 09:35:16','2018-11-25 11:35:07','f575650d-01c0-4858-832a-a97662373a7e'),(153,'craft\\elements\\MatrixBlock','2018-11-25 09:35:16','2018-11-25 11:35:07','c4338110-aeb1-4677-a089-19122dcc4acd'),(154,'craft\\elements\\MatrixBlock','2018-11-25 09:35:16','2018-11-25 11:35:07','766d2cef-d869-4827-a1ea-155df4e9cfbf'),(155,'verbb\\supertable\\elements\\SuperTableBlockElement','2018-11-25 09:35:16','2018-11-25 11:35:07','d7eee7de-a881-4d89-beea-66857f6ad36d'),(156,'craft\\elements\\MatrixBlock','2018-11-25 09:52:02','2018-11-25 11:35:07','4c8e0dfe-d88e-4d54-ae83-34a5fbd335ab'),(157,'craft\\elements\\MatrixBlock','2018-11-25 09:52:02','2018-11-25 11:35:07','d1ab5593-053b-4046-8738-4a634ae93e90'),(158,'craft\\elements\\MatrixBlock','2018-11-25 09:52:02','2018-11-25 11:35:07','8b477480-a767-4732-979f-2725959b6db8'),(159,'craft\\elements\\MatrixBlock','2018-11-25 10:24:19','2018-11-25 11:35:07','3e4dc8a9-c348-4397-94b9-a9e9f5be6f21');
/*!40000 ALTER TABLE `fieldlayouts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fieldlayouttabs`
--

DROP TABLE IF EXISTS `fieldlayouttabs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fieldlayouttabs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `layoutId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fieldlayouttabs_sortOrder_idx` (`sortOrder`),
  KEY `fieldlayouttabs_layoutId_idx` (`layoutId`),
  CONSTRAINT `fieldlayouttabs_layoutId_fk` FOREIGN KEY (`layoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=279 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fieldlayouttabs`
--

LOCK TABLES `fieldlayouttabs` WRITE;
/*!40000 ALTER TABLE `fieldlayouttabs` DISABLE KEYS */;
INSERT INTO `fieldlayouttabs` VALUES (56,27,'Content',1,'2018-11-22 13:39:45','2018-11-22 13:39:45','6e5cf603-e384-46ef-9165-6a0033d35611'),(73,33,'Content',1,'2018-11-22 13:56:37','2018-11-22 13:56:37','a2f05754-9641-4168-848c-fb950713ab64'),(115,90,'Content',1,'2018-11-22 14:43:27','2018-11-22 14:43:27','1683f7e1-9d31-4aa8-bdc2-9a3e0d6ff6e0'),(117,91,'Tab 1',1,'2018-11-22 14:59:20','2018-11-22 14:59:20','03375854-22b1-4e88-a26b-ef8630001f46'),(118,92,'Tab 1',1,'2018-11-22 15:04:44','2018-11-22 15:04:44','f8e792ae-ee00-4036-8b5d-cd051ea29dba'),(133,94,'Content',1,'2018-11-22 16:47:18','2018-11-22 16:47:18','cbdbbea5-0fd3-4f5d-84e3-d4f4aa980df0'),(157,116,'Content',1,'2018-11-23 16:30:00','2018-11-23 16:30:00','93e0dafc-68dc-47e2-8159-384cafe4c077'),(159,59,'Content',1,'2018-11-23 16:34:32','2018-11-23 16:34:32','ca05430d-1644-4dc0-98f3-819e917fc83c'),(161,74,'Content',1,'2018-11-23 16:35:20','2018-11-23 16:35:20','ff63fb22-89dd-4c78-b45c-1b07aac759b3'),(162,93,'Content',1,'2018-11-23 16:35:59','2018-11-23 16:35:59','89929886-3a89-4fcd-b9f7-03e91adab0be'),(169,118,'Content',1,'2018-11-23 18:27:54','2018-11-23 18:27:54','e6093549-acdb-43fd-8be9-97da804104b4'),(173,117,'Content',1,'2018-11-23 18:32:32','2018-11-23 18:32:32','55467db9-4f7d-4dc4-b250-8d3a75c8e9ae'),(198,143,'Content',1,'2018-11-23 18:53:04','2018-11-23 18:53:04','1fe9a2e1-0e6a-4737-a2dd-b2e9f046909e'),(199,144,'Tab 1',1,'2018-11-23 18:53:04','2018-11-23 18:53:04','d1b908a4-000c-4a35-8d23-46380ad3ea7e'),(200,145,'Tab 1',1,'2018-11-23 18:53:04','2018-11-23 18:53:04','092a2861-0cf4-4ecd-aaca-fb60b316a634'),(201,146,'Content',1,'2018-11-23 18:53:04','2018-11-23 18:53:04','d1777b98-e4ce-49b5-ad13-f7761367a063'),(202,147,'Tab 1',1,'2018-11-23 18:53:04','2018-11-23 18:53:04','0130148c-fce8-4da4-b2f6-b6700c267c86'),(203,148,'Tab 1',1,'2018-11-23 18:53:04','2018-11-23 18:53:04','7a70187c-0479-4f2c-9451-c9e712da5827'),(204,149,'Tab 1',1,'2018-11-23 18:53:04','2018-11-23 18:53:04','49d62bb0-20ac-487c-9b31-de44322a2bc3'),(229,89,'Content',1,'2018-11-25 09:38:37','2018-11-25 09:38:37','f6436547-5069-4ece-91ae-ed2085e2add2'),(251,5,'Info',1,'2018-11-25 10:14:27','2018-11-25 10:14:27','cf2c0074-4a1e-4757-a166-53c8ac74cbc0'),(252,5,'Content',2,'2018-11-25 10:14:27','2018-11-25 10:14:27','d29db887-c1e7-4764-b88b-4365b713cd0b'),(253,5,'Design',3,'2018-11-25 10:14:27','2018-11-25 10:14:27','e617d892-1eed-44b4-a96b-258aa963a8bf'),(254,5,'Tab 4',4,'2018-11-25 10:14:27','2018-11-25 10:14:27','2d93d806-87c6-4030-9727-8a4e4ac57928'),(271,152,'Content',1,'2018-11-25 11:35:07','2018-11-25 11:35:07','030943f1-bb73-4f1f-8403-c5a9bd1db174'),(272,153,'Content',1,'2018-11-25 11:35:07','2018-11-25 11:35:07','2a7f3ed9-acdd-475a-8563-88d74fa06bec'),(273,154,'Content',1,'2018-11-25 11:35:07','2018-11-25 11:35:07','ffafbebd-10ef-4920-9073-c93fd4f56e21'),(274,156,'Content',1,'2018-11-25 11:35:07','2018-11-25 11:35:07','4ae6179e-f122-405d-a348-9a520488223b'),(275,157,'Content',1,'2018-11-25 11:35:07','2018-11-25 11:35:07','a4170ad6-170d-4557-ade4-1c9e7f7ac8d8'),(276,158,'Content',1,'2018-11-25 11:35:07','2018-11-25 11:35:07','c195bd00-b4bc-4303-9a59-6c4cfcfbbaaf'),(277,159,'Content',1,'2018-11-25 11:35:07','2018-11-25 11:35:07','f8fef585-7c88-4a08-a540-2502a3921b3d'),(278,155,'Content',1,'2018-11-25 11:35:07','2018-11-25 11:35:07','51ab08bb-15fd-4eda-8ffc-cb8df0a0fc80');
/*!40000 ALTER TABLE `fieldlayouttabs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fields`
--

DROP TABLE IF EXISTS `fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `handle` varchar(64) NOT NULL,
  `context` varchar(255) NOT NULL DEFAULT 'global',
  `instructions` text,
  `translationMethod` varchar(255) NOT NULL DEFAULT 'none',
  `translationKeyFormat` text,
  `type` varchar(255) NOT NULL,
  `settings` text,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `fields_handle_context_unq_idx` (`handle`,`context`),
  KEY `fields_groupId_idx` (`groupId`),
  KEY `fields_context_idx` (`context`),
  CONSTRAINT `fields_groupId_fk` FOREIGN KEY (`groupId`) REFERENCES `fieldgroups` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fields`
--

LOCK TABLES `fields` WRITE;
/*!40000 ALTER TABLE `fields` DISABLE KEYS */;
INSERT INTO `fields` VALUES (34,5,'Start Date','startDate','global','','none',NULL,'craft\\fields\\Date','{\"showDate\":true,\"showTime\":false,\"minuteIncrement\":\"30\"}','2018-11-08 17:57:13','2018-11-08 17:57:13','2dfc7d5a-1e20-4318-86b1-0e7bd38ba9ad'),(35,5,'End Date','endDate','global','','none',NULL,'craft\\fields\\Date','{\"showDate\":true,\"showTime\":false,\"minuteIncrement\":\"30\"}','2018-11-08 17:57:37','2018-11-08 17:57:37','82aafe89-6f2c-438b-b3ee-ec8473753871'),(45,4,'Section title','sectionTitle','global','','none',NULL,'craft\\fields\\PlainText','{\"placeholder\":\"\",\"code\":\"\",\"multiline\":\"\",\"initialRows\":\"4\",\"charLimit\":\"\",\"columnType\":\"text\"}','2018-11-22 13:11:08','2018-11-22 13:11:08','99ba4969-251e-495f-8b46-9186cf937b62'),(46,4,'Section subtitle','sectionSubtitle','global','','none',NULL,'craft\\fields\\PlainText','{\"placeholder\":\"\",\"code\":\"\",\"multiline\":\"\",\"initialRows\":\"4\",\"charLimit\":\"\",\"columnType\":\"text\"}','2018-11-22 13:11:19','2018-11-22 13:11:19','90f69603-d8f0-464b-9b35-1bc57b723f18'),(47,4,'Body text','bodyText','global','','none',NULL,'craft\\redactor\\Field','{\"redactorConfig\":\"Simple.json\",\"purifierConfig\":\"\",\"cleanupHtml\":\"1\",\"purifyHtml\":\"1\",\"columnType\":\"text\",\"availableVolumes\":\"*\",\"availableTransforms\":\"*\"}','2018-11-22 13:12:11','2018-11-22 13:45:19','3d67dffa-55eb-419e-9991-7f8995edcada'),(48,4,'Page Content','pageContent','global','','site',NULL,'benf\\neo\\Field','{\"localizeBlocks\":false,\"minBlocks\":\"\",\"maxBlocks\":\"\"}','2018-11-22 13:18:30','2018-11-23 18:53:04','43ce24e5-4582-4afd-abe6-a5c06e83d5aa'),(49,5,'Call to action','cta','global','','site',NULL,'verbb\\supertable\\fields\\SuperTableField','{\"minRows\":\"\",\"maxRows\":\"\",\"localizeBlocks\":false,\"staticField\":\"1\",\"columns\":{\"50\":{\"width\":\"\"},\"51\":{\"width\":\"\"}},\"contentTable\":null,\"fieldLayout\":\"row\",\"selectionLabel\":\"\"}','2018-11-22 13:39:29','2018-11-22 13:39:45','5b647873-1953-486c-9549-dadd4f11ebb8'),(50,NULL,'Label','ctaLabel','superTableBlockType:2','','none',NULL,'craft\\fields\\PlainText','{\"placeholder\":\"Apply now\",\"code\":\"\",\"multiline\":\"\",\"initialRows\":\"4\",\"charLimit\":\"50\",\"columnType\":\"text\"}','2018-11-22 13:39:29','2018-11-22 13:39:45','ceb37e57-beb7-445d-8b1e-d648b8c8a661'),(51,NULL,'URL','ctaUrl','superTableBlockType:2','','none',NULL,'craft\\fields\\Url','{\"placeholder\":\"https://example-ticket-site.com/event-tickets\"}','2018-11-22 13:39:30','2018-11-22 13:39:45','25745c1e-68e1-415c-aa9c-6a2885db5179'),(52,4,'Text panel','textPanel','global','','site',NULL,'verbb\\supertable\\fields\\SuperTableField','{\"minRows\":\"\",\"maxRows\":\"\",\"localizeBlocks\":false,\"staticField\":\"1\",\"columns\":{\"53\":{\"width\":\"\"},\"54\":{\"width\":\"\"},\"55\":{\"width\":\"\"}},\"contentTable\":null,\"fieldLayout\":\"row\",\"selectionLabel\":\"\"}','2018-11-22 13:48:28','2018-11-22 13:56:37','6f462acb-50df-4eaf-bed0-e0f9a4d14455'),(53,NULL,'Heading','panelTitle','superTableBlockType:3','','none',NULL,'craft\\fields\\PlainText','{\"placeholder\":\"\",\"code\":\"\",\"multiline\":\"\",\"initialRows\":\"4\",\"charLimit\":\"\",\"columnType\":\"text\"}','2018-11-22 13:48:28','2018-11-22 13:56:37','84c26e20-4bbf-402c-8f70-1a9cafd4fe15'),(54,NULL,'First column','firstColumn','superTableBlockType:3','','none',NULL,'craft\\redactor\\Field','{\"redactorConfig\":\"Standard.json\",\"purifierConfig\":\"\",\"cleanupHtml\":\"1\",\"purifyHtml\":\"1\",\"columnType\":\"text\",\"availableVolumes\":\"*\",\"availableTransforms\":\"*\"}','2018-11-22 13:48:28','2018-11-22 13:56:37','653619a8-deb6-40dd-8ea1-a277621f9c56'),(55,NULL,'Second column','secondColumn','superTableBlockType:3','','none',NULL,'craft\\redactor\\Field','{\"redactorConfig\":\"Standard.json\",\"purifierConfig\":\"\",\"cleanupHtml\":\"1\",\"purifyHtml\":\"1\",\"columnType\":\"text\",\"availableVolumes\":\"*\",\"availableTransforms\":\"*\"}','2018-11-22 13:48:28','2018-11-22 13:56:37','47384075-d967-4ca3-998e-0f1a9c861098'),(56,4,'Image + text panel','textAndImagePanel','global','','site',NULL,'verbb\\supertable\\fields\\SuperTableField','{\"minRows\":\"\",\"maxRows\":\"\",\"localizeBlocks\":false,\"staticField\":\"1\",\"columns\":{\"57\":{\"width\":\"\"},\"58\":{\"width\":\"\"}},\"contentTable\":null,\"fieldLayout\":\"row\",\"selectionLabel\":\"\"}','2018-11-22 14:05:51','2018-11-23 16:34:32','8ea01ec9-1092-4494-b9ac-17205c97cb33'),(57,NULL,'Text','panelText','superTableBlockType:4','','none',NULL,'craft\\redactor\\Field','{\"redactorConfig\":\"Standard.json\",\"purifierConfig\":\"\",\"cleanupHtml\":\"1\",\"purifyHtml\":\"1\",\"columnType\":\"text\",\"availableVolumes\":[\"1\"],\"availableTransforms\":\"*\"}','2018-11-22 14:05:51','2018-11-23 16:34:32','28e2056b-0535-44c9-832e-2a57d6bb0e7b'),(58,NULL,'Image','panelImage','superTableBlockType:4','','site',NULL,'craft\\fields\\Assets','{\"useSingleFolder\":\"\",\"defaultUploadLocationSource\":\"folder:1\",\"defaultUploadLocationSubpath\":\"\",\"singleUploadLocationSource\":\"folder:1\",\"singleUploadLocationSubpath\":\"\",\"restrictFiles\":\"1\",\"allowedKinds\":[\"image\"],\"sources\":[\"folder:1\"],\"source\":null,\"targetSiteId\":null,\"viewMode\":\"list\",\"limit\":\"1\",\"selectionLabel\":\"Choose image\",\"localizeRelations\":false}','2018-11-22 14:05:51','2018-11-23 16:34:32','d4105d94-2069-44a1-8b7e-70aec24b5003'),(59,4,'Image','image','global','','site',NULL,'craft\\fields\\Assets','{\"useSingleFolder\":\"\",\"defaultUploadLocationSource\":\"folder:1\",\"defaultUploadLocationSubpath\":\"\",\"singleUploadLocationSource\":\"folder:1\",\"singleUploadLocationSubpath\":\"\",\"restrictFiles\":\"1\",\"allowedKinds\":[\"image\"],\"sources\":[\"folder:1\"],\"source\":null,\"targetSiteId\":null,\"viewMode\":\"list\",\"limit\":\"1\",\"selectionLabel\":\"Choose image\",\"localizeRelations\":false}','2018-11-22 14:20:43','2018-11-23 16:35:39','d0e932d2-5cc0-448f-a175-4c5a64b12887'),(60,4,'Image pair','imagePair','global','','site',NULL,'verbb\\supertable\\fields\\SuperTableField','{\"minRows\":\"\",\"maxRows\":\"\",\"localizeBlocks\":false,\"staticField\":\"1\",\"columns\":{\"61\":{\"width\":\"\"},\"62\":{\"width\":\"\"}},\"contentTable\":null,\"fieldLayout\":\"table\",\"selectionLabel\":\"\"}','2018-11-22 14:22:16','2018-11-23 16:35:20','26ee7dc5-e813-4f28-8f48-b78588a6b9c2'),(61,NULL,'First image','firstImage','superTableBlockType:5','','site',NULL,'craft\\fields\\Assets','{\"useSingleFolder\":\"\",\"defaultUploadLocationSource\":\"folder:1\",\"defaultUploadLocationSubpath\":\"\",\"singleUploadLocationSource\":\"folder:1\",\"singleUploadLocationSubpath\":\"\",\"restrictFiles\":\"1\",\"allowedKinds\":[\"image\"],\"sources\":[\"folder:1\"],\"source\":null,\"targetSiteId\":null,\"viewMode\":\"list\",\"limit\":\"1\",\"selectionLabel\":\"Choose image\",\"localizeRelations\":false}','2018-11-22 14:22:16','2018-11-23 16:35:20','4cf34786-8e00-4dd4-a9e8-cea183034eb9'),(62,NULL,'second image','secondImage','superTableBlockType:5','','site',NULL,'craft\\fields\\Assets','{\"useSingleFolder\":\"\",\"defaultUploadLocationSource\":\"folder:1\",\"defaultUploadLocationSubpath\":\"\",\"singleUploadLocationSource\":\"folder:1\",\"singleUploadLocationSubpath\":\"\",\"restrictFiles\":\"\",\"allowedKinds\":null,\"sources\":[\"folder:1\"],\"source\":null,\"targetSiteId\":null,\"viewMode\":\"list\",\"limit\":\"1\",\"selectionLabel\":\"Choose image\",\"localizeRelations\":false}','2018-11-22 14:22:16','2018-11-23 16:35:20','2085a24a-1e1e-4581-879b-916feb0c0aac'),(63,5,'Venue','venue','global','','site',NULL,'verbb\\supertable\\fields\\SuperTableField','{\"minRows\":\"\",\"maxRows\":\"\",\"localizeBlocks\":false,\"staticField\":\"1\",\"columns\":{\"64\":{\"width\":\"\"},\"72\":{\"width\":\"\"},\"66\":{\"width\":\"\"},\"65\":{\"width\":\"\"}},\"contentTable\":null,\"fieldLayout\":\"row\",\"selectionLabel\":\"\"}','2018-11-22 14:27:55','2018-11-25 09:38:37','12c65fbc-13ae-4401-975e-d0aaaf693e63'),(64,NULL,'Name','venueName','superTableBlockType:6','','none',NULL,'craft\\fields\\PlainText','{\"placeholder\":\"Fawlty Towers\",\"code\":\"\",\"multiline\":\"\",\"initialRows\":\"4\",\"charLimit\":\"\",\"columnType\":\"text\"}','2018-11-22 14:27:55','2018-11-25 09:38:37','45749807-5330-4d87-87a5-fbff676bc2eb'),(65,NULL,'Website URL','venueUrl','superTableBlockType:6','','none',NULL,'craft\\fields\\Url','{\"placeholder\":\"http://venuewebsite.com\"}','2018-11-22 14:27:55','2018-11-25 09:38:37','d066cb6a-3742-4cdf-b29d-f58de1fe40f5'),(66,NULL,'Full Address','venueAddress','superTableBlockType:6','','none',NULL,'craft\\fields\\PlainText','{\"placeholder\":\"\",\"code\":\"\",\"multiline\":\"\",\"initialRows\":\"4\",\"charLimit\":\"\",\"columnType\":\"text\"}','2018-11-22 14:27:55','2018-11-25 09:38:37','2125c093-7379-4322-b5db-cbb134bb86bb'),(67,4,'Page Footer','pageFooter','global','','site',NULL,'verbb\\supertable\\fields\\SuperTableField','{\"minRows\":\"\",\"maxRows\":\"\",\"localizeBlocks\":false,\"staticField\":\"1\",\"columns\":{\"68\":{\"width\":\"\"},\"69\":{\"width\":\"\"}},\"contentTable\":null,\"fieldLayout\":\"row\",\"selectionLabel\":\"\"}','2018-11-22 14:42:30','2018-11-22 14:43:27','8e42380f-5380-4933-88bb-6aa5740226d9'),(68,NULL,'Title','footerTitle','superTableBlockType:7','','none',NULL,'craft\\fields\\PlainText','{\"placeholder\":\"\",\"code\":\"\",\"multiline\":\"\",\"initialRows\":\"4\",\"charLimit\":\"\",\"columnType\":\"text\"}','2018-11-22 14:42:31','2018-11-22 14:43:27','bd4a0bc7-6581-405d-b4a0-75b40050a5e7'),(69,NULL,'Content','footerContent','superTableBlockType:7','','none',NULL,'craft\\redactor\\Field','{\"redactorConfig\":\"Standard.json\",\"purifierConfig\":\"\",\"cleanupHtml\":\"1\",\"purifyHtml\":\"1\",\"columnType\":\"text\",\"availableVolumes\":\"*\",\"availableTransforms\":\"*\"}','2018-11-22 14:42:31','2018-11-22 14:43:27','5a78b4aa-8b59-4fdd-a3ef-e9c4ccad44a4'),(70,4,'Page Body','pageBody','global','','none',NULL,'craft\\redactor\\Field','{\"redactorConfig\":\"Full.json\",\"purifierConfig\":\"\",\"cleanupHtml\":\"1\",\"purifyHtml\":\"1\",\"columnType\":\"text\",\"availableVolumes\":\"*\",\"availableTransforms\":\"*\"}','2018-11-22 14:53:43','2018-11-22 14:58:55','0398bc38-da11-4a72-8bb8-e143e3d3119c'),(71,5,'Contact email','contactEmail','global','','none',NULL,'craft\\fields\\Email','{\"placeholder\":\"\"}','2018-11-22 15:04:05','2018-11-22 15:04:05','d6781a2d-73ea-4214-bff4-e3f7429c7013'),(72,NULL,'Location','venueLocation','superTableBlockType:6','','none',NULL,'craft\\fields\\PlainText','{\"placeholder\":\"Torquay\",\"code\":\"\",\"multiline\":\"\",\"initialRows\":\"4\",\"charLimit\":\"\",\"columnType\":\"text\"}','2018-11-22 15:08:58','2018-11-25 09:38:37','f228952d-7f05-4b2b-91b3-30a7ddf9e6e7'),(73,5,'Ticket Price','ticketPrice','global','Ticket price per person','none',NULL,'craft\\fields\\Number','{\"defaultValue\":null,\"min\":\"0\",\"max\":null,\"decimals\":0,\"size\":null}','2018-11-22 15:09:49','2018-11-22 15:17:52','ccc59e2b-7fd2-4f2e-abfd-29fbba3433ee'),(74,5,'Masthead','masthead','global','','site',NULL,'verbb\\supertable\\fields\\SuperTableField','{\"minRows\":\"\",\"maxRows\":\"\",\"localizeBlocks\":false,\"staticField\":\"1\",\"columns\":{\"75\":{\"width\":\"\"},\"76\":{\"width\":\"\"}},\"contentTable\":null,\"fieldLayout\":\"row\",\"selectionLabel\":\"\"}','2018-11-22 16:16:25','2018-11-23 16:35:59','21b72565-dbc3-41b4-ad2d-98d1294924db'),(75,NULL,'Title','mastheadTitle','superTableBlockType:8','','none',NULL,'craft\\fields\\PlainText','{\"placeholder\":\"\",\"code\":\"\",\"multiline\":\"\",\"initialRows\":\"4\",\"charLimit\":\"\",\"columnType\":\"text\"}','2018-11-22 16:16:25','2018-11-23 16:35:59','b1c1d946-7e76-4e99-a66e-07b671cb175e'),(76,NULL,'Background Image','mastheadImage','superTableBlockType:8','','site',NULL,'craft\\fields\\Assets','{\"useSingleFolder\":\"\",\"defaultUploadLocationSource\":\"folder:1\",\"defaultUploadLocationSubpath\":\"\",\"singleUploadLocationSource\":\"folder:1\",\"singleUploadLocationSubpath\":\"\",\"restrictFiles\":\"1\",\"allowedKinds\":[\"image\"],\"sources\":[\"folder:1\"],\"source\":null,\"targetSiteId\":null,\"viewMode\":\"list\",\"limit\":\"1\",\"selectionLabel\":\"Choose image\",\"localizeRelations\":false}','2018-11-22 16:16:25','2018-11-23 16:35:59','4364126a-1bf0-45dd-b927-9fa04d1a336d'),(77,5,'Theme Colours','themeColours','global','','site',NULL,'verbb\\supertable\\fields\\SuperTableField','{\"minRows\":\"\",\"maxRows\":\"\",\"localizeBlocks\":false,\"staticField\":\"1\",\"columns\":{\"78\":{\"width\":\"\"},\"79\":{\"width\":\"\"},\"80\":{\"width\":\"\"},\"81\":{\"width\":\"\"},\"82\":{\"width\":\"\"},\"83\":{\"width\":\"\"},\"84\":{\"width\":\"\"}},\"contentTable\":null,\"fieldLayout\":\"row\",\"selectionLabel\":\"\"}','2018-11-22 16:31:45','2018-11-22 16:47:18','b4f7611d-e62c-48ef-ad4b-0413bb38d63d'),(78,NULL,'Main Colour','themeMain','superTableBlockType:9','','none',NULL,'craft\\fields\\Color','{\"defaultColor\":\"\"}','2018-11-22 16:31:45','2018-11-22 16:47:18','c2c08a5d-d7c4-4dc5-9ff9-b471f61a8537'),(79,NULL,'Accent colour','themeAccent','superTableBlockType:9','','none',NULL,'craft\\fields\\Color','{\"defaultColor\":\"\"}','2018-11-22 16:31:45','2018-11-22 16:47:18','b8aad746-5d6f-43ef-9d21-1224002b4cb7'),(80,NULL,'Text colour (dark)','themeTextDark','superTableBlockType:9','','none',NULL,'craft\\fields\\Color','{\"defaultColor\":\"#727272\"}','2018-11-22 16:31:45','2018-11-22 16:47:18','74ca64ec-5f3e-4942-b06f-9ab449b4597a'),(81,NULL,'Text colour (light)','themeTextLight','superTableBlockType:9','','none',NULL,'craft\\fields\\Color','{\"defaultColor\":\"#767676\"}','2018-11-22 16:31:45','2018-11-22 16:47:18','aa5bf2e1-db54-4231-8c55-29faac72cd70'),(82,NULL,'Light','themeLight','superTableBlockType:9','','none',NULL,'craft\\fields\\Color','{\"defaultColor\":\"#ffffff\"}','2018-11-22 16:31:45','2018-11-22 16:47:18','32257784-dfcd-4c14-9dc8-892a92bc7981'),(83,NULL,'Dark','themeDark','superTableBlockType:9','','none',NULL,'craft\\fields\\Color','{\"defaultColor\":\"#0f0f0f\"}','2018-11-22 16:31:45','2018-11-22 16:47:18','710e0393-454e-4158-ad78-67c0ccd13cce'),(84,NULL,'Muted','themeMuted','superTableBlockType:9','','none',NULL,'craft\\fields\\Color','{\"defaultColor\":\"#f8f8f8\"}','2018-11-22 16:31:45','2018-11-22 16:47:18','1d61bb43-da1a-4609-abca-b1bdd26288f8'),(85,4,'Section style','sectionStyle','global','','none',NULL,'craft\\fields\\Dropdown','{\"options\":[{\"label\":\"Standard\",\"value\":\"\",\"default\":\"1\"},{\"label\":\"Muted\",\"value\":\"muted\",\"default\":\"\"}]}','2018-11-23 11:02:26','2018-11-23 11:05:13','90d03b55-7753-453f-b716-e2cc5213e9c8'),(86,6,'Alt text','altText','global','','none',NULL,'craft\\fields\\PlainText','{\"placeholder\":\"\",\"code\":\"\",\"multiline\":\"\",\"initialRows\":\"4\",\"charLimit\":\"\",\"columnType\":\"text\"}','2018-11-23 16:24:41','2018-11-23 16:24:41','cd76eafa-1ee2-4291-af05-841ba0353d66'),(87,5,'Sponsors','sponsors','global','','site',NULL,'verbb\\supertable\\fields\\SuperTableField','{\"minRows\":\"\",\"maxRows\":\"\",\"localizeBlocks\":false,\"staticField\":\"1\",\"columns\":{\"96\":{\"width\":\"\"},\"89\":{\"width\":\"\"},\"88\":{\"width\":\"\"},\"95\":{\"width\":\"\"}},\"contentTable\":null,\"fieldLayout\":\"row\",\"selectionLabel\":\"Add a sponsor\"}','2018-11-23 17:53:37','2018-11-23 18:32:32','277621ec-ad3f-482f-bbe8-af86bb53bbe1'),(88,NULL,'Logo','sponsorLogo','superTableBlockType:10','','site',NULL,'craft\\fields\\Assets','{\"useSingleFolder\":\"\",\"defaultUploadLocationSource\":\"folder:1\",\"defaultUploadLocationSubpath\":\"\",\"singleUploadLocationSource\":\"folder:1\",\"singleUploadLocationSubpath\":\"\",\"restrictFiles\":\"\",\"allowedKinds\":null,\"sources\":[\"folder:1\"],\"source\":null,\"targetSiteId\":null,\"viewMode\":\"list\",\"limit\":\"1\",\"selectionLabel\":\"Add/select logo\",\"localizeRelations\":false}','2018-11-23 17:53:37','2018-11-23 18:32:32','a6c01e9b-b7c9-40b4-864a-e6e545e86c5d'),(89,NULL,'Blurb','sponsorBlurb','superTableBlockType:10','','none',NULL,'craft\\redactor\\Field','{\"redactorConfig\":\"Standard.json\",\"purifierConfig\":\"\",\"cleanupHtml\":\"1\",\"purifyHtml\":\"1\",\"columnType\":\"text\",\"availableVolumes\":[\"1\"],\"availableTransforms\":\"*\"}','2018-11-23 17:53:37','2018-11-23 18:32:32','345f64da-a3f1-4c1e-a332-d9ea5511f55d'),(90,5,'Tickets','tickets','global','','site',NULL,'verbb\\supertable\\fields\\SuperTableField','{\"minRows\":\"\",\"maxRows\":\"\",\"localizeBlocks\":false,\"staticField\":\"\",\"columns\":{\"91\":{\"width\":\"\"},\"92\":{\"width\":\"\"},\"new1\":{\"width\":\"\"},\"93\":{\"width\":\"\"}},\"contentTable\":null,\"fieldLayout\":\"row\",\"selectionLabel\":\"Add ticket\"}','2018-11-23 18:20:42','2018-11-23 18:27:54','e17096ef-ef19-488b-bb53-4ce2c2113ef9'),(91,NULL,'Ticket type','ticketType','superTableBlockType:11','Short description of the type of ticket','none',NULL,'craft\\fields\\PlainText','{\"placeholder\":\"E.g. Single occupancy room\",\"code\":\"\",\"multiline\":\"\",\"initialRows\":\"4\",\"charLimit\":\"\",\"columnType\":\"text\"}','2018-11-23 18:20:42','2018-11-23 18:27:54','44e62856-db24-45eb-91e9-e3d0b920be60'),(92,NULL,'Price','ticketPrice','superTableBlockType:11','','none',NULL,'craft\\fields\\Number','{\"defaultValue\":null,\"min\":\"0\",\"max\":null,\"decimals\":0,\"size\":null}','2018-11-23 18:20:42','2018-11-23 18:27:54','3f5661a8-fbff-4e5a-be83-eed183d169e8'),(93,NULL,'Number available','ticketAvailablility','superTableBlockType:11','','none',NULL,'craft\\fields\\Number','{\"defaultValue\":null,\"min\":\"1\",\"max\":null,\"decimals\":0,\"size\":null}','2018-11-23 18:20:42','2018-11-23 18:27:54','5ae42b7a-5e59-4fc6-a403-432166420753'),(94,NULL,'Purchase URL','ticketUrl','superTableBlockType:11','','none',NULL,'craft\\fields\\Url','{\"placeholder\":\"\"}','2018-11-23 18:27:54','2018-11-23 18:27:54','c46ecaee-2e2c-4c07-84fb-896aed74552a'),(95,NULL,'Website URL','sponsorUrl','superTableBlockType:10','','none',NULL,'craft\\fields\\Url','{\"placeholder\":\"https://a-great-sponsor.com\"}','2018-11-23 18:31:14','2018-11-23 18:32:32','c60630e6-ec3e-4342-81db-41fff7b8eb17'),(96,NULL,'Name','sponsorName','superTableBlockType:10','','none',NULL,'craft\\fields\\PlainText','{\"placeholder\":\"\",\"code\":\"\",\"multiline\":\"\",\"initialRows\":\"4\",\"charLimit\":\"\",\"columnType\":\"text\"}','2018-11-23 18:32:17','2018-11-23 18:32:32','f58d3457-66d0-443f-a09f-65cdd272efb8'),(101,6,'Content Builder','contentBuilder','global','','site',NULL,'verbb\\supertable\\fields\\SuperTableField','{\"minRows\":\"\",\"maxRows\":\"\",\"localizeBlocks\":false,\"staticField\":\"\",\"columns\":{\"102\":{\"width\":\"\"},\"103\":{\"width\":\"\"}},\"contentTable\":null,\"fieldLayout\":\"matrix\",\"selectionLabel\":\"Add a section\"}','2018-11-25 09:35:15','2018-11-25 11:35:07','3b162918-33d0-44f4-bebc-5c2917cdb0c6'),(102,NULL,'Style','slatStyle','superTableBlockType:13','Affects the background colour and other related styles','none',NULL,'craft\\fields\\Dropdown','{\"options\":[{\"label\":\"Light\",\"value\":\"\",\"default\":\"\"},{\"label\":\"Muted\",\"value\":\"muted\",\"default\":\"\"}]}','2018-11-25 09:35:15','2018-11-25 11:35:07','22bfbcc5-12bc-46d8-bde5-06e977d3f95d'),(103,NULL,'Contents','slatContents','superTableBlockType:13','','site',NULL,'craft\\fields\\Matrix','{\"minBlocks\":\"1\",\"maxBlocks\":\"\",\"contentTable\":\"{{%matrixcontent_slatcontents}}\",\"localizeBlocks\":false}','2018-11-25 09:35:15','2018-11-25 11:35:07','1733f15f-7e50-4f3d-a380-12c46f540797'),(104,NULL,'__blank__','text','matrixBlockType:2','','none',NULL,'craft\\fields\\PlainText','{\"placeholder\":\"\",\"code\":\"\",\"multiline\":\"\",\"initialRows\":\"4\",\"charLimit\":\"\",\"columnType\":\"text\"}','2018-11-25 09:35:16','2018-11-25 11:35:07','a89356e2-45c7-406e-a809-436b11475624'),(105,NULL,'__blank__','text','matrixBlockType:3','','none',NULL,'craft\\fields\\PlainText','{\"placeholder\":\"\",\"code\":\"\",\"multiline\":\"\",\"initialRows\":\"4\",\"charLimit\":\"\",\"columnType\":\"text\"}','2018-11-25 09:35:16','2018-11-25 11:35:07','b8aa4a39-600c-44a1-8f0a-e56883c64a13'),(106,NULL,'__blank__','text','matrixBlockType:4','','none',NULL,'craft\\redactor\\Field','{\"redactorConfig\":\"Standard.json\",\"purifierConfig\":\"\",\"cleanupHtml\":\"1\",\"purifyHtml\":\"1\",\"columnType\":\"text\",\"availableVolumes\":[\"1\"],\"availableTransforms\":\"*\"}','2018-11-25 09:35:16','2018-11-25 11:35:07','dc89e064-950b-4cc0-bd5d-cc0afa5bbeb9'),(107,NULL,'First Image','firstImage','matrixBlockType:5','','site',NULL,'craft\\fields\\Assets','{\"useSingleFolder\":\"\",\"defaultUploadLocationSource\":\"folder:1\",\"defaultUploadLocationSubpath\":\"\",\"singleUploadLocationSource\":\"folder:1\",\"singleUploadLocationSubpath\":\"\",\"restrictFiles\":\"1\",\"allowedKinds\":[\"image\"],\"sources\":[\"folder:1\"],\"source\":null,\"targetSiteId\":null,\"viewMode\":\"list\",\"limit\":\"1\",\"selectionLabel\":\"Select an image\",\"localizeRelations\":false}','2018-11-25 09:52:02','2018-11-25 11:35:07','9f014f99-a742-4f47-aefb-3730e1c681b7'),(108,NULL,'Second Image','secondImage','matrixBlockType:5','','site',NULL,'craft\\fields\\Assets','{\"useSingleFolder\":\"\",\"defaultUploadLocationSource\":\"folder:1\",\"defaultUploadLocationSubpath\":\"\",\"singleUploadLocationSource\":\"folder:1\",\"singleUploadLocationSubpath\":\"\",\"restrictFiles\":\"1\",\"allowedKinds\":[\"image\"],\"sources\":[\"folder:1\"],\"source\":null,\"targetSiteId\":null,\"viewMode\":\"list\",\"limit\":\"1\",\"selectionLabel\":\"Select an image\",\"localizeRelations\":false}','2018-11-25 09:52:02','2018-11-25 11:35:07','47f5d344-1016-4cc5-9f95-e12c4fd0872b'),(109,NULL,'__blank__','image','matrixBlockType:6','','site',NULL,'craft\\fields\\Assets','{\"useSingleFolder\":\"\",\"defaultUploadLocationSource\":\"folder:1\",\"defaultUploadLocationSubpath\":\"\",\"singleUploadLocationSource\":\"folder:1\",\"singleUploadLocationSubpath\":\"\",\"restrictFiles\":\"1\",\"allowedKinds\":[\"image\"],\"sources\":[\"folder:1\"],\"source\":null,\"targetSiteId\":null,\"viewMode\":\"list\",\"limit\":\"1\",\"selectionLabel\":\"Select an image\",\"localizeRelations\":false}','2018-11-25 09:52:02','2018-11-25 11:35:07','3c45684a-25b9-48ab-9fc4-17bb87fab3b6'),(110,NULL,'First column','textFirst','matrixBlockType:7','','none',NULL,'craft\\redactor\\Field','{\"redactorConfig\":\"Standard.json\",\"purifierConfig\":\"\",\"cleanupHtml\":\"1\",\"purifyHtml\":\"1\",\"columnType\":\"text\",\"availableVolumes\":\"*\",\"availableTransforms\":\"*\"}','2018-11-25 09:52:02','2018-11-25 11:35:07','4f118178-b372-4b75-9b5d-ea016e666f21'),(111,NULL,'Second column','textSecond','matrixBlockType:7','','none',NULL,'craft\\redactor\\Field','{\"redactorConfig\":\"Standard.json\",\"purifierConfig\":\"\",\"cleanupHtml\":\"1\",\"purifyHtml\":\"1\",\"columnType\":\"text\",\"availableVolumes\":[\"1\"],\"availableTransforms\":\"*\"}','2018-11-25 09:52:02','2018-11-25 11:35:07','c786db9a-44df-4bad-a97e-294108ec762a'),(112,NULL,'Title','panelTitle','matrixBlockType:7','','none',NULL,'craft\\fields\\PlainText','{\"placeholder\":\"\",\"code\":\"\",\"multiline\":\"\",\"initialRows\":\"4\",\"charLimit\":\"\",\"columnType\":\"text\"}','2018-11-25 10:24:19','2018-11-25 11:35:07','0713c9a5-f074-4ba2-b713-da95259fc956'),(113,NULL,'Text','text','matrixBlockType:8','','none',NULL,'craft\\redactor\\Field','{\"redactorConfig\":\"Standard.json\",\"purifierConfig\":\"\",\"cleanupHtml\":\"1\",\"purifyHtml\":\"1\",\"columnType\":\"text\",\"availableVolumes\":\"\",\"availableTransforms\":\"*\"}','2018-11-25 10:24:19','2018-11-25 11:35:07','b3c90e41-d2d2-40a8-a9f6-a968500e050b'),(114,NULL,'Image','image','matrixBlockType:8','','site',NULL,'craft\\fields\\Assets','{\"useSingleFolder\":\"\",\"defaultUploadLocationSource\":\"folder:1\",\"defaultUploadLocationSubpath\":\"\",\"singleUploadLocationSource\":\"folder:1\",\"singleUploadLocationSubpath\":\"\",\"restrictFiles\":\"1\",\"allowedKinds\":[\"image\"],\"sources\":\"*\",\"source\":null,\"targetSiteId\":null,\"viewMode\":\"list\",\"limit\":\"1\",\"selectionLabel\":\"Select an image\",\"localizeRelations\":false}','2018-11-25 10:24:19','2018-11-25 11:35:07','01db15a7-892a-4fa7-82ed-cae125fbfe46');
/*!40000 ALTER TABLE `fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `globalsets`
--

DROP TABLE IF EXISTS `globalsets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `globalsets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `fieldLayoutId` int(11) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `globalsets_name_unq_idx` (`name`),
  UNIQUE KEY `globalsets_handle_unq_idx` (`handle`),
  KEY `globalsets_fieldLayoutId_idx` (`fieldLayoutId`),
  CONSTRAINT `globalsets_fieldLayoutId_fk` FOREIGN KEY (`fieldLayoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE SET NULL,
  CONSTRAINT `globalsets_id_fk` FOREIGN KEY (`id`) REFERENCES `elements` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `globalsets`
--

LOCK TABLES `globalsets` WRITE;
/*!40000 ALTER TABLE `globalsets` DISABLE KEYS */;
INSERT INTO `globalsets` VALUES (16,'Contact Info','contactInfo',92,'2018-11-22 15:03:36','2018-11-22 15:04:44','0461d505-70d7-4180-8ed4-f74a3f35f1ef');
/*!40000 ALTER TABLE `globalsets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `info`
--

DROP TABLE IF EXISTS `info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `version` varchar(50) NOT NULL,
  `schemaVersion` varchar(15) NOT NULL,
  `edition` tinyint(3) unsigned NOT NULL,
  `timezone` varchar(30) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `on` tinyint(1) NOT NULL DEFAULT '0',
  `maintenance` tinyint(1) NOT NULL DEFAULT '0',
  `fieldVersion` char(12) NOT NULL DEFAULT '000000000000',
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `info`
--

LOCK TABLES `info` WRITE;
/*!40000 ALTER TABLE `info` DISABLE KEYS */;
INSERT INTO `info` VALUES (1,'3.0.32','3.0.94',0,'Europe/London','Clearleft Retreats',1,0,'VqsPcA5SsnCf','2018-11-07 16:34:56','2018-11-25 11:35:07','ea2a7348-19e3-4472-9458-6bba9b3243f1');
/*!40000 ALTER TABLE `info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matrixblocks`
--

DROP TABLE IF EXISTS `matrixblocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `matrixblocks` (
  `id` int(11) NOT NULL,
  `ownerId` int(11) NOT NULL,
  `ownerSiteId` int(11) DEFAULT NULL,
  `fieldId` int(11) NOT NULL,
  `typeId` int(11) NOT NULL,
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `matrixblocks_ownerId_idx` (`ownerId`),
  KEY `matrixblocks_fieldId_idx` (`fieldId`),
  KEY `matrixblocks_typeId_idx` (`typeId`),
  KEY `matrixblocks_sortOrder_idx` (`sortOrder`),
  KEY `matrixblocks_ownerSiteId_idx` (`ownerSiteId`),
  CONSTRAINT `matrixblocks_fieldId_fk` FOREIGN KEY (`fieldId`) REFERENCES `fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `matrixblocks_id_fk` FOREIGN KEY (`id`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `matrixblocks_ownerId_fk` FOREIGN KEY (`ownerId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `matrixblocks_ownerSiteId_fk` FOREIGN KEY (`ownerSiteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `matrixblocks_typeId_fk` FOREIGN KEY (`typeId`) REFERENCES `matrixblocktypes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matrixblocks`
--

LOCK TABLES `matrixblocks` WRITE;
/*!40000 ALTER TABLE `matrixblocks` DISABLE KEYS */;
INSERT INTO `matrixblocks` VALUES (48,47,NULL,103,2,1,'2018-11-25 10:27:00','2018-11-25 10:41:10','1d98663a-5ddb-4bd9-b9bb-4778f85644fd'),(49,47,NULL,103,4,2,'2018-11-25 10:27:00','2018-11-25 10:41:10','90389b93-0293-44f4-9e35-dcedae9ca73f'),(50,47,NULL,103,5,3,'2018-11-25 10:41:10','2018-11-25 10:41:10','52c70ee5-c12f-4a7b-b74c-012fc1cbb7c4'),(52,51,NULL,103,2,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','89255de8-74e3-4c22-bc59-cc682b7e7a4f'),(53,51,NULL,103,7,2,'2018-11-25 10:41:10','2018-11-25 10:41:10','55c2eca7-91f3-429e-8632-ef3794c2b19a'),(54,51,NULL,103,5,3,'2018-11-25 10:41:10','2018-11-25 10:41:10','6014ff51-8fac-48a2-a771-6d45877d4a93'),(56,55,NULL,103,6,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','58d70655-f709-4eb5-9927-83cac2d6ed1e'),(58,57,NULL,103,2,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','f482aa81-296a-4b16-ad76-6a76523b33a6'),(59,57,NULL,103,4,2,'2018-11-25 10:41:10','2018-11-25 10:41:10','c743576c-1d12-40e9-bd7d-510e5501c787'),(60,57,NULL,103,7,3,'2018-11-25 10:41:10','2018-11-25 10:41:10','b83c2a5c-cb4c-446d-8c5e-16b2ab574e21'),(61,57,NULL,103,3,4,'2018-11-25 10:41:10','2018-11-25 10:41:10','74620063-cd15-47e0-8d95-b475ce97ea3a'),(62,57,NULL,103,8,5,'2018-11-25 10:41:10','2018-11-25 10:41:10','f45f7f89-a59d-4bff-8dc0-db8e8bc33d2e'),(64,63,NULL,103,6,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','b2641a90-1a19-4c7a-996d-5f96390b53d9'),(66,65,NULL,103,2,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','14667e16-0f5d-4994-a78d-0d0ea91697b3'),(67,65,NULL,103,7,2,'2018-11-25 10:41:10','2018-11-25 10:41:10','4737fbd3-c254-4576-a510-551c02dcb2a0');
/*!40000 ALTER TABLE `matrixblocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matrixblocktypes`
--

DROP TABLE IF EXISTS `matrixblocktypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `matrixblocktypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fieldId` int(11) NOT NULL,
  `fieldLayoutId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `matrixblocktypes_name_fieldId_unq_idx` (`name`,`fieldId`),
  UNIQUE KEY `matrixblocktypes_handle_fieldId_unq_idx` (`handle`,`fieldId`),
  KEY `matrixblocktypes_fieldId_idx` (`fieldId`),
  KEY `matrixblocktypes_fieldLayoutId_idx` (`fieldLayoutId`),
  CONSTRAINT `matrixblocktypes_fieldId_fk` FOREIGN KEY (`fieldId`) REFERENCES `fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `matrixblocktypes_fieldLayoutId_fk` FOREIGN KEY (`fieldLayoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matrixblocktypes`
--

LOCK TABLES `matrixblocktypes` WRITE;
/*!40000 ALTER TABLE `matrixblocktypes` DISABLE KEYS */;
INSERT INTO `matrixblocktypes` VALUES (2,103,152,'Title','slatTitle',1,'2018-11-25 09:35:15','2018-11-25 11:35:07','d6233b95-37e3-4a69-b821-db483f441836'),(3,103,153,'Subtitle','subtitle',2,'2018-11-25 09:35:16','2018-11-25 11:35:07','7e3f0eb6-1aa1-4877-ac5d-c70069cafb4b'),(4,103,154,'Prose','prose',3,'2018-11-25 09:35:16','2018-11-25 11:35:07','05a6e12d-9827-40c2-bc18-4fe4df81ff98'),(5,103,156,'Image Pair','imagePair',4,'2018-11-25 09:52:02','2018-11-25 11:35:07','5d4a0146-9f7c-42d3-b965-cbd122affc41'),(6,103,157,'Large Image','largeImage',5,'2018-11-25 09:52:02','2018-11-25 11:35:07','e624daeb-7446-4a38-b40c-ceaa33ccb530'),(7,103,158,'Text Panel','textPanel',6,'2018-11-25 09:52:02','2018-11-25 11:35:07','2bc16fd3-8fea-4fe3-ba89-f11ea27de7a8'),(8,103,159,'Text + Image Panel','textImagePanel',7,'2018-11-25 10:24:19','2018-11-25 11:35:07','3027b3e8-5f61-4fdc-8159-e41ba9d09306');
/*!40000 ALTER TABLE `matrixblocktypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matrixcontent_slatcontents`
--

DROP TABLE IF EXISTS `matrixcontent_slatcontents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `matrixcontent_slatcontents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elementId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  `field_slatTitle_text` text,
  `field_subtitle_text` text,
  `field_prose_text` text,
  `field_textPanel_textFirst` text,
  `field_textPanel_textSecond` text,
  `field_textPanel_panelTitle` text,
  `field_textImagePanel_text` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `matrixcontent_slatcontents_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `matrixcontent_slatcontents_siteId_fk` (`siteId`),
  CONSTRAINT `matrixcontent_slatcontents_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `matrixcontent_slatcontents_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matrixcontent_slatcontents`
--

LOCK TABLES `matrixcontent_slatcontents` WRITE;
/*!40000 ALTER TABLE `matrixcontent_slatcontents` DISABLE KEYS */;
INSERT INTO `matrixcontent_slatcontents` VALUES (1,48,1,'2018-11-25 10:27:00','2018-11-25 10:41:10','9c0c173c-0708-45e2-ac80-338c036da19f','What can you expect?',NULL,NULL,NULL,NULL,NULL,NULL),(2,49,1,'2018-11-25 10:27:00','2018-11-25 10:41:10','66294a29-8ed6-4980-8a8c-96d37256e7e7',NULL,NULL,'<p>This three night retreat is your opportunity to take time from your busy schedule to focus on your own self-development and to connect with a small group of people in similar senior leadership positions.</p>\n<p>Design leadership can be hard, especially if you haven’t done it before. The best way to meet this challenge is through the support of your peers, so we’ve created this opportunity for you to meet like-minded design leaders, swap war stories, and build relationships we hope will last the rest of your careers.</p>\n<p>Against the backdrop of the spectacular Cotswolds we’ll also hike in the local hills and eat amazing food from the hotel’s chef (and maybe nip to the hotel owned pub across the road). Application for this event is now open — please apply by completing the form — we will be in touch by the 7th January with further details.</p>',NULL,NULL,NULL,NULL),(3,50,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','c312c9e3-c7c3-4794-aef8-a3ace8da7159',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,52,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','c543d079-7feb-4540-9d1a-80095174e128','Who is it for?',NULL,NULL,NULL,NULL,NULL,NULL),(5,53,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','ba5b5e82-dffe-4bfd-a8f6-7bd479b27fad',NULL,NULL,NULL,'<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>','<ul><li>You have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work.</li><li>You have been looking for opportunities to be part of a group of peers for mentoring and support; to share experiences and learn from one another’s stories.</li><li>You need to pause, reflect and reconnect with your own sense of purpose as a leader, in order to be able to lead others.</li></ul>',NULL,NULL),(6,54,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','15ddaa35-a567-4a22-8a7f-1f64db0f78cf',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,56,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','4240872e-a5c5-41ee-ac0c-7ec2b0418763',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,58,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','3c730551-c779-464b-a41f-0fe1d1481fe3','By the end of this retreat',NULL,NULL,NULL,NULL,NULL,NULL),(9,59,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','605c0ef1-cdb9-4181-8b52-6b24743a6f38',NULL,NULL,'<p>You’ll return to your work refreshed, inspired with increased energy and resilience, buoyed by your deeper connection to this community of design leaders. Hopefully having formed connections that will be long-lasting throughout your career.</p>',NULL,NULL,NULL,NULL),(10,60,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','ac1ec11b-3210-457e-8355-3fda76f720d7',NULL,NULL,NULL,'<ul><li>Renewed your individual definition of success</li><li>Connected with your values, purpose and sense of joy in your work</li><li>Gained deeper insight into your individual practices as a leader</li><li>Investigated what’s holding you back by challenging your beliefs and assumptions</li></ul>','<ul><li>Shared your stories and techniques and hear from others in your position</li><li>Transformed the way you work so that you can pursue your ambitions</li><li>Established strategies for re-prioritising your work and making changes that last</li></ul>','You will have',NULL),(11,61,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','72fffc39-201f-4ef0-aa8e-43e65d67f229',NULL,'Why the Rectory in the Cotswolds?',NULL,NULL,NULL,NULL,NULL),(12,62,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','849b753e-879b-427f-8e7d-fc9edbcd0a2c',NULL,NULL,NULL,NULL,NULL,NULL,'<p>We’re so excited to host our retreat at the beautiful Rectory hotel — it’s just small enough to make it feel like home, but there is plenty of space for breakout sessions.</p>\n<p>We’ll relax in this lovely low key country house hotel with its beautiful English garden. Its Georgian proportions and stylish interiors make it an elegant home from home. There will be roaring fires to help us unwind as we we discuss the days learnings.</p>'),(13,64,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','fc32dff1-740c-48ce-8ae7-351c7cdf789a',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,66,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','d1d24e9a-396a-4c3d-8991-604b1b95f4ad','Ticket information',NULL,NULL,NULL,NULL,NULL,NULL),(15,67,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','1ed46716-0c88-40a5-888a-dd164ecc5d1a',NULL,NULL,NULL,'<p>This is a small event with very limited tickets, which are by application only. We’ll be in touch to let you know once your place is confirmed.</p>\n<p>Tickets prices include all workshop sessions, excursions, accomodation and food at The Rectory.</p>','<p>You will be responsible for your own travel to and from the venue, and for any travel insurance needed for your stay.</p>\n<p><a href=\"{entry:13:url}\">Please see our terms and conditions</a></p>',NULL,NULL);
/*!40000 ALTER TABLE `matrixcontent_slatcontents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pluginId` int(11) DEFAULT NULL,
  `type` enum('app','plugin','content') NOT NULL DEFAULT 'app',
  `name` varchar(255) NOT NULL,
  `applyTime` datetime NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `migrations_pluginId_idx` (`pluginId`),
  KEY `migrations_type_pluginId_idx` (`type`,`pluginId`),
  CONSTRAINT `migrations_pluginId_fk` FOREIGN KEY (`pluginId`) REFERENCES `plugins` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,NULL,'app','Install','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','fa985052-6c4f-4b9c-a85a-479b6546d21f'),(2,NULL,'app','m150403_183908_migrations_table_changes','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','74e6495e-59f3-42db-825f-539e3acc283e'),(3,NULL,'app','m150403_184247_plugins_table_changes','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','8ff4a027-7f9a-4f8b-9de6-d94746acf9d4'),(4,NULL,'app','m150403_184533_field_version','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','d67d5a57-3f59-428f-91e0-50fa61cd930f'),(5,NULL,'app','m150403_184729_type_columns','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','9d9db1ca-b5c0-4db2-84ce-5b729368a496'),(6,NULL,'app','m150403_185142_volumes','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','9276ca5d-20e2-41cb-b0ea-b80028686f84'),(7,NULL,'app','m150428_231346_userpreferences','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','cec608f6-d894-4685-87de-7f80d9805572'),(8,NULL,'app','m150519_150900_fieldversion_conversion','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','9bcfd28f-081f-4918-b3ba-54ce7a98e1c8'),(9,NULL,'app','m150617_213829_update_email_settings','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','80bcef89-beef-4073-9843-5d6aaded8588'),(10,NULL,'app','m150721_124739_templatecachequeries','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','69d35ee1-df51-46c7-ba70-763ef2972d37'),(11,NULL,'app','m150724_140822_adjust_quality_settings','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','187bd4dc-5075-41fb-950d-1c0169f0c1ec'),(12,NULL,'app','m150815_133521_last_login_attempt_ip','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','7a89e264-c44d-4845-b6fd-528a38599ecf'),(13,NULL,'app','m151002_095935_volume_cache_settings','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','1811a5f7-c279-4d03-8807-8722b65b4c1d'),(14,NULL,'app','m151005_142750_volume_s3_storage_settings','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','e1e0b946-df71-47ba-822b-7db099022ab0'),(15,NULL,'app','m151016_133600_delete_asset_thumbnails','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','5ad45e47-e4f7-41f9-a4f0-825ede4d7796'),(16,NULL,'app','m151209_000000_move_logo','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','045564b3-f317-4bba-afb7-ee9ee550ea3a'),(17,NULL,'app','m151211_000000_rename_fileId_to_assetId','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','1deffcbd-8e84-4d31-a2e2-6787f4c8b287'),(18,NULL,'app','m151215_000000_rename_asset_permissions','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','b708324c-8cf1-4478-86b4-7df297ae8855'),(19,NULL,'app','m160707_000001_rename_richtext_assetsource_setting','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','8910a669-b38c-4bed-bc63-9be25e66f524'),(20,NULL,'app','m160708_185142_volume_hasUrls_setting','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','6bb31b16-c0f3-4d43-9968-0c6508a61cf7'),(21,NULL,'app','m160714_000000_increase_max_asset_filesize','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','e8fd5755-a882-40f4-93c9-d406d6b86a7f'),(22,NULL,'app','m160727_194637_column_cleanup','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','1c4fe607-a13c-44d2-9a48-311da2b5ef7c'),(23,NULL,'app','m160804_110002_userphotos_to_assets','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','d27dfd0e-1e3e-4eb6-a1f7-dfcc05bae491'),(24,NULL,'app','m160807_144858_sites','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','3fc6dee3-29df-4a05-82ad-2faf3899e087'),(25,NULL,'app','m160829_000000_pending_user_content_cleanup','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','9db616cb-946f-4442-a570-dbb216be52c3'),(26,NULL,'app','m160830_000000_asset_index_uri_increase','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','a0b487f6-2f7f-434e-9239-2f747f968344'),(27,NULL,'app','m160912_230520_require_entry_type_id','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','84e152e5-e559-4cc3-9548-fa606e552348'),(28,NULL,'app','m160913_134730_require_matrix_block_type_id','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','b7a78fa4-d47d-4950-bd92-b64dbb45f13b'),(29,NULL,'app','m160920_174553_matrixblocks_owner_site_id_nullable','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','d2d9a860-c10f-4aa6-ba91-29239abe72b5'),(30,NULL,'app','m160920_231045_usergroup_handle_title_unique','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','466428ca-0801-472c-a5c6-3fee8a086a42'),(31,NULL,'app','m160925_113941_route_uri_parts','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','b706f613-4f3f-402b-b2ca-17108241cc81'),(32,NULL,'app','m161006_205918_schemaVersion_not_null','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','7b86baca-685e-42a5-9c3d-b88efd8985a0'),(33,NULL,'app','m161007_130653_update_email_settings','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','cb15a853-0035-45f7-afea-c8e43b92259c'),(34,NULL,'app','m161013_175052_newParentId','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','7cddc169-7168-4914-be5a-f3adf0dbead2'),(35,NULL,'app','m161021_102916_fix_recent_entries_widgets','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','ea86d13a-85e9-457d-a2fb-208194083bfe'),(36,NULL,'app','m161021_182140_rename_get_help_widget','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','5575c530-b906-40dd-8a3f-e009d7a1d556'),(37,NULL,'app','m161025_000000_fix_char_columns','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','8c118529-ef11-4fc5-a03a-f858eaf0ee49'),(38,NULL,'app','m161029_124145_email_message_languages','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','5bf1748a-05ef-4422-9624-5658c34a5d10'),(39,NULL,'app','m161108_000000_new_version_format','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','914e7551-f9c9-431d-b8a0-abf49c9a2150'),(40,NULL,'app','m161109_000000_index_shuffle','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','94935c03-abfd-4013-87ae-003af302f366'),(41,NULL,'app','m161122_185500_no_craft_app','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','ea3372f5-cc30-408b-9da1-35a937fd88ac'),(42,NULL,'app','m161125_150752_clear_urlmanager_cache','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','b929deff-d29c-46ff-8159-d3cc1f5afdc6'),(43,NULL,'app','m161220_000000_volumes_hasurl_notnull','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','ee5d30e2-dd1b-439d-bb08-33bd356dbc49'),(44,NULL,'app','m170114_161144_udates_permission','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','e88dff40-1ab0-4ed1-8edb-7290849efdad'),(45,NULL,'app','m170120_000000_schema_cleanup','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','e67bc8f2-7495-4175-a387-3c3d34f01386'),(46,NULL,'app','m170126_000000_assets_focal_point','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','4949c1c4-8105-4e9f-95a6-14dfa6226284'),(47,NULL,'app','m170206_142126_system_name','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','88dcbc6d-a3b7-404b-8daf-275a75b26bff'),(48,NULL,'app','m170217_044740_category_branch_limits','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','b4955d9a-bf5b-4a2f-a8b2-e9b1f8b647c9'),(49,NULL,'app','m170217_120224_asset_indexing_columns','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','0a380572-b1a6-4561-bebc-4472d128dde3'),(50,NULL,'app','m170223_224012_plain_text_settings','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','d1173530-5986-440a-9fc2-11188a4cf442'),(51,NULL,'app','m170227_120814_focal_point_percentage','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','476c5c3c-cc54-42a6-bc57-10de805e53e9'),(52,NULL,'app','m170228_171113_system_messages','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','041c1316-e714-4bda-b011-06b0425b8aea'),(53,NULL,'app','m170303_140500_asset_field_source_settings','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','b42479da-f86e-4b00-812a-b72b5717683f'),(54,NULL,'app','m170306_150500_asset_temporary_uploads','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','5f20f590-3cb6-4f8d-916f-e306422754ec'),(55,NULL,'app','m170414_162429_rich_text_config_setting','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','0db91827-15a8-48c6-8a97-4de2e5fa06ae'),(56,NULL,'app','m170523_190652_element_field_layout_ids','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','3a5ec371-3de9-4bb5-8537-8cc74da3c961'),(57,NULL,'app','m170612_000000_route_index_shuffle','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','c65c3fed-1cee-43e7-b4b8-087411857f0e'),(58,NULL,'app','m170621_195237_format_plugin_handles','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','f8c63ccd-6087-48fa-96ed-4d1ab99fedc9'),(59,NULL,'app','m170630_161028_deprecation_changes','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','74743e1d-453c-4d76-9b46-321ec33785c5'),(60,NULL,'app','m170703_181539_plugins_table_tweaks','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','2e85633c-9159-4efc-9963-918749c9f243'),(61,NULL,'app','m170704_134916_sites_tables','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','2fa0a876-72fc-4fba-a44a-30d5e78e067a'),(62,NULL,'app','m170706_183216_rename_sequences','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','5031f4ae-9e9b-4abc-bfd1-110f1f175622'),(63,NULL,'app','m170707_094758_delete_compiled_traits','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','b149743d-294b-47b6-bf25-29828c245bf7'),(64,NULL,'app','m170731_190138_drop_asset_packagist','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','bda3402a-f950-4fb4-a20b-d7208ddfdc45'),(65,NULL,'app','m170810_201318_create_queue_table','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','95c02ece-1425-4ab3-b666-0b6f81799b12'),(66,NULL,'app','m170816_133741_delete_compiled_behaviors','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','25dd76bb-c116-45f1-b3d7-b0c5674f267d'),(67,NULL,'app','m170821_180624_deprecation_line_nullable','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','c9076dba-31cf-4eaa-898a-550c40e478b3'),(68,NULL,'app','m170903_192801_longblob_for_queue_jobs','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','1bb63102-6be1-4399-86a0-0e13b7757614'),(69,NULL,'app','m170914_204621_asset_cache_shuffle','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','7f0591e1-5058-478b-a7d3-5bcc729c2a2f'),(70,NULL,'app','m171011_214115_site_groups','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','9448787f-9033-4532-be82-248499fddd44'),(71,NULL,'app','m171012_151440_primary_site','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','4a6ec65c-711d-4494-90d5-3bad48ade055'),(72,NULL,'app','m171013_142500_transform_interlace','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','1d5ead35-fb3b-48a7-bcec-056b04df9c78'),(73,NULL,'app','m171016_092553_drop_position_select','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','a88b5e06-e4e2-42bc-899d-337e51543afa'),(74,NULL,'app','m171016_221244_less_strict_translation_method','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','f904368c-a2fb-4579-baca-bbfeae493cb4'),(75,NULL,'app','m171107_000000_assign_group_permissions','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','dfe450ab-f41b-49b7-9499-82d10a449853'),(76,NULL,'app','m171117_000001_templatecache_index_tune','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','8058ee39-9c75-41bb-be09-ed69fb35b818'),(77,NULL,'app','m171126_105927_disabled_plugins','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','45466c07-d444-4e41-a5a3-b68552c2d3e2'),(78,NULL,'app','m171130_214407_craftidtokens_table','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','8e50537c-4fb0-4360-9089-da00482392fb'),(79,NULL,'app','m171202_004225_update_email_settings','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','4b759aed-2ae9-4fe2-bb8b-4531d7062eae'),(80,NULL,'app','m171204_000001_templatecache_index_tune_deux','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','2959f2f0-7191-4b85-ade3-7cd381876c89'),(81,NULL,'app','m171205_130908_remove_craftidtokens_refreshtoken_column','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','18e26e75-7702-48ac-9617-bedb43dff45b'),(82,NULL,'app','m171218_143135_longtext_query_column','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','ae9ef072-abe7-42d3-8b71-c8ef4df62a05'),(83,NULL,'app','m171231_055546_environment_variables_to_aliases','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','4ffbcd3e-39c0-49d4-9dd5-5985d924f853'),(84,NULL,'app','m180113_153740_drop_users_archived_column','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','06482e69-f0af-44f5-9906-0a9071e69122'),(85,NULL,'app','m180122_213433_propagate_entries_setting','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','89002b4b-0c63-4859-b302-ca14b8920dbf'),(86,NULL,'app','m180124_230459_fix_propagate_entries_values','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','f003058a-5138-4d0c-a4bd-cda32d3a69b0'),(87,NULL,'app','m180128_235202_set_tag_slugs','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','08c77a45-b67b-4e80-b366-0e0a5e9d449f'),(88,NULL,'app','m180202_185551_fix_focal_points','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','4616992f-1136-4914-9e39-760dbfe277a4'),(89,NULL,'app','m180217_172123_tiny_ints','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','56a138df-551c-4be9-92a6-ae13f296c4e3'),(90,NULL,'app','m180321_233505_small_ints','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','24699f22-2a56-456b-b780-1c2fd95b6987'),(91,NULL,'app','m180328_115523_new_license_key_statuses','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','33038cec-09cf-491a-8cfb-0c8a0dec172f'),(92,NULL,'app','m180404_182320_edition_changes','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','1e38633f-4688-42ef-b9ae-b547ddfe241d'),(93,NULL,'app','m180411_102218_fix_db_routes','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','8e21d039-fa2a-49dd-8309-ae67444d6f6d'),(94,NULL,'app','m180416_205628_resourcepaths_table','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','a1e9bef5-6c47-46f7-8312-7d4e22546165'),(95,NULL,'app','m180418_205713_widget_cleanup','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','0a2ffb10-bdbc-4d99-9fea-0f8a0d25748b'),(96,NULL,'app','m180824_193422_case_sensitivity_fixes','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','abfeec1a-4275-4f1c-a590-e8d592b4b82c'),(97,NULL,'app','m180901_151639_fix_matrixcontent_tables','2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-07 16:34:57','24a1ffdf-64c9-4a46-a8fa-188f3a7ee22c'),(98,1,'plugin','m180430_204710_remove_old_plugins','2018-11-08 15:34:30','2018-11-08 15:34:30','2018-11-08 15:34:30','f1cf97fe-2198-4ee9-9275-58764f012191'),(99,1,'plugin','Install','2018-11-08 15:34:30','2018-11-08 15:34:30','2018-11-08 15:34:30','a404e911-b338-434b-9ab7-3406c82d37a5'),(100,2,'plugin','Install','2018-11-08 16:16:44','2018-11-08 16:16:44','2018-11-08 16:16:44','882a02e9-2e1f-4090-922e-51c44f94038a'),(101,2,'plugin','m180210_000000_migrate_content_tables','2018-11-08 16:16:44','2018-11-08 16:16:44','2018-11-08 16:16:44','f7773809-5a49-44a4-8ade-f3784bbdbccd'),(102,2,'plugin','m180211_000000_type_columns','2018-11-08 16:16:44','2018-11-08 16:16:44','2018-11-08 16:16:44','7ca74c5d-0d9e-40fa-b520-fff486803086'),(103,2,'plugin','m180219_000000_sites','2018-11-08 16:16:44','2018-11-08 16:16:44','2018-11-08 16:16:44','8b6b6f92-6e45-4c6d-89ed-7428a2336eb0'),(104,2,'plugin','m180220_000000_fix_context','2018-11-08 16:16:44','2018-11-08 16:16:44','2018-11-08 16:16:44','b9c3a322-2b50-4d6c-85f4-6cc58b8ed9ba'),(105,NULL,'app','m181112_203955_sequences_table','2018-11-22 12:51:51','2018-11-22 12:51:51','2018-11-22 12:51:51','f1750f7a-4b5d-4ff8-a4ad-9db2f31e7c54'),(106,3,'plugin','Install','2018-11-22 13:15:35','2018-11-22 13:15:35','2018-11-22 13:15:35','11a1a5b9-43eb-4f48-8462-a3564ebb66c5'),(107,3,'plugin','m181022_123749_craft3_upgrade','2018-11-22 13:15:35','2018-11-22 13:15:35','2018-11-22 13:15:35','93d39636-f18e-405c-9f15-c9220da3cc6c'),(109,6,'plugin','Install','2018-11-23 16:16:44','2018-11-23 16:16:44','2018-11-23 16:16:44','afdd2fca-f868-4b1e-b7cf-ffa684713f44'),(110,7,'plugin','Install','2018-11-25 10:01:12','2018-11-25 10:01:12','2018-11-25 10:01:12','c0b85c68-f83a-401b-8eff-82c7086c5b58'),(111,8,'plugin','Install','2018-11-25 10:08:30','2018-11-25 10:08:30','2018-11-25 10:08:30','5771b301-8371-4a63-a702-7af33c4eae64');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `neoblocks`
--

DROP TABLE IF EXISTS `neoblocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neoblocks` (
  `id` int(11) NOT NULL,
  `ownerId` int(11) NOT NULL,
  `ownerSiteId` int(11) DEFAULT NULL,
  `fieldId` int(11) NOT NULL,
  `typeId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `neoblocks_ownerId_idx` (`ownerId`),
  KEY `neoblocks_ownerSiteId_idx` (`ownerSiteId`),
  KEY `neoblocks_fieldId_idx` (`fieldId`),
  KEY `neoblocks_typeId_idx` (`typeId`),
  CONSTRAINT `neoblocks_fieldId_fk` FOREIGN KEY (`fieldId`) REFERENCES `fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `neoblocks_id_fk` FOREIGN KEY (`id`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `neoblocks_ownerId_fk` FOREIGN KEY (`ownerId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `neoblocks_ownerSiteId_fk` FOREIGN KEY (`ownerSiteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `neoblocks_typeId_fk` FOREIGN KEY (`typeId`) REFERENCES `neoblocktypes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `neoblocks`
--

LOCK TABLES `neoblocks` WRITE;
/*!40000 ALTER TABLE `neoblocks` DISABLE KEYS */;
INSERT INTO `neoblocks` VALUES (5,3,NULL,48,1,'2018-11-22 13:53:47','2018-11-25 10:41:10','d647a471-1913-4c02-b12a-97ed678ee782'),(6,3,NULL,48,4,'2018-11-22 13:53:47','2018-11-25 10:41:10','b596dde7-bfb8-470b-aa2f-44744d7bcaeb'),(7,3,NULL,48,1,'2018-11-22 13:53:47','2018-11-25 10:41:10','baa44ac9-4359-4570-bd41-693b30426bc0'),(8,3,NULL,48,6,'2018-11-22 13:53:47','2018-11-25 10:41:10','63c99728-aa64-489a-bd74-8f47bb893d8b'),(19,3,NULL,48,1,'2018-11-23 10:50:32','2018-11-25 10:41:10','8fda234b-a262-421d-8940-ed4c8f923142'),(20,3,NULL,48,4,'2018-11-23 10:50:32','2018-11-25 10:41:10','1778c154-59b5-4857-b545-a363d64a70b1'),(21,3,NULL,48,5,'2018-11-23 11:21:21','2018-11-25 10:41:10','08279032-235a-4ba1-aa3e-f79eb2780ada'),(22,3,NULL,48,7,'2018-11-23 11:21:21','2018-11-25 10:41:10','0800df7e-3a08-42b5-b95d-a58cdd3685b5'),(32,3,NULL,48,2,'2018-11-23 16:53:44','2018-11-25 10:41:10','ccf22926-9fef-4fc5-923b-986d39f81433'),(34,3,NULL,48,2,'2018-11-23 16:53:44','2018-11-25 10:41:10','cb3432b2-fcd4-4c16-b123-0d02af205403'),(37,3,NULL,48,6,'2018-11-23 16:53:44','2018-11-25 10:41:10','18528c77-f6ce-4dfb-96f0-0e7a41cd811f'),(40,3,NULL,48,1,'2018-11-23 16:53:44','2018-11-25 10:41:10','c03c4440-ef21-4915-be83-9f3a8445ae67'),(41,3,NULL,48,6,'2018-11-23 16:53:44','2018-11-25 10:41:10','252a1c5c-abd0-4aaf-89c8-610cea08910d'),(45,3,NULL,48,8,'2018-11-23 18:56:42','2018-11-25 10:41:10','2d76cac5-a977-4afb-bc98-c4ac6a18be59'),(46,3,NULL,48,8,'2018-11-23 18:56:42','2018-11-25 10:41:10','7c393002-eb29-42db-be39-e8ea3152e80d');
/*!40000 ALTER TABLE `neoblocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `neoblockstructures`
--

DROP TABLE IF EXISTS `neoblockstructures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neoblockstructures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `structureId` int(11) NOT NULL,
  `ownerId` int(11) NOT NULL,
  `ownerSiteId` int(11) DEFAULT NULL,
  `fieldId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `neoblockstructures_structureId_idx` (`structureId`),
  KEY `neoblockstructures_ownerId_idx` (`ownerId`),
  KEY `neoblockstructures_ownerSiteId_idx` (`ownerSiteId`),
  KEY `neoblockstructures_fieldId_idx` (`fieldId`),
  CONSTRAINT `neoblockstructures_fieldId_fk` FOREIGN KEY (`fieldId`) REFERENCES `fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `neoblockstructures_ownerId_fk` FOREIGN KEY (`ownerId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `neoblockstructures_ownerSiteId_fk` FOREIGN KEY (`ownerSiteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `neoblockstructures_structureId_fk` FOREIGN KEY (`structureId`) REFERENCES `structures` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `neoblockstructures`
--

LOCK TABLES `neoblockstructures` WRITE;
/*!40000 ALTER TABLE `neoblockstructures` DISABLE KEYS */;
INSERT INTO `neoblockstructures` VALUES (30,31,3,NULL,48,'2018-11-25 10:41:10','2018-11-25 10:41:10','ad4551e7-082a-4506-be66-8ad99a491d19');
/*!40000 ALTER TABLE `neoblockstructures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `neoblocktypegroups`
--

DROP TABLE IF EXISTS `neoblocktypegroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neoblocktypegroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fieldId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `neoblocktypegroups_name_fieldId_idx` (`name`,`fieldId`),
  KEY `neoblocktypegroups_fieldId_idx` (`fieldId`),
  CONSTRAINT `neoblocktypegroups_fieldId_fk` FOREIGN KEY (`fieldId`) REFERENCES `fields` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `neoblocktypegroups`
--

LOCK TABLES `neoblocktypegroups` WRITE;
/*!40000 ALTER TABLE `neoblocktypegroups` DISABLE KEYS */;
/*!40000 ALTER TABLE `neoblocktypegroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `neoblocktypes`
--

DROP TABLE IF EXISTS `neoblocktypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neoblocktypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fieldId` int(11) NOT NULL,
  `fieldLayoutId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `maxBlocks` smallint(6) unsigned DEFAULT NULL,
  `maxChildBlocks` smallint(6) unsigned DEFAULT NULL,
  `childBlocks` text,
  `topLevel` tinyint(1) NOT NULL DEFAULT '1',
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `neoblocktypes_handle_fieldId_unq_idx` (`handle`,`fieldId`),
  KEY `neoblocktypes_name_fieldId_idx` (`name`,`fieldId`),
  KEY `neoblocktypes_fieldId_idx` (`fieldId`),
  KEY `neoblocktypes_fieldLayoutId_idx` (`fieldLayoutId`),
  CONSTRAINT `neoblocktypes_fieldId_fk` FOREIGN KEY (`fieldId`) REFERENCES `fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `neoblocktypes_fieldLayoutId_fk` FOREIGN KEY (`fieldLayoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `neoblocktypes`
--

LOCK TABLES `neoblocktypes` WRITE;
/*!40000 ALTER TABLE `neoblocktypes` DISABLE KEYS */;
INSERT INTO `neoblocktypes` VALUES (1,48,143,'Content section','contentSlat',0,0,'[\"bodyText\",\"subtitle\",\"textPanel\",\"textAndImagePanel\",\"imagePair\"]',1,1,'2018-11-22 13:18:30','2018-11-23 18:53:04','62b56401-3a37-4e09-adac-9360c14fc8dd'),(2,48,148,'Image Pair','imagePair',0,0,'',0,6,'2018-11-22 13:18:30','2018-11-23 18:53:04','23fdc528-6c2d-4f51-b255-f0a45e0c59c6'),(4,48,144,'Body text','bodyText',0,0,'',0,2,'2018-11-22 13:29:21','2018-11-23 18:53:04','75bab13d-aa3d-4658-ba8a-7831bc9e6e5f'),(5,48,145,'Subtitle','subtitle',0,0,'',0,3,'2018-11-22 13:44:06','2018-11-23 18:53:04','76cc6213-4479-49ac-80ac-8bff8ed5a351'),(6,48,146,'Text Panel (two column)','textPanel',0,0,'',0,4,'2018-11-22 13:50:02','2018-11-23 18:53:04','f61fa384-5bea-4989-8058-863ed4df30e4'),(7,48,147,'Text & Image Panel','textAndImagePanel',0,0,'',0,5,'2018-11-22 14:01:31','2018-11-23 18:53:04','b27b4a67-fbda-47db-a847-1cca5b855362'),(8,48,149,'Hero image','heroSlat',0,0,'',1,7,'2018-11-23 18:46:57','2018-11-23 18:53:04','9be22472-a4e8-4929-9237-43f34abfacc6');
/*!40000 ALTER TABLE `neoblocktypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plugins`
--

DROP TABLE IF EXISTS `plugins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plugins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `handle` varchar(255) NOT NULL,
  `version` varchar(255) NOT NULL,
  `schemaVersion` varchar(255) NOT NULL,
  `licenseKey` char(24) DEFAULT NULL,
  `licenseKeyStatus` enum('valid','invalid','mismatched','astray','unknown') NOT NULL DEFAULT 'unknown',
  `enabled` tinyint(1) NOT NULL DEFAULT '0',
  `settings` text,
  `installDate` datetime NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `plugins_handle_unq_idx` (`handle`),
  KEY `plugins_enabled_idx` (`enabled`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plugins`
--

LOCK TABLES `plugins` WRITE;
/*!40000 ALTER TABLE `plugins` DISABLE KEYS */;
INSERT INTO `plugins` VALUES (1,'redactor','2.1.6','2.0.0',NULL,'unknown',1,NULL,'2018-11-08 15:34:30','2018-11-08 15:34:30','2018-11-25 14:10:56','7dce7723-b25d-4519-84cb-04f66c1205b7'),(2,'super-table','2.0.14','2.0.4',NULL,'unknown',1,NULL,'2018-11-08 16:16:43','2018-11-08 16:16:43','2018-11-25 14:10:56','5729be27-fd42-4f57-889b-2bd6fa3cbaf5'),(3,'neo','2.0.3','2.0.0',NULL,'invalid',1,NULL,'2018-11-22 13:15:35','2018-11-22 13:15:35','2018-11-25 14:10:56','31efb56e-861a-4030-8f03-9d747b0daf64'),(5,'colour-swatches','1.1.4','1.0.0',NULL,'unknown',0,NULL,'2018-11-22 15:13:40','2018-11-22 15:13:40','2018-11-23 16:18:39','09f30b50-e837-4dd8-9fd3-73efa66c191d'),(6,'aws-s3','1.0.8','1.0.0',NULL,'unknown',1,NULL,'2018-11-23 16:16:44','2018-11-23 16:16:44','2018-11-25 14:10:56','b438a389-f69c-4f03-99e4-7b5b27bebf68'),(7,'blockonomicon','1.1.4','1.0.0',NULL,'invalid',0,NULL,'2018-11-25 10:01:12','2018-11-25 10:01:12','2018-11-25 10:09:13','050b9cd4-667d-42d0-98cf-3477fa7e97c5'),(8,'spoon','3.2.4','3.0.0',NULL,'invalid',0,NULL,'2018-11-25 10:08:29','2018-11-25 10:08:29','2018-11-25 10:19:04','7d52decd-c6e5-496d-99e9-fb06acd961da');
/*!40000 ALTER TABLE `plugins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `queue`
--

DROP TABLE IF EXISTS `queue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `queue` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job` longblob NOT NULL,
  `description` text,
  `timePushed` int(11) NOT NULL,
  `ttr` int(11) NOT NULL,
  `delay` int(11) NOT NULL DEFAULT '0',
  `priority` int(11) unsigned NOT NULL DEFAULT '1024',
  `dateReserved` datetime DEFAULT NULL,
  `timeUpdated` int(11) DEFAULT NULL,
  `progress` smallint(6) NOT NULL DEFAULT '0',
  `attempt` int(11) DEFAULT NULL,
  `fail` tinyint(1) DEFAULT '0',
  `dateFailed` datetime DEFAULT NULL,
  `error` text,
  PRIMARY KEY (`id`),
  KEY `queue_fail_timeUpdated_timePushed_idx` (`fail`,`timeUpdated`,`timePushed`),
  KEY `queue_fail_timeUpdated_delay_idx` (`fail`,`timeUpdated`,`delay`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `queue`
--

LOCK TABLES `queue` WRITE;
/*!40000 ALTER TABLE `queue` DISABLE KEYS */;
/*!40000 ALTER TABLE `queue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relations`
--

DROP TABLE IF EXISTS `relations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fieldId` int(11) NOT NULL,
  `sourceId` int(11) NOT NULL,
  `sourceSiteId` int(11) DEFAULT NULL,
  `targetId` int(11) NOT NULL,
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `relations_fieldId_sourceId_sourceSiteId_targetId_unq_idx` (`fieldId`,`sourceId`,`sourceSiteId`,`targetId`),
  KEY `relations_sourceId_idx` (`sourceId`),
  KEY `relations_targetId_idx` (`targetId`),
  KEY `relations_sourceSiteId_idx` (`sourceSiteId`),
  CONSTRAINT `relations_fieldId_fk` FOREIGN KEY (`fieldId`) REFERENCES `fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `relations_sourceId_fk` FOREIGN KEY (`sourceId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `relations_sourceSiteId_fk` FOREIGN KEY (`sourceSiteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `relations_targetId_fk` FOREIGN KEY (`targetId`) REFERENCES `elements` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relations`
--

LOCK TABLES `relations` WRITE;
/*!40000 ALTER TABLE `relations` DISABLE KEYS */;
INSERT INTO `relations` VALUES (89,88,44,NULL,43,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','1335f987-10c7-4e89-ad01-a328b3f3eb15'),(90,76,17,NULL,24,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','f8608d0c-8c76-4495-98cf-dda0369544a5'),(91,61,33,NULL,27,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','553880e2-6a5f-4543-9807-3753bec9d631'),(92,62,33,NULL,30,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','b01af2f3-ccfa-4e60-b79a-4f780978d147'),(93,61,35,NULL,31,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','8dd0a805-88fc-4be5-b083-aca943cc17e0'),(94,62,35,NULL,28,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','f6ecbb2c-3302-4314-b8b4-0320212609fa'),(95,59,45,NULL,25,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','838fce74-f616-4346-a7cf-fcaec42cc178'),(96,58,23,NULL,29,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','698ec147-df65-4f4d-8431-639b2dc955d3'),(97,59,46,NULL,26,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','5061bf04-286c-4f44-9f49-98a59ec44f2f'),(98,107,50,NULL,27,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','128c7d8c-a4af-463d-a5c9-158a5f9fdc92'),(99,108,50,NULL,30,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','7067c8b6-1612-4562-8091-6d806f297e06'),(100,107,54,NULL,31,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','5b257c70-d297-4071-9b17-78b250ac51d1'),(101,108,54,NULL,28,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','d7359721-aaed-440b-84cd-d171d5af27d0'),(102,109,56,NULL,25,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','9371bea8-b0f8-4066-80ae-b2f367d56437'),(103,114,62,NULL,29,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','72351897-92bf-4175-917e-3e3bd8d41c5b'),(104,109,64,NULL,26,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','11a8d557-53e9-4762-9185-e54b69f4f8af');
/*!40000 ALTER TABLE `relations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resourcepaths`
--

DROP TABLE IF EXISTS `resourcepaths`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resourcepaths` (
  `hash` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  PRIMARY KEY (`hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resourcepaths`
--

LOCK TABLES `resourcepaths` WRITE;
/*!40000 ALTER TABLE `resourcepaths` DISABLE KEYS */;
INSERT INTO `resourcepaths` VALUES ('104e4ffd','@lib/fileupload'),('15479fa1','@app/web/assets/sites/dist'),('18ad99c5','@craft/web/assets/updater/dist'),('1f47153a','@app/web/assets/clearcaches/dist'),('203d6407','@craft/web/assets/fields/dist'),('20f8adea','@lib/fabric'),('2216e42a','@app/web/assets/deprecationerrors/dist'),('238af62f','@app/web/assets/dashboard/dist'),('24edd861','@app/web/assets/fields/dist'),('2a26c630','@lib/datepicker-i18n'),('2d1fe493','@verbb/supertable/resources/dist'),('2e20b196','@vendor/craftcms/redactor/lib/redactor'),('32c342f','@app/web/assets/editentry/dist'),('3385612c','@lib/selectize'),('35aa4465','@craft/web/assets/cp/dist'),('35be79d4','@lib/garnishjs'),('39e925a6','@lib/xregexp'),('3c77395e','@app/web/assets/updates/dist'),('3cd17418','@craft/web/assets/pluginstore/dist'),('40899f5f','@craft/web/assets/updateswidget/dist'),('457bc49b','@lib/datepicker-i18n'),('4bb0daca','@app/web/assets/fields/dist'),('4cd7f484','@app/web/assets/dashboard/dist'),('4fa5af41','@lib/fabric'),('533e16d3','@anubarak/relabel/resources'),('537a2c16','@craft/redactor/assets/field/dist'),('538c76b3','@craft/web/assets/pluginstore/dist'),('56b4270d','@lib/xregexp'),('57e04','@craft/web/assets/utilities/dist'),('5ae37b7f','@lib/garnishjs'),('5af746ce','@craft/web/assets/cp/dist'),('5cd86387','@lib/selectize'),('6036e52','@lib/d3'),('605f706a','@lib/jquery-touch-events'),('6141bb3c','@app/web/assets/plugins/dist'),('6167dd3','@lib/timepicker'),('635314b0','@app/web/assets/matrix/dist'),('6548396e','@charliedev/blockonomicon/assets/dist'),('67fb4ca8','@lib/picturefill'),('694b7f78','@lib/timepicker'),('695e6cf9','@lib/d3'),('6c713684','@app/web/assets/editentry/dist'),('77f09b6e','@craft/web/assets/updater/dist'),('7a1a9d0a','@app/web/assets/sites/dist'),('7e33dd31','@craft/web/assets/recententries/dist'),('7f134d56','@lib/fileupload'),('81d5b0d9','@craft/web/assets/editentry/dist'),('82fcfaf2','@app/web/assets/utilities/dist'),('82fd672','@craft/web/assets/tablesettings/dist'),('840c7284','@bower/jquery/dist'),('855d6fcc','@verbb/supertable/resources/dist'),('89a42a11','@lib/jquery.payment'),('8a64e03','@lib/picturefill'),('8bd694ad','@app/web/assets/tablesettings/dist'),('8be4afb6','@app/web/assets/login/dist'),('8d28f28d','@craft/awss3/resources'),('8deaa7d','@craft/web/assets/matrix/dist'),('8fdabac8','@app/web/assets/cp/dist'),('92979d45','@app/web/assets/recententries/dist'),('93f00ce6','@vendor/craftcms/redactor/lib/redactor-plugins/fullscreen'),('94e2f7e3','@app/web/assets/pluginstore/dist'),('958385f9','@lib/velocity'),('98a22d8f','@craft/web/assets/updates/dist'),('999cf3dd','@app/web/assets/feed/dist'),('9ef09c25','@craft/web/assets/deprecationerrors/dist'),('a17372d9','@craft/web/assets/dashboard/dist'),('a2bf73ea','@app/web/assets/craftsupport/dist'),('a4a5f600','@vendor/craftcms/redactor/lib/redactor-plugins/video'),('a856a7b2','@app/web/assets/matrixsettings/dist'),('ab9cd971','@lib/element-resize-detector'),('ac2ddf2b','@app/web/assets/updateswidget/dist'),('ad56b1eb','@benf/neo/resources'),('b4771cf7','@lib/jquery-ui'),('b889b33a','@app/web/assets/generalsettings/dist'),('bc26b37c','@lib'),('bc788d14','@app/web/assets/updater/dist'),('beb991b5','@craft/web/assets/matrixsettings/dist'),('c370dd80','@app/web/assets/updateswidget/dist'),('c4c1dbda','@lib/element-resize-detector'),('c594afed','@craft/web/assets/plugins/dist'),('c70ba519','@app/web/assets/matrixsettings/dist'),('cde27141','@app/web/assets/craftsupport/dist'),('d3258fbf','@app/web/assets/updater/dist'),('d37bb1d7','@lib'),('d7d4b191','@app/web/assets/generalsettings/dist'),('d8305412','@craft/web/assets/feed/dist'),('d847848','@lib/prismjs'),('db2a1e5c','@lib/jquery-ui'),('e087b863','@app/web/assets/cp/dist'),('e1cb997','@app/web/assets/plugins/dist'),('e48b9606','@app/web/assets/tablesettings/dist'),('e4b9ad1d','@app/web/assets/login/dist'),('e6f928ba','@lib/jquery.payment'),('e7256956','@craft/web/assets/craftsupport/dist'),('eb51702f','@bower/jquery/dist'),('eda1f859','@app/web/assets/utilities/dist'),('f0272c1','@lib/jquery-touch-events'),('f417e5e8','@angellco/spoon/assetbundles/dist'),('f6c1f176','@app/web/assets/feed/dist'),('fade8752','@lib/velocity'),('fbbff548','@app/web/assets/pluginstore/dist'),('fdca9fee','@app/web/assets/recententries/dist');
/*!40000 ALTER TABLE `resourcepaths` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routes`
--

DROP TABLE IF EXISTS `routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `routes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `siteId` int(11) DEFAULT NULL,
  `uriParts` varchar(255) NOT NULL,
  `uriPattern` varchar(255) NOT NULL,
  `template` varchar(500) NOT NULL,
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `routes_uriPattern_idx` (`uriPattern`),
  KEY `routes_siteId_idx` (`siteId`),
  CONSTRAINT `routes_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routes`
--

LOCK TABLES `routes` WRITE;
/*!40000 ALTER TABLE `routes` DISABLE KEYS */;
/*!40000 ALTER TABLE `routes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `searchindex`
--

DROP TABLE IF EXISTS `searchindex`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `searchindex` (
  `elementId` int(11) NOT NULL,
  `attribute` varchar(25) NOT NULL,
  `fieldId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `keywords` text NOT NULL,
  PRIMARY KEY (`elementId`,`attribute`,`fieldId`,`siteId`),
  FULLTEXT KEY `searchindex_keywords_idx` (`keywords`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `searchindex`
--

LOCK TABLES `searchindex` WRITE;
/*!40000 ALTER TABLE `searchindex` DISABLE KEYS */;
INSERT INTO `searchindex` VALUES (1,'username',0,1,' clearleft '),(1,'firstname',0,1,''),(1,'lastname',0,1,''),(1,'fullname',0,1,''),(1,'email',0,1,' dev clearleft com '),(1,'slug',0,1,''),(3,'title',0,1,' cotswolds '),(3,'slug',0,1,' cotswolds '),(3,'field',17,1,''),(3,'field',34,1,''),(3,'field',35,1,''),(3,'field',43,1,''),(3,'field',44,1,''),(3,'field',48,1,' what can you expect this three night retreat is your opportunity to take time from your busy schedule to focus on your own self development and to connect with a small group of people in similar senior leadership positions design leadership can be hard especially if you haven t done it before the best way to meet this challenge is through the support of your peers so we ve created this opportunity for you to meet like minded design leaders swap war stories and build relationships we hope will last the rest of your careers against the backdrop of the spectacular cotswolds we ll also hike in the local hills and eat amazing food from the hotel s chef and maybe nip to the hotel owned pub across the road application for this event is now open please apply by completing the form we will be in touch by the 7th january with further details cotswolds contemplating cotswolds writing muted who is it for as a design leader you re responsible for a team the direction they take how they carry out their work how they innovate and how they make progress in their individual careers that s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves you have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work you have been looking for opportunities to be part of a group of peers for mentoring and support to share experiences and learn from one another s stories you need to pause reflect and reconnect with your own sense of purpose as a leader in order to be able to lead others cotswolds walking cotswolds chatting cotswolds house muted by the end of this retreat you ll return to your work refreshed inspired with increased energy and resilience buoyed by your deeper connection to this community of design leaders hopefully having formed connections that will be long lasting throughout your career renewed your individual definition of successconnected with your values purpose and sense of joy in your workgained deeper insight into your individual practices as a leaderinvestigated what s holding you back by challenging your beliefs and assumptions you will have shared your stories and techniques and hear from others in your positiontransformed the way you work so that you can pursue your ambitionsestablished strategies for re prioritising your work and making changes that last why the rectory in the cotswolds cotswolds chairs we re so excited to host our retreat at the beautiful rectory hotel it s just small enough to make it feel like home but there is plenty of space for breakout sessions we ll relax in this lovely low key country house hotel with its beautiful english garden its georgian proportions and stylish interiors make it an elegant home from home there will be roaring fires to help us unwind as we we discuss the days learnings cotswolds room muted ticket information this is a small event with very limited tickets which are by application only we ll be in touch to let you know once your place is confirmed tickets prices include all workshop sessions excursions accomodation and food at the rectory you will be responsible for your own travel to and from the venue and for any travel insurance needed for your stay please see our terms and conditions '),(3,'field',49,1,' apply now https clearleftretreats typeform com to g5o1ff '),(4,'field',50,1,' apply now '),(4,'field',51,1,' https clearleftretreats typeform com to g5o1ff '),(4,'slug',0,1,''),(5,'field',45,1,' what can you expect '),(5,'slug',0,1,''),(6,'field',47,1,' this three night retreat is your opportunity to take time from your busy schedule to focus on your own self development and to connect with a small group of people in similar senior leadership positions design leadership can be hard especially if you haven t done it before the best way to meet this challenge is through the support of your peers so we ve created this opportunity for you to meet like minded design leaders swap war stories and build relationships we hope will last the rest of your careers against the backdrop of the spectacular cotswolds we ll also hike in the local hills and eat amazing food from the hotel s chef and maybe nip to the hotel owned pub across the road application for this event is now open please apply by completing the form we will be in touch by the 7th january with further details '),(6,'slug',0,1,''),(7,'field',45,1,' who is it for '),(7,'slug',0,1,''),(8,'field',52,1,' as a design leader you re responsible for a team the direction they take how they carry out their work how they innovate and how they make progress in their individual careers that s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves you have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work you have been looking for opportunities to be part of a group of peers for mentoring and support to share experiences and learn from one another s stories you need to pause reflect and reconnect with your own sense of purpose as a leader in order to be able to lead others '),(9,'field',53,1,''),(9,'field',54,1,' as a design leader you re responsible for a team the direction they take how they carry out their work how they innovate and how they make progress in their individual careers that s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves '),(9,'field',55,1,' you have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work you have been looking for opportunities to be part of a group of peers for mentoring and support to share experiences and learn from one another s stories you need to pause reflect and reconnect with your own sense of purpose as a leader in order to be able to lead others '),(9,'slug',0,1,''),(8,'slug',0,1,''),(3,'field',63,1,' rectory hotel crudwell the cotswolds crudwell rectory hotel http therectoryhotel com '),(3,'field',67,1,' if you d be interested in booking a place on this retreat please pencil the dates in your calendar and apply here we ll send you further information by monday 7th january if you think of someone else that it would be appropriate to invite please let us know and we can invite them along join us in the cotswolds '),(10,'field',64,1,' rectory hotel '),(10,'field',65,1,' http therectoryhotel com '),(10,'field',66,1,' rectory hotel crudwell the cotswolds '),(10,'slug',0,1,''),(11,'field',68,1,' join us in the cotswolds '),(11,'field',69,1,' if you d be interested in booking a place on this retreat please pencil the dates in your calendar and apply here we ll send you further information by monday 7th january if you think of someone else that it would be appropriate to invite please let us know and we can invite them along '),(11,'slug',0,1,''),(12,'field',70,1,' cus­tomer service we com­mu­ni­cate with users on a reg­u­lar basis to pro­vide request­ed ser­vices and about issues relat­ing to their account we reply via email or phone shar­ing clear­left does not pass on or sell infor­ma­tion about our cus­tomers to any oth­er busi­ness or organ­i­sa­tion the only excep­tion to this is where we are legal­ly oblig­ed to do so to com­ply with a cur­rent judi­cial pro­ceed­ing a court order or legal process served on our website busi­ness transitions in the event clear­left ltd goes through a busi­ness tran­si­tion users will be noti­fied via a promi­nent notice on our website for 30 days pri­or to a change of own­er­ship or con­trol of their per­son­al infor­ma­tion if as a result of the busi­ness tran­si­tion the users per­son­al­ly iden­ti­fi­able infor­ma­tion will be used dif­fer­ent­ly from that stat­ed at the time of col­lec­tion they will be giv­en choice con­sis­tent with our noti­fi­ca­tion of changes section choice opt out users who no longer wish to receive pro­mo­tion­al com­mu­ni­ca­tions may opt out of receiv­ing these com­mu­ni­ca­tions by reply­ing with ​ unsub­scribe in the sub­ject line of the email or email us at info ​clearleft ​com tele­phone on 44 0 845 838 6163 or write to clear­left ltd 68 mid­dle street brighton bn11al uk links our web­site con­tains links to oth­er sites we are not respon­si­ble for the pri­va­cy prac­tices of such oth­er sites this pri­va­cy state­ment applies sole­ly to infor­ma­tion col­lect­ed by this website sur­veys contests from time to time our site requests infor­ma­tion from users via sur­veys or con­tests par­tic­i­pa­tion in these sur­veys or con­tests is com­plete­ly vol­un­tary and the user has a choice whether or not to dis­close this infor­ma­tion the request­ed infor­ma­tion typ­i­cal­ly includes con­tact infor­ma­tion such as name and email address and busi­ness infor­ma­tion con­tact infor­ma­tion will be used to noti­fy the win­ners and award prizes sur­vey infor­ma­tion will be used for pur­pos­es of mon­i­tor­ing or improv­ing the use and sat­is­fac­tion of this site users per­son­al­ly iden­ti­fi­able infor­ma­tion is not shared with third parties '),(12,'slug',0,1,' privacy '),(12,'title',0,1,' privacy policy '),(13,'field',70,1,' these terms and conditions apply to any booking to attend our events we draw your attention to clause 6 which contains a limitation of our liability and clause 9 2 which contains an indemnity in respect of your data protection obligations 1 introduction 1 1 the event is organised and managed by clearleft limited a company registered in england and wales with registration number 05466565 the old casino 28 fourth avenue hove bn3 2pj 1 2 references to us means clearleft limited and references to we and our shall be construed accordingly reference to you means the entity completing a booking request and references to your shall be construed accordingly 1 3 all applications to register for the event and all orders to purchase the relevant documentation pack are made subject to these terms conditions which shall apply to the exclusion of any terms you attempt to be incorporate into our agreement with you 1 4 you acknowledge and accept that we have the right to publicly announce our business relationship with you which shall include but not be limited to announcements on social media such announcements shall not be disparaging or otherwise adverse to your business 2 bookings 2 1 all applications to register for the event are subject to availability and full payment being received by us 2 2 delegate passes issued for the event are valid for the named attendee only and subject to clause 4 2 below cannot be transferred to any other person delegates may be asked for a valid photographic id during the event if valid photographic id is not produced or is produced and does not in our reasonable opinion match the delegate pass we shall have the discretion to require the delegate to leave the event and if exercised the delegate must leave the event and premises the event is held at 3 prices and payment 3 1 the prices for attending the event are set out on the relevant registration booking form or on our website you may also obtain prices from us on request prices may be subject to change from time to time 3 2 if you apply to register for the event less than two 2 weeks before the date of the event we will only accept payment by a credit card unless we expressly agree otherwise in writing if for any reason we have not received payment in full prior to the date of the event you or the attending delegate will be asked as a condition of being permitted to attend the event to provide payment by credit card on the day of the event we reserve the right to cancel your booking at any time and refuse entry if full payment has not been received 3 3 you acknowledge and accept that if payment is not made in accordance with this clause 3 interest on the overdue balances including any period after the date of any judgment or decree against the customer and late payment fees fall due and payable and are calculated upon the basis set out in the late payment of commercial debts interest act 1998 as amended 4 changes to the event and cancellations 4 1 it may be necessary for reasons beyond our reasonable control to alter the advertised content timing and or location of the event or the advertised speakers we reserve the right to do this at any time where we alter the date and or location of the event we will provide you with notice of the same and will offer you the choice of either a credit for a future event of your choice up to the value of sums paid by you in respect of the event to be used within 12 months of the alteration notice or b the opportunity to attend the event as varied 4 2 if a delegate is unable to attend the event we welcome a substitute delegate attending at no extra cost provided that we have at least two 2 days prior notice of the name of your proposed substitute and payment has been received in full please notify us of any substitutions by email at alis clearleft com 4 3 we ask that you notify us if a delegate cannot attend the event if you would like to make a cancellation in respect of a booking no refunds will be given except in accordance with this clause you may cancel a booking only by sending an email to alis clearleft com clearly identifying the event the number of delegates and the delegate names the cancellation is in respect of if we receive a valid cancellation email 4 3 1 more than two 2 months prior to the planned date of the event a 50% refund will be issued 4 3 2 between two 2 months and one 1 month prior to the planned date of the event a 25% refund will be issued and 4 3 3 less than one 1 month prior to the planned date of the event no refund will be given 4 4 any refund due under clause 4 3 shall be paid within 28 days of receipt of the cancellation notice 4 5 we shall not be liable to you for travel accommodation or other costs and expenses incurred included wasted costs and expenses if we are required to cancel or relocate the event as a result of an event outside our reasonable control including without limitation to acts of god floods lightning storm fire explosion war military operations acts or threats of terrorism strike action lock outs or other industrial action or a pandemic epidemic or other widespread illness 4 6 you have no right to cancel a booking except in accordance with this clause 4 5 content 5 1 all rights in all presentations documentation and materials published or otherwise made available as part of the event including but not limited to any documentation packs or audio or audio visual recording of the event content are owned by us or are included with the permission of the owner of the rights no i photography filming or recording or ii republication broadcast or other dissemination of the content is permitted you shall not distribute reproduce modify store transfer or in any other way use any of the content save that use by the relevant delegate for internal business purposes shall be permitted and in particular but without limitation you shall not and shall procure that each of your delegates shall not 5 1 1 upload any content into any shared system 5 1 2 include any content in a database 5 1 3 include any content in a website or on any intranet 5 1 4 transmit re circulate or otherwise make available any content to anyone else 5 1 5 make any commercial use of the content whatsoever or 5 1 6 use content in any way that might infringe third party rights or that may bring us or any of our affiliates into disrepute 5 2 the content does not necessarily reflect our views or opinions 5 3 suggestions or advice contained in the content should not be relied upon in place of professional or other advice whilst we take reasonable care to ensure that the content created by us is accurate and complete some of it is supplied by third parties and we are unable to check its accuracy or completeness you should verify the accuracy of any information whether supplied by us or third parties before relying on it the content is provided on an as is basis without any warranties of any kind express or implied we hereby exclude to the fullest extent permitted by law all liabilities costs claims damages losses and or expenses arising from any inaccuracy or omission in the content or arising from any infringing defamatory or otherwise unlawful material in the content 5 4 to the extent that any content is made available by us online or in any other way other than physical hard copy form we reserve the right to suspend or remove access to such content at any time 6 liability 6 1 subject to clause 6 4 our aggregate liability to you whether such liability arises in contract tort including negligence or otherwise for any damages loss costs claims or expenses of any kind howsoever arising out of in connection with any booking or requested booking made by you or otherwise in relation to a event shall be limited to the price paid by you in respect of your booking to attend the event 6 2 subject to clause 6 4 we shall not be liable to you for i any loss of profit loss of or damage to data loss of anticipated savings or interest loss of or damage to reputation or goodwill or ii any indirect special or consequential damages loss costs claims or expenses of any kind 6 3 you agree to indemnify us our staff and our affiliates and to hold us harmless to the fullest extent permitted by law against all loss costs claims or expenses of any kind arising from any act or omission by you including your delegates during or otherwise in relation to an event 6 4 nothing in this these terms and conditions shall limit or exclude a party s liability for 6 4 1 death or personal injury caused by its negligence or the negligence of its employees agents or subcontractors 6 4 2 fraud or fraudulent misrepresentation or 6 4 3 any other liability which cannot be limited or excluded by applicable law 7 general 7 1 these terms and conditions together with any documents referred to herein or required to be entered into pursuant to these terms and conditions contain the entire agreement and understanding between us and supersede all prior agreements understandings or arrangements both oral and written relating to the subject matter of these terms and conditions and any such document 7 2 you acknowledge that in registering a delegate place you have not relied on and shall have no remedy in respect of any statement representation warranty understanding promise or assurance whether negligently or innocently made of any person other than as expressly set out in these terms and conditions 7 3 clearleft limited is part of an enlarged group which pledges to trade legally and respect all laws including the trade sanctions imposed by eu and us governments we operate a group sanctions policy which means that we cannot allow attendees at our events or awards to be based residing or connected with a country or organisation subject to eu and or us government sanctions and we reserve the right to refuse bookings from or entry to any such persons or organisations 7 4 these terms and conditions shall not create nor shall they be construed as creating any partnership or agency relationship between us 7 5 you accept that communication with us may be electronic we may contact you by e mail or provide you with information by posting notices on our website you agree to this electronic means of communication and you acknowledge that all such communications that we provide to you electronically comply with any legal or contractual requirement that such communication be made in writing 7 6 save as set out in clause 4 2 you are not permitted to re sell transfer assign or otherwise dispose of any of your rights or obligations arising under these terms and conditions 7 7 these terms and conditions and the rights and obligations of both parties shall be governed by and construed in accordance with the laws of england and wales and both parties irrevocably agree to submit to the exclusive jurisdiction of the courts of england and wales in respect of any dispute which arises hereunder 7 8 a contract formed under these terms shall terminate at the later of a the end of the event as reasonably determined by us or b on completion of all your obligations under the contract 8 consumer rights 8 1 if you are booking to attend an event and are a consumer within the definition in the consumer rights act 2015 or under other applicable consumer protection laws nothing in these terms shall exclude or limit any consumer rights that cannot be excluded or limited by law 9 data protection and privacy policy 9 1 we are the data controller for the purposes of the data protection act 2018 and the general data protection regulation regulation eu 2016 679 gdpr 9 2 by making a booking and providing any delegate personal data as defined in the gdpr to us you warrant that i you have a lawful basis for processing the personal data including where applicable fully informed consent as defined in the gdpr and notices in place to enable lawful transfer of the data to us ii you have brought our privacy policy to the attention of each delegate you are booking to attend an event and iii agree to fully indemnify us for any and all loss suffered in connection with a breach of your obligations under this clause 9 2 9 3 if making a booking to attend the event yourself you acknowledge that we may process your personal data in accordance with our privacy policy '),(13,'slug',0,1,' terms '),(13,'title',0,1,' terms and conditions '),(14,'field',70,1,' the clearleft retreats web­site has been designed and built to be acces­si­ble to as wide an audi­ence as pos­si­ble some peo­ple with dis­abil­i­ties find using the web dif­fi­cult and while we know that it is impos­si­ble to design a site that every­one can use if you have prob­lems using our site please let us know and we will do our utmost to help retreat accessibility we aim to chose venues to ensure full access for peo­ple with a wide range of dis­abil­i­ties from wheel­chair users to those with sen­so­ry and learn­ing difficulties please do let us know in plenty of time if you require help with accessibility '),(14,'slug',0,1,' accessibility '),(14,'title',0,1,' accessibility '),(15,'field',70,1,' clearleft retreats are inclu­sive events based on treat­ing all indi­vid­u­als respect­ful­ly regard­less of gen­der sex­u­al ori­en­ta­tion age dis­abil­i­ty eth­nic­i­ty reli­gion or lack there­of or soft­ware pref­er­ences so please don t be nasty or mean be nice be con­sid­er­ate be civ­il it s easy if you are being harassed notice that some­one else is being harassed or have any oth­er con­cerns please con­tact a mem­ber of clearleft staff harass­ment includes offen­sive ver­bal com­ments relat­ed to gen­der age sex­u­al ori­en­ta­tion dis­abil­i­ty phys­i­cal appear­ance body size race reli­gion sex­u­al images in pub­lic spaces delib­er­ate intim­i­da­tion stalk­ing fol­low­ing harass­ing pho­tog­ra­phy or record­ing inap­pro­pri­ate phys­i­cal con­tact and unwel­come sex­u­al attention par­tic­i­pants asked to stop any harass­ing behav­ior must imme­di­ate­ly com­ply if a par­tic­i­pant engages in any of the afore­men­tioned behav­ior we may take any action we deem appro­pri­ate from warn­ing the offend­er to imme­di­ate­ly expelling the offend­er with no refund this doc­u­ment is based on code​of​con​duct​ com licensed under a cre­ative com­mons attri­bu­tion 3 0 unport­ed license '),(15,'slug',0,1,' code of conduct '),(15,'title',0,1,' code of conduct '),(16,'slug',0,1,''),(16,'field',71,1,' alis clearleft com '),(3,'field',73,1,' 1995 '),(10,'field',72,1,' crudwell '),(3,'field',74,1,' cotswolds masthead join your peers at our design leadership retreat and hone your leadership skills '),(17,'field',75,1,' join your peers at our design leadership retreat and hone your leadership skills '),(17,'field',76,1,' cotswolds masthead '),(17,'slug',0,1,''),(3,'field',77,1,' 644094 0f0f0f ffffff b88800 f8f8f8 727272 767676 '),(18,'field',78,1,' b88800 '),(18,'field',79,1,' 644094 '),(18,'field',80,1,' 727272 '),(18,'field',81,1,' 767676 '),(18,'field',82,1,' ffffff '),(18,'field',83,1,' 0f0f0f '),(18,'field',84,1,' f8f8f8 '),(18,'slug',0,1,''),(19,'field',45,1,' by the end of this retreat '),(19,'slug',0,1,''),(20,'field',47,1,' you ll return to your work refreshed inspired with increased energy and resilience buoyed by your deeper connection to this community of design leaders hopefully having formed connections that will be long lasting throughout your career '),(20,'slug',0,1,''),(5,'field',85,1,''),(7,'field',85,1,' muted '),(19,'field',85,1,' muted '),(21,'field',46,1,' why the rectory in the cotswolds '),(21,'slug',0,1,''),(22,'field',56,1,' cotswolds chairs we re so excited to host our retreat at the beautiful rectory hotel it s just small enough to make it feel like home but there is plenty of space for breakout sessions we ll relax in this lovely low key country house hotel with its beautiful english garden its georgian proportions and stylish interiors make it an elegant home from home there will be roaring fires to help us unwind as we we discuss the days learnings '),(23,'field',57,1,' we re so excited to host our retreat at the beautiful rectory hotel it s just small enough to make it feel like home but there is plenty of space for breakout sessions we ll relax in this lovely low key country house hotel with its beautiful english garden its georgian proportions and stylish interiors make it an elegant home from home there will be roaring fires to help us unwind as we we discuss the days learnings '),(23,'field',58,1,' cotswolds chairs '),(23,'slug',0,1,''),(22,'slug',0,1,''),(24,'field',86,1,''),(24,'filename',0,1,' cotswolds masthead 1600 jpg '),(24,'extension',0,1,' jpg '),(24,'kind',0,1,' image '),(24,'slug',0,1,''),(24,'title',0,1,' cotswolds masthead '),(25,'field',86,1,' flower filled garden of a country house on a sunny day '),(25,'filename',0,1,' cotswolds house jpg '),(25,'extension',0,1,' jpg '),(25,'kind',0,1,' image '),(25,'slug',0,1,''),(25,'title',0,1,' cotswolds house '),(26,'field',86,1,' elegant living room with fireplace light shining in the window onto the dusky blue interior '),(26,'filename',0,1,' cotswolds room jpg '),(26,'extension',0,1,' jpg '),(26,'kind',0,1,' image '),(26,'slug',0,1,''),(26,'title',0,1,' cotswolds room '),(27,'field',86,1,' a group of professionals contemplating something out of frame '),(27,'filename',0,1,' cotswolds contemplating jpg '),(27,'extension',0,1,' jpg '),(27,'kind',0,1,' image '),(27,'slug',0,1,''),(27,'title',0,1,' cotswolds contemplating '),(28,'field',86,1,' two men sitting on a wooden veranda in a forest smiling and chatting '),(28,'filename',0,1,' cotswolds chatting jpg '),(28,'extension',0,1,' jpg '),(28,'kind',0,1,' image '),(28,'slug',0,1,''),(28,'title',0,1,' cotswolds chatting '),(29,'field',86,1,' two inviting chairs with a cafetiere and plates laid out on the table between them '),(29,'filename',0,1,' cotswolds chairs jpg '),(29,'extension',0,1,' jpg '),(29,'kind',0,1,' image '),(29,'slug',0,1,''),(29,'title',0,1,' cotswolds chairs '),(30,'field',86,1,' a couple of men taking notes outside on a mossy rock '),(30,'filename',0,1,' cotswolds writing jpg '),(30,'extension',0,1,' jpg '),(30,'kind',0,1,' image '),(30,'slug',0,1,''),(30,'title',0,1,' cotswolds writing '),(31,'field',86,1,' a friendly group walking along a road with beautiful scenery one man is pulling a silly face '),(31,'filename',0,1,' cotswolds walking jpg '),(31,'extension',0,1,' jpg '),(31,'kind',0,1,' image '),(31,'slug',0,1,''),(31,'title',0,1,' cotswolds walking '),(32,'field',60,1,' cotswolds contemplating cotswolds writing '),(33,'field',61,1,' cotswolds contemplating '),(33,'field',62,1,' cotswolds writing '),(33,'slug',0,1,''),(32,'slug',0,1,''),(34,'field',60,1,' cotswolds walking cotswolds chatting '),(35,'field',61,1,' cotswolds walking '),(35,'field',62,1,' cotswolds chatting '),(35,'slug',0,1,''),(34,'slug',0,1,''),(46,'field',59,1,' cotswolds room '),(45,'slug',0,1,''),(37,'field',52,1,' renewed your individual definition of successconnected with your values purpose and sense of joy in your workgained deeper insight into your individual practices as a leaderinvestigated what s holding you back by challenging your beliefs and assumptions you will have shared your stories and techniques and hear from others in your positiontransformed the way you work so that you can pursue your ambitionsestablished strategies for re prioritising your work and making changes that last '),(38,'field',53,1,' you will have '),(38,'field',54,1,' renewed your individual definition of successconnected with your values purpose and sense of joy in your workgained deeper insight into your individual practices as a leaderinvestigated what s holding you back by challenging your beliefs and assumptions '),(38,'field',55,1,' shared your stories and techniques and hear from others in your positiontransformed the way you work so that you can pursue your ambitionsestablished strategies for re prioritising your work and making changes that last '),(38,'slug',0,1,''),(37,'slug',0,1,''),(45,'field',59,1,' cotswolds house '),(40,'field',85,1,' muted '),(40,'field',45,1,' ticket information '),(40,'slug',0,1,''),(41,'field',52,1,' this is a small event with very limited tickets which are by application only we ll be in touch to let you know once your place is confirmed tickets prices include all workshop sessions excursions accomodation and food at the rectory you will be responsible for your own travel to and from the venue and for any travel insurance needed for your stay please see our terms and conditions '),(42,'field',53,1,''),(42,'field',54,1,' this is a small event with very limited tickets which are by application only we ll be in touch to let you know once your place is confirmed tickets prices include all workshop sessions excursions accomodation and food at the rectory '),(42,'field',55,1,' you will be responsible for your own travel to and from the venue and for any travel insurance needed for your stay please see our terms and conditions '),(42,'slug',0,1,''),(41,'slug',0,1,''),(3,'field',90,1,''),(3,'field',87,1,' we re thrilled that invision are joining us for this groundbreaking retreat they re the world s leading product design collaboration platform empowering teams of all sizes to prototype review iterate manage and test web and mobile products all without a single line of code founded in 2011 and headquartered in new york city invision helps millions of designers at companies like disney netflix and twitter unlock the power of design driven product development you can visit them here invision invision https www invisionapp com '),(43,'field',86,1,''),(43,'filename',0,1,' invision png '),(43,'extension',0,1,' png '),(43,'kind',0,1,' image '),(43,'slug',0,1,''),(43,'title',0,1,' invision '),(44,'field',88,1,' invision '),(44,'field',89,1,' we re thrilled that invision are joining us for this groundbreaking retreat they re the world s leading product design collaboration platform empowering teams of all sizes to prototype review iterate manage and test web and mobile products all without a single line of code founded in 2011 and headquartered in new york city invision helps millions of designers at companies like disney netflix and twitter unlock the power of design driven product development you can visit them here '),(44,'slug',0,1,''),(44,'field',96,1,' invision '),(44,'field',95,1,' https www invisionapp com '),(46,'slug',0,1,''),(3,'field',97,1,''),(3,'field',101,1,' what can you expect this three night retreat is your opportunity to take time from your busy schedule to focus on your own self development and to connect with a small group of people in similar senior leadership positions design leadership can be hard especially if you haven t done it before the best way to meet this challenge is through the support of your peers so we ve created this opportunity for you to meet like minded design leaders swap war stories and build relationships we hope will last the rest of your careers against the backdrop of the spectacular cotswolds we ll also hike in the local hills and eat amazing food from the hotel s chef and maybe nip to the hotel owned pub across the road application for this event is now open please apply by completing the form we will be in touch by the 7th january with further details cotswolds contemplating cotswolds writing who is it for as a design leader you re responsible for a team the direction they take how they carry out their work how they innovate and how they make progress in their individual careers that s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves you have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work you have been looking for opportunities to be part of a group of peers for mentoring and support to share experiences and learn from one another s stories you need to pause reflect and reconnect with your own sense of purpose as a leader in order to be able to lead others cotswolds walking cotswolds chatting muted cotswolds house muted by the end of this retreat you ll return to your work refreshed inspired with increased energy and resilience buoyed by your deeper connection to this community of design leaders hopefully having formed connections that will be long lasting throughout your career renewed your individual definition of successconnected with your values purpose and sense of joy in your workgained deeper insight into your individual practices as a leaderinvestigated what s holding you back by challenging your beliefs and assumptions shared your stories and techniques and hear from others in your positiontransformed the way you work so that you can pursue your ambitionsestablished strategies for re prioritising your work and making changes that last you will have why the rectory in the cotswolds cotswolds chairs we re so excited to host our retreat at the beautiful rectory hotel it s just small enough to make it feel like home but there is plenty of space for breakout sessions we ll relax in this lovely low key country house hotel with its beautiful english garden its georgian proportions and stylish interiors make it an elegant home from home there will be roaring fires to help us unwind as we we discuss the days learnings muted cotswolds room muted ticket information this is a small event with very limited tickets which are by application only we ll be in touch to let you know once your place is confirmed tickets prices include all workshop sessions excursions accomodation and food at the rectory you will be responsible for your own travel to and from the venue and for any travel insurance needed for your stay please see our terms and conditions muted '),(47,'field',102,1,''),(47,'field',103,1,' what can you expect this three night retreat is your opportunity to take time from your busy schedule to focus on your own self development and to connect with a small group of people in similar senior leadership positions design leadership can be hard especially if you haven t done it before the best way to meet this challenge is through the support of your peers so we ve created this opportunity for you to meet like minded design leaders swap war stories and build relationships we hope will last the rest of your careers against the backdrop of the spectacular cotswolds we ll also hike in the local hills and eat amazing food from the hotel s chef and maybe nip to the hotel owned pub across the road application for this event is now open please apply by completing the form we will be in touch by the 7th january with further details cotswolds contemplating cotswolds writing '),(48,'field',104,1,' what can you expect '),(48,'slug',0,1,''),(49,'field',106,1,' this three night retreat is your opportunity to take time from your busy schedule to focus on your own self development and to connect with a small group of people in similar senior leadership positions design leadership can be hard especially if you haven t done it before the best way to meet this challenge is through the support of your peers so we ve created this opportunity for you to meet like minded design leaders swap war stories and build relationships we hope will last the rest of your careers against the backdrop of the spectacular cotswolds we ll also hike in the local hills and eat amazing food from the hotel s chef and maybe nip to the hotel owned pub across the road application for this event is now open please apply by completing the form we will be in touch by the 7th january with further details '),(49,'slug',0,1,''),(47,'slug',0,1,''),(50,'field',107,1,' cotswolds contemplating '),(50,'field',108,1,' cotswolds writing '),(50,'slug',0,1,''),(51,'field',102,1,' muted '),(51,'field',103,1,' who is it for as a design leader you re responsible for a team the direction they take how they carry out their work how they innovate and how they make progress in their individual careers that s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves you have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work you have been looking for opportunities to be part of a group of peers for mentoring and support to share experiences and learn from one another s stories you need to pause reflect and reconnect with your own sense of purpose as a leader in order to be able to lead others cotswolds walking cotswolds chatting '),(52,'field',104,1,' who is it for '),(52,'slug',0,1,''),(53,'field',112,1,''),(53,'field',110,1,' as a design leader you re responsible for a team the direction they take how they carry out their work how they innovate and how they make progress in their individual careers that s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves '),(53,'field',111,1,' you have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work you have been looking for opportunities to be part of a group of peers for mentoring and support to share experiences and learn from one another s stories you need to pause reflect and reconnect with your own sense of purpose as a leader in order to be able to lead others '),(53,'slug',0,1,''),(54,'field',107,1,' cotswolds walking '),(54,'field',108,1,' cotswolds chatting '),(54,'slug',0,1,''),(51,'slug',0,1,''),(55,'field',102,1,' muted '),(55,'field',103,1,' cotswolds house '),(56,'field',109,1,' cotswolds house '),(56,'slug',0,1,''),(55,'slug',0,1,''),(57,'field',102,1,' muted '),(57,'field',103,1,' by the end of this retreat you ll return to your work refreshed inspired with increased energy and resilience buoyed by your deeper connection to this community of design leaders hopefully having formed connections that will be long lasting throughout your career renewed your individual definition of successconnected with your values purpose and sense of joy in your workgained deeper insight into your individual practices as a leaderinvestigated what s holding you back by challenging your beliefs and assumptions shared your stories and techniques and hear from others in your positiontransformed the way you work so that you can pursue your ambitionsestablished strategies for re prioritising your work and making changes that last you will have why the rectory in the cotswolds cotswolds chairs we re so excited to host our retreat at the beautiful rectory hotel it s just small enough to make it feel like home but there is plenty of space for breakout sessions we ll relax in this lovely low key country house hotel with its beautiful english garden its georgian proportions and stylish interiors make it an elegant home from home there will be roaring fires to help us unwind as we we discuss the days learnings '),(58,'field',104,1,' by the end of this retreat '),(58,'slug',0,1,''),(59,'field',106,1,' you ll return to your work refreshed inspired with increased energy and resilience buoyed by your deeper connection to this community of design leaders hopefully having formed connections that will be long lasting throughout your career '),(59,'slug',0,1,''),(60,'field',112,1,' you will have '),(60,'field',110,1,' renewed your individual definition of successconnected with your values purpose and sense of joy in your workgained deeper insight into your individual practices as a leaderinvestigated what s holding you back by challenging your beliefs and assumptions '),(60,'field',111,1,' shared your stories and techniques and hear from others in your positiontransformed the way you work so that you can pursue your ambitionsestablished strategies for re prioritising your work and making changes that last '),(60,'slug',0,1,''),(61,'field',105,1,' why the rectory in the cotswolds '),(61,'slug',0,1,''),(62,'field',113,1,' we re so excited to host our retreat at the beautiful rectory hotel it s just small enough to make it feel like home but there is plenty of space for breakout sessions we ll relax in this lovely low key country house hotel with its beautiful english garden its georgian proportions and stylish interiors make it an elegant home from home there will be roaring fires to help us unwind as we we discuss the days learnings '),(62,'field',114,1,' cotswolds chairs '),(62,'slug',0,1,''),(57,'slug',0,1,''),(63,'field',102,1,' muted '),(63,'field',103,1,' cotswolds room '),(64,'field',109,1,' cotswolds room '),(64,'slug',0,1,''),(63,'slug',0,1,''),(65,'field',102,1,' muted '),(65,'field',103,1,' ticket information this is a small event with very limited tickets which are by application only we ll be in touch to let you know once your place is confirmed tickets prices include all workshop sessions excursions accomodation and food at the rectory you will be responsible for your own travel to and from the venue and for any travel insurance needed for your stay please see our terms and conditions '),(66,'field',104,1,' ticket information '),(66,'slug',0,1,''),(67,'field',112,1,''),(67,'field',110,1,' this is a small event with very limited tickets which are by application only we ll be in touch to let you know once your place is confirmed tickets prices include all workshop sessions excursions accomodation and food at the rectory '),(67,'field',111,1,' you will be responsible for your own travel to and from the venue and for any travel insurance needed for your stay please see our terms and conditions '),(67,'slug',0,1,''),(65,'slug',0,1,'');
/*!40000 ALTER TABLE `searchindex` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `structureId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `type` enum('single','channel','structure') NOT NULL DEFAULT 'channel',
  `enableVersioning` tinyint(1) NOT NULL DEFAULT '0',
  `propagateEntries` tinyint(1) NOT NULL DEFAULT '1',
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sections_handle_unq_idx` (`handle`),
  UNIQUE KEY `sections_name_unq_idx` (`name`),
  KEY `sections_structureId_idx` (`structureId`),
  CONSTRAINT `sections_structureId_fk` FOREIGN KEY (`structureId`) REFERENCES `structures` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
INSERT INTO `sections` VALUES (2,NULL,'Retreats','retreats','channel',1,1,'2018-11-08 15:21:35','2018-11-22 15:58:59','b4c8dc24-5d07-4f58-b3c9-3201fefcacf7'),(3,6,'Pages','pages','structure',1,1,'2018-11-22 14:46:16','2018-11-22 15:39:15','017a7f89-6691-4550-8269-43d909d251e1');
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sections_sites`
--

DROP TABLE IF EXISTS `sections_sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sections_sites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sectionId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `hasUrls` tinyint(1) NOT NULL DEFAULT '1',
  `uriFormat` text,
  `template` varchar(500) DEFAULT NULL,
  `enabledByDefault` tinyint(1) NOT NULL DEFAULT '1',
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sections_sites_sectionId_siteId_unq_idx` (`sectionId`,`siteId`),
  KEY `sections_sites_siteId_idx` (`siteId`),
  CONSTRAINT `sections_sites_sectionId_fk` FOREIGN KEY (`sectionId`) REFERENCES `sections` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sections_sites_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections_sites`
--

LOCK TABLES `sections_sites` WRITE;
/*!40000 ALTER TABLE `sections_sites` DISABLE KEYS */;
INSERT INTO `sections_sites` VALUES (4,2,1,1,'{slug}','_retreat',1,'2018-11-08 15:21:35','2018-11-22 15:58:59','c25f13a9-166d-42d1-9b1f-43f0db53a804'),(5,3,1,1,'{slug}','_page',1,'2018-11-22 14:46:16','2018-11-22 15:39:15','899c6523-b5c4-49cd-9397-9ba5f150e7c7');
/*!40000 ALTER TABLE `sections_sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequences`
--

DROP TABLE IF EXISTS `sequences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sequences` (
  `name` varchar(255) NOT NULL,
  `next` int(11) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequences`
--

LOCK TABLES `sequences` WRITE;
/*!40000 ALTER TABLE `sequences` DISABLE KEYS */;
/*!40000 ALTER TABLE `sequences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `token` char(100) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `sessions_uid_idx` (`uid`),
  KEY `sessions_token_idx` (`token`),
  KEY `sessions_dateUpdated_idx` (`dateUpdated`),
  KEY `sessions_userId_idx` (`userId`),
  CONSTRAINT `sessions_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (1,1,'T8C8VRAJpF1ANue8Gv7lbuWGti16AIkjSGCdI5vP4cNxOg4XHaMjsv1sSMZTx-9csQOlsiv8TaNSyknbYv0OAhMEh1PZbjOKoK23','2018-11-08 10:26:16','2018-11-08 10:42:53','bec9ac72-b9f5-41bc-98fa-70a438d05cc5'),(2,1,'-chyb2WCBBK0eWCR219mGtCuOPSh4r_s0M6Bq8fKCB1HvnWHk4VIsBkd7CI1KZr5lcvEO2DjKAv2tv4Ql6Kg8iFum-RUe0XchcQP','2018-11-08 10:43:53','2018-11-08 11:28:37','f9529982-325d-43f1-96b2-6804b1c18867'),(4,1,'nxv1s3K6kSCUPl_Mv8o9Gdea1KLBfai4F-WciB-u3sesY-tsCQ-ajJHcStLHP7whxAG32AewsDx3grW5_zFzP5gyE25E9Wq_pXrj','2018-11-08 13:48:45','2018-11-08 17:48:33','cc60f23d-fbf3-4029-ad9a-80821d5d6823'),(5,1,'VQo-fXamfWIFl_oEcP8LEgd5Ag9oRO5k3yL2fMdR4zjcUjToUyVV7C-fQEgdqeFn1-Yt68Az-UI4u_S-ZNXV3Fa2ma1YdR5HYhCo','2018-11-08 17:49:02','2018-11-08 19:24:33','d4fe9326-2f38-4f44-856d-cdabf220a305'),(6,1,'EkS5cHQxVajkT3aj0hBw1wgQkhHfDP1uHsTDc9NOqg3r2BQ1_VeBEiH11q980Fhb4v8ZKhXNYoRJPfe9r2rllZaA3yPfkNK8gWhj','2018-11-12 17:24:44','2018-11-12 17:27:45','434edaa2-83ff-4464-a2b3-21b38cc6aea3'),(8,1,'PPsQxJGYZWAWgit-VRmTNh5NAB8pAXFMoofG2lwcfu4Mzd55PCdVMLR4o4-FgzlI3XdN5tl60i0SiIzPz0cPVNCzyTRv5KRrjllx','2018-11-13 11:58:25','2018-11-13 12:50:30','de9e5b80-2420-4700-848e-77b3285218ec'),(9,1,'6e2A8kOns1XU-jsdqYrDK4w3JI0OjOhG_AdXYj3lu8LLheJYGqkZbcHuxgTXrUSLe4gm8s8kYLCPcKBb-_68VAl8r7oJsC_vyiwN','2018-11-22 12:52:44','2018-11-22 17:31:42','65ce1ff2-f781-4e9f-9003-725e81f614e7'),(10,1,'mGyFEOQ-KidgJd08aOoQsAjK3ozsqhCXUc3wwMAcNhQi3zFoprOj47P9belkZ_O7f5kYH0rPDJLpKDb_v2Mri8pVHkv8WLesBDPw','2018-11-23 10:35:51','2018-11-23 11:40:33','a5e44e65-66b1-4188-9819-e8f0d38dd548'),(11,1,'WD1xdslX3uOscJ1j4bYDgGi9yieWcSvTQRC7MYhIHuiwlwzONKajwICjH6qEfaDDLSYkitmYVDDx2R5L8HAGD4qgsDvfTELGD5BF','2018-11-23 16:12:28','2018-11-23 16:24:41','28b404af-d2ff-4bfb-b828-253d8c257c9a'),(12,1,'2pOnzWmBFIbFmjVPD7StKc18iv3H38F4sleQHkwPi5XBVvdUUzpwrIQEv2D8TX8yZKzKNH_ZDIec-CDj6DciMFITd1Y9YoHbIAVu','2018-11-25 08:42:25','2018-11-25 08:58:22','3b367a73-ae6e-4c7f-bddc-22c9cc3d62e6'),(13,1,'Fx-y9SUQOsgKWsIlMQE1RQ-sEA8O-tIq3zqLVkakOJVmMQSTOc2RjtIdVugd7OPRuvhiCC21DfQ8-EJcU0hyCwNnOQnfl71FnVes','2018-11-25 08:58:52','2018-11-25 09:06:31','b4c8dd83-46c9-453e-b64a-3bf961530e86'),(14,1,'FnnC0dQ5DSe_dmyH26Nqf4MIA5-Fob-_Q8nlJb_qQDRWPcle9xVyfmBX-6_nyg9qdpXqCpWCSzqDOokfXIpVyIzFJAiNhqDV_aIa','2018-11-25 09:06:55','2018-11-25 14:49:36','3118d8e0-3ad0-49be-931c-dd2cfb6bb083');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shunnedmessages`
--

DROP TABLE IF EXISTS `shunnedmessages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shunnedmessages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `expiryDate` datetime DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `shunnedmessages_userId_message_unq_idx` (`userId`,`message`),
  CONSTRAINT `shunnedmessages_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shunnedmessages`
--

LOCK TABLES `shunnedmessages` WRITE;
/*!40000 ALTER TABLE `shunnedmessages` DISABLE KEYS */;
/*!40000 ALTER TABLE `shunnedmessages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sitegroups`
--

DROP TABLE IF EXISTS `sitegroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sitegroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sitegroups_name_unq_idx` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sitegroups`
--

LOCK TABLES `sitegroups` WRITE;
/*!40000 ALTER TABLE `sitegroups` DISABLE KEYS */;
INSERT INTO `sitegroups` VALUES (1,'Clearleft Retreats','2018-11-07 16:34:56','2018-11-07 16:34:56','b18471a4-a877-4278-9fae-5d911f4d97da');
/*!40000 ALTER TABLE `sitegroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sites`
--

DROP TABLE IF EXISTS `sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupId` int(11) NOT NULL,
  `primary` tinyint(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `language` varchar(12) NOT NULL,
  `hasUrls` tinyint(1) NOT NULL DEFAULT '0',
  `baseUrl` varchar(255) DEFAULT NULL,
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sites_handle_unq_idx` (`handle`),
  KEY `sites_sortOrder_idx` (`sortOrder`),
  KEY `sites_groupId_fk` (`groupId`),
  CONSTRAINT `sites_groupId_fk` FOREIGN KEY (`groupId`) REFERENCES `sitegroups` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sites`
--

LOCK TABLES `sites` WRITE;
/*!40000 ALTER TABLE `sites` DISABLE KEYS */;
INSERT INTO `sites` VALUES (1,1,1,'Clearleft Retreats','clearleftretreats','en-GB',1,'',1,'2018-11-07 16:34:56','2018-11-08 15:01:04','386d1eb7-bf19-4e41-9537-caf2885a09d6');
/*!40000 ALTER TABLE `sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spoon_blocktypes`
--

DROP TABLE IF EXISTS `spoon_blocktypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spoon_blocktypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fieldId` int(11) NOT NULL,
  `matrixBlockTypeId` int(11) NOT NULL,
  `fieldLayoutId` int(11) DEFAULT NULL,
  `groupName` varchar(255) NOT NULL DEFAULT '',
  `context` varchar(255) NOT NULL DEFAULT '',
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `spoon_blocktypes_fieldId_idx` (`fieldId`),
  KEY `spoon_blocktypes_matrixBlockTypeId_idx` (`matrixBlockTypeId`),
  KEY `spoon_blocktypes_fieldLayoutId_idx` (`fieldLayoutId`),
  CONSTRAINT `spoon_blocktypes_fieldId_fk` FOREIGN KEY (`fieldId`) REFERENCES `fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `spoon_blocktypes_fieldLayoutId_fk` FOREIGN KEY (`fieldLayoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `spoon_blocktypes_matrixBlockTypeId_fk` FOREIGN KEY (`matrixBlockTypeId`) REFERENCES `matrixblocktypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spoon_blocktypes`
--

LOCK TABLES `spoon_blocktypes` WRITE;
/*!40000 ALTER TABLE `spoon_blocktypes` DISABLE KEYS */;
INSERT INTO `spoon_blocktypes` VALUES (1,103,2,NULL,'Text','global','2018-11-25 10:16:27','2018-11-25 10:16:27','07796045-b98f-4973-adcc-5fdb23ea1566'),(2,103,3,NULL,'Text','global','2018-11-25 10:16:27','2018-11-25 10:16:27','fa152d1e-4d31-4cff-a80a-652d64290ffb'),(3,103,4,NULL,'Text','global','2018-11-25 10:16:27','2018-11-25 10:16:27','8f1ff3da-d79d-4ba7-94ea-12385e0b6941'),(4,103,7,NULL,'Panel','global','2018-11-25 10:16:27','2018-11-25 10:16:27','b00d5dfc-bd80-45e0-b27d-6d3a29f4ea04'),(5,103,5,NULL,'Images','global','2018-11-25 10:16:27','2018-11-25 10:16:27','099fa9a6-7ea2-426f-b66c-16f2d8c5b7e9'),(6,103,6,NULL,'Images','global','2018-11-25 10:16:27','2018-11-25 10:16:27','1f074910-178e-478e-97d2-cca4ee72a1d3');
/*!40000 ALTER TABLE `spoon_blocktypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stc_contentbuilder`
--

DROP TABLE IF EXISTS `stc_contentbuilder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stc_contentbuilder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elementId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  `field_slatStyle` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stc_contentbuilder_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `stc_contentbuilder_siteId_fk` (`siteId`),
  CONSTRAINT `stc_contentbuilder_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `stc_contentbuilder_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stc_contentbuilder`
--

LOCK TABLES `stc_contentbuilder` WRITE;
/*!40000 ALTER TABLE `stc_contentbuilder` DISABLE KEYS */;
INSERT INTO `stc_contentbuilder` VALUES (1,47,1,'2018-11-25 10:27:00','2018-11-25 10:41:10','cb9777ea-c74d-4e21-8618-e46977616061',NULL),(2,51,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','4d272103-38bc-4ee3-aea6-870dc703dd69','muted'),(3,55,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','8c88ebce-d506-4f68-a031-649276d37f0b','muted'),(4,57,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','0d2cbdf4-929a-4c4c-8d46-e51f350c38e7','muted'),(5,63,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','b33d3473-3de9-4fc4-bdd6-d7dcbaf72d3d','muted'),(6,65,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','c4c9943c-6be3-44e7-ba31-49dec56b958e','muted');
/*!40000 ALTER TABLE `stc_contentbuilder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stc_cta`
--

DROP TABLE IF EXISTS `stc_cta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stc_cta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elementId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  `field_ctaLabel` text,
  `field_ctaUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stc_cta_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `stc_cta_siteId_fk` (`siteId`),
  CONSTRAINT `stc_cta_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `stc_cta_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stc_cta`
--

LOCK TABLES `stc_cta` WRITE;
/*!40000 ALTER TABLE `stc_cta` DISABLE KEYS */;
INSERT INTO `stc_cta` VALUES (1,4,1,'2018-11-22 13:53:47','2018-11-25 10:41:09','7f1b6f00-d838-4c1b-9eff-50bf00eae1c1','Apply Now','https://clearleftretreats.typeform.com/to/g5O1Ff');
/*!40000 ALTER TABLE `stc_cta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stc_imagepair`
--

DROP TABLE IF EXISTS `stc_imagepair`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stc_imagepair` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elementId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `stc_imagepair_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `stc_imagepair_siteId_fk` (`siteId`),
  CONSTRAINT `stc_imagepair_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `stc_imagepair_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stc_imagepair`
--

LOCK TABLES `stc_imagepair` WRITE;
/*!40000 ALTER TABLE `stc_imagepair` DISABLE KEYS */;
INSERT INTO `stc_imagepair` VALUES (1,33,1,'2018-11-23 16:53:44','2018-11-25 10:41:10','fb422ebc-1ac0-412e-afdd-27d463d0abc1'),(2,35,1,'2018-11-23 16:53:44','2018-11-25 10:41:10','21aaf4df-4155-4167-bf14-d32651b5f2f2');
/*!40000 ALTER TABLE `stc_imagepair` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stc_masthead`
--

DROP TABLE IF EXISTS `stc_masthead`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stc_masthead` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elementId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  `field_mastheadTitle` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stc_masthead_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `stc_masthead_siteId_fk` (`siteId`),
  CONSTRAINT `stc_masthead_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `stc_masthead_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stc_masthead`
--

LOCK TABLES `stc_masthead` WRITE;
/*!40000 ALTER TABLE `stc_masthead` DISABLE KEYS */;
INSERT INTO `stc_masthead` VALUES (1,17,1,'2018-11-22 16:17:35','2018-11-25 10:41:10','517d9aa8-bc67-44e9-b4c0-5a715186da8a','Join your peers at our Design Leadership Retreat and hone your Leadership skills');
/*!40000 ALTER TABLE `stc_masthead` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stc_pagefooter`
--

DROP TABLE IF EXISTS `stc_pagefooter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stc_pagefooter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elementId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  `field_footerTitle` text,
  `field_footerContent` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stc_pagefooter_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `stc_pagefooter_siteId_fk` (`siteId`),
  CONSTRAINT `stc_pagefooter_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `stc_pagefooter_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stc_pagefooter`
--

LOCK TABLES `stc_pagefooter` WRITE;
/*!40000 ALTER TABLE `stc_pagefooter` DISABLE KEYS */;
INSERT INTO `stc_pagefooter` VALUES (1,11,1,'2018-11-22 14:45:32','2018-11-25 10:41:10','b536f45a-c2af-4763-b316-bc03e6d30644','Join us in the Cotswolds.','<p>If you’d be interested in booking a place on this retreat please pencil the dates in your calendar and apply here — we’ll send you further information by Monday 7th January.</p>\n<p>If you think of someone else that it would be appropriate to invite, please let us know and we can invite them along.</p>');
/*!40000 ALTER TABLE `stc_pagefooter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stc_sponsors`
--

DROP TABLE IF EXISTS `stc_sponsors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stc_sponsors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elementId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  `field_sponsorBlurb` text,
  `field_sponsorUrl` varchar(255) DEFAULT NULL,
  `field_sponsorName` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stc_sponsors_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `stc_sponsors_siteId_fk` (`siteId`),
  CONSTRAINT `stc_sponsors_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `stc_sponsors_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stc_sponsors`
--

LOCK TABLES `stc_sponsors` WRITE;
/*!40000 ALTER TABLE `stc_sponsors` DISABLE KEYS */;
INSERT INTO `stc_sponsors` VALUES (1,44,1,'2018-11-23 18:24:20','2018-11-25 10:41:10','b815a1c4-e42f-43e0-9a71-1cfe16fa37cb','<p>We\'re thrilled that InVision are joining us for this groundbreaking retreat — they\'re the world’s leading product design collaboration platform empowering teams of all sizes to prototype, review, iterate, manage and test web and mobile products — all without a single line of code. Founded in 2011 and headquartered in New York City, InVision helps millions of designers at companies like Disney, Netflix and Twitter unlock the power of design-driven product development. You can visit them <a href=\"https://www.invisionapp.com/\">here.</a></p>','https://www.invisionapp.com/','Invision');
/*!40000 ALTER TABLE `stc_sponsors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stc_textandimagepanel`
--

DROP TABLE IF EXISTS `stc_textandimagepanel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stc_textandimagepanel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elementId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  `field_panelText` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stc_textandimagepanel_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `stc_textandimagepanel_siteId_fk` (`siteId`),
  CONSTRAINT `stc_textandimagepanel_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `stc_textandimagepanel_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stc_textandimagepanel`
--

LOCK TABLES `stc_textandimagepanel` WRITE;
/*!40000 ALTER TABLE `stc_textandimagepanel` DISABLE KEYS */;
INSERT INTO `stc_textandimagepanel` VALUES (1,23,1,'2018-11-23 11:21:21','2018-11-25 10:41:10','f6f89e2d-1a4a-4995-97e3-485315a1661d','<p>We’re so excited to host our retreat at the beautiful Rectory hotel — it’s just small enough to make it feel like home, but there is plenty of space for breakout sessions.</p>\n<p>We’ll relax in this lovely low key country house hotel with its beautiful English garden. Its Georgian proportions and stylish interiors make it an elegant home from home. There will be roaring fires to help us unwind as we we discuss the days learnings.</p>');
/*!40000 ALTER TABLE `stc_textandimagepanel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stc_textpanel`
--

DROP TABLE IF EXISTS `stc_textpanel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stc_textpanel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elementId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  `field_panelTitle` text,
  `field_firstColumn` text,
  `field_secondColumn` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stc_textpanel_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `stc_textpanel_siteId_fk` (`siteId`),
  CONSTRAINT `stc_textpanel_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `stc_textpanel_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stc_textpanel`
--

LOCK TABLES `stc_textpanel` WRITE;
/*!40000 ALTER TABLE `stc_textpanel` DISABLE KEYS */;
INSERT INTO `stc_textpanel` VALUES (1,9,1,'2018-11-22 13:53:47','2018-11-25 10:41:10','9a7965d8-a9a6-4c78-8f06-513e6fc65582',NULL,'<p>As a design leader, you\'re responsible for a team, the direction they take, how they carry out their work, how they innovate, and how they make progress in their individual careers. That’s a lot of responsibility to hold and sometimes when looking after others we neglect ourselves.</p>','<ul><li>You have forged your own path in your career and are looking for the space and a facilitated environment in which to gain perspective on the way you work.</li><li>You have been looking for opportunities to be part of a group of peers for mentoring and support; to share experiences and learn from one another’s stories.</li><li>You need to pause, reflect and reconnect with your own sense of purpose as a leader, in order to be able to lead others.</li></ul>'),(2,38,1,'2018-11-23 16:53:44','2018-11-25 10:41:10','57841872-8bcb-4b67-930a-ea989c8ccc67','You will have','<ul><li>Renewed your individual definition of success</li><li>Connected with your values, purpose and sense of joy in your work</li><li>Gained deeper insight into your individual practices as a leader</li><li>Investigated what’s holding you back by challenging your beliefs and assumptions</li></ul>','<ul><li>Shared your stories and techniques and hear from others in your position</li><li>Transformed the way you work so that you can pursue your ambitions</li><li>Established strategies for re-prioritising your work and making changes that last</li></ul>'),(3,42,1,'2018-11-23 16:53:44','2018-11-25 10:41:10','a2096f01-b300-489b-a37c-4fc0c0e53668',NULL,'<p>This is a small event with very limited tickets, which are by application only. We’ll be in touch to let you know once your place is confirmed.</p>\n<p>Tickets prices include all workshop sessions, excursions, accomodation and food at The Rectory.</p>','<p>You will be responsible for your own travel to and from the venue, and for any travel insurance needed for your stay.</p>\n<p><a href=\"{entry:13:url}\"></a></p>\n<p><a href=\"{entry:13:url}\"></a></p>\n<p><a href=\"{entry:13:url}\"></a></p>\n<p><a href=\"{entry:13:url}\"></a></p>\n<p><a href=\"{entry:13:url}\"></a></p>\n<p><a href=\"{entry:13:url}\"></a></p><a href=\"{entry:13:url}\">\n</a><p><a href=\"{entry:13:url}\"></a></p>\n<p><a href=\"{entry:13:url}\"></a></p>\n<p><a href=\"{entry:13:url}\"></a></p>\n<p><a href=\"{entry:13:url}\"></a></p>\n<p><a href=\"{entry:13:url}\"></a></p>\n<p><a href=\"{entry:13:url}\">Please see our terms and conditions</a></p>');
/*!40000 ALTER TABLE `stc_textpanel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stc_themecolours`
--

DROP TABLE IF EXISTS `stc_themecolours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stc_themecolours` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elementId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  `field_themeMain` varchar(7) DEFAULT NULL,
  `field_themeAccent` varchar(7) DEFAULT NULL,
  `field_themeTextDark` varchar(7) DEFAULT NULL,
  `field_themeTextLight` varchar(7) DEFAULT NULL,
  `field_themeLight` varchar(7) DEFAULT NULL,
  `field_themeDark` varchar(7) DEFAULT NULL,
  `field_themeMuted` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stc_themecolours_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `stc_themecolours_siteId_fk` (`siteId`),
  CONSTRAINT `stc_themecolours_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `stc_themecolours_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stc_themecolours`
--

LOCK TABLES `stc_themecolours` WRITE;
/*!40000 ALTER TABLE `stc_themecolours` DISABLE KEYS */;
INSERT INTO `stc_themecolours` VALUES (1,18,1,'2018-11-22 16:48:36','2018-11-25 10:41:10','0fe40ae3-1ba9-44cd-8e9a-9aa90bd8697a','#b88800','#644094','#727272','#767676','#ffffff','#0f0f0f','#f8f8f8');
/*!40000 ALTER TABLE `stc_themecolours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stc_tickets`
--

DROP TABLE IF EXISTS `stc_tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stc_tickets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elementId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  `field_ticketType` text,
  `field_ticketPrice` int(10) DEFAULT NULL,
  `field_ticketAvailablility` int(10) DEFAULT NULL,
  `field_ticketUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stc_tickets_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `stc_tickets_siteId_fk` (`siteId`),
  CONSTRAINT `stc_tickets_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `stc_tickets_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stc_tickets`
--

LOCK TABLES `stc_tickets` WRITE;
/*!40000 ALTER TABLE `stc_tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `stc_tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stc_venue`
--

DROP TABLE IF EXISTS `stc_venue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stc_venue` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elementId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  `field_venueName` text,
  `field_venueUrl` varchar(255) DEFAULT NULL,
  `field_venueAddress` text,
  `field_venueLocation` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stc_venue_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `stc_venue_siteId_fk` (`siteId`),
  CONSTRAINT `stc_venue_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `stc_venue_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stc_venue`
--

LOCK TABLES `stc_venue` WRITE;
/*!40000 ALTER TABLE `stc_venue` DISABLE KEYS */;
INSERT INTO `stc_venue` VALUES (1,10,1,'2018-11-22 14:45:32','2018-11-25 10:41:09','25d6b0b2-80eb-48c5-a734-c28eeae4ee9c','Rectory Hotel','http://therectoryhotel.com/','Rectory Hotel, Crudwell, The Cotswolds','Crudwell');
/*!40000 ALTER TABLE `stc_venue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `structureelements`
--

DROP TABLE IF EXISTS `structureelements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `structureelements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `structureId` int(11) NOT NULL,
  `elementId` int(11) DEFAULT NULL,
  `root` int(11) unsigned DEFAULT NULL,
  `lft` int(11) unsigned NOT NULL,
  `rgt` int(11) unsigned NOT NULL,
  `level` smallint(6) unsigned NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `structureelements_structureId_elementId_unq_idx` (`structureId`,`elementId`),
  KEY `structureelements_root_idx` (`root`),
  KEY `structureelements_lft_idx` (`lft`),
  KEY `structureelements_rgt_idx` (`rgt`),
  KEY `structureelements_level_idx` (`level`),
  KEY `structureelements_elementId_idx` (`elementId`),
  CONSTRAINT `structureelements_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `structureelements_structureId_fk` FOREIGN KEY (`structureId`) REFERENCES `structures` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=287 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `structureelements`
--

LOCK TABLES `structureelements` WRITE;
/*!40000 ALTER TABLE `structureelements` DISABLE KEYS */;
INSERT INTO `structureelements` VALUES (26,6,NULL,26,1,10,0,'2018-11-22 14:57:20','2018-11-22 15:02:54','b9964629-17dc-4539-bb37-1ab25a4f1978'),(27,6,12,26,4,5,1,'2018-11-22 14:57:20','2018-11-22 15:01:39','1acc96c8-ebf5-42c6-9695-7c360530c3a3'),(28,6,13,26,2,3,1,'2018-11-22 15:01:35','2018-11-22 15:01:39','e088c75d-0a77-4cd9-89fb-949cb3cf6cfc'),(29,6,14,26,6,7,1,'2018-11-22 15:02:01','2018-11-22 15:02:01','a6b7cc9b-d386-4b06-98ec-4725aa5d3ae2'),(30,6,15,26,8,9,1,'2018-11-22 15:02:54','2018-11-22 15:02:54','09893a5d-7931-47ff-8b1c-a1e016d6bce5'),(271,31,NULL,271,1,32,0,'2018-11-25 10:41:10','2018-11-25 10:41:10','b393728a-3062-4087-9788-7b4e7657df63'),(272,31,5,271,2,7,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','21cb278c-e34a-4a6f-b1a5-eaf8b2666f26'),(273,31,6,271,3,4,2,'2018-11-25 10:41:10','2018-11-25 10:41:10','93e1d3c6-c20c-4ec8-aaad-662d25d909e7'),(274,31,32,271,5,6,2,'2018-11-25 10:41:10','2018-11-25 10:41:10','ef133b36-e93a-4d36-bc00-85309f0b5b9f'),(275,31,7,271,8,13,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','6b62c35e-e879-4eb7-92e5-1da7532ddeff'),(276,31,8,271,9,10,2,'2018-11-25 10:41:10','2018-11-25 10:41:10','0f4278e3-60fd-4a4a-9fb4-35a978f5efea'),(277,31,34,271,11,12,2,'2018-11-25 10:41:10','2018-11-25 10:41:10','dd97d0db-0e5e-48b9-8626-3c65b3698ab8'),(278,31,45,271,14,15,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','4752b20d-e19b-49b8-961e-53bd1e529c6a'),(279,31,19,271,16,25,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','f13b6e50-e069-4c3b-9b90-08c56b5e7484'),(280,31,20,271,17,18,2,'2018-11-25 10:41:10','2018-11-25 10:41:10','e9368ea8-38a8-419e-aca3-5307262b6663'),(281,31,37,271,19,20,2,'2018-11-25 10:41:10','2018-11-25 10:41:10','98eb0316-5392-49d7-857f-c9c6f75ec3ad'),(282,31,21,271,21,22,2,'2018-11-25 10:41:10','2018-11-25 10:41:10','79841228-930c-4e6f-8765-3ef70d9214d0'),(283,31,22,271,23,24,2,'2018-11-25 10:41:10','2018-11-25 10:41:10','95e56efa-6d83-44de-a151-c32ae3e1b3c2'),(284,31,46,271,26,27,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','05d61931-1e7c-411e-8fcf-551145e66a45'),(285,31,40,271,28,31,1,'2018-11-25 10:41:10','2018-11-25 10:41:10','0e07a7bb-ba4b-48dd-8362-e6bc239787ba'),(286,31,41,271,29,30,2,'2018-11-25 10:41:10','2018-11-25 10:41:10','5b57b61b-c607-469b-9282-c7d991c9d136');
/*!40000 ALTER TABLE `structureelements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `structures`
--

DROP TABLE IF EXISTS `structures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `structures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `maxLevels` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `structures`
--

LOCK TABLES `structures` WRITE;
/*!40000 ALTER TABLE `structures` DISABLE KEYS */;
INSERT INTO `structures` VALUES (6,1,'2018-11-22 14:46:16','2018-11-22 15:39:15','a9643e64-64e2-4814-8164-9c196e46aedb'),(31,NULL,'2018-11-25 10:41:10','2018-11-25 10:41:10','a97dab9e-23b0-4c9c-8ed8-85393b2d1a55');
/*!40000 ALTER TABLE `structures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supertableblocks`
--

DROP TABLE IF EXISTS `supertableblocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supertableblocks` (
  `id` int(11) NOT NULL,
  `ownerId` int(11) NOT NULL,
  `ownerSiteId` int(11) DEFAULT NULL,
  `fieldId` int(11) NOT NULL,
  `typeId` int(11) NOT NULL,
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `supertableblocks_ownerId_idx` (`ownerId`),
  KEY `supertableblocks_fieldId_idx` (`fieldId`),
  KEY `supertableblocks_typeId_idx` (`typeId`),
  KEY `supertableblocks_ownerSiteId_idx` (`ownerSiteId`),
  CONSTRAINT `supertableblocks_fieldId_fk` FOREIGN KEY (`fieldId`) REFERENCES `fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `supertableblocks_id_fk` FOREIGN KEY (`id`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `supertableblocks_ownerId_fk` FOREIGN KEY (`ownerId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `supertableblocks_ownerSiteId_fk` FOREIGN KEY (`ownerSiteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `supertableblocks_typeId_fk` FOREIGN KEY (`typeId`) REFERENCES `supertableblocktypes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supertableblocks`
--

LOCK TABLES `supertableblocks` WRITE;
/*!40000 ALTER TABLE `supertableblocks` DISABLE KEYS */;
INSERT INTO `supertableblocks` VALUES (4,3,NULL,49,2,1,'2018-11-22 13:53:47','2018-11-25 10:41:09','b9fb1765-b269-439b-9468-8cab8f375c13'),(9,8,NULL,52,3,1,'2018-11-22 13:53:47','2018-11-25 10:41:10','143f7ce6-30ca-4267-b216-88f6ada73bf5'),(10,3,NULL,63,6,1,'2018-11-22 14:45:32','2018-11-25 10:41:09','bdf8ae91-528c-4127-8720-dd6a4582c128'),(11,3,NULL,67,7,1,'2018-11-22 14:45:32','2018-11-25 10:41:10','f4c7bba5-fe6a-47df-9bd3-0f161837f5cb'),(17,3,NULL,74,8,1,'2018-11-22 16:17:35','2018-11-25 10:41:10','be0641ad-c37b-4f93-b98d-1f141c68b4ed'),(18,3,NULL,77,9,1,'2018-11-22 16:48:36','2018-11-25 10:41:10','a07b42c4-3e94-436d-9eed-f7a3cbcc5cf2'),(23,22,NULL,56,4,1,'2018-11-23 11:21:21','2018-11-25 10:41:10','4fd9912f-a8b3-4aa7-94d0-e01ae6a6adf4'),(33,32,NULL,60,5,1,'2018-11-23 16:53:44','2018-11-25 10:41:10','5b26dde7-83d3-44f6-af8a-db29c118d854'),(35,34,NULL,60,5,1,'2018-11-23 16:53:44','2018-11-25 10:41:10','d5079dc1-825e-4488-8c13-2f5d8a5e91e2'),(38,37,NULL,52,3,1,'2018-11-23 16:53:44','2018-11-25 10:41:10','284f0eb5-1442-4922-9685-12f5c97606be'),(42,41,NULL,52,3,1,'2018-11-23 16:53:44','2018-11-25 10:41:10','06ab37d9-8c16-441e-a7d4-960948bf9eca'),(44,3,NULL,87,10,1,'2018-11-23 18:24:20','2018-11-25 10:41:10','4c801de7-580b-4e01-bf7f-74318ca7ea13'),(47,3,NULL,101,13,1,'2018-11-25 10:27:00','2018-11-25 10:41:10','080d4cb8-26c1-435b-80ad-eece219809f1'),(51,3,NULL,101,13,2,'2018-11-25 10:41:10','2018-11-25 10:41:10','99b80850-3253-4c85-a501-fec930f874c1'),(55,3,NULL,101,13,3,'2018-11-25 10:41:10','2018-11-25 10:41:10','9b64e242-5e87-4c08-99f4-6c011194e084'),(57,3,NULL,101,13,4,'2018-11-25 10:41:10','2018-11-25 10:41:10','2385efc0-039f-46f1-96b4-019121f45732'),(63,3,NULL,101,13,5,'2018-11-25 10:41:10','2018-11-25 10:41:10','34a6f623-1be6-4453-8f6f-981b1955cdc5'),(65,3,NULL,101,13,6,'2018-11-25 10:41:10','2018-11-25 10:41:10','b609b7b9-69c6-4879-9e5d-f351b02d84dd');
/*!40000 ALTER TABLE `supertableblocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supertableblocktypes`
--

DROP TABLE IF EXISTS `supertableblocktypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supertableblocktypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fieldId` int(11) NOT NULL,
  `fieldLayoutId` int(11) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `supertableblocktypes_fieldId_idx` (`fieldId`),
  KEY `supertableblocktypes_fieldLayoutId_idx` (`fieldLayoutId`),
  CONSTRAINT `supertableblocktypes_fieldId_fk` FOREIGN KEY (`fieldId`) REFERENCES `fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `supertableblocktypes_fieldLayoutId_fk` FOREIGN KEY (`fieldLayoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supertableblocktypes`
--

LOCK TABLES `supertableblocktypes` WRITE;
/*!40000 ALTER TABLE `supertableblocktypes` DISABLE KEYS */;
INSERT INTO `supertableblocktypes` VALUES (2,49,27,'2018-11-22 13:39:29','2018-11-22 13:39:45','7863df27-5064-4af1-88fb-985db5767699'),(3,52,33,'2018-11-22 13:48:28','2018-11-22 13:56:37','c796477f-27ea-4c72-943c-dc4cf4ec3412'),(4,56,59,'2018-11-22 14:05:51','2018-11-23 16:34:32','8798e09f-4c16-486f-8817-df23d55832ca'),(5,60,74,'2018-11-22 14:22:16','2018-11-23 16:35:20','04083fd7-0b03-44ad-86b3-324be35e9057'),(6,63,89,'2018-11-22 14:27:55','2018-11-25 09:38:37','15ded29f-c8aa-4616-98d5-a86cd7527208'),(7,67,90,'2018-11-22 14:42:31','2018-11-22 14:43:27','80b827ff-8956-4590-b96e-5b879a1c3ab2'),(8,74,93,'2018-11-22 16:16:25','2018-11-23 16:35:59','dd02388b-6ef7-44dc-8741-d64e5f9faa95'),(9,77,94,'2018-11-22 16:31:45','2018-11-22 16:47:18','842670da-4b7d-4bfe-b878-341cff1614da'),(10,87,117,'2018-11-23 17:53:37','2018-11-23 18:32:32','12ab62dc-2acb-423c-a8b1-286341ea0f8b'),(11,90,118,'2018-11-23 18:20:42','2018-11-23 18:27:54','fa01f1a9-25a7-407f-b9bd-bce00592fc79'),(13,101,155,'2018-11-25 09:35:15','2018-11-25 11:35:07','65ec02cc-b438-4f0d-9626-e94cc39073ba');
/*!40000 ALTER TABLE `supertableblocktypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `systemmessages`
--

DROP TABLE IF EXISTS `systemmessages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `systemmessages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `language` varchar(255) NOT NULL,
  `key` varchar(255) NOT NULL,
  `subject` text NOT NULL,
  `body` text NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `systemmessages_key_language_unq_idx` (`key`,`language`),
  KEY `systemmessages_language_idx` (`language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemmessages`
--

LOCK TABLES `systemmessages` WRITE;
/*!40000 ALTER TABLE `systemmessages` DISABLE KEYS */;
/*!40000 ALTER TABLE `systemmessages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `systemsettings`
--

DROP TABLE IF EXISTS `systemsettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `systemsettings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(15) NOT NULL,
  `settings` text,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `systemsettings_category_unq_idx` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemsettings`
--

LOCK TABLES `systemsettings` WRITE;
/*!40000 ALTER TABLE `systemsettings` DISABLE KEYS */;
INSERT INTO `systemsettings` VALUES (1,'email','{\"fromEmail\":\"dev@clearleft.com\",\"fromName\":\"Clearleft Retreats\",\"transportType\":\"craft\\\\mail\\\\transportadapters\\\\Sendmail\"}','2018-11-07 16:34:57','2018-11-07 16:34:57','8f88375a-a2a1-406f-9968-6de4f8854bb4');
/*!40000 ALTER TABLE `systemsettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taggroups`
--

DROP TABLE IF EXISTS `taggroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taggroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `fieldLayoutId` int(11) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `taggroups_name_unq_idx` (`name`),
  UNIQUE KEY `taggroups_handle_unq_idx` (`handle`),
  KEY `taggroups_fieldLayoutId_fk` (`fieldLayoutId`),
  CONSTRAINT `taggroups_fieldLayoutId_fk` FOREIGN KEY (`fieldLayoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taggroups`
--

LOCK TABLES `taggroups` WRITE;
/*!40000 ALTER TABLE `taggroups` DISABLE KEYS */;
/*!40000 ALTER TABLE `taggroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `tags_groupId_idx` (`groupId`),
  CONSTRAINT `tags_groupId_fk` FOREIGN KEY (`groupId`) REFERENCES `taggroups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tags_id_fk` FOREIGN KEY (`id`) REFERENCES `elements` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templatecacheelements`
--

DROP TABLE IF EXISTS `templatecacheelements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `templatecacheelements` (
  `cacheId` int(11) NOT NULL,
  `elementId` int(11) NOT NULL,
  KEY `templatecacheelements_cacheId_idx` (`cacheId`),
  KEY `templatecacheelements_elementId_idx` (`elementId`),
  CONSTRAINT `templatecacheelements_cacheId_fk` FOREIGN KEY (`cacheId`) REFERENCES `templatecaches` (`id`) ON DELETE CASCADE,
  CONSTRAINT `templatecacheelements_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templatecacheelements`
--

LOCK TABLES `templatecacheelements` WRITE;
/*!40000 ALTER TABLE `templatecacheelements` DISABLE KEYS */;
/*!40000 ALTER TABLE `templatecacheelements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templatecachequeries`
--

DROP TABLE IF EXISTS `templatecachequeries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `templatecachequeries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cacheId` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `query` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `templatecachequeries_cacheId_idx` (`cacheId`),
  KEY `templatecachequeries_type_idx` (`type`),
  CONSTRAINT `templatecachequeries_cacheId_fk` FOREIGN KEY (`cacheId`) REFERENCES `templatecaches` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templatecachequeries`
--

LOCK TABLES `templatecachequeries` WRITE;
/*!40000 ALTER TABLE `templatecachequeries` DISABLE KEYS */;
/*!40000 ALTER TABLE `templatecachequeries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templatecaches`
--

DROP TABLE IF EXISTS `templatecaches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `templatecaches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `siteId` int(11) NOT NULL,
  `cacheKey` varchar(255) NOT NULL,
  `path` varchar(255) DEFAULT NULL,
  `expiryDate` datetime NOT NULL,
  `body` mediumtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `templatecaches_cacheKey_siteId_expiryDate_path_idx` (`cacheKey`,`siteId`,`expiryDate`,`path`),
  KEY `templatecaches_cacheKey_siteId_expiryDate_idx` (`cacheKey`,`siteId`,`expiryDate`),
  KEY `templatecaches_siteId_idx` (`siteId`),
  CONSTRAINT `templatecaches_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templatecaches`
--

LOCK TABLES `templatecaches` WRITE;
/*!40000 ALTER TABLE `templatecaches` DISABLE KEYS */;
/*!40000 ALTER TABLE `templatecaches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` char(32) NOT NULL,
  `route` text,
  `usageLimit` tinyint(3) unsigned DEFAULT NULL,
  `usageCount` tinyint(3) unsigned DEFAULT NULL,
  `expiryDate` datetime NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tokens_token_unq_idx` (`token`),
  KEY `tokens_expiryDate_idx` (`expiryDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usergroups`
--

DROP TABLE IF EXISTS `usergroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usergroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `usergroups_handle_unq_idx` (`handle`),
  UNIQUE KEY `usergroups_name_unq_idx` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usergroups`
--

LOCK TABLES `usergroups` WRITE;
/*!40000 ALTER TABLE `usergroups` DISABLE KEYS */;
/*!40000 ALTER TABLE `usergroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usergroups_users`
--

DROP TABLE IF EXISTS `usergroups_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usergroups_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `usergroups_users_groupId_userId_unq_idx` (`groupId`,`userId`),
  KEY `usergroups_users_userId_idx` (`userId`),
  CONSTRAINT `usergroups_users_groupId_fk` FOREIGN KEY (`groupId`) REFERENCES `usergroups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `usergroups_users_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usergroups_users`
--

LOCK TABLES `usergroups_users` WRITE;
/*!40000 ALTER TABLE `usergroups_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `usergroups_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userpermissions`
--

DROP TABLE IF EXISTS `userpermissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userpermissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `userpermissions_name_unq_idx` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userpermissions`
--

LOCK TABLES `userpermissions` WRITE;
/*!40000 ALTER TABLE `userpermissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `userpermissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userpermissions_usergroups`
--

DROP TABLE IF EXISTS `userpermissions_usergroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userpermissions_usergroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permissionId` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `userpermissions_usergroups_permissionId_groupId_unq_idx` (`permissionId`,`groupId`),
  KEY `userpermissions_usergroups_groupId_idx` (`groupId`),
  CONSTRAINT `userpermissions_usergroups_groupId_fk` FOREIGN KEY (`groupId`) REFERENCES `usergroups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `userpermissions_usergroups_permissionId_fk` FOREIGN KEY (`permissionId`) REFERENCES `userpermissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userpermissions_usergroups`
--

LOCK TABLES `userpermissions_usergroups` WRITE;
/*!40000 ALTER TABLE `userpermissions_usergroups` DISABLE KEYS */;
/*!40000 ALTER TABLE `userpermissions_usergroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userpermissions_users`
--

DROP TABLE IF EXISTS `userpermissions_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userpermissions_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permissionId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `userpermissions_users_permissionId_userId_unq_idx` (`permissionId`,`userId`),
  KEY `userpermissions_users_userId_idx` (`userId`),
  CONSTRAINT `userpermissions_users_permissionId_fk` FOREIGN KEY (`permissionId`) REFERENCES `userpermissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `userpermissions_users_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userpermissions_users`
--

LOCK TABLES `userpermissions_users` WRITE;
/*!40000 ALTER TABLE `userpermissions_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `userpermissions_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userpreferences`
--

DROP TABLE IF EXISTS `userpreferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userpreferences` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `preferences` text,
  PRIMARY KEY (`userId`),
  CONSTRAINT `userpreferences_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userpreferences`
--

LOCK TABLES `userpreferences` WRITE;
/*!40000 ALTER TABLE `userpreferences` DISABLE KEYS */;
INSERT INTO `userpreferences` VALUES (1,'{\"language\":\"en-GB\"}');
/*!40000 ALTER TABLE `userpreferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `photoId` int(11) DEFAULT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `locked` tinyint(1) NOT NULL DEFAULT '0',
  `suspended` tinyint(1) NOT NULL DEFAULT '0',
  `pending` tinyint(1) NOT NULL DEFAULT '0',
  `lastLoginDate` datetime DEFAULT NULL,
  `lastLoginAttemptIp` varchar(45) DEFAULT NULL,
  `invalidLoginWindowStart` datetime DEFAULT NULL,
  `invalidLoginCount` tinyint(3) unsigned DEFAULT NULL,
  `lastInvalidLoginDate` datetime DEFAULT NULL,
  `lockoutDate` datetime DEFAULT NULL,
  `hasDashboard` tinyint(1) NOT NULL DEFAULT '0',
  `verificationCode` varchar(255) DEFAULT NULL,
  `verificationCodeIssuedDate` datetime DEFAULT NULL,
  `unverifiedEmail` varchar(255) DEFAULT NULL,
  `passwordResetRequired` tinyint(1) NOT NULL DEFAULT '0',
  `lastPasswordChangeDate` datetime DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `users_uid_idx` (`uid`),
  KEY `users_verificationCode_idx` (`verificationCode`),
  KEY `users_email_idx` (`email`),
  KEY `users_username_idx` (`username`),
  KEY `users_photoId_fk` (`photoId`),
  CONSTRAINT `users_id_fk` FOREIGN KEY (`id`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_photoId_fk` FOREIGN KEY (`photoId`) REFERENCES `assets` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'clearleft',NULL,NULL,NULL,'dev@clearleft.com','$2y$13$lNYNFSO606LtjRcBUEZBeuuC/3cxxbYhllSpaU3OOHa41UsAs/aA.',1,0,0,0,'2018-11-25 09:06:55','192.168.33.1',NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,0,'2018-11-07 16:34:57','2018-11-07 16:34:57','2018-11-25 09:06:55','f541ab27-8f15-490a-9000-98e1e997eb61');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volumefolders`
--

DROP TABLE IF EXISTS `volumefolders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `volumefolders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parentId` int(11) DEFAULT NULL,
  `volumeId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `volumefolders_name_parentId_volumeId_unq_idx` (`name`,`parentId`,`volumeId`),
  KEY `volumefolders_parentId_idx` (`parentId`),
  KEY `volumefolders_volumeId_idx` (`volumeId`),
  CONSTRAINT `volumefolders_parentId_fk` FOREIGN KEY (`parentId`) REFERENCES `volumefolders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `volumefolders_volumeId_fk` FOREIGN KEY (`volumeId`) REFERENCES `volumes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volumefolders`
--

LOCK TABLES `volumefolders` WRITE;
/*!40000 ALTER TABLE `volumefolders` DISABLE KEYS */;
INSERT INTO `volumefolders` VALUES (1,NULL,1,'Images','','2018-11-23 16:23:28','2018-11-23 16:23:28','32f2a394-1408-4ff1-b1c2-4388e3f9ac36'),(2,NULL,NULL,'Temporary source',NULL,'2018-11-23 16:30:02','2018-11-23 16:30:02','2034133b-a017-4455-986f-617db564ddc9'),(3,2,NULL,'user_1','user_1/','2018-11-23 16:30:02','2018-11-23 16:30:02','2e807bf7-0827-4ead-b955-07451de8e632');
/*!40000 ALTER TABLE `volumefolders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volumes`
--

DROP TABLE IF EXISTS `volumes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `volumes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fieldLayoutId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `hasUrls` tinyint(1) NOT NULL DEFAULT '1',
  `url` varchar(255) DEFAULT NULL,
  `settings` text,
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `volumes_name_unq_idx` (`name`),
  UNIQUE KEY `volumes_handle_unq_idx` (`handle`),
  KEY `volumes_fieldLayoutId_idx` (`fieldLayoutId`),
  CONSTRAINT `volumes_fieldLayoutId_fk` FOREIGN KEY (`fieldLayoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volumes`
--

LOCK TABLES `volumes` WRITE;
/*!40000 ALTER TABLE `volumes` DISABLE KEYS */;
INSERT INTO `volumes` VALUES (1,116,'Images','images','craft\\awss3\\Volume',1,'http://clearleftretreats.s3.amazonaws.com/','{\"subfolder\":\"\",\"keyId\":\"AKIAINUDKWTYYCWLXBSQ\",\"secret\":\"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\",\"bucket\":\"clearleftretreats\",\"region\":\"eu-west-2\",\"expires\":\"\",\"storageClass\":\"\",\"cfDistributionId\":\"\"}',1,'2018-11-23 16:23:28','2018-11-23 16:30:00','21c5ac94-62ea-410b-b9f5-b5cfa7dfcbb9');
/*!40000 ALTER TABLE `volumes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `widgets`
--

DROP TABLE IF EXISTS `widgets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `widgets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `colspan` tinyint(1) NOT NULL DEFAULT '0',
  `settings` text,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `widgets_userId_idx` (`userId`),
  CONSTRAINT `widgets_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `widgets`
--

LOCK TABLES `widgets` WRITE;
/*!40000 ALTER TABLE `widgets` DISABLE KEYS */;
INSERT INTO `widgets` VALUES (1,1,'craft\\widgets\\RecentEntries',1,0,'{\"section\":\"*\",\"siteId\":\"1\",\"limit\":10}',1,'2018-11-07 16:34:58','2018-11-07 16:34:58','86d679ca-2219-45e3-9f2a-47c87b251881'),(2,1,'craft\\widgets\\CraftSupport',2,0,'[]',1,'2018-11-07 16:34:58','2018-11-07 16:34:58','b4a90c45-a8fe-4e44-9f3f-86d6eab606e0'),(3,1,'craft\\widgets\\Updates',3,0,'[]',1,'2018-11-07 16:34:58','2018-11-07 16:34:58','28154c15-5191-4189-9d97-48338142c61b'),(4,1,'craft\\widgets\\Feed',4,0,'{\"url\":\"https://craftcms.com/news.rss\",\"title\":\"Craft News\",\"limit\":5}',1,'2018-11-07 16:34:58','2018-11-07 16:34:58','6838e880-e72a-4e20-8216-045ad79f9b4d');
/*!40000 ALTER TABLE `widgets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-25 14:49:44
