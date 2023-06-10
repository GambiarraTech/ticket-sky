import { query } from '@/lib/db';

export type Cartao = {
  id: number,
  titular: string,
  numero: string,
  vencimento: string,
  cpf: string,
  cvv: string,
}

export async function insertCartao(titular: string, numero: string, vencimento: string, cpf: string, cvv: string | null) {

  try {
    const insertResult = await query({
      query: "INSERT INTO cartao (titular, numero, vencimento, cpf, cvv) VALUES (?, ?, ?, ?, ?)",
      values: [titular, numero, vencimento, cpf, cvv]
    })
    if ('insertId' in insertResult) {
      const idNovoCartao = insertResult.insertId;

      const novoCartao: any = await query({
        query: "SELECT titular, numero, vencimento, cpf, cvv FROM cartao WHERE cartao.id = (?)",
        values: [idNovoCartao]
      })

      if (Object.keys(novoCartao).length > 0) {
        return novoCartao[0]
      } else {
        return null
      }

    }

  } catch (err) {
  }
}

export async function deleteCartao(cpf: string, numero: string): Promise<boolean> {
  try {
    await query({
      query: "DELETE FROM cartao WHERE cartao.cpf = (?) AND cartao.numero = (?)",
      values: [cpf, numero]
    })
    return true

  } catch (error) {
    console.error(error)
    return false
  }
}

export async function selectCartao(cpf: string, numero: string) {
  const cartao: any = await query({
    query: "SELECT * FROM cartao WHERE cartao.cpf = (?) AND cartao.numero = (?)",
    values: [cpf, numero],
  })

  if (Object.keys(cartao).length > 0) {
    return cartao[0]
  } else {
    return null
  }
}
