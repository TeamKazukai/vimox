import React from 'react';
import Slider from 'react-slick';
import { Context } from '../../Context';
import { ChevronLeft } from '@components/Icon/ChevronLeft';
import { ChevronRight } from '@components/Icon/ChevronRight';
import { ThumbnailSlide } from '../ThumbnailSlide';
import { Root, ArrowButton } from './styled';

export const Carousel = () => {
  const {
    activeIndex,
    refSlider,
    setIndex,
    series,
    setRefSliderNav,
    next,
    prev,
  } = React.useContext(Context);

  return (
    <Root>
      <ArrowButton onClick={prev}>
        <ChevronLeft lg />
      </ArrowButton>
      <Slider
        slidesToShow={4}
        arrows={false}
        className='carousel'
        ref={setRefSliderNav}
        beforeChange={(currentSlide, nextSlide) => setIndex(nextSlide)}
        asNavFor={refSlider}
        responsive={[
          {
            breakpoint: 960,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
            },
          },
        ]}
      >
        {Array.isArray(series) &&
          series.map(({ _id, imageSm }, idx) => (
            <ThumbnailSlide
              key={_id}
              img={imageSm}
              isActive={idx === activeIndex}
              serieId={_id}
            />
          ))}
      </Slider>
      <ArrowButton toRight onClick={next}>
        <ChevronRight lg />
      </ArrowButton>
    </Root>
  );
};