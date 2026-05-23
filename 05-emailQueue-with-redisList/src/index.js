import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');


const QUEUE_KEY = 'queue:emails';

app.post('/emails', async (req, res) => {
  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, body' });
  }

  const job = { to, subject, body, createdAt: new Date().toISOString() };

  await redis.lpush(QUEUE_KEY, JSON.stringify(job));

  return res.status(201).json({ message: 'Email job added to queue', job });

});

app.get('emails/process-one', async (req, res) => {
  const rawJob = await redis.rpop(QUEUE_KEY);

  if (!rawJob) {
    return res.status(200).json({ message: 'No email jobs in the queue' });
  }

  const job = JSON.parse(rawJob);
  // Simulate email sending Means you would replace this with actual email sending logic using a library like nodemailer
  return res.json({message: "Email Sent", job });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});