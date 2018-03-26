import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import Basics from './Basics';

class GridWindow extends Component {
  render () {
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row>
            <Basics />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

export default GridWindow;