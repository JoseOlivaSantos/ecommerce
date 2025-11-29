import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/Pago.css";
import { AuthContext } from "../context/AuthContext";
import { CarritoContext } from "../context/CarritoContext";
import { PedidoContext } from "../context/PedidoContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


function Pago() {

  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [mensaje, setMensaje] = useState("");

  const { carrito, vaciarCarrito } = useContext(CarritoContext);
  const { usuario } = useContext(AuthContext);
  const { idPedido } = useContext(PedidoContext);

  const [pago, setPago] = useState({
    nombre_tarjeta: "",
    numero_tarjeta: "",
    fecha_expiracion: "",
    cvv: ""
  });

  const handleChange = e => {
    setPago({ ...pago, [e.target.name]: e.target.value });
  };

  const handleFinalizarPago = async () => {

    const id_pedido = 1;

    const datosEnviar = {
      id_pedido: Number(id_pedido),
      id_usuario: Number(usuario.id_usuario),
      carrito: carrito.map(c => ({
      	id_producto: c.id_producto,
      	precio_unitario: c.precio,
      	cantidad: c.cantidad,
      	subtotal: c.precio * c.cantidad
      })),
      pago: pago
    };

    console.log("JSON a enviar:", datosEnviar);

    try {
      const response = await fetch(`${API_URL}/api_pago.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosEnviar)
      });

      const data = await response.json();
      console.log("Respuesta del backend:", data);

      if (data.mensaje === "pago realizado correctamente") {

        vaciarCarrito();

        setMensaje("Pago ralizado con exito !!!");

        setTimeout(()=> {
        	navigate("/Perfil");
        },2000);

      } else {
        alert("Error en el pago: " + data.mensaje);
      }

    } catch (error) {
      console.error("Error al enviar el pago:", error);
      alert("Error en el servidor");
    }
  };

  const subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const descuento = subtotal * 0.20;
  const envio = subtotal >= 1000 ? 0 : 30;
  const total = subtotal - descuento + envio;


  return (
  	<div className="pago-contenedor">
      <h2>Información de Pago</h2>

      {mensaje && <div className={`notificacion ${mensaje.includes("✅") ? "exito" : "error"}`}>{mensaje}</div>}

      <div className="pago-layout">
        
        <div className="pago-form">
          <div className="pago-grupo">
            <label>Nombre en la tarjeta</label>
            <input type="text" name="nombre_tarjeta" onChange={handleChange} />
          </div>

          <div className="pago-grupo">
            <label>Número de tarjeta</label>
            <input type="text" name="numero_tarjeta" onChange={handleChange} />
          </div>

          <div className="pago-grupo">
            <label>Fecha de expiración</label>
            <input type="text" name="fecha_expiracion" placeholder="AÑO-MES" onChange={handleChange} />
          </div>

          <div className="pago-grupo">
            <label>CVV</label>
            <input type="text" name="cvv" onChange={handleChange} />
          </div>

          <button className="btn-pagar" onClick={handleFinalizarPago}>
            Finalizar Pago
          </button>
        </div>

        {/* Resumen del carrito */}
        <aside className="pago-resumen">
          <h3>Resumen del Pedido</h3>
          {carrito.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            <ul>
              {carrito.map(p => (
                <li key={p.id_producto}>
                  <span>{p.nombre} x {p.cantidad}</span>
                  <span>Q{(p.precio * p.cantidad).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="resumen-line"><span>Subtotal</span><span>Q{subtotal.toFixed(2)}</span></div>
          <div className="resumen-line"><span>Descuento (-20%)</span><span>-Q{descuento.toFixed(2)}</span></div>
          <div className="resumen-line"><span>Envío</span><span>Q{envio.toFixed(2)}</span></div>
          <div className="resumen-total"><span>Total</span><span>Q{total.toFixed(2)}</span></div>
        </aside>
      </div>
    </div>
  	);
}

export default Pago;
