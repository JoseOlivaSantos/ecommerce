import { reviews } from "../assets/imagenes/apis/data"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export default function HappyCustomers() {
  return (
    <article className="art-happyCustomers">
      <h2 className="">Clientes Felices</h2>

      <Swiper
        className="swiper"
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={4}
        navigation
        pagination={{ el: ".custom-pagination", clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="tarjeta-happyCustomers">
              <div className="box-info-slider">
                <span>{review.calificacion}</span>
                <h3 className="">{review.nombre}</h3>
                <p>{review.descripcion}</p>
                <p className="fecha-slider">{review.fecha}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination"></div>
    </article>
  );
};

