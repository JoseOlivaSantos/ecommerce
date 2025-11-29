import { useState, useContext } from "react";
import { Input } from "../Components/SesionComponentes";
import { AuthContext } from "../context/AuthContext";
import "../estilos/login.css";
import { useNavigate, Link, useLocation  } from 'react-router-dom';

export const Login = () => {

  const API_URL = process.env.REACT_APP_API_URL;

  const location = useLocation();

  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    correo: "",
    pass: ""
  });

  const navigate = useNavigate();
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

    try {
      const response = await fetch(`${API_URL}/login.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        login(data.usuario); // se guarda la informacion del usuario
        setSuccess("Login exitoso!");

        // Revisar si hay parámetro redirect en la URL
        const redirect = new URLSearchParams(window.location.search).get("redirect");
        if (redirect) {
          navigate(`/${redirect}`);
        } else {
          navigate("/Perfil"); // o la página principal
        }
      }
    } catch (err) {
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="login-container">
    	<h2>Inicio de sesión</h2>

      <form onSubmit={handleSubmit} className="login-form">

        <Input
          name="correo"
          type="email"
          placeholder="Correo electrónico"
          onChange={handleChange}
        />

        <Input
          name="pass"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />

        <button type="submit" className="login-btn">Ingresar</button>
        <Link to="/Registro" className="login-btn">
          Registrarme
        </Link>
      </form>

      {/* Mostrar mensajes */}
      {error && <p style={{color: "red"}}>{error}</p>}
      {success && <p style={{color: "green"}}>{success}</p>}
    </div>
  );
};
