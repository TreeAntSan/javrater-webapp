import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql, compose, withApollo } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import { Container } from "semantic-ui-react";

import MovieTable from "./MovieTable";
import LoadingError from "../LoadingError";

// TODO Bug: page doesn't refresh when navigated to it when there is a new movie saved
class Movies extends Component {
  handleDeleteClick = (e, movieId) => {
    e.preventDefault();

    // Inspiration taken from:
    // https://github.com/apollographql/apollo-client/blob/master/docs/source/basics/mutations.md#updating-the-cache-after-a-mutation
    this.props.client.mutate({
      mutation: DELETE_MOVIE_MUTATION,
      variables: {
        id: movieId,
      },
      update: (proxy, { data: { deleteMovie }}) => {
        const data = proxy.readQuery({ query: ALL_MOVIES_QUERY });
        // Remove the movie using the mutation return data.
        data.movies.splice(data.movies.findIndex(movie => movie.id === deleteMovie.id), 1);
        proxy.writeQuery({ query: ALL_MOVIES_QUERY, data });
      },
    });
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
          showEdit
        />
        <br/>
      </Container>
    );
  }
}

Movies.propTypes = {
  allMovies: PropTypes.object.isRequired,
};

const ALL_MOVIES_QUERY = gql`
  query AllMoviesQuery {
    movies {
      id
      title
      prodCode
      genre {
        id
        code
        description
      }
      rating {
        id
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
  withApollo,
  graphql(ALL_MOVIES_QUERY, { name: "allMovies" }),
)(Movies));
