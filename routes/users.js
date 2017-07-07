var express = require('express');
var router = express.Router();
var request = require('request');
var bddUser = require('../_modules/bddUser').BddUser;

router.post('/validate', function(req, res, next) {
  bddUser.localReg(req.body.triG, req.body.avis,
  function(err, rows){
    if(rows){
      res.redirect('/');
    }else{
      res.render('error', {
        message: "Impossible de créer l'utilisateur'",
        error: err });
    }
  });
});

router.get('/clg', function(req, res, next) {
  var triG = "clg";
  bddUser.getUserByTriG(triG,
  function(err, rows){
    if(err){
      res.render('error', {
        error : err
      });
    }else{
      res.render('clg');
    }
  });
});

router.get('/:trig', function(req, res, next) {
  var triG = req.params.trig;
  bddUser.getUserByTriG(triG,
  function(err, rows){
    if(err){
      res.render('error', {
        error : err
      });
    }
    if(rows[0]){
      res.render(triG, {
        user : rows[0]
      });
    }else{
      res.render(triG);
    }
  });
});

module.exports = router;
