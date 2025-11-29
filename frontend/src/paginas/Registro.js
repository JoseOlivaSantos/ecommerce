import { useState } from "react";
import "../estilos/registro.css";
import { useNavigate, Link } from "react-router-dom";

export const Registro = () => {

  const API_URL = process.env.REACT_APP_API_URL;

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    pass: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

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
      const response = await fetch(`${API_URL}/registro.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setSuccess("Registro exitoso, puedes iniciar sesión ✔");
        setTimeout(() => navigate("/Login"), 2000);
      }

    } catch (err) {
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="login-container">
      <h2>Crear Cuenta</h2>

      <form onSubmit={handleSubmit} className="login-form">

        <input className="login-input" name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input className="login-input" name="apellido" placeholder="Apellido" onChange={handleChange} />
        <input className="login-input" name="correo" type="email" placeholder="Correo" onChange={handleChange} />
        <input className="login-input" name="telefono" placeholder="Teléfono" onChange={handleChange} />
        <input className="login-input" name="pass" type="password" placeholder="Contraseña" onChange={handleChange} />

        <button type="submit" className="login-btn">Registrarme</button>

        <Link to="/Login" className="login-btn">
          Ya tengo cuenta
        </Link>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};
