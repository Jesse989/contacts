import React, { Fragment } from 'react';
import { Button, Icon, Loader } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';

import gql from 'graphql-tag';
import { GET_CONTACTS } from '../containers/contacts';

const DELETE_CONTACT = gql`
mutation RemoveContact($id: ID!) {
  removeContact(contactId: $id){
    message
    success
  }
}

`;

const Delete = ({ id }) => (
  <Fragment>
    <Mutation
      mutation={DELETE_CONTACT}
      update={(cache, { data: { removeContact } }) => {
        const { contacts } = cache.readQuery({ query: GET_CONTACTS });
        cache.writeQuery({
          query: GET_CONTACTS,
          data: { contacts: contacts.filter(contact => contact.id !== id) },
        })
      }}
      variables={{ id }}
    >
      {(removeContact, { loading, error }) => {
        if (loading) return <Loader />;
        if (error) return <p>error...</p>;

        return (
          <Button
            basic
            color="red"
            onClick={removeContact}
          >
            <Icon name='trash' />
            Delete
          </Button>
        )

      }}
    </Mutation>
  </Fragment>
)


export default Delete;
