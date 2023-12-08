const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:'); // Utilizamos una base de datos en memoria para este ejemplo

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS articulos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      marca TEXT,
      tipo TEXT,
      stock INTEGER
    )
  `);
});

class Articulo {
  static getAll(callback) {
    db.all('SELECT * FROM articulos', (err, rows) => {
      callback(err, rows);
    });
  }

  static getById(id, callback) {
    db.get('SELECT * FROM articulos WHERE id = ?', [id], (err, row) => {
      callback(err, row);
    });
  }

  static create(articulo, callback) {
    const { nombre, marca, tipo, stock } = articulo;
    db.run('INSERT INTO articulos (nombre, marca, tipo, stock) VALUES (?, ?, ?, ?)', [nombre, marca, tipo, stock], function (err) {
      callback(err, { id: this.lastID, ...articulo });
    });
  }

  static update(id, articulo, callback) {
    const { nombre, marca, tipo, stock } = articulo;
    db.run('UPDATE articulos SET nombre = ?, marca = ?, tipo = ?, stock = ? WHERE id = ?', [nombre, marca, tipo, stock, id], function (err) {
      callback(err, { id, ...articulo });
    });
  }

  static delete(id, callback) {
    db.run('DELETE FROM articulos WHERE id = ?', [id], function (err) {
      callback(err, { id, message: 'Artículo eliminado correctamente' });
    });
  }
}

module.exports = Articulo;
