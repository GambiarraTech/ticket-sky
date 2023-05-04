import { NavbarCliente } from '@/components/navbar/NavbarCliente';
import Table, { meusIngressosType } from '@/components/table/TableIngressos';
import Head from 'next/head';


export default function meusIngressos(){

    const data: meusIngressosType[] = [
        {
        img: 'a',
        nomeEvento: 'Show Roberto Carlos',
        dataAquisicao: '04/05/2023',
        valorTotal: 'R$ 200,00'
        },
        {
            img: 'a',
            nomeEvento: 'Show Stand Up',
            dataAquisicao: '05/05/2023',
            valorTotal: 'R$ 400,00'
        }
    ]

    return (
        
        <div>
            <Head>
                <title>TicketSky - Meus Ingressos</title>
            </Head>
            
            <NavbarCliente Logado={true} />
                      
            <Table data = {data}/>
           
           
        </div>
    );
}



