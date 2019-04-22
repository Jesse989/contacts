import React from 'react';
import { Button, Icon, Dimmer, Loader  } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';

import gql from 'graphql-tag';

import { GET_CONTACTS } from '../containers/contacts';

const ADD_CONTACT = gql`
mutation AddContact($email: String, $phone: String, $first: String, $last: String) {
  addContact(email: $email, phone: $phone, first: $first, last: $last){
    success
    message
    contact {
      id
      email
      phone
      first
      last
      owner
    }
  }
}`;


const Add = ({ email, phone, first, last, toggle, disabled }) => (
  <Mutation
    mutation={ADD_CONTACT}
    update={(cache, { data: { addContact } }) => {
      const { contacts } = cache.readQuery({ query: GET_CONTACTS });
      cache.writeQuery({
        query: GET_CONTACTS,
        data: { contacts: contacts.filter(contact => contact.id !== addContact.contact.id).concat([addContact.contact]) },
      })
    }}
    variables={{
      email,
      phone,
      first,
      last
    }}
  >
    {(addContact, { loading, error }) => {
      if (loading) {
        return (
          <Dimmer active>
            <Loader />
          </Dimmer>
        )
      }
      if (error) return <p>An error occurred</p>;


      const handleSubmit = event => {
        event.preventDefault();
        addContact();
        toggle();
      }

      return (
        <Button
          disabled={disabled || !first || !last || !email || !phone}
          basic
          color="green"
          onClick={handleSubmit}
        >
          <Icon name='plus' />
            Add
        </Button>
      )
    }}
  </Mutation>
)

export default Add;
