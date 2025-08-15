import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { clearError } from '@/redux/slices/errorSlice';
import { selectError } from '@/redux/slices/errorSelectors';
import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/redux-hook';

function Error() {
  // console.log('Error()');

  const dispatch = useAppDispatch();

  const { errorMessage } = useSelector(selectError);

  useEffect(() => {
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
  }, [errorMessage, dispatch]);

  return <ToastContainer />;
}

export default Error;
