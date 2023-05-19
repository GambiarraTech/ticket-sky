import Carousel from '@/components/promoter/Carousel';
import Navbar from '@/components/promoter/NavBar';
import { getServerSideProps } from '@/lib/auth';

export default function Home() {
  return (
    <div>
      <Navbar>

      </Navbar>
    </div>
  );
}

export { getServerSideProps };
