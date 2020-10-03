const Pool = require("pg").Pool


// const devConfig = {
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_DATABASE
// }

const devConfig = {
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
}

const prodConfig = {
    connectionString: process.env.DATABASE_URL // heroku addons
}
const pool = new Pool(process.env.NODE_ENV === 'production' ? prodConfig : devConfig)

module.exports = pool