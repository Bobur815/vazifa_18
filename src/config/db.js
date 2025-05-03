import mysql from "mysql2"

const connection = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "a15081993",
    database: "vazifa_18"
}).promise()

export default connection;