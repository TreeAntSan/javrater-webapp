import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query, withApollo, compose } from "react-apollo";
import { withRouter } from "react-router";
import { Container } from "semantic-ui-react";

import utils from "../../utils";

import MovieTable from "./MovieTable";
import LoadingError from "../LoadingError";

import { ALL_MOVIES_QUERY } from "../../graphql/Queries";

import { DELETE_MOVIE_MUTATION } from "../../graphql/Mutations";

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
      update: this.props.deleteMovieUpdate ||
      ((proxy, { data: { deleteMovie } }) => {
          const data = proxy.readQuery({ query: ALL_MOVIES_QUERY });

          // Remove the movie using the mutation return data.
          data.movies.splice(data.movies.findIndex(movie => movie.id === deleteMovie.id), 1);
          proxy.writeQuery({ query: ALL_MOVIES_QUERY, data });
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
  deleteMovieUpdate: PropTypes.func,
};

export default compose(
  withRouter,
  withApollo,
)(Movies);
