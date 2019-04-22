import React from 'react';
import gql from 'graphql-tag';
import { Button, Icon } from 'semantic-ui-react';

import { Mutation } from 'react-apollo';
const EDIT_CONTACT = gql`
mutation EditContact($id: ID!, $email: String, $phone: String, $first: String, $last: String) {
  editContact(id: $id, email: $email, phone: $phone, first: $first, last: $last){
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
}
`

const Edit = ({ id, first, last, email, phone, toggleEdit, disabled }) => (
  <Mutation mutation={EDIT_CONTACT}>
    {(editContact, { data }) => (
      <Button
        disabled={disabled}
        basic
        color="green"
        onClick={(e) => {
          e.preventDefault();
          toggleEdit(false);
          editContact({
            variables: {
              id,
              first,
              last,
              email,
              phone
            }
          })
        }}>
        <Icon name='save' />
        Save
      </Button>
    )}
  </Mutation>
)

export default Edit;
