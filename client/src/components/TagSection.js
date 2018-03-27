import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Form, List, Label } from "semantic-ui-react";
import ReactTooltip from "react-tooltip";

class TagSection extends Component {
  state = {
    checkedTags: {},
  };

  onChange = (event, data) => {
    const tag = data["data-tag"] || "unknown";
    const checkedTags = {...this.state.checkedTags};
    checkedTags[tag] = data.checked;
    this.setState({ checkedTags });
  };

  render () {
    return (
      <div>
        <Segment>
          <Label attached="top left">{this.props.tagSectionTitle} Tags</Label>
          <Form>
            <List>
              {this.props.tags.map((tag) => (
                <List.Item key={tag.tag}>
                  <Form.Checkbox
                    checked={this.state.checkedTags[tag.tag] || false}
                    label={`${tag.tag} - ${tag.name}`}
                    onChange={this.onChange}
                    data-tag={tag.tag}
                    data-tip={tag.description}
                  />
                </List.Item>
              ))}
            </List>
          </Form>
        </Segment>
        <ReactTooltip delayShow={300}/>
      </div>
    );
  }
}

TagSection.propTypes = {
  tagSectionTitle: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};

export default TagSection;