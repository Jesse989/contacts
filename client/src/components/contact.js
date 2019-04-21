import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';
import Delete from './delete';
import EditForm from './edit-form';



class Contact extends React.Component {
  state = {
    edit: false
  }

  toggleEdit = edit => {
    this.setState(s => ({ edit }));
  }

  render() {
    if (this.state.edit || this.props.isNew) {
      return <EditForm
                id={this.props.id}
                first={this.props.first}
                last={this.props.last}
                email={this.props.email}
                phone={this.props.phone}
                toggleEdit={this.toggleEdit}
                isNew={this.props.isNew}
                toggle={this.props.toggle}
              />
    } else {
      return (
        <Card>
          <Card.Content header={this.props.first + ' ' + this.props.last} />
          <Card.Content meta={'Email: ' + this.props.email}/>
          <Card.Content description={'Phone: ' + this.props.phone} />
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button
                basic
                color="violet"
                onClick={(e) => {
                  e.preventDefault();
                  this.toggleEdit(true)
                }}>
                <Icon name='edit' />
                Edit
              </Button>
              <Delete id={this.props.id} />
            </div>
          </Card.Content>
        </Card>
      )
    }
  }
}

export default Contact;
