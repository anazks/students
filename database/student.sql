-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2025 at 03:50 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `userId` int(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`userId`, `username`, `status`, `date`, `id`) VALUES
(1001, 'Anaz K Sunil', '1', '2025-01-14 05:58:01', 2),
(1001, 'Anaz K Sunil', '1', '2025-01-16 06:12:52', 3),
(1001, 'Anaz K Sunil', '1', '2025-01-16 10:44:37', 4),
(1001, 'Anaz K Sunil', '1', '2025-01-16 17:49:12', 10),
(1001, 'Anaz K Sunil', '1', '2025-01-16 17:49:24', 11),
(1001, 'Anaz K Sunil', '0', '2025-01-16 17:49:55', 12),
(1001, 'Anaz K Sunil', '1', '2025-01-16 17:49:59', 13),
(1001, 'Anaz K Sunil', '1', '2025-01-16 17:51:24', 14),
(1001, 'Anaz K Sunil', '1', '2025-01-16 18:01:05', 15),
(1001, 'Anaz K Sunil', '1', '2025-01-16 18:05:17', 16),
(1001, 'Anaz K Sunil', '1', '2025-01-16 18:06:21', 17),
(1001, 'Anaz K Sunil', '1', '2025-01-16 18:07:25', 18),
(1001, 'Anaz K Sunil', '1', '2025-01-16 18:07:49', 19),
(1001, 'Anaz K Sunil', '1', '2025-01-13 18:09:05', 20);

-- --------------------------------------------------------

--
-- Table structure for table `lab`
--

CREATE TABLE `lab` (
  `attendance` varchar(150) NOT NULL,
  `lab` varchar(150) NOT NULL,
  `experiment` varchar(250) NOT NULL,
  `co` varchar(250) NOT NULL,
  `date` varchar(250) NOT NULL,
  `mark` varchar(150) NOT NULL,
  `id` int(150) NOT NULL,
  `studentID` int(100) NOT NULL,
  `roughMark` int(100) NOT NULL,
  `fairMark` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lab`
--

INSERT INTO `lab` (`attendance`, `lab`, `experiment`, `co`, `date`, `mark`, `id`, `studentID`, `roughMark`, `fairMark`) VALUES
('Present', 'Computer Lab', 'Largest amount 2 numbers', 'Largest amount 2 numbers', '2025-01-15', '1', 1, 1001, 1, 1),
('Present', 'Physics Lab', 'Largest amount 2 numbers', 'Largest amount 2 numbers', '2025-01-16', '9', 3, 1001, 5, 5),
('Present', 'Computer Lab', 'Largest amount 2 numbers', 'Largest amount 2 numbers', '2025-01-16', '', 4, 1001, 0, 0),
('Present', 'Computer Lab', 'Largest amount 2 numbers', 'Largest amount 2 numbers', '2025-01-16', '', 5, 1001, 0, 0),
('Present', 'AI', 'Largest amount 2 numbers', 'Largest amount 2 numbers', '2025-01-16', '', 6, 1001, 0, 0),
('Present', 'AI', 'Largest amount 2 numbers', 'Largest amount 2 numbers', '2025-01-16', '', 7, 1001, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `result`
--

CREATE TABLE `result` (
  `id` int(11) NOT NULL,
  `semester` varchar(225) NOT NULL,
  `cgpa` varchar(225) NOT NULL,
  `lab` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `result`
--

INSERT INTO `result` (`id`, `semester`, `cgpa`, `lab`) VALUES
(2023, '2nd', '3.18', ''),
(2013, '2nd', '3.86', ''),
(2024, '2nd', '3.80', ''),
(2023, '3th', '3.80', ''),
(2023, '4th', '3.18', ''),
(2013, '1th', '3.76', ''),
(2023, '1th', '3.53', ''),
(2013, '3th', '3.80', ''),
(1964, '1th', '3.80', ''),
(1964, '2nd', '3.96', ''),
(1964, '3th', '3.80', ''),
(1976, '1th', '3.70', ''),
(1976, '2nd', '3.80', ''),
(1976, '3th', '3.00', ''),
(1986, '1th', '3.60', ''),
(1986, '2nd', '3.20', ''),
(1001, '1', '80', 'AI'),
(1001, '1', '60', 'DCP');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `batch` varchar(45) NOT NULL,
  `gender` varchar(45) NOT NULL,
  `department` varchar(225) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `name`, `batch`, `gender`, `department`, `phone`, `email`, `status`) VALUES
(1001, 'Anaz K Sunil', '2016 to 2019', 'male ', 'CS', '8606414384', 'lablogixsoftware@gmail.com', 'active'),
(1002, 'Akash R', '2016 to 2019', 'male', 'CS', '8078330921', 'anazksunil2@gmail.com', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `subject` varchar(100) NOT NULL,
  `Subject_id` varchar(100) NOT NULL,
  `id` int(100) NOT NULL,
  `sem` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`subject`, `Subject_id`, `id`, `sem`) VALUES
('1000', 'AI', 5, 2),
('1001', 'DCP', 6, 2),
('1003', 'DS', 7, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lab`
--
ALTER TABLE `lab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `lab`
--
ALTER TABLE `lab`
  MODIFY `id` int(150) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
