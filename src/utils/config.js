import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  node_env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  postgres_user: process.env.POSTGRES_USER,
  postgres_password: process.env.POSTGRES_PASSWORD,
  postgres_db: process.env.POSTGRES_DB,
  postgres_port: process.env.POSTGRES_PORT,
  postgres_host: process.env.POSTGRES_HOST,

  isDev() {
    return this.node_env == 'development';
  },
};

export default config;
