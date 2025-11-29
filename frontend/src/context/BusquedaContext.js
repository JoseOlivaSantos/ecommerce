import { createContext, useState } from "react";

export const BusquedaContext = createContext();

export function BusquedaProvider({ children }) {
  const [termino, setTermino] = useState(""); 

  return (
    <BusquedaContext.Provider value={{ termino, setTermino }}>
      {children}
    </BusquedaContext.Provider>
  );
}
