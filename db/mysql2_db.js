const mysql = require('mysql2')


const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: '3_connection_jwt_mysql2'
});


conn.connect((err)=>{
    if(err) throw err;
    console.log("Mysql2 connected");
});


module.exports = conn;