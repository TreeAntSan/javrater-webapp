import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql, Query, compose, withApollo } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import { Container } from "semantic-ui-react";

import utils from "../../utils";

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
      update: this.props.updateFunction ||
      ((proxy, {data: {deleteMovie}}) => {
          const data = proxy.readQuery({query: ALL_MOVIES_QUERY});
          // Remove the movie using the mutation return data.
          data.movies.splice(data.movies.findIndex(movie => movie.id === deleteMovie.id), 1);
          proxy.writeQuery({query: ALL_MOVIES_QUERY, data});
        }
      ),
    });
  };

  render() {
    return (
      <Container>
        {this.props.movies ?
          <MovieTable
            showCreatedBy={this.props.showCreatedBy}
            showDelete={this.props.showDelete}
            showEdit={this.props.showEdit}
            onDelete={this.handleDeleteClick}
            movies={this.props.movies}
          />
          :
          <Query query={ALL_MOVIES_QUERY}>
            {queryProps => (
              utils.queryOK(queryProps, queryProps.data) ?
                <MovieTable
                  showCreatedBy={this.props.showCreatedBy}
                  showDelete={this.props.showDelete}
                  showEdit={this.props.showEdit}
                  onDelete={this.handleDeleteClick}
                  movies={queryProps.data.movies}
                />
                :
                <LoadingError error={queryProps.error} />
            )}
          </Query>
        }
        <br/>
      </Container>
    );
  }
}

Movies.propTypes = {
  showCreatedBy: PropTypes.bool,
  showDelete: PropTypes.bool,
  showEdit: PropTypes.bool,
  movies: PropTypes.array,
  updateFunction: PropTypes.func,
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
)(Movies));
