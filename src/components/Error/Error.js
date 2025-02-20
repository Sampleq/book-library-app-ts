import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { clearError, selectError } from '../../redux/slices/errorSlice';
import { useEffect } from 'react';

function Error() {
  console.log('Error()');

  const dispatch = useDispatch();

  const { errorMessage } = useSelector(selectError);

  //   useEffect(() => {
  // в целом благодаря if - корректно работает и без  useEffect - useSelector сам ререндерит компонент при изменении возвращаемой его коллбеком части Состояния - seems no bug
  if (errorMessage) {
    toast.error(errorMessage, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
    });

    dispatch(clearError());
  }
  //   }, [errorMessage, dispatch]);

  return <ToastContainer />;
}

export default Error;
