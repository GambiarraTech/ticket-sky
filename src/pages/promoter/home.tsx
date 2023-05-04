import { Carousel } from '@/components/promoter/carousel/carousel';
import { Navbar } from '@/components/promoter/navbar/navbar';

export default function Home() {
  return (
    <div>
      <Navbar>
        <Carousel title="Eventos futuros"></Carousel>
        <Carousel title="Eventos encerrados"></Carousel>
        <Carousel title="Eventos encerrados"></Carousel>
        <Carousel title="Eventos encerrados"></Carousel>
      </Navbar>
    </div>
  );
}
