import { Panel } from '@xyflow/react';
import { DarkThemeToggle } from 'flowbite-react';
import { ProfileButton } from '~/components/Auth0/ProfileButton';

export function SettingsPanel() {
  return (
    <Panel position="top-right" className="flex flex-row-reverse gap-2 ">
      <div className='w-12'></div>
      <ProfileButton />
      <DarkThemeToggle />
    </Panel>
  );
}
