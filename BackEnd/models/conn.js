import mysql from 'mysql2/promise';


export default class Databasee {
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.HOST_DB,
            user: process.env.USER_DB,
            password: process.env.PASSWORD_DB,
            database: process.env.DATA_BASE
        })
    }

    async executaComando(sql, params = []) {
        const connection = await this.pool.getConnection()
        try {
            const [rows] = await connection.execute(sql, params)
            return rows
        } finally {
            connection.release()
        }
    }


    async executaComandoNonQuery(sql, params = []) {
        const connection = await this.pool.getConnection()
        try {
            const [results] = await connection.execute(sql, params)
            return results.affectedRows
        } finally {
            connection.release()
        }
    }
}
