import { Estado, getAllEstados } from '@/types/estado'
import * as relatorios from '../../types/relatorios'

export default async (req: any, res: any) => {

    const estados: Estado = await getAllEstados()
    res.json({ result: estados})
}
