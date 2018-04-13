import React from "react";
import PropTypes from "prop-types";
import { Segment, Input, Form, List, Label, Dropdown, Checkbox, Dimmer, Loader } from "semantic-ui-react";

import RatingElement from "./RatingElement";

// TODO add form validation
const Basics = props => (
  <Segment>
    <Label attached="top left">Basics</Label>
    <Form>
      <List>
        <List.Item>
          <Form.Field>
            <Input
              label="Title"
              type="text"
              placeholder="Movie Title"
              onChange={e => (props.onChange({ title: e.target.value }))}
              value={props.values.title}
            />
          </Form.Field>
        </List.Item>
        <List.Item>
          <Form.Field>
            <Input
              label="Code"
              type="text"
              placeholder="ABC-123"
              onChange={e => (props.onChange({ prodcode: e.target.value }))}
              value={props.values.code}
            />
          </Form.Field>
        </List.Item>
        <List.Item>
          <Form.Field>
            <Dropdown
              placeholder="Select Genre"
              selection
              options={
                [
                  { id: 0, text: "", value: "" },
                  ...(props.allGenres.loading ?
                    [] :
                      props.allGenres.allGenres.map(({ id, code, description }) =>
                      ({ id, text: `${code} - ${description}`, value: code })
                    )
                  ),
                ]
              }
              onChange={(event, data) => (props.onChange({
                genre: {
                  genrecode: data.value,
                  genreid: data.options[data.options.findIndex(option =>
                    option.value === data.value)].id, // Only way to find index of selection
                },
              }))
              }
              value={props.values.genre.genrecode}
            />
          </Form.Field>
        </List.Item>
        <List.Item>
          <Form.Field>
            <RatingElement
              maxRating={props.allRatings.loading ? 0 : props.allRatings.allRatings.length - 1}
              ratingOptions={
                props.allRatings.loading ?
                  [] :
                  props.allRatings.allRatings.map(({ id, rating, description }) =>
                    ({ id, value: rating, description })
                  )
              }
              onRate={props.onChange}
              rating={props.values.rating.ratingnum}
            />
          </Form.Field>
        </List.Item>
        <List.Item>
          <Form.Field>
            <Checkbox
              label="Tags Only"
              checked={props.values.tagsOnly}
              onChange={(event, data) => (props.onChange({ tagsOnly: data.checked }))}
            />
          </Form.Field>
        </List.Item>
      </List>
    </Form>
    <Dimmer inverted active={(props.allRatings.loading || props.allGenres.loading)}>
      <Loader>Loading</Loader>
    </Dimmer>
  </Segment>
);

Basics.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  allRatings: PropTypes.object.isRequired,
  allGenres: PropTypes.object.isRequired,
};

export default Basics;
