//users seeds
//const the models
const { User } = require('../models');

//creating user data
const userData = [
    {
      username: 'Christian',
      email: 'christian@gmail.com',
      password: 'jimmygotbuckets1'
    },
    {
      username: 'SendBandz',
      email: 'sendbandz@gmail.com',
      password: 'SendBandz355'
    },
    {
      username: 'Motel8',
      email: 'motel8@gmail.com',
      password: "motel8isme"
    },
    {
      username: 'Therapperdrake',
      email: 'therapperdrake@gmail.com',
      password: 'therapperdrake908'
    }
  ];
//individual hooks for safer password protection
  const seedUser = () => User.bulkCreate(userData, { individualHooks: true });

  module.exports = seedUser;

