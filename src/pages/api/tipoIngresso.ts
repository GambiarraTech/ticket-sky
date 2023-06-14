import { TipoIngresso, getAll } from '../../types/tipoIngresso';


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
