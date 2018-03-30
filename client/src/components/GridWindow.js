import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import deline from 'deline';

import Basics from "./Basics";
import TagSection from "./TagSection";
import Output from "./Output";
import { TAG_OPTIONS, RATING_OPTIONS, GENRE_OPTIONS } from "../constants";

class GridWindow extends Component {

  // TODO Bonus: add a tooltip timing function

  tagDict = {};

  initialState = {
    checkedTags: {},
    basicValues: {
      title: '',
      code: '',
      genre: '',
      rating: 0,
      tagsOnly: false,
    },
    output: '',
  };

  constructor(props) {
    super(props);
    this._makeTagDict();
    this.state = this.initialState;
  }

  _makeTagDict = () => {
    let tagSeed = {};
    TAG_OPTIONS.forEach((tagCategory) => {
      tagCategory.tags.forEach((tag) => {
        this.tagDict[tag.tag] = {};
        this.tagDict[tag.tag].name = tag.name;
        this.tagDict[tag.tag].category = tagCategory.title;
        tagSeed[tag.tag] = false;
      });
    });
    this.initialState.checkedTags = tagSeed;
  };

  handleTagChange = (tag, tagState) => {
    const checkedTags = {...this.state.checkedTags};
    checkedTags[tag] = tagState;
    this.setState({ checkedTags });
  };

  handleBasicsChange = ({ title, code, genre, rating, tagsOnly }) => {
    // TODO There must be a more elegant way to accomplish this...
    const basicValues = {...this.state.basicValues};
    if (title !== undefined) basicValues.title = title;
    if (code !== undefined) basicValues.code = code;
    if (genre !== undefined) basicValues.genre = genre;
    if (rating !== undefined) basicValues.rating = rating;
    if (tagsOnly !== undefined) basicValues.tagsOnly = tagsOnly;
    this.setState({ basicValues });
  };

  handleOutputChange = (event, data) => {
    this.setState({ output: data.value});
  };

  handleMakeClick = () => {
    let tags = [];
    let series = [];
    Object.keys(this.state.checkedTags).forEach(key => {
      if (this.state.checkedTags[key]) {
        if (this.tagDict[key].category.toLowerCase() === "series") {
          series.push(key);
        } else {
          tags.push(key);
        }
      }
    });

    let tagList = tags.join(", ");
    let seriesList = series.join(" ");
    seriesList = seriesList.length ? " " + seriesList : seriesList;

    let output = "";
    if (this.state.basicValues.tagsOnly) {
      output = `(${tagList})`;
    } else {
      // Intentional blank space after genre, do not remove it.
      output = deline`${this.state.basicValues.genre}${seriesList} 
                      ${RATING_OPTIONS[this.state.basicValues.rating].value} -
                      ${this.state.basicValues.title} [${this.state.basicValues.code}] (${tagList})`;
    }

    this.setState({ output });
  };

  handleParseClick = () => {
    // Grab strings from inside parens if there
    const tagSection = this.state.output.match(/\(([^)]+)\) *$/);

    // If regex doesn't pick up results just try the entire value
    const tagString = tagSection === null ? this.state.output : tagSection[1];
    const tags = tagString.replace(/\s/g, "").split(",");  // Remove spaces and split on commas

    let parsedTags = [];
    tags.forEach((tag) => {
      if (this.tagDict[tag]) {
        parsedTags.push(this.tagDict[tag].name);
      }
    });

    if (parsedTags.length > 0) {
      this.setState({ output: parsedTags.join(", ") });
    } // TODO else report some friendly error
  };

  handleResetClick = () => {
    this.setState(this.initialState);
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
                    tagSectionTitle={TAG_OPTIONS[0].title}
                    tagOptions={TAG_OPTIONS[0].tags}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS[1].title}
                    tagOptions={TAG_OPTIONS[1].tags}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                </Grid.Column>
                <Grid.Column width={8}>
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS[2].title}
                    tagOptions={TAG_OPTIONS[2].tags}
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
                    tagSectionTitle={TAG_OPTIONS[3].title}
                    tagOptions={TAG_OPTIONS[3].tags}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS[4].title}
                    tagOptions={TAG_OPTIONS[4].tags}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS[5].title}
                    tagOptions={TAG_OPTIONS[5].tags}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                </Grid.Column>
                <Grid.Column>
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS[6].title}
                    tagOptions={TAG_OPTIONS[6].tags}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS[7].title}
                    tagOptions={TAG_OPTIONS[7].tags}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS[8].title}
                    tagOptions={TAG_OPTIONS[8].tags}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                </Grid.Column>
                <Grid.Column>
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS[9].title}
                    tagOptions={TAG_OPTIONS[9].tags}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                  <TagSection
                    tagSectionTitle={TAG_OPTIONS[10].title}
                    tagOptions={TAG_OPTIONS[10].tags}
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
              onOutputChange={this.handleOutputChange}
              outputValue={this.state.output}
              onMakeClick={this.handleMakeClick}
              onParseClick={this.handleParseClick}
              onResetClick={this.handleResetClick}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default GridWindow;
