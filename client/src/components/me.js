import React, { Fragment } from 'react';
import { Card, Dimmer, Loader } from 'semantic-ui-react';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_ME = gql`
query CurrentUser {
  me{
    email
  }
}
`

const Me = () => (
  <Fragment>
    <Query
      query={GET_ME}
      fetchPolicy="network-only"
    >
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <Dimmer active>
              <Loader />
            </Dimmer>
          )
        }
        if (error) return <p> error :( </p>

        return (
          <Card.Content>
            <Card.Header>
              {data.me.email}
            </Card.Header>
          </Card.Content>
        )
      }}
    </Query>
  </Fragment>
)


export default Me;
