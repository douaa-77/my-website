-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2025 at 11:37 PM
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
-- Database: `chat_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `file_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `username`, `message`, `file_url`, `created_at`) VALUES
(1, 'Amour', 'hi', '', '2025-03-04 23:41:37'),
(2, 'Lana', 'hola', '', '2025-03-04 23:41:47'),
(3, 'Amour', 'hi', '', '2025-03-04 23:44:36'),
(4, 'Amour', 'test test', '', '2025-03-04 23:44:52'),
(5, 'Amour', 'bhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', '', '2025-03-04 23:45:10'),
(6, 'Amour', 'hnj hhhhh', '', '2025-03-04 23:45:21'),
(7, 'Amour', '', '', '2025-03-05 00:01:38'),
(8, 'Amour', '', '', '2025-03-05 00:01:42'),
(9, 'Amour', '', '', '2025-03-05 00:01:45'),
(10, 'Amour', '', '', '2025-03-05 00:01:45'),
(11, 'Amour', '', '', '2025-03-05 00:01:45'),
(12, '242', '1', '', '2025-03-05 00:10:45'),
(13, '242', 'test', '', '2025-03-05 00:10:53'),
(14, 'Amour', 'tst', '', '2025-03-05 00:13:19'),
(15, 'Amour', '12', '', '2025-03-05 00:18:37'),
(16, 'Amour', 'tt', '', '2025-03-05 00:19:41'),
(17, '=002', 'ol', '', '2025-03-05 00:37:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
