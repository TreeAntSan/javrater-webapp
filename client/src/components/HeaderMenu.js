import React, { Component } from "react";
import PropTypes from "prop-types";
import { withApollo } from "react-apollo";
import { Menu, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import utils from "../utils";
import withUser from "../UserProtector";


class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    console.log("subscribed");
    this.unsubscribe = this.props.client.onResetStore(this._reload);
    this.state = {
      loggedIn: false,
      nameString: "",
    };
  }

  componentWillMount() {
    this._reload();
  }

  componentWillUnmount() {
    console.log("unsubscribed");
    this.unsubscribe();
  }

  _reload = () => {
    console.log("RELOAD");
    const loggedIn = utils.loggedIn(this.props.currentUser);
    const nameString = utils.grabName(this.props.currentUser);
    this.setState({ loggedIn, nameString });
  };

  render() {
    return (
      <Menu stackable>
        <Menu.Item>
          <Link to="/welcome">
            <Image src="/treeant.jpeg" avatar/>
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
        {this.state.loggedIn ?
          <Menu.Menu position="right">
            <Menu.Item>
              <p>Hello, <Link to="/user/me">{this.state.nameString}</Link></p>
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
  }
};

HeaderMenu.propTypes = {
  currentUser: PropTypes.object,
};

export default withUser(withApollo(HeaderMenu));
