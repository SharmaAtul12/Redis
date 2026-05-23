import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

app.post('/user/:id/json', async (req, res) => {
  await redis.set(`user:${req.params.id}:json`, JSON.stringify(req.body));
  return res.json({savedAs: "JSON"});
});

app.get('/user/:id/json', async (req, res) => {
  const data = await redis.get(`user:${req.params.id}:json`);
  return res.json({user : data ? JSON.parse(data) : null});
});

app.post('/user/:id/hash', async (req, res) => {
  await redis.hset(`user:${req.params.id}:hash`, req.body);
  return res.json({savedAs: "Hash"});
});

app.get('/user/:id/hash', async (req, res) => {
  const user = await redis.hgetall(`user:${req.params.id}:hash`);
  return res.json({user});
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
