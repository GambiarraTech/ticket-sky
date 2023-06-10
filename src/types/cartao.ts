import { query } from '@/lib/db';

export type Cartao = {
  id: number,
  titular: string,
  numero: string,
  vencimento: string,
  cpf: string,
  cvv: string,
}

export async function insertCartao(titular: string, numero: string, vencimento: string, cpf: string, id_cliente: string) {

    const insertResult = await query({
      query: "INSERT INTO cartao (titular, numero, vencimento, cpf, id_cliente) VALUES (?, ?, ?, ?, ?)",
      values: [titular, numero, vencimento, cpf, id_cliente]
    })
    if ('insertId' in insertResult) {
      const idNovoCartao = insertResult.insertId;

      const novoCartao: any = await query({
        query: "SELECT * FROM cartao WHERE cartao.id = (?)",
        values: [idNovoCartao]
      })

      if (Object.keys(novoCartao).length > 0) {
        return novoCartao[0]
      } else {
        return null
      }

    }


}

export async function deleteCartao(id_cliente: string): Promise<boolean> {
  try {
    await query({
      query: "DELETE FROM cartao WHERE cartao.id_cliente = (?)",
      values: [ id_cliente]
    })
    return true

  } catch (error) {
    console.error(error)
    return false
  }
}

export async function selectCartao(cpf: string, id_cliente: string) {
  const cartao: any = await query({
    query: "SELECT * FROM cartao WHERE cartao.cpf = (?) AND cartao.id_cliente = (?)",
    values: [cpf, id_cliente],
  })

  if (Object.keys(cartao).length > 0) {
    return cartao[0]
  } else {
    return null
  }
}

export async function updateCartao(titular: string, numero: string, vencimento: string, cpf: string, id_cliente: string) {
    try{
        const updatedCard: any = await query({
            query: "UPDATE cartao SET titular = (?), numero = (?), vencimento = (?), cpf = (?) WHERE cpf = (?) AND id_cliente = (?)",
            values: [titular, numero, vencimento, cpf, cpf, id_cliente],
          })

          const card: any = await selectCartao(cpf, id_cliente)
        return card
    }catch{
        return false
    }


}
