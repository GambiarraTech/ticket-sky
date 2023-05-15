import { v4 as uuid } from 'uuid'
import { Admin, getAdmin, loginAdmin } from '../../types/admin'

export default async (req: any, res: any) => {

    const { email, senha, service } = req.body

    if (service) {
        switch (service) {
            case 'loginAdmin': {
                const checkLogin: Admin = await loginAdmin(email, senha)

                if (checkLogin != null) {

                    //O token criando aqui segue a seguinte lógica:
                    //os primeiros digitos do token antes do primeiro hifen representa o usuario logado
                    //o primeiro digito representa o tipo do usuario:
                    //1 = admin 2 = promotor e 3 = cliente
                    //e o restante o id dele na sua respectiva tabela
                    const token = '1' + checkLogin.id + '-' + uuid()

                    const data = {
                        token: token,
                        user: {
                            email: checkLogin.email,
                            nome: checkLogin.nome,
                            role: 'admin'
                        }
                    }

                    res.json({ result: data })

                } else {
                    console.log('Não logado')
                }

                break
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
        }
    }

}
