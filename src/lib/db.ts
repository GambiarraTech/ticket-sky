import mysql from "mysql2/promise"

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
