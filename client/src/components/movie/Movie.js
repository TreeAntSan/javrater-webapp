import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql, compose, withApollo } from "react-apollo";
import { withRouter } from "react-router";

import LoadingError from "../LoadingError";
import MovieEditor from "./MovieEditor";

import {
  ALL_GENRES_QUERY,
  ALL_RATINGS_QUERY,
  ALL_TAGS_QUERY,
  MOVIE_QUERY_SIMPLE,
  ME_QUERY,
  ALL_MOVIES_QUERY,
} from "../../graphql/Queries";

import {
  ADD_MOVIE_MUTATION,
  UPDATE_MOVIE_MUTATION,
} from "../../graphql/Mutations";

import { MovieFragment } from "../../graphql/MovieFragments";

class Movie extends Component {
  render() {
    const { allRatings, allTags, allGenres } = this.props;

    // Since this is an optional prop set it to an empty object to keep error checks compatible.
    // This prop is populated depending on this.props.match.params.id's existence
    const editMovie = this.props.editMovie || {};

    // If there was no movie found it is null. If no movie was attempted it would be undefined.
    if (editMovie.movie === null) {
      editMovie.error = {};
      editMovie.error.message = "Could not find";
    }

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
        editMovie={editMovie}
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
  editMovie: PropTypes.object,
};

export default compose(
  withRouter,
  withApollo,
  graphql(ALL_GENRES_QUERY, { name: "allGenres" }),
  graphql(ALL_RATINGS_QUERY, { name: "allRatings" }),
  graphql(ALL_TAGS_QUERY, { name: "allTags" }),
  graphql(ADD_MOVIE_MUTATION, {
    name: "addMovie",
    options: {
      update: (proxy, { data: { addMovie } }) => {
        try {
          const meData = proxy.readQuery({ query: ME_QUERY });
          meData.me.movies.push(addMovie);
          proxy.writeQuery({ query: ME_QUERY, data: meData });
        } catch (error) {
          // Do nothing, the cache wasn't filled yet, so fail quietly
        }

        try {
          const moviesData = proxy.readQuery({ query: ALL_MOVIES_QUERY });
          moviesData.movies.push(addMovie);
          proxy.writeQuery({ query: ALL_MOVIES_QUERY, data: moviesData });
        } catch (error) {
          // Do nothing, the cache wasn't filled yet, so fail quietly
        }
      },
    },
  }),
  graphql(UPDATE_MOVIE_MUTATION, {
    name: "updateMovie",
    options: {
      update: (proxy, { data: { updateMovie } }) => {
        // Excellent example of using writeFragment - finds the movie and edits it everywhere!
        proxy.writeFragment({
          id: updateMovie.id,
          fragment: MovieFragment,
          fragmentName: "MovieFragment",  // Required because this fragment has fragments itself
          data: updateMovie,
        });
      },
    },
  }),
  graphql(MOVIE_QUERY_SIMPLE, {
    name: "editMovie",
    skip: ownProps => !ownProps.match.params.id,
    options: ownProps => ({
      variables: {
        id: ownProps.match.params.id,
      },
    }),
  }),
)(Movie);
