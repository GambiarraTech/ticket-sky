import * as ingresso from "@/types/ingresso";

/**
 * Função que lida com as solicitações relacionadas a ingressos.
 * @param req - O objeto de solicitação HTTP.
 * @param res - O objeto de resposta HTTP.
 */
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
