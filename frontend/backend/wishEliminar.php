<?php
header("Content-Type: application/json");
include("config/conexion.php");

// Recibir JSON
$datos = json_decode(file_get_contents("php://input"), true);

$id_usuario = $datos["id_usuario"];
$id_producto = $datos["id_producto"];

// Eliminar
$sql = "DELETE FROM wishlist WHERE id_usuario = ? AND id_producto = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $id_usuario, $id_producto);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode([
            "status" => "success",
            "msg" => "Producto eliminado de wishlist"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "msg" => "No existe en la wishlist"
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "msg" => "Error al eliminar"
    ]);
}
?>
