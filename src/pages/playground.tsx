import Navbar from '@/components/Navbar';
import Image from 'next/image';

export default function Playground() {
  return (
    <Navbar
      backgroundColor="#000D67"
      leftComponent={<Image src="/images/logo-navbar-white.png" alt="TicketSky - Logo" height="120" width="120" />}
      centerComponent={<div>Teste</div>}
      rightComponent={<button>Botao</button>}
    />
  );
}