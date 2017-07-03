var express = require('express');
var router = express.Router();
var request = require('request');
var bddUser = require('../_modules/bddUser').BddUser;

router.post('/validate', function(req, res, next) {
  bddUser.localReg(req.body.prenom, req.body.nom, req.body.avis,
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

router.get('/ska', function(req, res, next) {
  res.render('ska');
});

router.get('/ryk', function(req, res, next) {
  res.render('ryk');
});

module.exports = router;
