import { Categoria, getAll } from '../../types/categoria';


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
