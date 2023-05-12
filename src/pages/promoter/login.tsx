import Card from "@/components/promoter/card"
import style from '../../styles/promoter/acessopromoter.module.css'

export default function Login(){
    return(
        <Card titulo="Login">
            <form className={style.form}>

              <div className={style.areaInput}>
                  Email
                  <input className={style.input} type="email" />
              </div>
              <div className={style.areaInput}>
                  Senha
                  <input className={style.input} type="passowrd" />
              </div>
              <button className={style.button}>Entrar</button>
          </form>
        </Card>

    )
}
