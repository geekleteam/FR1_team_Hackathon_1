import { useAuth0 } from '@auth0/auth0-react';
import { Outlet } from '@tanstack/react-router';
import { createFileRoute, Navigate } from '@tanstack/react-router';
import { Loader } from '~/components/Loader';

export const Route = createFileRoute('/_authenticated')({
  component: () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
      return <Loader />;
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <Outlet />;
  },
});
