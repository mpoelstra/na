# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: localhost (MySQL 5.5.31)
# Database: attendering
# Generation Time: 2013-08-05 09:18:57 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table algemeen
# ------------------------------------------------------------

DROP TABLE IF EXISTS `algemeen`;

CREATE TABLE `algemeen` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `mededeling` text COLLATE utf8_unicode_ci,
  `mededelingid` tinyint(1) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `algemeen` WRITE;
/*!40000 ALTER TABLE `algemeen` DISABLE KEYS */;

INSERT INTO `algemeen` (`id`, `mededeling`, `mededelingid`)
VALUES
	(1,'',1);

/*!40000 ALTER TABLE `algemeen` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table depot
# ------------------------------------------------------------

DROP TABLE IF EXISTS `depot`;

CREATE TABLE `depot` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pasnummer` tinyint(3) unsigned DEFAULT NULL,
  `mededeling` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modificationtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table studiezaal
# ------------------------------------------------------------

DROP TABLE IF EXISTS `studiezaal`;

CREATE TABLE `studiezaal` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pasnummer` tinyint(3) unsigned DEFAULT NULL,
  `ingeschakeld` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `studiezaal` WRITE;
/*!40000 ALTER TABLE `studiezaal` DISABLE KEYS */;

INSERT INTO `studiezaal` (`id`, `pasnummer`, `ingeschakeld`)
VALUES
	(451,1,0),
	(452,2,0),
	(453,3,0),
	(454,4,0),
	(455,5,0),
	(456,6,0),
	(457,7,0),
	(458,8,0),
	(459,9,0),
	(460,10,0),
	(461,11,0),
	(462,12,0),
	(463,13,0),
	(464,14,0),
	(465,15,0),
	(466,16,0),
	(467,17,0),
	(468,18,0),
	(469,19,0),
	(470,20,0),
	(471,21,0),
	(472,22,0),
	(473,23,0),
	(474,24,0),
	(475,25,0),
	(476,26,0),
	(477,27,0),
	(478,28,0),
	(479,29,0),
	(480,30,0),
	(481,31,0),
	(482,32,0),
	(483,33,0),
	(484,34,0),
	(485,35,0),
	(486,36,0),
	(487,37,0),
	(488,38,0),
	(489,39,0),
	(490,40,0),
	(491,41,0),
	(492,42,0),
	(493,43,0),
	(494,44,0),
	(495,45,0),
	(496,46,0),
	(497,47,0),
	(498,48,0),
	(499,49,0),
	(500,50,0),
	(501,51,0),
	(502,52,0),
	(503,53,0),
	(504,54,0),
	(505,55,0),
	(506,56,0),
	(507,57,0),
	(508,58,0),
	(509,59,0),
	(510,60,0),
	(511,61,0),
	(512,62,0),
	(513,63,0),
	(514,64,0),
	(515,65,0),
	(516,66,0),
	(517,67,0),
	(518,68,0),
	(519,69,0),
	(520,70,0),
	(521,71,0),
	(522,72,0),
	(523,73,0),
	(524,74,0),
	(525,75,0),
	(526,76,0),
	(527,77,0),
	(528,78,0),
	(529,79,0),
	(530,80,0),
	(531,81,0),
	(532,82,0),
	(533,83,0),
	(534,84,0),
	(535,85,0),
	(536,86,0),
	(537,87,0),
	(538,88,0),
	(539,89,0),
	(540,90,0),
	(541,91,0),
	(542,92,0),
	(543,93,0),
	(544,94,0),
	(545,95,0),
	(546,96,0),
	(547,97,0),
	(548,98,0),
	(549,99,0),
	(550,100,0),
	(551,101,0),
	(552,102,0),
	(553,103,0),
	(554,104,0),
	(555,105,0),
	(556,106,0),
	(557,107,0),
	(558,108,0),
	(559,109,0),
	(560,110,0),
	(561,111,0),
	(562,112,0),
	(563,113,0),
	(564,114,0),
	(565,115,0),
	(566,116,0),
	(567,117,0),
	(568,118,0),
	(569,119,0),
	(570,120,0),
	(571,121,0),
	(572,122,0),
	(573,123,0),
	(574,124,0),
	(575,125,0),
	(576,126,0),
	(577,127,0),
	(578,128,0),
	(579,129,0),
	(580,130,0),
	(581,131,0),
	(582,132,0),
	(583,133,0),
	(584,134,0),
	(585,135,0),
	(586,136,0),
	(587,137,0),
	(588,138,0),
	(589,139,0),
	(590,140,0),
	(591,141,0),
	(592,142,0),
	(593,143,0),
	(594,144,0),
	(595,145,0),
	(596,146,0),
	(597,147,0),
	(598,148,0),
	(599,149,0),
	(600,150,0),
	(601,151,0),
	(602,152,0),
	(603,153,0),
	(604,154,0),
	(605,155,0),
	(606,156,0),
	(607,157,0),
	(608,158,0),
	(609,159,0),
	(610,160,0),
	(611,161,0),
	(612,162,0),
	(613,163,0),
	(614,164,0),
	(615,165,0),
	(616,166,0),
	(617,167,0),
	(618,168,0),
	(619,169,0),
	(620,170,0),
	(621,171,0),
	(622,172,0),
	(623,173,0),
	(624,174,0),
	(625,175,0),
	(626,176,0),
	(627,177,0),
	(628,178,0),
	(629,179,0),
	(630,180,0),
	(631,181,0),
	(632,182,0),
	(633,183,0),
	(634,184,0),
	(635,185,0),
	(636,186,0),
	(637,187,0),
	(638,188,0),
	(639,189,0),
	(640,190,0),
	(641,191,0),
	(642,192,0),
	(643,193,0),
	(644,194,0),
	(645,195,0),
	(646,196,0),
	(647,197,0),
	(648,198,0),
	(649,199,0),
	(650,200,0);

/*!40000 ALTER TABLE `studiezaal` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
