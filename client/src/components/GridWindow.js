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
            {TAG_OPTIONS.map((tagSection) => (
              <TagSection
                tagSectionTitle={tagSection.title}
                tags={tagSection.tags}
              />
            ))}
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

export default GridWindow;