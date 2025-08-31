import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.css';
import AppShell from './shell/AppShell';
import LandingPage from './pages/LandingPage';
import PlaybookPage from './pages/PlaybookPage';
import HostDashboardPage from './pages/HostDashboardPage';
import HostLobbyPage from './pages/HostLobbyPage';
import SoloStartPage from './pages/solo/SoloStartPage';
import SoloPlayPage from './pages/solo/SoloPlayPage';
import SoloResultsPage from './pages/solo/SoloResultsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppShell>
        <LandingPage />
      </AppShell>
    ),
  },
  {
    path: '/playbook',
    element: (
      <AppShell>
        <PlaybookPage />
      </AppShell>
    ),
  },
  {
    path: '/host',
    element: (
      <AppShell>
        <HostDashboardPage />
      </AppShell>
    ),
  },
  {
    path: '/host/:sessionId/lobby',
    element: (
      <AppShell>
        <HostLobbyPage />
      </AppShell>
    ),
  },
  {
    path: '/solo',
    element: (
      <AppShell>
        <SoloStartPage />
      </AppShell>
    ),
  },
  {
    path: '/solo/play',
    element: (
      <AppShell>
        <SoloPlayPage />
      </AppShell>
    ),
  },
  {
    path: '/solo/results',
    element: (
      <AppShell>
        <SoloResultsPage />
      </AppShell>
    ),
  },
], { basename: import.meta.env.BASE_URL });

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
