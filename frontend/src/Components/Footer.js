import { faCcApplePay, faCcMastercard, faCcPaypal, faCcVisa } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer>
      <div className="box-suscribete">
        <h3>Mantente al dia con <br/>las ultimas ofertas</h3>
        <form className="form-suscribete">
          <input type='email' name='email' placeholder='Ingresa tu correo electronico'/>
          <input type='submit' value="Suscribete"/>
        </form>
      </div>

      <div className="box-footer">
        <div>
            <ul>
              <li><a href='#'><img className="logo" src="logo.png"/></a></li>
              <li><a href="#">terminos de uso</a></li>
              <li><a href="#">Politica y privacidad</a></li>
            </ul>
        </div>
        <div>
            <ul>
              <li><h3>Empresa</h3></li>
              <li><a href="#">Sobre nosotros</a></li>
              <li><a href="#">Caracteristicas</a></li>
              <li><a href="#">Trabajo</a></li>
              <li><a href="#">Carrera</a></li>
            </ul>
        </div>
        <div>
            <ul>
              <li><h3>Ayuda</h3></li>
              <li><a href="#">Soporte</a></li>
              <li><a href="#">Detalles de envio</a></li>
              <li><a href="#">Terminos y condiciones</a></li>
              <li><a href="#">Politica y privacidad</a></li>
            </ul>
        </div>
        <div>
            <ul>
              <li><h3>FAQ</h3></li>
              <li><a href="#">Cuenta</a></li>
              <li><a href="#">Mis Envios</a></li>
              <li><a href="#">Ordenes</a></li>
              <li><a href="#">Pagos</a></li>
            </ul>
        </div>
        <div>
            <ul>
              <li><h3>Recursos</h3></li>
              <li><a href="#">Catalogo</a></li>
              <li><a href="#">Canal de youtube</a></li>
              <li><a href="#">Nuestro Blog</a></li>
            </ul>
        </div>

      </div>
      <div class="box-derecho">
        <p>©2025 Grupo 4 | Derechos reservados</p>
        <div className="box-tiposPagos">
          <FontAwesomeIcon icon={faCcMastercard}/>
          <FontAwesomeIcon icon={faCcVisa}/>
          <FontAwesomeIcon icon={faCcPaypal}/>
          <FontAwesomeIcon icon={faCcApplePay}/>
        </div>
      </div>
    </footer>
  )
}
