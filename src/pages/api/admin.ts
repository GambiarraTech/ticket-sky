import { loginAdmin } from '../../types/admin'

export default async (req: any, res: any) => {

    const { email, senha, service } = req.body

    switch (service) {
        case 'loginAdmin': {
            const checkLogin = await loginAdmin(email, senha)
            res.json({ result: checkLogin })

            if (checkLogin != null) {
                console.log('Logado')
            } else {
                console.log('Não logado')
            }

            break
        }
    }
}
