# Redis Learning Repository

This repository is the main workspace for learning Redis through a sequence of lectures and hands-on exercises.

At the moment, eight exercises are included:

- `01-local-redis-setup` — running Redis and MongoDB locally with a small Node.js service
- `02-site-banner` — storing and serving a banner message from Redis
- `03-login-otp-ttl` — implementing OTP-based login with TTL stored in Redis
- `04-user-profile-cache` — caching user profile data in Redis
- `05-emailQueue-with-redisList` — an email queue implemented using Redis lists
- `06-bullMQ` — background jobs using BullMQ (queues, workers, API)
- `07-pubsub-notification` — publish/subscribe notification examples with Redis
- `08-Leaderboard` — implementing a leaderboard using Redis sorted sets

## Current Work

- Local Redis container with persistent storage
- Local MongoDB container with persistent storage
- Express-based Node.js app for connection checks
- Redis-backed site banner API
- Basic Redis and MongoDB integration examples

## Lecture 1: Local Redis Setup

The first lecture covers a local development environment for Redis and MongoDB using Docker Compose, along with a small Node.js service that verifies connectivity.

### Project Structure

- `01-local-redis-setup/docker-compose.yml` - starts Redis and MongoDB locally
- `01-local-redis-setup/package.json` - Node.js dependencies and scripts
- `01-local-redis-setup/src/index.js` - Express server with Redis and MongoDB routes
- `02-site-banner/docker-compose.yml` - starts Redis and MongoDB locally for the banner app
- `02-site-banner/package.json` - Node.js dependencies and scripts
- `02-site-banner/src/index.js` - Express server with Redis-backed banner routes
- `03-login-otp-ttl/docker-compose.yml` - (optional) supporting services for OTP examples
- `03-login-otp-ttl/package.json` - Node.js dependencies and scripts for OTP
- `03-login-otp-ttl/src/index.js` - OTP generation and TTL checks using Redis
- `04-user-profile-cache/docker-compose.yml` - (optional) supporting services for cache examples
- `04-user-profile-cache/package.json` - Node.js dependencies and scripts for caching
- `04-user-profile-cache/src/index.js` - example of caching user profiles in Redis
- `05-emailQueue-with-redisList/docker-compose.yml` - optional infra for the queue example
- `05-emailQueue-with-redisList/package.json` - dependencies and scripts for the email queue
- `05-emailQueue-with-redisList/src/index.js` - producer/consumer using Redis lists
- `06-bullMQ/docker-compose.yml` - infra for BullMQ worker examples
- `06-bullMQ/package.json` - dependencies and scripts for BullMQ
- `06-bullMQ/src/api.js` - API to enqueue jobs
- `06-bullMQ/src/queue.js` - queue definitions
- `06-bullMQ/src/worker.js` - worker that processes jobs
- `07-pubsub-notification/docker-compose.yml` - infra for pub/sub demos
- `07-pubsub-notification/package.json` - dependencies and scripts for pub/sub
- `07-pubsub-notification/src/api.js` - publisher API
- `07-pubsub-notification/src/subscriber.js` - example subscriber
- `08-Leaderboard/docker-compose.yml` - infra for leaderboard examples
- `08-Leaderboard/package.json` - dependencies and scripts for leaderboard
- `08-Leaderboard/src/index.js` - leaderboard demo using sorted sets

### Prerequisites

- Docker Desktop or Docker Engine
- Node.js 18+ recommended
- npm

### Getting Started

1. Start the local services:

```bash
cd 01-local-redis-setup
docker compose up -d
```

2. Install the Node.js dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm run dev
```

The app runs on port `3000` by default.

### Available Routes

- `GET /redis` - checks the Redis connection with a `PING`
- `GET /mongo` - connects to MongoDB and returns the database name

### Banner Routes

- `POST /banner` - stores a banner message in Redis
- `GET /banner` - returns the current banner message
- `DELETE /banner` - removes the banner message
- `GET /banner/exist` - checks whether the banner key exists

### Environment Variables

The application supports the following optional variables:

- `REDIS_URL` - Redis connection string, defaults to `redis://localhost:6379`
- `MONGO_URL` - MongoDB connection string, defaults to `mongodb://localhost:27017/mongo_with_redis`

## Future Lectures

As new lectures are completed, this repository will grow with additional folders, examples, and notes for each topic.
