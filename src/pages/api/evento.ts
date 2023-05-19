import { fillCatalog, Evento } from "@/types/evento";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: any, res: any) => {
    const { service } = req.body

    if (service) {
        switch (service) {
            case 'criarEvento': {
                console.log(req.body)
            }
        }
    }
    const itensCatalog = await fillCatalog()
    res.json({ result: itensCatalog })
}
