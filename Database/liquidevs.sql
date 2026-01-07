-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 07-01-2026 a las 22:12:07
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
  `id_producto` int NOT NULL,
  `id_pedido` int NOT NULL,
  `cantidad` int NOT NULL,
  KEY `id_producto` (`id_producto`),
  KEY `id_pedido` (`id_pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalles_orden`
--
ALTER TABLE `detalles_orden`
  ADD CONSTRAINT `detalles_orden_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `id_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
