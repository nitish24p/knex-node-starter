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

};

export default Bookshelf.model('User', User);