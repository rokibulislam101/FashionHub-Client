import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { routes } from './Routes/Routes.jsx';
import ContextProvider from './Components/ContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={routes} />
    </ContextProvider>
  </StrictMode>
);
