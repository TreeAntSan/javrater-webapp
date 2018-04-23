import gql from "graphql-tag";

import {
  GenreDetails,
  RatingDetails,
  TagDetails,
  UserDetails,
  // PrivateUserDetails,
} from "./SimpleFragments";

import {
  MovieFragment,
  MovieFragmentSimple,
} from "./MovieFragments";

import {
  UserFragment,
  // PrivateUserFragment, // TODO why is this broken?
} from "./UserFragments";

export const ALL_MOVIES_QUERY = gql`
  query AllMoviesQuery {
    movies {
      ...MovieFragment
    }
  }
  ${MovieFragment}
`;

export const ALL_GENRES_QUERY = gql`
  query AllGenresQuery {
    allGenres {
      ...GenreDetails
    }
  }
  ${GenreDetails}
`;

export const ALL_RATINGS_QUERY = gql`
  query AllRatingsQuery {
    allRatings {
      ...RatingDetails
    }
  }
  ${RatingDetails}
`;

export const ALL_TAGS_QUERY = gql`
  query AllTagsQuery {
    allTags {
      ...TagDetails
    }
  }
  ${TagDetails}
`;

export const MOVIE_QUERY = gql`
  query MovieQuery($id: ID!) {
    movie(id: $id) {
      ...MovieFragment
    }
  }
  ${MovieFragment}
`;

export const MOVIE_QUERY_SIMPLE = gql`
  query MovieQuery($id: ID!) {
    movie(id: $id) {
      ...MovieFragmentSimple
    }
  }
  ${MovieFragmentSimple}
`;

export const USER_QUERY = gql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

export const USER_QUERY_SIMPLE = gql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      ...UserDetails
    }
  }
  ${UserDetails}
`;

export const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      name
      email
      movies {
        ...MovieFragment
      }
    }
  }
  ${MovieFragment}
`;

export const ME_QUERY_SIMPLE = gql`
  query MeQuery {
    me {
      id
      name
      email
    }
  }
`;
