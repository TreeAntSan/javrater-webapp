import React, { Component } from "react";
import PropTypes from "prop-types";
import { withApollo, compose } from "react-apollo";
import { Menu, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import withUser from "../UserProtector";

class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = this.props.client.onResetStore(this._reload);
    this.state = {
      loggedIn: false,
      nameString: "",
    };
  }

  componentWillMount() {
    this._reload();
  }

  componentWillReceiveProps() {
    this._reload()
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // Force getting meData from the cache by using the client's readQuery
  _reload = () => {
    try {
      const { me } = this.props.client.readQuery({
        query: this.props.meQuery,
      });
      if (me) {
        this.setState({ loggedIn: true, nameString: me.name});
      }
    } catch (error) {
      this.setState({ loggedIn: false, nameString: "" });
    }
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
}

HeaderMenu.propTypes = {
  currentUser: PropTypes.object,
};

export default compose(
  withUser,   // TODO not really needed, just using it for meQuery prop
  withApollo, // Needed to access client
)(HeaderMenu);
