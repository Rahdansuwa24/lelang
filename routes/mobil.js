var express = require('express');
var router = express.Router();
var Model_Mobil = require('../Model/Model_Mobil');
var Model_Pemilik = require('../Model/Model_Pemilik');
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: (req, file, cb)=>{//filename digunakan untuk menentukan nama filenya
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
}
})

const upload = multer({ storage: storage })

const cpUpload = upload.fields([{ name: 'front', maxCount: 1 }, { name: 'rear', maxCount: 1 }, { name: 'kanan', maxCount: 1 }, { name: 'kiri', maxCount: 1 }])

router.get('/', async function(req, res, next) {
    let rows = await Model_Pemilik.getAll()
    res.render('mobil/index', {
      Data:rows
    });
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
              front: front, 
              rear: rear, 
              kiri: kiri, 
              kanan: kanan 
          };

          await Model_Mobil.Store(Data);

          req.flash('success', 'Berhasil menambahkan data mobil');
          return res.redirect('/loan');
      } catch (err) {
          console.error('Error:', err);
          req.flash('error', 'Terjadi kesalahan. Silakan coba lagi.');
          res.redirect('/');
      }
  });



  module.exports = router;