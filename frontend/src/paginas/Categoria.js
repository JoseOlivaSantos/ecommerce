import { useState, useContext, useEffect } from "react";
import Productos from "../Components/Productos";
import { BusquedaContext } from "../context/BusquedaContext";

export default function Categoria() {

  const { termino } = useContext(BusquedaContext);

  const [filtros, setFiltros] = useState({
    categoria: "",
    tipo_prenda: "",
    estilo: "",
    talla: "",
    color: "",
    minPrice: 0,
    maxPrice: 9999,
    busqueda: ""
  });

  const actualizarFiltro = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  useEffect(() => {
    const seguro = typeof termino === "string" ? termino : "";

    setFiltros(prev => ({
      ...prev,
      busqueda: seguro.toLowerCase().trim()
    }));
  }, [termino]);

  return (
    <article className="category-page">
      <section className="category-content">

        <aside className="filters">
          <h2>Filtros</h2>

          <div className="filter-group">
            <h3>Categoría</h3>
            <select onChange={(e) => actualizarFiltro("categoria", e.target.value)}>
              <option value="">Todas</option>
              <option value="1">Camisas de Hombre</option>
              <option value="2">Pantalones de Hombre</option>
              <option value="3">Chaquetas y Abrigos</option>
              <option value="4">Camisetas de Mujer</option>
              <option value="5">Vestidos</option>
              <option value="6">Faldas</option>
              <option value="7">Ropa Deportiva</option>
              <option value="8">Accesorios</option>
              <option value="9">Calzado</option>
              <option value="10">Ropa Interior</option>
            </select>
          </div>

          <div className="filter-group">
            <h3>Tipo de prenda</h3>
            <select onChange={(e) => actualizarFiltro("tipo_prenda", e.target.value)}>
              <option value="">Todos</option>
              <option value="Camisa">Camisa</option>
              <option value="Pantalón">Pantalón</option>
              <option value="Camiseta">Camiseta</option>
              <option value="Chaqueta">Chaqueta</option>
              <option value="Vestido">Vestido</option>
              <option value="Falda">Falda</option>
              <option value="Sudadera">Sudadera</option>
              <option value="Calzado">Calzado</option>
              <option value="Accesorio">Accesorio</option>
            </select>
          </div>

          <div className="filter-group">
            <h3>Estilo</h3>
            <select onChange={(e) => actualizarFiltro("estilo", e.target.value)}>
              <option value="">Todos</option>
              <option value="Casual">Casual</option>
              <option value="Formal">Formal</option>
              <option value="Fiesta">Fiesta</option>
              <option value="Gimnasio">Gimnasio</option>
            </select>
          </div>

          <div className="filter-group">
            <h3>Color</h3>
            <select onChange={(e) => actualizarFiltro("color", e.target.value)}>
              <option value="">Todos</option>
              <option value="Negro">Negro</option>
              <option value="Blanco">Blanco</option>
              <option value="Azul">Azul</option>
              <option value="Rojo">Rojo</option>
              <option value="Gris">Gris</option>
            </select>
          </div>

          <div className="filter-group">
            <h3>Talla</h3>
            <select onChange={(e) => actualizarFiltro("talla", e.target.value)}>
              <option value="">Todas</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="Única">Única</option>
            </select>
          </div>

          <div className="filter-group">
            <h3>Precio</h3>
            <input 
              type="number" 
              placeholder="Mínimo"
              onChange={(e) => actualizarFiltro("minPrice", Number(e.target.value))} 
            />

            <input 
              type="number" 
              placeholder="Máximo"
              onChange={(e) => actualizarFiltro("maxPrice", Number(e.target.value))} 
            />
          </div>
        </aside>

        <section className="product-listing">
          <Productos filtros={filtros} />

        </section>

      </section>
              

    </article>
  );
}
