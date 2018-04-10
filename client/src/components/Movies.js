import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Loader, Message } from "semantic-ui-react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import MovieTable from "./MovieTable";

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
        tag
        name
      }
      createdBy {
        name
      }
    }
  }
`;

export default graphql(ALL_MOVIES_QUERY, { name: "allMovies" })(Movies);
