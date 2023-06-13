import NavbarCliente from '@/components/cliente/NavbarCliente';
import Head from 'next/head';
import { useRouter } from 'next/router';
import style from '../../styles/cliente/telaCompra.module.css';

export default function CheckoutPage() {
  const {query} = useRouter();

  const obj = JSON.parse(query.id as string);
  
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
                <p className={style.precoTotal}>{'$'+ obj.valorTotal}</p>
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
                            <dd className={style.inline}>{'$'+ obj.valorUnVip}</dd>
                          </div>

                          <div>
                            <dt className={style.inline}>Quantidade: </dt>
                            <dd className={style.inline}>{'Inteira: '+obj.qntVipInt}</dd>
                            <dd className={style.inline}>{'Meia: '+obj.qntVipMeia}</dd>
                            <dd className={style.inline}>{'Gratuita: '+obj.qntVipGrat}</dd>
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
                            <dd className={style.inline}>{'$'+ obj.valorUnBack}</dd>
                          </div>

                          <div>
                            <dt className={style.inline}>Quantidade: </dt>
                            <dd className={style.inline}>{'Inteira: '+obj.qntdBackInt}</dd>
                            <dd className={style.inline}>{'Meia: '+obj.qntdBackMeia}</dd>
                            <dd className={style.inline}>{'Gratuita: '+obj.qntdBackGrat}</dd>
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
                            <dd className={style.inline}>{'$'+ obj.valorUnCamarote}</dd>
                          </div>

                          <div>
                            <dt className={style.inline}>Quantidade: </dt>
                            <dd className={style.inline}>{'Inteira: '+obj.qntdCamaroteInt}</dd>
                            <dd className={style.inline}>{'Meia: '+obj.qntdCamaroteMeia}</dd>
                            <dd className={style.inline}>{'Gratuita: '+obj.qntdCamaroteGrat}</dd>
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

                  <input type="text" id="CpfTitular" className={style.input} />
                </div>

                <div className={style.colspan6}>
                  <label htmlFor="titularNome" className={style.label}>
                    Nome do Titular
                  </label>

                  <input type="text" id="NomeTitular" className={style.input} />
                </div>

                <div className={style.colspan6}>
                  <label htmlFor="numeroCartao" className={style.label}>
                    Numero do Cartão
                  </label>

                  <input type="text" id="NumeroCartao" className={style.input} />
                </div>

                <div className={style.colspan6}>
                  <label htmlFor="numeroCartao" className={style.label}>
                    Validade
                  </label>

                  <input type="text" id="NumeroCartao" className={style.input} />
                </div>

                <div className={style.colspan6}>
                  <label htmlFor="numeroCartao" className={style.label}>
                    CVV
                  </label>

                  <input type="text" id="NumeroCartao" className={style.input} />
                </div>

                <div className={style.colspan6}>
                  <button className={style.botaoCompra}>Concluir Compra</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
