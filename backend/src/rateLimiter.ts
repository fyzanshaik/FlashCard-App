// rateLimiters.ts
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { createClient } from 'redis';

// Create and configure Redis client
const redisClient = createClient({
	url: process.env.REDIS_URL, // Ensure this environment variable is set
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

redisClient.connect().catch((err) => console.error('Failed to connect to Redis', err));

// Create rate limiter for API requests
const apiRateLimiter = rateLimit({
	store: new RedisStore({
		sendCommand: (...args: any[]) => redisClient.sendCommand(args),
	}),
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (15 minutes)
	message: 'Too many requests from this IP, please try again later.',
});

// Create rate limiter for authentication requests
const authRateLimiter = rateLimit({
	store: new RedisStore({
		sendCommand: (...args: any[]) => redisClient.sendCommand(args),
	}),
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 10, // Limit each IP to 10 requests per `window` (5 minutes)
	message: 'Too many login attempts from this IP, please try again later.',
});

export { apiRateLimiter, authRateLimiter };
