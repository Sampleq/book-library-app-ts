import { Provider } from 'react-redux';

import store from './redux/store.ts';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    {/* basename='/book-library-app-ts' - указываем базовый URL-путь для всего приложения. Все маршруты (<Route>, <Link>, useNavigate()) будут автоматически добавлять этот префикс. */}
    <BrowserRouter basename='/book-library-app-ts'>
      <Routes>
        <Route path='/' element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
