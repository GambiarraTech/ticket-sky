import styles from '@/styles/admin/Layout.module.css';
import Footer from './Footer';
import NavBar from './NavBar';
import SideMenu from './sideMenu';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SideMenu>
        <NavBar />
        <div className={styles.children}>{children}</div>
        <Footer bgcolor="#F6F6F5" color="#888181" />
      </SideMenu>
    </>
  );
}
