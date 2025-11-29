// src/context/PedidoContext.js
import { createContext, useState } from "react";

export const PedidoContext = createContext();

export function PedidoProvider({ children }) {
  const [idPedido, setIdPedido] = useState(null);

  return (
    <PedidoContext.Provider value={{ idPedido, setIdPedido }}>
      {children}
    </PedidoContext.Provider>
  );
}
