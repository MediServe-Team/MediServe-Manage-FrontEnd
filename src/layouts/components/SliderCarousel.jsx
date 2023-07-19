import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper';

function SliderCarousel({ contents }) {
  return (
    <div className="w-auto min-w-0 relative">
      <Swiper
        className="bg-dark_primary rounded-md"
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[Autoplay]}
        loop={true}
      >
        {contents.map((content, index) => {
          return (
            <SwiperSlide key={index} className="text-center text-white">
              {content}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SliderCarousel;
