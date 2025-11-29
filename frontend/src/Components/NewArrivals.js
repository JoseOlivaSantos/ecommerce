import { obtenerProductos } from "../api/productos"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


export default function NewArrivals() {
  const [productos, setProductos] = useState([]);
  useEffect(()=> {
    obtenerProductos().then(setProductos);
  }, []);

  return (
    <article className="art-newArrivals">
      <h2>Nuevo Ingreso</h2>
      <div>
        <div className="box-tarjetas-newArrivals">
          {productos.slice(0,4).map((p)=>(
            <Link className="link-newArrivals" to={`/producto/${p.id_producto}`}>
              <div key={p.id} className="tarjeta-newArrivals">
                <div className="box-img-newArrivals">
                  <img className="img-newArrivals" src={p.imagen} alt={p.nombre}/>
                </div>
                <div className="box-info-newArrivals">
                  <h3>{p.nombre}</h3>
                  <p>{p.descripcion}</p>
                  <span>Q{p.precio}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
      <div className="box-btn-newArrivals">
        <Link to={'/categoria'}><button className="btn-newArrivals">Ver Todo</button></Link>
      </div>
    </article>
  )
}
