<?php
header("Content-Type: application/json");
include("config/conexion.php");

// Recibir JSON
$datos = json_decode(file_get_contents("php://input"), true);

$id_usuario = $datos["id_usuario"];
$id_producto = $datos["id_producto"];

// Insertar en wishlist
$sql = "INSERT INTO wishlist (id_usuario, id_producto) VALUES (?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $id_usuario, $id_producto);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "msg" => "Producto agregado a wishlist"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "msg" => "No se pudo agregar (puede que ya esté agregado)"
    ]);
}
?>
