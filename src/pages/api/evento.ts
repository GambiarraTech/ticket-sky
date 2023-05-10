import { fillCatalog } from "@/types/evento";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { id, id_promoter, id_endereco, id_categoria, descricao, banner, data_hora, service } = req.body

    switch (service) {
        case 'fillCatalog': {
            const itensCatalog = await fillCatalog()
            res.json({ result: itensCatalog })
            break
        }
    }
}
