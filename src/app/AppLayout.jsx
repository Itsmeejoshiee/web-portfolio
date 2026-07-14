import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '../shared/components/Footer';
import { Nav } from '../shared/components/Nav';
import { ScrollToHash } from './ScrollToHash';

export function AppLayout() {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollToHash />
      <Nav />
      <Outlet />
      <Footer variant={pathname === '/' ? 'home' : 'sub'} />
    </>
  );
}
