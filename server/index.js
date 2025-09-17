import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { createConnection } from './db/connection.js';
import productsRouter from './routes/products.js';
import authRouter from './routes/auth.js';
import uploadsRouter from './routes/uploads.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

// Initialize database
await createConnection();

// Routes
app.get('/health', (req, res) => res.json({ ok: true }));
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/uploads', uploadsRouter);

const port = process.env.API_PORT || 4000;
app.listen(port, () => console.log(`✅ API running on http://localhost:${port}`));


