import { EnvironmentInterface } from '../environment.interface';
import { defaultEnvironment } from './default.env';

export const developmentEnvironment = (): EnvironmentInterface => ({
  ...defaultEnvironment(),
  //override default environment
 //   port: 5000,
});
