require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/health', async (req, res) => {
  try {
    const config = await db.getConfig();
    const tables = await db.debug_listTables();
    const dbHost = process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).hostname : 'NOT SET';
    res.json({ 
      status: 'ok', 
      dbHost, 
      tables, 
      configInitialized: !!config 
    });
  } catch (err) { 
    res.status(500).json({ 
      status: 'error', 
      error: err.message,
      dbHost: process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).hostname : 'NOT SET'
    }); 
  }
});

// API Routes
app.get('/api/config', async (req, res) => {
  try {
    const config = await db.getConfig();
    res.json(config);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/config', async (req, res) => {
  try {
    const current = await db.getConfig();
    const newConfig = { ...current, ...req.body };
    await db.updateConfig(newConfig);
    res.json(newConfig);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const newBooking = {
      id: `B${Math.floor(Math.random() * 9000) + 1000}`,
      ...req.body,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    await db.addBooking(newBooking);
    res.status(201).json(newBooking);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await db.getBookings();
    res.json(bookings);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.patch('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const success = await db.updateBookingStatus(id, status);
    if (success) {
      res.json({ id, status });
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/images', async (req, res) => {
  try {
    const images = await db.getImages();
    res.json(images);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/images', async (req, res) => {
  try {
    const newImg = await db.addImage({ ...req.body });
    res.status(201).json(newImg);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/images/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.deleteImage(id);
    res.status(204).send();
  } catch (err) { res.status(500).json({ error: err.message }); }
});

if (require.main === module) {
  app.listen(PORT, '127.0.0.1', () => {
    console.log(`Elite Realtime Backend (PostgreSQL Serverless Setup) running on http://127.0.0.1:${PORT}`);
  });
}

module.exports = app;
