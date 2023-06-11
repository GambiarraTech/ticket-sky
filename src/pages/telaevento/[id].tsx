import * as router from '@/pages/api/router';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdOutlineLocationCity } from 'react-icons/md';
import CountInput from '../../components/cliente/CountInput';
import NavbarCliente from '../../components/cliente/NavbarCliente';
import style from '../../styles/cliente/telaEvento.module.css';

const font = Inter({ subsets: ['latin'], weight: '500' });

export default function TelaEvento(){
  
  const [quantidade, setQuantidade] = useState(1);
  const [evento, setEvento] = useState({
    evnome: '',
    descricao: '',
    pronome: '',
    banner: '',
    endnome: '',
    rua: '',
    numero: ''
  });

  const { query } = useRouter();
  const data = useState({
    service: "getEvento",
    id: query.id
  });

  function handleQtdChange(value: number) {
    setQuantidade(value);
  }

  useEffect(() => {
    router.apiPost(data, 'evento').then((value) => {
      if (value.result != null) {
        setEvento(value.result[0]);
      }
    });
  }, []);
  
  return (
    <main className={font.className}>
      <section className={style.section}>
        <NavbarCliente />
        <div>
          <div className={style.containerGeral}>
            <Image alt="Banner do Evento" className={style.imgBanner} width="400" height="400" src={'data:image/png;base64,' + evento.banner} />
            <div className={style.content}>
              <h2 className={style.promoterName}>{evento.pronome}</h2>
              <h1 className={style.eventName}>{evento.evnome}</h1>
              <p className={style.description}>{evento.descricao}</p>
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
                  <button className={style.buyButton} onClick={() => window.location.href = '../telaCompra/'+query.id}>Comprar</button>
                </div>
              </div>
              <div className={style.eventLocation}>{evento.endnome}</div>
              <div className={style.iconLocation}>
                <MdOutlineLocationCity size="40" />
                {evento.rua + ', ' + evento.numero}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
