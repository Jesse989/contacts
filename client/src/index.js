import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './login';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { Query, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

import { typeDefs } from './resolvers';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
});


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  typeDefs

});

client.cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  }
})

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;



ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={IS_LOGGED_IN}>
      {({data}) => (data.isLoggedIn ? <App /> : <Login />)}
    </Query>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
