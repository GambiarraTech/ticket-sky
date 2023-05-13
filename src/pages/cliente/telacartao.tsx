import { Inter } from 'next/font/google';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import NavbarCliente from '../../components/cliente/navbar/Navbar';
import style from '../../styles/cliente/telaCartao.module.css';

const font = Inter({ subsets: ['latin'], weight: '500' });

export default function TelaCartao() {
  return (
    <main className={font.className}>
      <section>
        <NavbarCliente Logado={true} />
        <div className={style.pagePos}>
          <Link href="http://localhost:3000/cliente">
            <AiOutlineArrowLeft size="55" className={style.arrowIconCartao} />
          </Link>
        </div>
        <div className={style.pageFormat}>
          <div className={style.pageStyle}>
            <div className={style.title}>Meu Cartão</div>
            <form className={style.formStyle}>
              <div className={style.inputFormat}>
                Nome do Titular
                <input type="text" className={style.primaryInputStyle} placeholder="Nome do Titular" />
              </div>
              <div className={style.inputFormat}>
                CPF do Titular
                <input type="text" className={style.primaryInputStyle} placeholder="CPF do Titular" />
              </div>
              <div className={style.inputFormat}>
                Número do Cartão
                <input type="text" className={style.primaryInputStyle} placeholder="Número do Cartão" />
              </div>
              <div className={style.secondFormat}>
                <div className={style.inputFormat}>
                  Validade
                  <input type="text" className={style.secondInputStyle} placeholder="Validade" />
                </div>
                <div className={style.inputFormat}>
                  CVV
                  <input type="text" className={style.secondInputStyle} placeholder="CVV" />
                </div>
              </div>
            </form>
            <div className={style.buttonDiv}>
              <button className={style.buttonDelete}>Remover</button>
              <button className={style.buttonSave}>Salvar</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
