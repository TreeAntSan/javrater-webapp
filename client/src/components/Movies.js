import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import { Container, Loader, Message } from "semantic-ui-react";

import MovieTable from "./MovieTable";

// TODO Bug: page doesn't refresh when navigated to it when there is a new movie saved
class Movies extends Component {
  render() {
    if (this.props.allMovies.loading) {
      return (
        <Container>
          <Loader active>Loading</Loader>
        </Container>
      );
    } else if (this.props.allMovies.error) {
      return (
        <Container>
          <Message negative>
            <Message.Header>Error</Message.Header>
            <p>{this.props.allMovies.error.message}</p>
          </Message>
        </Container>
      );
    }
    return (
      <Container>
        <MovieTable
          movies={this.props.allMovies.movies}
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
        name
      }
    }
  }
`;

export default withRouter(graphql(ALL_MOVIES_QUERY, { name: "allMovies" })(Movies));
