
import { AuthContext } from '@/contexts/AuthContext';
import Layout from '@/components/admin/Layout';
import { useContext } from 'react';

export default function Admin() {
  const { user, logout, autenticar } = useContext(AuthContext);

  autenticar('/admin/login');

  return (
    <>
      <Layout>
        <p>vai se fuder {user?.nome}</p>
        <button onClick={logout}> deslogar </button>
      </Layout>
      ;
    </>
  );
}
