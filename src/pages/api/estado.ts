import { Estado, getAllEstados } from '@/types/estado'

/**
 * Função que retorna todos os estados.
 * @param req - O objeto de solicitação HTTP.
 * @param res - O objeto de resposta HTTP.
 */
export default async (req: any, res: any) => {

    const estados: Estado = await getAllEstados()
    res.json({ result: estados })
}
