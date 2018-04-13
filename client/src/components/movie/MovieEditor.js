import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Grid } from "semantic-ui-react";
import deline from 'deline';
import { cloneDeep, isEmpty } from "lodash";

import Basics from "./Basics";
import TagSection from "./TagSection";
import Output from "./Output";
import utils from "../../utils";

class MovieEditor extends Component {

  // TODO Bonus: add a tooltip timing function

  // This is an object where the keys are tags and contains the name and category, it is used
  // in _tallyTags and handleParseClick
  tagDict = {};

  initialState = {
    checkedTags: {},
    basicValues: {
      title: "",
      prodcode: "",
      genre: {
        genrecode: "",
        genreid: "",
      },
      rating: {
        ratingnum: 0,
        ratingtext: "",
        ratingdescription: "",
        ratingid: "",
      },
      tagsOnly: false,
    },
    tagOptions: [],
    tallyTags: {
      tagsList: [],
      catTags: "",
      seriesList: [],
      catSeries: "",
      tagIds: [],
    },
    output: "",
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  /*
    TODO Add transition blocking to prevent a user from accidentally navigating away
    from the page when making changes. See
    https://reacttraining.com/react-router/web/example/preventing-transitions
  */

  // TODO figure out why Create link must be pressed twice to load tags and fix it...
  componentWillReceiveProps(nextProps) {
    if (!nextProps.allTags.loading && this.state.tagOptions.length === 0) {
      this._handleTags(nextProps);
    }
  }

  _handleTags = (nextProps) => {
    const tagOptions = utils.tagOptionFormatter(nextProps.allTags.allTags);

    // Need to update initial state so it's reset to these values each time.
    this.initialState.tagOptions = tagOptions;
    const { tagDict, tagSeed } = utils.makeTagDict(tagOptions);
    this.initialState.checkedTags = tagSeed;
    this.tagDict = tagDict;

    // Need to deep copy or the component state will update initialState, breaking the reset functionality.
    this.setState({ tagOptions, checkedTags: cloneDeep(tagSeed) });
  };

  handleTagChange = (tag, tagState) => {
    const checkedTags = {...this.state.checkedTags};
    checkedTags[tag].checked = tagState;
    this.setState({ checkedTags, tallyTags: this._tallyTags() }, this.generateOutput);
  };

  handleBasicsChange = ({ title, prodcode, genre, rating, tagsOnly }) => {
    // TODO There must be a more elegant way to accomplish this...
    const basicValues = {...this.state.basicValues};
    if (title !== undefined) basicValues.title = title;
    if (prodcode !== undefined) basicValues.prodcode = prodcode;
    if (genre !== undefined) basicValues.genre = genre;
    if (rating !== undefined) basicValues.rating = rating;
    if (tagsOnly !== undefined) basicValues.tagsOnly = tagsOnly;
    this.setState({ basicValues }, this.generateOutput);
  };

  handleOutputChange = (event, data) => {
    this.setState({ output: data.value});
  };

  _tallyTags = () => {
    let tagsList = [];
    let seriesList = [];
    let tagIds = [];
    Object.keys(this.state.checkedTags).forEach(key => {
      const tag = this.state.checkedTags[key];
      if (tag.checked) {
        tagIds.push(tag.id);
        if (this.tagDict[key].category.toLowerCase() === "series" ||
          this.tagDict[key].category.toLowerCase() === "director") {
          seriesList.push(key);
        } else {
          tagsList.push(key);
        }
      }
    });

    return {
      tagsList,
      seriesList,
      tagIds,
      catTags: tagsList.join(", "),
      catSeries: seriesList.join(" "),
    };
  };

  generateOutput = () => {
    const { catTags, catSeries } = this.state.tallyTags;

    let output = "";
    if (this.state.basicValues.tagsOnly) {
      output = `(${catTags})`;
    } else {
      output = deline`
        ${this.state.basicValues.genre.genrecode}
        ${(catSeries && " ") + catSeries} ${this.state.basicValues.rating.ratingtext} -
        ${this.state.basicValues.title} [${this.state.basicValues.prodcode}] (${catTags})
      `;
    }

    this.setState({ output });
  };

  handleSaveClick = async () => {
    const { tagIds } = this.state.tallyTags;
    const result = await this.props.addMovie({
      variables: {
        title: this.state.basicValues.title,
        prodCode: this.state.basicValues.prodcode,
        genre: this.state.basicValues.genre.genreid,
        rating: this.state.basicValues.rating.ratingid,
        tags: tagIds,
      }
    });

    const { id } = result.data.addMovie;
    this.setState({ output: `Success: ${id}` });
  };

  handleUpdateClick = async () => {
    const { tagIds } = this.state.tallyTags;
    const result = await this.props.updateMovie({
      variables: {
        title: this.state.basicValues.title,
        prodCode: this.state.basicValues.prodcode,
        genre: this.state.basicValues.genre.genreid,
        rating: this.state.basicValues.rating.ratingid,
        tags: tagIds,
        replaceTags: true,
      }
    });

    const { id } = result.data.addMovie;
    this.setState({ output: `Success: ${id}` });
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
    this.setState({ ...this.initialState, checkedTags: cloneDeep(this.initialState.checkedTags) });
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
                    allRatings={this.props.allRatings}
                    allGenres={this.props.allGenres}
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
              onSaveClick={this.handleSaveClick}
              onUpdateClick={this.handleUpdateClick}
              onParseClick={this.handleParseClick}
              onResetClick={this.handleResetClick}
              ready={!this.props.allRatings.loading &&
                !this.props.allGenres.loading &&
                !this.props.allTags.loading
              }
              editMode={!isEmpty(this.props.editMovie)}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

MovieEditor.propType = {
  allRatings: PropTypes.object.isRequired,
  allGenres: PropTypes.object.isRequired,
  allTags: PropTypes.object.isRequired,
  addMovie: PropTypes.func.isRequired,
  updateMovie: PropTypes.func.isRequired,
  editMovie: PropTypes.object,
};

export default withRouter(MovieEditor);
