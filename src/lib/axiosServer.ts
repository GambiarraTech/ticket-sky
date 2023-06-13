import axios from 'axios';
import { parseCookies } from 'nookies';

/**
 * Função para obter uma instância do cliente da API.
 * 
 * @param ctx (opcional) - O contexto da requisição (por exemplo, no Next.js)
 * @returns Instância do cliente da API
 */
export function getAPIClient(ctx?: any) {
    // Obter cookies do contexto
    const cookies = parseCookies(ctx);

    // Criar uma instância do cliente da API usando a biblioteca Axios
    const api = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
            Authorization: cookies['ticketsky-token'] ? `Bearer ${cookies['ticketsky-token']}` : undefined
        }
    });

    // Interceptor de requisição para configurações adicionais (opcional)
    api.interceptors.request.use(config => {

        // Configurações adicionais da requisição podem ser aplicadas aqui
        return config;
    });

    // Retorna a instância do cliente da API
    return api;
}
