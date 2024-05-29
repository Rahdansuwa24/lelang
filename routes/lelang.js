const express = require('express');
const router = express.Router();
const Model_Lelang = require('../Model/Model_Lelang');
const Model_Mobil = require('../Model/Model_Mobil');


router.get('/', async (req, res, next) => {
    try {
        let mobil = await Model_Mobil.getAll();
        let lelang = await Model_Lelang.getAll();
        res.render('lelang/index', { Data: mobil, lelang: lelang });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

let lelangData = {
    start_harga: 0,
    id_mobil: null,
    times: null,
    jumlah_tawaran: []
};

// Endpoint untuk menambahkan lelang
router.post('/tambahkan', (req, res) => {
    lelangData.start_harga = req.body.start_harga;
    lelangData.id_mobil = req.body.id_mobil;
    lelangData.times = req.body.times; // Menggunakan format time dari input
    res.redirect('/lelang');
});

// Endpoint untuk menyimpan tawaran

// Endpoint untuk menampilkan halaman lelang
router.get('/lelang', (req, res) => {
    res.render('lelang', { lelangData });
});
router.get('/edit/:id',  (req, res) => {
    res.render('lelang/edit', req.lelang[0]);
});

router.post('/update/:id',  async (req, res) => {
    try {
        let { start_harga, id_mobil, times } = req.body;
        let Data = { kode_lelang, start_harga, id_mobil, times };

        await Model_Lelang.Update(req.params.id, Data);
        req.flash('success', 'Berhasil mengupdate data lelang');
        res.redirect('/lelang');
    } catch (err) {
        console.error('Error:', err);
        req.flash('error', 'Terjadi kesalahan. Silakan coba lagi.');
        res.redirect('/lelang');
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        await Model_Lelang.Delete(req.params.id);
        req.flash('success', 'Berhasil menghapus data lelang');
        res.redirect('/lelang');
    } catch (err) {
        console.error('Error:', err);
        req.flash('error', 'Terjadi kesalahan. Silakan coba lagi.');
        res.redirect('/lelang');
    }
});

module.exports = router;

