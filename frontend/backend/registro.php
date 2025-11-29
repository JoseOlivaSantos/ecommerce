<?php
include("config/conexion.php");

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(["ok" => true]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
    exit;
}

if (
    !$data ||
    empty($data["nombre"]) ||
    empty($data["apellido"]) ||
    empty($data["correo"]) ||
    empty($data["pass"])
) {
    http_response_code(400);
    echo json_encode(["error" => "Datos incompletos"]);
    exit;
}

$nombre   = trim($data["nombre"]);
$apellido = trim($data["apellido"]);
$correo   = trim($data["correo"]);
$pass     = trim((string)$data["pass"]);
$telefono = isset($data["telefono"]) ? trim($data["telefono"]) : "";

// Evitar duplicados de correo
$correoEsc = $conexion->real_escape_string($correo);
$sqlCheck  = "SELECT id_usuario FROM usuario WHERE correo = '$correoEsc'";
$result    = $conexion->query($sqlCheck);

if ($result->num_rows > 0) {
    http_response_code(400);
    echo json_encode(["error" => "El correo ya está registrado"]);
    exit;
}

// Insercción del nuevo usuario
$sql = "INSERT INTO usuario (nombre, apellido, correo, pass, telefono, rol, primer_compra)
        VALUES ('$nombre', '$apellido', '$correoEsc', '$pass', '$telefono', 'USER', 1)";

if ($conexion->query($sql)) {
    echo json_encode([
        "success" => true,
        "mensaje" => "Usuario registrado correctamente",
        "id_usuario" => $conexion->insert_id
    ]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error al registrar usuario"]);
}
?>
