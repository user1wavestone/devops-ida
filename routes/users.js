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

router.get('/ska', function(req, res, next) {
  bddUser.getUserByTriG(req.body.triG,
  function(err, rows){
    if(rows){
      console.log(rows[0]);
      res.render('ska', {
        user : rows[0]
      });
    }else{
      res.render('error', {
        message: "Impossible de créer l'utilisateur'",
        error: err });
    }
  });
});

module.exports = router;
