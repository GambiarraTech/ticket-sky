import mysql from "mysql2/promise"

/**
 * Função para executar uma consulta no banco de dados MySQL.
 * 
 * @param query - A consulta SQL a ser executada
 * @param values (opcional) - Os valores para os parâmetros da consulta (caso a consulta seja parametrizada)
 * @returns Uma Promise que resolve para os resultados da consulta
 * @throws Um erro se ocorrer algum problema durante a execução da consulta
 */
export async function query({ query, values = [] }: any) {

    const conectDb = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
    })

    try {
        const [results] = await conectDb.execute(query, values)
        conectDb.end()
        return results
    } catch (error: any) {
        throw Error(error.message)
    }
}
