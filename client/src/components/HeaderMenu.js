import React from "react";
import { Menu, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import utils from "../utils";

const HeaderMenu = props => (
  <Menu stackable>
    <Menu.Item>
      <Link to="/welcome">
        <Image src="/treeant.jpeg" avatar />
        <span>JavRater</span>
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
    {utils.loggedIn(props.user) ?
      <Menu.Menu position="right">
        <Menu.Item>
          <p>Hello, <Link to="/user/me">{utils.grabName(props.user)}</Link></p>
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

export default HeaderMenu;
