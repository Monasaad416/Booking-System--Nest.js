import { env } from 'node:process';
import { EnvironmentInterface } from '../environment.interface';

export const defaultEnvironment = (): EnvironmentInterface => ({
  port: env.PORT ? parseInt(env.PORT, 10) : 3000,
});
