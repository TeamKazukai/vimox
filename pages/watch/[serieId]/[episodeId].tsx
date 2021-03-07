import React from 'react';
import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import { LayoutApp } from '@components/Layout/LayoutApp';
import { PlayerComponent } from '@pageComponents/Watch/Player';
import { NavButtons } from '@pageComponents/Watch/NavButtons';
import { About } from '@pageComponents/Watch/About';
import { Skeleton } from '@pageComponents/Watch/Skeleton';
import { getEpisode, getEpisodes } from '@services/episodes';

type WatchProps = {
  querys: Record<string, string>;
};

const Watch = ({ querys }: WatchProps) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ['episode_watch', querys],
    async ({ queryKey }) => {
      try {
        const data = await Promise.all([
          getEpisode(queryKey[1].episodeId),
          getEpisodes({ of_serieId: queryKey[1].serieId }),
        ]);

        return {
          episode: data[0],
          episodes: data[1],
        };
      } catch (reason) {
        console.error(reason);
        throw new Error('Algo salio mal intentalo mas tarde').message;
      }
    }
  );

  const renderContent = () => {
    if (error) return <p>{error}</p>;

    if (isLoading || isFetching) return <Skeleton />;

    if (!data || !data.episode) return <div />;

    return (
      <>
        <PlayerComponent src={data.episode.src} />
        <NavButtons currentEpisode={data.episode} episodes={data.episodes} />
        <About
          name={data.episode.name}
          order={data.episode.order}
          sinopsis={data.episode.sinopsis}
        />
      </>
    );
  };

  return <LayoutApp>{renderContent()}</LayoutApp>;
};

export default Watch;

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    querys: context.query,
  },
});