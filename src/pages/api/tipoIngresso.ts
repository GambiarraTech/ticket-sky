import { TipoIngresso, getAll } from '../../types/tipoIngresso';

/**
 * Função principal que lida com as requisições relacionadas a tipos de ingressos.
 * @param req - O objeto de requisição HTTP.
 * @param res - O objeto de resposta HTTP.
 */
export default async (req: any, res: any) => {
    const { service } = req.body

    if (service) { }
    else {
        const ingressos: TipoIngresso[] = await getAll();

        if (ingressos && ingressos.length > 0) {
            const data = ingressos


            res.json({ result: data });
        }
    }
}
