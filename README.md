# Redis Learning Repository

This repository is the main workspace for learning Redis through a sequence of lectures and hands-on exercises.

At the moment, two exercises are included:

- `01-local-redis-setup` for running Redis and MongoDB locally with a small Node.js service
- `02-site-banner` for storing and serving a banner message from Redis

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
