-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Aug 11, 2026 at 01:42 PM
-- Server version: 9.7.1
-- PHP Version: 8.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `velocita_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(550) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` enum('HOME_HERO','HOME_MIDDLE','NEWS_HERO','SIDEBAR') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'HOME_HERO',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL,
  `button_text` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'Khám phá ngay',
  `media_type` enum('IMAGE','VIDEO','BOTH') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'IMAGE',
  `sort_order` int NOT NULL DEFAULT '0',
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `video_url` varchar(550) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `title`, `image`, `link`, `position`, `status`, `created_at`, `updated_at`, `button_text`, `media_type`, `sort_order`, `subtitle`, `video_url`) VALUES
('a48272de-8f21-11f1-9f48-bebb705820a1', 'Adidas Ultraboost', '/assets/imgs/adidas-2.jpg', '/product-catalog', 'HOME_HERO', 1, '2026-08-03 09:56:48', '2026-08-09 13:24:34', 'Cửa hàng', 'BOTH', 1, 'Một thế hệ mới của giày chạy bộ tăng cường được sản xuất một phần với các vật liệu tái chế e.', '/assets/videos/adidas.mp4'),
('a4828301-8f21-11f1-9f48-bebb705820a1', 'Russoo', '/assets/imgs/russoo.jpg', '/product-catalog', 'HOME_HERO', 1, '2026-08-03 09:56:48', '2026-08-03 09:56:48', 'Cửa hàng', 'BOTH', 2, 'Giày Russoo DUNK trắng xanh, phong cách thể thao hiện đại, thiết kế nổi bật.', '/assets/videos/russoo.mp4'),
('a482857d-8f21-11f1-9f48-bebb705820a1', 'GEL-NIMBUS 26', '/assets/imgs/asics.jpg', '/product-catalog', 'HOME_HERO', 1, '2026-08-03 09:56:48', '2026-08-03 09:56:48', 'Cửa hàng', 'BOTH', 3, 'Đặc tính giảm chấn mềm mại của giày GEL-NIMBUS 26 giúp bạn có cảm giác như đang đặt chân trên mây.', '/assets/videos/asics.mp4'),
('a9ee5a65-a2e4-4b8e-b704-3c5d08869d32', '', '/assets/imgs/blog-clean-shoes.png', NULL, 'NEWS_HERO', 1, '2026-08-09 12:58:06', '2026-08-09 12:58:06', NULL, 'IMAGE', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `session_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `session_key`, `created_at`, `updated_at`) VALUES
('20f0e4cc-b412-4cc0-83bf-9e2ff6a3fa5e', NULL, 'sess_tlr4hgteqfmsj707ql', '2026-08-08 17:04:17', '2026-08-08 17:04:17'),
('e60c633a-b632-4a9c-98a1-752cc40f0f67', NULL, 'sess_bbmj9rjwp8msmxr2ua', '2026-08-10 07:54:22', '2026-08-10 07:54:22');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cart_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL,
  `color` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `variant_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `cart_id`, `product_id`, `size`, `quantity`, `created_at`, `updated_at`, `color`, `variant_id`) VALUES
('2d5ed383-bf85-4be2-9968-5a8067f58c39', '20f0e4cc-b412-4cc0-83bf-9e2ff6a3fa5e', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', '42', 1, '2026-08-10 07:16:51', '2026-08-10 07:16:51', 'Turquoise', NULL),
('95d0b413-e2f0-4c6b-be93-a21f5c558d98', 'e60c633a-b632-4a9c-98a1-752cc40f0f67', 'c1b3f66b-11d0-4bab-8a76-7b4fb989b6ee', '36', 1, '2026-08-10 08:06:42', '2026-08-10 08:06:42', 'Pink', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(550) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image`, `status`, `created_at`, `updated_at`) VALUES
('a47647db-8f21-11f1-9f48-bebb705820a1', 'Adidas', 'adidas', 'Adidas là một trong những thương hiệu giày thể thao hàng đầu thế giớhi.', '/assets/imgs/brand-adidas.png', 1, '2026-08-03 09:56:48', '2026-08-09 11:11:32'),
('a4775302-8f21-11f1-9f48-bebb705820a1', 'Nike', 'nike', 'Nike - biểu tượng toàn cầu với phong cách thể thao hiện đại, chất lượng vượt trội.', '/assets/imgs/brand-nike.png', 1, '2026-08-03 09:56:48', '2026-08-03 09:56:48'),
('a4780392-8f21-11f1-9f48-bebb705820a1', 'Asics', 'asics', 'Asics - thương hiệu giày chạy bộ hàng đầu, kết hợp công nghệ tiên tiến.', '/assets/imgs/brand-asics.png', 1, '2026-08-03 09:56:48', '2026-08-03 09:56:48'),
('a478b531-8f21-11f1-9f48-bebb705820a1', 'Puma', 'puma', 'Puma - thương hiệu thể thao nổi bật, kết hợp sự năng động và hiệu suất vượt trội.', '/assets/imgs/brand-puma.png', 1, '2026-08-03 09:56:48', '2026-08-03 09:56:48');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` enum('SHOWS','ART_CULTURE','GUIDE','GENERAL') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'GENERAL',
  `image` varchar(550) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc` text COLLATE utf8mb4_unicode_ci,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `author` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `show_date` tinyint(1) NOT NULL DEFAULT '0',
  `date` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `slug`, `category`, `image`, `desc`, `content`, `author`, `show_date`, `date`, `status`, `created_at`, `updated_at`) VALUES
('a48cf3a7-8f21-11f1-9f48-bebb705820a1', 'Cách làm sạch giày', 'cach-lam-sach-giay', 'GUIDE', '/assets/imgs/blog-clean-shoes.png', 'Dấn thân và khám phá cùng adidas để học cách vệ sinh đôi sneakers của bạn một cách chuẩn chỉnh', '<p>Vệ sinh giày đúng cách không chỉ làm đẹp mà còn kéo dài tuổi thọ cho đôi giày yêu thích của bạn...</p>', 'VELOCITÀ Team', 1, '15 Tháng 1, 2026', 1, '2026-08-03 09:56:48', '2026-08-10 09:55:06'),
('a48d037d-8f21-11f1-9f48-bebb705820a1', 'Tỏa sáng phong cách: Cách phối đồ với chân váy tennis', 'toa-sang-phong-cach-cach-phoi-do-voi-chan-vay-tennis', 'GUIDE', '/assets/imgs/blog-tennis-skirt.jpg', 'Sẵn sàng để chinh phục? Tìm hiểu cách phối trang phục với chân váy tennis cùng adidas', '<p>Chân váy tennis không chỉ dành riêng cho sân tập mà còn là item thời trang vô cùng năng động...</p>', 'VELOCITÀ Team', 1, '18 Tháng 1, 2026', 1, '2026-08-03 09:56:48', '2026-08-10 09:55:06'),
('a48d0759-8f21-11f1-9f48-bebb705820a1', 'Cách phối đồ với áo đấu bóng đá', 'cach-phoi-do-voi-ao-dau-bong-da', 'GUIDE', '/assets/imgs/blog-soccer-jersey.jpg', 'Từ phong cách thể thao đến quyến rũ hay lịch lãm, áo đấu bóng đá thực sự là một người hùng đa năng', '<p>Xu hướng Blokecore phối áo đấu bóng đá cùng quần jean/short đang cực kỳ thịnh hành trên toàn cầu...</p>', 'VELOCITÀ Team', 1, '20 Tháng 1, 2026', 1, '2026-08-03 09:56:48', '2026-08-10 09:55:06'),
('a48d08cd-8f21-11f1-9f48-bebb705820a1', '6 cách sáng tạo để buộc dây giày thể thao của bạn', '6-cach-sang-tao-de-buoc-day-giay-the-thao-cua-ban', 'GUIDE', '/assets/imgs/blog-how-to-lace-sneakers.jpg', 'Nâng tầm phong cách giày thể thao với hướng dẫn chi tiết của chúng tôi về cách buộc dây giày', '<p>Thay đổi kiểu buộc dây giày là cách đơn giản nhất để làm mới đôi sneakers của bạn mỗi ngày...</p>', 'VELOCITÀ Team', 1, '22 Tháng 1, 2026', 1, '2026-08-03 09:56:48', '2026-08-10 09:55:06'),
('a48d09f4-8f21-11f1-9f48-bebb705820a1', 'Cách tránh tình trạng kiệt sức khi tập luyện', 'cach-tranh-tinh-trang-kiet-suc-khi-tap-luyen-1786455435168', 'GUIDE', '/assets/imgs/blog-gif.gif', 'Bạn cảm thấy mệt mỏi trước cả khi bắt đầu tập? Tìm hiểu các dấu hiệu của việc kiệt sức', '<p><img src=\"/uploads/news/imgs/h-street-etoile-sneakers-women_turquoise-3-1786455428077.jpg\">Lắng&nbsp;nghe&nbsp;cơ&nbsp;thể&nbsp;và&nbsp;có&nbsp;chế&nbsp;độ&nbsp;nghỉ&nbsp;ngơi&nbsp;hợp&nbsp;lý&nbsp;là&nbsp;chìa&nbsp;khóa&nbsp;để&nbsp;duy&nbsp;trì&nbsp;phong&nbsp;độ&nbsp;thể&nbsp;thao&nbsp;bền&nbsp;vững...</p><blockquote>fsdf</blockquote><p><img src=\"/uploads/news/imgs/h-street-etoile-sneakers-women_turquoise-4-1786293215019.jpg\"></p>', 'VELOCITÀ Team 2', 1, '25 Tháng 1, 2026', 1, '2026-08-03 09:56:48', '2026-08-11 13:37:15'),
('a48d0b1a-8f21-11f1-9f48-bebb705820a1', 'Hướng dẫn Lunge: Cách thực hiện đúng động tác Lunge', 'huong-dan-lunge-cach-thuc-hien-dung-dong-tac-lunge', 'GUIDE', '/assets/imgs/blog-lunge.jpg', 'Dành sự chăm sóc cho đôi chân bằng cách học cách thực hiện đúng động tác Lunge', '<p>Động tác Lunge giúp phát triển cơ đùi và mông săn chắc, hỗ trợ cho việc chạy bộ hiệu quả hơn...</p>', 'VELOCITÀ Team', 1, '28 Tháng 1, 2026', 1, '2026-08-03 09:56:48', '2026-08-10 09:55:06');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `subtotal` int NOT NULL,
  `shipping_fee` int NOT NULL DEFAULT '0',
  `grand_total` int NOT NULL,
  `payment_method` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'SePay',
  `payment_status` enum('UNPAID','PAID','REFUNDED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'UNPAID',
  `transaction_no` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('PENDING','PROCESSING','SHIPPED','DELIVERED','CANCELLED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL,
  `bank_code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  `payment_expired_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `code`, `user_id`, `full_name`, `phone`, `email`, `address`, `note`, `subtotal`, `shipping_fee`, `grand_total`, `payment_method`, `payment_status`, `transaction_no`, `status`, `created_at`, `updated_at`, `bank_code`, `paid_at`, `payment_expired_at`) VALUES
('066e5593-3526-4edc-9117-deac32ad326b', 'VEL461141', NULL, 'Thành', '0901111122', 'phuocthanh03062004@gmail.com', 'dfsdf', NULL, 3000, 0, 3000, 'BANK_TRANSFER', 'UNPAID', NULL, 'PENDING', '2026-08-10 07:28:39', '2026-08-10 07:28:39', NULL, NULL, '2026-08-10 07:43:39'),
('0ab8db33-fae1-4669-916e-51ba438bbc00', 'VEL858111', NULL, 'Thành', '0901111122', 'phuocthanh03062004@gmail.com', 'dasfd', NULL, 3000, 0, 3000, 'BANK_TRANSFER', 'UNPAID', NULL, 'PENDING', '2026-08-10 07:30:53', '2026-08-10 07:30:53', NULL, NULL, '2026-08-10 07:45:53'),
('11977f3f-f74f-4b71-ba73-9de4bbdb2eed', 'VEL337792', NULL, 'Thành', '0901111122', 'phuocthanh03062004@gmail.com', 'dsfsdf', NULL, 3000, 0, 3000, 'BANK_TRANSFER', 'UNPAID', NULL, 'CANCELLED', '2026-08-10 05:40:06', '2026-08-10 07:56:59', NULL, NULL, '2026-08-10 05:55:06'),
('1ab2a829-1aed-49db-92c9-5e3a09e4e200', 'VEL156193', NULL, 'Thành', '0901111122', 'phuocthanh03062004@gmail.com', 'dsfsdf', NULL, 3000, 0, 3000, 'BANK_TRANSFER', 'UNPAID', NULL, 'PENDING', '2026-08-10 06:50:31', '2026-08-10 06:50:31', NULL, NULL, '2026-08-10 07:05:31'),
('2ff3e0b5-222f-4bfd-97d6-9ce5edc4744a', 'VEL206296', NULL, 'Thành', '0901111122', 'phuocthanh03062004@gmail.com', 'sadasdas', NULL, 3000, 0, 3000, 'BANK_TRANSFER', 'UNPAID', NULL, 'PENDING', '2026-08-10 05:37:01', '2026-08-10 05:37:01', NULL, NULL, '2026-08-10 05:52:01'),
('4679f7b7-8143-4f64-be95-ca422e540151', 'VEL447369', '2859d743-289b-493b-adb8-0553593de72b', 'Super Admin Velocità', '0901111111', 'superadmin@velocita.com', 'czxczxczxczxczxc', NULL, 3000, 0, 3000, 'BANK_TRANSFER', 'PAID', '920D608111NRJGW0', 'PROCESSING', '2026-08-11 13:38:07', '2026-08-11 13:38:49', 'VietinBank', '2026-08-11 13:38:49', '2026-08-11 13:53:07'),
('50994a70-afe4-4186-813b-76611c0dcdbc', 'VEL566774', NULL, 'Thành', '0901111122', 'phuocthanh03062004@gmail.com', 'dfsdf', NULL, 2500000, 0, 2500000, 'BANK_TRANSFER', 'UNPAID', NULL, 'CANCELLED', '2026-08-10 08:06:49', '2026-08-10 08:07:36', NULL, NULL, '2026-08-10 08:21:49'),
('535cb6fe-fa2e-4ebe-af70-a9256c72f007', 'VEL430988', NULL, 'Super Admin Velocità', '0901111111', 'superadmin@velocita.com', 'gfdg', NULL, 3000, 0, 3000, 'BANK_TRANSFER', 'UNPAID', NULL, 'PENDING', '2026-08-10 07:52:32', '2026-08-10 07:52:32', NULL, NULL, '2026-08-10 08:07:32'),
('60666356-bf84-4368-bb66-e202b4318a0b', 'VEL871074', NULL, 'Thành', '0901111122', 'phuocthanh03062004@gmail.com', 'dfsdf', NULL, 3000, 0, 3000, 'BANK_TRANSFER', 'UNPAID', NULL, 'PENDING', '2026-08-10 06:48:20', '2026-08-10 06:48:20', NULL, NULL, '2026-08-10 07:03:20'),
('6927ca4d-25c8-4a43-8866-1c47f2be4841', 'VEL599707', NULL, 'Thành', '0901111122', 'phuocthanh03062004@gmail.com', 'fdf', NULL, 3000, 0, 3000, 'BANK_TRANSFER', 'PAID', '920D608108TS52J7', 'SHIPPED', '2026-08-10 07:01:08', '2026-08-10 09:30:39', 'VietinBank', '2026-08-10 07:01:39', '2026-08-10 07:16:08'),
('79d8fb34-8ac8-4b44-be6f-768563990a31', 'VEL577740', NULL, 'Thành', '0901111122', 'phuocthanh03062004@gmail.com', 'sdasd', NULL, 3000, 0, 3000, 'BANK_TRANSFER', 'UNPAID', NULL, 'PENDING', '2026-08-10 07:22:02', '2026-08-10 07:22:02', NULL, NULL, '2026-08-10 07:37:02'),
('d451419a-3de3-44d0-a887-9120f7fef9c1', 'VEL777781', NULL, 'Thành', '0901111122', 'phuocthanh03062004@gmail.com', 'fdsf', NULL, 3000, 0, 3000, 'BANK_TRANSFER', 'UNPAID', NULL, 'PENDING', '2026-08-10 05:32:59', '2026-08-10 05:32:59', NULL, NULL, '2026-08-10 05:47:59');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_image` varchar(550) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_size` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL,
  `product_color` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_name`, `product_image`, `product_size`, `price`, `quantity`, `created_at`, `updated_at`, `product_color`) VALUES
('188d5f89-70a7-4ec6-bd0d-687e1903ae6a', '4679f7b7-8143-4f64-be95-ca422e540151', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', 'H-Street Etoile Sneakers Women', '/uploads/products/imgs/h-street-etoile-sneakers-women_turquoise-4.jpg', '42', 3000, 1, '2026-08-11 13:38:07', '2026-08-11 13:38:07', 'Turquoise'),
('34dea856-31d4-4667-854a-a908cfc897cc', '066e5593-3526-4edc-9117-deac32ad326b', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', 'H-Street Etoile Sneakers Women', '/uploads/products/imgs/h-street-etoile-sneakers-women_turquoise-4.jpg', '42', 3000, 1, '2026-08-10 07:28:39', '2026-08-10 07:28:39', 'Turquoise'),
('50477aa3-2e43-4791-84de-93ae8c0fcf3b', '535cb6fe-fa2e-4ebe-af70-a9256c72f007', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', 'H-Street Etoile Sneakers Women', '/uploads/products/imgs/h-street-etoile-sneakers-women_turquoise-4.jpg', '42', 3000, 1, '2026-08-10 07:52:32', '2026-08-10 07:52:32', 'Turquoise'),
('5941d4aa-6a56-4183-a39c-727652dfeb0e', '11977f3f-f74f-4b71-ba73-9de4bbdb2eed', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', 'H-Street Etoile Sneakers Women', '/uploads/products/imgs/h-street-etoile-sneakers-women_turquoise-4.jpg', '36', 3000, 1, '2026-08-10 05:40:06', '2026-08-10 05:40:06', 'Turquoise'),
('6c086c6c-5db6-4670-99b2-7ec099b6a53a', '1ab2a829-1aed-49db-92c9-5e3a09e4e200', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', 'H-Street Etoile Sneakers Women', '/uploads/products/imgs/h-street-etoile-sneakers-women_turquoise-4.jpg', '36', 3000, 1, '2026-08-10 06:50:31', '2026-08-10 06:50:31', 'Turquoise'),
('9782d567-2df5-490d-888b-1ff4ed7833ec', '79d8fb34-8ac8-4b44-be6f-768563990a31', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', 'H-Street Etoile Sneakers Women', '/uploads/products/imgs/h-street-etoile-sneakers-women_turquoise-4.jpg', '42', 3000, 1, '2026-08-10 07:22:02', '2026-08-10 07:22:02', 'Turquoise'),
('a26c9d67-b014-408e-9786-4387c7b3ea48', '60666356-bf84-4368-bb66-e202b4318a0b', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', 'H-Street Etoile Sneakers Women', '/uploads/products/imgs/h-street-etoile-sneakers-women_turquoise-4.jpg', '36', 3000, 1, '2026-08-10 06:48:20', '2026-08-10 06:48:20', 'Turquoise'),
('a5ac51b0-376b-4afd-80f6-fda5e933be93', '2ff3e0b5-222f-4bfd-97d6-9ce5edc4744a', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', 'H-Street Etoile Sneakers Women', '/uploads/products/imgs/h-street-etoile-sneakers-women_turquoise-4.jpg', '36', 3000, 1, '2026-08-10 05:37:01', '2026-08-10 05:37:01', 'Turquoise'),
('a9b22555-c2cf-4e1c-ac1a-76345055aeb1', '6927ca4d-25c8-4a43-8866-1c47f2be4841', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', 'H-Street Etoile Sneakers Women', '/uploads/products/imgs/h-street-etoile-sneakers-women_turquoise-4.jpg', '36', 3000, 1, '2026-08-10 07:01:08', '2026-08-10 07:01:08', 'Turquoise'),
('b55f0061-804c-4621-a9d4-88f94c8d1cf3', '50994a70-afe4-4186-813b-76611c0dcdbc', 'c1b3f66b-11d0-4bab-8a76-7b4fb989b6ee', 'H-Street Etoile Sneakers Women', '/uploads/products/imgs/h-street-etoile-sneakers-women-4.jpg', '36', 2500000, 1, '2026-08-10 08:06:49', '2026-08-10 08:06:49', 'Pink'),
('d78be726-9b6a-42e3-aa5f-628fc0716199', '0ab8db33-fae1-4669-916e-51ba438bbc00', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', 'H-Street Etoile Sneakers Women', '/uploads/products/imgs/h-street-etoile-sneakers-women_turquoise-4.jpg', '42', 3000, 1, '2026-08-10 07:30:53', '2026-08-10 07:30:53', 'Turquoise'),
('f2196849-a1a0-4f36-b543-0808884c74ec', 'd451419a-3de3-44d0-a887-9120f7fef9c1', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', 'H-Street Etoile Sneakers Women', '/uploads/products/imgs/h-street-etoile-sneakers-women_turquoise-4.jpg', '36', 3000, 1, '2026-08-10 05:32:59', '2026-08-10 05:32:59', 'Turquoise');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(550) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hover_image` varchar(550) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int NOT NULL,
  `sale_price` int DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `details` longtext COLLATE utf8mb4_unicode_ci,
  `gender` enum('MEN','WOMEN','UNISEX') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'UNISEX',
  `is_new` tinyint(1) NOT NULL DEFAULT '0',
  `is_best` tinyint(1) NOT NULL DEFAULT '0',
  `is_sale` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL,
  `color_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `style_code` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `slug`, `image`, `hover_image`, `price`, `sale_price`, `description`, `details`, `gender`, `is_new`, `is_best`, `is_sale`, `status`, `created_at`, `updated_at`, `color_name`, `style_code`) VALUES
('8e4cab35-4a52-4ada-a4d0-4d0996901d83', 'a478b531-8f21-11f1-9f48-bebb705820a1', 'H-Street Etoile Sneakers Women', 'h-street-etoile-sneakers-women-1786241978582', '/uploads/products/imgs/h-street-etoile-sneakers-women_turquoise-4.jpg', '/uploads/products/imgs/h-street-etoile-sneakers-women_turquoise-3.jpg', 3000, NULL, 'With a design inspired by the iconic 2000s running spike', '<p><span style=\"background-color: rgb(250, 250, 250); color: rgb(84, 84, 84);\">With&nbsp;a&nbsp;design&nbsp;inspired&nbsp;by&nbsp;the&nbsp;iconic&nbsp;2000s&nbsp;running&nbsp;spike,&nbsp;the&nbsp;PUMA&nbsp;Harambee,&nbsp;the?H-Street?is&nbsp;a&nbsp;timeless&nbsp;icon.&nbsp;These&nbsp;H-Street&nbsp;Etoile&nbsp;ballet-inspired&nbsp;sneakers&nbsp;blend&nbsp;a&nbsp;mix&nbsp;of&nbsp;satiny&nbsp;and&nbsp;soft&nbsp;materials&nbsp;for&nbsp;an&nbsp;elegant&nbsp;touch.</span></p><p><img src=\"http://localhost:3000/uploads/products/imgs/h-street-etoile-sneakers-women_turquoise-3.jpg\"></p>', 'WOMEN', 1, 0, 0, 1, '2026-08-09 02:19:39', '2026-08-10 09:55:06', 'Turquoise', 'HESW'),
('a486354c-8f21-11f1-9f48-bebb705820a1', 'a47647db-8f21-11f1-9f48-bebb705820a1', 'Coursecup Spikeless Golf Shoes', 'coursecup-spikeless-golf-shoes', '/assets/imgs/product-adidas-1.jpg', '/assets/imgs/adidas-1.png', 3800000, 3500000, 'Giày Golf Không Đinh Coursecup Spikeless phù hợp cho golf', '<p>Giày&nbsp;Golf&nbsp;Không&nbsp;Đinh&nbsp;Coursecup&nbsp;Spikeless&nbsp;được&nbsp;thiết&nbsp;kế&nbsp;tối&nbsp;ưu&nbsp;cho&nbsp;các&nbsp;golfer&nbsp;chuyên&nbsp;nghiệp&nbsp;với&nbsp;độ&nbsp;bám&nbsp;tuyệt&nbsp;vời&nbsp;và&nbsp;sự&nbsp;êm&nbsp;ái&nbsp;suốt&nbsp;cả&nbsp;ngày&nbsp;trên&nbsp;sân&nbsp;golf.</p><blockquote>sdadsd</blockquote><p><img src=\"http://localhost:3000/uploads/products/imgs/coursecup_spikeless_golf_shoes_white_ih8436_hm66.jpg\"></p>', 'UNISEX', 1, 0, 1, 1, '2026-08-03 09:56:48', '2026-08-10 09:55:06', 'Cloud White', 'CRSP'),
('a4864ed9-8f21-11f1-9f48-bebb705820a1', 'a47647db-8f21-11f1-9f48-bebb705820a1', 'Harden Volume 9 Shoes', 'harden-volume-9-shoes', '/assets/imgs/product-adidas-4.png', '/assets/imgs/product-adidas-3.png', 4125936, NULL, 'Giày bóng rổ Harden Volume 9', '<p>Mẫu giày bóng rổ chữ ký tiếp theo mang phong cách thi đấu bùng nổ của siêu sao James Harden với công nghệ đệm hỗ trợ bật nhảy tối đa.</p>', 'MEN', 1, 1, 0, 1, '2026-08-03 09:56:48', '2026-08-10 09:55:06', 'Metamorphosis', 'HRD9'),
('a4865295-8f21-11f1-9f48-bebb705820a1', 'a4775302-8f21-11f1-9f48-bebb705820a1', 'Nike Air Max 90 LV8', 'nike-air-max-90-lv8', '/assets/imgs/product-nike-1.png', '/assets/imgs/product-nike-2.png', 4109000, NULL, 'Nike Air Max 90 LV8 là mẫu giày thể thao phong cách thuộc dòng Air Max nổi tiếng của Nike.', '<p>Dòng&nbsp;giày&nbsp;huyền&nbsp;thoại&nbsp;Air&nbsp;Max&nbsp;90&nbsp;với&nbsp;phần&nbsp;đế&nbsp;nâng&nbsp;cao&nbsp;LV8&nbsp;tạo&nbsp;dáng&nbsp;tôn&nbsp;chân&nbsp;và&nbsp;đệm&nbsp;khí&nbsp;Air&nbsp;biểu&nbsp;tượng&nbsp;mang&nbsp;lại&nbsp;sự&nbsp;êm&nbsp;ái&nbsp;từng&nbsp;bước&nbsp;đi.</p>', 'WOMEN', 0, 1, 0, 1, '2026-08-03 09:56:48', '2026-08-10 09:55:06', 'White', 'AM90'),
('a486546e-8f21-11f1-9f48-bebb705820a1', 'a4775302-8f21-11f1-9f48-bebb705820a1', 'Nike Mercurial Superfly 10 Academy Kylian Mbappé', 'nike-mercurial-superfly-10-academy-kylian-mbappe', '/assets/imgs/product-nike-4.png', '/assets/imgs/product-nike-3.jpg', 8349000, NULL, 'Giày bóng đá Nike Mercurial Superfly 10', '<p>Phiên bản đặc biệt Kylian Mbappé thiết kế riêng cho các cầu thủ tốc độ, độ bám sân vượt trội và kiểm soát bóng hoàn hảo.</p>', 'MEN', 1, 1, 0, 1, '2026-08-03 09:56:48', '2026-08-10 09:55:06', 'Gold', 'MERC'),
('a48655e4-8f21-11f1-9f48-bebb705820a1', 'a478b531-8f21-11f1-9f48-bebb705820a1', 'PUMA x ONE PIECE Suede Luffy Mũ Rơm', 'puma-x-one-piece-suede-luffy-mu-rom', '/assets/imgs/product-puma-1.jpg', '/assets/imgs/product-puma-2.jpg', 2500000, 1900000, 'Giày thể thao da lộn unisex PUMA x ONE PIECE Suede Luffy Mũ Rơm', '<p>Sự&nbsp;kết&nbsp;hợp&nbsp;độc&nbsp;quyền&nbsp;giữa&nbsp;Puma&nbsp;và&nbsp;bộ&nbsp;anime&nbsp;đình&nbsp;đám&nbsp;One&nbsp;Piece&nbsp;mang&nbsp;dấu&nbsp;ấn&nbsp;thuyền&nbsp;trưởng&nbsp;Luffy&nbsp;với&nbsp;chất&nbsp;liệu&nbsp;da&nbsp;lộn&nbsp;cao&nbsp;cấp.</p>', 'UNISEX', 0, 0, 1, 1, '2026-08-03 09:56:48', '2026-08-10 09:55:06', 'For All Time Red', 'PXOP'),
('a4865878-8f21-11f1-9f48-bebb705820a1', 'a4780392-8f21-11f1-9f48-bebb705820a1', 'GEL-DS TRAINER 14', 'gel-ds-trainer-14', '/assets/imgs/product-asics-1.jpg', '/assets/imgs/product-asics-2.jpg', 2551745, NULL, 'Giày thể thao GEL-DS TRAINER 14', '<p>Dòng giày chạy bộ siêu nhẹ Asics với công nghệ GEL ổn định gót chân, hỗ trợ tập luyện marathon và chạy đường dài chuyên nghiệp.</p>', 'UNISEX', 0, 0, 0, 1, '2026-08-03 09:56:48', '2026-08-10 09:55:06', 'White / Midnight', 'GLDS'),
('c1b3f66b-11d0-4bab-8a76-7b4fb989b6ee', 'a478b531-8f21-11f1-9f48-bebb705820a1', 'H-Street Etoile Sneakers Women', 'h-street-etoile-sneakers-women-1786241680271', '/uploads/products/imgs/h-street-etoile-sneakers-women-4.jpg', '/uploads/products/imgs/h-street-etoile-sneakers-women-3.jpg', 2500000, NULL, 'With a design inspired by the iconic 2000s running spike', '<p><span style=\"background-color: rgb(250, 250, 250); color: rgb(84, 84, 84);\">With&nbsp;a&nbsp;design&nbsp;inspired&nbsp;by&nbsp;the&nbsp;iconic&nbsp;2000s&nbsp;running&nbsp;spike,&nbsp;the&nbsp;PUMA&nbsp;Harambee,&nbsp;the?H-Street?is&nbsp;a&nbsp;timeless&nbsp;icon.&nbsp;These&nbsp;H-Street&nbsp;Etoile&nbsp;ballet-inspired&nbsp;sneakers&nbsp;blend&nbsp;a&nbsp;mix&nbsp;of&nbsp;satiny&nbsp;and&nbsp;soft&nbsp;materials&nbsp;for&nbsp;an&nbsp;elegant&nbsp;touch.</span></p>', 'WOMEN', 1, 0, 0, 1, '2026-08-09 02:14:40', '2026-08-10 09:55:06', 'Pink', 'HESW');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(550) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `sort_order`, `created_at`, `updated_at`) VALUES
('222f0655-a843-47d6-84a7-d28dc25ba7a6', 'a48655e4-8f21-11f1-9f48-bebb705820a1', '/assets/imgs/product-puma-1.jpg', 1, '2026-08-10 08:18:59', '2026-08-10 08:18:59'),
('2311273d-2898-4b4c-9eda-bc4881c3e5f3', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', '/uploads/products/imgs/h-street-etoile-sneakers-women_turquoise-3.jpg', 2, '2026-08-10 05:30:43', '2026-08-10 05:30:43'),
('3e8a24b0-e844-4270-aca2-bc6d64f258d2', 'a486354c-8f21-11f1-9f48-bebb705820a1', '/uploads/products/imgs/coursecup_spikeless_golf_shoes_white_ih8436_hm66.jpg', 3, '2026-08-09 02:11:42', '2026-08-09 02:11:42'),
('4edbe8a8-3c0f-4dbd-8d08-e9e0ca3a1efc', 'a486354c-8f21-11f1-9f48-bebb705820a1', '/uploads/products/imgs/coursecup_spikeless_golf_shoes_white_ih8436_hm16.jpg', 4, '2026-08-09 02:11:42', '2026-08-09 02:11:42'),
('5c75be40-70e6-49ca-ba1d-d5e1abbf2436', 'a486354c-8f21-11f1-9f48-bebb705820a1', '/assets/imgs/product-adidas-1.jpg', 1, '2026-08-09 02:11:42', '2026-08-09 02:11:42'),
('5eb39955-c533-43ac-b535-035f79df5a10', 'c1b3f66b-11d0-4bab-8a76-7b4fb989b6ee', '/uploads/products/imgs/h-street-etoile-sneakers-women-4.jpg', 1, '2026-08-09 02:20:08', '2026-08-09 02:20:08'),
('6047ead2-19d7-4f25-a347-b24784a84705', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', '/uploads/products/imgs/h-street-etoile-sneakers-women_turquoise-4.jpg', 1, '2026-08-10 05:30:43', '2026-08-10 05:30:43'),
('6b94cb42-c93a-4a77-82d6-ed170c67bbaa', 'c1b3f66b-11d0-4bab-8a76-7b4fb989b6ee', '/uploads/products/imgs/h-street-etoile-sneakers-women-3.jpg', 2, '2026-08-09 02:20:08', '2026-08-09 02:20:08'),
('6f8d65a5-09ed-4ec3-99dc-619c5e4e1679', 'a486354c-8f21-11f1-9f48-bebb705820a1', '/assets/imgs/adidas-1.png', 2, '2026-08-09 02:11:42', '2026-08-09 02:11:42'),
('76c91855-42fe-48c8-adf9-4b09499cb988', 'c1b3f66b-11d0-4bab-8a76-7b4fb989b6ee', '/uploads/products/imgs/h-street-etoile-sneakers-women-2.jpg', 3, '2026-08-09 02:20:08', '2026-08-09 02:20:08'),
('88ba18d3-9c98-4c7a-88c7-276620a68a82', 'a4865295-8f21-11f1-9f48-bebb705820a1', '/assets/imgs/product-nike-2.png', 2, '2026-08-10 08:18:01', '2026-08-10 08:18:01'),
('99f2fc48-7413-4c82-90f7-f12ff9e5b14a', 'a4865295-8f21-11f1-9f48-bebb705820a1', '/assets/imgs/product-nike-1.png', 1, '2026-08-10 08:18:01', '2026-08-10 08:18:01'),
('a7429ed4-7cf5-44a5-82bf-d84a8c8e8acb', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', '/uploads/products/imgs/h-street-etoile-sneakers-women_turquoise-2.jpg', 3, '2026-08-10 05:30:43', '2026-08-10 05:30:43'),
('a9ef0e2c-0902-4096-8d56-46d7ce52e5ca', 'a48655e4-8f21-11f1-9f48-bebb705820a1', '/assets/imgs/product-puma-2.jpg', 2, '2026-08-10 08:18:59', '2026-08-10 08:18:59'),
('b4889e70-9261-11f1-abda-1657403de0e3', 'a4864ed9-8f21-11f1-9f48-bebb705820a1', '/assets/imgs/product-adidas-4.png', 1, '2026-08-07 13:12:56', '2026-08-07 13:12:56'),
('b488a866-9261-11f1-abda-1657403de0e3', 'a4864ed9-8f21-11f1-9f48-bebb705820a1', '/assets/imgs/product-adidas-3.png', 2, '2026-08-07 13:12:56', '2026-08-07 13:12:56'),
('b48df624-9261-11f1-abda-1657403de0e3', 'a486546e-8f21-11f1-9f48-bebb705820a1', '/assets/imgs/product-nike-4.png', 1, '2026-08-07 13:12:56', '2026-08-07 13:12:56'),
('b48dff1a-9261-11f1-abda-1657403de0e3', 'a486546e-8f21-11f1-9f48-bebb705820a1', '/assets/imgs/product-nike-3.jpg', 2, '2026-08-07 13:12:56', '2026-08-07 13:12:56'),
('b492af70-9261-11f1-abda-1657403de0e3', 'a4865878-8f21-11f1-9f48-bebb705820a1', '/assets/imgs/product-asics-1.jpg', 1, '2026-08-07 13:12:56', '2026-08-07 13:12:56'),
('b492b6be-9261-11f1-abda-1657403de0e3', 'a4865878-8f21-11f1-9f48-bebb705820a1', '/assets/imgs/product-asics-2.jpg', 2, '2026-08-07 13:12:56', '2026-08-07 13:12:56'),
('c37755f8-9144-4ffa-b328-02f491220e51', 'c1b3f66b-11d0-4bab-8a76-7b4fb989b6ee', '/uploads/products/imgs/h-street-etoile-sneakers-women.jpg', 4, '2026-08-09 02:20:08', '2026-08-09 02:20:08'),
('ded30a7d-0e52-471b-94b8-457b9673d4ee', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', '/uploads/products/imgs/h-street-etoile-sneakers-women_turquoise-1.jpg', 4, '2026-08-10 05:30:43', '2026-08-10 05:30:43');

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_variants`
--

INSERT INTO `product_variants` (`id`, `product_id`, `size`, `sku`, `stock`, `created_at`, `updated_at`) VALUES
('0f2bd440-f0cd-4a8d-8515-9cb4f9abb8aa', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', '37', 'HESW-TUR-37-847', 15, '2026-08-10 05:30:43', '2026-08-10 05:30:43'),
('0f31d462-f6e8-4401-9991-76433fb3e5ce', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', '38', 'HESW-TUR-38-236', 15, '2026-08-10 05:30:43', '2026-08-10 05:30:43'),
('1b343240-3d9c-4eae-bcf8-fc7237474258', 'c1b3f66b-11d0-4bab-8a76-7b4fb989b6ee', '42', 'HESW-PIN-42-770', 0, '2026-08-09 02:20:08', '2026-08-09 02:20:08'),
('1bf70721-e191-49d0-9a1e-307547ea6aef', 'a48655e4-8f21-11f1-9f48-bebb705820a1', '40', 'PXOP-FOR-40-505', 4, '2026-08-10 08:18:59', '2026-08-10 08:18:59'),
('2059185f-c575-4f6a-93d1-0a090739f64a', 'a486354c-8f21-11f1-9f48-bebb705820a1', '40', 'CRSP-CLO-40-437', 4, '2026-08-09 02:11:42', '2026-08-09 02:11:42'),
('209bee19-47a6-4605-a216-34812c159a3c', 'a4865295-8f21-11f1-9f48-bebb705820a1', '42', 'AM90-WHI-42-946', 0, '2026-08-10 08:18:02', '2026-08-10 08:18:02'),
('3e7979b2-5aaf-47e1-b661-57aa87bd3c9b', 'a48655e4-8f21-11f1-9f48-bebb705820a1', '43', 'PXOP-FOR-43-781', 2, '2026-08-10 08:18:59', '2026-08-10 08:18:59'),
('3f6fc11e-262e-40be-9448-09bf12b6534b', 'a486354c-8f21-11f1-9f48-bebb705820a1', '45', 'CRSP-CLO-45-744', 0, '2026-08-09 02:11:42', '2026-08-09 02:11:42'),
('4722bbc4-2ec3-4e60-8280-565eb2fb5952', 'a4865295-8f21-11f1-9f48-bebb705820a1', '38', 'AM90-WHI-38-354', 4, '2026-08-10 08:18:02', '2026-08-10 08:18:02'),
('4ade8863-93b6-4076-9e4b-5ce4f8e57c2a', 'a48655e4-8f21-11f1-9f48-bebb705820a1', '41', 'PXOP-FOR-41-565', 4, '2026-08-10 08:18:59', '2026-08-10 08:18:59'),
('4bf182fe-6e95-4d3a-b695-7e9bb0dd2fca', 'c1b3f66b-11d0-4bab-8a76-7b4fb989b6ee', '40', 'HESW-PIN-40-946', 25, '2026-08-09 02:20:08', '2026-08-09 02:20:08'),
('57df001c-1127-41ab-89b4-cbd3524fd8cc', 'c1b3f66b-11d0-4bab-8a76-7b4fb989b6ee', '38', 'HESW-PIN-38-395', 15, '2026-08-09 02:20:08', '2026-08-09 02:20:08'),
('5a133b6a-a29c-4acd-9add-e974e71321bb', 'c1b3f66b-11d0-4bab-8a76-7b4fb989b6ee', '37', 'HESW-PIN-37-963', 15, '2026-08-09 02:20:08', '2026-08-09 02:20:08'),
('5c7cc2c0-ce6e-4733-87b1-9e94824ccfef', 'a486354c-8f21-11f1-9f48-bebb705820a1', '43', 'CRSP-CLO-43-830', 4, '2026-08-09 02:11:42', '2026-08-09 02:11:42'),
('6891f89b-89fd-4368-8439-231786303f57', 'a4865295-8f21-11f1-9f48-bebb705820a1', '37', 'AM90-WHI-37-640', 3, '2026-08-10 08:18:02', '2026-08-10 08:18:02'),
('6e87c0d7-97e2-4972-9288-dcc8c4902a97', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', '39', 'HESW-TUR-39-214', 20, '2026-08-10 05:30:43', '2026-08-10 05:30:43'),
('745cc863-8d32-49dc-ba82-cdd1226a29c4', 'a4865295-8f21-11f1-9f48-bebb705820a1', '39', 'AM90-WHI-39-844', 4, '2026-08-10 08:18:02', '2026-08-10 08:18:02'),
('7c137a16-f240-4d48-8a54-c9e684c5fd0d', 'c1b3f66b-11d0-4bab-8a76-7b4fb989b6ee', '41', 'HESW-PIN-41-278', 18, '2026-08-09 02:20:08', '2026-08-09 02:20:08'),
('81e5d6b6-f38c-487e-8b3a-10e6b4db10ea', 'c1b3f66b-11d0-4bab-8a76-7b4fb989b6ee', '36', 'HESW-PIN-36-103', 15, '2026-08-09 02:20:08', '2026-08-09 02:20:08'),
('8b8a5735-9254-11f1-abda-1657403de0e3', 'a4864ed9-8f21-11f1-9f48-bebb705820a1', '40', 'HRD9-WHT-40', 2, '2026-08-07 11:38:44', '2026-08-07 11:38:44'),
('8b8a58b2-9254-11f1-abda-1657403de0e3', 'a4864ed9-8f21-11f1-9f48-bebb705820a1', '41', 'HRD9-WHT-41', 2, '2026-08-07 11:38:44', '2026-08-07 11:38:44'),
('8b8a5a32-9254-11f1-abda-1657403de0e3', 'a4864ed9-8f21-11f1-9f48-bebb705820a1', '42', 'HRD9-WHT-42', 3, '2026-08-07 11:38:44', '2026-08-07 11:38:44'),
('8b8a5cae-9254-11f1-abda-1657403de0e3', 'a4864ed9-8f21-11f1-9f48-bebb705820a1', '43', 'HRD9-WHT-43', 2, '2026-08-07 11:38:44', '2026-08-07 11:38:44'),
('8b8a5e62-9254-11f1-abda-1657403de0e3', 'a4864ed9-8f21-11f1-9f48-bebb705820a1', '44', 'HRD9-WHT-44', 2, '2026-08-07 11:38:44', '2026-08-07 11:38:44'),
('8b93c90c-9254-11f1-abda-1657403de0e3', 'a486546e-8f21-11f1-9f48-bebb705820a1', '39', 'MERC-VLT-39', 2, '2026-08-07 11:38:44', '2026-08-07 11:38:44'),
('8b93e80a-9254-11f1-abda-1657403de0e3', 'a486546e-8f21-11f1-9f48-bebb705820a1', '40', 'MERC-VLT-40', 3, '2026-08-07 11:38:44', '2026-08-07 11:38:44'),
('8b93ea7c-9254-11f1-abda-1657403de0e3', 'a486546e-8f21-11f1-9f48-bebb705820a1', '41', 'MERC-VLT-41', 3, '2026-08-07 11:38:44', '2026-08-07 11:38:44'),
('8b93ec49-9254-11f1-abda-1657403de0e3', 'a486546e-8f21-11f1-9f48-bebb705820a1', '42', 'MERC-VLT-42', 3, '2026-08-07 11:38:44', '2026-08-07 11:38:44'),
('8b93eddd-9254-11f1-abda-1657403de0e3', 'a486546e-8f21-11f1-9f48-bebb705820a1', '43', 'MERC-VLT-43', 2, '2026-08-07 11:38:44', '2026-08-07 11:38:44'),
('8b93ef71-9254-11f1-abda-1657403de0e3', 'a486546e-8f21-11f1-9f48-bebb705820a1', '44', 'MERC-VLT-44', 2, '2026-08-07 11:38:44', '2026-08-07 11:38:44'),
('8b93f1e4-9254-11f1-abda-1657403de0e3', 'a486546e-8f21-11f1-9f48-bebb705820a1', '45', 'MERC-VLT-45', 0, '2026-08-07 11:38:44', '2026-08-07 11:38:44'),
('8b9da4b3-9254-11f1-abda-1657403de0e3', 'a4865878-8f21-11f1-9f48-bebb705820a1', '39', 'GLDS-WMD-39', 2, '2026-08-07 11:38:44', '2026-08-07 11:38:44'),
('8b9db038-9254-11f1-abda-1657403de0e3', 'a4865878-8f21-11f1-9f48-bebb705820a1', '40', 'GLDS-WMD-40', 3, '2026-08-07 11:38:44', '2026-08-07 11:38:44'),
('8b9db36e-9254-11f1-abda-1657403de0e3', 'a4865878-8f21-11f1-9f48-bebb705820a1', '41', 'GLDS-WMD-41', 4, '2026-08-07 11:38:44', '2026-08-07 11:38:44'),
('8b9db539-9254-11f1-abda-1657403de0e3', 'a4865878-8f21-11f1-9f48-bebb705820a1', '42', 'GLDS-WMD-42', 4, '2026-08-07 11:38:44', '2026-08-07 11:38:44'),
('8b9db6d4-9254-11f1-abda-1657403de0e3', 'a4865878-8f21-11f1-9f48-bebb705820a1', '43', 'GLDS-WMD-43', 3, '2026-08-07 11:38:44', '2026-08-07 11:38:44'),
('8b9db858-9254-11f1-abda-1657403de0e3', 'a4865878-8f21-11f1-9f48-bebb705820a1', '44', 'GLDS-WMD-44', 2, '2026-08-07 11:38:44', '2026-08-07 11:38:44'),
('8b9db9cf-9254-11f1-abda-1657403de0e3', 'a4865878-8f21-11f1-9f48-bebb705820a1', '45', 'GLDS-WMD-45', 0, '2026-08-07 11:38:44', '2026-08-07 11:38:44'),
('8c8d6354-f93c-4afb-85a1-c795af1d6f8d', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', '41', 'HESW-TUR-41-964', 18, '2026-08-10 05:30:43', '2026-08-10 05:30:43'),
('8feef27b-1f30-4e40-b441-bbdde1a72e97', 'a48655e4-8f21-11f1-9f48-bebb705820a1', '38', 'PXOP-FOR-38-602', 2, '2026-08-10 08:18:59', '2026-08-10 08:18:59'),
('93751e47-88cf-4ad6-8bd9-a9565f67ea5a', 'a486354c-8f21-11f1-9f48-bebb705820a1', '44', 'CRSP-CLO-44-427', 3, '2026-08-09 02:11:42', '2026-08-09 02:11:42'),
('9fa1f798-9e01-4bd9-962f-0827a8743700', 'c1b3f66b-11d0-4bab-8a76-7b4fb989b6ee', '39', 'HESW-PIN-39-520', 20, '2026-08-09 02:20:08', '2026-08-09 02:20:08'),
('a771b2c1-d2a6-426a-8ea5-3e5772805964', 'a4865295-8f21-11f1-9f48-bebb705820a1', '41', 'AM90-WHI-41-720', 3, '2026-08-10 08:18:02', '2026-08-10 08:18:02'),
('b248a156-4a1e-4c6b-b5a7-0826f240ee0b', 'a4865295-8f21-11f1-9f48-bebb705820a1', '36', 'AM90-WHI-36-863', 2, '2026-08-10 08:18:02', '2026-08-10 08:18:02'),
('bdaf158a-e2c9-4dc0-865e-9b57ff01f613', 'a48655e4-8f21-11f1-9f48-bebb705820a1', '44', 'PXOP-FOR-44-619', 0, '2026-08-10 08:18:59', '2026-08-10 08:18:59'),
('bf313bf4-f44c-4c91-bb72-7cfaa8b0718f', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', '40', 'HESW-TUR-40-342', 25, '2026-08-10 05:30:43', '2026-08-10 05:30:43'),
('c291ad00-adcb-4627-84da-b7623f9285d0', 'a486354c-8f21-11f1-9f48-bebb705820a1', '39', 'CRSP-CLO-39-891', 2, '2026-08-09 02:11:42', '2026-08-09 02:11:42'),
('c7dc8330-c6b1-496c-92bb-3d935e073a19', 'a486354c-8f21-11f1-9f48-bebb705820a1', '41', 'CRSP-CLO-41-637', 5, '2026-08-09 02:11:42', '2026-08-09 02:11:42'),
('caf756ec-424a-487f-bcc3-58fab548da6d', 'a486354c-8f21-11f1-9f48-bebb705820a1', '46', 'CRSP-CLO-46-976', 0, '2026-08-09 02:11:42', '2026-08-09 02:11:42'),
('e3a13f33-852a-4f04-95b4-a509e105309d', 'a48655e4-8f21-11f1-9f48-bebb705820a1', '39', 'PXOP-FOR-39-280', 3, '2026-08-10 08:18:59', '2026-08-10 08:18:59'),
('e84e8046-d1ac-4078-bce1-36ed8e6ae90f', 'a4865295-8f21-11f1-9f48-bebb705820a1', '40', 'AM90-WHI-40-192', 4, '2026-08-10 08:18:02', '2026-08-10 08:18:02'),
('f859992c-065b-4b97-9f9b-eba8cd14c555', 'a48655e4-8f21-11f1-9f48-bebb705820a1', '42', 'PXOP-FOR-42-664', 3, '2026-08-10 08:18:59', '2026-08-10 08:18:59'),
('fa647de0-8571-447a-bf99-22b9051c0215', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', '42', 'HESW-TUR-42-389', 9, '2026-08-10 05:30:43', '2026-08-11 13:38:49'),
('faa6d254-c59e-454a-b4c5-dd59c2d56bb6', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', '36', 'HESW-TUR-36-556', 15, '2026-08-10 05:30:43', '2026-08-10 05:30:43'),
('fe279cad-f2ee-4376-9db2-e90225302110', 'a486354c-8f21-11f1-9f48-bebb705820a1', '42', 'CRSP-CLO-42-114', 5, '2026-08-09 02:11:42', '2026-08-09 02:11:42');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int NOT NULL DEFAULT '5',
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `product_id`, `user_id`, `user_name`, `rating`, `comment`, `created_at`, `updated_at`) VALUES
('10f064a2-735a-478f-af35-eebc006ccdac', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', '8ae98f63-cf43-4802-8700-90189018f2be', 'Thành', 5, 'sản phẩm đẹp vừa vặn', '2026-08-10 07:55:02', '2026-08-10 07:55:02'),
('b5c0a95c-b8a1-488b-862b-c7758215fc86', '8e4cab35-4a52-4ada-a4d0-4d0996901d83', '8ae98f63-cf43-4802-8700-90189018f2be', 'Thành', 3, 'sản phẩm bth', '2026-08-10 08:03:00', '2026-08-10 08:03:00');

-- --------------------------------------------------------

--
-- Table structure for table `site_settings`
--

CREATE TABLE `site_settings` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` longtext COLLATE utf8mb4_unicode_ci,
  `group` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'general',
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `site_settings`
--

INSERT INTO `site_settings` (`id`, `key`, `value`, `group`, `description`, `updated_at`, `created_at`) VALUES
('001ac8e8-3ae8-4acf-8ea0-5cd94cd4a6bc', 'accentColor', '#003882', 'interface', NULL, '2026-08-10 09:55:05', '2026-08-09 17:12:20'),
('106b2746-c30d-4581-aa35-fb0cd195027a', 'primaryColor', '#000000', 'interface', NULL, '2026-08-10 09:55:05', '2026-08-09 17:12:20'),
('27db4aaf-150d-428d-a060-de5784e606fd', 'showNewArrivals', 'true', 'interface', NULL, '2026-08-10 09:55:05', '2026-08-09 17:12:20'),
('2ca56d59-1343-4328-a2a7-46ed77deb9ff', 'hiddenProductIds', '[]', 'interface', NULL, '2026-08-10 09:55:06', '2026-08-10 08:12:44'),
('2dce4772-2151-4ec4-93da-302cdf9c8d9f', 'logo', '/assets/logos/logo.svg', 'interface', NULL, '2026-08-10 09:55:05', '2026-08-09 17:12:19'),
('3193eb95-b7be-4f0f-9e79-b8fb324db974', 'hiddenNewsIds', '[]', 'interface', NULL, '2026-08-10 09:55:06', '2026-08-10 08:12:44'),
('5d0c7264-7419-48bd-b369-9cfdb7a614ba', 'themeMode', 'light', 'interface', NULL, '2026-08-10 08:12:44', '2026-08-09 17:12:20'),
('6963fbc3-a457-453d-8898-25dd369c5308', 'backgroundColor', '#ffffff', 'interface', NULL, '2026-08-10 09:55:05', '2026-08-10 08:54:18'),
('6f92101b-54bf-470e-a1c0-ae115fb52acf', 'showNews', 'true', 'interface', NULL, '2026-08-10 09:55:06', '2026-08-09 17:12:20'),
('95103c6d-5875-4ff0-81fb-d8755835c705', 'showBestSellers', 'true', 'interface', NULL, '2026-08-10 09:55:06', '2026-08-09 17:12:20'),
('a492acf6-8f21-11f1-9f48-bebb705820a1', 'site_logo', '/assets/logos/logo.svg', 'appearance', 'Logo chính của website VELOCITÀ', '2026-08-03 09:56:48', '2026-08-03 09:56:48'),
('a492d176-8f21-11f1-9f48-bebb705820a1', 'site_name', 'VELOCITÀ - Cửa Hàng Thể Thao Hàng Đầu', 'general', 'Tên thương hiệu website', '2026-08-03 09:56:48', '2026-08-03 09:56:48'),
('a492d583-8f21-11f1-9f48-bebb705820a1', 'about_heading', 'Một điểm đến hàng đầu cho các thương hiệu thể thao', 'homepage', 'Tiêu đề khối Giới thiệu trang chủ', '2026-08-03 09:56:48', '2026-08-03 09:56:48'),
('a492dc25-8f21-11f1-9f48-bebb705820a1', 'about_desc', 'VELOCITÀ là cửa hàng chuyên cung cấp các sản phẩm từ những thương hiệu thể thao danh tiếng như Nike, Adidas, Puma và Asics...', 'homepage', 'Nội dung khối Giới thiệu trang chủ', '2026-08-03 09:56:48', '2026-08-03 09:56:48'),
('ca85df92-2e79-42ca-a673-50ae3e6048bb', 'showSaleProducts', 'true', 'interface', NULL, '2026-08-10 09:55:06', '2026-08-09 17:12:20');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('SUPERADMIN','ADMIN','EDITOR','USER') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `avatar` varchar(550) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `phone`, `password`, `role`, `avatar`, `address`, `status`, `created_at`, `updated_at`) VALUES
('2859d743-289b-493b-adb8-0553593de72b', 'Super Admin Velocità', 'superadmin@velocita.com', '0901111111', '$2b$10$CydBDcBuqkMtHxMBJmCi5O0NQIEBPW6s7ldk0/doZLHf1kGQvA6Le', 'SUPERADMIN', '/assets/imgs/user_default.jpg', NULL, 1, '2026-08-09 17:03:43', '2026-08-09 17:03:43'),
('71b32280-c74b-423b-9c7c-530963da69b0', 'Editor Velocità', 'editor@velocita.com', '0903333333', '$2b$10$CydBDcBuqkMtHxMBJmCi5O0NQIEBPW6s7ldk0/doZLHf1kGQvA6Le', 'EDITOR', '/assets/imgs/user_default.jpg', NULL, 1, '2026-08-09 17:03:44', '2026-08-09 17:03:44'),
('8ae98f63-cf43-4802-8700-90189018f2be', 'Thành', 'phuocthanh03062004@gmail.com', '89879875676', '$2b$10$eIoLTxsH8Fjmh5EGbzrVRuW9pj4dyr0n3bXbNcx5jizFDGGKlVsyG', 'USER', NULL, 'fewf243', 1, '2026-08-07 17:24:48', '2026-08-10 08:31:13'),
('dc1d8988-1597-405b-8883-3fd384404a75', 'Admin Velocità', 'admin@velocita.com', '0902222222', '$2b$10$CydBDcBuqkMtHxMBJmCi5O0NQIEBPW6s7ldk0/doZLHf1kGQvA6Le', 'ADMIN', '/assets/imgs/user_default.jpg', '3dsfsdf', 1, '2026-08-09 17:03:44', '2026-08-10 08:28:49');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('1b940cd1-02d6-44fe-97bb-e177e76365c7', 'd8974cc7c5e93fc5e0579b6297514a0a16feccde0ab23f65db9144d4b094d8ce', '2026-08-08 16:59:57.858', '20260808165957_update_products_products_variants', NULL, NULL, '2026-08-08 16:59:57.221', 1),
('34d718f1-fea5-457b-af16-f180400a6e93', 'ec87e9c56a8f8bd529120b52e31a1e031cd45623131c11626dc12ea6bc23545c', '2026-08-08 16:57:57.558', '20260803071525_update_banner', NULL, NULL, '2026-08-08 16:57:57.397', 1),
('35f8003c-049e-4838-b88f-b61f14139109', 'f3eedecf49f1363587715aa53d9d1d3f29f3b0e290be24a1a58421e0c023d587', '2026-08-08 16:58:02.587', '20260806181257_add_sepay_payment_fields', NULL, NULL, '2026-08-08 16:58:02.400', 1),
('51fe69f4-ad38-4509-8cb2-e8eca3ac6499', '4ccd715c5635aafd16a35184771699e58c5ab3d7bf25a34664c95df06ef37715', '2026-08-08 16:58:01.232', '20260803094736_update_id_varchar', NULL, NULL, '2026-08-08 16:57:57.567', 1),
('595dee26-bde1-4d2b-9205-19f67eabb882', 'e4d5c879106d0937407358da29850e2a78962a8531c10ed6f28a7bc13b08629d', '2026-08-08 16:58:02.388', '20260806174016_update_cart_order_variant_schema', NULL, NULL, '2026-08-08 16:58:01.863', 1),
('805b23a1-323b-4877-b8bd-cc22656dc315', '7c520ae76cc466fcfde39a3e543cc07c81f13b3e680bbf8fae81a3d7c46995e1', '2026-08-08 16:58:01.856', '20260806111640_update_news_category_enum', NULL, NULL, '2026-08-08 16:58:01.693', 1),
('97327fe8-ecd9-499b-aea8-a8f24a6c6add', 'a0c6be3dc713de18a65352822c07d5aa824152491f62e33cf4352b52f94e1f0f', '2026-08-08 16:57:57.385', '20260803070528_init_db', NULL, NULL, '2026-08-08 16:57:54.801', 1),
('e65b132a-4716-43ce-a66b-b173cc1a5df7', '3bf19af3dcb9aed14580283b61540c684e40d1204b0129a176e68e8e166a2b10', '2026-08-08 16:58:01.684', '20260805154027_add_favorites', NULL, NULL, '2026-08-08 16:58:01.240', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`),
  ADD KEY `banners_status_idx` (`status`),
  ADD KEY `banners_media_type_idx` (`media_type`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `carts_user_id_key` (`user_id`),
  ADD UNIQUE KEY `carts_session_key_key` (`session_key`),
  ADD KEY `carts_user_id_idx` (`user_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cart_items_cart_id_product_id_variant_id_key` (`cart_id`,`product_id`,`variant_id`),
  ADD KEY `cart_items_cart_id_idx` (`cart_id`),
  ADD KEY `cart_items_product_id_idx` (`product_id`),
  ADD KEY `cart_items_variant_id_fkey` (`variant_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_key` (`slug`),
  ADD KEY `categories_slug_idx` (`slug`),
  ADD KEY `categories_status_idx` (`status`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `favorites_user_id_product_id_key` (`user_id`,`product_id`),
  ADD KEY `favorites_user_id_idx` (`user_id`),
  ADD KEY `favorites_product_id_idx` (`product_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `news_slug_key` (`slug`),
  ADD KEY `news_slug_idx` (`slug`),
  ADD KEY `news_status_idx` (`status`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_code_key` (`code`),
  ADD KEY `orders_code_idx` (`code`),
  ADD KEY `orders_user_id_idx` (`user_id`),
  ADD KEY `orders_status_idx` (`status`),
  ADD KEY `orders_payment_status_idx` (`payment_status`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_idx` (`order_id`),
  ADD KEY `order_items_product_id_idx` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_slug_key` (`slug`),
  ADD KEY `products_category_id_idx` (`category_id`),
  ADD KEY `products_slug_idx` (`slug`),
  ADD KEY `products_status_idx` (`status`),
  ADD KEY `products_style_code_idx` (`style_code`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_images_product_id_idx` (`product_id`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_variants_product_id_size_key` (`product_id`,`size`),
  ADD UNIQUE KEY `product_variants_sku_key` (`sku`),
  ADD KEY `product_variants_product_id_idx` (`product_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_product_id_idx` (`product_id`),
  ADD KEY `reviews_user_id_idx` (`user_id`);

--
-- Indexes for table `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `site_settings_key_key` (`key`),
  ADD KEY `site_settings_key_idx` (`key`),
  ADD KEY `site_settings_group_idx` (`group`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`),
  ADD UNIQUE KEY `users_phone_key` (`phone`),
  ADD KEY `users_email_idx` (`email`),
  ADD KEY `users_role_idx` (`role`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_items_variant_id_fkey` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favorites_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
