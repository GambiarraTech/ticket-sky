import CountInput from '@/components/cliente/CountInput';
import { AuthContext } from '@/contexts/AuthContext';
import axios from 'axios';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { MdOutlineLocationCity } from 'react-icons/md';
import NavbarCliente from '../../components/cliente/NavbarCliente';
import style from '../../styles/cliente/telaEvento.module.css';

const font = Inter({ subsets: ['latin'], weight: '500' });

/**
 * Componente para exibir os detalhes de um evento.
 */
export default function TelaEvento() {
  const { user } = useContext(AuthContext);

  //Configuração axios
  const api = axios.create({
    baseURL: 'http://localhost:3000/api',
  });

  const { query } = useRouter();
  const router = useRouter();

  //Informações da tela (referente ao evento)
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
    id: 0,
    quantidade: 0,
    valor: 0,
  });

  // Informações do ingresso camarote
  const [ingressoCamarote, setIngressoCamarote] = useState({
    id: 0,
    quantidade:0,
    valor:0
  });

  // Informações do ingresso backstage
  const [ingressoBack, setIngressoBack] = useState({
    id: 0,
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
    idVip: 0,
    qntVipInt: 0,
    qntVipMeia: 0,
    qntVipGrat: 0,
    idBack: 0,
    qntdBackInt: 0,
    qntdBackMeia: 0,
    qntdBackGrat: 0,
    idCamarote: 0,
    qntdCamaroteInt: 0,
    qntdCamaroteMeia: 0,
    qntdCamaroteGrat: 0,
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

  const handleChange = (e: any, valor: any, tipo: string, pag: string | null) => {
    var diminui = false;

    if (tipo == 'vip') {

      if (pag == 'meia') {
        if ((infosCompra.qntVipMeia == undefined ? 0 : infosCompra.qntVipMeia) > e) {
          diminui = true;
        }

        infosCompra.qntVipMeia = e;
      } else if (pag == 'int') {
        if ((infosCompra.qntVipInt == undefined ? 0 : infosCompra.qntVipInt) > e) {
          diminui = true;
        }
        infosCompra.qntVipInt = e;
      } else if (pag == 'grat') {
        infosCompra.qntVipGrat = e;
      }

      if (pag != 'grat') {
        if (!diminui) {
          infosCompra.valorVip += typeof valor == 'string' ? parseInt(valor, 10) : valor;
        } else {
          infosCompra.valorVip -= typeof valor == 'string' ? parseInt(valor, 10) : valor;
        }
      }

    } else if (tipo == 'cam') {
      if (pag == 'meia') {
        if ((infosCompra.qntdCamaroteMeia == undefined ? 0 : infosCompra.qntdCamaroteMeia) > e) {
          diminui = true;
        }

        infosCompra.qntdCamaroteMeia = e;
      } else if (pag == 'int') {
        if ((infosCompra.qntdCamaroteInt == undefined ? 0 : infosCompra.qntdCamaroteInt) > e) {
          diminui = true;
        }
        infosCompra.qntdCamaroteInt = e;
      } else if (pag == 'grat') {
        infosCompra.qntdCamaroteGrat = e;
      }

      if (pag != 'grat') {
        if (!diminui) {
          infosCompra.valorCamarote += typeof valor == 'string' ? parseInt(valor, 10) : valor;
        } else {
          infosCompra.valorCamarote -= typeof valor == 'string' ? parseInt(valor, 10) : valor;
        }
      }
    } else {
      if (pag == 'meia') {
        if ((infosCompra.qntdBackMeia == undefined ? 0 : infosCompra.qntdBackMeia) > e) {
          diminui = true;
        }

        infosCompra.qntdBackMeia = e;
      } else if (pag == 'int') {
        if ((infosCompra.qntdBackInt == undefined ? 0 : infosCompra.qntdBackInt) > e) {
          diminui = true;
        }
        infosCompra.qntdBackInt = e;
      } else if (pag == 'grat') {
        infosCompra.qntdBackGrat = e;
      }

      if (pag != 'grat') {
        if (!diminui) {
          infosCompra.valorBack += typeof valor == 'string' ? parseInt(valor, 10) : valor;
        } else {
          infosCompra.valorBack -= typeof valor == 'string' ? parseInt(valor, 10) : valor;
        }
      }
    }

    infosCompra.valorTotal = infosCompra.valorVip + infosCompra.valorCamarote + infosCompra.valorBack;

    if (document.getElementById('total') != null) {
      document.getElementById('total')!.innerHTML = ('Total: $' + infosCompra.valorTotal) as unknown as string;
    }
  };

  // OnClick do botão de comprar (vai para tela de pagamento)
  const handleClick = (e: any) => {
    if (user == undefined) {
      return alert('Você precisa estar logado para realizar uma compra!');
    }

    e.preventDefault();

    infosCompra.nomePromoter = evento.pronome;
    infosCompra.nomeEvento = evento.evnome;
    infosCompra.idVip = ingressoVip.id;
    infosCompra.idBack = ingressoBack.id;
    infosCompra.idCamarote = ingressoCamarote.id;
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
            <div className={style.conteinerInfos}>
              <div className={style.containerImg}>
                <Image
                  alt="Banner do Evento"
                  className={style.imgBanner}
                  width="500"
                  height="400"
                  src={'data:image/png;base64,' + evento.banner}
                />
              </div>

              <div>
                <h2 className={style.promoterName}>{'Promoter: ' + evento.pronome}</h2>
                <h1 className={style.eventName}>{evento.evnome}</h1>
                <p className={style.description}>{evento.descricao}</p>
                <div className={style.eventLocation}>{evento.endnome}</div>
                <div className={style.iconLocation}>
                  <MdOutlineLocationCity size="40" />
                  {evento.rua + ', ' + evento.numero}
                </div>
              </div>
            </div>
            <div className={style.countInputContainer}>
              <div className={style.conteinerCount}>
                <div className={style.countPosition}>
                  <div className={style.setor}>{'Vip (R$' + ingressoVip.valor + ')'}</div>
                  <div className={style.tipoIngresso}>
                    Inteira
                    <CountInput valorInicial={0} max={ingressoVip.quantidade} onChange={(e) => handleChange(e, ingressoVip.valor, 'vip', 'int')} />
                  </div>
                  <div className={style.tipoIngresso}>
                    Meia
                    <CountInput
                      valorInicial={0}
                      max={ingressoVip.quantidade}
                      onChange={(e) => handleChange(e, ingressoVip.valor * 0.5, 'vip', 'meia')}
                    />
                  </div>
                  <div className={style.tipoIngresso}>
                    Gratuita
                    <CountInput max={ingressoVip.quantidade} valorInicial={0} onChange={(e) => handleChange(e, 0, 'vip', 'grat')} />
                  </div>
                </div>
                <div className={style.countPosition}>
                  <div className={style.setor}>{'BackStage (R$' + ingressoBack.valor + ')'}</div>

                  <div className={style.tipoIngresso}>
                    Inteira
                    <CountInput max={ingressoBack.quantidade} valorInicial={0} onChange={(e) => handleChange(e, ingressoBack.valor, 'back', 'int')} />
                  </div>
                  <div className={style.tipoIngresso}>
                    Meia
                    <CountInput
                      max={ingressoBack.quantidade}
                      valorInicial={0}
                      onChange={(e) => handleChange(e, ingressoBack.valor * 0.5, 'back', 'meia')}
                    />
                  </div>
                  <div className={style.tipoIngresso}>
                    Gratuita
                    <CountInput max={ingressoBack.quantidade} valorInicial={0} onChange={(e) => handleChange(e, 0, 'back', 'grat')} />
                  </div>
                </div>
                <div className={style.countPosition}>
                  <div className={style.setor}>{'Camarote (R$' + ingressoCamarote.valor + ')'}</div>

                  <div className={style.tipoIngresso}>
                    Inteira
                    <CountInput
                      max={ingressoCamarote.quantidade}
                      valorInicial={0}
                      onChange={(e) => handleChange(e, ingressoCamarote.valor, 'cam', 'int')}
                    />
                  </div>
                  <div className={style.tipoIngresso}>
                    Meia
                    <CountInput
                    max={ingressoCamarote.quantidade}
                      valorInicial={0}
                      onChange={(e) => handleChange(e, ingressoCamarote.valor * 0.5, 'cam', 'meia')}
                    />
                  </div>
                  <div className={style.tipoIngresso}>
                    Gratuita
                    <CountInput max={ingressoCamarote.quantidade} valorInicial={0} onChange={(e) => handleChange(e, 0, 'cam', 'grat')} />
                  </div>
                </div>
              </div>

              <div className={style.positionBuyButton}>
                <span id="total" className={style.price}>
                  Total: $0
                </span>
                <button className={style.buyButton} onClick={handleClick}>
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
