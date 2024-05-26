var express = require('express');
var router = express.Router();
var Model_Lelang = require('../Model/Model_Lelang');
var Model_Mobil = require('../Model/Model_Mobil');


router.get('/', async function(req, res, next) {
    let rows = await Model_Mobil.getAll()
    res.render('lelang/index', {
      Data:rows
    });
  });

  router.post('/tambahkan', async (req, res, next) => {
    try {
        let len = 10, kode_lelang =''
        while( len-- ) {
          kode_lelang+= String.fromCharCode( 48 + ~~(Math.random() * 42) );
        }
        let {start_harga, id_mobil, times } = req.body;
        let Data = { kode_lelang, start_harga, id_mobil, times};
        await Model_Lelang.Store(Data);
        req.flash('success', 'Berhasil menambahkan data keseluruhan');
        return res.redirect('/users');
    } catch (err) {
        console.error('Error:', err);
        req.flash('error', 'Terjadi kesalahan. Silakan coba lagi.');
        res.redirect('/'); 
    }
});


module.exports = router;