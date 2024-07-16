import { useAuth0 } from '@auth0/auth0-react';

export const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <button
        className="flex px-4 py-2 rounded-md transition-all text-white bg-gradient-to-r from-primary-green to-hovergreen hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green disabled:opacity-50"
        onClick={() => loginWithRedirect()}
      >
        <svg className="mr-2 h-5 w-5 fill-current text-white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M10 15a5 5 0 0 0 5-5H5a5 5 0 0 0 5 5zm-7 0a7 7 0 1 1 14 0a7 7 0 0 1-14 0zm3-5a2 2 0 1 1 4 0a2 2 0 0 1-4 0zm9 9a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-base font-medium text-white">Sign In with Auth0</span>
      </button>
    )
  );
};
