import axios from 'axios';
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
  const api = axios.create({
    baseURL: 'http://localhost:3000/api',
  });
  const { query } = useRouter();
  const router = useRouter();

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
    quantidade: 0,
    valor: 0,
  });

  // Informações do ingresso camarote
  const [ingressoCamarote, setIngressoCamarote] = useState({
    quantidade: 0,
    valor: 0,
  });

  // Informações do ingresso backstage
  const [ingressoBack, setIngressoBack] = useState({
    quantidade: 0,
    valor: 0,
  });

  useEffect(() => {
    if (query.id != undefined) {
      // Pega informações do evento
      api
        .post(
          '/evento',
          {
            service: 'getEvento',
            id: query.id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then(function (response) {
          setEvento(response.data.result);
        })
        .catch(function (error) {
          return;
        });

      // Pega informações dos ingressos
      api
        .post(
          '/ingresso',
          {
            service: 'getIngressos',
            id: query.id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then(function (response) {
          if (response.data.result) {
            setIngressoBack(response.data.result[0]);
            setIngressoCamarote(response.data.result[1]);
            setIngressoVip(response.data.result[2]);
          }
        })
        .catch(function (error) {
          return;
        });
    }
  }, [query.id]);

  // Informações da compra para passar para a tela de pagamento
  const [infosCompra] = useState({
    qntVip: 0,
    qntdBack: 0,
    qntdCamarote: 0,
    valorTotal: 0,
    valorBack: 0,
    valorVip: 0,
    valorCamarote: 0,
    valorUnBack: 0,
    valorUnVip: 0,
    valorUnCamarote: 0,
    nomePromoter: '',
    nomeEvento: '',
  });

  const handleChange = (e: any, valor: any, tipo: string) => {
    if (tipo == 'vip') {
      infosCompra.qntVip = e;
      infosCompra.valorVip = e * valor;
    } else if (tipo == 'cam') {
      infosCompra.qntdCamarote = e;
      infosCompra.valorCamarote = e * valor;
    } else {
      infosCompra.qntdBack = e;
      infosCompra.valorBack = e * valor;
    }

    infosCompra.valorTotal = infosCompra.valorVip + infosCompra.valorCamarote + infosCompra.valorBack;

    if (document.getElementById('total') != null) {
      document.getElementById('total')!.innerHTML = ('$' + infosCompra.valorTotal) as unknown as string;
    }
  };
  const handleClick = (e: any) => {
    e.preventDefault();

    infosCompra.nomePromoter = evento.pronome;
    infosCompra.nomeEvento = evento.evnome;
    infosCompra.valorUnBack = ingressoBack.valor;
    infosCompra.valorUnCamarote = ingressoCamarote.valor;
    infosCompra.valorUnVip = ingressoVip.valor;

    router.push({
      pathname: '/telaCompra/' + JSON.stringify(infosCompra),
    });
  };
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
                  <div className={style.tipoIngresso}>Inteira</div>
                  <div className={style.countWrapper}>
                    <div className={style.eventInfoIndividual}>
                      VIP
                      <CountInput valorInicial={0} onChange={(e) => handleChange(e, ingressoVip.valor, 'vip')} />
                    </div>

                    <div className={style.eventInfoIndividual}>
                      BackStage
                      <CountInput valorInicial={0} onChange={(e) => handleChange(e, ingressoBack.valor, 'back')} />
                    </div>

                    <div className={style.eventInfoIndividual}>
                      Camarote
                      <CountInput valorInicial={0} onChange={(e) => handleChange(e, ingressoCamarote.valor, 'cam')} />
                    </div>
                  </div>

                  <div className={style.tipoIngresso}>Meia</div>
                  <div className={style.countWrapper}>
                    <div className={style.eventInfoIndividual}>
                      VIP
                      <CountInput valorInicial={0} onChange={(e) => handleChange(e, ingressoVip.valor, 'vip')} />
                    </div>

                    <div className={style.eventInfoIndividual}>
                      BackStage
                      <CountInput valorInicial={0} onChange={(e) => handleChange(e, ingressoBack.valor, 'back')} />
                    </div>

                    <div className={style.eventInfoIndividual}>
                      Camarote
                      <CountInput valorInicial={0} onChange={(e) => handleChange(e, ingressoCamarote.valor, 'cam')} />
                    </div>
                  </div>
                  <div className={style.tipoIngresso}>Gratuita</div>
                  <div className={style.countWrapper}>
                    <div className={style.eventInfoIndividual}>
                      VIP
                      <CountInput valorInicial={0} onChange={(e) => handleChange(e, ingressoVip.valor, 'vip')} />
                    </div>

                    <div className={style.eventInfoIndividual}>
                      BackStage
                      <CountInput valorInicial={0} onChange={(e) => handleChange(e, ingressoBack.valor, 'back')} />
                    </div>

                    <div className={style.eventInfoIndividual}>
                      Camarote
                      <CountInput valorInicial={0} onChange={(e) => handleChange(e, ingressoCamarote.valor, 'cam')} />
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
              <div className={style.flexEvent}>
                <span id="total" className={style.price}></span>
                <div className={style.positionBuyButton}>
                  <button className={style.buyButton} onClick={handleClick}>
                    Comprar
                  </button>
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
