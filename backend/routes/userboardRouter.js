const express = require('express');
const router = express.Router();
const UserBoard = require("../models/DashboardList");

router.get('/test', async (req, res, next) => {
  console.log(req.headers['x-special-proxy-header']);
  res.status(200).json({ message:'Hi!' });
});


router.get('/', async (req, res, next) => {
 //1. solution
  const user_id = req.headers["x-user_id"];

  if (!user_id) return res.status(401).json({ message: "x-user_id is missing"});

  const userboard = await UserBoard.findOneAndUpdate(
    {user_id},
    {user_id},
    {upsert: true, new: true},
  );

  res.json(userboard)
/*
//2. solution (not working)
  const userId = req.headers["x-user_id"];
  if(!userId) return res.status(401).json({message: "x-user_id missing"})

  const userboards = await UserBoard.findOne({user_id: userId})
  if (userBoards) return res.json(userBoards)

  const userB = new UserBoard({
    user_id: userId,
    dashboards: []
  })

  const saveUserB = await userB.save()
  res.status(200).json(saveUserB) 
  */
});
module.exports = router;
