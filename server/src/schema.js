const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    me: User
    contacts: [Contact]
  }

  type Mutation {
    login(email: String): String # login token
    addContact(
      email: String
      phone: String
      first: String
      last: String
    ): ContactUpdateResponse
    editContact(
      id: ID!
      email: String
      phone: String
      first: String
      last: String
    ): ContactUpdateResponse
    removeContact(contactId: ID!): ContactUpdateResponse
  }

  type ContactUpdateResponse {
    success: Boolean!
    message: String
    contact: Contact
  }

  type User {
    id: ID!
    email: String!
    contacts: [Contact]!
  }

  type Contact {
    id: ID!
    email: String
    phone: String
    first: String
    last: String
    owner: ID!
  }

`
module.exports = typeDefs;
