const connection = require('../database/database')
class Model_Pemilik{
    static async getAll(){
        return new Promise((resolve, reject) => {
            connection.query("select * from pemilik order by id_pemilik desc", (err, rows)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(rows)
                }
            })
        })
    }

    static async Store(Data){
        return new Promise((resolve, reject) => {
            connection.query('insert into pemilik set ?', Data,(err, rows)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(rows)
                }
            })
        })
    }
    static async editAll(Data){
        return new Promise((resolve, reject) => {
            connection.query(`SELECT pemilik.*, mobil.*, lelang.*
            FROM pemilik
            LEFT JOIN mobil ON pemilik.id_pemilik = mobil.id_pemilik
            LEFT JOIN lelang ON lelang.id_mobil = mobil.id_mobil;
            `, Data,(err, rows)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(rows)
                }
            })
        })
    }


    static async getId(id){
        return new Promise((resolve, reject) => {
            connection.query('select * from pemilik where id_pemilik = ' + id, (err, rows)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(rows)
                }
            })
        })
    }

    static async Update(id ,Data){
        return new Promise((resolve, reject) => {
            connection.query('update pemilik set ? where id_pemilik = ' + id, Data,(err, rows)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(rows)
                }
            })
        })
    }

    static async Delete(id){
        return new Promise((resolve, reject) => {
            connection.query("delete from user where id_user = " + id,(err, rows)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(rows)
                }
            })
        })
    }

}

module.exports = Model_Pemilik