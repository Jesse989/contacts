import React from 'react';

import { Card, Input } from 'semantic-ui-react';


class SearchBar extends React.Component {
  state = {
    search: ''
  }

  onChange = event => {
    const search = event.target.value;
    this.setState(s => ({ search }) );
    this.props.updateSearch({ search });
  };

  render() {
    return (
      <Card>
        <Card.Content header="Search: " />
        <Card.Content extra>
          <Input
            icon="search"
            onChange={this.onChange}
            fluid
          />
        </Card.Content>
      </Card>
    )
  }
}

export default SearchBar;
