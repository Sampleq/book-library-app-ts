import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { clearError, selectError } from '../../redux/slices/errorSlice';
import { useEffect } from 'react';

function Error() {
  console.log('Error()');

  const dispatch = useDispatch();

  const { errorMessage } = useSelector(selectError);

  useEffect(() => {
    // в целом благодаря if - корректно работает и без  useEffect - useSelector сам ререндерит компонент при изменении возвращаемой его коллбеком части Состояния - seems no bug - но нужен! - иначе ошибка Error.js:17 Warning: Cannot update a component (`Lt`) while rendering a different component (`Error`).
    // Основная причина использования useEffect() — это предотвращение ошибки
    // обновления состояния во время рендера компонента. useEffect нужен, чтобы
    // избежать ошибки о недопустимом обновлении состояния во время
    // рендера.Гарантирует, что dispatch(clearError()) вызывается только после
    // рендера, предотвращая баги и предупреждения. Без useEffect код работает
    // нестабильно и может вызвать непредсказуемые ошибки особенно в более
    // сложных приложениях с большим количеством компонентов и состояний.
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
