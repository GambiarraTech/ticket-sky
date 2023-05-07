import style from '@/styles/promoter/acessopromoter.module.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const font = Inter({ subsets: ['latin'], weight: '500' });

export default function PromoterSignUp() {
  return (
    <main className={style.bg}>
      <Head>
        <title>Cadastro de Promoter</title>
      </Head>
      <div className={style.generalText}>
        <Link href="http://localhost:3000/cliente">
          <AiOutlineArrowLeft size="55" className={style.arrowIcon} />
        </Link>
        <div className={style.centerText}>
          <Image
            className={style.logo}
            src="/images/logo-complete-white.png"
            alt="Logo White"
            height="200"
            width="200"
          />
          <div className={style.positionPromoter}>
            <h3 className={style.title}>Torne-se Promoter</h3>
          </div>
        </div>

        <div className={style.bgContent}>
          <form className={style.formSpace} onSubmit={(e) => e.preventDefault()}>
            <div>
              <label>CPF ou CNPJ:</label>
              <input className={style.input} required type="text" />
            </div>

            <div>
              <label>Nome:</label>
              <input className={style.input} required type="text" />
            </div>

            <div>
              <label>E-mail:</label>
              <input className={style.input} required type="email" />
            </div>

            <div>
              <label>Senha:</label>
              <input className={style.input} required type="password" />
            </div>

            <div>
              <label>Confirmar a Senha:</label>
              <input className={style.input} required type="password" />
            </div>

            <button className={style.button}>Solicitar Acesso Promoter</button>
          </form>
        </div>
      </div>
    </main>
  );
}
