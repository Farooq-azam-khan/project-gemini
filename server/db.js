const Pool = require("pg").Pool


const vars = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE
}
const pool = new Pool(vars)

module.exports = pool