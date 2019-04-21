import React, { Fragment } from 'react';
import { Card, Form, Input, Button, Icon } from 'semantic-ui-react';

import isEmail from 'isemail';

import './edit-form.css';
import Edit from './edit';
import Add from './add';


class EditForm extends React.Component {

state = {
  first: this.props.isNew ? '' : this.props.first,
  last: this.props.isNew ? '' : this.props.last,
  email: this.props.isNew ? '' : this.props.email,
  phone: this.props.isNew ? '' : this.props.phone
}


handleChange = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  this.setState(s => ({ [name]: value}))
}

render() {
  return (
    <Card>
      <Card.Content textAlign='center'>
        <Form>
          <Input
            icon={ this.state.first ? 'green circle check outline' : 'red x'}
            required
            name='first'
            type='text'
            fluid
            placeholder={ this.props.first ? this.props.first : 'First: ' }
            onChange={ this.handleChange }
          />
          <Input
            icon={ this.state.first ? 'green circle check outline' : 'red x'}
            name='last'
            type='text'
            fluid
            placeholder={ this.props.last ? this.props.last : 'Last: '}
            onChange={ this.handleChange }
          />
          <Input
            icon={ this.state.first ? 'green circle check outline' : 'red x'}
            required
            name='email'
            type='email'
            fluid
            placeholder={ this.props.email ? this.props.email : 'Email: '}
            onChange={ this.handleChange }
          />
          <Input
            icon={ this.state.first ? 'green circle check outline' : 'red x'}
            name='phone'
            type='tel'
            fluid
            placeholder={ this.props.phone ? this.props.phone : 'Phone: '}
            onChange={ this.handleChange }
          />
        </Form>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          {this.props.isNew ?
            <Fragment>
              <Add
                email={this.state.email}
                phone={this.state.phone}
                first={this.state.first}
                last={this.state.last}
                toggle={this.props.toggle}
              />
              <Button
                basic
                color="orange"
                onClick={this.props.toggle}
              >
                <Icon name='x' />
                Cancel
              </Button>
            </Fragment>
            :
            <Fragment>
              <Edit
                id={this.props.id}
                first={this.state.first ? this.state.first : this.props.first}
                last={this.state.last ? this.state.last : this.props.last}
                email={this.state.email ? this.state.email : this.props.email}
                phone={this.state.phone ? this.state.phone : this.props.phone}
                toggleEdit={this.props.toggleEdit}
              />
              <Button
                basic
                color="orange"
                onClick={() => {
                  this.props.toggleEdit(false)
                }}
              >
                <Icon name='x' />
                Cancel
              </Button>
            </Fragment>
          }
        </div>
      </Card.Content>
    </Card>
    )
  }

}

export default EditForm;
