var express = require('express');
var router = express.Router();
var request = require('request');
var bddUser = require('../_modules/bddUser').BddUser;

/* GET home page. */
router.get('/', function(req, res, next) {
    bddUser.getUsers(
      function(err, rows){
        if(rows){
          res.render('index', {
            title: 'Liste des utilisateurs',
            users: rows
          });
        }else{
          res.render('error', {
            message: "Impossible de récupérer la liste des utilisateurs",
            error: err });
        }
      })
});

module.exports = router;
