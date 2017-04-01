import config from '../config/config.json';


let knex = require('knex')({
  client: config.db.client,
  connection: {
    host     : config.db.host,
    user     : config.db.database_username,
    password : config.db.database_password,
    database : config.db.database_name,
    charset  : config.db.charset
  }
});

const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');
bookshelf.plugin('pagination');

export default bookshelf;