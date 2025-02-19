import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { clearError, selectError } from '../../redux/slices/errorSlice';
import { useEffect } from 'react';

function Error() {
  console.log('Error()');

  const dispatch = useDispatch();

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
