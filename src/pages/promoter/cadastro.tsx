import style from '@/styles/promoter/acessoPromoter.module.css';
import Head from 'next/head';
import Image from 'next/image';
import Footer from '@/components/admin/Footer';
import card from '../../components/promoter/card'
import Card from '../../components/promoter/card';

export default function PromoterSignUp() {
  return (
    <><Card titulo='Cadastro Promoter'>

          <form className={style.form}>
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
              <button className={style.button}>Cadastrar</button>
          </form>

    </ Card></>
  );
}
