import * as evento from "@/types/evento";
import * as endereco from "@/types/endereco";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: any, res: any) => {
    const body = req.body

    if (body.service) {
        switch (body.service) {

            case 'criarEvento': {

                    const { local, cep, estado , cidade, bairro, rua , numero } = body
                    const novoEndereco: endereco.Endereco = await endereco.cadastroEndereco(local, cep, estado, cidade, bairro, rua, numero)

                    const { nome, descricao, imagem, categoria, promoter } = body
                    const data_hora = body.data + ' ' + body.hora
                    const novoEvento: evento.Evento = await evento.cadastroEvento(nome, descricao, data_hora, imagem, novoEndereco.id, categoria, promoter)

                    res.json({ result: novoEvento })

            }
        }
    }else{
        const itensCatalog = await evento.fillCatalog()
        res.json({ result: itensCatalog })
    }
}
