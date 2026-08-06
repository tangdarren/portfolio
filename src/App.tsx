import AppRouter from './routes/AppRouter';

/**
 * Incremental migration entry: the existing React Router application shell.
 * Production mounts this via `SpaApp` (BrowserRouter + Helmet) from the Next.js
 * client-only catch-all. Tests mount it under MemoryRouter directly.
 */
export default function App() {
  return <AppRouter />;
}
