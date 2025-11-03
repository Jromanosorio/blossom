import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

export const redisClient = new Redis({
  url: process.env.REDIS_HOST!,
  token: process.env.REDIS_PASSWORD!,
});

export const connectRedis = async () => {
  try {
    await redisClient.ping();
    console.log("Connected to Upstash Redis successfully");
  } catch (error) {
    console.error("Upstash Redis connection error:", error);
  }
};

export const getCachedData = async <T>(key: string): Promise<T | null> => {
  try {
    const data = await redisClient.get(key);
    return data ? (typeof data === "string" ? JSON.parse(data) : data as T) : null;
  } catch (error) {
    console.error("Error getting cached data:", error);
    return null;
  }
};

export const setCachedData = async (
  key: string,
  data: any,
  expirationInSeconds = 3600
): Promise<boolean> => {
  try {
    await redisClient.set(key, JSON.stringify(data), { ex: expirationInSeconds });
    return true;
  } catch (error) {
    console.error("Error setting cached data:", error);
    return false;
  }
};

export const deleteCachedData = async (key: string): Promise<boolean> => {
  try {
    await redisClient.del(key);
    return true;
  } catch (error) {
    console.error("Error deleting cached data:", error);
    return false;
  }
};

export const deleteCachedDataByPrefix = async (prefix: string) => {
  try {
    const keys = await redisClient.keys(`${prefix}:*`);

    if (keys.length > 0) {
      await Promise.all(keys.map((key) => redisClient.del(key)));
      console.log(`Cleared ${keys.length} keys with prefix "${prefix}"`);
    } else {
      console.log(`No cache keys found for prefix "${prefix}"`);
    }
  } catch (error) {
    console.error("Error deleting cache by prefix:", error);
  }
};