const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'alpha.db');
const db = new sqlite3.Database(DB_PATH);

// Initialize DB schema
db.serialize(() => {
  // Bookings
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    serviceType TEXT,
    eventDate TEXT,
    location TEXT,
    message TEXT,
    status TEXT DEFAULT 'Pending',
    createdAt TEXT
  )`);

  // Site Config
  db.run(`CREATE TABLE IF NOT EXISTS site_config (
    id INTEGER PRIMARY KEY DEFAULT 1,
    config TEXT
  )`);

  // Images
  db.run(`CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT,
    title TEXT
  )`);

  // Initial Data Seed if empty
  db.get("SELECT COUNT(*) as count FROM site_config", (err, row) => {
    if (row && row.count === 0) {
      const initialConfig = {
        hero: {
          bg: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000&auto=format&fit=crop',
          title: 'The Standard of Elite Service in Kigali',
          subtitle: 'Weddings, protocol, and cultural experiences delivered with discipline, beauty, and excellence.',
          slides: []
        },
        services: {
          protocol: 'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?q=80&w=1000&auto=format&fit=crop'
        },
        leadership: {
          photo: 'https://images.unsplash.com/photo-1544168190-79c17527004f',
          name: 'Executive Director',
          vision: 'In the heart of Kabuga, elite service is more than a protocol—it’s an art form.'
        },
        social: { instagram: '#', facebook: '#', mail: 'mailto:contact@alpha.rw' },
        contact: {
          phone: '+250 7XX XXX XXX',
          email: 'contact@alpha.rw',
          address: '26CF+FH5 Kabuga Bus Station, Kabuga, Kigali, Rwanda'
        }
      };
      db.run("INSERT INTO site_config (config) VALUES (?)", [JSON.stringify(initialConfig)]);
    }
  });

  db.get("SELECT COUNT(*) as count FROM images", (err, row) => {
    if (row && row.count === 0) {
       db.run("INSERT INTO images (url, title) VALUES (?, ?)", ['https://images.unsplash.com/photo-1544644181-1484b3fdfc62', 'Coffee Ritual']);
       db.run("INSERT INTO images (url, title) VALUES (?, ?)", ['https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb', 'Ingenzi Dancers']);
    }
  });
});

module.exports = {
  // Bookings helpers
  getBookings: () => new Promise((resolve, reject) => {
    db.all("SELECT * FROM bookings ORDER BY createdAt DESC", (err, rows) => {
      if (err) reject(err); else resolve(rows);
    });
  }),
  addBooking: (booking) => new Promise((resolve, reject) => {
    const { id, name, email, serviceType, eventDate, location, message, status, createdAt } = booking;
    db.run(
      "INSERT INTO bookings (id, name, email, serviceType, eventDate, location, message, status, createdAt) VALUES (?,?,?,?,?,?,?,?,?)",
      [id, name, email, serviceType, eventDate, location, message, status, createdAt],
      function(err) { if (err) reject(err); else resolve({ ...booking }); }
    );
  }),
  updateBookingStatus: (id, status) => new Promise((resolve, reject) => {
    db.run("UPDATE bookings SET status = ? WHERE id = ?", [status, id], function(err) {
      if (err) reject(err); else resolve(this.changes > 0);
    });
  }),

  // Config helpers
  getConfig: () => new Promise((resolve, reject) => {
    db.get("SELECT config FROM site_config WHERE id = 1", (err, row) => {
      if (err) reject(err); else resolve(row ? JSON.parse(row.config) : null);
    });
  }),
  updateConfig: (config) => new Promise((resolve, reject) => {
    db.run("UPDATE site_config SET config = ? WHERE id = 1", [JSON.stringify(config)], function(err) {
      if (err) reject(err); else resolve(config);
    });
  }),

  // Images helpers
  getImages: () => new Promise((resolve, reject) => {
    db.all("SELECT * FROM images", (err, rows) => {
      if (err) reject(err); else resolve(rows);
    });
  }),
  addImage: (image) => new Promise((resolve, reject) => {
    db.run("INSERT INTO images (url, title) VALUES (?, ?)", [image.url, image.title], function(err) {
      if (err) reject(err); else resolve({ id: this.lastID, ...image });
    });
  }),
  deleteImage: (id) => new Promise((resolve, reject) => {
    db.run("DELETE FROM images WHERE id = ?", [id], function(err) {
      if (err) reject(err); else resolve(this.changes > 0);
    });
  })
};
