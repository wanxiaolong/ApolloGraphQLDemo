require('dotenv').config();

module.exports = {
  development: {
    client: 'pg', // 使用PostgreSQL
    connection: {
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      database: process.env.PG_DATABASE,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
    },
    migrations: {
      directory: './migrations', // 迁移文件目录
    },
    seeds: {
      directory: './seeds', // 测试数据目录
    },
  }
};