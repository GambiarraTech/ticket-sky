import { apiPost } from '@/pages/api/router';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdOutlineLocationCity } from 'react-icons/md';
import CountInput from '../../components/cliente/CountInput';
import NavbarCliente from '../../components/cliente/NavbarCliente';
import style from '../../styles/cliente/telaEvento.module.css';

const font = Inter({ subsets: ['latin'], weight: '500' });

export default async function TelaEvento() {
  const [quantidade, setQuantidade] = useState(1);
  const [evento, setEvento] = useState({
    nome: '',
    descricao: '',
  });

  const { query } = useRouter();

  async function getEvento() {
    const eventoGet = await apiPost({ id: query.id, service: 'getEvento' }, 'evento');

    evento.nome = eventoGet.result.nome;
    evento.descricao = eventoGet.result.descricao;
  }

  getEvento();

  console.log(evento);

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
              <h1 className={style.eventName}>{evento.nome}</h1>
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
                  <button className={style.buyButton}>Comprar</button>
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
