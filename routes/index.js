var express = require('express');
var router = express.Router();
var Model_User = require('../Model/Model_User')
const bcrypt = require('bcrypt')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('auth/register');
});

router.get('/login', function(req, res, next) {
  res.render('auth/user');
});

router.post('/saveusers', async (req, res)=>{
  let {email, passwords, alamat_user, no_hp, tanggal_lahir, level_users} = req.body
  let enkripsi = await bcrypt.hash(passwords, 10);
  let Data = {
    email,
    passwords: enkripsi,
    alamat_user, 
    no_hp, 
    tanggal_lahir, 
    level_users
  }
  await Model_User.Store(Data);
  req.flash('success', 'berhasil login');
  res.redirect('/login')
})

router.post('/log', async (req, res)=>{
  let {email, passwords} = req.body
  try{
    let  Data = await Model_User.Login(email)
    if(Data.length > 0){
      let enkripsi = Data[0].passwords
      let cek = await bcrypt.compare(passwords, enkripsi)
      if(cek){
        req.session.userId = Data[0].id_user;
        req.flash('success', 'berhasil login')
        res.redirect('/users')
      }else{
        req.flash('error', 'gagal login')
        res.redirect('/login')
      }
    } 
  }catch(err){
  req.flash('success', 'berhasil login');
  res.redirect('/login')
  }
})

router.get('/logout', (req, res)=>{
  req.session.destroy(function(err){
    if(err){
      console.log(err)
    }else{
      res.redirect('/login')
    }
  })
})


module.exports = router;
