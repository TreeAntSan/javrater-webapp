import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import deline from 'deline';

import Basics from "./Basics";
import TagSection from "./TagSection";
import Output from "./Output";
import client from "../client";

class GridWindow extends Component {

  // TODO Bonus: add a tooltip timing function

  tagDict = {};

  initialState = {
    checkedTags: {},
    basicValues: {
      title: "",
      prodcode: "",
      genre: "",
      genredbid: 0,
      rating: 0,
      ratingdbid: 0,
      tagsOnly: false,
    },
    output: "",
    genreOptions: [],
    ratingOptions: [],
    tagOptions: [],
    userid: 1,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this._fetchGenres();
    this._fetchRatings();
    this._fetchTags();
  }

  _makeTagDict = (tagOptions) => {
    let tagSeed = {};
    tagOptions.forEach((tagCategory) => {
      tagCategory.tags.forEach((tag) => {
        this.tagDict[tag.tag] = {};
        this.tagDict[tag.tag].name = tag.name;
        this.tagDict[tag.tag].category = tagCategory.title;
        tagSeed[tag.tag] = {};
        tagSeed[tag.tag].checked = false;
        tagSeed[tag.tag].id = tag.id;
      });
    });
    return tagSeed;
  };

  _fetchGenres = () => {
    client.getGenres((genres) => {
      const genreOptions = genres.response.map((genre) => (
        { id: genre.id, value: genre.code, text: `${genre.code} - ${genre.description}` }
      ));
      this.setState({ genreOptions });
    });
  };

  _fetchRatings = () => {
    client.getRatings((ratings) => {
      const ratingOptions = ratings.response.map((rating) => (
        { id: rating.id, value: rating.rating, description: rating.description }
      ));
      this.setState({ ratingOptions });
    });
  };

  _fetchTags = () => {
    client.getTags((tags) => {
      let tagOptions = [];
      tags.response.forEach((tag) => {
        let index = tagOptions.findIndex((element) => element.title === tag.category);
        if (index === -1) {
          tagOptions.push({ title: tag.category, tags: [] });
          index = tagOptions.length - 1;
        }
        tagOptions[index].tags.push(
          { id: tag.id, tag: tag.tag, name: tag.name, description: tag.description }
        );
      });
      this.setState({ tagOptions });

      // Need to updated initial state so it's reset to these values each time.
      this.initialState.checkedTags = this._makeTagDict(tagOptions);
      this.setState({ checkedTags: this.initialState.checkedTags});
    });
  };

  handleTagChange = (tag, tagState) => {
    const checkedTags = {...this.state.checkedTags};
    checkedTags[tag].checked = tagState;
    this.setState({ checkedTags });
  };

  handleBasicsChange = ({ title, prodcode, genre, rating, tagsOnly, genredbid, ratingdbid }) => {
    // TODO There must be a more elegant way to accomplish this...
    const basicValues = {...this.state.basicValues};
    if (title !== undefined) basicValues.title = title;
    if (prodcode !== undefined) basicValues.prodcode = prodcode;
    if (genre !== undefined) basicValues.genre = genre;
    if (genredbid !== undefined) basicValues.genredbid = genredbid;
    if (rating !== undefined) basicValues.rating = rating;
    if (ratingdbid !== undefined) basicValues.ratingdbid = ratingdbid;
    if (tagsOnly !== undefined) basicValues.tagsOnly = tagsOnly;
    this.setState({ basicValues });
  };

  handleOutputChange = (event, data) => {
    this.setState({ output: data.value});
  };

  _tallyTags = () => {
    let tags = [];
    let series = [];
    let tagIds = [];
    Object.keys(this.state.checkedTags).forEach(key => {
      const tag = this.state.checkedTags[key];
      if (tag.checked) {
        tagIds.push(tag.id);
        if (this.tagDict[key].category.toLowerCase() === "series" ||
          this.tagDict[key].category.toLowerCase() === "director") {
          series.push(key);
        } else {
          tags.push(key);
        }
      }
    });
    return { tags, series, tagIds };

  };

  handleMakeClick = () => {
    const { tags, series } = this._tallyTags();

    let tagList = tags.join(", ");
    let seriesList = series.join(" ");
    seriesList = seriesList.length ? " " + seriesList : seriesList;

    let output = "";
    if (this.state.basicValues.tagsOnly) {
      output = `(${tagList})`;
    } else {
      output = deline`${this.state.basicValues.genre}
                      ${seriesList} ${this.state.ratingOptions[this.state.basicValues.rating].value} -
                      ${this.state.basicValues.title} [${this.state.basicValues.prodcode}] (${tagList})`;
    }

    this.setState({ output });
  };

  handleSaveClick = () => {
    const { tagIds } = this._tallyTags();
    const payload = {
      title: this.state.basicValues.title,
      prodcode: this.state.basicValues.prodcode,
      genreid: this.state.basicValues.genredbid,
      ratingid: this.state.basicValues.ratingdbid,
      tags: tagIds.join(","),
      createdby: this.state.userid,
    };

    client.postMovie(payload, (res) => {
      if (res.error) {
        this.setState({ output: `Error: ${res.error}` });
      } else {
        this.setState({ output: `Status ${res.status} - MovieId: ${res.response}` });
      }
    });
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
                    ratingOptions={this.state.ratingOptions}
                    genreOptions={this.state.genreOptions}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <TagSection
                    tagData={this.state.tagOptions[0]}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                  <TagSection
                    tagData={this.state.tagOptions[1]}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                </Grid.Column>
                <Grid.Column width={8}>
                  <TagSection
                    tagData={this.state.tagOptions[2]}
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
                    tagData={this.state.tagOptions[3]}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                  <TagSection
                    tagData={this.state.tagOptions[4]}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                  <TagSection
                    tagData={this.state.tagOptions[5]}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                </Grid.Column>
                <Grid.Column>
                  <TagSection
                    tagData={this.state.tagOptions[6]}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                  <TagSection
                    tagData={this.state.tagOptions[7]}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                  <TagSection
                    tagData={this.state.tagOptions[8]}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                </Grid.Column>
                <Grid.Column>
                  <TagSection
                    tagData={this.state.tagOptions[9]}
                    onTagChange={this.handleTagChange}
                    tagValues={this.state.checkedTags}
                  />
                  <TagSection
                    tagData={this.state.tagOptions[10]}
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
              onSaveClick={this.handleSaveClick}
              onParseClick={this.handleParseClick}
              onResetClick={this.handleResetClick}
              ready={this.state.genreOptions.length > 0 &&
                      this.state.ratingOptions.length > 0 &&
                      this.state.tagOptions.length > 0}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default GridWindow;
