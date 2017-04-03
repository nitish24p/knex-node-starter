// users.js
'use strict';

import Bookshelf from'../bookshelf';

require('./articles');

class User extends Bookshelf.Model {

  get tableName() {
    return 'user'
  };

  articles() {
    return this.hasMany('Articles');
  };

  // add custom getter setters here
};

export default Bookshelf.model('User', User);