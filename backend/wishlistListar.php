<?php
header("Content-Type: application/json");
include("config/conexion.php");

// Recibir JSON
$datos = json_decode(file_get_contents("php://input"), true);

$id_usuario = $datos["id_usuario"];

// Traer wishlist con datos del producto
$sql = "SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.imagen, w.fecha_agregado
        FROM wishlist w
        INNER JOIN producto p ON w.id_producto = p.id_producto
        WHERE w.id_usuario = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$result = $stmt->get_result();

$wishlist = [];

while ($row = $result->fetch_assoc()) {
    $wishlist[] = $row;
}

echo json_encode([
    "status" => "success",
    "wishlist" => $wishlist
]);
?>
