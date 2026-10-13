import { EnvironmentInterface } from '../environment.interface';
import { defaultEnvironment } from './default.env';

export const developmentEnvironment = (): EnvironmentInterface => {
  const defaults = defaultEnvironment();

  return {
    ...defaults,
    // override default environment
    // port: 5000,
    jwt: {
      ...defaults.jwt,
      accessTokenExpiration: '7d',
      refreshTokenExpiration: '7d',
    },
  };
};
