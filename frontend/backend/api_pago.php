<?php
    include ("config/conexion.php");

    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
	
	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(["ok" => true]);
    exit;
}

    if($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(400);
        echo json_encode(["error" => "Método no permitido"]);
        exit;
    }

    $data = json_decode(file_get_contents("php://input"), true);

    if (
        empty($data['id_pedido']) ||
        empty($data['id_usuario']) ||
        empty($data['carrito']) ||
        empty($data['pago'])
    ){
        http_response_code(400);
        echo json_encode(["error" => "información incompleta"]);
        exit;
    }

    $id_pedido = intval($data['id_pedido']);
    $id_usuario = intval($data['id_usuario']);
    $carrito = $data['carrito'];
    $pago = $data['pago'];

    // calculo descuento
    $descuento = 1;
    $sql_descuento = "SELECT primer_comprar FROM usuario WHERE id_usuario = $id_usuario";
    $usuario_descuento = $conexion->query($sql_descuento);

    if ($usuario_descuento && $usuario_descuento->num_rows > 0 ) {
        $fila = $usuario_descuento->fetch_assoc();
        if($fila['primer_compra']) {
            $descuento = 0.8;
        }
    }

    /*
        el carrito envia esta información
        id_producto
        precio_unitario
        cantidad
        subtotal
    */

    $total = 0;
    foreach ($carrito as $c) {
        $total += $c['subtotal'];
    }

    // detalle_pedido

    foreach($carrito as $c) {
        $sqlDetalle = "INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario, descuento, subtotal) VALUES ($id_pedido, {$c['id_producto']},{$c['cantidad']}, {$c['precio_unitario']}, $descuento, {$c['subtotal']})";
        $detalle_pedido = $conexion->query($sqlDetalle);
    }


    if(!$detalle_pedido) {
        http_response_code(400);
        echo json_encode(["error" => "escritura en detalle_pedido " . $conexion->error]);
        exit;
    }

    // pago
    $total_pago =  $total * $descuento;
    $sql_pago = "INSERT INTO pago 
        (id_pedido, nombre_tarjeta, numero_tarjeta, fecha_expiracion, cvv, estado_pago, total)
        VALUES 
        (
            $id_pedido,
            '{$pago['nombre_tarjeta']}',
            '{$pago['numero_tarjeta']}',
            '{$pago['fecha_expiracion']}',
            '{$pago['cvv']}',
            'activo',
            $total_pago  
        )"; // para estado_pago activo, inactivo

    $proceso_pago = $conexion->query($sql_pago);
    $id_pago = $conexion->insert_id;

    if(!$proceso_pago) {
        http_response_code(400);
        echo json_encode(["error" => "error al realizar el pago " . $conexion->error]);
        exit;
    }

    /* actualizacin pago */
    $sql_updateUsuario = "UPDATE usuario SET primer_compra = false WHERE id_usuario = $id_usuario";
    $updateUsuario = $conexion->query($sql_updateUsuario);

    

    if(!$updateUsuario) {
        http_response_code(400);
        echo json_encode(["error" => "error al actualizar el estado del usuario" . $conexion->error]);
        exit;
    }

    echo json_encode(
        [
            "mensaje" => "pago realizado correctamente",
            "id_pedido" => $id_pedido,
            "id_pago" => $id_pago
        ]
    );
    exit;
?>