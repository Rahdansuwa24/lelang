const connection = require('../database/database')
class Model_Lelang{
    static async getAll(){
        return new Promise((resolve, reject) => {
            connection.query("select * from lelang order by id_lelang desc", (err, rows)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(rows)
                }
            })
        })
    }

    static async join(){
        return new Promise((resolve, reject) => {
            connection.query(`select pemilik.nama_pemilik, mobil.merk_mobil, mobil.no_seri, lelang.start_harga, lelang.times, lelang.kode_lelang FROM lelang
            left JOIN mobil ON lelang.id_mobil = mobil.id_mobil
            left JOIN pemilik ON pemilik.id_pemilik = mobil.id_pemilik order by id_lelang desc`, (err, rows)=>{
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
            connection.query('insert into lelang set ?', Data,(err, rows)=>{
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
            connection.query('select * from lelang where id_lelang = ' + id, (err, rows)=>{
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
            connection.query("update lelang set ? where id_lelang = " + id, Data,(err, rows)=>{
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
            connection.query("delete from mobil where id_lelang = " + id,(err, rows)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(rows)
                }
            })
        })
    }

}

module.exports = Model_Lelang