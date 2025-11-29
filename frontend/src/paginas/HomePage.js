import NewArrivals from "../Components/NewArrivals";
import HappyCustomers from "../Components/HappyCustomers"
import TopSelling from "../Components/TopSelling";
import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <section className="section-home">
      <article className="art-banner">
        <img className="img-banner" src="bannerHome.png" width={500}/>
        <div className="box-info-banner">
          <h2>Encuentra la ropa<br/> que conbine con<br/> tu estilo</h2>
          <Link to={'/categoria'}><button>Compra ahora</button></Link>
          <div className="box-datos-banner">
            <div><p>200+</p><span>Marcas internacionales</span></div>
            <div><p>2000+</p><span>Calidad de productos</span></div>
            <div><p>30000+</p><span>Clientes satisfechos</span></div>
          </div>
        </div>
      </article>
      <article className="art-marcas">
      </article>
      <NewArrivals/>
      <TopSelling/>
      <article className="art-estilos">
        <div className="box-estilos">
          <h3>Busca tu propio estilo</h3>
          <div className="box-categorias-estilos">
            <div className="box-img-estilos box-img-c"><h3>Casual</h3><img src="casual.jpg"/></div>
            <div className="box-img-estilos box-img-g"><h3>Formal</h3><img src="formal.jpg"/></div>
            <div className="box-img-estilos box-img-g"><h3>Fiesta</h3><img src="fiesta.jpg"/></div>
            <div className="box-img-estilos box-img-c"><h3>Gym</h3><img src="gym.jpg"/></div>
          </div>
        </div>
      </article>
      <HappyCustomers/>
    </section>
  )
} 
