import React, { Component, Fragment } from 'react';
import { Router } from '@reach/router';
import './App.css';

import StickyHeader from './containers/sticky-header';
import Contacts from './containers/contacts';


import { Container, Grid } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css'

class App extends Component {
  state = {
    shouldPad: false
  }



  updatePad = (bool) => {
    this.setState({ shouldPad: bool })
  }

  render() {
    return (
      <Container className='App'>
        <Grid columns={1} centered>
          <Grid.Column>
            <StickyHeader updatePad={this.updatePad}/>
            <Router primary={false} component={Fragment}>
              <Contacts path="/" shouldPad={this.state.shouldPad}/>
            </Router>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default App;
