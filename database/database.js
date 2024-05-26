const { error } = require('console');
let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_uas'
})

connection.connect((error)=>{
    if(!!error){
        console.log(error);
    }
    else{
        console.log('Koneksi sukses');
    }
})
module.exports = connection;