import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

// import { AppSidebar } from '@/components/app-sidebar';
// import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { router } from './routes';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
