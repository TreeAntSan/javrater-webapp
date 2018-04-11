import React from "react";
import { Menu, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const HeaderMenu = () => (
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
    <Menu.Item>
      <Link to="/login">
        Login
      </Link>
    </Menu.Item>
  </Menu>
);

export default HeaderMenu;
