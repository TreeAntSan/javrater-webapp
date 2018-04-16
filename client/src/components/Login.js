import React, { Component } from 'react';
import PropTypes from "prop-types";
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { Header, Segment, Form, Button, Container, Dimmer, Loader, Message } from "semantic-ui-react";

import FloatingCenterGrid from "./FloatingCenterGrid";
import utils from "../utils";

class Login extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    submissionInProgress: false,
    submissionFailure: "",
    shouldRedirect: false,
  };

  _confirm = async () => {
    // TODO Does this do anything?
    this.props.client.resetStore();

    // Login
    if (this.props.location.pathname === this.props.loginPath) {
      this.setState({ submissionInProgress: true });
      try {
        const result = await this.props.loginMutation({
          variables: {
            email: this.state.email,
            password: this.state.password,
          },
        });
        const { token } = result.data.login;
        utils.setToken(token);
        this.setState({ shouldRedirect: true });
      } catch (error) {
        this.setState({ submissionInProgress: false, submissionFailure: error.message });
      }

    // Signup
    } else {
      this.setState({ submissionInProgress: true });
      try {
        const result = await this.props.signupMutation({
          variables: {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
          },
        });
        const { token } = result.data.signup;
        utils.setToken(token);
        this.setState({ shouldRedirect: true });
      } catch (error) {
        this.setState({ submissionInProgress: false, submissionFailure: error.message });
      }
    }
  };

  _redirectPath = () => {
    const locationState = this.props.location.state;
    const pathname = (
      locationState && locationState.from && locationState.from.pathname
    );
    return pathname || "/";
  };

  render () {
    // TODO Bug UserWrapper doesn't get the name to the client immediately after being redirected
    if (this.state.shouldRedirect || this.props.currentUser.me) {
      return (
        <Redirect to={this._redirectPath()} />
      )
    }

    // Necessary in order to deal with "Update Blocking". See:
    // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
    const loginPage = this.props.location.pathname === this.props.loginPath;

    // TODO Form validation needed!
    return (
      <FloatingCenterGrid>
        <Header as="h1" textAlign="center">
          <Header.Content>
            Please {loginPage ? "login" : "sign-up"} below!
          </Header.Content>
        </Header>
        <Segment>
          <Dimmer inverted active={this.state.submissionInProgress}>
            <Loader />
          </Dimmer>
          <Form>
            {!loginPage && (
              <Form.Input
                required={!loginPage}
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                label="Name"
                autoComplete="username"
                placeholder="A username"
              />
            )}
            <Form.Input
              required={!loginPage}
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              label="Email"
              autoComplete="email"
              placeholder="Your email"
            />
            <Form.Input
              required={!loginPage}
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              label="Password"
              autoComplete={loginPage ? "current-password" : "new-password"}
              placeholder={loginPage ? "Enter your password" : "Choose a safe password"}
              type="password"
            />
            {this.state.submissionFailure &&
            <Container>
              <Message negative>
                <Message.Header>Error</Message.Header>
                {this.state.submissionFailure}
              </Message>
            </Container>
            }
            <Container textAlign="right">
              <Button
                primary
                type="submit"
                onClick={() => this._confirm()}
              >
                {loginPage ? "Login" : "Sign-up"}
              </Button>
              <br />
              <br />
              <Link
                to={loginPage ? "/signup" : "/login"}>
                Click here if you {loginPage ? "need to make" : "already have"} an account.
              </Link>
            </Container>
          </Form>
        </Segment>
      </FloatingCenterGrid>
    );
  }
}

Login.propType = {
  signupMutation: PropTypes.func.isRequired,
  loginMutation: PropTypes.func.isRequired,
  loginPath: PropTypes.string.isRequired,
};

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default withRouter(compose(
  withApollo,
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),
  graphql(LOGIN_MUTATION, { name: 'loginMutation' }),
)(Login));
