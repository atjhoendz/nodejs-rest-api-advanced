import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  node_env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  postgres_user: process.env.POSTGRES_USER,
  postgres_password: process.env.POSTGRES_PASSWORD,
  postgres_db: process.env.POSTGRES_DB,
  postgres_db_test: process.env.POSTGRES_DB_TEST,
  postgres_port: process.env.POSTGRES_PORT,
  postgres_host: process.env.POSTGRES_HOST,
  redis_port: process.env.REDIS_PORT,
  redis_host: process.env.REDIS_HOST,
  elasticsearch_host: process.env.ELASTICSEARCH_HOST,
  elasticsearch_port: process.env.ELASTICSEARCH_PORT,

  isDev() {
    return this.node_env === 'development';
  },
  isProd() {
    return this.node_env === 'production';
  },
  isTest() {
    return this.node_env === 'test';
  },
  loggerLevel() {
    if (this.isDev()) return 'debug';
    else if (this.isProd()) return '';
    return '';
  },
  morganFormat() {
    if (this.isDev()) return 'dev';
    else if (this.isProd()) return 'combined';
    return 'tiny';
  },
  postgresSelectedDB() {
    if (this.isDev()) return this.postgres_db;
    else if (this.isProd()) return this.postgres_db;
    return this.postgres_db_test;
  },
  elasticsearchConnURL() {
    return `${this.elasticsearch_host}:${this.elasticsearch_port}`;
  },
};

export default config;
