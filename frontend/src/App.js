import ReactDOM from "react-dom/client";
import Footer from './Components/Footer';
import Header from './Components/Header';
import HomePage from './paginas/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { CarritoProvider } from './context/CarritoContext';
import { BusquedaProvider } from "./context/BusquedaContext";
import { AuthProvider } from "./context/AuthContext";
import { PedidoProvider } from "./context/PedidoContext";

import './estilos/App.css';
import DetalleProducto from './paginas/DetalleProducto';
import Carrito from './paginas/Carrito';
import Categoria from './paginas/Categoria';
import Perfil from './paginas/Perfil';
import {Login} from './paginas/Login';
import Pago from './paginas/Pago';
import {ProteccionPaginas} from './paginas/ProteccionPaginas';
import { Registro } from './paginas/Registro';
 
function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <PedidoProvider>
          <BusquedaProvider>
            <Router>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/producto/:id" element={<DetalleProducto />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/categoria" element={<Categoria />} />
                <Route path="/Perfil" element={<Perfil />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Registro" element={<Registro />} />
                <Route path='/Pago' element={
                  <ProteccionPaginas>
                    <Pago />  
                  </ProteccionPaginas> }
                  />
              </Routes>
              <Footer />
            </Router>
          </BusquedaProvider>          
        </PedidoProvider>        
      </CarritoProvider>
    </AuthProvider>
    
  );
}

export default App;

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
