import React from "react";
import PropTypes from "prop-types";
import { Segment, Input, Form, List, Label, Dropdown, Checkbox, Dimmer, Loader } from "semantic-ui-react";

import RatingElement from "./RatingElement";

// TODO add form validation
const Basics = ({ onChange, values, allRatings, allGenres }) => (
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
              onChange={e => (onChange({ title: e.target.value }))}
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
              onChange={e => (onChange({ prodcode: e.target.value }))}
              value={values.code}
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
                  ...(allGenres.loading ?
                    [] :
                    allGenres.allGenres.map(({ id, code, description }) =>
                      ({ id, text: `${code} - ${description}`, value: code })
                    )
                  ),
                ]
              }
              onChange={(event, data) => (onChange({
                genre: {
                  genrecode: data.value,
                  genreid: data.options[data.options.findIndex(option =>
                    option.value === data.value)].id, // Only way to find index of selection
                },
              }))
              }
              value={values.genre.genrecode}
            />
          </Form.Field>
        </List.Item>
        <List.Item>
          <Form.Field>
            <RatingElement
              maxRating={allRatings.loading ? 0 : allRatings.allRatings.length - 1}
              ratingOptions={
                allRatings.loading ?
                  [] :
                  allRatings.allRatings.map(({ id, rating, description }) =>
                    ({ id, value: rating, description })
                  )
              }
              onRate={onChange}
              rating={values.rating.ratingnum}
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
    <Dimmer inverted active={(allRatings.loading || allGenres.loading)}>
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
