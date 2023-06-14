import { Categoria, getAll } from '../../types/categoria';

/**
 * Função que trata as solicitações relacionadas a categorias.
 * @param req - O objeto de solicitação HTTP.
 * @param res - O objeto de resposta HTTP.
 */
export default async (req: any, res: any) => {
    const { service } = req.body

    if (service) { }
    else {
        const categorias: Categoria[] = await getAll();

        if (categorias && categorias.length > 0) {
            const data = categorias



            res.json({ result: data });
        }
    }

}
