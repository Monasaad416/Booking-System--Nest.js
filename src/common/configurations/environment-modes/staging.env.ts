import { EnvironmentInterface } from '../environment.interface';
import { defaultEnvironment } from './default.env';

export const stagingEnvironment = (): EnvironmentInterface => ({
  ...defaultEnvironment(),
  port: 6000,
});
