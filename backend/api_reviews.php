<?php
include("config/conexion.php");

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "GET") {
    if (!isset($_GET["id_producto"])) {
        echo json_encode(["error" => "id_producto no recibido"]);
        exit;
    }

    $id_producto = intval($_GET["id_producto"]);

    $sql = "SELECT r.*, u.nombre 
            FROM review r
            INNER JOIN usuario u ON u.id_usuario = r.id_usuario
            WHERE r.id_producto = $id_producto
            ORDER BY r.fecha DESC";

    $resultado = $conexion->query($sql);

    $reviews = [];
    while ($row = $resultado->fetch_assoc()) {
        $reviews[] = $row;
    }

    echo json_encode($reviews);
    exit;
}

if ($method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (
        empty($data["id_producto"]) ||
        empty($data["id_usuario"]) ||
        empty($data["calificacion"]) ||
        empty($data["comentario"])
    ) {
        http_response_code(400);
        echo json_encode(["error" => "Datos incompletos"]);
        exit;
    }

    $id_producto = intval($data["id_producto"]);
    $id_usuario = intval($data["id_usuario"]);
    $calificacion = intval($data["calificacion"]);
    $comentario = $conexion->real_escape_string($data["comentario"]);

    $sql = "INSERT INTO review (id_producto, id_usuario, calificacion, comentario)
            VALUES ($id_producto, $id_usuario, $calificacion, '$comentario')";

    if ($conexion->query($sql)) {
        echo json_encode(["success" => true, "mensaje" => "Reseña guardada"]);
    } else {
        echo json_encode(["error" => "Error al guardar reseña"]);
    }
    exit;
}

echo json_encode(["error" => "Método no permitido"]);
