const express = require('express');
const router = express.Router();
const Model_Tawar = require('../Model/Model_Tawar');
const Model_Lelang = require('../Model/Model_Lelang')

router.get('/', async (req, res) => {
    await Model_Lelang.getAll()
    res.render('tawar/index');
});
router.post('/tambahkan', async (req, res) => {
    let {jumlah_tawar} = req.body
    let Data ={
        jumlah_tawar
    }
    await Model_Tawar.Store(Data)
    res.redirect('/loan');
});

module.exports = router;