import Footer from '@/components/Footer';
import Carousel from '@/components/promoter/Carousel';
import NavbarPromoter from '@/components/promoter/NavbarPromoter';
import { getServerSideProps } from '@/lib/auth';
import styles from '@/styles/promoter/home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <NavbarPromoter />
      <p className={styles.title}>Meus Eventos</p>
      <Carousel />
      <Footer color="white" />
    </div>
  );
}

export { getServerSideProps };
