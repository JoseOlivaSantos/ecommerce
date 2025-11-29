import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { BusquedaContext } from "../context/BusquedaContext";
import { useContext } from "react";

export default function Header() {
  const { carrito } = useContext(CarritoContext);
  const { setTermino } = useContext(BusquedaContext);

  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <header>
      <div className="box-promocion">
        <p>
          Registrate y obten un 20% en tu primer compra. Registrate ahora
        </p>
      </div>

      <nav>
        <Link to={"/"}>
          <img className="logo" src="/logo.png" alt="logo" />
        </Link>

        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/categoria">Productos</Link></li>
        </ul>

        <input
          className="search"
          type="search"
          placeholder="Buscar productos..."
          onChange={(e) => setTermino(e.target.value)}
        />

        <div className="box-icons">
          <Link to={"/carrito"} className="box-contador">
            <FontAwesomeIcon icon={faCartShopping} />
            {totalItems > 0 && <span className="contador-carrito">{totalItems}</span>}
          </Link>

          <Link to={"Perfil"}><FontAwesomeIcon icon={faCircleUser} /></Link>
        </div>
      </nav>
    </header>
  );
}
