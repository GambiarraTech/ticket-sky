import { AuthContext } from '@/contexts/AuthContext';
import axios from 'axios';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { MdOutlineLocationCity } from 'react-icons/md';
import NavbarPromoter from '../../components/promoter/NavbarPromoter';
import style from '../../styles/cliente/telaEvento.module.css';

const font = Inter({ subsets: ['latin'], weight: '500' });

/**
 * Componente para exibir os detalhes de um evento.
 */
export default function TelaEventoPromoter() {
  const { user } = useContext(AuthContext);

  //Configuração axios
  const api = axios.create({
    baseURL: 'http://localhost:3000/api',
  });

  const { query } = useRouter();
  const router = useRouter();
  var qtdVendida = 0;

  type qntVendida = {
    id_ingressos: any,
    service: ''
  }

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

  const qntVendida: qntVendida = {
      id_ingressos: [],
      service: '',
  }

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

          response.data.result.forEach((element: {id: number}) => {
             qntVendida.id_ingressos.push(element.id);
          });

        })
        .catch(function (error) {
          return;
        });
      }
      console.log(qntVendida.id_ingressos)
      api
        .post(
          '/pedido',
          {
            service: 'getVendidos',
            idEvento: evento.id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then(function (response) {
          console.log(response)
          qtdVendida = response.data.result;
          //qtdvendida está sempre 0
        })
        .catch(function (error) {
          return;
        });

  }, [query.id]);

  // OnClick do botão de comprar (vai para tela de pagamento)
  const handleClick = (e: any) => {
    if (user == undefined) {
      return alert('Você precisa estar logado para realizar uma compra!');
    }

    e.preventDefault();
  };

  return (
    <main className={font.className}>
      <section className={style.section}>
        <NavbarPromoter />
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
                <div>{qtdVendida}</div>
              </div>
            </div>
            <div className={style.countInputContainer}>



            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
