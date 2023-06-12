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

export default function TelaEvento() {
  const { query } = useRouter();

  // Informações da compra para passar para a tela de pagamento
  const [infosCompra] = useState({
    qntVip: 0,
    qntdBack: 0,
    qntdCamarote: 0,
    valorTotal: 0,
    valorBack: 0,
    valorVip: 0,
    valorCamarote: 0,
  });

  //Informações da tela
  const [evento, setEvento] = useState({
    id: '',
    evnome: '',
    descricao: '',
    pronome: '',
    banner: '',
    endnome: '',
    rua: '',
    numero: '',
  });

  // Informações do ingresso vip
  const [ingressoVip, setIngressoVip] = useState({
    quantidade: '',
    valor: '',
  });

  // Informações do ingresso camarote
  const [ingressoCamarote, setIngressoCamarote] = useState({
    quantidade: '',
    valor: '',
  });

  // Informações do ingresso backstage
  const [ingressoBack, setIngressoBack] = useState({
    quantidade: '',
    valor: '',
  });

  // Body requisições
  const data = useState({
    service: 'getEvento',
    id: query.id,
  });

  // Puxa as informções do evento
  useEffect(() => {
    router.apiPost(data, 'evento').then((value) => {
      if (value.result != null) {
        setEvento(value.result[0]);
      }
      router.apiGet(`ingresso?id=${query.id}`).then((value) => {
        if (value.result != null) {
          setIngressoBack(value.result);
          setIngressoCamarote(value.result);
          setIngressoVip(value.result);
        }
      });
    });
  }, []);

  return (
    <main className={font.className}>
      <section className={style.section}>
        <NavbarCliente />
        <div>
          <div className={style.containerGeral}>
            <Image
              alt="Banner do Evento"
              className={style.imgBanner}
              width="400"
              height="400"
              src={'data:image/png;base64,' + evento.banner}
            />
            <div className={style.content}>
              <h2 className={style.promoterName}>{evento.pronome}</h2>
              <h1 className={style.eventName}>{evento.evnome}</h1>
              <p className={style.description}>{evento.descricao}</p>
              <div className={style.eventInfo}>
                <div className={style.countPosition}>
                  <div className={style.eventInfoIndividual}>
                    VIP
                    <CountInput valorInicial={0} onChange={(e) => (infosCompra.qntVip = e)} />
                  </div>

                  <div className={style.eventInfoIndividual}>
                    BackStage
                    <CountInput valorInicial={0} onChange={(e) => (infosCompra.qntdBack = e)} />
                  </div>

                  <div className={style.eventInfoIndividual}>
                    Camarote
                    <CountInput valorInicial={0} onChange={(e) => (infosCompra.qntdCamarote = e)} />
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
