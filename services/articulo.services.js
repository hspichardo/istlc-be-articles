// services/articleService.js

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

// Crear la tabla de artículos
db.serialize(() => {
  db.run('CREATE TABLE articles (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, marca TEXT, tipo TEXT, stock INTEGER)');
});

exports.getAllArticles = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM articles', (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

exports.getArticleById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM articles WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

exports.createArticle = (article) => {
  return new Promise((resolve, reject) => {
    const { nombre, marca, tipo, stock } = article;
    db.run('INSERT INTO articles (nombre, marca, tipo, stock) VALUES (?, ?, ?, ?)', [nombre, marca, tipo, stock], function (err) {
      if (err) reject(err);
      resolve({ id: this.lastID, ...article });
    });
  });
};

exports.updateArticle = (id, article) => {
  return new Promise((resolve, reject) => {
    const { nombre, marca, tipo, stock } = article;
    db.run('UPDATE articles SET nombre=?, marca=?, tipo=?, stock=? WHERE id=?', [nombre, marca, tipo, stock, id], function (err) {
      if (err) reject(err);
      resolve({ id, ...article });
    });
  });
};

exports.deleteArticle = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM articles WHERE id = ?', [id], (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};
