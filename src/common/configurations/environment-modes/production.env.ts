import { EnvironmentInterface } from '../environment.interface';
import { developmentEnvironment } from './development.env';

export const productionEnvironment = (): EnvironmentInterface => ({
  ...developmentEnvironment(),
  port: 8000,
  jwt: {
    ...developmentEnvironment().jwt,
    accessTokenExpiration: '1d',
    refreshTokenExpiration: '7d',
  },
});
