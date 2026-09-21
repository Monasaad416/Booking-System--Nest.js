import * as Joi from 'joi';

/** Validates process.env keys (flat). Nested shape comes from `load` factories. */
export const envSchemaValidation = Joi.object({
  PORT: Joi.number().integer().min(1).max(65535).default(3000),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'staging', 'test')
    .default('development'),
  DATABASE_URI: Joi.string().default('mongodb://localhost:27017/nestjs-api'),
  DATABASE_NAME: Joi.string().default('nestjs-api'),
  JWT_SECRET: Joi.string().default('secret'),
  JWT_EXPIRES_IN: Joi.string().default('1h'),
}).unknown(true);
