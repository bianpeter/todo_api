const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  if(!req.headers["user_id"]){
    return res.status(401).json({message: "user_id is missing"});
  }
  res.status(200).json({message: "hello world"});
});


module.exports = router;
