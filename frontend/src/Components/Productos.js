import { obtenerProductos } from "../api/productos";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

export default function Productos({ filtros }) {

  const [productos, setProductos] = useState([]);

  const { agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
    obtenerProductos().then(setProductos);
  }, []);

  // ---------- FILTRAR PRODUCTOS -----------

  const productosFiltrados = productos.filter(p => {
    if (filtros.categoria && String(p.id_categoria) !== filtros.categoria) return false;
    if (filtros.tipo_prenda && p.tipo_prenda !== filtros.tipo_prenda) return false;
    if (filtros.estilo && p.estilo !== filtros.estilo) return false;
    if (filtros.color && p.color !== filtros.color) return false;
    if (filtros.talla && p.talla !== filtros.talla) return false;
    if (p.precio < filtros.minPrice || p.precio > filtros.maxPrice) return false;

    if (filtros.busqueda && !p.nombre.toLowerCase().includes(filtros.busqueda)) {
      return false;
    }

    return true;
  });

  // ---------- PAGINACIÓN -----------

  const productosPorPagina = 9;
  const [paginaActual, setPaginaActual] = useState(1);

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const indiceInicial = (paginaActual - 1) * productosPorPagina;
  const indiceFinal = indiceInicial + productosPorPagina;

  const productosPagina = productosFiltrados.slice(indiceInicial, indiceFinal);

  const cambiarPagina = (num) => {
    if (num < 1 || num > totalPaginas) return;
    setPaginaActual(num);
  };

  return (
    <article className="art-newArrivals">

      <div className="box-tarjetas-newArrivals">

        {productosPagina.map(p => (
          <div key={p.id_producto} className="tarjeta-newArrivals">

            <div className="box-img-newArrivals">
              <Link className="link-newArrivals" to={`/producto/${p.id_producto}`}>
                <img className="img-newArrivals" src={p.imagen} alt={p.nombre}/>
              </Link>
            </div>

            <div className="box-info-newArrivals">
              <h3>{p.nombre}</h3>
              <p>{p.descripcion}</p>
              <span>Q{p.precio}</span>

              <button 
                className="add-produ" 
                onClick={() => agregarAlCarrito(p)}
              >
                Agregar al carrito
              </button>
            </div>

          </div>
        ))}

      </div>

      {/* ---------- PAGINACIÓN ---------- */}
      <div className="pagination">

        <a 
          className="prev"
          onClick={(e) => { e.preventDefault(); cambiarPagina(paginaActual - 1); }}
          style={{ pointerEvents: paginaActual === 1 ? "none" : "auto", opacity: paginaActual === 1 ? 0.5 : 1 }}
        >
          <i className="fas fa-arrow-left"></i> Anterior
        </a>

        {[...Array(totalPaginas)].map((_, i) => (
          <a
            key={i}
            className={`page-num ${paginaActual === i + 1 ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); cambiarPagina(i + 1); }}
          >
            {i + 1}
          </a>
        ))}

        <a 
          className="next"
          onClick={(e) => { e.preventDefault(); cambiarPagina(paginaActual + 1); }}
          style={{ pointerEvents: paginaActual === totalPaginas ? "none" : "auto", opacity: paginaActual === totalPaginas ? 0.5 : 1 }}
        >
          Siguiente <i className="fas fa-arrow-right"></i>
        </a>

      </div>
    </article>
  );
}
