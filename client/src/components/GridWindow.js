import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import Basics from "./Basics";
import TagSection from "./TagSection";
import Output from "./Output";
import { TAG_OPTIONS, RATING_OPTIONS, GENRE_OPTIONS } from "../constants";

const initialState = {
  checkedTags: {},
  basicValues: {
    title: '',
    code: '',
    genre: '',
    rating: (RATING_OPTIONS.length - 1)/2,
    tagsOnly: false,
  },
};

class GridWindow extends Component {

  /* TODO Bonus: add a tooltip timing function */


  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleTagChange = (tag, tagState) => {
    const checkedTags = {...this.state.checkedTags};
    checkedTags[tag] = tagState;
    this.setState({ checkedTags });
  };

  handleBasicsChange = ({ title, code, genre, rating, tagsOnly }) => {
    const basicValues = {...this.state.basicValues};
    if (title !== undefined) basicValues.title = title;
    if (code !== undefined) basicValues.code = code;
    if (genre !== undefined) basicValues.genre = genre;
    if (rating !== undefined) basicValues.rating = rating;
    if (tagsOnly !== undefined) basicValues.tagsOnly = tagsOnly;
    this.setState({ basicValues });
  };

  handleResetClick = () => {
    this.setState(initialState);
  };

  render () {
    return (
      <Grid stackable padded>
        <Grid.Row>
          <Grid.Column width={6}>
            <Grid stackable columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <Basics
                    onChange={this.handleBasicsChange}
                    values={this.state.basicValues}
                    ratingOptions={RATING_OPTIONS}
                    genreOptions={GENRE_OPTIONS}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.special.title}
                    tagOptions={TAG_OPTIONS.special.tags}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.generic.title}
                    tagOptions={TAG_OPTIONS.generic.tags}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                </Grid.Column>
                <Grid.Column width={8}>
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.interesting.title}
                    tagOptions={TAG_OPTIONS.interesting.tags}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
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
                    tagOptions={TAG_OPTIONS.fetish.tags}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.gross.title}
                    tagOptions={TAG_OPTIONS.gross.tags}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.other.title}
                    tagOptions={TAG_OPTIONS.other.tags}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                </Grid.Column>
                <Grid.Column>
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.incest.title}
                    tagOptions={TAG_OPTIONS.incest.tags}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.voyeur.title}
                    tagOptions={TAG_OPTIONS.voyeur.tags}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.idol.title}
                    tagOptions={TAG_OPTIONS.idol.tags}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                </Grid.Column>
                <Grid.Column>
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.girl.title}
                    tagOptions={TAG_OPTIONS.girl.tags}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS.series.title}
                    tagOptions={TAG_OPTIONS.series.tags}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Output
              onResetClick={this.handleResetClick}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default GridWindow;