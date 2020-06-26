import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wConnect, wDisconnect } from '../store/socket';

const useSocket = (host: string) => {
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(wConnect(host));

      return () => {
        dispatch(wDisconnect(host));
      };
    },
    [dispatch, host],
  );
};

export default useSocket;
