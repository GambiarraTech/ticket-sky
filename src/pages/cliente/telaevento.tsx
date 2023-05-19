import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MdOutlineLocationCity } from 'react-icons/md';
import CountInput from '../../components/cliente/CountInput';
import NavbarCliente from '../../components/cliente/Navbar';
import style from '../../styles/cliente/telaEvento.module.css';

const font = Inter({ subsets: ['latin'], weight: '500' });

export default function TelaEvento() {
  const [quantidade, setQuantidade] = useState(1);

  function handleQtdChange(value: number) {
    setQuantidade(value);
  }

  return (
    <main className={font.className}>
      <section className={style.section}>
        <NavbarCliente />
        <div>
          <div className={style.containerGeral}>
            <Image alt="Banner do Evento" className={style.imgBanner} width="400" height="400" src="/quadrado.png" />
            <div className={style.content}>
              <h2 className={style.promoterName}>Nome do Promoter</h2>
              <h1 className={style.eventName}>Nome do Evento</h1>
              <p className={style.description}>TEXTO DA DESCRIÇÃO DO EVENTO texto da descrição do evento</p>
              <div className={style.eventInfo}>
                <div className={style.countPosition}>
                  <div className={style.eventInfoIndividual}>
                    VIP
                    <CountInput valorInicial={quantidade} onChange={handleQtdChange} />
                  </div>

                  <div className={style.eventInfoIndividual}>
                    Pista
                    <CountInput valorInicial={quantidade} onChange={handleQtdChange} />
                  </div>

                  <div className={style.eventInfoIndividual}>
                    Camarote
                    <CountInput valorInicial={quantidade} onChange={handleQtdChange} />
                  </div>
                </div>
                <div></div>
              </div>
              <div className={style.flexEvent}>
                <span className={style.price}>$58.00</span>
                <div className={style.positionBuyButton}>
                  <Link href="">
                    <button className={style.buyButton}>Comprar</button>
                  </Link>
                </div>
              </div>
              <div className={style.eventLocation}>Local do Evento</div>
              <div className={style.iconLocation}>
                <MdOutlineLocationCity size="40" />
                Av. João Durval Carneiro
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
