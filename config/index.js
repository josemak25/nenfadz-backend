import dotenv from 'dotenv';
import { Joi } from 'celebrate';

dotenv.config();

const envVariableSchema = Joi.object({
  PORT: Joi.string().default('5000'),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  MONGO_HOST: Joi.string()
    .required()
    .default('mongodb://localhost/nenfadz')
    .description('Database host name'),
  MONGOOSE_DEBUG: Joi.boolean()
    .valid(true, false)
    .description('debugging mongoose model fo query paths')
    .required(),
  BCRYPT_ROUND: Joi.number()
    .required()
    .description('bcrypt password hash'),
  JWT_SECRET: Joi.string()
    .required()
    .description('JWT required to sign token'),
  JWT_EXPIRY: Joi.string()
    .required()
    .description('JWT expiry required to sign off token expiry time')
})
  .unknown()
  .required();

const { error, value: envVariables } = envVariableSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVariables.NODE_ENV,
  port: envVariables.PORT,
  mongooseDebug: envVariables.MONGOOSE_DEBUG,
  jwtSecret: envVariables.JWT_SECRET,
  jwtExpiry: envVariables.JWT_EXPIRY,
  bcryptSalt: envVariables.BCRYPT_ROUND,
  mongoUri:
    envVariables.NODE_ENV === 'test'
      ? envVariables.MONGO_HOST_TEST
      : envVariables.MONGO_HOST
};

export default config;
