//import { API_URL } from "./config";

export async function obtenerProductosId(id_producto){
  const API_URL = process.env.REACT_APP_API_URL;
  const res = await fetch(`${API_URL}/api_productos.php?id_producto=${id_producto}`);
  const data = await res.json();
  return data;
}