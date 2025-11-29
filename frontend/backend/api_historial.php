<?php
include("config/conexion.php");

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    echo json_encode(["ok" => true]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
    exit;
}

if (!isset($_GET["id_usuario"])) {
    http_response_code(400);
    echo json_encode(["error" => "Falta id_usuario"]);
    exit;
}

$id_usuario = intval($_GET["id_usuario"]);

$sql = "
SELECT 
    dp.id_dpedido,
    dp.id_pedido,
    dp.id_producto,
    p.nombre AS nombre_producto,
    p.imagen,
    dp.cantidad,
    dp.precio_unitario,
    dp.descuento,
    dp.subtotal,
    pg.total AS total_pago,
    pg.estado_pago,
    pg.fecha_expiracion,
    pg.nombre_tarjeta
FROM detalle_pedido dp
INNER JOIN pago pg ON dp.id_pedido = pg.id_pedido
INNER JOIN productos p ON dp.id_producto = p.id_producto
WHERE pg.id_pedido IN (
    SELECT DISTINCT id_pedido
    FROM pago
)
";

$result = $conexion->query($sql);

$historial = [];

while ($row = $result->fetch_assoc()) {
    $id_pedido = $row["id_pedido"];

    if (!isset($historial[$id_pedido])) {
        $historial[$id_pedido] = [
            "id_pedido" => $id_pedido,
            "total_pago" => $row["total_pago"],
            "estado_pago" => $row["estado_pago"],
            "items" => []
        ];
    }

    $historial[$id_pedido]["items"][] = [
        "id_producto" => $row["id_producto"],
        "nombre_producto" => $row["nombre_producto"],
        "imagen" => $row["imagen"],
        "cantidad" => $row["cantidad"],
        "precio_unitario" => $row["precio_unitario"],
        "descuento" => $row["descuento"],
        "subtotal" => $row["subtotal"]
    ];
}

echo json_encode(array_values($historial));
exit;
?>
