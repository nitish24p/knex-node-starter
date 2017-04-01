// Update with your config settings.

const config = require('./config/config.json');

module.exports = {
  server_env: {
    client: config.db.client,
    connection: {
      database: config.db.database_name,
      user: config.db.database_username,
      password: config.db.database_password,
      host: config.db.host,
      port: config.db.port
    },
    seeds: {
      directory: __dirname + config.seeds_file
    }
  }
};