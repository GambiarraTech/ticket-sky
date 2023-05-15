import Layout from '@/components/admin/Layout';
import { AuthContext } from '@/contexts/AuthContext';
import { getServerSideProps } from '@/lib/auth';
import { useContext } from 'react';

export default function Admin() {
  const { user, logout } = useContext(AuthContext);

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

export { getServerSideProps }


