import React from 'react';
import { ApolloConsumer } from 'react-apollo';

import { Icon, Button } from 'semantic-ui-react';

function LogoutButton() {
  return (
    <ApolloConsumer>
      {client => (
        <Button
          basic
          color="yellow"
          onClick={() => {
            client.writeData({ data: { isLoggedIn: false } });
            localStorage.clear();
          }}
        >
          <Icon name='sign-out' />
          Logout
        </Button>
      )}
    </ApolloConsumer>
  );
}

export default LogoutButton;
