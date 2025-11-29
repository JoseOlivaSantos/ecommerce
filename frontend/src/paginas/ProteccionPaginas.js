import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ProteccionPaginas = ({ children }) => {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuario) {
      navigate("/Login");
    }
  }, [usuario, navigate]);

  if (!usuario) return null;

  return <>{children}</>;
};