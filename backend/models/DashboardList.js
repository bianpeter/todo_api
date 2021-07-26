const mongoose = require('mongoose');

const example =  {
  user_id:"123",
  dashboards: [
    {
      title: "title",
      todos: [
        {
          title: "title",
          description: "something",
        },
        {
          title: "title",
          description: "something",
        },
      ],
    },
    {
      title: "title",
      todos: [
        {
          title: "title",
          description: "something",
        },
        {
          title: "title",
          description: "something",
        },
      ],
    },
  ],
};

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const DashboardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  todos: {
    type: [TodoSchema],
    default: [],
  }
});

const UserBoardSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  dashboards: {
    type: [DashboardSchema],
    default: [],
  }
});

const UserBoard = mongoose.model('userboard', UserBoardSchema);

module.exports = UserBoard;

