import SideMenu from '@/components/admin/SideMenu';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';

export default function Admin() {
  const { user, logout, autenticar } = useContext(AuthContext);

  autenticar('/admin/login');

  return (
    <>
      <SideMenu>
        <p>vai se fuder {user?.nome}</p>
        <button onClick={logout}> deslogar </button>
      </SideMenu>
      ;
    </>
  );
}
