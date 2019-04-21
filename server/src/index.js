const { ApolloServer } = require('apollo-server');
const isEmail = require('isemail');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const ContactAPI = require('./datasources/contact');

const store = require('../models');

const dataSources = () => ({
  contactAPI: new ContactAPI({ store })
});

const context = async ({ req }) => {

  const auth = (req.headers && req.headers.authorization) || '';

  const email = new Buffer(auth, 'base64').toString('ascii');

  if (!isEmail.validate(email)) return { user: null };

  const users = await store.User.findOrCreate({ where: { email } });
  const user = users && users[0] ? users[0] : null;

  return { user: { ...user.dataValues } };
};

const server = new ApolloServer({
  formatError: error => {
    console.log(error);
    return error;
  },
  typeDefs,
  resolvers,
  dataSources,
  context
});

if (process.env.NODE_ENV !== 'test')
  server
    .listen({ port: 4000 })
    .then(({ url }) => console.log(`  app running at ${url}`));

module.exports = {
  dataSources,
  context,
  typeDefs,
  resolvers,
  ApolloServer,
  ContactAPI,
  store,
  server
};
