/**
Componente Layout.
@param children Os elementos filhos a serem renderizados dentro do layout.
*/

import styles from '@/styles/admin/Layout.module.css';
import Footer from './Footer';
import NavBarAdmin from './NavBarAdmin';
import SideMenu from './sideMenu';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SideMenu>
        <NavBarAdmin />
        <div className={styles.children}>{children}</div>
        <Footer bgcolor="#F6F6F5" color="#888181" />
      </SideMenu>
    </>
  );
}
