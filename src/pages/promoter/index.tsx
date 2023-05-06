import Carousel from '@/components/promoter/Carousel';
import Navbar from '@/components/promoter/NavBar';

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
