import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import { Container } from "semantic-ui-react";

import MovieTable from "./MovieTable";
import LoadingError from "../LoadingError";

// TODO Bug: page doesn't refresh when navigated to it when there is a new movie saved
class Movies extends Component {
   handleDeleteClick = (e, movieId) => {
    e.preventDefault();
    this.props.deleteMovie({
      variables: {
        id: movieId,
      },
    });//.then(this.props.allMovies.refetch());
    // TODO need to make it so that deleting actually DOES SOMETHING
  };

  render() {
    if (this.props.allMovies.loading || this.props.allMovies.error) {
      return (<LoadingError error={this.props.allMovies.error} />);
    }

    return (
      <Container>
        <MovieTable
          movies={this.props.allMovies.movies}
          showCreatedBy
          showDelete
          onDelete={this.handleDeleteClick}
        />
        <br/>
      </Container>
    );
  }
}

Movies.propTypes = {
  allMovies: PropTypes.object.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

const ALL_MOVIES_QUERY = gql`
  query AllMoviesQuery {
    movies {
      id
      title
      prodCode
      genre {
        code
        description
      }
      rating {
        rating
        description
      }
      tags {
        id
        tag
        name
        category
        description
      }
      createdBy {
        id
        name
      }
    }
  }
`;

const DELETE_MOVIE_MUTATION = gql`
  mutation DeleteMovieMutation($id: ID!) {
    deleteMovie(id: $id) {
      id
    }
  }
`;

export default withRouter(compose(
  graphql(ALL_MOVIES_QUERY, { name: "allMovies" }),
  graphql(DELETE_MOVIE_MUTATION, { name: "deleteMovie" }),
)(Movies));
