import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Input, Form, List, Label, Dropdown, Checkbox } from 'semantic-ui-react';

class TagSection extends Component {
  state = {
    checkedTags: {},
  };

  onChange = (event, data) => {
    const tag = data['data-tag'] || 'unknown';
    const checkedTags = {...this.state.checkedTags};
    checkedTags[tag] = data.checked;
    this.setState({ checkedTags });
  };

  render () {
    return (
      <Segment>
        <Label attached="top left">{this.props.tagSectionTitle}</Label>
        <Form>
          <List>
            {this.props.tags.map((tag) => (
              <List.Item key={tag.tag}>
                <Form.Checkbox
                  checked={this.state.checkedTags[tag.tag] || false}
                  label={tag.name}
                  onChange={this.onChange}
                  data-tag={tag.tag}
                />
              </List.Item>
            ))}
          </List>
        </Form>
      </Segment>
    );
  }
}

TagSection.propTypes = {
  tagSectionTitle: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};

export default TagSection;