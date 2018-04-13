import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql, compose, withApollo } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router";

import LoadingError from "../LoadingError";
import MovieEditor from "./MovieEditor";

// TODO Bug with glitchy loading, requiring a second click on a link to work
class Movie extends Component {
  // TODO is there an alternative to using state? Such as using the Apollo cache? Can the cache be accessed and passed via prop?
  state = {
    editMovie: {},
  };
  queryAttempted = false;


  _queryMovie = async id => {
    const result = await this.props.client.query({
      query: MOVIE_QUERY,
      variables: {
        id,
      },
    });

    this.setState({ editMovie: result });
  };

  render() {
    const { allRatings, allTags, allGenres } = this.props;
    const editMovie = this.state.editMovie;

    if (this.props.editMode && this.props.match && !this.queryAttempted) {
      this.queryAttempted = true; // Just one attempt...
      this._queryMovie(this.props.match.params.id);
    }

    console.log(this.state.editMovie);

    if (allRatings.loading || allGenres.loading || allTags.loading || editMovie.loading ||
      allRatings.error || allGenres.error || allTags.error || editMovie.error) {
      return (
        <LoadingError
          error={(allRatings.error || allGenres.error || allTags.error || editMovie.error)}
          errorMessage={(
            <div>
              {allRatings.error && (<p>{allRatings.error.message} Ratings</p>)}
              {allGenres.error && (<p>{allGenres.error.message} Genres</p>)}
              {allTags.error && (<p>{allTags.error.message} Tags</p>)}
              {editMovie.error && (<p>{editMovie.error.message} Movie to Edit</p>)}
            </div>
          )}
        />
      );
    }

    return (
      <MovieEditor
        allRatings={allRatings}
        allGenres={allGenres}
        allTags={allTags}
        addMovie={this.props.addMovie}
        updateMovie={this.props.updateMovie}
        editMovie={this.state.editMovie}
      />
    );
  }
}

Movie.propTypes = {
  allRatings: PropTypes.object.isRequired,
  allGenres: PropTypes.object.isRequired,
  allTags: PropTypes.object.isRequired,
  addMovie: PropTypes.func.isRequired,
  updateMovie: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
};

const ALL_GENRES_QUERY = gql`
  query AllGenresQuery {
    allGenres {
      id
      code
      description
    }
  }
`;

const ALL_RATINGS_QUERY = gql`
  query AllRatingsQuery {
    allRatings {
      id
      rating
      description
    }
  }
`;

const ALL_TAGS_QUERY = gql`
  query AllTagsQuery {
    allTags {
      id
      category
      tag
      name
      description
    }
  }
`;

const MOVIE_QUERY = gql`
  query MovieQuery($id: ID!) {
    movie(id: $id) {
      id
      title
      prodCode
      genre {
        id
      }
      rating {
        id
      }
      tags {
        id
      }
    }
  }
`;

const ADD_MOVIE_MUTATION = gql`
  mutation AddMovieMutation(
    $title: String!,
    $prodCode: String!,
    $genre: String!,
    $rating: String!,
    $tags: [String]!
  ) {
    addMovie(
      title: $title,
      prodCode: $prodCode,
      genre: $genre,
      rating: $rating,
      tags: $tags
    ) {
      id
    }
  }
`;

const UPDATE_MOVIE_MUTATION = gql`
  mutation UpdateMovieMutation(
    $id: ID!, 
    $title: String, 
    $prodCode: String, 
    $rating: String, 
    $genre: String, 
    $tags: [String!], 
    $replaceTags: Boolean, 
    $createdBy: String
  ) {
    updateMovie(
      id: $id,
      title: $title,
      prodCode: $prodCode,
      rating: $rating,
      genre: $genre,
      tags: $tags,
      replaceTags: $replaceTags,
      createdBy: $createdBy
    ) {
      id
    }
  }
`;

export default withRouter(compose(
  withApollo,
  graphql(ALL_GENRES_QUERY, { name: "allGenres" }),
  graphql(ALL_RATINGS_QUERY, { name: "allRatings" }),
  graphql(ALL_TAGS_QUERY, { name: "allTags" }),
  graphql(ADD_MOVIE_MUTATION, { name: "addMovie" }),
  graphql(UPDATE_MOVIE_MUTATION, { name: "updateMovie" }),
)(Movie));
