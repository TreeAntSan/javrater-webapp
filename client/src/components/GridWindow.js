import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import Basics from "./Basics";
import TagSection from "./TagSection";
import Output from "./Output";
import { TAG_OPTIONS } from "../constants";


class GridWindow extends Component {
  render () {
    return (
      <Grid stackable padded>
        <Grid.Row>
          <Grid.Column width={6}>
            <Grid stackable columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <Basics />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.special.title}
                    tags={TAG_OPTIONS.special.tags}
                  />
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.generic.title}
                    tags={TAG_OPTIONS.generic.tags}
                  />
                </Grid.Column>
                <Grid.Column width={8}>
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.interesting.title}
                    tags={TAG_OPTIONS.interesting.tags}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={10}>
            <Grid stackable columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.fetish.title}
                    tags={TAG_OPTIONS.fetish.tags}
                  />
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.gross.title}
                    tags={TAG_OPTIONS.gross.tags}
                  />
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.other.title}
                    tags={TAG_OPTIONS.other.tags}
                  />
                </Grid.Column>
                <Grid.Column>
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.incest.title}
                    tags={TAG_OPTIONS.incest.tags}
                  />
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.voyeur.title}
                    tags={TAG_OPTIONS.voyeur.tags}
                  />
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.idol.title}
                    tags={TAG_OPTIONS.idol.tags}
                  />
                </Grid.Column>
                <Grid.Column>
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.girl.title}
                    tags={TAG_OPTIONS.girl.tags}
                  />
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.series.title}
                    tags={TAG_OPTIONS.series.tags}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Output/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default GridWindow;