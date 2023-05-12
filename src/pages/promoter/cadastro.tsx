import style from '@/styles/promoter/acessoPromoter.module.css';
import Head from 'next/head';
import Image from 'next/image';
import Footer from '@/components/admin/Footer';
import card from '../../components/promoter/card'
import Card from '../../components/promoter/card';
import { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import * as router from '../api/router'

export default function cadastroPromoter() {

    const[promoter] = useState({
        nome:'',
        email:'',
        senha:'',
        cpf_cnpj:'',
        service:'',
    })

    const { login } = useContext(AuthContext);
    const [showErro, setShowErro] = useState(false);
    async function cadastroPromoter(e:any) {
        e.preventDefault();
        console.log(promoter)
        promoter.service = 'cadastroPromoter';
        const res = router.apiPost(promoter,'promoter')
        let data
        res.then((value) => {
            data = value.result;
            login(data);
          });
          if(!data){
            setShowErro(true);
        };
    }
  return (
    <><Card titulo='Cadastro Promoter'>

          <form className={style.form}>
              <div className={style.areaInput}>
                  Nome:
                  <input className={style.input} type="text" required  onChange={(e)=>(promoter.nome = e.target.value)} />
              </div>
              <div className={style.areaInput}>
                  Email:
                  <input className={style.input} type="email" required  onChange={(e)=>(promoter.email = e.target.value)} />
              </div>
              <div className={style.areaInput}>
                  Senha:
                  <input className={style.input} type="password" required  onChange={(e)=>(promoter.senha = e.target.value)}/>
              </div>
              <div className={style.areaInput}>
                  Confirmar senha:
                  <input className={style.input} type="password" />
              </div>
              <div className={style.areaInput}>
                  CPF/CNPJ:
                  <input className={style.input} type="text" required  onChange={(e)=>(promoter.cpf_cnpj = e.target.value)}/>
              </div>
              <p className={style.mensagemErro}>{showErro ? "Email já cadastrado!":""}</p>
              <button className={style.button} onClick={cadastroPromoter}>Cadastrar</button>
          </form>

    </ Card></>
  );
}
