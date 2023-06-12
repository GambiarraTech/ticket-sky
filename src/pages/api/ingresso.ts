import * as ingresso from "@/types/ingresso";

export default async (req: any, res: any) => {
    const body = req.body;
    if (body.service) {
        switch (body.service) {

        }
    }
    else {
        if (req.query.id) {
            const ingressos = await ingresso.getIngressosEvento(req.query.id)
            res.json({ result: ingressos })
        }
    }
}
