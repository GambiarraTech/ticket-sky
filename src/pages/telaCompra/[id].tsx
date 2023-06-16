import NavbarCliente from '@/components/cliente/NavbarCliente';
import { AuthContext } from '@/contexts/AuthContext';
import * as api from '@/pages/api/router';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import style from '../../styles/cliente/telaCompra.module.css';

/**
 * Componente para a página de finalização da compra.
 */
export default function CheckoutPage() {
  const { query } = useRouter();
  const router = useRouter();
  var possuiCartao = true;

  // Informações da compra vinda da tela de evento
  const obj = JSON.parse(query.id as string);
  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      event.preventDefault();
      event.returnValue = ''; // Mensagem vazia para o navegador
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const { user } = useContext(AuthContext);

  const [cartao, setCartao] = useState({
    titular: '',
    cpf: '',
    numero: '',
    vencimento: '',
    id_cliente: '',
    service: '',
  });

  const [pedido, setPedido] = useState({
    idCliente: '',
    service: '',
    ingressos: [{}] || null,
  });

  const apiEvento = axios.create({
    baseURL: 'http://localhost:3000/api',
  });

  async function enviaEmail() {
    const res = api.apiPost(
      {
        destinatario: user.email,
        assunto: 'Confirmação de Compra',
        mensagem: `A sua compra foi efetuada!`,
        anexos: null,
      },
      'services/emailService'
    );
    res.then((value) => {});
  }

  function constroiPedido() {
    var service = 'cadastroPedido';

    //vip
    if (obj.qntVipInt > 0) {
      pedido.ingressos.push({
        id_ingresso: obj.idVip,
        tipoIngresso: 1,
        quantidade: obj.qntVipInt,
      });
    }

    if (obj.qntVipMeia > 0) {
      pedido.ingressos.push({
        id_ingresso: obj.idVip,
        tipoIngresso: 2,
        quantidade: obj.qntVipMeia,
      });
    }
    if (obj.qntVipGrat > 0) {
      pedido.ingressos.push({
        id_ingresso: obj.idVip,
        tipoIngresso: 3,
        quantidade: obj.qntVipGrat,
      });
    }

    //camarote
    if (obj.qntdCamaroteInt > 0) {
      pedido.ingressos.push({
        id_ingresso: obj.idCamarote,
        tipoIngresso: 1,
        quantidade: obj.qntdCamaroteInt,
      });
    }
    if (obj.qntdCamaroteMeia > 0) {
      pedido.ingressos.push({
        id_ingresso: obj.idCamarote,
        tipoIngresso: 2,
        quantidade: obj.qntdCamaroteInt,
      });
    }
    if (obj.qntdCamaroteGrat > 0) {
      pedido.ingressos.push({
        id_ingresso: obj.idCamarote,
        tipoIngresso: 3,
        quantidade: obj.qntdCamaroteGrat,
      });
    }

    //back
    if (obj.qntdBackInt > 0) {
      pedido.ingressos.push({
        id_ingresso: obj.idBack,
        tipoIngresso: 1,
        quantidade: obj.qntdBackInt,
      });
    }
    if (obj.qntdBackMeia > 0) {
      pedido.ingressos.push({
        id_ingresso: obj.idBack,
        tipoIngresso: 2,
        quantidade: obj.qntdBackMeia,
      });
    }
    if (obj.qntdBackGrat > 0) {
      pedido.ingressos.push({
        id_ingresso: obj.idBack,
        tipoIngresso: 3,
        quantidade: obj.qntdBackGrat,
      });
    }

    if (pedido.ingressos.length > 1) {
      service = 'compra';
    }

    pedido.idCliente = user.id;
    pedido.service = service;

    return pedido;
  }

  async function cadastrarCartao() {
    cartao.id_cliente = user.id;
    cartao.service = 'saveCartao';
    await api.apiPost(cartao, 'cartao');
  }

  async function cadastrarPedido() {
    await api.apiPost(constroiPedido(), 'pedido');
  }

  useEffect(() => {
    api.apiPost({ id_cliente: user.id }, 'cartao').then((value) => {
      if (value.result != null) {
        setCartao(value.result);
      } else {
        possuiCartao = false;
      }
    });
  }, []);

  const handleClick = (e: any) => {
    e.preventDefault();
    const cvv = (document.getElementById('cvv') as HTMLInputElement).value;

    if (cartao.cpf == '' || cartao.titular == '' || cartao.numero == '' || cartao.vencimento == '' || cvv == '') {
      return alert('As informações do cartão são obrigatórias para finalizar a compra!');
    }

    if (!possuiCartao) {
      cadastrarCartao();
    }

    cadastrarPedido();
    enviaEmail();

    alert('Compra efetuada com sucesso!');
  };

  return (
    <>
      <Head>
        <title>TicketSky - Checkout</title>
      </Head>
      <NavbarCliente />
      <section className={style.section}>
        <div className={style.firstdiv}>
          <div className={style.leftbg}>
            <div className={style.leftdiv}>
              <h1 className={style.detalheEvento}>Detalhes do Evento:</h1>
              <div className={style.nomediv}>
                <h2 className={style.nome}>{obj.nomeEvento}</h2>
              </div>
              <h1 className={style.textsm}>{obj.nomePromoter}</h1>

              <div>
                <p className={style.valorTotal}>Valor Total: </p>
                <p className={style.precoTotal}>{'$' + obj.valorTotal}</p>
              </div>

              <div>
                <div className={style.flowRoot}>
                  <ul className={style.uldiv}>
                    <li className={style.lidiv}>
                      <div>
                        <h3 className={style.h3div}>Ingresso VIP</h3>

                        <dl className={style.dlvid}>
                          <div>
                            <dt className={style.inline}>Valor Unitário: </dt>
                            <dd className={style.inline}>{'$' + obj.valorUnVip}</dd>
                          </div>

                          <div>
                            <dt className={style.inline}>Quantidade: </dt>
                            <dd className={style.inline}>{'Inteira: ' + obj.qntVipInt}</dd>
                            <dd className={style.inline}>{'Meia: ' + obj.qntVipMeia}</dd>
                            <dd className={style.inline}>{'Gratuita: ' + obj.qntVipGrat}</dd>
                          </div>
                        </dl>
                      </div>
                    </li>

                    <li className={style.lidiv}>
                      <div>
                        <h3 className={style.h3div}>Ingresso Backstage</h3>

                        <dl className={style.dlvid}>
                          <div>
                            <dt className={style.inline}>Valor Unitário: </dt>
                            <dd className={style.inline}>{'$' + obj.valorUnBack}</dd>
                          </div>

                          <div>
                            <dt className={style.inline}>Quantidade: </dt>
                            <dd className={style.inline}>{'Inteira: ' + obj.qntdBackInt}</dd>
                            <dd className={style.inline}>{'Meia: ' + obj.qntdBackMeia}</dd>
                            <dd className={style.inline}>{'Gratuita: ' + obj.qntdBackGrat}</dd>
                          </div>
                        </dl>
                      </div>
                    </li>

                    <li className={style.lidiv}>
                      <div>
                        <h3 className={style.h3div}>Ingresso Camarote</h3>

                        <dl className={style.dlvid}>
                          <div>
                            <dt className={style.inline}>Valor Unitário: </dt>
                            <dd className={style.inline}>{'$' + obj.valorUnCamarote}</dd>
                          </div>

                          <div>
                            <dt className={style.inline}>Quantidade: </dt>
                            <dd className={style.inline}>{'Inteira: ' + obj.qntdCamaroteInt}</dd>
                            <dd className={style.inline}>{'Meia: ' + obj.qntdCamaroteMeia}</dd>
                            <dd className={style.inline}>{'Gratuita: ' + obj.qntdCamaroteGrat}</dd>
                          </div>
                        </dl>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className={style.rightdiv}>
            <div className={style.rightFormat}>
              <form className={style.formdiv}>
                <div className={style.colspan6}>
                  <label htmlFor="CPF" className={style.label}>
                    CPF do Titular
                  </label>

                  <input
                    type="text"
                    id="CpfTitular"
                    defaultValue={cartao.cpf}
                    className={style.input}
                    onChange={(e) => (cartao.cpf = e.target.value)}
                  />
                </div>

                <div className={style.colspan6}>
                  <label htmlFor="titularNome" className={style.label}>
                    Nome do Titular
                  </label>

                  <input
                    type="text"
                    id="NomeTitular"
                    defaultValue={cartao.titular}
                    className={style.input}
                    onChange={(e) => (cartao.titular = e.target.value)}
                  />
                </div>

                <div className={style.colspan6}>
                  <label htmlFor="numeroCartao" className={style.label}>
                    Numero do Cartão
                  </label>

                  <input
                    type="text"
                    id="NumeroCartao"
                    className={style.input}
                    defaultValue={cartao.numero}
                    maxLength={16}
                    onChange={(e) => (cartao.numero = e.target.value)}
                  />
                </div>

                <div className={style.colspan6}>
                  <label htmlFor="numeroCartao" className={style.label}>
                    Validade
                  </label>

                  <input
                    type="text"
                    id="validade"
                    className={style.input}
                    maxLength={5}
                    defaultValue={cartao.vencimento}
                    onChange={(e) => (cartao.vencimento = e.target.value)}
                  />
                </div>

                <div className={style.colspan6}>
                  <label htmlFor="numeroCartao" className={style.label}>
                    CVV
                  </label>

                  <input type="text" id="cvv" className={style.input} maxLength={3} />
                </div>

                <div className={style.colspan6}>
                  <button className={style.botaoCompra} onClick={handleClick}>
                    Concluir Compra
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
