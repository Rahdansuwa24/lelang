const connection = require('../database/database')
class Model_Tawar{
    static async getAll(){
        return new Promise((resolve, reject) => {
            connection.query("select * from tawaran order by id_tawaran desc", (err, rows)=>{
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
            connection.query('insert into tawaran set ?', Data,(err, rows)=>{
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
            connection.query('select * from tawaran where id_tawaran = ' + id, (err, rows)=>{
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
            connection.query("update tawaran set ? where id_tawaran = " + id, Data,(err, rows)=>{
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
            connection.query("delete from tawaran where id_tawaran = " + id,(err, rows)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(rows)
                }
            })
        })
    }

}

module.exports = Model_Tawar