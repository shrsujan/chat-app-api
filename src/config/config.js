const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  port: process.env.PORT || 1993,
  app: {
    title: 'Chat App'
  },
  development: {
    host: process.env.DB_HOST || '127.0.0.1',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'chat-app',
    dialect: process.env.DB_DIALECT || 'mysql'
  },
  test: {
    host: process.env.DB_HOST || '127.0.0.1',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.TEST_DB_DATABASE || 'chat-app-test',
    dialect: process.env.DB_DIALECT || 'mysql'
  }
}
