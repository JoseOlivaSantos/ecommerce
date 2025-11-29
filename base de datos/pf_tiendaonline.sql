-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-11-2025 a las 05:37:03
-- Versión del servidor: 8.0.40
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pf_tiendaonline`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre`) VALUES
(1, 'Camisas de Hombre'),
(2, 'Pantalones de Hombre'),
(3, 'Chaquetas y Abrigos'),
(4, 'Camisetas de Mujer'),
(5, 'Vestidos'),
(6, 'Faldas'),
(7, 'Ropa Deportiva'),
(8, 'Accesorios'),
(9, 'Calzado'),
(10, 'Ropa Interior');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `id_dpedido` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `descuento` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `id_pedido` int NOT NULL,
  `id_producto` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `detalle_pedido`
--

INSERT INTO `detalle_pedido` (`id_dpedido`, `cantidad`, `precio_unitario`, `descuento`, `subtotal`, `id_pedido`, `id_producto`) VALUES
(1, 1, 249.99, 0.10, 224.99, 1, 1),
(2, 1, 459.99, 0.00, 459.99, 2, 5),
(3, 1, 499.00, 0.10, 449.10, 3, 9),
(4, 1, 399.50, 0.00, 399.50, 4, 2),
(5, 1, 299.00, 0.10, 269.10, 5, 6),
(6, 1, 199.99, 0.00, 199.99, 6, 7),
(7, 1, 899.00, 0.10, 809.10, 7, 3),
(8, 1, 179.50, 0.00, 179.50, 8, 8),
(9, 1, 249.00, 0.10, 224.10, 9, 10),
(10, 1, 129.00, 0.00, 129.00, 10, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `id_pago` int NOT NULL,
  `nombre_tarjeta` varchar(100) NOT NULL,
  `numero_tarjeta` varchar(100) NOT NULL,
  `fecha_expiracion` varchar(10) DEFAULT NULL,
  `cvv` varchar(4) NOT NULL,
  `estado_pago` enum('activo','inactivo') DEFAULT 'activo',
  `id_pedido` int NOT NULL,
  `id_usuario` int NOT NULL,
  `total` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `pago`
--

INSERT INTO `pago` (`id_pago`, `nombre_tarjeta`, `numero_tarjeta`, `fecha_expiracion`, `cvv`, `estado_pago`, `id_pedido`, `id_usuario`, `total`) VALUES
(1, 'Carlos Pérez', '4111111111111111', '2027-08-01', '123', 'activo', 1, 0, 249.99),
(2, 'María López', '4111111111111112', '2027-08-01', '124', 'activo', 2, 0, 459.99),
(3, 'Ana Gómez', '4111111111111113', '2027-08-01', '125', 'activo', 3, 0, 499.00),
(4, 'Jorge Ruiz', '4111111111111114', '2027-08-01', '126', 'activo', 4, 0, 399.50),
(5, 'Laura Martínez', '4111111111111115', '2027-08-01', '127', 'activo', 5, 0, 299.00),
(6, 'Pedro Santos', '4111111111111116', '2027-08-01', '128', 'activo', 6, 0, 199.99),
(7, 'Sofía Castro', '4111111111111117', '2027-08-01', '129', 'activo', 7, 0, 899.00),
(8, 'Luis Fernández', '4111111111111118', '2027-08-01', '130', 'activo', 8, 0, 179.50),
(9, 'Elena Ramírez', '4111111111111119', '2027-08-01', '131', 'activo', 9, 0, 249.00),
(10, 'Admin Tienda', '4111111111111120', '2027-08-01', '132', 'activo', 10, 0, 129.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `fecha_pedido` datetime NOT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `id_usuario` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id_pedido`, `total`, `fecha_pedido`, `estado`, `id_usuario`) VALUES
(1, 249.99, '2025-11-12 09:00:00', 'activo', 1),
(2, 459.99, '2025-11-12 09:15:00', 'activo', 2),
(3, 499.00, '2025-11-12 09:30:00', 'activo', 3),
(4, 399.50, '2025-11-12 09:45:00', 'activo', 4),
(5, 299.00, '2025-11-12 10:00:00', 'activo', 5),
(6, 199.99, '2025-11-12 10:15:00', 'activo', 6),
(7, 899.00, '2025-11-12 10:30:00', 'activo', 7),
(8, 179.50, '2025-11-12 10:45:00', 'activo', 8),
(9, 249.00, '2025-11-12 11:00:00', 'activo', 9),
(10, 129.00, '2025-11-12 11:15:00', 'activo', 10),
(11, 429.98, '2025-11-23 17:42:28', 'activo', 1),
(12, 429.98, '2025-11-23 18:05:50', 'activo', 1),
(13, 429.98, '2025-11-23 18:13:16', 'activo', 1),
(14, 6791.98, '2025-11-23 18:30:47', 'activo', 1),
(15, 6791.98, '2025-11-23 18:35:56', 'activo', 1),
(16, 6791.98, '2025-11-23 18:50:02', 'activo', 12),
(17, 6791.98, '2025-11-23 18:50:51', 'activo', 12),
(18, 6791.98, '2025-11-23 22:11:18', 'activo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `imagen` varchar(250) DEFAULT NULL,
  `id_categoria` int NOT NULL,
  `tipo_prenda` varchar(50) DEFAULT NULL,
  `estilo` varchar(50) DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `talla` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nombre`, `descripcion`, `precio`, `stock`, `imagen`, `id_categoria`, `tipo_prenda`, `estilo`, `color`, `talla`) VALUES
(1, 'Camisa Casual Azul', 'Camisa de algodón para hombre, corte regular fit', 249.99, 25, 'https://michelblanc.mx/cdn/shop/files/BOTONDOWNCIELO.jpg?v=1687993398&width=1445', 1, NULL, NULL, NULL, NULL),
(2, 'Pantalón Slim Negro', 'Pantalón de mezclilla stretch para hombre', 399.50, 30, 'https://amsagt.com/wp-content/uploads/2022/01/PBN01-BLK-M.jpg', 2, NULL, NULL, NULL, NULL),
(3, 'Chaqueta de Cuero', 'Chaqueta sintética negra con cierre metálico', 899.00, 15, 'https://cuerosvelezgt.vtexassets.com/arquivos/ids/359738/1031303-00-01-Chaqueta-de-cuero.jpg?v=638645528371000000', 3, NULL, NULL, NULL, NULL),
(4, 'Camiseta Blanca Mujer', 'Camiseta básica cuello redondo', 129.00, 40, 'https://chevignon.vtexassets.com/arquivos/ids/1560117/63_704F001_BLA110601_0.jpg?v=638611047802670000', 4, NULL, NULL, NULL, NULL),
(5, 'Vestido Floral', 'Vestido corto estampado con flores, tela ligera', 459.99, 20, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQiSVTjMvBeg2AZOq3n7y-pJAje8q-_XJzaw&s', 5, NULL, NULL, NULL, NULL),
(6, 'Falda de Mezclilla', 'Falda corta azul con botones frontales', 299.00, 25, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXnUOVwPHsDp-Ro0kekKCPTu0ve6_OnMObbw&s', 6, NULL, NULL, NULL, NULL),
(7, 'Leggings Deportivos', 'Leggings elásticos color negro', 199.99, 50, 'https://begood.store/6345-new_prod_xl/legging-superslim-sport-begood.jpg', 7, NULL, NULL, NULL, NULL),
(8, 'Cinturón de Cuero', 'Cinturón unisex con hebilla metálica', 179.50, 35, 'https://gt.kennethcolelatino.com/cdn/shop/files/RK4027SSBBROWN_NAVY_1.jpg?v=1756497009', 8, NULL, NULL, NULL, NULL),
(9, 'Tenis Blancos', 'Tenis deportivos unisex con suela de goma', 499.00, 40, 'https://www.tresreyes.com.mx/cdn/shop/files/A017238-01_682249e2-fcc8-46b3-8722-7729eacf655c.jpg?v=1706309798', 9, NULL, NULL, NULL, NULL),
(10, 'Boxers Hombre Pack 3', 'Boxers de algodón, colores surtidos', 249.00, 60, 'https://tommyguatemala.vtexassets.com/arquivos/ids/531159-800-auto?v=638832718872500000&width=800&height=auto&aspect=true', 10, NULL, NULL, NULL, NULL),
(11, 'Camisa Casual Azul', 'Camisa de manga corta perfecta para uso diario.', 149.99, 20, 'https://michelblanc.mx/cdn/shop/files/BOTONDOWNCIELO.jpg?v=1687993398&width=1445', 1, 'Camisa', 'Casual', 'Azul', 'M'),
(12, 'Pantalón Jeans Clásico', 'Jeans de mezclilla corte recto.', 199.50, 15, 'https://pantalonesdemezclilla.mx/cdn/shop/files/Jeans-de-pierna-recta-para-hombre-estilo-clasico.png?v=1705709803', 1, 'Pantalón', 'Casual', 'Azul', 'L'),
(13, 'Sudadera Negra Deportiva', 'Sudadera cómoda para gimnasio o uso casual.', 175.00, 25, 'https://www.trueclassictees.com/cdn/shop/files/4210_BLACK_3_7600db7d-95ed-4803-b86c-b38f516c06df.jpg?v=1749760247&width=1420', 2, 'Sudadera', 'Gimnasio', 'Negro', 'L'),
(14, 'Camisa Formal Blanca', 'Camisa elegante ideal para oficina.', 220.00, 10, 'https://www.devre.la/media/catalog/product/d/e/devre-camisa-vestir_44d000340-017_001.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=1350&width=900&canvas=900:1350', 3, 'Camisa', 'Formal', 'Blanco', 'M'),
(15, 'Pantalón de Vestir Slim Fit', 'Pantalón formal para ocasiones especiales.', 280.00, 12, 'https://calvinguatemala.vtexassets.com/arquivos/ids/251041/Pantalon-formal-slim-.jpg?v=638679055040900000', 3, 'Pantalón', 'Formal', 'Negro', 'L'),
(16, 'Playera Deportiva Roja', 'Playera ligera para entrenamiento.', 130.00, 30, 'https://resources.claroshop.com/medios-plazavip/t1/1719591629PSROUNDNECK142jpg', 2, 'Camiseta', 'Gimnasio', 'Rojo', 'S'),
(17, 'Short Casual Beige', 'Short cómodo para días calurosos.', 95.00, 18, 'https://www.piniparma.com/cdn/shop/files/beige-cotton-shorts-2.webp?v=1756993620&width=1000', 1, 'Pantalón Corto', 'Casual', 'Beige', 'M'),
(18, 'Sudadera Oversize Gris', 'Sudadera moderna estilo urbano.', 210.00, 20, 'https://martinvalen.com/34883-large_default/hoodie-oversize-gris-minimalista-con-estampado-en-las-mangas.jpg', 1, 'Sudadera', 'Casual', 'Gris', 'XL'),
(19, 'Camisa de Fiesta Bordada', 'Camisa elegante con detalles bordados.', 260.00, 8, 'https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202407/31/00105610100819____4__516x640.jpg', 3, 'Camisa', 'Fiesta', 'Negro', 'M'),
(20, 'Pantalón Jogger Negro', 'Jogger suave ideal para descanso y deporte.', 150.00, 22, 'https://prostarjeans.com/wp-content/uploads/2019/05/102750-Frente.jpg', 2, 'Pantalón', 'Gimnasio', 'Negro', 'L'),
(21, 'Camisa Casual Azul Hombre', 'Camisa manga larga ideal para uso diario.', 159.99, 20, 'https://sepiia.com/cdn/shop/files/sepiia-camisa-casual-hombre-azul-marino-regular-5.jpg?v=1740047208&width=1445', 1, 'Camisa', 'Casual', 'Azul', 'M'),
(22, 'Pantalón Jeans Azul Hombre', 'Jeans corte recto para uso casual.', 199.50, 18, 'https://static.zara.net/assets/public/2fc8/c10c/7d8e45048416/2c5b700212c8/04806450436-p/04806450436-p.jpg?ts=1740737962758&w=352', 2, 'Pantalón', 'Casual', 'Azul', 'L'),
(23, 'Chaqueta Negra Deportiva', 'Chaqueta ligera perfecta para clima frío.', 260.00, 12, 'https://images.asos-media.com/products/chaqueta-deportiva-negra-tiro-24-de-adidas-training/206262912-1-blackwhite?$n_640w$&wid=513&fit=constrain', 3, 'Chaqueta', 'Gimnasio', 'Negro', 'L'),
(24, 'Camiseta Básica Blanca Mujer', 'Camiseta cómoda y fresca.', 95.00, 30, 'https://chevignon.vtexassets.com/arquivos/ids/1560118/63_704F000_BLA110601_0.jpg?v=638611047805000000', 4, 'Camiseta', 'Casual', 'Blanco', 'S'),
(25, 'Vestido Rojo de Fiesta', 'Vestido elegante para ocasiones especiales.', 310.00, 8, 'https://www.boutiquefelicidad.com/wp-content/uploads/2022/05/vestido-AL8901-rojo.jpg', 5, 'Vestido', 'Fiesta', 'Rojo', 'M'),
(26, 'Falda Negra Plisada', 'Falda moderna estilo casual.', 140.00, 14, 'https://dyaboo.com/cdn/shop/files/Falda_Midi_Plisada_DF07066_negra_plisada_para_mujer_dyaboo_1024x1024.jpg?v=1726090489', 6, 'Falda', 'Casual', 'Negro', 'M'),
(27, 'Sudadera Deportiva Mujer', 'Sudadera cómoda para ejercicio.', 175.00, 25, 'https://media.falabella.com/falabellaCO/73260643_1/w=800,h=800,fit=pad', 7, 'Sudadera', 'Gimnasio', 'Gris', 'L'),
(28, 'Gorra Azul Unisex', 'Gorra deportiva de algodón.', 65.00, 40, 'https://pid-guatemala.com/wp-content/uploads/2025/01/Gorra-Azul-H64.jpg', 8, 'Accesorio', 'Casual', 'Azul', 'Única'),
(29, 'Tenis Deportivos Negros', 'Tenis cómodos ideales para correr.', 350.00, 22, 'https://cdn.shopify.com/s/files/1/1161/3498/files/NikeTenisDownshifter13RunningNegro_paraHombre_6.jpg?v=1721758944', 9, 'Calzado', 'Gimnasio', 'Negro', '42'),
(30, 'Boxer Algodón Hombre', 'Boxer cómodo de algodón premium.', 45.00, 50, 'https://leonisa.gt/cdn/shop/files/033360_700_1200X1500_1_380x.jpg?v=1755867492', 10, 'Ropa Interior', 'Casual', 'Gris', 'L');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `review`
--

CREATE TABLE `review` (
  `id_review` int NOT NULL,
  `id_producto` int NOT NULL,
  `id_usuario` int NOT NULL,
  `calificacion` int NOT NULL,
  `comentario` text NOT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `review`
--

INSERT INTO `review` (`id_review`, `id_producto`, `id_usuario`, `calificacion`, `comentario`, `fecha`) VALUES
(1, 1, 1, 4, 'Muy buena camisa', '2025-11-23 21:31:50'),
(2, 1, 1, 5, 'Muy buena calidad y talla perfecta.', '2025-01-10 00:00:00'),
(3, 1, 3, 4, 'La tela es fresca, aunque el color es un poco más claro.', '2025-01-12 00:00:00'),
(4, 1, 5, 5, 'Excelente camisa, mi esposo quedó feliz.', '2025-01-14 00:00:00'),
(5, 1, 7, 3, 'Bonita pero el envío tardó un poco.', '2025-01-16 00:00:00'),
(6, 1, 2, 5, 'Hermosa y elegante, ideal para oficina.', '2025-01-18 00:00:00'),
(7, 1, 10, 4, 'Buena compra, la volvería a pedir.', '2025-01-20 00:00:00'),
(8, 2, 4, 5, 'Queda perfecto, es elástico y cómodo.', '2025-01-05 00:00:00'),
(9, 2, 6, 4, 'Buena calidad, pero viene un poco ajustado.', '2025-01-07 00:00:00'),
(10, 2, 8, 5, 'Me encantó, muy buena tela.', '2025-01-08 00:00:00'),
(11, 2, 1, 3, 'La talla no me quedó bien.', '2025-01-10 00:00:00'),
(12, 2, 9, 4, 'Buen pantalón para el precio.', '2025-01-12 00:00:00'),
(13, 2, 3, 5, 'Se siente premium. Recomendado.', '2025-01-15 00:00:00'),
(14, 3, 2, 5, 'Chaqueta increíble, muy elegante.', '2025-01-03 00:00:00'),
(15, 3, 5, 4, 'Buena calidad, aunque un poco pesada.', '2025-01-04 00:00:00'),
(16, 3, 7, 5, 'Exacto lo que buscaba. Excelente.', '2025-01-06 00:00:00'),
(17, 3, 10, 5, 'Parece cuero real, muy buena.', '2025-01-08 00:00:00'),
(18, 3, 1, 3, 'No es muy cálida, pero se ve bien.', '2025-01-10 00:00:00'),
(19, 3, 8, 4, 'Buena compra, satisfecho.', '2025-01-11 00:00:00'),
(20, 4, 6, 4, 'Básica y cómoda. La tela es suave.', '2025-01-02 00:00:00'),
(21, 4, 9, 5, 'Perfecta para el día a día.', '2025-01-04 00:00:00'),
(22, 4, 3, 5, 'Me encantó, combina con todo.', '2025-01-05 00:00:00'),
(23, 4, 7, 4, 'Buen precio y buena calidad.', '2025-01-07 00:00:00'),
(24, 4, 1, 3, 'La talla es un poco grande.', '2025-01-09 00:00:00'),
(25, 4, 10, 5, 'Muy bonita y fresca.', '2025-01-10 00:00:00'),
(26, 5, 4, 5, 'Hermoso vestido, queda precioso.', '2025-01-01 00:00:00'),
(27, 5, 2, 4, 'El diseño es muy bonito.', '2025-01-03 00:00:00'),
(28, 5, 5, 5, 'Mi hija quedó encantada.', '2025-01-05 00:00:00'),
(29, 5, 8, 3, 'Bonito pero la tela es delgada.', '2025-01-07 00:00:00'),
(30, 5, 3, 5, 'Perfecto para una ocasión especial.', '2025-01-08 00:00:00'),
(31, 5, 9, 4, 'Buen ajuste y buen precio.', '2025-01-09 00:00:00'),
(32, 6, 7, 5, 'Muy cómoda y moderna.', '2025-01-02 00:00:00'),
(33, 6, 10, 4, 'Buena calidad, color bonito.', '2025-01-04 00:00:00'),
(34, 6, 1, 4, 'Le encantó a mi hermana.', '2025-01-05 00:00:00'),
(35, 6, 6, 3, 'La talla viene reducida.', '2025-01-06 00:00:00'),
(36, 6, 4, 5, 'Perfecta y a buen precio.', '2025-01-08 00:00:00'),
(37, 6, 2, 5, 'Excelente compra, la recomiendo.', '2025-01-10 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `correo` varchar(150) DEFAULT NULL,
  `pass` varchar(50) DEFAULT NULL,
  `telefono` varchar(25) DEFAULT NULL,
  `rol` varchar(20) DEFAULT 'USER',
  `primer_compra` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `correo`, `pass`, `telefono`, `rol`, `primer_compra`) VALUES
(1, 'Carlos', 'Pérez', 'carlos.perez@gmail.com', '12345', '555-1111', 'USER', 1),
(2, 'María', 'López', 'maria.lopez@gmail.com', 'abcde', '555-2222', 'USER', 1),
(3, 'Ana', 'Gómez', 'ana.gomez@gmail.com', 'clave123', '555-3333', 'USER', 1),
(4, 'Jorge', 'Ruiz', 'jorge.ruiz@gmail.com', 'jorge22', '555-4444', 'USER', 1),
(5, 'Laura', 'Martínez', 'laura.martinez@gmail.com', 'pass1', '555-5555', 'USER', 1),
(6, 'Pedro', 'Santos', 'pedro.santos@gmail.com', 'p1234', '555-6666', 'USER', 1),
(7, 'Sofía', 'Castro', 'sofia.castro@gmail.com', 'sofia01', '555-7777', 'USER', 1),
(8, 'Luis', 'Fernández', 'luis.fernandez@gmail.com', 'luispass', '555-8888', 'USER', 1),
(9, 'Elena', 'Ramírez', 'elena.ramirez@gmail.com', 'elena10', '555-9999', 'USER', 1),
(10, 'David', 'Tienda', 'david@tiendaropa.com', 'admin', '555-0000', 'USER', 1),
(11, 'joaquin', 'deed', 'jopa@gmail.com', '123', '323223', 'USER', 1),
(12, 'Pancho', 'Gutierrez', 'pang@gmail.com', '12', '32322332311', 'USER', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`id_dpedido`),
  ADD KEY `fk_detalle_pedido_pedido` (`id_pedido`),
  ADD KEY `fk_detalle_pedido_producto` (`id_producto`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`id_pago`),
  ADD KEY `fk_pago_pedido` (`id_pedido`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `fk_pedido_usuario` (`id_usuario`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `fk_producto_id_categoria` (`id_categoria`);

--
-- Indices de la tabla `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id_review`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  MODIFY `id_dpedido` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `id_pago` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `review`
--
ALTER TABLE `review`
  MODIFY `id_review` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `fk_detalle_pedido_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`),
  ADD CONSTRAINT `fk_detalle_pedido_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`);

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `fk_pago_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `fk_pedido_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_producto_id_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`);

--
-- Filtros para la tabla `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
