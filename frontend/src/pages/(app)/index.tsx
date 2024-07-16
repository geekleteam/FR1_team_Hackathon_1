import { Navigate } from 'react-router-dom';

export function AppIndexPage() {
  return <Navigate to="/new" replace />;
}
