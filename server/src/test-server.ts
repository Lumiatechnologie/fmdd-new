import express from 'express';
const app = express();
app.get('/', (req, res) => res.send('Backend is alive!'));
app.listen(5001, () => console.log('Diagnostic server running on port 5001'));
