-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 09-01-2026 a las 04:23:48
-- Versión del servidor: 8.4.7
-- Versión de PHP: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `liquidevs`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_orden`
--

DROP TABLE IF EXISTS `detalles_orden`;
CREATE TABLE IF NOT EXISTS `detalles_orden` (
  `id_detalle` int NOT NULL AUTO_INCREMENT,
  `id_producto` int NOT NULL,
  `id_pedido` int NOT NULL,
  `precio_unitario` double(10,2) NOT NULL,
  `cantidad` int NOT NULL,
  `Subtotal` double(10,2) NOT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `id_producto` (`id_producto`),
  KEY `id_pedido` (`id_pedido`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `detalles_orden`
--

INSERT INTO `detalles_orden` (`id_detalle`, `id_producto`, `id_pedido`, `precio_unitario`, `cantidad`, `Subtotal`) VALUES
(1, 1, 32, 326512.00, 12, 24121521.00),
(2, 6, 35, 2132132.00, 21, 214556.00),
(23, 1, 32, 19000.00, 1, 19000.00),
(24, 2, 32, 8000.00, 1, 8000.00),
(25, 3, 33, 12000.00, 2, 24000.00),
(26, 4, 34, 17000.00, 2, 34000.00),
(27, 5, 35, 18000.00, 1, 18000.00),
(28, 6, 36, 15000.00, 2, 30000.00),
(29, 7, 37, 14000.00, 1, 14000.00),
(30, 8, 38, 21000.00, 1, 21000.00),
(31, 9, 39, 17000.00, 2, 34000.00),
(32, 10, 40, 16000.00, 1, 16000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

DROP TABLE IF EXISTS `pedido`;
CREATE TABLE IF NOT EXISTS `pedido` (
  `id_pedido` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `descuentos` double(10,2) NOT NULL,
  `subtotal` double(10,2) NOT NULL,
  `valor_total` double(10,2) NOT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id_pedido`, `id_usuario`, `descuentos`, `subtotal`, `valor_total`) VALUES
(32, 13, 0.00, 3000.00, 3000.00),
(33, 15, 0.00, 7000.00, 7000.00),
(34, 13, 0.00, 3000.00, 3000.00),
(35, 15, 0.00, 7000.00, 7000.00),
(36, 19, 2000.00, 10000.00, 8000.00),
(37, 13, 900.00, 3900.00, 3000.00),
(38, 11, 0.00, 27000.00, 27000.00),
(39, 12, 3000.00, 20000.00, 17000.00),
(40, 13, 0.00, 36000.00, 36000.00),
(41, 14, 5000.00, 23000.00, 18000.00),
(42, 15, 0.00, 19000.00, 19000.00),
(43, 16, 2000.00, 22000.00, 20000.00),
(44, 17, 0.00, 15000.00, 15000.00),
(45, 18, 0.00, 40000.00, 40000.00),
(46, 19, 5000.00, 25000.00, 20000.00),
(47, 20, 0.00, 18000.00, 18000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

DROP TABLE IF EXISTS `producto`;
CREATE TABLE IF NOT EXISTS `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `categoria` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagen_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `estado` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nombre`, `descripcion`, `precio`, `stock`, `categoria`, `imagen_url`, `fecha_creacion`, `estado`) VALUES
(1, 'Copa de Helado Fresa', 'Copa refrescante con fresa natural', 19000.00, 15, 'Copa', '../Assets/Helados/copa_copa_de_helado_fresa.png', '2026-01-08 14:39:17', 1),
(2, 'Helado Chocolate Cono', 'Chocolate cremoso en cono crujiente', 8000.00, 30, 'Helado', '../Assets/Helados/cono_de_crema_choc_vain.png', '2026-01-08 14:39:17', 1),
(3, 'Helado Limón', 'Refrescante sabor cítrico', 12000.00, 20, 'Helado', '../Assets/Helados/helado_de_limon.png', '2026-01-08 14:39:17', 1),
(4, 'Waffle con Helado', 'Waffle tibio con helado y toppings', 17000.00, 10, 'Waffle', '../Assets/Helados/waffle_y_helado.png', '2026-01-08 14:39:17', 1),
(5, 'Sundae de Chocolate', 'Sundae con salsa de chocolate', 18000.00, 12, 'Copa', '../Assets/Helados/sundae_chocolate.png', '2026-01-08 14:39:17', 1),
(6, 'Helado Fresa Artesanal', 'Helado artesanal de fresa', 15000.00, 18, 'Helado', '../Assets/Helados/helado_fresa_artesanal.png', '2026-01-08 14:39:17', 1),
(7, 'Copa Vainilla', 'Helado suave de vainilla', 14000.00, 10, 'Copa', '../Assets/Helados/copa_vainilla.png', '2026-01-08 14:39:17', 1),
(8, 'Knickerbocker', 'Chocolate, fresas y galletas', 21000.00, 8, 'Helado', '../Assets/Helados/helado_knickerbocker.png', '2026-01-08 14:39:17', 1),
(9, 'Sundae Fresa', 'Helado con salsa de fresa', 17000.00, 12, 'Copa', '../Assets/Helados/sundae_fresa.png', '2026-01-08 14:39:17', 1),
(10, 'Helado Chocolate Cremoso', 'Chocolate intenso y cremoso', 16000.00, 15, 'Helado', '../Assets/Helados/helado_chocolate_cremoso.png', '2026-01-08 14:39:17', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `fecha_registro` datetime DEFAULT CURRENT_TIMESTAMP,
  `estado` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `email`, `telefono`, `password_hash`, `direccion`, `fecha_nacimiento`, `fecha_registro`, `estado`) VALUES
(11, 'Laura', 'Martínez', 'laura.martinez@mail.com', '3004567891', '$2y$10$KIX0zK3HkP1u1GZxw5M9Me8u1sKpR0R3yK7Bf4gZ0F9D1FhZx5pUe', 'Calle 45 #12-34', '1996-04-12', '2026-01-08 14:45:08', 1),
(12, 'Andrés', 'Gómez', 'andres.gomez@mail.com', '3015678923', '$2y$10$e0NR7JYH3n6YFq7H0D/3eOqR9E5Y8mE4M0JZg9Lq1D5J1G2KzA0cC', 'Carrera 10 #45-67', '1993-09-20', '2026-01-08 14:45:08', 1),
(13, 'Camila', 'Rodríguez', 'camila.rodriguez@mail.com', '3126789456', '$2y$10$y0Q3hFQyX7mB2Y8hE8xHnO3rR9PZC3k1x5U1kA2F2X6pKJk3m5rQK', 'Avenida 68 #23-10', '1998-01-30', '2026-01-08 14:45:08', 1),
(14, 'Daniel', 'Torres', 'daniel.torres@mail.com', '3109876543', '$2y$10$N9qo8uLOickgx2ZMRZo5i.ejZ8f5S3KpGZ9nU1V1l5nKpG5Zk5Y5W', 'Calle 80 #19-88', '1991-07-18', '2026-01-08 14:45:08', 1),
(15, 'Valentina', 'Ruiz', 'valentina.ruiz@mail.com', '3204561239', '$2y$10$8tP7sJQ2nF8dM1QFz8C0ROb6ZxN8kZ7g0z5FZ0Xk7y9M5M0K0N4e6', 'Carrera 22 #90-11', '2000-11-05', '2026-01-08 14:45:08', 1),
(16, 'Sebastián', 'Hernández', 'sebastian.hernandez@mail.com', '3101234567', '$2y$10$XkT5Y7Vt9lK3Q7sF0H4aJ.QP7bR1kF6H3L5tW2aC9V3Y6bP0Z8n7y', 'Calle 14 #7-90', '1992-06-15', '2026-01-08 14:45:08', 1),
(17, 'Isabella', 'Pérez', 'isabella.perez@mail.com', '3119876543', '$2y$10$M5n9B7Lk1V3H0F4Q7J2xK4QZ8E9R1tF6G5P0K3Y8T1D2W6L9R0sXy', 'Carrera 30 #12-34', '1995-12-02', '2026-01-08 14:45:08', 1),
(18, 'Miguel', 'Santos', 'miguel.santos@mail.com', '3123456789', '$2y$10$A8G1H3J6K2P9R4F0L5S3M7E1V9B8Q0X6W2T3Y5Z8N4C1L7R9K5eG', 'Avenida 55 #23-67', '1989-03-22', '2026-01-08 14:45:08', 1),
(19, 'Natalia', 'Vargas', 'natalia.vargas@mail.com', '3198765432', '$2y$10$P4R2T6H9L3M8Q0F1G7V5C9N6B2K3J8X1Z7Y5E0F4D1L9S2Q7R0kW', 'Calle 78 #45-67', '1997-09-10', '2026-01-08 14:45:08', 1),
(20, 'Ricardo', 'Morales', 'ricardo.morales@mail.com', '3105678901', '$2y$10$H6F3K9L2M1P4Q7R5T0V8X2B3C6J9N4Y1Z3E0F7D2G5K8L1R9P6sQ', 'Carrera 12 #34-56', '1990-01-05', '2026-01-08 14:45:08', 1);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalles_orden`
--
ALTER TABLE `detalles_orden`
  ADD CONSTRAINT `id_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `id_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
