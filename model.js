"use strict";

const Sqlite = require('better-sqlite3');

let db = new Sqlite('db3.sqlite');


exports.login = function(email, mdp) {
    let res = db.prepare('SELECT id FROM user WHERE email = ? AND mdp = ?').get(email, mdp);
    if (res.id == undefined){
      return -1;
    }
    return res.id;
  }
  
  
  exports.new_user = function(nom, prenom, email,mdp){
    let res = db.prepare('INSERT INTO user (nom, prenom, email, mdp) VALUES (?, ?, ?, ?)').run(nom, prenom, email, mdp);
    return res.lastInsertRowid;
  }
  exports.new_help = function(email,message){
    let res = db.prepare('INSERT INTO help (email, message) VALUES (?, ?)').run(email, message);
    return res.lastInsertRowid;
  }