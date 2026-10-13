export interface EnvironmentInterface {
  port: number;
  mongodbUri: string;
  fallbackLanguage: string;
  jwt: {
    secret: string;
    accessTokenExpiration: string;
    refreshTokenExpiration: string;
  };
}
