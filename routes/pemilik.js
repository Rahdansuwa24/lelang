const express = require('express');
const router = express.Router();
const Model_Pemilik = require('../Model/Model_Pemilik');

router.get('/', async function(req, res, next) {
    let rows = await Model_Pemilik.getAll();
    res.render('pemilik/index', { Data: rows });
});

router.post('/tambahkan', async (req, res, next) => {
    try {
        let { nama_pemilik, alamat, ktp, no_hp } = req.body;
        let Data = { nama_pemilik, alamat, ktp, no_hp };
        await Model_Pemilik.Store(Data);
        req.flash('success', 'Berhasil menambahkan data pemilik');
        res.redirect('/cars');
    } catch (err) {
        console.error('Error:', err);
        req.flash('error', 'Terjadi kesalahan. Silakan coba lagi.');
        res.redirect('/users'); 
    }
});

router.get('/edit/:id',  async (req, res) => {
    let id = req.params.id;
        let rows = await Model_Pemilik.getId(id);
        if (rows.length > 0) {
            console.log(rows)
            res.render('pemilik/edit', {
                id: rows[0].id_pemilik,
                nama_pemilik: rows[0].nama_pemilik,
                alamat: rows[0].alamat,
                ktp: rows[0].ktp,
                no_hp: rows[0].no_hp
            });
        } else {
            req.flash('error', 'Data tidak ditemukan');
            res.redirect('/users');
        }
});

router.post('/update/:id',  async (req, res) => {
    try {
        let id = req.params.id
        let { nama_pemilik, alamat, ktp, no_hp } = req.body;
        let Data = { nama_pemilik, alamat, ktp, no_hp };
        await Model_Pemilik.Update(id, Data);
        req.flash('success', 'Berhasil mengupdate data pemilik');
        res.redirect('/cars');
    } catch (err) {
        console.error('Error:', err);
        req.flash('error', 'Terjadi kesalahan. Silakan coba lagi.');
        res.redirect('/users'); 
    }
});

router.post('/delete/:id',  async (req, res) => {
    try {
        await Model_Pemilik.Delete(req.params.id);
        req.flash('success', 'Berhasil menghapus data pemilik');
        res.redirect('/cars');
    } catch (err) {
        console.error('Error:', err);
        req.flash('error', 'Terjadi kesalahan. Silakan coba lagi.');
        res.redirect('/pemilik'); 
    }
});

module.exports = router;
