<?php
include("config/conexion.php");

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(400);
    echo json_encode(["error" => "Método no permitido"]);
    exit;
}

if (empty($_GET['id_usuario'])) {
    http_response_code(400);
    echo json_encode(["error" => "Falta id_usuario"]);
    exit;
}

$id_usuario = intval($_GET['id_usuario']);

$sqlPedidos = "SELECT id_pedido, fecha_pedido, total, estado 
               FROM pedido 
               WHERE id_usuario = $id_usuario 
               ORDER BY fecha_pedido DESC";

$resultPedidos = $conexion->query($sqlPedidos);

if (!$resultPedidos) {
    http_response_code(400);
    echo json_encode(["error" => "Error al consultar pedidos: " . $conexion->error]);
    exit;
}

$historial = [];

while ($pedido = $resultPedidos->fetch_assoc()) {
    $id_pedido = $pedido['id_pedido'];

    // Traer detalle de cada pedido
    $sqlDetalle = "SELECT d.id_dpedido, d.id_producto, d.cantidad, d.precio_unitario, d.descuento, d.subtotal, p.nombre 
                   FROM detalle_pedido d
                   INNER JOIN producto p ON d.id_producto = p.id_producto
                   WHERE d.id_pedido = $id_pedido";

    $resultDetalle = $conexion->query($sqlDetalle);

    $detalles = [];
    if ($resultDetalle) {
        while ($fila = $resultDetalle->fetch_assoc()) {
            $detalles[] = $fila;
        }
    }

    $historial[] = [
        "id_pedido" => $pedido['id_pedido'],
        "fecha_pedido" => $pedido['fecha_pedido'],
        "total" => $pedido['total'],
        "estado" => $pedido['estado'],
        "detalles" => $detalles
    ];
}

echo json_encode($historial);
exit;
?>
