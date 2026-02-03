import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppRoutes } from '@/routes/app-routes';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
);
