import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/AuthRoutes.js';
import formationRoutes from './routes/FormationRoutes.js';
import progressionRoutes from './routes/ProgressionRoutes.js';
import jobRoutes from './routes/JobRoutes.js';
import incubationRoutes from './routes/IncubationRoutes.js';
import userRoutes from './routes/UserRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/formations', formationRoutes);
app.use('/api/progress', progressionRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/incubation', incubationRoutes);
app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Basic Error Handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
