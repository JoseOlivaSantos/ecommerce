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

$datos = json_decode(file_get_contents("php://input"), true);

    if($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(400);
        echo json_encode(["error" => "Método no permitido"]);
        exit;
    }




if (!isset($datos["id_usuario"], $datos["total"])) {
    echo json_encode(["status" => "error", "msg" => "Faltan datos obligatorios"]);
    exit;
}

$id_usuario = $datos["id_usuario"];
$total = $datos["total"];
$estado = "activo";
$fecha = date("Y-m-d H:i:s");


$queryU = $conexion->prepare("SELECT id_usuario FROM usuario WHERE id_usuario = ?");
$queryU->bind_param("i", $id_usuario);
$queryU->execute();
$resU = $queryU->get_result();

if ($resU->num_rows == 0) {
    echo json_encode(["status" => "error", "msg" => "El usuario no existe"]);
    exit;
}


$sql = "INSERT INTO pedido (total, fecha_pedido, estado, id_usuario)
        VALUES (?, NOW(), ?, ?)";
$stmt = $conexion->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => "error", "msg" => $conexion->error]);
    exit;
}

$stmt->bind_param("dsi", $total, $estado, $id_usuario);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "msg" => "Pedido creado correctamente",
        "id_pedido" => $stmt->insert_id
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "msg" => "No se pudo crear el pedido",
        "mysql_error" => $stmt->error
    ]);
}
?>
