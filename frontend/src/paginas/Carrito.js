import '../estilos/carrito-productos.css';
import { useContext, useState } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { PedidoContext } from '../context/PedidoContext';
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

export default function Carrito() {

    const API_URL = process.env.REACT_APP_API_URL;

    const {setIdPedido} = useContext(PedidoContext);
    const { usuario } = useContext(AuthContext);


    const idUsuario =usuario ? Number(usuario.id_usuario): null;

    const navigate = useNavigate();

    const [mensaje, setMensaje] = useState("");

    const { carrito, eliminarDelCarrito, reducirCantidad, aumentarCantidad, vaciarCarrito } = useContext(CarritoContext);

    const subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    const descuento = subtotal * 0.20;

    const envio = subtotal >= 1000 ? 0 : 30;

    const total = subtotal - descuento + envio;

    function procesarPago () {
        navigate("/Pago");
    }

    async function procesarPago() {
        try {

          if(carrito.length === 0) {
            setMensaje("Debe de seleccionar un producto");

            setTimeout(() => {
                navigate("/categoria");
            }, 2000);        
            return;
          }

          if(!idUsuario) {
            setMensaje("Debes iniciar sesión primero");

            setTimeout(() => {
                navigate("/Login?redirect=Pago");
            },1500);
            return;
          }


          const response = await fetch(`${API_URL}/crearPedido.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id_usuario: idUsuario,
              total: total
            })
          });

          const data = await response.json();

          if (data.status === "success") {
            setIdPedido(data.id_pedido); 
            navigate("/Pago");           
          } else {
            setMensaje("Error al crear el pedido");
          }
        } catch (error) {
            setMensaje("Error de conexión con el servidor");}
        }

    
    return (
        <article className='cart-page'>

            {mensaje && (
                <div className="alerta-compra">
                    {mensaje}
                </div>
            )}

            <div className="breadcrumb">Inicio / Carrito</div>
            <h1>Mi Carrito de Compras</h1>

            <section className="cart-content">

                <div className='contenedor-pedidos'>

                    {carrito.length === 0 && (
                        <p>No hay productos en tu carrito.</p>
                    )}

                    {carrito.map(p => (
                        <div key={p.id_producto} className="tarjeta-carrito">

                            <div className="box-img-carrito">
                                <Link className="link-newArrivals" to={`/producto/${p.id_producto}`}>
                                    <img className="img-carrito" src={p.imagen} alt={p.nombre} />
                                </Link>
                            </div>

                            <div className="box-info-carrito">
                                <Link className="link-newArrivals" to={`/producto/${p.id_producto}`}>
                                    <h3>{p.nombre}</h3>
                                    <p>{p.descripcion}</p>
                                    <span>Q{p.precio}</span>
                                </Link>
                            </div>

                            <div className='box-controles'>
                                <button className="btn-eliminar" onClick={() => eliminarDelCarrito(p.id_producto)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>

                                <div className="cantidad-controles">
                                    <button className='control' onClick={() => reducirCantidad(p.id_producto)}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>

                                    <span>{p.cantidad}</span>

                                    <button className='control' onClick={() => aumentarCantidad(p.id_producto)}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}

                </div>

                <aside className="cart-summary">
                    <h2>Resumen del Pedido</h2>

                    <div className="summary-line">
                        <span>Subtotal</span>
                        <span>Q{subtotal.toFixed(2)}</span>
                    </div>

                    <div className="summary-line">
                        <span>Descuento (-20%)</span>
                        <span>-Q{descuento.toFixed(2)}</span>
                    </div>

                    <div className="summary-line">
                        <span>Costo de Envío</span>
                        <span>Q{envio.toFixed(2)}</span>
                    </div>

                    <div className="summary-line total-line">
                        <span>Total</span>
                        <span className="total-amount">Q{total.toFixed(2)}</span>
                    </div>

                    <div className="promo-code">
                        <input type="text" placeholder="Ingresar código de cupón" />
                        <button>Aplicar</button>
                    </div>

                    <button className="checkout-btn" onClick={procesarPago}>
                        Proceder al Pago
                    </button>
                </aside>
            </section>

            <div className="cart-info">
                <p>🛍️ Devolución gratuita en 30 días</p>
                <p>🚚 Envío gratis en pedidos mayores a Q1000</p>
            </div>

        </article>
    );
}
