import React, { Component } from 'react';
import { Segment, Input, Form, List, Label, Dropdown, Checkbox } from 'semantic-ui-react';

import RatingElement from './RatingElement';

import { RATING_OPTIONS, GENRE_OPTIONS } from '../constants';

class Basics extends Component {

  ratingCount = Object.keys(RATING_OPTIONS).length - 1;

  render () {
    {/* TODO below */}
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
                />
              </Form.Field>
            </List.Item>
            <List.Item>
              <Form.Field>
                <Input
                  label="Code"
                  type="text"
                />
              </Form.Field>
            </List.Item>
            <List.Item>
              <Form.Field>
                {/* TODO: Add label */}
                <Dropdown
                  label="Genre"
                  placeholder="Select Genre"
                  fluid
                  selection
                  options={GENRE_OPTIONS}
                />
              </Form.Field>
            </List.Item>
            <List.Item>
              <Form.Field>
                <RatingElement
                  initRating={this.ratingCount/2}
                  initMaxRating={this.ratingCount}
                  ratingDescriptions={RATING_OPTIONS}
                />
              </Form.Field>
            </List.Item>
            <List.Item>
              <Form.Field>
                <Checkbox label="Tags Only"/>
              </Form.Field>
            </List.Item>
          </List>
        </Form>
      </Segment>
    );
  }
}

export default Basics;