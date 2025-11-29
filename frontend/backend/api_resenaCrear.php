<?php
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
include("conexion.php");

// Recibir JSON
$datos = json_decode(file_get_contents("php://input"), true);

$id_usuario = $datos["id_usuario"];
$id_producto = $datos["id_producto"];
$calificacion = $datos["calificacion"];
$comentario = $datos["comentario"];

// Validar calificación
if ($calificacion < 1 || $calificacion > 5) {
    echo json_encode([
        "status" => "error",
        "msg" => "La calificación debe ser entre 1 y 5"
    ]);
    exit;
}

// Insertar reseña
$sql = "INSERT INTO resena (id_usuario, id_producto, calificacion, comentario) 
        VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("iiis", $id_usuario, $id_producto, $calificacion, $comentario);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "msg" => "Reseña creada correctamente"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "msg" => "No se pudo crear la reseña"
    ]);
}
?>
