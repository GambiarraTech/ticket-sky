import { getAPIClient } from "./axiosServer"

/**
 * Instância do cliente da API.
 * Essa instância é obtida através da função `getAPIClient`.
 * O cliente da API pode ser usado para fazer requisições HTTP para o servidor.
 */
export const api = getAPIClient()
