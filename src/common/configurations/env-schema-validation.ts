import * as Joi from 'joi';

/** Validates process.env keys (flat). Nested shape comes from `load` factories. */
export const envSchemaValidation = Joi.object({
  PORT: Joi.number().integer().min(1).max(65535).default(3000),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'staging', 'test')
    .default('development'),
  FALLBACK_LANGUAGE: Joi.string().required(),
  MONGODB_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRATION: Joi.string().required().default('1h'),
  REFRESH_TOKEN_EXPIRATION: Joi.string().required().default('7d'),
}).unknown(true);
