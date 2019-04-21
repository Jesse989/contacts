import React from 'react';

import { Container, Button, Form, Input } from 'semantic-ui-react';

class LoginForm extends React.Component {
  state = {
    email: ''
  }

  onChange = event => {
    const email = event.target.value;
    this.setState(s => ({ email }) );
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.login({ variables: { email: this.state.email } });
  };

  render() {
    return (
      <Container style={{paddingTop: "30vh"}} textAlign='center'>
        <Form onSubmit={this.onSubmit}>
          <Input
            required
            type="email"
            name="email"
            placeholder="email"
            onChange={this.onChange}
          />
          <Button basic color="blue" type="submit">Log in</Button>
        </Form>
      </Container>
    )
  }
}

export default LoginForm;
