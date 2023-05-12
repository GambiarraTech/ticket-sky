import style from '@/styles/promoter/acessoPromoter.module.css';
import Head from 'next/head';
import Image from 'next/image';
import Footer from '@/components/admin/Footer';

export default function PromoterSignUp() {
  return (
    <main className={style.bg}>
      <Head>
        <title>Cadastro de Promoter</title>
      </Head>
      <div className={style.centerText}>
        <Image className={style.logo} src="/images/logo-complete-white.png" alt="Logo White" height="200" width="200" />
      </div>

      <div className={style.card}>
        <form className={style.form}>
          <div className={style.centerText}>Login</div>

          <div className={style.areaInput}>
            Email
            <input className={style.input} type="email" />
          </div>
          <div className={style.areaInput}>
            Senha
            <input className={style.input} type="passowrd" />
          </div>
          <button>Entrar</button>
        </form>
        <div className={style.divisor}></div>
        <form className={style.form}>
          <div className={style.centerText}>Cadastro</div>
          <div className={style.areaInput}>
            Nome
            <input className={style.input} type="text" />
          </div>
          <div className={style.areaInput}>
            Email
            <input className={style.input} type="email" />
          </div>
          <div className={style.areaInput}>
            Senha
            <input className={style.input} type="password" />
          </div>
          <div className={style.areaInput}>
            Confirmar senha
            <input className={style.input} type="password" />
          </div>
          <div className={style.areaInput}>
            CPF/CNPJ
            <input className={style.input} type="text" />
          </div>
          <button>Cadastrar</button>
        </form>
      </div>
<Footer />
    </main>
  );
}
