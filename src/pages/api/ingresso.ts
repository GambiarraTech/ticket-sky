import * as ingresso from "@/types/ingresso";

export default async (req: any, res: any) => {
    const body = req.body;
    if (body.service) {
        switch (body.service) {
            case 'getIngressos': {
                const ingressos = await ingresso.getIngressosEvento(body.id)
                res.json({ result: ingressos })
                break
            }
        }
    }

}
