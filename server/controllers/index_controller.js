'use strict';


const index = {
  home(req, res, next) {
    res.json({status: 'working'});
  }
}

export default index;