import { query } from '@/lib/db';

/**
 * Definição do tipo para os dados de um ingresso.
 */
type ingressos = {
    id_ingresso: number,
    tipoIngresso: number,
    quantidade: number
}

/**
 * Função assíncrona utilizada para realizar a compra de ingressos.
 * Pode ser usada quando houver mais de um tipo/setor de ingresso.
 * @param id_cliente - O ID do cliente que está realizando a compra.
 * @param ingressos - Um array contendo os dados dos ingressos a serem comprados.
 * @returns Uma mensagem informando que o pedido foi cadastrado com sucesso.
 */
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
        await cadastroPedido(digitos, id_cliente, element);
    });

    return 'Pedido cadastrado com sucesso';

}

/**
 * Função assíncrona utilizada para cadastrar um pedido de ingresso.
 * Pode ser usada quando a compra for de um só tipo e setor de ingresso.
 * @param numero - O número do pedido.
 * @param id_cliente - O ID do cliente que está realizando o pedido.
 * @param id_tipo_ingresso - O ID do tipo de ingresso.
 * @param id_ingresso - O ID do ingresso.
 * @param quantidade - A quantidade de ingressos do pedido.
 * @returns Uma mensagem informando que o pedido foi cadastrado com sucesso.
 */
// Essa função pode ser usada quando a compra for de um só tipo e setor de ingresso
export async function cadastroPedido(numero: string, id_cliente: number, ingresso: ingressos) {

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
        values: [numero, id_cliente, ingresso.tipoIngresso, ingresso.id_ingresso, ingresso.quantidade]
    })

    return 'Pedido cadastrado com sucesso';
}

/**
 * Função assíncrona utilizada para contar a quantidade de pedidos.
 * @returns O número total de pedidos cadastrados.
 */
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
