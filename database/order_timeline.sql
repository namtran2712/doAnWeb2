-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2024 at 06:24 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webbantrangsuc`
--

-- --------------------------------------------------------

--
-- Table structure for table `order_timeline`
--

CREATE TABLE `order_timeline` (
  `ID_BILL` int(11) NOT NULL,
  `CONFIRM_TIME` datetime DEFAULT NULL,
  `SHIPPING_TIME` datetime DEFAULT NULL,
  `CONFIRM_RECEIVE_TIME` datetime DEFAULT NULL,
  `CANCEL_TIME` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_timeline`
--

INSERT INTO `order_timeline` (`ID_BILL`, `CONFIRM_TIME`, `SHIPPING_TIME`, `CONFIRM_RECEIVE_TIME`, `CANCEL_TIME`) VALUES
(1, NULL, NULL, NULL, NULL),
(2, NULL, NULL, NULL, NULL),
(3, NULL, NULL, '2024-05-08 12:13:13', NULL),
(4, NULL, NULL, NULL, NULL),
(5, NULL, NULL, NULL, '2024-05-07 13:05:39'),
(6, NULL, NULL, NULL, '2024-05-07 12:21:45'),
(7, NULL, NULL, '2024-05-07 10:48:33', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order_timeline`
--
ALTER TABLE `order_timeline`
  ADD PRIMARY KEY (`ID_BILL`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_timeline`
--
ALTER TABLE `order_timeline`
  ADD CONSTRAINT `order_timeline_ibfk_1` FOREIGN KEY (`ID_BILL`) REFERENCES `bills` (`ID_BILL`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
