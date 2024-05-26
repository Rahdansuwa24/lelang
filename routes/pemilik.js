var express = require('express');
var router = express.Router();
var Model_Pemilik = require('../Model/Model_Pemilik')

router.get('/', async function(req, res, next) {
    res.render('pemilik/index')
  });

router.post('/tambahkan', async (req, res, next) => {
    try {
        let { nama_pemilik, alamat, ktp, no_hp } = req.body;
        let Data = { nama_pemilik, alamat, ktp, no_hp };
        await Model_Pemilik.Store(Data);
        req.flash('success', 'Berhasil menambahkan data pemilik');
        return res.redirect('/cars');
    } catch (err) {
        console.error('Error:', err);
        req.flash('error', 'Terjadi kesalahan. Silakan coba lagi.');
        res.redirect('/owner'); 
    }
});

router.get('/edit/:id', async function(req, res, next) {
    let id = req.params.id
    let rows = Model_Pemilik.getId(id)
    res.render('pemilik/edit', {
        nama_pemilik: rows[0].nama_pemilik,
        alamat: rows[0].alamat,
        ktp: rows[0].ktp,
        no_hp: rows[0].no_hp
    })
  });

  router.post('/update/:id', async (req, res, next) => {
    try {
        let { nama_pemilik, alamat, ktp, no_hp } = req.body;
        let Data = { nama_pemilik, alamat, ktp, no_hp };
        await Model_Pemilik.Update(id, Data);
        req.flash('success', 'Berhasil menambahkan data pemilik');
        res.redirect('/users');
    } catch (err) {
        console.error('Error:', err);
        req.flash('error', 'Terjadi kesalahan. Silakan coba lagi.');
        res.redirect('/'); 
    }
});




  module.exports = router;