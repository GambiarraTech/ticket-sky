import { v4 as uuid } from 'uuid'
import { Admin, getAdmin, loginAdmin, getAllAdmins, excluirAdmin } from '../../types/admin'
import md5 from "md5";
import { v4 as uuid } from 'uuid';

export default async (req: any, res: any) => {

    const { service } = req.body

    if (service) {
        switch (service) {
            case 'loginAdmin': {
                const { email, senha } = req.body
                const senhaHash = md5(senha)
                const checkLogin: Admin = await loginAdmin(email, senhaHash)

                if (checkLogin != null) {
                    //O token criando aqui segue a seguinte lógica:
                    //os primeiros digitos do token antes do primeiro hifen representa o usuario logado
                    //o primeiro digito representa o tipo do usuario:
                    //1 = admin 2 = promotor e 3 = cliente
                    //e o restante o id dele na sua respectiva tabela
                    const dataUser = '1' + checkLogin.id
                    const encodedData = Buffer.from(dataUser, 'utf8').toString('base64')
                    const token = encodedData + '-' + uuid()
                    const data = {
                        token: token,
                        user: {
                            id: checkLogin.id,
                            email: checkLogin.email,
                            nome: checkLogin.nome,
                            role: 'admin'
                        }
                    }

                    res.json({ result: data })

                } else {
                    res.json({ error: 'Administrador não encontrado.' })
                }

                break
            }
            case 'getAdmins': {
                const admins: Admin[] = await getAllAdmins();

                if (admins && admins.length > 0) {
                    const data = admins


                    res.json({ admins: data });
                } else {

                    res.json({ admins: [] });
                }

                break;
            }
            case 'excluirAdmin': {
                const id = req.body.id

                const excluir: boolean = await excluirAdmin(id)

                if( excluir == true){
                    res.json({ success: true });
                }else{
                    res.json({ success: false });
                }
            }
            default: {

                break;
            }
        }
    } else {
        if (req.query.id) {
            const checkLogin: Admin = await getAdmin(req.query.id)
            const data = {
                email: checkLogin.email,
                nome: checkLogin.nome,
                role: 'admin'
            }

            res.json({ user: data })
        } else {
            res.status(200).send('')
        }
    }
}
