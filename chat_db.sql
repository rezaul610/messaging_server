-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 14, 2025 at 09:57 AM
-- Server version: 8.4.7
-- PHP Version: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `auths`
--

DROP TABLE IF EXISTS `auths`;
CREATE TABLE IF NOT EXISTS `auths` (
  `socketid` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `userid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connect` int NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
CREATE TABLE IF NOT EXISTS `groups` (
  `id` int NOT NULL,
  `gid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `gid`, `name`) VALUES
(9, '75197aee-1921-4bb0-9a57-542062f42f01', 'opo'),
(10, '2547c017-b089-4351-9984-42cad8a8fda2', 'pop M'),
(11, 'cb143d43-e56c-4c2e-89e6-ea65d7dbf6ea', 'asp'),
(12, '3aadc5d4-e877-4737-b321-c24039157cae', 'pinut'),
(13, '933a5c48-90ac-49ab-a12a-094d3fcc54dc', 'xap'),
(14, 'aa0b8a5e-20e6-4580-a874-119f4b24f6f5', 'cat becomes parrot'),
(1, '4628b61b-78f5-4a9c-a171-2f2836e608b6', 'nope');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bpno` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `receiverbpno` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `groupid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `messagetype` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `datetime` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sentstatus` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=317 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `bpno`, `receiverbpno`, `message`, `groupid`, `messagetype`, `datetime`, `sentstatus`) VALUES
(313, 'BP7093010239', 'BP8512147673', 'hello', 'aa0b8a5e-20e6-4580-a874-119f4b24f6f5', 'text', '14/12/2025 02:23 PM', 0),
(314, 'BP7093010239', 'BP6886007029', 'hello', 'aa0b8a5e-20e6-4580-a874-119f4b24f6f5', 'text', '14/12/2025 02:23 PM', 0),
(315, 'BP7093010239', 'BP8512147673', 'kope', 'aa0b8a5e-20e6-4580-a874-119f4b24f6f5', 'text', '14/12/2025 02:39 PM', 0),
(316, 'BP7093010239', 'BP6886007029', 'kope', 'aa0b8a5e-20e6-4580-a874-119f4b24f6f5', 'text', '14/12/2025 02:39 PM', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL,
  `groupid` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bpno` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `groupid`, `name`, `bpno`, `phone`) VALUES
(39, 13, 'ABU BAKAR', 'BP9220227571', '01670953183'),
(37, 13, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(38, 13, 'ABDUL MANNAN BPM, (BAR)', 'BP7906113963', '01711269185'),
(2, 1, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(1, 1, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(3, 1, 'Abdul Motalib', 'BP9312154784', '01814163702'),
(6, 1, 'ANWAR HOSSAIN', 'BP7908121577', '01912673556'),
(4, 1, 'Abu Tyab Md.Arif Hossen.', 'BP8112147794', '01712986650'),
(5, 1, 'ANSARUL KARIM', 'BP8106114740', '01675536761'),
(2, 1, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(1, 1, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(5, 1, 'ANSARUL KARIM', 'BP8106114740', '01675536761'),
(3, 1, 'Abdul Motalib', 'BP9312154784', '01814163702'),
(4, 1, 'Abu Tyab Md.Arif Hossen.', 'BP8112147794', '01712986650'),
(7, 1, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(8, 1, 'ABDUL MANNAN BPM, (BAR)', 'BP7906113963', '01711269185'),
(9, 1, 'Abu Ayub Ansary', 'BP9413160104', '01740068708'),
(10, 1, 'Abu Sufian', 'BP8512147673', '01716659392'),
(6, 1, 'ANWAR HOSSAIN', 'BP7908121577', '01912673556'),
(1, 1, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(2, 1, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(3, 1, 'Abdul Motalib', 'BP9312154784', '01814163702'),
(4, 1, 'Abu Tyab Md.Arif Hossen.', 'BP8112147794', '01712986650'),
(5, 1, 'ANSARUL KARIM', 'BP8106114740', '01675536761'),
(6, 1, 'ANWAR HOSSAIN', 'BP7908121577', '01912673556'),
(7, 1, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(8, 1, 'ABDUL MANNAN BPM, (BAR)', 'BP7906113963', '01711269185'),
(9, 1, 'Abu Ayub Ansary', 'BP9413160104', '01740068708'),
(10, 1, 'Abu Sufian', 'BP8512147673', '01716659392'),
(11, 1, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(12, 1, 'ABDUL MANNAN BPM, (BAR)', 'BP7906113963', '01711269185'),
(13, 1, 'Abu Ayub Ansary', 'BP9413160104', '01740068708'),
(14, 1, 'Abu Sufian', 'BP8512147673', '01716659392'),
(1, 1, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(2, 1, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(3, 1, 'ABDUL MANNAN BPM, (BAR)', 'BP7906113963', '01711269185'),
(4, 1, 'ABU RAYHAN', 'BP6886007029', '01719065608'),
(7, 2, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(5, 2, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(6, 2, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(8, 2, 'ABDUL MANNAN BPM, (BAR)', 'BP7906113963', '01711269185'),
(9, 2, 'Abu Ayub Ansary', 'BP9413160104', '01740068708'),
(14, 3, 'ABU RAYHAN', 'BP6886007029', '01719065608'),
(12, 3, 'Abdul Motalib', 'BP9312154784', '01814163702'),
(13, 3, 'ABU BAKAR', 'BP9220227571', '01670953183'),
(11, 3, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(10, 3, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(15, 4, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(16, 4, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(17, 4, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(19, 4, 'ABU BAKAR', 'BP9220227571', '01670953183'),
(20, 4, 'ABU RAYHAN', 'BP6886007029', '01719065608'),
(21, 4, 'Abu Tyab Md.Arif Hossen.', 'BP8112147794', '01712986650'),
(18, 4, 'Abdul Motalib', 'BP9312154784', '01814163702'),
(22, 5, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(25, 5, 'ABU RAYHAN', 'BP6886007029', '01719065608'),
(23, 5, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(24, 5, 'ABDUL MANNAN BPM, (BAR)', 'BP7906113963', '01711269185'),
(26, 5, 'Abu Sufian', 'BP8512147673', '01716659392'),
(1, 1, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(2, 1, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(3, 1, 'ABDUL MANNAN BPM, (BAR)', 'BP7906113963', '01711269185'),
(4, 1, 'ABU BAKAR', 'BP9220227571', '01670953183'),
(5, 2, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(8, 2, 'ABDUL MANNAN BPM, (BAR)', 'BP7906113963', '01711269185'),
(6, 2, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(10, 2, 'Abu Sufian', 'BP8512147673', '01716659392'),
(7, 2, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(9, 2, 'ABU BAKAR', 'BP9220227571', '01670953183'),
(1, 1, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(2, 1, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(5, 1, 'Abu Tyab Md.Arif Hossen.', 'BP8112147794', '01712986650'),
(3, 1, 'ABDUL MANNAN BPM, (BAR)', 'BP7906113963', '01711269185'),
(4, 1, 'Abu Ayub Ansary', 'BP9413160104', '01740068708'),
(6, 2, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(7, 2, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(9, 2, 'ABDUL MANNAN BPM, (BAR)', 'BP7906113963', '01711269185'),
(10, 2, 'Abu Ayub Ansary', 'BP9413160104', '01740068708'),
(11, 2, 'Abu Tyab Md.Arif Hossen.', 'BP8112147794', '01712986650'),
(8, 2, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(1, 1, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(3, 1, 'ABDUL MANNAN BPM, (BAR)', 'BP7906113963', '01711269185'),
(4, 1, 'ABU RAYHAN', 'BP6886007029', '01719065608'),
(2, 1, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(5, 2, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(6, 2, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(7, 2, 'Abdul Motalib', 'BP9312154784', '01814163702'),
(9, 2, 'AL AMIN HOSSAIN', 'BP9111143404', '01723328911'),
(10, 2, 'Alake Biswas', 'BP8012147694', '01817751918'),
(8, 2, 'AHMAD MUYEED', 'BP7505114145', '01711346937'),
(1, 1, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(2, 1, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(3, 1, 'ABDUL MANNAN BPM, (BAR)', 'BP7906113963', '01711269185'),
(5, 1, 'Abu Sufian', 'BP8512147673', '01716659392'),
(4, 1, 'Abdul Motalib', 'BP9312154784', '01814163702'),
(8, 2, 'ABDUL MANNAN BPM, (BAR)', 'BP7906113963', '01711269185'),
(7, 2, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(9, 2, 'Abdul Motalib', 'BP9312154784', '01814163702'),
(6, 2, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(10, 2, 'ABU BAKAR', 'BP9220227571', '01670953183'),
(11, 2, 'ABU RAYHAN', 'BP6886007029', '01719065608'),
(12, 3, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(14, 3, 'ABDUL MANNAN BPM, (BAR)', 'BP7906113963', '01711269185'),
(13, 3, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(15, 3, 'Abdul Motalib', 'BP9312154784', '01814163702'),
(16, 4, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(17, 4, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(18, 4, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(21, 4, 'Abu Tyab Md.Arif Hossen.', 'BP8112147794', '01712986650'),
(19, 4, 'ABDUL MANNAN BPM, (BAR)', 'BP7906113963', '01711269185'),
(20, 4, 'Abdul Motalib', 'BP9312154784', '01814163702'),
(2, 1, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(1, 1, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(3, 1, 'ABDUL MANNAN BPM, (BAR)', 'BP7906113963', '01711269185'),
(4, 1, 'Abu Ayub Ansary', 'BP9413160104', '01740068708'),
(5, 2, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(6, 2, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(7, 2, 'ABDUL MANNAN BPM, (BAR)', 'BP7906113963', '01711269185'),
(8, 2, 'Abu Sufian', 'BP8512147673', '01716659392'),
(9, 3, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(10, 3, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(11, 3, 'Abdul Motalib', 'BP9312154784', '01814163702'),
(13, 3, 'Abu Sufian', 'BP8512147673', '01716659392'),
(12, 3, 'ABU BAKAR', 'BP9220227571', '01670953183'),
(16, 4, 'ABDUL MANNAN BPM, (BAR)', 'BP7906113963', '01711269185'),
(14, 4, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(15, 4, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(17, 4, 'Abu Tyab Md.Arif Hossen.', 'BP8112147794', '01712986650'),
(74, 11, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(75, 11, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(76, 11, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(77, 11, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(78, 11, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(79, 11, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(80, 11, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(81, 11, 'A.K. M. LIAQUAT ALI', 'BP7093010239', '.'),
(82, 11, 'Abdul Kader Zillane', 'BP9413158493', '01827496990'),
(83, 11, 'ABDUL MANNAN BPM, (BAR)', 'BP7906113963', '01711269185'),
(84, 11, 'Abu Tyab Md.Arif Hossen.', 'BP8112147794', '01712986650'),
(85, 11, 'Ashiqur Rahman Akash', 'BP9718204606', '01883319889');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
