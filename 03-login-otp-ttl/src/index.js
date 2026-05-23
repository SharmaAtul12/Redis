import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

function otpKey(phone) {
  return `otp:${phone}`;
}

app.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await redis.set(otpKey(phone), otp , 'EX', 30); // 30 seconds TTL
  return res.json({ message: 'OTP sent successfully', otp }); 
});

app.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ error: 'Phone number and OTP are required' });
  }
  const storedOtp = await redis.get(otpKey(phone));
  if(!storedOtp) {
    return res.status(400).json({ error: 'OTP has expired or does not exist' });
  }
  if(storedOtp !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
  // OTP is valid, remove it from Redis
  await redis.del(otpKey(phone));
  return res.json({ message: 'OTP verified successfully' });
});

app.get('/otp/:phone/ttl', async (req, res) => {
  const ttl = await redis.ttl(otpKey(req.params.phone));
  return res.json({ ttl });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});