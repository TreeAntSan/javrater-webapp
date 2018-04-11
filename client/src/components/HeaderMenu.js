import React from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo/index";
import gql from "graphql-tag";
import { Menu, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const HeaderMenu = props => (
  <Menu stackable>
    <Menu.Item>
      <Link to="/welcome">
        <Image src="treeant.jpeg" avatar />
        <span>JavRater</span>
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/create">
        Create
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/movies">
        Movies
      </Link>
    </Menu.Item>
    <Menu.Menu position="right">
      <Menu.Item>
        <p>Hello{props.meQuery && !props.meQuery.error && !props.meQuery.loading && `, ${props.meQuery.me.name}`}</p>
      </Menu.Item>
      <Menu.Item>
        <Link to="/signup">
          Sign-up
        </Link>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);


HeaderMenu.propTypes = {
  children: PropTypes.array,
  meQuery: PropTypes.object.isRequired,
};

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      name
      email
    }
  }
`;

export default graphql(ME_QUERY, { name: "meQuery" })(HeaderMenu);
