import { env } from 'node:process';
import { EnvironmentInterface } from '../environment.interface';

export const defaultEnvironment = (): EnvironmentInterface => ({
  port: env.PORT ? parseInt(env.PORT, 10) : 3000,
  fallbackLanguage: env.FALLBACK_LANGUAGE ?? 'en',
  mongodbUri: env.MONGODB_URI ?? 'mongodb://localhost:27017/livora-db',
  jwt: {
    secret: env.JWT_SECRET ?? 'your-secret-key',
    accessTokenExpiration: env.ACCESS_TOKEN_EXPIRATION ?? '1h',
    refreshTokenExpiration: env.REFRESH_TOKEN_EXPIRATION ?? '7d',
  },
});
