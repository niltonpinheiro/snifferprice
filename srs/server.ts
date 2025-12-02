import express from 'express';
import pool from './db/connection';

const app = express();
const port = process.env.PORT || 8080; // Azure usa 8080

app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'ok',
      database: 'connected',
      timestamp: result.rows[0].now
    });
  } catch (error) {
    res.status(500).json({ status: 'error' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor em http://localhost:${port}` );
});
