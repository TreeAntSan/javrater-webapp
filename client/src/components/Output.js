import React from "react";
import PropTypes from "prop-types";
import { Segment, Label, Form, Input, Grid, Button, Dimmer, Loader } from "semantic-ui-react";

const Output = ({ onOutputChange, outputValue, onMakeClick, onSaveClick,
                  onParseClick, onResetClick, ready }) => (
  <Segment>
    <Label attached="top left">Output</Label>
    <Form>
      <Grid stackable container>
        <Grid.Row>
          <Grid.Column width={11}>
            <Form.Field>
              <Input
                label="Result"
                type="text"
                onChange={onOutputChange}
                value={outputValue}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column floated="right" width={5}>
            <Grid columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <Button
                    color="green"
                    onClick={onSaveClick}
                  >Save</Button>
                </Grid.Column>
                <Grid.Column>
                  <Button
                    color="teal"
                    onClick={onParseClick}
                  >Parse</Button>
                </Grid.Column>
                <Grid.Column>
                  <Button
                    color="grey"
                    onClick={onResetClick}
                  >Reset</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
    <Dimmer inverted active={!ready}>
      <Loader>Waiting for Tools to Load</Loader>
    </Dimmer>
  </Segment>
);

Output.propTypes = {
  onOutputChange: PropTypes.func.isRequired,
  outputValue: PropTypes.string.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onParseClick: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default Output;
