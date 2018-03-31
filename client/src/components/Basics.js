import React from "react";
import PropTypes from "prop-types";
import { Segment, Input, Form, List, Label, Dropdown, Checkbox, Dimmer, Loader } from "semantic-ui-react";

import RatingElement from "./RatingElement";

const Basics = ({ onChange, values, ratingOptions, genreOptions }) => (
  <Segment>
    <Label attached="top left">Basics</Label>
    <Form>
      <List>
        <List.Item>
          <Form.Field>
            <Input
              label="Title"
              type="text"
              placeholder="Video title"
              onChange={(e) => (onChange({ title: e.target.value }))}
              value={values.title}
            />
          </Form.Field>
        </List.Item>
        <List.Item>
          <Form.Field>
            <Input
              label="Code"
              type="text"
              placeholder="ABC-123"
              onChange={(e) => (onChange({ code: e.target.value }))}
              value={values.code}
            />
          </Form.Field>
        </List.Item>
        <List.Item>
          <Form.Field>
            <Dropdown
              placeholder="Select Genre"
              selection
              options={[{ text:"", value: "" }, ...genreOptions]}
              onChange={(event, data) => (onChange({ genre: data.value }))}
              value={values.genre}
            />
          </Form.Field>
        </List.Item>
        <List.Item>
          <Form.Field>
            <RatingElement
              maxRating={ratingOptions.length - 1}
              ratingOptions={ratingOptions}
              onRate={onChange}
              rating={values.rating}
            />
          </Form.Field>
        </List.Item>
        <List.Item>
          <Form.Field>
            <Checkbox
              label="Tags Only"
              checked={values.tagsOnly}
              onChange={(event, data) => (onChange({ tagsOnly: data.checked }))}
            />
          </Form.Field>
        </List.Item>
      </List>
    </Form>
    <Dimmer active={!(ratingOptions.length && genreOptions.length)}>
      <Loader>Loading</Loader>
    </Dimmer>
  </Segment>
);

Basics.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  ratingOptions: PropTypes.array.isRequired,
  genreOptions: PropTypes.array.isRequired,
};

export default Basics;
