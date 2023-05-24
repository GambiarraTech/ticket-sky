import * as categoria from '@/types/categoria'
import * as relatorios from '../../types/relatorios'

export default async (req: any, res: any) => {

    const categorias: categoria.Categoria = await categoria.getAllCategorias()
    res.json({ result: categorias})
}
