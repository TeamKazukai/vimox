import React from 'react';
import { Button } from '@components/Form/Button';
import { Context } from '../../Provider';
import { useAddQueue, useRemoveQueue } from './hook';

export const ButtonAddQueue = () => {
  const { isInQueue } = React.useContext(Context);
  const [isAddedInQueue, setAddedInQueue] = React.useState(isInQueue);
  const { loading: loadingAddQueue, handleAddSerie } = useAddQueue({
    onSuccess: () => setAddedInQueue(true),
  });
  const { loading: loadingRemoveQueue, handleRemoveSerie } = useRemoveQueue({
    onSuccess: () => setAddedInQueue(false),
  });

  React.useEffect(() => {
    setAddedInQueue(isInQueue);
  }, [isInQueue]);

  if (!isAddedInQueue)
    return (
      <Button
        margin='14px 0 0 0'
        onClick={handleAddSerie}
        disabled={loadingAddQueue}
      >
        Añadir a mi lista
      </Button>
    );

  return (
    <Button
      margin='14px 0 0 0'
      onClick={handleRemoveSerie}
      disabled={loadingRemoveQueue}
    >
      Quitar de mi lista
    </Button>
  );
};
