var express = require('express');
var router = express.Router();
const Model_User = require('../Model/Model_User')
const Model_Lelang = require('../Model/Model_Lelang')

/* GET users listing. */
router.get('/', async function(req, res, next) {
    try{
      let id = req.session.userId
      let Data = await Model_User.getId(id);
      let data = await Model_Lelang.join()
      if(Data.length > 0){
        res.render('user/index', {
          title: 'userhome',
          email: Data[0].email,
          data
        })
      }else{
        res.status(401).json({error: 'user tidak ada'})
      }
    }catch(error){
      res.status(501).json('butuh akses login')
    }
});

module.exports = router;
