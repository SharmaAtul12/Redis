import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

const POST_VIEWS_KEY = 'post:views';
const USER_SCORES_KEY = 'user:scores';

app.post('/post/:id/view', async (req, res) => {
  const postId = req.params.id;
  await redis.incr(`${POST_VIEWS_KEY}:${postId}`);
  return res.status(200).json({ message: `Post ${postId} view count incremented.` });
});

app.post('/leaderboard/score', async (req, res) => {
  const { userId, score } = req.body;
  // In first time , it will create a new entry for the user with the given score, and in subsequent calls, it will update the existing score by adding the new score to it.
  await redis.zincrby(USER_SCORES_KEY, Number(score), userId);
  return res.status(200).json({ message: `User ${userId} score updated by ${score}.` });
});

app.get('/leaderboard', async (req, res) => {
  const topUsers = await redis.zrevrange(USER_SCORES_KEY, 0, 9, 'WITHSCORES');
  return res.status(200).json({ leaderboard: topUsers });
});

app.get('/leaderboard/:userId/rank', async (req,res) => {
  const userId = req.params.userId;
  const rank = await redis.zrevrank(USER_SCORES_KEY, userId);
  return res.status(200).json({ userId, rank: rank !== null ? rank + 1 : null });
});