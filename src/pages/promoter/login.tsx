import Card from "@/components/promoter/card"
import style from '../../styles/promoter/acessopromoter.module.css'
import { useContext, useState } from "react"
import * as router from '../../pages/api/router';
import { AuthContext } from "@/contexts/AuthContext";

export default function Login(){

    const[promoter] = useState({
        email:'',
        senha:'',
        service:'',
    })

    const { login } = useContext(AuthContext);
    const [showErro, setShowErro] = useState(false);

    async function loginPromoter(e:any) {
        e.preventDefault();
        console.log(promoter)
        promoter.service = 'loginPromoter';
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


    return(
        <Card titulo="Login">
            <form className={style.form}>

              <div className={style.areaInput}>
                  Email:
                  <input className={style.input} type="email" required onChange={(e)=>(promoter.email = e.target.value)}/>
              </div>
              <div className={style.areaInput}>
                  Senha:
                  <input className={style.input} type="passowrd"required onChange={(e)=>(promoter.senha = e.target.value)}/>
              </div>
              <a href="">Esqueceu sua senha?</a>
              <p className={style.mensagemErro}>{showErro ? "Usuario ou senha incorreta!":""}</p>
              <button className={style.button} name="loginPromoter" onClick={loginPromoter}>Entrar</button>
          </form>
        </Card>

    )
}
