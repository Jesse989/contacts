import React from 'react';
import Contact from '../components/contact';
import SearchBar from './search-bar';
import uuid from 'uuid';
import { Card, Loader } from 'semantic-ui-react';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import './contacts.css';

export const GET_CONTACTS = gql`
query GetAllContacts{
  contacts{
    id
    first
    last
    email
    phone
  }
}`



class Contacts extends React.Component {

  state ={
    searchString: ''
  }

  updateSearch = ({ search }) => {
    const searchString = search;
    this.setState(s => ({ searchString }))
  }


  render() {
    return (
      <Card.Group centered>
        <SearchBar updateSearch={this.updateSearch}/>
        <Query query={GET_CONTACTS} fetchPolicy="network-only" >
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <Loader />
              )
            };
            if (error) return <p>Error :(</p>;

            return data.contacts
              .filter(contact => contact.first.includes(this.state.searchString)
                || contact.last.includes(this.state.searchString)
              )
              .sort((a, b) => (a.first + a.last).toUpperCase() > (b.first + b.last).toUpperCase())
              .map(({ id, first, last, email, phone }) => (
              <Contact
                key={uuid.v4()}
                id={id}
                first={first}
                last={last}
                email={email}
                phone={phone}
                isNew={false}
              />
            ));
          }}
        </Query>
      </Card.Group>
    )
  }

}



export default Contacts;
