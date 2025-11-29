// import { API_URL_CARRITO } from "./config";

export async function enviarPedido(datos) {
    const API_URL = process.env.REACT_APP_API_URL;
    try {
        const res = await fetch(`${API_URL}/api_pago.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        const data = await res.json();
        return data;

    } catch (e) {
        console.error("Error al enviar pedido:", e);
        throw new Error("Error al conectar con el servidor");
    }
}
