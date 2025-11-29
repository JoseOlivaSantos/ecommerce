<?php
session_start();
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

if (!$data || !isset($data["correo"]) || !isset($data["pass"])) {
    http_response_code(400);
    echo json_encode(["error" => "No se recibieron datos"]);
    exit;
}

$correo = trim($data["correo"]);
$pass   = trim((string)$data["pass"]);

$conexion->set_charset('utf8mb4');


$correoEsc = $conexion->real_escape_string($correo);

$sql = "SELECT * FROM usuario  WHERE correo = '$correoEsc'";

$resultado = $conexion->query($sql);

if (!$resultado) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión"]);
    exit;
}

if ($resultado->num_rows === 0) {
    http_response_code(401);
    echo json_encode(["error" => "Usuario no encontrado"]);
    exit;
}

$usuario = $resultado->fetch_assoc();

if (!isset($usuario["pass"]) || trim($usuario["pass"]) !== $pass) {
    http_response_code(401);
    echo json_encode(["error" => "Contraseña incorrecta"]);
    exit;
}

$_SESSION["usuario"] = [
    "id_usuario"   => $usuario["id_usuario"],
    "nombre"       => $usuario["nombre"],
    "correo"       => $usuario["correo"],
    "rol"          => $usuario["rol"],
];

echo json_encode([
    "success" => true,
    "mensaje" => "Login exitoso",
    "usuario" => $_SESSION["usuario"]
]);