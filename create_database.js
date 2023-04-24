const Sqlite = require('better-sqlite3');

// Créer une connexion à la base de données
const db = new Sqlite('db3.sqlite');

// Supprimer la table 'user' si elle existe déjà
db.prepare("DROP TABLE IF EXISTS user").run();

// Créer une nouvelle table 'user'
db.prepare('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, prenom TEXT, email TEXT, mdp TEXT)').run();

// Insérer une ligne de données dans la table 'user'
db.prepare("INSERT INTO user(nom, prenom, email, mdp) VALUES ('lamine', 'zeghar', 'email','lamine')").run();


db.prepare("DROP TABLE IF EXISTS help").run();

// Créer une nouvelle table 'user'
db.prepare('CREATE TABLE help (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, message TEXT)').run();

