// server.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const db = require('./db.json');

app.get('/ping', (req: Request, res: Response) => {
  res.json({ success: true });
});

app.post('/submit', (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;
  const submission = { name, email, phone, github_link, stopwatch_time };
  db.push(submission);
  res.json({ success: true });
});

app.get('/read', (req: Request, res: Response) => {
    const index = req.query.index as string | undefined;
    if (index !== undefined) {
        const parsedIndex = parseInt(index, 10);
        if (parsedIndex >= 0 && parsedIndex < db.length) {
            res.json(db[parsedIndex]);
        } else {
            res.status(404).json({ error: 'Submission not found' });
        }
    } else {
        res.status(400).json({ error: 'Invalid request' });
    }
});
 

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});