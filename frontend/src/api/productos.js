//import { API_URL } from "./config";

  export async function obtenerProductos() {
    const API_URL = process.env.REACT_APP_API_URL;
    const res = await fetch(`${API_URL}/api_productos.php`);
    const data = await res.json();
    return data;
  }