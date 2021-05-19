import React from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import { Serie } from '@components/DataDisplay/Serie';
import { ChevronLeft } from '@components/Icon/ChevronLeft';
import { ChevronRight } from '@components/Icon/ChevronRight';
import { GetSeriesResponse } from '@globalTypes/serieServices';
import { Root, ArrowButton } from './styled';

type CarouselProps = {
  series: GetSeriesResponse['series'];
};

export const Carousel = ({ series }: CarouselProps) => {
  const [slider, setSlider] = React.useState<Slider>(null);

  const next = React.useCallback(() => slider.slickNext(), [slider]);

  const prev = React.useCallback(() => slider.slickPrev(), [slider]);

  return (
    <Root>
      <ArrowButton onClick={prev}>
        <ChevronLeft color='#fff' xl />
      </ArrowButton>
      <Slider
        ref={setSlider}
        arrows={false}
        slidesToShow={5}
        className='carousel'
        infinite
        responsive={[
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 4,
            },
          },
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
          series.map(({ _id, name, imageMd, geners, episodes }) => (
            <Link key={_id} href={`/serie/${_id}`}>
              <a>
                <Serie
                  name={name}
                  thumbnail={imageMd}
                  geners={geners}
                  countEpisodes={episodes.length}
                />
              </a>
            </Link>
          ))}
      </Slider>
      <ArrowButton toRight onClick={next}>
        <ChevronRight color='#fff' xl />
      </ArrowButton>
    </Root>
  );
};