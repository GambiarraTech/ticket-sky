import styles from '@/styles/admin/Layout.module.css';
import Footer from './Footer';
import NavBar from './NavBar';
import SideMenu from './SideMenu';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SideMenu>
        <div className={styles.children}>
          <NavBar />
          {children}
        </div>
        <Footer bgcolor="#F6F6F5" color="#888181" />
      </SideMenu>
    </>
  );
}
