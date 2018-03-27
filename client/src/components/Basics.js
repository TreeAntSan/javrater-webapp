import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Input, Form, List, Label, Dropdown, Checkbox } from "semantic-ui-react";

import RatingElement from "./RatingElement";

class Basics extends Component {

  render () {
    /* TODO below */
    return (
      <Segment>
        <Label attached="top left">Basics</Label>
        <Form>
          <List>
            <List.Item>
              <Form.Field>
                <Input
                  label="Title"
                  type="text"
                  onChange={(e) => (this.props.onChange({ title: e.target.value }))}
                  value={this.props.values.title}
                />
              </Form.Field>
            </List.Item>
            <List.Item>
              <Form.Field>
                <Input
                  label="Code"
                  type="text"
                  onChange={(e) => (this.props.onChange({ code: e.target.value }))}
                  value={this.props.values.code}
                />
              </Form.Field>
            </List.Item>
            <List.Item>
              <Form.Field>
                {/* TODO: Add label, make nullable(?) */}
                <Dropdown
                  placeholder="Select Genre"
                  selection
                  options={this.props.genreOptions}
                  onChange={(event, data) => (this.props.onChange({ genre: data.value }))}
                  value={this.props.values.genre}
                />
              </Form.Field>
            </List.Item>
            <List.Item>
              <Form.Field>
                <RatingElement
                  maxRating={this.props.ratingOptions.length - 1}
                  ratingOptions={this.props.ratingOptions}
                  onRate={this.props.onChange}
                  rating={this.props.values.rating}
                />
              </Form.Field>
            </List.Item>
            <List.Item>
              <Form.Field>
                <Checkbox
                  label="Tags Only"
                  checked={this.props.values.tagsOnly}
                  onChange={(event, data) => (this.props.onChange({ tagsOnly: data.checked }))}
                />
              </Form.Field>
            </List.Item>
          </List>
        </Form>
      </Segment>
    );
  }
}

Basics.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  ratingOptions: PropTypes.array.isRequired,
  genreOptions: PropTypes.array.isRequired,
};

export default Basics;