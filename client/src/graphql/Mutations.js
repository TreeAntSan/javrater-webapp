import gql from "graphql-tag";

import { MovieFragment } from "./MovieFragments";

// Full movie details returned.
export const ADD_MOVIE_MUTATION = gql`
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
      ...MovieFragment
    }
  }
  ${MovieFragment}
`;

// No additional details returned, just the ID.
export const ADD_MOVIE_MUTATION_SIMPLE = gql`
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

// Full movie details returned.
export const UPDATE_MOVIE_MUTATION = gql`
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
      ...MovieFragment
    }
  }
  ${MovieFragment}
`;

// No additional details returned, just the ID.
export const UPDATE_MOVIE_MUTATION_SIMPLE = gql`
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

export const DELETE_MOVIE_MUTATION = gql`
  mutation DeleteMovieMutation($id: ID!) {
    deleteMovie(id: $id) {
      id
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;
