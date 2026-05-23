import express from 'express';
import {emailQueue} from './queue.js';

const app = express();
app.use(express.json());

app.post('/welcome-email', async (req, res) => {
  const job = await emailQueue.add(
    "send-welcome-email",
    {
      to : req.body.to,
      name: req.body.name,
      subject : "Welcome to our service!",
      body : "Thank you for signing up for our service. We're excited to have you on board!"
    },
    {
      attempts: 3, // Retry up to 3 times if the job fails
      backoff: {
        type: 'exponential',
        delay: 5000, // Initial delay of 5 seconds before retrying
      },
    }
  )
  return res.status(200).json({ message: 'Welcome email job added to the queue', jobId: job.id });
});



app.listen(3000, () => {
  console.log('API listening on port 3000');
});