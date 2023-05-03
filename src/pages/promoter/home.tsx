import { Carousel } from '@/components/promoter/carousel/carousel';
import { Navbar } from '@/components/promoter/navbar/navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Carousel title="Eventos futuros"></Carousel>
    </div>
  );
}
