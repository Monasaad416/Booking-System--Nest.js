import { developmentEnvironment } from './environment-modes/development.env';
import { productionEnvironment } from './environment-modes/production.env';
import { stagingEnvironment } from './environment-modes/staging.env';
import { EnvironmentInterface } from './environment.interface';

export const environment = {
  development: developmentEnvironment,
  production: productionEnvironment,
  staging: stagingEnvironment,
};

export default (): EnvironmentInterface => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const getEnvToLoad = environment[nodeEnv as keyof typeof environment];
  console.log('getEnvToLoad', getEnvToLoad);
  return getEnvToLoad();
};
