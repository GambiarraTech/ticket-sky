
import { AuthContext } from '@/contexts/AuthContext';
import Layout from '@/components/admin/Layout';
import { useContext } from 'react';
import { getServerSideProps } from '@/lib/auth';

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

export { getServerSideProps };
