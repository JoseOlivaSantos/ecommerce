import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Reviews({ id_producto }) {

  const API_URL = process.env.REACT_APP_API_URL;

  const { usuario } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(5);

  const obtenerReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/api_reviews.php?id_producto=${id_producto}`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Error cargando reseñas:", err);
    }
  };

  useEffect(() => {
    obtenerReviews();
  }, [id_producto]);

  const enviarReview = async () => {
    if (!usuario) {
      alert("Debes iniciar sesión para dejar una reseña.");
      return;
    }

    const datos = {
      id_producto,
      id_usuario: usuario.id_usuario,
      calificacion,
      comentario
    };

    try {
      const res = await fetch(`${API_URL}/api_reviews.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });

      const data = await res.json();

      if (data.success) {
        setComentario("");
        obtenerReviews();
      } else {
        alert("Error al guardar reseña");
      }

    } catch (err) {
      console.error("Error al enviar reseña:", err);
    }
  };

  return (
    <article className="art-review">

      <h2>Reseñas</h2>

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p>No hay reseñas todavía.</p>
        ) : (
          reviews.map(r => (
            <div key={r.id_review} className="review-tarjeta">
              <h3><strong>{r.nombre}</strong></h3>
              <p>{"⭐".repeat(r.calificacion)}</p>
              <p>{r.comentario}</p>
              <span>{r.fecha}</span>
            </div>
          ))
        )}
      </div>

      <div className="review-form">
        <h3>Agregar reseña</h3>

        <label>Calificación</label>
        <select required value={calificacion} onChange={e => setCalificacion(e.target.value)}>
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <label>Comentario</label>
        <textarea
        required
          rows="3"
          value={comentario}
          onChange={e => setComentario(e.target.value)}
        ></textarea>

        <button onClick={enviarReview}>Enviar Reseña</button>
      </div>

    </article>
  );
}
