import { createContext, useState, useEffect} from "react";

export const CarritoContext = createContext();

export function CarritoProvider({children}) {

  const[carrito, setCarrito] = useState(() => {

    const almacenado = localStorage.getItem("carrito");
    return almacenado ? JSON.parse(almacenado) : [];
  });
  useEffect(()=>{
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  function agregarAlCarrito(producto){
    setCarrito(prev=> {
      const existe = prev.find(p=> p.id_producto === producto.id_producto);

      if(existe){
        return prev.map(p=> p.id_producto === producto.id_producto ? {...p, cantidad: p.cantidad +1}:p
        );
      }else{
        return[...prev, {...producto, cantidad: 1}];
      }
    });
  }

  function reducirCantidad(id_producto) {
    setCarrito(prev =>
      prev.map(p =>
        p.id_producto === id_producto
          ? { ...p, cantidad: Math.max(p.cantidad - 1, 1) }
          : p
      )
    );
  }
  function aumentarCantidad(id_producto) {
    setCarrito(prev =>
      prev.map(p =>
        p.id_producto === id_producto
          ? { ...p, cantidad: p.cantidad + 1 }
          : p
      )
    );
  }


  function eliminarDelCarrito(id_producto){
    setCarrito(prev => prev.filter(p=> p.id_producto !== id_producto));
  }
  function vaciarCarrito(){
    setCarrito([])
    localStorage.removeItem("carrito");
  }
  return (
    <CarritoContext.Provider value={{carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, reducirCantidad, aumentarCantidad}}>
      {children}
    </CarritoContext.Provider>
  )
}
