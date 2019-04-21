import React from 'react';
import Me from '../components/me';
import Contact from '../components/contact';
import LogoutButton from '../components/logout';

import { Button, Card, Icon } from 'semantic-ui-react';

import './sticky-header.css';


class StickyHeader extends React.Component {
  state = {
    add: false
  }

  toggle = () => {
    const prev = this.state.add;
    this.setState(s => ({ add: !prev }))
  }

  render() {
    return (
      <Card.Group className="paddedTop" centered >
        <Card id="stickyHeader">
          <Me />
          <Card.Content extra>
            { this.state.add
              ? <Contact 
                  isNew={true}
                  toggle={this.toggle}
                />
              : <div className='ui two buttons'>
                  <Button basic color="purple" onClick={ this.toggle }>
                    <Icon name='plus' />
                    Add
                  </Button>
                  <LogoutButton />
                </div>
            }
          </Card.Content>
        </Card>
      </Card.Group>
    )
  }
}


export default StickyHeader;
