import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wConnect, wDisconnect } from '../store/socket';
import config from '../config';

const useStream = () => {
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(wConnect(config.BASE_URL + '/stream'));

      return () => {
        dispatch(wDisconnect());
      };
    },
    [
      dispatch,
    ],
  );
};

export default useStream;
