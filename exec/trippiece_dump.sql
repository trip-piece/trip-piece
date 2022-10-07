-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: j7a607.q.ssafy.io    Database: trippiece
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `auth`
--

DROP TABLE IF EXISTS `auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `refresh_token` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK71o3g4vv7a893ax9k7mrh63cd` (`user_id`),
  CONSTRAINT `FK71o3g4vv7a893ax9k7mrh63cd` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth`
--

LOCK TABLES `auth` WRITE;
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
INSERT INTO `auth` VALUES (1,'eyJyZWdEYXRlIjoxNjY0NTk4MDkzMjAxLCJ0eXAiOiJSRUZSRVNIX1RPS0VOIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjEsImV4cCI6MTY2NTIwMjg5M30.27PcDnQsX19_u6bsn2pV6LoGWJLZd-_sBjM_04xrsPw',1),(2,'eyJyZWdEYXRlIjoxNjY0NjA1MzQyMzM4LCJ0eXAiOiJSRUZSRVNIX1RPS0VOIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImV4cCI6MTY2NTIxMDE0Mn0._J-8ZWm5rKOh98skRQc-ezjCjV4R_VGSV-Dp9FmxZgA',2),(3,'eyJyZWdEYXRlIjoxNjY0NjA2NTc4NzIzLCJ0eXAiOiJSRUZSRVNIX1RPS0VOIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjMsImV4cCI6MTY2NTIxMTM3OH0.CgyfI7oCK3mGsRjxE8vf0WUYv3HbaJJzM9qr_EtFa-0',3),(4,'eyJyZWdEYXRlIjoxNjY0NjA4MjkwOTUxLCJ0eXAiOiJSRUZSRVNIX1RPS0VOIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjQsImV4cCI6MTY2NTIxMzA5MH0.uhUtJSbTgeJfzLuU6VzVzzxb7DOS5XZGFtqhhDSN2zU',4),(5,'eyJyZWdEYXRlIjoxNjY0NjMwNjMzMjYyLCJ0eXAiOiJSRUZSRVNIX1RPS0VOIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjUsImV4cCI6MTY2NTIzNTQzM30.kYyaor0LdUBhw6pyrs5XJsC_G2TCW5ruG0PbzsmmI8s',5),(6,'eyJyZWdEYXRlIjoxNjY0NjMwNjYxNjUwLCJ0eXAiOiJSRUZSRVNIX1RPS0VOIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjYsImV4cCI6MTY2NTIzNTQ2MX0.IujuPkDQBAJ2L4oiW8bzwPANpTAQdHl0uBftiu3fPzg',6),(7,'eyJyZWdEYXRlIjoxNjY0NzIxMDQ4NzUxLCJ0eXAiOiJSRUZSRVNIX1RPS0VOIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjcsImV4cCI6MTY2NTMyNTg0OH0.WqSuggC92CQlemKGn_Oj5U9MlkMKVmUXrCtzu9IzyYc',7),(8,'eyJyZWdEYXRlIjoxNjY0ODc5NjE5NTY0LCJ0eXAiOiJSRUZSRVNIX1RPS0VOIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjgsImV4cCI6MTY2NTQ4NDQxOX0.1TCgYT30eK6ZvZzasVaJmknHMuX_RGeCCBWklY8jGWM',8),(9,'eyJyZWdEYXRlIjoxNjY0OTEzMTkxMDIzLCJ0eXAiOiJSRUZSRVNIX1RPS0VOIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjksImV4cCI6MTY2NTUxNzk5MX0.AGk_zEPyMGBCT0yv-9U3nFH9rM4ojy1-NCOuc4No45A',9),(10,'eyJyZWdEYXRlIjoxNjY0OTMzNjUyODYwLCJ0eXAiOiJSRUZSRVNIX1RPS0VOIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjEwLCJleHAiOjE2NjU1Mzg0NTJ9.yrzjwUsYzVgDLJ8me-5N2m336hgz_235l3dye4K5GD8',10),(11,'eyJyZWdEYXRlIjoxNjY0OTM3MTgwNjA0LCJ0eXAiOiJSRUZSRVNIX1RPS0VOIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjExLCJleHAiOjE2NjU1NDE5ODB9.WvSZRBkE4gDMSC-dSUjhYJvMVASjOLe_IwUg5szkZjg',11),(12,'eyJyZWdEYXRlIjoxNjY1MDMxODYxNjAxLCJ0eXAiOiJSRUZSRVNIX1RPS0VOIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjEyLCJleHAiOjE2NjU2MzY2NjF9.9tcm2GqNLQT9EpvJq2mPGNoBpvioSdcQQ4lW0Quw2mU',12),(13,'eyJyZWdEYXRlIjoxNjY1MDU0OTUwMjU4LCJ0eXAiOiJSRUZSRVNIX1RPS0VOIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjEzLCJleHAiOjE2NjU2NTk3NTB9.0s6jdnwSq2Z4zu-Zfa8f1YaP2cDdZBgZFJ9zsx5Xvtc',13),(14,'eyJyZWdEYXRlIjoxNjY1MDU3MzY5MzcxLCJ0eXAiOiJSRUZSRVNIX1RPS0VOIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjE0LCJleHAiOjE2NjU2NjIxNjl9.2UVtmNtqx1lNc9ewDskhF_gjwwYx5Xr5-sROAekEXBQ',14);
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `badge`
--

DROP TABLE IF EXISTS `badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `badge` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `badge_image` varchar(255) NOT NULL,
  `description` varchar(50) NOT NULL,
  `name` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_1oyxyr2p8fnvjcos2yp51qug5` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badge`
--

LOCK TABLES `badge` WRITE;
/*!40000 ALTER TABLE `badge` DISABLE KEYS */;
/*!40000 ALTER TABLE `badge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deco`
--

DROP TABLE IF EXISTS `deco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deco` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `x` float NOT NULL,
  `y` float NOT NULL,
  `diary_id` bigint DEFAULT NULL,
  `sticker_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKoy0ecie8ca8ngfiuufgv7rdg4` (`diary_id`),
  KEY `FKj91sj1sfmsu04i6diw4p2e0l7` (`sticker_id`),
  CONSTRAINT `FKj91sj1sfmsu04i6diw4p2e0l7` FOREIGN KEY (`sticker_id`) REFERENCES `sticker` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKoy0ecie8ca8ngfiuufgv7rdg4` FOREIGN KEY (`diary_id`) REFERENCES `diary` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=397 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deco`
--

LOCK TABLES `deco` WRITE;
/*!40000 ALTER TABLE `deco` DISABLE KEYS */;
INSERT INTO `deco` VALUES (332,0.455831,0.420816,57,337),(333,0.604222,0.421018,57,342),(334,0.0228872,0.435428,57,317),(335,0.520999,0.0232134,57,330),(336,0.643557,0.749607,57,293),(337,0.0481715,0.0230106,57,370),(338,0.743279,0.0207435,57,393),(339,0.391602,0.230527,53,260),(340,0.113352,0.296964,53,260),(341,0.517716,0.539805,53,260),(342,0.688388,0.383424,63,367),(343,0.48327,0.511715,63,363),(344,0.254067,0.493771,63,328),(345,0.655543,0.0681679,63,391),(346,0.606874,0.21523,63,359),(347,0.510308,0.696743,65,379),(348,0.779191,0.10083,65,374),(349,0.510799,0.695691,65,380),(350,0.274927,0.702054,65,375),(351,0.0413499,0.706625,65,391),(352,0.753505,0.487091,65,395),(353,0.745402,0.720278,65,371),(354,0.122278,0.246863,66,266),(355,0.322422,0.247494,66,267),(356,0.725377,0.250807,66,267),(357,0.522924,0.251722,66,267),(358,0.405212,0.509093,66,392),(359,0.780651,0.0902203,66,391),(360,0.298668,0.0925567,66,395),(361,0.0644794,0.0619106,66,394),(362,0.529032,0.0480895,66,393),(363,0.56787,0.509439,66,392),(364,0.734711,0.508426,66,390),(365,0.0516141,0.507412,66,388),(366,0.211837,0.522729,66,354),(367,0.270643,0.75006,66,275),(368,0.4205,0.754214,66,286),(369,0.716082,0.419423,68,271),(370,0.511334,0.495677,68,293),(371,0.286517,0.531269,68,298),(372,0.0809658,0.756346,68,372),(373,0.52573,0.250478,68,391),(374,0.693036,0.155134,68,395),(375,0.602373,0.127582,69,274),(376,0.427449,0.16559,69,278),(377,0.757713,0.133684,69,284),(378,0.3951,0.0539053,69,394),(379,0.176454,0.450381,69,386),(380,0.0250548,0.387401,69,393),(381,0.281787,0.353449,69,394),(382,0.31912,0.514064,69,447),(383,0.0892027,0.274476,69,382),(384,0.752115,0.648866,69,373),(385,0.536491,0.612686,69,290),(386,0.74449,0.514506,69,329),(387,0.640459,0.390963,69,392),(388,0.719741,0.208929,70,333),(389,0.53468,0.190788,70,337),(390,0.434908,0.1589,70,346),(391,0.761455,0.477928,70,279),(392,0.475646,0.638121,70,411),(393,0.242834,0.628149,70,434),(394,0.0331258,0.632114,70,396),(396,0.382975,0.337922,73,317);
/*!40000 ALTER TABLE `deco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diary`
--

DROP TABLE IF EXISTS `diary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diary` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `background_color` tinyint NOT NULL,
  `content` longtext,
  `create_date` datetime(6) NOT NULL,
  `font_type` tinyint NOT NULL,
  `today_photo` varchar(255) DEFAULT NULL,
  `weather` tinyint NOT NULL,
  `trip_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `ratio` float NOT NULL,
  `diary_date` datetime(6) DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKncbn6g8jqnrvxtbs1pnv9aqpv` (`trip_id`),
  KEY `FKf0xms46ulxc36096k9gg6j9ip` (`user_id`),
  CONSTRAINT `FKf0xms46ulxc36096k9gg6j9ip` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKncbn6g8jqnrvxtbs1pnv9aqpv` FOREIGN KEY (`trip_id`) REFERENCES `trip` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary`
--

LOCK TABLES `diary` WRITE;
/*!40000 ALTER TABLE `diary` DISABLE KEYS */;
INSERT INTO `diary` VALUES (49,2,'ㅁㅁㄴㅇ','2022-10-06 12:11:25.248000',0,NULL,0,50,2,0.152727,'2022-10-06 00:00:00.000000','서울특별시 관악구 행운동'),(51,3,'ㅁㅁㅁ','2022-10-06 12:25:41.242000',0,'20222506032541-화면 캡처 2022-09-22 152408.png',0,55,2,0.952159,'2022-10-06 00:00:00.000000','서울특별시 관악구 행운동'),(52,0,'ㅁㅁㄴㅇ','2022-10-06 12:28:32.624000',0,NULL,0,56,2,0.152727,'2022-10-06 00:00:00.000000','서울특별시 관악구 행운동'),(53,4,'퉁퉁이와 비실이는 나의 관찰 호기심을 불러 일으킨다....... 이제는 그 듀오를 볼 수 없다니 너무 맘이 아파서 지금 오열중이다\n흐흑흑흑흑ㄱ','2022-10-06 12:29:53.373000',0,'20222906032953-퉁퉁이와 비실이.png',0,54,2,1.03883,'2022-10-06 00:00:00.000000','서울특별시 관악구 행운동'),(54,1,'개졸리다......\n기분도 너무 별로...\n걍 다 떄려치고 잠자고싶달까','2022-10-06 12:30:30.804000',4,'20223006123056-KakaoTalk_20220416_195332026.jpg',0,57,2,1.51358,'2022-10-06 00:00:00.000000','서울특별시 관악구 행운동'),(55,3,'ㅁㄴㅇ','2022-10-06 12:41:11.330000',0,NULL,0,58,2,0.152727,'2022-10-06 00:00:00.000000','서울특별시 관악구 행운동'),(56,2,'dfdfs','2022-10-06 13:24:46.966000',0,'20222406042446-화면 캡처 2022-09-22 152408.png',0,60,2,0.952159,'2022-10-06 00:00:00.000000','서울특별시 관악구 행운동'),(57,3,'\n\n\n\n오늘 우리의 NFT가 망가졌다... 나... 좀 울고싶을지도....\n\n그래도 괜찮아 새벽에 발견해서 다 올렸으니까..\n이정도 고생했으면 나한테 다들 500만원씩 입금해야한다구 생각한다\n\n상받으면 보너스로 1000만원은 더 줘야할듯..\n기대하구 있을게 - 찡긋!\n\n\n','2022-10-06 13:28:00.130000',3,'20222806042800-울면.jpeg',0,59,3,1.79608,'2022-10-06 00:00:00.000000','인천광역시 남동구 논현1동'),(60,3,'오늘은 기부니 조아\n랄랄랄라라\n\n면저보러가야징 ㅠㅠㅠ','2022-10-06 13:41:10.316000',1,'20224106044110-20223603183654-다운로드 (1).jpeg',0,61,1,0.836125,'2022-10-06 00:00:00.000000','서울특별시 송파구 송파1동'),(61,1,'나 지금 너무 힘들어\n그럴 때마다 생각나는게 있어\n내가 이 다이어리에 많은 것을 담을 수 있을까?\n우리 팀 1등하면 좋겠다\n하지만 1등 못하더라도 3등하면 좋겠다\n아니 그냥 상 타면 좋겠다 모두가 행복할지도','2022-10-06 20:17:33.900000',3,'20221706111733-IMG_5439.JPG',0,67,13,1.10784,'2022-10-06 00:00:00.000000','서울특별시 관악구 행운동'),(62,0,'오늘 하루는 so good..\nbecause 미락카츠 먹었데시타..\n소 우마이캇타....','2022-10-06 20:33:01.792000',0,NULL,2,69,4,0.261538,'2022-10-06 00:00:00.000000','위치를 찾을 수 없어요'),(63,1,'\n\n오늘은 경복궁에 갔따!\n정말정말 재미있었당 ㅎㅎㅎㅎㅎ\n\n다음엔 꼭 덕수궁에 가야지\n\n오예에~~\n\n\n\n','2022-10-06 21:33:35.451000',0,NULL,3,59,3,0.756039,'2022-09-06 00:00:00.000000','위치를 찾을 수 없어요'),(64,3,'오늘은 싸피 오프라인을 했다. \n싸피여행 첫날이다! \n서울은 어떤 곳일까?\n집에와서 생각해보니 빨리빨리 움직여야 5일안에 서울을 다 돌 수 있을 것 같다. \n\n싸피 퇴실축제도 있다던데 어디서 해야하는지 잘 모르겠다 여행조각에서 찾아봐야겠다. \n오늘 날씨는 굉장히 좋았다.\n \n집가는 길에 카페 들렸다가 가려고 했는데 \n버스시간표를 보니 운좋게 5분정도밖에 안남아서 카페를 포기하고 홀라당 집으로 가기로 했다. \n후회는 없었다. \n\n집에 도착하니 생각보다 시간이 일러서 헬스장 가서 운동도 하고 왔다. \n\n하체 운동을 하고 다니 아주 뿌듯했다. 상빈이 만나면 힘껏 발로 차줘야지.\n\n오늘의 사진은 상빈이랑 지원이랑 먹은 청년다방 떡볶이 존맛탱이당!!!!\n','2022-10-06 21:36:10.691000',1,'20223606123610-KakaoTalk_20221006_213529836.jpg',0,71,5,2.66963,'2022-10-05 00:00:00.000000','인천광역시 남동구 논현고잔동'),(65,4,'\n오늘은 좀 진지하니까 박도연체로 써야지..\n재즈페스티벌에 다녀왔다..\n\n재즈페스티벌 하니까 재즈 때문에 주호민이 생각났다.... 당신은 재즈가 머라고 생각하시나요?\n\n슙삡두비두바 두비두비두비 뚜빕두비두비두비두비두바 슈루루루루루루부루루루룹 뒵두비두비뒵\n\n\n\n','2022-10-06 21:36:56.729000',5,NULL,1,59,3,0.811594,'2022-09-07 00:00:00.000000','인천광역시 남동구 논현1동'),(66,2,'\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n','2022-10-06 21:39:44.450000',0,NULL,0,59,3,1.0314,'2022-09-08 00:00:00.000000','인천광역시 남동구 논현1동'),(67,0,'다이어리 버그 체크','2022-10-06 21:42:43.612000',0,'20224206124243-라이츄_알로라.png',0,72,2,1.10289,'2022-10-06 00:00:00.000000','서울특별시 관악구 행운동'),(68,0,'\n\n\nㄴ몰라몰라\n아몰라!\n\n\n\n\n메롱메롱\n\n\n\n\n\n','2022-10-06 22:21:01.598000',0,NULL,0,59,3,0.975845,'2022-09-09 00:00:00.000000','인천광역시 남동구 논현1동'),(69,2,'\n\n안녕하세요~~~~\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n','2022-10-06 22:32:37.125000',0,NULL,0,59,3,1.47101,'2022-09-10 00:00:00.000000','인천광역시 남동구 논현1동'),(70,0,'\n\n\n메롱\n\n메롱메롱\n\n\n','2022-10-06 22:34:00.380000',0,NULL,0,59,3,0.591787,'2022-09-13 00:00:00.000000','인천광역시 남동구 논현1동'),(71,1,'\n\n오늘은 발표 전날이다. 너무 떨린다. \n수요일에는 싸피 오프라인이여서 역삼에 가서 기분좋게 바람이라도 쐴 수 있어서 좋았는데 오늘은.. 집에서.. 힝 ㅠㅠ 마무리작업을 했다. \n\n마지막 UCC 작업을 위해서 소래포구 역에 가서 지원이 영상을 찍어 상빈이한테 보냈다. 우리의 UCC가 정말 기대된다. 사람들이 좋아해줬으면 좋겠다.\n\n여행조각, 정말 귀엽지 않나요? 후후후 많이 사랑해주세요.  ','2022-10-07 01:40:13.829000',3,'20224006164013-KakaoTalk_20221007_011208840.jpg',1,71,5,2.01615,'2022-10-06 00:00:00.000000','인천광역시 미추홀구 용현5동'),(72,0,'오늘여행!!\n\n우헤헤','2022-10-07 04:45:59.420000',4,NULL,0,59,3,0.261333,'2022-09-12 00:00:00.000000','인천광역시 남동구 논현1동'),(73,0,'\n\n\n\n\n\n\n\n\n','2022-10-07 04:51:39.565000',0,NULL,0,59,3,0.647343,'2022-10-07 00:00:00.000000','인천광역시 남동구 논현1동');
/*!40000 ALTER TABLE `diary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frame`
--

DROP TABLE IF EXISTS `frame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `frame` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `frame_image` varchar(255) NOT NULL,
  `diary_id` bigint DEFAULT NULL,
  `region_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKe3xlku84o1jkqiw158hlab6o5` (`diary_id`),
  KEY `FKavgsdcj0i3r5syd4vp8fnaog8` (`region_id`),
  CONSTRAINT `FKavgsdcj0i3r5syd4vp8fnaog8` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKe3xlku84o1jkqiw158hlab6o5` FOREIGN KEY (`diary_id`) REFERENCES `diary` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frame`
--

LOCK TABLES `frame` WRITE;
/*!40000 ALTER TABLE `frame` DISABLE KEYS */;
INSERT INTO `frame` VALUES (42,'20222806042845-eaca7184-49e8-4d14-9c11-a6060a5db5fa.png',57,1),(43,'20224606074615-cb16971d-381b-4090-aac4-f76396e628c8.png',53,2),(44,'20223306123335-f4d7794f-3c6e-4f86-9bde-c985e22104fd.png',63,1),(45,'20223606123656-13740ae2-f5ff-478e-9290-660ff3903d59.png',65,1),(46,'20223906123944-a3e40b1b-9356-415a-a086-38fc69660bf3.png',66,1),(47,'20222106132101-971ba1cf-d868-4c81-832a-a95898513ef7.png',68,1),(48,'20223206133237-ae4aa27e-16d3-450e-9e1c-19b8e2b03ac8.png',69,1),(49,'20223406133400-d612a00e-b6af-47a6-9561-e062951f1226.png',70,1),(50,'20225206195220-a7cbbaa6-a433-47be-bf8a-ffca9fcf70d5.png',73,1);
/*!40000 ALTER TABLE `frame` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `market`
--

DROP TABLE IF EXISTS `market`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `market` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `price` float NOT NULL,
  `sticker_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKldllqs6q3k1tkxwrrfbl72lwh` (`sticker_id`),
  KEY `FK323o3m83hps7gh0xxy3rnaamq` (`user_id`),
  CONSTRAINT `FK323o3m83hps7gh0xxy3rnaamq` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKldllqs6q3k1tkxwrrfbl72lwh` FOREIGN KEY (`sticker_id`) REFERENCES `sticker` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `market`
--

LOCK TABLES `market` WRITE;
/*!40000 ALTER TABLE `market` DISABLE KEYS */;
INSERT INTO `market` VALUES (30,11,294,4),(31,15,289,4),(32,16,290,4),(36,12345,379,4);
/*!40000 ALTER TABLE `market` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `my_badge`
--

DROP TABLE IF EXISTS `my_badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_badge` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `badge_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKr47soqokn3cd36bchgmk418j1` (`badge_id`),
  KEY `FKhsbjqk8docea01xhqg723dv3s` (`user_id`),
  CONSTRAINT `FKhsbjqk8docea01xhqg723dv3s` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKr47soqokn3cd36bchgmk418j1` FOREIGN KEY (`badge_id`) REFERENCES `badge` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_badge`
--

LOCK TABLES `my_badge` WRITE;
/*!40000 ALTER TABLE `my_badge` DISABLE KEYS */;
/*!40000 ALTER TABLE `my_badge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place`
--

DROP TABLE IF EXISTS `place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `place` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `activated` bit(1) NOT NULL,
  `amount` int NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `end_date` date NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  `location_address` varchar(100) NOT NULL,
  `manager_email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `poster_image` varchar(255) NOT NULL,
  `qr_image` varchar(255) DEFAULT NULL,
  `start_date` date NOT NULL,
  `type` int NOT NULL,
  `region_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkuxqythqjj3e6u43grkej2ft8` (`region_id`),
  CONSTRAINT `FKkuxqythqjj3e6u43grkej2ft8` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place`
--

LOCK TABLES `place` WRITE;
/*!40000 ALTER TABLE `place` DISABLE KEYS */;
INSERT INTO `place` VALUES (15,_binary '',14,'ZnsRLs^xx5','2022-10-14',35.1538,129.119,'부산 수영구 광안해변로 219 광안리 관광안내소','jiwon0297@naver.com','광안리 해수욕장','20221506011524-광안리해수욕장.png','20220006150000-광안리 해수욕장_QR','2022-10-03',0,2),(16,_binary '',15,'7Cz5VGE19W','2022-10-15',37.5513,126.989,'서울 용산구 남산공원길 105 N서울타워 전망대','jiwon0297@naver.com','남산타워','20221706011747-남산타워.png','20220006150004-남산타워_QR','2022-10-03',0,1),(17,_binary '',13,'Awvhiev!%C','2022-10-15',33.5072,126.494,'제주특별자치도 제주시 공항로 2 공항 GATE 2','jiwon0297@naver.com','제주국제공항','20223606023647-제주도.png','20220006150008-제주국제공항_QR','2022-10-03',0,17),(18,_binary '',15,'lAdIQPs^NH','2022-10-14',37.5126,127.059,'서울 강남구 영동대로 513 코엑스몰','jiwon0297@naver.com','삼성역 코엑스','20224006024021-코엑스.png','20220006150012-삼성역 코엑스_QR','2022-10-03',0,1),(19,_binary '',15,'zjrQv5DC1A','2022-10-14',37.5132,127.101,'서울특별시 송파구 올림픽로 265 잠실역 1번출구','jiwon0297@naver.com','잠실역','20224106024146-잠실역.png','20220006150015-잠실역_QR','2022-10-03',0,1),(20,_binary '',15,'n#wiI3$Pbc','2022-10-15',37.5013,127.04,'서울특별시 강남구 테헤란로 212 멀티캠퍼스 1층','jiwon0297@naver.com','역삼 멀티캠퍼스','20224506024527-멀티캠퍼스.png','20220006150019-역삼 멀티캠퍼스_QR','2022-10-03',0,1),(21,_binary '',10,'rGHsxEH2kD','2022-10-15',37.5306,126.929,'서울특별시 영등포구 여의동 여의동로 330 물빛공원','jiwon0297@naver.com','한강달빛야시장','20220606040613-한강불빛야시장.jpeg','20220006150022-한강달빛야시장_QR','2022-10-03',1,1),(22,_binary '',13,'5JIMhTM^IK','2022-10-15',37.5773,126.977,'서울 종로구 사직로 161 경복궁','jiwon0297@naver.com','궁중문화축전','20220806040821-궁중문화축전.png','20220006150026-궁중문화축전_QR','2022-10-03',1,1),(23,_binary '',13,'v9WpeHBE4f','2022-10-15',37.8171,127.527,'경기 가평군 가평읍 달전리 27 자라섬재즈페스티벌','jiwon0297@naver.com','자라섬재즈페스티벌','20220906040923-jara.jpeg','20220006150029-자라섬재즈페스티벌_QR','2022-10-03',1,9),(24,_binary '',13,'CktKqEGC^@','2022-10-14',37.5263,126.934,'서울 영등포구 여의동로 330 여의도안내센터','jiwon0297@naver.com','서울세계불꽃축제','20221106041126-yeo.jpeg','20220006150033-서울세계불꽃축제_QR','2022-10-04',1,1),(25,_binary '',38,'@usLGAPiZq','2022-10-15',37.5013,127.04,'자신의 집','jiwon0297@naver.com','싸피 6반퇴실축제','20221306041302-ssa.png','20220006150036-싸피 6반퇴실축제_QR','2022-10-03',1,1),(26,_binary '',14,'1tPJMsOlGO','2022-10-15',35.1642,129.196,'부산 해운대구 중동 산 3-9 청사포다릿돌 전망대','jiwon0297@naver.com','벡스코 개최 기원','20221406041437-busanworld.png','20220006150040-벡스코 개최 기원_QR','2022-10-03',1,2);
/*!40000 ALTER TABLE `place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qrlog`
--

DROP TABLE IF EXISTS `qrlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qrlog` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `regtime` date NOT NULL,
  `token_name` varchar(255) NOT NULL,
  `place_id` bigint NOT NULL,
  `sticker_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtncrw6jpl49bjwasptda69cgn` (`place_id`),
  KEY `FK8fkcg6fthg3xucpes0rg5s8ci` (`sticker_id`),
  KEY `FK48b9c3h61vi3thol1l36g05ip` (`user_id`),
  CONSTRAINT `FK48b9c3h61vi3thol1l36g05ip` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK8fkcg6fthg3xucpes0rg5s8ci` FOREIGN KEY (`sticker_id`) REFERENCES `sticker` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKtncrw6jpl49bjwasptda69cgn` FOREIGN KEY (`place_id`) REFERENCES `place` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qrlog`
--

LOCK TABLES `qrlog` WRITE;
/*!40000 ALTER TABLE `qrlog` DISABLE KEYS */;
INSERT INTO `qrlog` VALUES (20,'2022-10-06','광안리',15,260,2),(22,'2022-10-06','코엑스 건물',18,306,4),(23,'2022-10-06','재즈가뭐라고생각하세요?',23,379,4),(26,'2022-10-06','퇴실체크',25,416,8);
/*!40000 ALTER TABLE `qrlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `region` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` VALUES (1,'서울'),(2,'부산'),(3,'대구'),(4,'인천'),(5,'광주'),(6,'대전'),(7,'울산'),(8,'세종'),(9,'경기'),(10,'강원'),(11,'충북'),(12,'충남'),(13,'전북'),(14,'전남'),(15,'경북'),(16,'경남'),(17,'제주');
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scrap`
--

DROP TABLE IF EXISTS `scrap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scrap` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `frame_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt9xvpvpw9fylbw2drkjl8tmxu` (`frame_id`),
  KEY `FKgt91kwgqa4f4oaoi9ljgy75mw` (`user_id`),
  CONSTRAINT `FKgt91kwgqa4f4oaoi9ljgy75mw` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKt9xvpvpw9fylbw2drkjl8tmxu` FOREIGN KEY (`frame_id`) REFERENCES `frame` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scrap`
--

LOCK TABLES `scrap` WRITE;
/*!40000 ALTER TABLE `scrap` DISABLE KEYS */;
INSERT INTO `scrap` VALUES (66,42,2),(67,43,2),(68,42,8),(78,43,3),(79,44,3),(80,47,3),(81,46,2),(82,49,2),(86,42,5),(87,46,8);
/*!40000 ALTER TABLE `scrap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sticker`
--

DROP TABLE IF EXISTS `sticker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sticker` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token_id` bigint NOT NULL,
  `token_name` varchar(255) NOT NULL,
  `token_url` varchar(255) NOT NULL,
  `place_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7visegey6u5jbgii00ri7rcub` (`place_id`),
  CONSTRAINT `FK7visegey6u5jbgii00ri7rcub` FOREIGN KEY (`place_id`) REFERENCES `place` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=450 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sticker`
--

LOCK TABLES `sticker` WRITE;
/*!40000 ALTER TABLE `sticker` DISABLE KEYS */;
INSERT INTO `sticker` VALUES (260,1,'광안리','QmQzNCCCg6yN3nhyceQKEwprHXYyarQX9XCk92LU3qWSkN',15),(261,2,'광안리','QmPwdUeNmEmUMJJtaAATqjV2RXcZAfetgcmUnxaNRE3vPx',15),(262,3,'광안리','QmXdUGj7Jc7sazbt7rA6yySy1RbaXcL6dXtPANizkoPch5',15),(263,4,'광안리','QmbWWkfKRLEVDyBxx2omLyBb9ABfEFP2m2mhULLe3z62Ui',15),(264,5,'광안리','QmaaDYQrAPcWUJNfVAfvVpmtTM5QGqxBDZst8QBkdZTSwa',15),(265,6,'광안대교','Qmby849iEqFibEYB6CRDFB3g8qh3wSa97BxfN7oN4CfZj4',15),(266,7,'광안대교','QmYzh1cU8r3jaufoNRbUjD7tU6X1JG9BTgC8B3UqJkQqsq',15),(267,8,'광안대교','QmS1s3Wrb9DGSMzgahAK3cwFQmosR2aYM5mWKmkvUVkG7R',15),(268,9,'광안대교','QmY4rjh5aZJusbEchjbdZjTsSvd7DuAAgaPAWpKn7pzC1r',15),(269,10,'광안대교','QmWfw53h3EDML4w8Rsen8EyDxAi4qvuLA21xnE3a3hEXSx',15),(270,11,'파라솔','Qmb4mfzturDJBhgRRNo42GwpwwLMjvc6GQjwcRo1YqY4ke',15),(271,12,'파라솔','QmdpeBqpK1CAJesdm7d7dLCbQAr4Gghx5DfyXkSuSkC9Ds',15),(272,14,'파라솔','QmYBk5Se95SimN6u4ErY3B8jwKx44kvrZpfgYG2ZviEZph',15),(273,13,'파라솔','QmZumcspycDTwg2ZNcMqCxEbdrLLY5vFWwWSspA2tQt8h9',15),(274,15,'남산타워','QmTzsHnQtQYQbNjGr15sLx9sjYitUZkY88CohohRayn6dG',16),(275,16,'남산타워','QmdzPzJ2SKYJT9ng34f6yRCQe5LmEMuwNMJ82APqvwKbXh',16),(276,17,'남산타워','Qmci3HAv45UwXKTx9DoQ2GPsb5H916mdvtpD7jV4FBiYjA',16),(277,18,'남산돈까스','QmVuhB1VEDT3i85tPoEt7Q72aBBGRZnzuwmWx5ixbjSdB6',16),(278,19,'남산돈까스','QmT83G4DRHKRVpGo12sYNptbdEKQTsgGeJZ5FThke26eeH',16),(279,20,'남산돈까스','QmPnT3CdguojQfcALjLvTq66Std7arer8rfn9J4jJiMX2P',16),(280,21,'남산돈까스','QmbfZdZSZu8JTLP9byXAUZcohbiozqjPvs5DZSKSK1cr23',16),(281,22,'남산돈까스','QmXigRuTaCHrPos7ZnhxL6Q5hKGsHaFTPyqq8goFV8oMSf',16),(282,23,'남산돈까스','Qma9CQiHpRZeqcmABoXDiqkBxxAENn3Pf7aPpJUVT4cSYo',16),(283,24,'남산돈까스','QmQMNhM28hPHfZyjSd83G6N92MYSTpF46u7hBuQkXK3qFP',16),(284,25,'사랑의 자물쇠','Qme5yBT2eZ1J5dePwkGGYYngCf8ZQkP9p7sJAT6SmTm7yE',16),(285,26,'사랑의 자물쇠','QmWxJC66o1AgdcjTiN47pBkxrGCdzZYa2Cpu6eNHaeqAc1',16),(286,28,'사랑의 자물쇠','QmXw9bg7zuzM1pevr32jXsFs3yQJRQSRkUsCzG215xBW4t',16),(287,27,'사랑의 자물쇠','QmQyUaxP8cqrEP831kpdEVAtGzrcb3VUZpDkcHvK6Frrxr',16),(288,29,'사랑의 자물쇠','QmYEVw9YVsXDZvYssv1szwFaCFFcqNrxvhNFR4FhxfqHFJ',16),(289,75,'한라봉','QmXKAkwJwxtrDyyrZoCRfJh3Cu1CDWJZF13BpBpfspndo9',17),(290,76,'한라봉','QmRTJkBHeyWxNwmtQeZwgAKvfqTNMPapcw7uiWrLK2ngnH',17),(291,78,'한라봉','QmeZaLS2wdAVFoyKqhYrnneCowLs9YyENq5vngErk3o4ZR',17),(292,77,'한라봉','QmZWfKDwq7WXUymUwrrrVBGfEecSksT3QKMiaKyqaBskup',17),(293,79,'한라봉','QmQrZnL5mEHRCrccz1rNprJZCttRmwYf5GqwZR3jM13Qg4',17),(294,80,'한라산','QmXBBfw2i8AKT7WWPUueUsvSGTKTKG42eRtZA9wehaBsXP',17),(295,81,'한라산','QmYbtjcUzkvUGpQU7wAdoeGserPosF6mqydcL6MNUVNHGE',17),(296,82,'한라산','QmbKLhJ4hxh3UpQk3iwdTEVddEBLaAd18Kii6vYBq62ru3',17),(297,83,'한라산','QmaZ1dAv8bMdHv7emWA5jJL1fkMpF3fjLpm4ajuWaPdrap',17),(298,84,'한라산','QmNP68j8q3dRFi6n3taak7Sdqzri65BbeA45RrzfHLrLkx',17),(299,85,'용두암','QmPCt7VuKNb8K1FSPfHPDTpJDBkHFS3KprPbpypUF3JZLx',17),(300,86,'용두암','QmWHv1io3Ld2mNgBjM3p53faBjweu8LeFkDru3gHcEwR2i',17),(301,87,'용두암','QmTM7QJfa4uPvZvECu5hntAkTsBpsgnhYGtHNS9yyrydqN',17),(302,30,'코엑스 건물','QmS7PpTB7hsmTyqLVeqsYwrVwMivtsSXmDLFdE5QzHQ4Af',18),(303,31,'코엑스 건물','QmU9UD2mS5996nRTFeyQwmQgNc5SqBecR2dt9kHCFXFn9y',18),(304,32,'코엑스 건물','QmQtmhEvf4aTmwrVSPh7HGwqCHxpAY4fcruo2uNE6efJyM',18),(305,33,'코엑스 건물','QmPzUv2s6QA3VAVb2m3rZzVadvPakUKei88kJD4vYAGp8K',18),(306,34,'코엑스 건물','QmYrGot1obpsh5VTUUqstADb51VdGMAcW6QhcZc5PaxCJY',18),(307,36,'별마당 도서관','QmU2CcurJercFs5X4W8ssUF5UWZrJ3pnst6MhZs4BuAqq5',18),(308,35,'별마당 도서관','QmbFLVBz8HNzmuSLoteG6wAsenDm9nwJXeYxjjT8zeFB7J',18),(309,37,'별마당 도서관','QmaSdiTneZ37bQw96zkcLdYJ5ZHyayBWo8Wdo7ce5QzMmj',18),(310,38,'별마당 도서관','QmUKWX2TA3kE1EPTmt74pyGFqqgMfoGzY6gRMRT966swme',18),(311,39,'별마당 도서관','QmWHphnCQayArF6GUbqZjGnTLCDyYMTRJ31pjZ1MNeb8L4',18),(312,40,'아쿠아리움','QmaecKYL3oZ7rzmfPdbeYxhJvQsb3rCSpADQXjuQJF2fTu',18),(313,41,'아쿠아리움','QmaFAbp7jSKVXAiL8FwgmBHrQQB1uoNMx9JmtVhNHjpFue',18),(314,42,'아쿠아리움','QmTPJKrywQMFynVvzJYDhxJ8HzR4MCVEJckk4dzqSxi1i1',18),(315,43,'아쿠아리움','Qmc7r3sXnNKZjgVbUnLLHB86SziydM1kZgK6BQDjHASd9m',18),(316,44,'아쿠아리움','QmVKJ5t1JC93sU5GgjaL4sS5ZpSmGHV1xfKnv9n6hudNjn',18),(317,60,'롯데월드','Qmdc6pN8hXD7Wtjm86ojzc8qYg3QrZ5TseNzZKG7Su1Ygc',19),(318,61,'롯데월드','QmRTjUogujN6qbHWqDPAHgeDoZSezjnwmz3qSuScZ7wjrc',19),(319,62,'롯데월드','QmUTWwM5vawaZQX1riFMEHvxU2mKt3FFtaTpBWAYeSpE9R',19),(320,63,'롯데월드','Qmcptvn1iFRjbi6VqQ7392ASBvGTPqcnMQFj4mD9ZYJ4BA',19),(321,64,'롯데월드','QmfPdHCXtZPgy7vpYv8EsQBquSUnjdcgwMoq1BJRCDjsmu',19),(322,65,'롯데타워','QmZ6kyzdg5nEffLSweupFQyt77j5ZZ7KFFBDZf7WG7Jj63',19),(323,66,'롯데타워','QmTmCREdkerYcMTf5DKjnxs1yLrzJgZkR5EQc1zfyToZ6e',19),(324,67,'롯데타워','Qmd7M6YhvymzjRiBjF8H36u58VY52QqBrHjy3y8XHVSZTB',19),(325,68,'롯데타워','QmQCsw5scaysM9pJpHhhMZL5inDkEcnP7bgaxxWmZxPB1K',19),(326,69,'롯데타워','QmVDYxTcc2L6KAeHsrVLHRYF871WidKwVVpELrkuy67euZ',19),(327,70,'석촌호수','QmUgyBF877ddgbZTB5B4MdLAL6pVgi77EYPdoa4Gx52KD9',19),(328,71,'석촌호수','QmQP7MeSwqMveSNFsjwVAEZChwCzwduNoWRUhsWoLwYsu1',19),(329,72,'석촌호수','QmaxYeNnPw6WjtYK8Pvdp5unQeKiC4A2WX8w6HHRxn6xLU',19),(330,74,'석촌호수','QmQumGYHFUHNvbz7MPaFyhc5QkSRBGkjcQD6FV2dZWKcQc',19),(331,73,'석촌호수','QmWCCi1gFw3uQxuthC6SZb8CCF37VWoTqTjG8RDuNt1UqR',19),(332,46,'멀티캠퍼스','QmX8TQAfpLCNXNRnG18exX7oPhxXKyVLsYr2bLiKfdztVa',20),(333,45,'멀티캠퍼스','QmWZy53mCcVsgQQ2f8ixLeK9jqszi6jyz5C1j9nCmZZcQU',20),(334,47,'멀티캠퍼스','QmbjARqhrLzmvkmX75awxAbWrdP7CrwFf9VEbbVKDFHLaB',20),(335,49,'멀티캠퍼스','QmRawN1nmNf6vV6aesXbtt571aQDvxUAkDEGNg5mCVKkQA',20),(336,48,'멀티캠퍼스','QmRxhYmYo5fzWV9ZUh8vJGrdf8rPT3DcwUyfP6egoTTJGn',20),(337,50,'오디세이','QmZSdAYM28WrMGaoYvh7BWxpH1W1yvo5PjLwodtUnJg89X',20),(338,51,'오디세이','QmQgQcMVFA6zQLNhPGhY9ZNdD6gvyH4Unxiw1Ltor8pX6j',20),(339,52,'오디세이','QmZ357uzEzmeSbygVangfskq8PrrcJ2SxDm1zs7JLpDasR',20),(340,54,'오디세이','QmaxzF4svfVoHKbuGdnCCSv67fBNAC2xXjsYybpE2zsSqP',20),(341,53,'오디세이','QmcPkV94W1w1hRarfmzu9Uruix7GpDEDQ7az4eyCnXvesf',20),(342,55,'싸피로고','Qmf38ccJsCXMWLSPEQm8VYjn1CphopCfA73mMVoPZ1Vco5',20),(343,56,'싸피로고','QmTCVG4r1Lt34bVhaUjqymniXd8APnTq4ENf7m9Vsf8hWq',20),(344,57,'싸피로고','QmQmFhszNKxi2A3A5zz494uqWbUycu91pvY4eBFMyTn8Vb',20),(345,59,'싸피로고','QmV2J5WvxVQTxgivgCNf3KUzfw2hSwpJmoamGAKgQFnyoY',20),(346,58,'싸피로고','QmPa2PZ6eJu9hqBRHxVosfSdPrLasFYCYys7sfAfrSAEKK',20),(347,88,'한강달빛야시장','QmNgYF43K6dr9pmtihy58PyFuEQSdcYFbFwYktsRTHCfCv',21),(348,89,'한강달빛야시장','QmdgvCGnnypLqDE3qRZ3gY4oUu2fnHALtZJTayeUv7agm7',21),(349,90,'한강달빛야시장','QmV1JmS83nNn3SdLHdUtThiPiyqfK1GpkqFaLmuh2zDNv2',21),(350,91,'푸드트럭1','Qmf6on47A5iXWv6Se1y4LsJ4Q8fdR8YYmCjfqyGS12zzXL',21),(351,92,'푸드트럭1','QmTQbdJGEmn1eZjQjJcPHX9zDaChS6vJwNoGrkgtpCCaAN',21),(352,93,'푸드트럭1','QmaP4oVNEntS7Ee7Yhccx4ZzHn4t5JAxdGFiEyeDkWSyoW',21),(353,94,'푸드트럭2','QmU9TSSU9vZ2j4ueyf9DQbxBfz5H59sACwWyTbcN5NfoHp',21),(354,95,'푸드트럭2','Qmdmb2fxpUdZEGwzvRNuNBssXjggaMisf3BvkNvNuNrqfi',21),(355,96,'푸드트럭2','QmXW9XZHCzyzSRn5V8ekARaKg2Zbf6gjgQsX2gQf28FPfX',21),(356,97,'푸드트럭2','QmUzn7BfUFBtzKfJJWrTvcD7vhRtV9CL4mR3wrTUVcwEzZ',21),(357,138,'경복궁','Qmb3MwSH4H4W1UdaQkkbwvGRHZS8oZSiss4AKbH4934ti9',22),(358,139,'경복궁','QmTjAeAVkqMqQQNdrSdHNZjjUVNFwQVhnPihnrgFs5gCz8',22),(359,140,'경복궁','QmcBSDUzgLY5LXs7Rrrjxksr9kFMXuk9dJEwjVJALqYSMN',22),(360,141,'경복궁','QmNppsSFe4JijSodvRRGjzTSMXLvKqdkSTNVFzw1mLmbHG',22),(361,142,'덕수궁','Qmc1S1fKgiH1PUMAMHxEPQ175xwmaPLVKRMvuQf6ao8prM',22),(362,143,'덕수궁','QmTWswXnDFDcwpooedLgpwCmQqAoMLxHMnvFV1pMUTHvBU',22),(363,144,'덕수궁','QmW9MXa3BXwwYTR4bgc9KXM57dzwPtVsnBmUXQE8ruJnEX',22),(364,145,'덕수궁','Qme52tC1uzst6UUfGuiGKNVVWu3zNw3UjiYEi37XqE1Q5f',22),(365,146,'왕과왕비','QmY74cxfQ9CnDPbV6AtXZ4S85o1uaVd5TtxjxNv1ouG1v5',22),(366,147,'왕과왕비','QmPfzDGsye2GUBnNKPUBiY2ywpCkYqwP9htg7cVyWP2cCj',22),(367,148,'왕과왕비','QmWf2zD41EXaid4V6bqAhPt6Jt2CXJosR1PFqHvfEJMKWY',22),(368,149,'왕과왕비','QmZX4KiveFiRL8CCv9djWsii4CEgNxXUDZpJwmUQn5oZpc',22),(369,150,'왕과왕비','QmeHP5NYftG5sJkjzpCcUWHWytmtsrjKxHtUDxCpCKjL2Y',22),(370,98,'고양이 재즈단','QmPB2vwVPH3qe6XTTbSEFazbEqEeWT69z5HU4qwUwK7r4n',23),(371,99,'고양이 재즈단','QmeBP4oP2uM32wJteMKwCmD7YSc9dVQx5kqL69LYBeT6i9',23),(372,100,'고양이 재즈단','QmYkxxxN8NcJRr91ExeoxPS4fxecG2d36jMnkdi4h4TSSh',23),(373,101,'고양이 재즈단','QmTqtPpnFig69mAupdZgM1TQgov2peKg1pVHGx3jFw9N6j',23),(374,102,'재즈페스티벌 로고','Qmc1UonakgX2NuQrs6f4x8kaJJSTPp7xFbBQS6ZFeXc9xa',23),(375,103,'재즈페스티벌 로고','QmbrRAtYosaTv4mEgymZTDRkMUYs1fWFyFibE7rDPqzwDJ',23),(376,104,'재즈페스티벌 로고','QmaytWyd6PTeX53gF66fagoyuDVeoiDji616ai7aDAQDSA',23),(377,105,'재즈페스티벌 로고','QmfAGDZa3JKYvZQWoLWJ2U8GKGVprKN9hdtY7QEQg6fzxv',23),(378,106,'재즈페스티벌 로고','QmbEPUjPpKdNk5HgZoicuv1qF1e1T35hxGPzepGfKT3evx',23),(379,107,'재즈가뭐라고생각하세요?','QmVceFK16PeoMuthTANMwfX9rWZJNMLpCjnvdCW7nebg5a',23),(380,108,'재즈가뭐라고생각하세요?','QmaygxqZYxqmQajPXHYGzjjo9J2xMMTVFWxnpk64ccfoHB',23),(381,109,'재즈가뭐라고생각하세요?','QmaZohxBPT5Lwvu8xjcHJ5wMkchbuhVtVZsNAnfgjnxw7f',23),(382,110,'재즈가뭐라고생각하세요?','QmU9bEo5jZf34jH55hCRhFVi43pXef9ETbJ5m8fyinq73t',23),(383,111,'63빌딩','QmajkM2RN1SMTErQYDiBby8GeNvhzfDYu3VyGr4BA8hoxF',24),(384,112,'63빌딩','QmWG48sszHgNtPTGmeyu9QdjCToEYh45bMZA5AVgZYaUdy',24),(385,113,'63빌딩','QmQHSH5gPkdoy8jbM4tzK5qhAUsmogarYjshf7ytHKV7pj',24),(386,114,'63빌딩','QmUNNeEfB3LezswctqYpHnXEGEo6QyEwTYwD818do21C2t',24),(387,116,'불꽃대교','QmYdDxPU1mYMjorUNv1R9SkSVohKN8uPx2faNfK615Cycc',24),(388,115,'63빌딩','QmazoVDYPw66iLh5qMGsVZShGHcgVFFnVXBHhxh3pAPuaq',24),(389,117,'불꽃대교','QmNURfaJdpA41MRgbQF3rE6hAUFtC9J88g8qEyEB2w54zh',24),(390,118,'불꽃대교','QmSAMGrBvyVZqPMojhvF7dT2Xqet5BjQuHNWJpzHEaPN5g',24),(391,120,'불꽃놀이','QmXC71oLzq39jub975phrvVx76E1vCkqA5eepQKxJcyAR5',24),(392,119,'불꽃대교','QmeqZEhV3QLC3nWecJcfayixcGhQGe1oeFJn79DgUrVmse',24),(393,123,'불꽃놀이','QmX4tt9CAfFmgjFRUiqs4gEZFdrpjhsUZkt5p54bbUzswn',24),(394,122,'불꽃놀이','QmT99f4uf2ZN8nkRovNv7WynM2Eff959cSCU9bs4ZgHuZy',24),(395,121,'불꽃놀이','QmVTMGrLXrVYQj2qjQn7PFxDGkeb1J532Y31HAd2GSnBC9',24),(396,166,'빅데이터분산트랙','QmT5ffxuNrp69EBKiQZpRDEtMiNGpbKwRcR41WVn8RNgWT',25),(397,167,'빅데이터분산트랙','QmPNG2Abi7XHoVpavekXY5JKksFgwYpwwLVVCrGqbc8rgL',25),(398,168,'빅데이터분산트랙','QmRwcHUyLZYdNgiiU3jaR7C1mMVmG8Ws7qmFuhMZuPsW4q',25),(399,170,'빅데이터분산트랙','QmVVRkXKX4BTaEjgsJRx7Cu4jNfFAgs2Ar9UJVbChvVCnN',25),(400,172,'빅데이터분산트랙','QmQiNA1hjakq4EJWz7zqnrAPCQpppBm9jYVnEgCH3pe1hM',25),(401,171,'빅데이터분산트랙','QmaPX9oUSigW76VRv93zfv2GQyjypNv19DnmuvH5Mm8Vxi',25),(402,169,'빅데이터분산트랙','QmYCucTzJbBYwb59hqj3v3ndyKHPH9kp1zYMeC3penhVfZ',25),(403,173,'빅데이터분산트랙','QmU6vbCKxFceGTZee7CVWSxytTj3GYsCRLVaSkNjs2Lb8i',25),(404,174,'빅데이터분산트랙','QmfQ5QrX5KqyQ2XXYmG7YJq55AUAi63Gwp989tF9cDsfWq',25),(405,175,'빅데이터분산트랙','Qmeq3CmwaqUbZy1BANpZPF1yCxY9RcYvfemqKUeyk7Fuwd',25),(406,176,'빅데이터분산트랙','QmasKiys5M8qT7N1NrizwfoJyDWrt3tsCKmgJMcXpDbR8P',25),(407,178,'빅데이터분산트랙','QmSSieYfgk4XSffitBm1Z591BbjkM3G3r2LuASMqVdJJ4E',25),(408,177,'빅데이터분산트랙','QmSfsPUhNL5ynUwMkfxk8GvUuvgEenAZAEoxQWxy2WJGDj',25),(409,179,'빅데이터분산트랙','QmYZ7BdBBh9AYMwdA2DQJtHr1svwpoyJoYtWnykjcN2rCY',25),(410,180,'빅데이터분산트랙','QmTHKJ9xuoqfXXAUT9H1prvRt5yX6nkBHmaZoKK8waWffk',25),(411,181,'퇴실체크','QmRHVU7ViiCgfxTZYfmwhVZeXVR7g2av3U2A12geHCGwn8',25),(412,182,'퇴실체크','QmbWfmTYQXaBHix8CKEPtm92d5yhPpZ8oeWnsf4xPJc43x',25),(413,183,'퇴실체크','QmeYDL7iXKZLLzUtH4tLi2KT7KdmBKVAyUGjCifQVJWiWu',25),(414,184,'퇴실체크','QmcUfTNinF2oxmspt9x1VPgB1yxPkuCHciEScctAauoLnJ',25),(415,185,'퇴실체크','QmYaFeSHaeRYg4ALekZF4NaUW3samqtjLa34M2QucK2C7m',25),(416,186,'퇴실체크','QmWyUpuowCk8WZnBMmKg3toGL5FprW2M7z6hYyHpZWDmrP',25),(417,187,'퇴실체크','Qmcv6aeAaPsa5bGNXvR5QZHi4gu7p4CSU1aCuvBFNeKzE7',25),(418,188,'퇴실체크','QmT6Zg6PgC72gp1od2jfK9VAbfFL8rHEVpwucn1JWnhwW5',25),(419,189,'퇴실체크','QmY5H8MF9qXcspKgiV6miwrhB6nEYNyigvh5MLVzoWx2ym',25),(420,190,'퇴실체크','QmQme4KmR91gg8Jg6RH4xFSQNRj93kjfMsApgE3Bouu7MP',25),(421,165,'NFT트랙','QmSgdxqPw2rjSws4Y62Vmp6vAkJUuCoxRvaNPSSk2RQqS6',25),(422,164,'NFT트랙','Qmdzgnrpq3ToaikahQdADMJnQFdWHvvXYgHGUVCavFsGd1',25),(423,163,'NFT트랙','QmWzBR7Kj184HFtXGMBBJecrtc34kMqLHWKZJ9diBdKM5x',25),(424,162,'NFT트랙','QmYGdvpfH32mrfXhdGC5AKDEdFaVauzdhgJNhDJBxMSRGC',25),(425,161,'NFT트랙','QmeCnSL7QRpLXyRoTCqwtL6M6hupPJDF5J4MNy3FuitbdU',25),(426,160,'NFT트랙','QmSH57w7LQpV5jG4YiXA2HVmwQEivvdZ23VZqgwXz5FgJH',25),(427,159,'NFT트랙','QmV6KmwyMH7bDMr3R737AQQbBh4AYHbLwDquV9Bh1g1W5L',25),(428,158,'NFT트랙','Qme6WYYC3dmKB8gZr6TyxUba8CeATaYtN66iTo282D4qXE',25),(429,157,'NFT트랙','Qmem239jx18QKLB9wGxQRvD2g5L8Z4c1Tmd5WqrkTT7WZJ',25),(430,156,'NFT트랙','QmQ1iuG43rNmpcJ12uvX3c5TVcBhfoNmD2Y2PGi4GVvcJ8',25),(431,155,'NFT트랙','QmNY52nWf3YD38FDGAYjKqF8CVaJJU8rjTVzxtuL2Np152',25),(432,154,'NFT트랙','QmbHu6PwLwG7SAxmrN6kpLwkKvs4mu172u6qtC2KJhYxu8',25),(433,153,'NFT트랙','QmP9ecSEvV1vGgaRDUbDBnVT57CYgFrJZAjCSDjJG2L5XS',25),(434,152,'NFT트랙','QmddxPyaVkSuHjApM2rwzfMGBeLiAcf4zCxrdov5wnhsqz',25),(435,151,'NFT트랙','QmXaSanEz9GY7CNmJXsQZfqE8mgptSMymMa9BNNQpFvZZ2',25),(436,137,'벡스코로고','QmYsSUiQbnMcHiti4eVWDGtmXdH6wexnh7LXAuTEAvZuvC',26),(437,136,'벡스코로고','QmRStXxpAsdujxrCZ2Bp2bZef4Dpe3USG1PfeMDtCCPFo1',26),(438,135,'벡스코로고','QmYwmCLSotjZNULEbK3kXBVFGW1berQPEGWToh5wdAwg2S',26),(439,134,'벡스코로고','QmebB5SBusC2vcgHaLGuFSYjXvc1zq7XVSY5Kri1mgg81N',26),(440,133,'벡스코로고','QmS4UU2nogJRLVDhird9FL7P6XnTosTRZjoPqFj7rNXuwU',26),(441,132,'벡스코','QmNkxjH6DEgG3CXqPJZ4Fd6QWdSrzV8wa7Ete67AT3DGcT',26),(442,131,'벡스코','QmNkrxSeZodfJnU9qdPcb83yG4YdM4pn4VbR3YFy3gnQrt',26),(443,130,'벡스코','QmUmk3gzV14wiJ1tkdDFWGxJmTKYUuECAvn2o9nbXovvCk',26),(444,128,'벡스코','QmcwGFE1PDAxGZ2gRvikjbJou7RZtXkAM9bwNs9o5PvEJs',26),(445,129,'벡스코','QmWvHyiUTu7pPARskCBCcNpb22tGovRiUx4TJLSq6xfMwp',26),(446,127,'부기','QmVAQWaQ4Rf4UELXemMqoxs69gdHSXdE7VrNU4BxfCCYhj',26),(447,126,'부기','QmcUmh1JYxSGVQpWb3ZFar6e6hvZUiB4pF6idfrzhBURAt',26),(448,125,'부기','QmS6uD8AGYwyVqcWTUR7ccNQKURP4SsJ7zNfPuDFPmtHjr',26),(449,124,'부기','QmaGfhGmPxwwSr5uAFuerFSydtGBbz89y2N9Vrdn7WBjeR',26);
/*!40000 ALTER TABLE `sticker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trip`
--

DROP TABLE IF EXISTS `trip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trip` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `end_date` date NOT NULL,
  `start_date` date NOT NULL,
  `title` varchar(10) NOT NULL,
  `region_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8bvsjqbj1x0xr0jer2k1dcvei` (`region_id`),
  KEY `FKd8pbh44g1ci1797yixosxacb9` (`user_id`),
  CONSTRAINT `FK8bvsjqbj1x0xr0jer2k1dcvei` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKd8pbh44g1ci1797yixosxacb9` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip`
--

LOCK TABLES `trip` WRITE;
/*!40000 ALTER TABLE `trip` DISABLE KEYS */;
INSERT INTO `trip` VALUES (50,'2022-10-10','2022-10-03','ㅁㅁ',1,2),(54,'2022-10-13','2022-10-06','ㄴ',2,2),(55,'2022-10-14','2022-10-06','ㄴㄴ',10,2),(56,'2022-10-14','2022-10-06','ㄴㄴㄴㄴ',12,2),(57,'2022-10-14','2022-10-06','ㅁㄴㅇㅁㅇ',9,2),(58,'2022-10-11','2022-10-06','테스트',17,2),(59,'2022-10-06','2022-09-06','서울여행',1,3),(60,'2022-10-14','2022-10-06','x',4,2),(61,'2022-10-11','2022-10-06','지원이집 뿌시기',1,1),(63,'2022-10-07','2022-09-06','ㅁㄴㅇㄹㅁㄴㅇㄹ',1,8),(66,'2022-10-10','2022-10-06','서울여행',1,6),(67,'2022-10-10','2022-10-06','오메기떡 먹고싶어',17,13),(68,'2022-10-19','2022-10-12','바다보러 가고싶어',10,13),(69,'2022-10-08','2022-10-06','오늘밤 바라본~',1,4),(70,'2022-10-07','2022-10-06','a메롱메롱',1,8),(71,'2022-10-09','2022-10-05','두근두근 싸피여행',1,5),(72,'2022-10-11','2022-10-06','asdasdad',15,2),(73,'2022-10-20','2022-10-11','두번째 여행',1,1),(74,'2022-10-21','2022-10-18','3번의 여정',1,1),(75,'2022-10-28','2022-10-20','4번째 여정',1,1);
/*!40000 ALTER TABLE `trip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_badge` bigint DEFAULT NULL,
  `nickname` varchar(20) DEFAULT 'undefined',
  `second_badge` bigint DEFAULT NULL,
  `third_badge` bigint DEFAULT NULL,
  `wallet_address` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_9ga8tj7f3cpyntf1xebugca74` (`wallet_address`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,0,'덜렁덜렁',0,0,'0xBBE5b2e56a1CB9dd1Fa529DfaDDA0ef1c28E9C76'),(2,0,'ㄴㅇㄴㅇㅁㅇ',0,0,'0xbB0582200033F66b18E08c32e673b04a635cbfF9'),(3,0,'Wonny',0,0,'0x95A7864017658bFC2f14e436B9Cc541d08FE28D0'),(4,0,'hello',0,0,'0x9aE44E321a5Cf011e8691B3aB0d2C4b1594fE53C'),(5,0,'A607',0,0,'0x08B2A3518F987743A1Ff7124e9eBC6b363118d73'),(6,0,'비지',0,0,'0xc96c4294C575a3B2647c455C72E72C95ABfc8832'),(7,0,'설이',0,0,'0x421A8a7bbC619a8BDAc021E88FCCA070E10E1C84'),(8,0,'찐지원',0,0,'0x43b5114aa8af7A94dcC636f79eE64a3492E41734'),(9,0,'unknown',0,0,'0xb9a8b2f1f9766ba33eB044B080C369B147ef10a1'),(10,0,'A6_김종휘',0,0,'0xD00141E154a2953CbD29B29168B8448CEbc69965'),(11,0,'현규2',0,0,'0x2655E9DC94b4Ddd2d443d305ACaDAAa18857EDf5'),(12,0,'unknown',0,0,'0x7fB6C24d6a855ADC12e6B618cB2B090282251Aa1'),(13,0,'unknown',0,0,'0x6C607F4e447B8546734CAC700Eb1097a49243577'),(14,0,'unknown',0,0,'0xc36003e9dd443e636ad5741c11Fc5a33511524a4');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07  9:51:26
