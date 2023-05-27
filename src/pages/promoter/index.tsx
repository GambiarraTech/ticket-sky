import Carousel from '@/components/promoter/Carousel';
import NavbarPromoter from '@/components/promoter/NavbarPromoter';
import { getServerSideProps } from '@/lib/auth';

export default function Home() {
  return (
    <>
      <NavbarPromoter />
      <Carousel />
    </>
  );
}

export { getServerSideProps };
