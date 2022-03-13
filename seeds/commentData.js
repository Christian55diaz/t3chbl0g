//comment seeds
const { Comment } = require('../models');

const commentData = [
    {
      user_id: 1,
      blogpost_id: 1,
      comment_text: "hope everyone enjoy the post"
    },
    {
      user_id: 3,
      blogpost_id: 2,
      comment_text: "WOWZERS"
    },
    {
      user_id: 2,
      blogpost_id: 3,
      comment_text: "fortnite battlepass"
    },
    {
      user_id: 1,
      blogpost_id: 4,
      comment_text: "chilll bro do not do that now"
    }
  ];

  //bulkcreate commentData
  