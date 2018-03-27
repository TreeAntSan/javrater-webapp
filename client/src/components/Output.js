import React from "react";
import PropTypes from "prop-types";
import { Segment, Label, Form, Input, Grid, Button } from "semantic-ui-react";

const Output = ({ onOutputChange, outputValue, onMakeClick, onParseClick, onResetClick }) => (
  <Segment>
    <Label attached="top left">Output</Label>
    <Form>
      <Grid container>
        <Grid.Row>
          <Grid.Column width={12}>
            <Form.Field>
              <Input
                label="Result"
                type="text"
                onChange={onOutputChange}
                value={outputValue}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column floated="right" width={4}>
            <Grid stackable columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <Button
                    color="blue"
                    onClick={onMakeClick}
                  >Make</Button>
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
  </Segment>
);

Output.propTypes = {
  onOutputChange: PropTypes.func.isRequired,
  outputValue: PropTypes.string.isRequired,
  onMakeClick: PropTypes.func.isRequired,
  onParseClick: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
};

export default Output;
