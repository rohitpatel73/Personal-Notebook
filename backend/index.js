import express from 'express';
import cors from 'cors';
import connectToMongo from './db.js';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';

const app = express();
const port = 5000;

connectToMongo();

app.use(cors());
app.use(express.json());
app.get('/rohit', (req, res) => {
  res.send('Hello Rohit');
})
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});
