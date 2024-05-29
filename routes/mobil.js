const express = require('express');
const router = express.Router();
const Model_Mobil = require('../Model/Model_Mobil');
const Model_Pemilik = require('../Model/Model_Pemilik');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = '';
    if (file.fieldname === 'front') {
      folder = 'front';
    } else if (file.fieldname === 'rear') {
      folder = 'rear';
    } else if (file.fieldname === 'kiri') {
      folder = 'kiri';
    } else if (file.fieldname === 'kanan') {
      folder = 'kanan';
    }
    cb(null, path.join('public/images', folder));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
const cpUpload = upload.fields([{ name: 'front', maxCount: 1 }, { name: 'rear', maxCount: 1 }, { name: 'kanan', maxCount: 1 }, { name: 'kiri', maxCount: 1 }]);

router.get('/', async (req, res, next) => {
    try {
        let pemilik = await Model_Pemilik.getAll();
        let mobil = await Model_Mobil.getAll();
        res.render('mobil/index', { Data: pemilik, mobil: mobil });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/tambahkan', cpUpload, async (req, res, next) => {
    try {
        const { front, rear, kiri, kanan } = req.files || {};
        let { merk_mobil, no_seri, tahun_keluaran, deskripsi, id_pemilik } = req.body;
        let Data = {
            merk_mobil,
            no_seri,
            tahun_keluaran,
            deskripsi,
            id_pemilik,
            front: front ? front[0].filename : null,
            rear: rear ? rear[0].filename : null,
            kiri: kiri ? kiri[0].filename : null,
            kanan: kanan ? kanan[0].filename : null
        };

        await Model_Mobil.Store(Data);
        req.flash('success', 'Berhasil menambahkan data mobil');
        res.redirect('/loan');
    } catch (err) {
        console.error('Error:', err);
        req.flash('error', 'Terjadi kesalahan. Silakan coba lagi.');
        res.redirect('/mobil');
    }
});

router.get('/edit/:id',  (req, res) => {
    res.render('mobil/edit', req.mobil[0]);
});

router.post('/update/:id', cpUpload,  async (req, res) => {
    try {
        const { front, rear, kiri, kanan } = req.files || {};
        let { merk_mobil, no_seri, tahun_keluaran, deskripsi, id_pemilik } = req.body;
        let Data = {
            merk_mobil,
            no_seri,
            tahun_keluaran,
            deskripsi,
            id_pemilik,
            front: front ? front[0].filename : req.mobil[0].front,
            rear: rear ? rear[0].filename : req.mobil[0].rear,
            kiri: kiri ? kiri[0].filename : req.mobil[0].kiri,
            kanan: kanan ? kanan[0].filename : req.mobil[0].kanan
        };

        await Model_Mobil.Update(req.params.id, Data);
        req.flash('success', 'Berhasil mengupdate data mobil');
        res.redirect('/users');
    } catch (err) {
        console.error('Error:', err);
        req.flash('error', 'Terjadi kesalahan. Silakan coba lagi.');
        res.redirect('/mobil');
    }
});

router.post('/delete/:id',  async (req, res) => {
    try {
        await Model_Mobil.Delete(req.params.id);
        req.flash('success', 'Berhasil menghapus data mobil');
        res.redirect('/mobil');
    } catch (err) {
        console.error('Error:', err);
        req.flash('error', 'Terjadi kesalahan. Silakan coba lagi.');
        res.redirect('/mobil');
    }
});

module.exports = router;
