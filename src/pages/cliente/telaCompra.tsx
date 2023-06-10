import NavbarCliente from '@/components/cliente/NavbarCliente';
import Head from 'next/head';
import style from '../../styles/cliente/telaCompra.module.css';

export default function CheckoutPage() {
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
                <h2 className={style.nome}>Nome do Evento</h2>
              </div>
              <h1 className={style.textsm}>Nome do Promoter</h1>

              <div>
                <p className={style.valorTotal}>Valor Total: </p>
                <p className={style.precoTotal}>R$120.00</p>
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
                            <dd className={style.inline}>R$ 50.00</dd>
                          </div>

                          <div>
                            <dt className={style.inline}>Quantidade: </dt>
                            <dd className={style.inline}>2</dd>
                          </div>
                        </dl>
                      </div>
                    </li>

                    <li className={style.lidiv}>
                      <div>
                        <h3 className={style.h3div}>Ingresso Pista</h3>

                        <dl className={style.dlvid}>
                          <div>
                            <dt className={style.inline}>Valor Unitário: </dt>
                            <dd className={style.inline}>R$ 20.00</dd>
                          </div>

                          <div>
                            <dt className={style.inline}>Quantidade: </dt>
                            <dd className={style.inline}>1</dd>
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
                            <dd className={style.inline}>R$ 10.00</dd>
                          </div>

                          <div>
                            <dt className={style.inline}>Quantidade: </dt>
                            <dd className={style.inline}>0</dd>
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
