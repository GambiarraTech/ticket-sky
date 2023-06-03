import Footer from '@/components/Footer';
import Carousel from '@/components/promoter/Carousel';
import NavbarPromoter from '@/components/promoter/NavbarPromoter';
import { getServerSideProps } from '@/lib/auth';
import styles from '@/styles/promoter/home.module.css';

export default function Home() {
  return (
    <>
      <NavbarPromoter />
      <p className={styles.title}>Meus Eventos</p>
      <div>
        <Carousel />
      </div>

      <Footer color="white" />
    </>
  );
}

export { getServerSideProps };
