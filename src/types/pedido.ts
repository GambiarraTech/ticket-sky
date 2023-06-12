import { query } from '@/lib/db';

type ingressos = {
    id_ingresso: number,
    tipoIngresso: number,
    quantidade: number
}

//Essa função é usada para quando for mais de um tipo/setor de ingresso
export async function compra(id_cliente: number, ingressos: ingressos[]) {

    // Formato ingressos:
    // ingressos: [
    //   {
    //     id_ingresso: X,
    //     tipoIngresso: X,
    //     quantidade: x
    //   },
    // ];

    // Define o número do pedido
    var numero: number = await contaPedidos();
    var digitos: string = Math.abs(numero).toString();

    if (digitos.length < 16) {
        while (digitos.length < 16) {
            digitos = "0" + digitos;
        }
    }

    ingressos.forEach(async (element) => {
        await cadastroPedido(digitos, id_cliente, element.tipoIngresso, element.id_ingresso, element.quantidade);
    });

    return 'Pedido cadastrado com sucesso';

}

// Essa função pode ser usada quando a compra for de um só tipo e setor de ingresso
export async function cadastroPedido(numero: string, id_cliente: number, id_tipo_ingresso: number, id_ingresso: number, quantidade: number) {

    if (numero == '') {
        // Define o número do pedido
        var numeroC: number = await contaPedidos();
        var digitos: string = Math.abs(numeroC).toString();

        if (digitos.length < 16) {
            while (digitos.length < 16) {
                digitos = "0" + digitos;
            }
        }
        numero = digitos;
    }
    const cadastroPedido = await query({
        query: 'INSERT INTO pedido (numero, id_cliente, id_tipo_ingresso, id_ingresso, quantidade) VALUES (?, ?, ?, ?, ?);',
        values: [numero, id_cliente, id_tipo_ingresso, id_ingresso, quantidade]
    })

    return 'Pedido cadastrado com sucesso';
}

export async function contaPedidos() {
    const sql = `
        SELECT COUNT(*) AS quantidade_pedidos
            FROM (
                SELECT COUNT(*) 
                    FROM pedido 
                    GROUP BY numero
            ) AS subconsulta;
    `;
    const quantosPedidos: any = await query({
        query: sql,
        values: []
    });

    const qntd: number = quantosPedidos[0].quantidade_pedidos;
    return qntd;
}