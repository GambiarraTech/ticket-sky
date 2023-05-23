import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer, { SendMailOptions } from 'nodemailer';

/**
 * Exemplo de requisição:
 * {
        "destinatario": "Email de quem vai receber",
        "assunto": "Assunto", 
        "mensagem": "Mensagem do email",
        "anexos": [ //Aqui vai a lista de anexos em base64
            {
            "nome": "nomeDoArquivo.tipo",  // NÃO ESQUECER DE ESPECIFICAR O TIPO
            "content": "base64 do artigo"
            }
        ]
    }
 */

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Método não permitido' });
        return;
    }

    try {

        const { destinatario, assunto, mensagem } = req.body;


        const anexos: any[] = req.body.anexos;


        // Configurar o transporte do Nodemailer
        const transporter = nodemailer.createTransport({
            // Configurações do seu provedor de e-mail (SMTP)
            // Exemplo para o serviço Gmail:
            service: 'Gmail',
            auth: {
                user: 'gambiarratech10',
                pass: 'sfpwwmthtclorukx',
            },
        });

        // Configurar o e-mail a ser enviado
        const mailOptions: SendMailOptions = {
            from: 'gambiarratech10@gmail.com',
            to: destinatario,
            subject: assunto,
            text: mensagem,
            attachments: anexos?.map(file => ({
                // encoded string as an attachment
                filename: file.nome,
                content: file.content,
                encoding: 'base64'
            })),
        };

        // Enviar o e-mail
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'E-mail enviado com sucesso' });

    } catch (error) {
        res.status(500).json({ message: "Erro ao enviar e-mail" });
    }
};

export default sendEmail;
