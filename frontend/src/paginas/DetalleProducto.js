import NewArrivals from "../Components/NewArrivals";
import Reviews from "../Components/Reviews";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { obtenerProductosId } from "../api/productosID";
import { CarritoContext } from "../context/CarritoContext";

export default function DetalleProducto() {

  const { agregarAlCarrito } = useContext(CarritoContext);

  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  
  useEffect(() => {
    obtenerProductosId(id).then(data => {
      console.log("Producto obtenido:", data);
      setProducto(data);
    });
  }, [id]);

  if (!producto) return <p>Cargando...</p>;

  function agregarProducto() {
    agregarAlCarrito({
      id_producto: producto.id_producto,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      imagen: producto.imagen
    });
  }

  return (
    <section>
      <article className="art-detalle">

        <div className="box-detalle-img">
          <div className="img-principal-detalle">
            <img src={producto.imagen} alt={producto.nombre}/>
          </div>
        </div>

        <div className="box-detalle">
          <div className="card-detalle">

            <div className="box-detalle-info">
              <h2>{producto.nombre}</h2>
              <span className="detalle-precio">Q{producto.precio}</span>
              <p>{producto.descripcion}</p>
            </div>

            <div className="box-detalle-color">
              <h4>Selecciona el color</h4>
              <select className="select-detalle" required>
                <option value="">Color</option>
                <option value="Negro">Negro</option>
                <option value="Blanco">Blanco</option>
                <option value="Azul">Azul</option>
                <option value="Rojo">Rojo</option>
                <option value="Gris">Gris</option>
              </select>
            </div>

            <div className="box-detalle-lenght">
              <h4>Selecciona tu talla</h4>
              <ul>
                <li><button>Small</button></li>
                <li><button>Medium</button></li>
                <li><button>Large</button></li>
                <li><button>X-Large</button></li>
              </ul>
            </div>

            <div className="box-detalle-cantidad">
              <button>1</button>
              <button onClick={agregarProducto}>
                Agregar al carrito
              </button>
            </div>

          </div>
        </div>
      </article>

      {/* 🔥 SOLO SE CARGA CUANDO EXISTE PRODUCTO */}
      {producto && <Reviews id_producto={producto.id_producto} />}

      <NewArrivals/>
    </section>
  );
}
