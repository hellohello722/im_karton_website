import React from "react";
import type { FC } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type HeroSlide = {
  title: string;
  description?: string;
  image: {
    src: string;
    alt?: string;
  };
  cta?: {
    label: string;
    link: string;
  };
};

type HeroSliderProps = {
  slides: HeroSlide[];
};

const HeroSlider: FC<HeroSliderProps> = ({ slides }) => {
  if (!slides.length) {
    return null;
  }

  return (
    <Swiper
      pagination={{
        clickable: true,
        bulletClass: "banner-pagination-bullet",
        bulletActiveClass: "banner-pagination-bullet-active",
      }}
      modules={[Pagination]}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={`${slide.title}-${index}`}>
          <div className="relative min-h-[420px] md:min-h-[520px] flex items-center overflow-hidden rounded-3xl">
            <img
              src={slide.image.src}
              alt={slide.image.alt ?? slide.title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/55 to-black/10"></div>

            <div className="relative w-full">
              <div className="container">
                <div className="max-w-2xl py-16 md:py-24 text-white">
                  {slide.description && (
                    <p className="mb-4 text-base md:text-lg text-white/90">
                      {slide.description}
                    </p>
                  )}
                  <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-6">
                    {slide.title}
                  </h1>
                  {slide.cta && slide.cta.link && (
                    <a
                      className="btn btn-sm md:btn-lg btn-primary font-medium"
                      href={slide.cta.link}
                    >
                      {slide.cta.label}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
