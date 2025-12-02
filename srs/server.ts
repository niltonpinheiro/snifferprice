import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import pool from './db/connection';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Health Check
app.get('/health', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'ok',
      database: 'connected',
      timestamp: result.rows[0].now,
      environment: process.env.NODE_ENV
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      error: (error as Error).message
    });
  }
});

// Rota raiz
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'SnifferPrice API',
    version: '1.0.0',
    endpoints: {
      health: '/health'
    }
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}` );
  console.log(`📊 Health check em http://localhost:${port}/health` );
});