import axios from 'axios';
import { parseCookies } from 'nookies';

export function getAPIClient(ctx?: any) {
    const cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
            Authorization: cookies['ticketsky-token'] ? `Bearer ${cookies['ticketsky-token']}` : undefined
        }
    });

    api.interceptors.request.use(config => {
        console.log(config);
        return config;
    });

    return api;
}
