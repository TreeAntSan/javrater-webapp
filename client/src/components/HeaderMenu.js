import React from "react";
import PropTypes from "prop-types";
import { Menu, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import utils from "../utils";
import withUser from "../UserProtector";

const HeaderMenu = props => (
  <Menu stackable>
    <Menu.Item>
      <Link to="/welcome">
        <Image src="/treeant.jpeg" avatar />
        <span>Rater</span>
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/movie/create">
        Create
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/movies">
        Movies
      </Link>
    </Menu.Item>
    {utils.loggedIn(props.currentUser) ?
      <Menu.Menu position="right">
        <Menu.Item>
          <p>Hello, <Link to="/user/me">{utils.grabName(props.currentUser)}</Link></p>
        </Menu.Item>
        <Menu.Item>
          <Link to="/logout">
            Logout
          </Link>
        </Menu.Item>
      </Menu.Menu>
      :
      <Menu.Menu position="right">
        <Menu.Item>
          <Link to="/login">
            Login
          </Link>
        </Menu.Item>
      </Menu.Menu>
    }
  </Menu>
);

HeaderMenu.propTypes = {
  currentUser: PropTypes.object,
};

export default withUser(HeaderMenu);
