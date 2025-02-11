import Redis from 'ioredis'
import dotenv from "dotenv"
dotenv.config();
export  const redis = new Redis(process.env.UPSLTSH_REDIS_URL);
await  redis.set('foo', 'bar'); 