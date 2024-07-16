import { Outlet } from 'react-router-dom';

const NormalLayout = () => {
  return (
    <>
      <Outlet />
      {/* <FloatingProfileButton /> */}
    </>
  );
};

export default NormalLayout;
