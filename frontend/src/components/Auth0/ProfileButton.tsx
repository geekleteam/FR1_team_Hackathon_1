import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Dropdown } from 'flowbite-react';

export const ProfileButton = () => {
  const { logout, user } = useAuth0();
  const userInitials = [user?.given_name, user?.family_name].filter(Boolean).join('') || 'U';

  return (
    <Dropdown
      label={<Avatar img={user?.picture} placeholderInitials={userInitials} rounded />}
      arrowIcon={false}
      placement="bottom-end"
      inline
    >
      <Dropdown.Header>
        <span className="block text-sm">{user?.name}</span>
        <span className="block truncate text-sm font-medium">{user?.email}</span>
      </Dropdown.Header>
      <Dropdown.Item className="text-red-600" onClick={logout}>
        Log out
      </Dropdown.Item>
    </Dropdown>
  );
};
