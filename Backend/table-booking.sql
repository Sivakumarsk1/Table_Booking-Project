-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 14, 2025 at 07:20 AM
-- Server version: 12.0.2-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `table-booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `id` int(11) NOT NULL,
  `old_users_id` int(11) NOT NULL,
  `jwt_token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`id`, `old_users_id`, `jwt_token`) VALUES
(1, 33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndlcW9wb3NlQG1haWxpbmF0b3IuY29tIiwiaWF0IjoxNzM5Nzk2MjM3LCJleHAiOjE3Mzk3OTk4Mzd9.6mnnQDzKlDQPHiPRS4Qt9XBkhDExn240oENSBDynmHs'),
(2, 34, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imhvd3lieWpvYnlAbWFpbGluYXRvci5jb20iLCJpYXQiOjE3Mzk3OTY3NDIsImV4cCI6MTczOTgwMDM0Mn0.v208bhENICz33z_ruxgSUb44AS_VPxscNNuvJWOcp-o'),
(3, 36, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmllbC5AZ21haWwuY29tIiwiaWF0IjoxNzQwMTE1NjI4LCJleHAiOjE3NDAxMTkyMjh9.JhLYG3MEO_-FAr-hDcSZc79FXBbhhLT0zKHPfCoshi8'),
(4, 37, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InR5ZmlxaUBtYWlsaW5hdG9yLmNvbSIsImlhdCI6MTc0MDExNTgzMiwiZXhwIjoxNzQwMTE5NDMyfQ.po6LCVoNMLp2n0oFL-fDHUZYg9u-Nz8_f_D44zQdKHg'),
(5, 38, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhc2l0eUBtYWlsaW5hdG9yLmNvbSIsImlhdCI6MTc0MDM3MjgzNywiZXhwIjoxNzQwMzc2NDM3fQ.rh9vw-5yOvjllW5MbO7_xtnpyLbFpuC-xj0haZgSqTk'),
(6, 39, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InFhd3lmb2xAbWFpbGluYXRvci5jb20iLCJpYXQiOjE3NDAzNzQ2NjMsImV4cCI6MTc0MDM3ODI2M30.v0GdcEXpewXzGyddaa7SQM8mtMQpxGyxujHtnSbTlZs'),
(7, 40, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpdGFsdXd1QG1haWxpbmF0b3IuY29tIiwiaWF0IjoxNzQwMzc0NzE0LCJleHAiOjE3NDAzNzgzMTR9.awKb2H4C0AAfEbe0Hn7HyWAVwGTakB_JHrZfL3iRkhY'),
(8, 41, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpleG9meUBtYWlsaW5hdG9yLmNvbSIsImlhdCI6MTc0MDM3NDc5MSwiZXhwIjoxNzQwMzc4MzkxfQ.vBu7SbU_2mKNVYgoRvUX_Y54N2LDXoQ3Omv8jK9ChN0'),
(9, 42, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhYm9tYXpvY3VAbWFpbGluYXRvci5jb20iLCJpYXQiOjE3NDAzNzQ4NjQsImV4cCI6MTc0MDM3ODQ2NH0.VmyEwmew2IXe2GDlVHeOK6cePQ7nly4QLKtkldZ0dc8'),
(10, 43, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZ5anlzb0BtYWlsaW5hdG9yLmNvbSIsImlhdCI6MTc0MDkzNjkxOSwiZXhwIjoxNzQwOTQwNTE5fQ.fGWmw8lfHXYSk2VQ2hUc0QXa8HQCLbz3zEy5yzPcpj8'),
(11, 44, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtlcmVmaWRhcm9AbWFpbGluYXRvci5jb20iLCJpYXQiOjE3NDExNTM4OTYsImV4cCI6MTc0MTE1NzQ5Nn0.3tnuhzIDzFCQAeL__W_J3VdmzbRH4ecyUpt3btJe6pw'),
(12, 45, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpbWF6dXRvckBtYWlsaW5hdG9yLmNvbSIsImlhdCI6MTc0MTE1NTU0NSwiZXhwIjoxNzQxMTU5MTQ1fQ.mWCLD2SVxUkU6VWSzCP5JPWVrBveEHxi6qbUwLBFA-o'),
(13, 46, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR5dmF6aWphd3VAbWFpbGluYXRvci5jb20iLCJpYXQiOjE3NDExNTU3NzEsImV4cCI6MTc0MTE1OTM3MX0.tuclEIhh31XO5zt9Q7iMMTkI42vC8Y0qGFChNTK1UEw'),
(14, 47, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndlZm93YXZhc3lAbWFpbGluYXRvci5jb20iLCJpYXQiOjE3NDExOTA5MDYsImV4cCI6MTc0MTE5NDUwNn0.Eg0lCQpk0VBmSHw_Ix1Hx_H6SaA-eh9oMtITn9XOkbA'),
(15, 48, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ5dGljdWJlQG1haWxpbmF0b3IuY29tIiwiaWF0IjoxNzQxNDEwMDE4LCJleHAiOjE3NDE0MTM2MTh9.-SBCHTtEdVFBD1JByVh77LK-XsqJOS8-dm9OJzfC3RU'),
(16, 50, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbXVAZ21haWwuY29tIiwiaWF0IjoxNzQxNDU5OTI2LCJleHAiOjE3NDE0NjM1MjZ9.cWoGCN4dlwY7tfuHyhTg28SW1lKCQUVEDGq_pZrUra8'),
(17, 51, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmllbDEyM21heDEyM0BnbWFpbC5jb20iLCJpYXQiOjE3NDE1Mjg1MzksImV4cCI6MTc0MTUzMjEzOX0.bbww32u-WC2-uYEkZfdO_8C2MJR3NG2tsh9AiUrPEvM'),
(18, 54, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkJoYXJhdGhpQGdtYWlsLmNvbSIsImlhdCI6MTc1MDA1MzYxMiwiZXhwIjoxNzUwMDU3MjEyfQ.ch_JzlHsXMsE58GJZPJERtvoTkwTb-U7QFT8SNqlcPA'),
(19, 55, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpdmFrdW1hckBnbWFpbC5jb20iLCJpYXQiOjE3NTAzMjQ3MjYsImV4cCI6MTc1MDMyODMyNn0.UDXffwSsuNQRG4e3pnybyQVWPFL6pSZ197aHcflySX0'),
(20, 56, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNrQGdtYWlsLmNvbSIsImlhdCI6MTc1MDMyNDgxNSwiZXhwIjoxNzUwMzI4NDE1fQ.NDiGpPIOfDSbQ-XKKFSw7wrRbo9QehOv-QermE5Ohcs'),
(21, 57, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFydW5wcmFrYXNoQGdtYWlsLmNvbSIsImlhdCI6MTc1MDQwMzQ5NywiZXhwIjoxNzUwNDA3MDk3fQ.T7HQYMJfvIbcMLMyK3CV433Rjz4Jd4ACV0ofjDb_1iw'),
(22, 58, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFydW5AZ21haWwuY29tIiwiaWF0IjoxNzUwNDAzNTkxLCJleHAiOjE3NTA0MDcxOTF9.JpZLvBMyY93vtbPe4i20kWIR9b-wvSMV6SsiXwSbvKo'),
(23, 59, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpa2lAZ21haWwuY29tIiwiaWF0IjoxNzUwNDIyMDUwLCJleHAiOjE3NTA0MjU2NTB9.rKBQF447bbrYuM-U8BX9oskt2611NwuKhxdCMqeWGS8'),
(24, 60, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhc2ltYWtyYW1AZ21haWwuY29tIiwiaWF0IjoxNzUwNDg4NjY5LCJleHAiOjE3NTA0OTIyNjl9.rDpt3F1YRL5jtljCHuVLwSreMagtexsj0gQpsMpM5Aw'),
(25, 61, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imthdml0aGFAZ21haWwuY29tIiwiaWF0IjoxNzUwNjYwMDM3LCJleHAiOjE3NTA2NjM2Mzd9.OaIzR0eCL4SvEe3ePW_XYIDqZZ0_bxapKVfUc-ngepg');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `table_id` int(11) DEFAULT NULL,
  `start_time_id` int(11) DEFAULT NULL,
  `bk_dates` date NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `table_id`, `start_time_id`, `bk_dates`, `status`, `created_at`, `updated_at`) VALUES
(62, 62, 21, 25, '2025-06-21', 'Confirmed', '2025-06-19 12:32:39', '2025-06-23 07:09:48'),
(86, 148, 21, 26, '2025-06-24', NULL, '2025-06-23 07:44:23', '2025-06-23 07:44:23');

-- --------------------------------------------------------

--
-- Table structure for table `frozen`
--

CREATE TABLE `frozen` (
  `id` int(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `frozen`
--

INSERT INTO `frozen` (`id`, `start_date`, `end_date`, `title`, `created_at`, `updated_at`) VALUES
(26, '2025-05-17', '2025-05-17', 'Saturday', '2025-05-17 05:29:23', '2025-06-18 09:48:34');

-- --------------------------------------------------------

--
-- Table structure for table `offers`
--

CREATE TABLE `offers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `discount` int(11) NOT NULL,
  `min_visits` int(11) NOT NULL,
  `valid_until` date NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `offers`
--

INSERT INTO `offers` (`id`, `name`, `description`, `discount`, `min_visits`, `valid_until`, `created_at`, `updated_at`, `email`) VALUES
(11, 'sk', 'ss', 1, 1, '2025-06-28', '2025-06-20 16:17:26', '2025-06-20 16:17:26', 'sivakumar@3928@gmail.com'),
(15, 'kavitha', 'graphic ', 1, 1, '2025-07-03', '2025-06-23 11:47:16', '2025-06-23 11:47:16', 'kavitha@gmail.com'),
(62, 'vasimakram', 'no comments simply waste', 20, 1, '2025-06-25', '2025-06-21 11:52:42', '2025-06-23 12:28:20', 'vasimakram@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `old_users`
--

CREATE TABLE `old_users` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `firstName` varchar(155) NOT NULL,
  `lastName` varchar(155) NOT NULL,
  `email` varchar(155) NOT NULL,
  `password` text NOT NULL,
  `mobile` int(11) NOT NULL,
  `address` text NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `update_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `old_users`
--

INSERT INTO `old_users` (`id`, `user_id`, `firstName`, `lastName`, `email`, `password`, `mobile`, `address`, `create_at`, `update_at`) VALUES
(1, 83757, 'Daniel', 'M', 'daniel.jorimts@gmail.com', '', 2147483647, '6, First Main Road, Anna Nagar, Pammal, Chennai-600075, Tamilnadu, India', '2025-02-17 09:51:50', NULL),
(10, 1, 'Daniel', 'M', 'daniel.jorimt@gmail.com', '', 2147483647, '6, First Main Road, Anna Nagar, Pammal, Chennai-600075, Tamilnadu, India', '2025-02-17 10:02:07', NULL),
(11, 61661, 'Daniel', 'M', 'daniel@gmail.com', '', 2147483647, '6, First Main Road, Anna Nagar, Pammal, Chennai-600075, Tamilnadu, India', '2025-02-17 10:02:47', NULL),
(13, 9709, 'Daniel', 'M', 'danie@gmail.com', '', 2147483647, '6, First Main Road, Anna Nagar, Pammal, Chennai-600075, Tamilnadu, India', '2025-02-17 10:06:13', NULL),
(14, 3, 'Daniel', 'M', 'jorimts@gmail.com', '', 2147483647, '6, First Main Road, Anna Nagar, Pammal, Chennai-600075, Tamilnadu, India', '2025-02-17 10:06:47', NULL),
(16, 0, 'Daniel', 'M', 'ts@gmail.com', '', 2147483647, '6, First Main Road, Anna Nagar, Pammal, Chennai-600075, Tamilnadu, India', '2025-02-17 10:09:26', NULL),
(18, 0, 'Daniel', 'M', 'max@gmail.com', '$2b$10$ILSKu9d1b3PGJ9RE48q5OOkPwtX2iTXS9XWOLd/teR4xFkGel7kF2', 2147483647, '6, First Main Road, Anna Nagar, Pammal, Chennai-600075, Tamilnadu, India', '2025-02-17 10:55:11', NULL),
(19, 63000000, 'Daniel', 'M', 'gire@gmail.com', '$2b$10$D6ojYH1kRTz4CmClVE1ERegpeqi.SKRYCMtD1p6p42Y32/VIBmJge', 2147483647, '6, First Main Road, Anna Nagar, Pammal, Chennai-600075, Tamilnadu, India', '2025-02-17 11:15:50', NULL),
(20, 2147483647, 'Chiquita', 'Farley', 'walytul@mailinator.com', '$2b$10$3ybVfzCN4ieN6oV3hOHJ2.Gs/9001Q9k2Wxmx4uotpl3ckU.McEQ.', 1, 'Est illo facildfis quafdfg', '2025-02-17 11:51:37', NULL),
(22, 0, 'Chiquita', 'Farley', 'ewfed@mailinator.com', '$2b$10$tfR0ECnBuM9L/HxhdmnUS.0o4qdwvgYB2dPl0Vu0clFblSqFTHdLa', 2147483647, 'Est illo facildfis quafdfg', '2025-02-17 11:52:36', NULL),
(23, 0, 'Chiquita', 'Farley', 'eed@mailinator.com', '$2b$10$ue8/iEJbK3cPfzZR0PAnrOi93AM7Dqv4Ker3BkwAe/Sa.BygpjYxi', 2147483647, 'Est illo facildfis quafdfg', '2025-02-17 11:55:47', NULL),
(24, 0, 'Yuri', 'Valdez', 'diwyk@mailinator.com', '$2b$10$Joh3Rp0aXtN5S8Z8dSjeI.GxtY0JGkRAVmuiKhMW.LS/XmRFZAmWe', 2083377333, 'Neque quia vdfrweasgoluptatu', '2025-02-17 12:01:43', NULL),
(25, 2, 'Jayme', 'Hess', 'zomala@mailinator.com', '$2b$10$A0WjAtA1oylce6iHWsCip.Ta18STIAMm9xfFwk6aHe7wYIwrcS5Du', 1, 'Quia in nisi ipsum odgefr', '2025-02-17 12:02:53', NULL),
(26, 0, 'Hilary', 'Quinn', 'dazogulewu@mailinator.com', '$2b$10$/S.6XW4kMMI4slcEEHD3v.ikUWVy8LJQv9iN/1db604nb5Cd5vqJy', 1, 'Officiis sint eos vo', '2025-02-17 12:03:24', NULL),
(27, 0, 'Dustin', 'Lawrence', 'zyposenu@mailinator.com', '$2b$10$MuIk1IuZmafyv2By/tCyq.vLHtrXsvrz3FDbkH15QozNwM6ozcgPW', 1, 'In laboriosam volup', '2025-02-17 12:06:31', NULL),
(28, 0, 'Kiona', 'Austin', 'bonugobyc@mailinator.com', '$2b$10$JZOvuT4OnoNRNu27.9qJmONh0UFflWXOfDuCd8teFg8uc9ZzXl/i.', 1, 'Pariatur Ut vel fug', '2025-02-17 12:37:01', NULL),
(29, 9300000, 'Sloane', 'Murphy', 'tyredu@mailinator.com', '$2b$10$jhKZAKeIVGXioV5hSyycZOuIuME1nRk59utbMrEEhhj1YfqrhvtbO', 1, 'Dolores quae id non ', '2025-02-17 12:37:37', NULL),
(30, 0, 'Ross', 'Cervantes', 'gifa@mailinator.com', '$2b$10$JyD6GbibzH7.8Qp9bwuws..uxGqS3L1JEtAMJh5j54i7DmU4N.82q', 1, 'Sit dolorum iusto et', '2025-02-17 12:38:47', NULL),
(31, 71002, 'Macey', 'Mooney', 'rysom@mailinator.com', '$2b$10$2ILYcM5lkXHhquMla9WmK.F9dd7cYuW7E8WaZScUFZfsycSlehXKa', 1, 'Est doloribus aut qu', '2025-02-17 12:40:52', NULL),
(32, 5, 'Zorita', 'Haynes', 'qogudihu@mailinator.com', '$2b$10$O/Hi6.mDvYig.kHqh8O/5erfJj/VXKPut31S1UK2x1pdYgxCaIHyy', 1, 'Velit molestiae aute', '2025-02-17 12:43:09', NULL),
(33, 65, 'Diana', 'Walter', 'weqopose@mailinator.com', '$2b$10$YVQtcOsaYGaoIT7YFCmGHe.DUV1EcEkLo7Pu.VA1/GlZXwqHU80lm', 1, 'Asperiores elit rei', '2025-02-17 12:43:57', NULL),
(34, 23, 'Dalton', 'Mccall', 'howybyjoby@mailinator.com', '$2b$10$X.MmygxERrlBtpsFaHLa.OnYESv51ajEj985kr78oaOwC4phO0nhy', 1, 'Aute quisquam amet ', '2025-02-17 12:52:22', NULL),
(36, 2147483647, 'Daniel', 'M', 'daniel.@gmail.com', '$2b$10$TrkkEB6Pwp0JSBqqfotdMOfANTZLoYhUQlclJ3f1muj5qia7fsc32', 2147483647, '6, First Main Road, Anna Nagar, Pammal, Chennai-600075, Tamilnadu, India', '2025-02-21 05:27:08', NULL),
(37, 0, 'Lawrence', 'Robbins', 'tyfiqi@mailinator.com', '$2b$10$shQ6KKLbxJEl6reaWMA6eOLjU7KhWOO9MhkFQVur94iEOQIHl4N62', 1, 'Est ab exeedrcitatione', '2025-02-21 05:30:32', NULL),
(38, 0, 'Jaquelyn', 'Noel', 'fasity@mailinator.com', '$2b$10$gBJMkvuT2Nw.LA3OP/AOCeHOyhFYrgmCSme8p.lG4ijfF84tjXL0C', 1, 'Voluptatem sit enim', '2025-02-24 04:53:56', NULL),
(39, 40, 'Paki', 'Kelley', 'qawyfol@mailinator.com', '$2b$10$NRvsRRDZjwe7Y0s7SF9AFeSF83fwG.r4QAXo4UaGnEVZLR3AnCdvu', 1, 'Id dolor amet nihi', '2025-02-24 05:24:23', NULL),
(40, 5, 'Autumn', 'Zimmerman', 'pitaluwu@mailinator.com', '$2b$10$EtFOQ2gmKLXfDl3VnQBuFefnh3/e6JVgTTa70q0rs1fMHL06a/HI.', 1, 'Proident consequunt', '2025-02-24 05:25:14', NULL),
(41, 7973, 'Magee', 'Puckett', 'jexofy@mailinator.com', '$2b$10$.VZKEeZ/qIEgkzdhUZleiebzMMLqBJnHXn/Om18y5yxXnyZ5xlPAm', 1, 'Enim porro nihil cil', '2025-02-24 05:26:31', NULL),
(42, 960, 'Hasad', 'William', 'wabomazocu@mailinator.com', '$2b$10$pQdMM7H9v0O0aSNSqAhFHeBSG2CMQUDcHNybIbLf8EYtGZbHu/lxW', 1, 'Molestias odio ipsam', '2025-02-24 05:27:44', NULL),
(43, 0, 'Yvette', 'Pruitt', 'vyjyso@mailinator.com', '$2b$10$qVb102LM80Ipx0qsgF4Xj.aqZpgKW5yfxn6NInEkZr3WiQmks5x3m', 1, 'Nostrud expedita lab', '2025-03-02 17:35:19', NULL),
(44, 0, 'Jameson', 'Horton', 'kerefidaro@mailinator.com', '$2b$10$C.NgTahM1YFuo.VTvdQ03uYWp0DiDmBPCSq8IwCKZ4rJPRisxuqwm', 1, 'Minima ut non aut li', '2025-03-05 05:51:36', NULL),
(45, 34, 'Brian', 'Perkins', 'pimazutor@mailinator.com', '$2b$10$CLI2u6tGL9uvd8JpbpHnEO3nZrDHhlt5EsbUv94z8c2qMeewfHKr2', 1, 'Ipsum ad molestias q', '2025-03-05 06:19:05', NULL),
(46, 2147483647, 'Serena', 'Ratliff', 'dyvazijawu@mailinator.com', '$2b$10$xOttdun9UrWXKYFbXrLUQOSB893rb45m.90oqlQvpQ4GxAdM3LYAS', 1, 'Ut id veritatis corp', '2025-03-05 06:22:51', NULL),
(47, 0, 'Sylvester', 'Short', 'wefowavasy@mailinator.com', '$2b$10$8wwm6GraNtHyCSkhLnDRkup2XY2Hmib918D9UrbAsoueKew0ivble', 1, 'Qui expedita laborum', '2025-03-05 16:08:26', NULL),
(48, 0, 'Lawrence', 'Chambers', 'byticube@mailinator.com', '$2b$10$jdkpNOWMPnbtoHPBCTEkJureLPXUZUmILw.uVcHWom7QwtE4vo/xm', 1, 'Velit repellendus D', '2025-03-08 05:00:18', NULL),
(50, 8, 'Fallon', 'Wolfe', 'ramu@gmail.com', '$2b$10$SYZ3SJMB1CYnaR2FA3pliOTso8be9riqyTeJnO7V4d1TsVmdh3BMm', 1, 'Doloremque quibusdam', '2025-03-08 18:52:06', NULL),
(51, 0, 'daniel', 'max', 'daniel123max123@gmail.com', '$2b$10$.4GmWXIU8AdaZbRFUvEKSOngWBwA/Dn4DcHGRpshaVATxjsDziZ5W', 875497320, '10-0church street', '2025-03-09 13:55:38', NULL),
(54, 0, 'bharathi', 'B', 'Bharathi@gmail.com', '$2b$10$odCS1owaqTVmhCgB20Ze2umLQVNlCeqXCUFPuSJcyL4gZAVoRo15G', 2147483647, 'ssd', '2025-06-16 06:00:12', NULL),
(55, 61, 'sivakumar', 'B', 'sivakumar@gmail.com', '$2b$10$.ucP.zH64jD4EW9QvEkxaux3ZjlF050pbtFi7su7E75Zu39MeuuuO', 2147483647, 'annai therasa', '2025-06-19 09:18:46', NULL),
(56, 91, 'siva', 'kumar', 'sk@gmail.com', '$2b$10$EhroglQuomdc.Whp7PtJ3uWihz7xFnZRC3oEoA5oJxPUgb29/Z65e', 2147483647, 'annai therasa street', '2025-06-19 09:20:15', NULL),
(57, 5, 'arunprakash', 'n', 'arunprakash@gmail.com', '$2b$10$1NJAaGZ9kJJ9QrHGu5WrfOTAaSo7Gr/yFgHBopA2qiUE6BweL0RkK', 720051234, 'Tambaram', '2025-06-20 07:11:37', NULL),
(58, 0, 'arun', 'n', 'arun@gmail.com', '$2b$10$oZUPlQcT2Rn.uTkLT4u.Wuogqi7nSW7I9atR7l/.mxaOAysl9xSoy', 2147483647, 'pammal', '2025-06-20 07:13:11', NULL),
(59, 0, 'vignesh', 's', 'viki@gmail.com', '$2b$10$fBZchTRQD8BwEL7G75ddr.6ldbo/cmflBNyVoKWUoeBB/jqFsTLAe', 2147483647, 'ruthru', '2025-06-20 12:20:50', NULL),
(60, 4, 'vasim', 'akram', 'vasimakram@gmail.com', '$2b$10$RK5OMLQ0/yy759LFB2EteO5uBAotrFOHPglF/fGzP39ibTY5nq7GK', 2147483647, 'anagapathur', '2025-06-21 06:51:09', NULL),
(61, 3, 'kavitha', 'a', 'kavitha@gmail.com', '$2b$10$qcYSuIOLYy8/z/bhcw.aaeyvlZBPDSYQLN1yor/KGTcMsXBqJHZ4e', 2147483647, 'pammal', '2025-06-23 06:27:17', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tables`
--

CREATE TABLE `tables` (
  `id` int(11) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `number` varchar(10) DEFAULT NULL,
  `seats` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tables`
--

INSERT INTO `tables` (`id`, `location`, `number`, `seats`, `status`, `created_at`, `updated_at`) VALUES
(21, 'window', '12', 2, 'Available', '2025-06-18 11:55:37', '2025-06-20 12:36:59'),
(23, 'windowseat', '1', 9, 'Available', '2025-06-19 12:46:07', '2025-06-19 12:46:07');

-- --------------------------------------------------------

--
-- Table structure for table `time_slots`
--

CREATE TABLE `time_slots` (
  `id` int(11) NOT NULL,
  `slot_name` varchar(255) NOT NULL,
  `start_time` time NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `time_slots`
--

INSERT INTO `time_slots` (`id`, `slot_name`, `start_time`, `created_at`, `updated_at`) VALUES
(25, 'boking', '12:00:00', '2025-05-17 10:51:19', '2025-05-17 10:51:19'),
(26, 'Booking', '09:03:00', '2025-06-16 12:03:42', '2025-06-16 12:03:42');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `request` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `login_count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `request`, `created_at`, `login_count`) VALUES
(45, 'Daniel', 'daniel@gmail.com', 'NA', '2025-02-11 11:19:56', 0),
(46, 'Raju', 'raju@gmail.com', 'NA', '2025-02-11 12:27:39', 0),
(47, 'siva', 'siva@gmail.com', 'no', '2025-02-11 12:56:41', 0),
(48, 'Sivakumar', 'sivakumarb3928@gmail.com', 'No needs', '2025-02-12 05:32:40', 0),
(49, 'daniel max', 'daniel123max123@gmail.com', 'Testing', '2025-02-12 05:34:07', 0),
(50, 'daniel max', 'daniel123max123@gmail.com', 'NA', '2025-02-12 05:34:40', 0),
(51, 'daniel', 'demo@gmail.com', 'Dan', '2025-02-12 05:38:21', 0),
(52, 'daniel', 'daniel123max123@gmail.com', 'na', '2025-02-12 05:41:07', 0),
(53, 'Andrew', 'and@gmail.com', 'na', '2025-02-12 05:46:21', 0),
(54, 'Yael Waller', 'gexepu@mailinator.com', 'Aut elit nesciunt ', '2025-02-12 06:10:50', 0),
(55, 'Deirdre Barlow', 'mohotozum@mailinator.com', 'Dolore recusandae D', '2025-02-12 06:14:26', 0),
(56, 'Cecilia Mccarty', 'wyvupyvan@mailinator.com', 'Delectus voluptatib', '2025-02-12 06:15:10', 0),
(57, 'Kuame Shaw', 'cizi@mailinator.com', 'Consequatur Neque e', '2025-02-12 06:15:56', 0),
(58, 'Lila Pratt', 'kuwufidihy@mailinator.com', 'Dolor quis tempor es', '2025-02-12 06:17:30', 0),
(59, 'Madeline Workman', 'qisoqabup@mailinator.com', 'Dolor eligendi exped', '2025-02-12 06:34:59', 0),
(60, 'daniel max', 'daniel123max123@gmail.com', 'NA', '2025-02-12 06:35:40', 0),
(61, 'max', 'demo@gmail.com', 'dafa', '2025-02-12 06:36:13', 0),
(62, 'vasimakram', 'vasimakram@gmail.com', 'no', '2025-02-12 06:37:57', 4),
(63, 'sharon', 'sharon@gmail.com', 'no ', '2025-02-12 06:38:53', 0),
(64, 'kavitha', 'kavitha@gmail.com', 'no', '2025-02-12 06:39:36', 1),
(65, 'kumar', 'kumar@gmail.com', 'na', '2025-02-12 06:45:35', 0),
(66, 'daniel max', 'daniel123m123@gmail.com', 'gfsfe', '2025-03-02 17:34:37', 0),
(67, 'daniel max', 'daniel123max123@gmail.com', 'Testing', '2025-03-09 17:11:03', 0),
(68, 'daniel max', 'daniel123max123@gmail.com', 'Testing', '2025-03-09 17:13:10', 0),
(69, 'daniel max', 'daniel123max123@gmail.com', 'Testing', '2025-03-09 17:14:38', 0),
(70, 'daniel max', 'daniel123max123@gmail.com', 'Testing', '2025-03-09 17:15:09', 0),
(71, 'daniel max', 'daniel123max123@gmail.com', 'Testing', '2025-03-09 17:16:24', 0),
(72, 'index.html', 'daniel123max123@gmail.com', 'net', '2025-03-10 04:25:24', 0),
(73, 'daniel', 'daniel.jorimts@gmail.com', 'dsge', '2025-03-10 04:35:01', 0),
(74, 'daniel max', 'dani17elc@gmail.com', 'sdfgsgfrefsge', '2025-03-10 04:38:49', 0),
(75, 'daniel max', 'demo@gmail.com', 'fdghd', '2025-03-10 05:41:21', 0),
(76, 'dhivya', 'dhivya@test.com', 'test', '2025-03-11 06:48:47', 0),
(77, 'dhivya', 'dhivya@test.comm', 'test', '2025-03-11 06:50:42', 0),
(78, 'daniel max', 'daniel123max123@gmail.com', 'ed', '2025-03-11 06:53:27', 0),
(79, 'Jarrod Stark', 'gynetod@mailinator.com', 'Dolor at accusantium', '2025-03-11 06:55:52', 0),
(80, 'Leilani Rush', 'sevewola@mailinator.com', 'Animi et voluptatem', '2025-03-11 06:56:41', 0),
(81, 'Malcolm Sherman', 'rimumal@mailinator.com', 'Assumenda aut alias ', '2025-03-11 06:57:58', 0),
(82, 'Josephine Guerrero', 'devu@mailinator.com', 'Ipsam tempore sint ', '2025-03-11 07:05:00', 0),
(83, 'Kenneth Vaughn', 'kufufytok@mailinator.com', 'Est reiciendis tempo', '2025-03-11 07:05:40', 0),
(84, 'Tatum Hooper', 'cabuwog@mailinator.com', 'Eius sed eiusmod sit', '2025-03-11 07:07:47', 0),
(85, 'Colleen Harvey', 'gawusub@mailinator.com', 'Est obcaecati dolore', '2025-03-11 07:12:01', 0),
(86, 'Amy Gardner', 'bujypetybe@mailinator.com', 'Illum tenetur eiusm', '2025-03-11 07:12:34', 0),
(87, 'Alexis Riggs', 'kovigola@mailinator.com', 'Dolores rerum sed do', '2025-03-11 07:13:47', 0),
(88, 'Naomi Price', 'mamezak@mailinator.com', 'Maiores deserunt ips', '2025-03-11 07:14:24', 0),
(89, 'Adena Carver', 'nurev@mailinator.com', 'Sit odio fuga Mole', '2025-03-11 07:18:49', 0),
(90, 'Nicholas Macias', 'pinebikynu@mailinator.com', 'Aut assumenda et atq', '2025-03-11 07:19:11', 0),
(91, 'Sloane Simon', 'zuzyz@mailinator.com', 'Soluta consequatur ', '2025-03-11 07:19:50', 0),
(92, 'dhivya', 'pilottest@test.com', 'test', '2025-03-11 07:21:24', 0),
(93, 'test', 'test@test.com', 'xs', '2025-03-11 07:21:59', 0),
(94, 'Veronica Lloyd', 'manulyla@mailinator.com', 'Laboriosam ipsa au', '2025-03-11 07:23:24', 0),
(95, 'Eric Steele', 'cohojewor@mailinator.com', 'Odio pariatur Delec', '2025-03-11 07:24:56', 0),
(96, 'Frances Newton', 'gobati@mailinator.com', 'Officia quasi quam i', '2025-03-11 07:25:33', 0),
(97, 'Dillon Weiss', 'midirope@mailinator.com', 'Duis ullamco qui iur', '2025-03-11 07:25:46', 0),
(98, 'Kessie Ballard', 'qikoraqu@mailinator.com', 'Beatae iste maiores ', '2025-03-11 07:26:56', 0),
(99, 'Judah Mcintosh', 'wygyhywy@mailinator.com', 'Voluptatem Ex amet', '2025-03-11 07:28:52', 0),
(100, 'Maggie Bishop', 'miwy@mailinator.com', 'Deserunt sunt quia m', '2025-03-11 07:29:34', 0),
(101, 'Gillian Ferrell', 'rideqazy@mailinator.com', 'Nulla tempore quos ', '2025-03-11 08:34:01', 0),
(102, 'Isaac Roy', 'banakon@mailinator.com', 'In minim aliquip nis', '2025-03-11 08:36:47', 0),
(103, 'Honorato Gill', 'woqyluryfy@mailinator.com', 'Dolore assumenda eiu', '2025-03-11 08:40:23', 0),
(104, 'Rudyard Dawson', 'dipucaqyre@mailinator.com', 'Distinctio In quos ', '2025-03-11 08:42:28', 0),
(105, 'Arden Baker', 'gogyb@mailinator.com', 'Et beatae sed dicta ', '2025-03-11 08:44:45', 0),
(106, 'Cecilia Hull', 'conym@mailinator.com', 'Ea rem deserunt saep', '2025-03-11 08:46:00', 0),
(107, 'Wade Bond', 'henaqukat@mailinator.com', 'Debitis quisquam ips', '2025-03-11 08:56:14', 0),
(108, 'Laurel Torres', 'typeqi@mailinator.com', 'Laboriosam qui earu', '2025-03-11 08:57:07', 0),
(109, 'Penelope Joyce', 'juhyhiq@mailinator.com', 'Dolores et vel fugia', '2025-03-11 09:05:50', 0),
(110, 'daniel max', 'daniel.jorimts@gmail.com', 'dcsd', '2025-03-11 09:10:45', 0),
(111, 'Alexis Griffin', 'dunyf@mailinator.com', 'Harum perspiciatis ', '2025-03-11 09:11:24', 0),
(112, 'Alma Barker', 'penobajo@mailinator.com', 'Illo consequatur ex ', '2025-03-11 09:12:37', 0),
(113, 'Cameran Foley', 'mixucy@mailinator.com', 'Irure quisquam illum', '2025-03-11 09:19:58', 0),
(114, 'Lesley Dorsey', 'kizanykil@mailinator.com', 'Quia enim rerum eius', '2025-03-11 09:20:17', 0),
(115, 'Sacha Morrow', 'zehajipufa@mailinator.com', 'Fuga Consectetur m', '2025-03-11 09:20:37', 0),
(116, '2seats', 'test@yopmail.com', 'hgu', '2025-03-11 09:22:26', 0),
(117, 'vasimakram', 'vasimakram1234@gmail.com', 'sss', '2025-05-16 06:37:24', 0),
(118, 'sivakumar1233', 'sivakumar1233@gmail.com', 'sasasas', '2025-05-16 09:53:01', 0),
(119, 'sharon', 'sharon123@gmail.com', 'sharon', '2025-05-16 09:58:23', 0),
(120, 'Sivakumar', 'Sivakumar34@gmail.com', 'ssss', '2025-05-16 11:08:37', 0),
(121, 'Sivakumar', 'Sivakumar34@gmail.com', 'ssss', '2025-05-16 11:08:39', 0),
(122, 'Sivakumar', 'Sivakumar34@gmail.com', 'ssss', '2025-05-16 11:08:51', 0),
(123, 'Sivakumar', 'Sivakumar34@gmail.com', 'ssss', '2025-05-16 11:09:48', 0),
(124, 'Sivakumar', 'Sivakumar34@gmail.com', 'ssss', '2025-05-16 11:09:58', 0),
(125, 'Sivakumar', 'Sivakumar34@gmail.com', 'ssss', '2025-05-16 11:10:03', 0),
(126, 'Sivakumar', 'Sivakumar34@gmail.com', 'ssss', '2025-05-16 11:10:53', 0),
(127, 'sivakumar', 'sivakumarsk.jorimts@gmail.com', 'sssss', '2025-05-16 11:11:32', 0),
(128, 'sss', 'sivakumarsk12.jorimts@gmail.com', 'ssss', '2025-05-16 11:21:40', 0),
(129, 'Sivakumar', 'sivakumarsk123.jorimts@gmail.com', 'ssss', '2025-05-16 11:48:47', 0),
(130, 'Sivakumar', 'sivakumarsk1234.jorimts@gmail.com', 'sasa', '2025-05-16 11:52:17', 0),
(131, 'sharon', 'sharon1223@gmail.com', 'no comments simply waste ', '2025-05-16 12:26:36', 0),
(132, 'sss', 'ssss123454@gmail.com', 'sww', '2025-05-17 05:16:42', 0),
(133, 'sk', 'sk767@gmail.com', 'sssss', '2025-05-17 05:21:52', 0),
(134, 'ssss', 'vasim1323@gmil.com', 'ssss', '2025-05-17 06:13:47', 0),
(135, 'dani', 'dani3456@gmail.com', 'ssss', '2025-05-17 06:33:24', 0),
(136, 'B sivakumar', 'Sivakumar1234778@gmail.com', 'Nothing', '2025-06-16 06:17:48', 0),
(137, 'Bharathi', 'Bharathi@gmail.com', 'sss', '2025-06-16 09:20:48', 0),
(138, 'vasi', 'vasi@gmail.com', 'nothing', '2025-06-18 09:50:07', 0),
(139, 'sivakumar', 'sivakumar@gmail.com', 'no comments simply waste', '2025-06-18 10:33:25', 0),
(140, 'siva', 'siva@gmail.com', 'sss', '2025-06-18 11:46:54', 0),
(141, 'sharonpeter', 'sharonpeter@gmail.com', 'sss', '2025-06-18 11:50:39', 0),
(142, 'werr', 'weel@gmail.com', 'ss', '2025-06-18 11:56:01', 0),
(143, 'kavitha', 'kavitha1111@gmail.com', 'sss', '2025-06-18 12:01:50', 0),
(144, 'daniel', 'danielw111@gmail.com', 'sssss', '2025-06-19 12:12:22', 0),
(145, 'sksks', 'sksk21sq@gmail.com', 'ssddfdf', '2025-06-19 12:19:33', 0),
(146, 'sharonpeter', 'sharonpeter112@gmail.com', 'nothing', '2025-06-19 12:32:39', 0),
(147, 'viki', 'viki@gmail.com', 'ddsa', '2025-06-20 11:05:24', 0),
(148, 'kishore', 'kishore@gmail.com', 'nothinh', '2025-06-23 07:44:23', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`),
  ADD KEY `old_user_id` (`old_users_id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `table_id` (`table_id`),
  ADD KEY `start_time_id` (`start_time_id`);

--
-- Indexes for table `frozen`
--
ALTER TABLE `frozen`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `old_users`
--
ALTER TABLE `old_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `frozen`
--
ALTER TABLE `frozen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `offers`
--
ALTER TABLE `offers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `old_users`
--
ALTER TABLE `old_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `tables`
--
ALTER TABLE `tables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `time_slots`
--
ALTER TABLE `time_slots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth`
--
ALTER TABLE `auth`
  ADD CONSTRAINT `old_user_id` FOREIGN KEY (`old_users_id`) REFERENCES `old_users` (`id`);

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`table_id`) REFERENCES `tables` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`start_time_id`) REFERENCES `time_slots` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
