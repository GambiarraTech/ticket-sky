import { fillCatalog } from "@/types/evento";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const itensCatalog = await fillCatalog()
    res.json({ result: itensCatalog })
}
