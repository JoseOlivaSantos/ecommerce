<?php
include("config/conexion.php");

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$method = $_SERVER['REQUEST_METHOD'];

$tabla = "producto";
$getId = "id_producto";
$nombreJson = "productos";

function actualizarJson($conexion) {
    global $tabla, $nombreJson;

    $sql = "SELECT * FROM $tabla";
    $resultado = $conexion->query($sql);
    $productos = array();

    if($resultado->num_rows > 0) {
        while($fila = $resultado->fetch_assoc()) {
            $productos[] = $fila;
        }
    }

    $json = json_encode($productos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    file_put_contents("$nombreJson.json", $json);
}

switch ($method) {

   
    case 'GET':
        if(isset($_GET[$getId])) {
            $id = intval($_GET[$getId]);
            $sql = "SELECT * FROM $tabla WHERE $getId = $id";
            $resultado = $conexion->query($sql);

            echo ($resultado->num_rows > 0)
                ? json_encode($resultado->fetch_assoc(), JSON_UNESCAPED_UNICODE)
                : json_encode(["error" => "Producto no encontrado"]);
        } else {
            $sql = "SELECT * FROM $tabla";
            $resultado = $conexion->query($sql);
            $productos = [];

            if($resultado->num_rows > 0) {
                while($fila = $resultado->fetch_assoc()) {
                    $productos[] = $fila;
                }
            }

            echo json_encode($productos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }
        break;

    
    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);

        if(!isset($data['nombre'],$data['descripcion'],$data['precio'],$data['stock'],$data['imagen'],$data['id_categoria'])){
            echo json_encode(["error"=>"Faltan campos requeridos"]);
            break;
        }

        $nombre = $conexion->real_escape_string($data['nombre']);
        $descripcion = $conexion->real_escape_string($data['descripcion']);
        $precio = intval($data['precio']);
        $stock = intval($data['stock']);
        $imagen = $conexion->real_escape_string($data['imagen']);
        $id_categoria = intval($data['id_categoria']);

        $sql = "INSERT INTO $tabla 
                (nombre,descripcion,precio,stock,imagen,id_categoria) 
                VALUES
                ('$nombre','$descripcion',$precio,$stock,'$imagen',$id_categoria)";

        if($conexion->query($sql)) {
            actualizarJson($conexion);
            echo json_encode(["mensaje" => "Registro agregado correctamente"]);
        } else {
            echo json_encode(["error" => $conexion->error]);
        }
        break;

    
    case "PUT":
        $data = json_decode(file_get_contents("php://input"), true);

        $id = isset($data[$getId]) ? intval($data[$getId])
             : (isset($_GET[$getId]) ? intval($_GET[$getId]) : 0);

        if($id <= 0) {
            echo json_encode(["error"=>"Id requerido para actualizar"]);
            break;
        }

        $actualizar = [];

        if(isset($data['nombre'])) $actualizar[] = "nombre = '".$conexion->real_escape_string($data['nombre'])."'";
        if(isset($data['descripcion'])) $actualizar[] = "descripcion = '".$conexion->real_escape_string($data['descripcion'])."'";
        if(isset($data['precio'])) $actualizar[] = "precio = ".intval($data['precio']);
        if(isset($data['stock'])) $actualizar[] = "stock = ".intval($data['stock']);
        if(isset($data['imagen'])) $actualizar[] = "imagen = '".$conexion->real_escape_string($data['imagen'])."'";
        if(isset($data['id_categoria'])) $actualizar[] = "id_categoria = ".intval($data['id_categoria']);

        if(empty($actualizar)) {
            echo json_encode(["error"=> "No se enviaron campos para actualizar"]);
            break;
        }

        $sql = "UPDATE $tabla SET ".implode(", ",$actualizar)." WHERE $getId = $id";

        if($conexion->query($sql)) {
            actualizarJson($conexion);
            echo json_encode(["mensaje"=>"Dato actualizado correctamente"]);
        } else {
            echo json_encode(["error"=>$conexion->error]);
        }
        break;

   
    case "DELETE":
        if(!isset($_GET[$getId])) {
            echo json_encode(["error"=>"Debe ingresar un id para eliminar"]);
            break;
        }

        $id = intval($_GET[$getId]);
        $sql = "DELETE FROM $tabla WHERE $getId = $id";

        if($conexion->query($sql)) {
            actualizarJson($conexion);
            echo json_encode(["mensaje"=>"Dato eliminado correctamente"]);
        } else {
            echo json_encode(["error"=>$conexion->error]);
        }
        break;

    default:
        echo json_encode(["error"=>"Método no permitido"]);
        break;
}
?>
