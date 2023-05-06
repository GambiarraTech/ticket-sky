import { v4 as uuid } from 'uuid'
import { Admin, getAdmin, loginAdmin } from '../../types/admin'
// import { AuthContext } from '@/contexts/AuthContext';
// import { useContext } from 'react';

// const { login } = useContext(AuthContext)

export default async (req: any, res: any) => {

    const { email, senha, service } = req.body

    if (service) {
        switch (service) {
            case 'loginAdmin': {
                const checkLogin: Admin = await loginAdmin(email, senha)

                if (checkLogin != null) {

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
                role: '1'
            }

            res.json({ user: data })
        }
    }

}
