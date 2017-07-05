var sqlite3 = require('sqlite3').verbose();
var PouchDB = require("pouchdb");
    Q = require('q');
PouchDB.plugin(require('pouchdb-authentication'));
PouchDB.plugin(require('pouchdb-find'));
PouchDB.debug.enable('*');
PouchDB.debug.enable('pouchdb:find');
var winston = require('winston');

"use strict";

var BddUser = function () {
  this.init();
}

BddUser.prototype.getDatabase = function () { return this.database;}

BddUser.prototype.localReg = function(triG, sentence, callback){
  var db = this.pdb;
  var deferred = Q.defer();

  var user = {
    "triG": triG,
    "sentence": sentence
  }
  console.log("CREATING USER:", triG);
  winston.log('info', 'LocalReg', user);
  db.post(user).then(function (response) {
    console.log("USER CREATED");
  }).catch(function (err) {
    callback(err);
  });
  callback(null,user);
}

BddUser.prototype.getUsers = function (callback) {
  var db = this.pdb;
  db.find({
    selector: {triG : {'$exists': true}}
  }).then(function (result) {
    callback(null, result.docs);
  }).catch(function (err) {
    callback(err);
  });
}

BddUser.prototype.getUserByTriG = function (triG, callback) {
  var db = this.pdb;
  db.find({
    selector: {triG : {triG: triG}}
  }).then(function (result) {
    callback(null, result.docs);
  }).catch(function (err) {
    callback(err);
  });
}

BddUser.prototype.checkTable = function () {
  this.pdb.createIndex({
    index: {
      fields: ['triG']
    }
  });
 }

BddUser.prototype.init = function () {
  this.pdb = new PouchDB('users-ida');
  var remoteCouch = 'http://' + process.env.DB_USER +':'+process.env.DB_MDP+'@stephane.cloudant.com/users-ida';
  var opts = {live: true, retry: true};
  PouchDB.sync(remoteCouch, this.pdb, opts);
  this.checkTable();
}

exports.BddUser = exports = new BddUser();
