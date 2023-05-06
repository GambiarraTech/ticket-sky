import Carousel from '@/components/promoter/carousel/Carousel';
import Navbar from '@/components/promoter/navbar/NavBar';

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
