import * as endereco from "@/types/endereco";
import * as evento from "@/types/evento";

export default async (req: any, res: any) => {
    const body = req.body;

    if (body.service) {
        switch (body.service) {
            case 'criarEvento': {
                const { local, cep, estado, cidade, bairro, rua, numero } = body;
                const novoEndereco: endereco.Endereco = await endereco.cadastroEndereco(local, cep, estado, cidade, bairro, rua, numero);

                const { nome, descricao, imagem, categoria, promoter } = body;
                const data_hora = body.data + ' ' + body.hora;
                const novoEvento: evento.Evento = await evento.cadastroEvento(nome, descricao, data_hora, imagem, novoEndereco.id, categoria, promoter);

                res.json({ result: novoEvento });
                break;
            }
            case 'Show': {
                const itensCatalog = await evento.fillCatalogCat('1');
                res.json({ result: itensCatalog });
                break;
            }
            case 'Stand-up': {
                const itensCatalog = await evento.fillCatalogCat('2');
                res.json({ result: itensCatalog });
                break;
            }
        }
    } else {
        if (req.query.id) {
            const itensCatalog = await evento.getEventosPromoter(req.query.id);
            res.json({ result: itensCatalog });
        } else {
            const itensCatalog = await evento.fillCatalog();
            res.json({ result: itensCatalog });
        }
    }
};
