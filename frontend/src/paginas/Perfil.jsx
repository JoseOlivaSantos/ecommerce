import "../estilos/Perfil.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Perfil() {

  const API_URL = process.env.REACT_APP_API_URL;

  const { usuario, logout } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch(
          `${API_URL}/historialPedidos.php?id_usuario=${usuario.id_usuario}`
        );
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (usuario?.id_usuario) {
      fetchPedidos();
    }
  }, [usuario]);

  return (
    <main className="perfil-main">
      <section>
        <Link className="btn-logout" to="/Login" onClick={logout}>Cerrar Sesión</Link>
        <Link to="/Login" className="btn-login" >Iniciar Sesión</Link>
        <article className="contenedor_perfil">
          <h1>PERFIL DEL USUARIO</h1>
          <p><strong>Email:</strong> {usuario?.correo}</p>
          <p><strong>Nombre:</strong> {usuario?.nombre}</p>
          <p><strong>Cuenta:</strong> {usuario?.rol}</p>
        </article>

        <article className="historial_pedidos">
          <h2>Historial de pedidos</h2>
          {loading ? (
            <p>Cargando pedidos...</p>
          ) : pedidos.length === 0 ? (
            <div className="alert alert-dark sin-pedidos" role="alert">
              <strong>Aviso !!!</strong> No tienes pedidos registrados todavía.
            </div>
          ) : (
            <div className="tabla-pedidos">
              {pedidos.map((pedido) => (
                <div key={pedido.id_pedido} className="pedido-card">
                  <h3>Codigo pedido #{pedido.id_pedido}</h3>
                  <p><span className="detalle-label">Fecha:</span> {pedido.fecha_pedido}</p>
                  <p><span className="detalle-label">Total:</span> Q{pedido.total}</p>
                  <p><span className="detalle-label">Estado:</span> {pedido.estado}</p>

                  <h4>Detalles:</h4>
                  <ul>
                    {pedido.detalles.map((d) => (
                      <li key={d.id_dpedido}>
                        <span className="detalle-label">{d.nombre}</span> x {d.cantidad} — Q{d.subtotal}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </article>

      </section>
    </main>
  );
}

export default Perfil;
