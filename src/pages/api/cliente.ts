import md5 from "md5";
import { v4 as uuid } from 'uuid';
import * as cliente from '../../types/cliente';

export default async (req: any, res: any) => {

    const { nome, sobrenome, email, senha, cpf, service } = req.body
    if (service) {
        switch (service) {
            case 'loginCliente': {
                const senhaHash = md5(senha)
                const checkLogin: cliente.Cliente = await cliente.loginCliente(email, senhaHash)
                if (checkLogin != null) {
                    //O token criando aqui segue a seguinte lógica:
                    //os primeiros digitos do token antes do primeiro hifen representa o usuario logado
                    //o primeiro digito representa o tipo do usuario:
                    //1 = admin 2 = promotor e 3 = cliente
                    //e o restante o id dele na sua respectiva tabela
                    const dataUser = '3' + checkLogin.id

                    const encodedData = Buffer.from(dataUser, 'utf8').toString('base64')

                    const token = encodedData + '-' + uuid()

                    const data = {
                        token: token,
                        user: {
                            id: checkLogin.id,
                            email: checkLogin.email,
                            nome: checkLogin.nome,
                            sobrenome: checkLogin.sobrenome,
                            senha: checkLogin.senha,
                            cpf: checkLogin.cpf,
                            role: 'cliente'
                        }
                    }
                    res.json({ result: data })
                } else {
                    res.json({ error: 'Cliente não encontrado.' })
                }
                break
            }
            case 'cadastroCliente': {
                const senhaHash = md5(senha)
                const createCliente = await cliente.cadastroCliente(nome, sobrenome, email, senhaHash, cpf)
                if (createCliente != undefined) {

                    res.json({ result: createCliente })
                } else {

                    res.json({ error: 'Email já cadastrado.' })
                }
                break
            }
            case 'editarCliente': {
                const id = req.body.id;
                const editaCliente = await cliente.editarCliente(email, nome, sobrenome, cpf, id);
                if (editaCliente != undefined) {

                    res.json({ result: editaCliente })
                } else {

                    res.json({ error: 'Erro ao editar cliente' })
                }
                break
            }
            case 'alterarSenha': {

                const senhaAntiga = req.body.senhaAntiga;
                const novaSenha = req.body.novaSenha;

                const alteraSenha = await cliente.alterarSenha(email, senhaAntiga, novaSenha);
                res.json({ result: alteraSenha })
                break
            }
            case 'getPerfil': {
                const id = req.body.id;
                const checkLogin: cliente.Cliente = await cliente.getCliente(id)
                res.json({ result: checkLogin })
                break
            }
        }
    } else {
        if (req.query.id) {

            const checkLogin: cliente.Cliente = await cliente.getCliente(req.query.id)

            const data = {
                id: checkLogin.id,
                email: checkLogin.email,
                nome: checkLogin.nome,
                sobrenome: checkLogin.sobrenome,
                role: 'cliente'
            }

            res.json({ user: data })
        }
    }

}
