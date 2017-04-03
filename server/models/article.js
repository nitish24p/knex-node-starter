// users.js
'use strict';

import Bookshelf from'../bookshelf';

require('./user');

class Article extends Bookshelf.Model {

  get tableName() {
    return 'articles'
  };

  user() {
    return this.belongsTo('User');
  }

  // add custom getter setters here
};

export default Bookshelf.model('Article', Article);
