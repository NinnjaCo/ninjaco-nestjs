import * as Joi from 'joi'

const configSchema = Joi.object({
  MONGODB_PORT: Joi.number().required().default(27017),
  MONGODB_URL: Joi.string().default('mongodb://localhost:27017/ninjacodb'),
  MONGODB_URL_E2E_TEST: Joi.string().default('mongodb://localhost:27017/testdb'),
  MONGODB_NAME: Joi.string().required().default('ninjacodb'),
  MONGODB_HOST: Joi.string().required(),
  MONGODB_USERNAME: Joi.string().required(),
  MONGODB_PASSWORD: Joi.string().required(),

  PROVIDER: Joi.string().required().default('local'),
  BUCKET_NAME: Joi.string().required(),
  STACKHERO_MINIO_HOST: Joi.string().required(),
  MINIO_CONSOLE_PORT: Joi.number().default(9001),
  MINIO_API_PORT: Joi.number().required().default(9000),
  STACKHERO_MINIO_ACCESS_KEY: Joi.string().required(),
  STACKHERO_MINIO_SECRET_KEY: Joi.string().required(),

  MAIL_HOST: Joi.string().required(),
  MAIL_PORT: Joi.number().required(),
  MAIL_IGNORE_TLS: Joi.boolean().default(true),
  MAIL_SECURE: Joi.boolean().default(false),
  MAIL_USERNAME: Joi.string().allow('').required(),
  MAIL_PASSWORD: Joi.string().allow('').required(),

  NEST_PORT: Joi.number().default(3200),
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),

  APP_URL: Joi.string().default('http://localhost:3000'),
})

/**
 * Custom function to validate environment variables. It takes an object containing environment variables as input and outputs validated environment variables.
 *
 * @param {Record<string, any>} config - Description of the parameter.
 * @returns {Record<string, any>} Description of the return value.
 * @throws {Error} Description of the exception.
 */
export function validateConfig(config: Record<string, any>) {
  const { error, value } = configSchema.validate(config, {
    allowUnknown: true,
    cache: true,
    convert: true,
  })
  if (error) {
    throw new Error(`Config validation error: ${error.message}`)
  }
  return value
}
