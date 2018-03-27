import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import Basics from './Basics';
import TagSection from "./TagSection";
import { TAG_OPTIONS } from "../constants";


class GridWindow extends Component {
  render () {
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row>
            <Basics />
            <TagSection
              tagSectionTitle={TAG_OPTIONS[0].title}
              tags={TAG_OPTIONS[0].tags}
            />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

export default GridWindow;