import { EnvironmentInterface } from '../environment.interface';
import { developmentEnvironment } from './development.env';

export const productionEnvironment = (): EnvironmentInterface => ({
  ...developmentEnvironment(),
  port: 8000,
});
