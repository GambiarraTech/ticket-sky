import CountInput from '@/components/cliente/CountInput';
import axios from 'axios';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdOutlineLocationCity } from 'react-icons/md';
import NavbarCliente from '../../components/cliente/NavbarCliente';
import style from '../../styles/cliente/telaEvento.module.css';

const font = Inter({ subsets: ['latin'], weight: '500' });

export default function TelaEvento() {
  
  const api = axios.create({
    baseURL: 'http://localhost:3000/api'
  });
  const {query} = useRouter();
  const router = useRouter();

  //Informações da tela
  const [evento, setEvento] = useState({
    id: '',
    evnome: '',
    descricao: '',
    pronome: '',
    banner: '',
    endnome: '',
    rua: '',
    numero: '',
  });

  // Informações do ingresso vip
  const [ingressoVip, setIngressoVip] = useState({
    quantidade: 0,
    valor: 0,
    qntMeia: 0,
    qntInt: 0,
    qntGrat: 0
  });

  // Informações do ingresso camarote
  const [ingressoCamarote, setIngressoCamarote] = useState({
    quantidade:0,
    valor:0,
    qntMeia: 0,
    qntInt: 0,
    qntGrat: 0
  });

  // Informações do ingresso backstage
  const [ingressoBack, setIngressoBack] = useState({
    quantidade: 0,
    valor: 0,
    qntMeia: 0,
    qntInt: 0,
    qntGrat: 0
  });
  
  useEffect(() => {

    if(query.id != undefined){
      
      // Pega informações do evento
      api.post('/evento', {
        service: 'getEvento',
        id: query.id
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      )
      .then(function (response) {
        setEvento(response.data.result);
      })
      .catch(function (error) {
        return;
      });
      
      // Pega informações dos ingressos
      api.post('/ingresso', {
        service: 'getIngressos',
        id: query.id
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      )
      .then(function (response) {
        if(response.data.result){
          setIngressoBack(response.data.result[0]);
          setIngressoCamarote(response.data.result[1]);
          setIngressoVip(response.data.result[2]);
        }
        
      })
      .catch(function (error) {
        return;
      });
    }
    
  }, [query.id])

  // Informações da compra para passar para a tela de pagamento
  const [infosCompra] = useState({
    qntVip: 0,
    qntdBack: 0,
    qntdCamarote: 0,
    valorTotal: 0,
    valorBack: 0,
    valorVip: 0,
    valorCamarote: 0,
    valorUnBack: 0,
    valorUnVip: 0,
    valorUnCamarote: 0,
    nomePromoter: '',
    nomeEvento: '',
  });
   
  const handleChange = (e: any, valor: any, tipo: string, pag: string | null) => {
    
    var diminui = false;  

    if(tipo == 'vip'){

      if(pag == 'meia'){
        
        if((ingressoVip.qntMeia == undefined? 0 : ingressoVip.qntMeia) > e){
          diminui = true;
        }

        ingressoVip.qntMeia = e;
      }
      else if(pag == 'int'){
        
        if((ingressoVip.qntInt == undefined? 0 : ingressoVip.qntInt) > e){
          diminui = true;
        }
        ingressoVip.qntInt = e;
      }
      else if(pag == 'grat'){
        
        ingressoVip.qntGrat = e;
      }
      
      if(pag != 'grat'){
        if(!diminui){

          infosCompra.valorVip += (typeof valor == 'string'? parseInt(valor, 10) : valor);
        }else{
          infosCompra.valorVip -= (typeof valor == 'string'? parseInt(valor, 10) : valor);
        }
      }
      infosCompra.qntVip = (ingressoVip.qntMeia == undefined? 0 : ingressoVip.qntMeia) + (ingressoVip.qntInt == undefined? 0 : ingressoVip.qntInt) + (ingressoVip.qntGrat == undefined? 0 : ingressoVip.qntGrat);
    }

    else if(tipo == 'cam'){
      if(pag == 'meia'){
        
        if((ingressoCamarote.qntMeia == undefined? 0 : ingressoCamarote.qntMeia) > e){
          diminui = true;
        }

        ingressoCamarote.qntMeia = e;
      }
      else if(pag == 'int'){
        
        if((ingressoCamarote.qntInt == undefined? 0 : ingressoCamarote.qntInt) > e){
          diminui = true;
        }
        ingressoCamarote.qntInt = e;
      }
      else if(pag == 'grat'){
        
        ingressoCamarote.qntGrat = e;
      }
      
      if(pag != 'grat'){
        if(!diminui){

          infosCompra.valorCamarote += (typeof valor == 'string'? parseInt(valor, 10) : valor);
        }else{
          infosCompra.valorCamarote -= (typeof valor == 'string'? parseInt(valor, 10) : valor);
        }
      }

      infosCompra.qntdCamarote = (ingressoCamarote.qntMeia == undefined? 0 : ingressoCamarote.qntMeia) + (ingressoCamarote.qntInt == undefined? 0 : ingressoCamarote.qntInt) + (ingressoCamarote.qntGrat == undefined? 0 : ingressoCamarote.qntGrat);
      
    }else{
      if(pag == 'meia'){
        
        if((ingressoBack.qntMeia == undefined? 0 : ingressoBack.qntMeia) > e){
          diminui = true;
        }

        ingressoBack.qntMeia = e;
      }
      else if(pag == 'int'){
        
        if((ingressoBack.qntInt == undefined? 0 : ingressoBack.qntInt) > e){
          diminui = true;
        }
        ingressoBack.qntInt = e;
      }
      else if(pag == 'grat'){
        
        ingressoBack.qntGrat = e;
      }
      
      if(pag != 'grat'){
        if(!diminui){

          infosCompra.valorBack += (typeof valor == 'string'? parseInt(valor, 10) : valor);
        }else{
          infosCompra.valorBack -= (typeof valor == 'string'? parseInt(valor, 10) : valor);
        }
      }
      infosCompra.qntdBack = (ingressoBack.qntMeia == undefined? 0 : ingressoBack.qntMeia) + (ingressoBack.qntInt == undefined? 0 : ingressoBack.qntInt) + (ingressoBack.qntGrat == undefined? 0 : ingressoBack.qntGrat);
    }

    infosCompra.valorTotal = infosCompra.valorVip + infosCompra.valorCamarote + infosCompra.valorBack;
    
    if(document.getElementById('total') != null){

      document.getElementById('total')!.innerHTML = 'Total: $' + infosCompra.valorTotal as unknown as string;
    }
    
  }

  // OnClick do botão de comprar (vai para tela de pagamento)
  const handleClick = (e: any) => {
    e.preventDefault()

    infosCompra.nomePromoter = evento.pronome;
    infosCompra.nomeEvento = evento.evnome;
    infosCompra.valorUnBack = ingressoBack.valor;
    infosCompra.valorUnCamarote = ingressoCamarote.valor;
    infosCompra.valorUnVip = ingressoVip.valor;
    
    router.push({
      pathname: '/telaCompra/'+ JSON.stringify(infosCompra)
    })
  }

  return (
    <main className={font.className}>
      <section className={style.section}>
        <NavbarCliente />
        <div>
          <div className={style.containerGeral}>
            <div className={style.containerImg}>
            <Image
              alt="Banner do Evento"
              className={style.imgBanner}
              width="400"
              height="400"
              src={'data:image/png;base64,' + evento.banner}
            />
            </div>
            <div className={style.content}>
              <h2 className={style.promoterName}>{'Promoter: ' +evento.pronome}</h2>
              <h1 className={style.eventName}>{evento.evnome}</h1>
              <p className={style.description}>{evento.descricao}</p>
              <div className={style.eventLocation}>{evento.endnome}</div>
              <div className={style.iconLocation}>
                <MdOutlineLocationCity size="40" />
                {evento.rua + ', ' + evento.numero}
              </div>
            </div>
              <div className={style.eventInfo}>
                <div className={style.ingressos}>
                  <div className={style.countPosition}>
                    {'Vip (R$'+ ingressoVip.valor +')'}
                    <div>
                      Inteira
                      <CountInput valorInicial={0} onChange={(e) => (
                        handleChange(e, ingressoVip.valor, 'vip', 'int')
                        )} />
                    </div>
                    <div>
                      Meia
                      <CountInput valorInicial={0} onChange={(e) => (
                        handleChange(e, (ingressoVip.valor * 0.5), 'vip', 'meia')
                        )} />
                    </div>
                    <div>
                      Gratuita
                      <CountInput valorInicial={0} onChange={(e) => (
                        handleChange(e, 0, 'vip', 'grat')
                        )} />
                    </div>
                    
                  </div>

                  <div className={style.countPosition}>
                    {'BackStage (R$'+ingressoBack.valor+')'}
                    <div>
                        Inteira
                      <CountInput valorInicial={0} 
                      onChange={(e) => handleChange(e, ingressoBack.valor, 'back', 'int')} />
                    </div>
                    <div>
                        Meia
                      <CountInput valorInicial={0} 
                      onChange={(e) => handleChange(e, (ingressoBack.valor * 0.5), 'back', 'meia')} />
                    </div>
                    <div>
                        Gratuita
                      <CountInput valorInicial={0} 
                      onChange={(e) => handleChange(e, 0, 'back', 'grat')} />
                    </div>
                  </div>

                  <div className={style.countPosition}>
                    {'Camarote (R$'+ingressoCamarote.valor+')'}
                    <div>
                        Inteira
                      <CountInput valorInicial={0} 
                      onChange={(e) => handleChange(e, ingressoCamarote.valor, 'cam', 'int')} />
                    </div>
                    <div>
                        Meia
                      <CountInput valorInicial={0} 
                      onChange={(e) => handleChange(e, (ingressoCamarote.valor * 0.5), 'cam', 'meia')} />
                    </div>
                    <div>
                        Gratuita
                      <CountInput valorInicial={0} 
                      onChange={(e) => handleChange(e, 0, 'cam', 'grat')} />
                    </div>
                  </div>
                </div>
                <div></div>
                <div className={style.flexEvent}>
                  <span id= 'total' className={style.price}>Total: $0</span>
                </div>
                <div className={style.positionBuyButton}>
                    <button className={style.buyButton} onClick={handleClick}>Comprar</button>
                </div>
              </div>
          </div>
        </div>
      </section>
    </main>
  );
}
