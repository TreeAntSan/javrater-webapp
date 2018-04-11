import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Grid, Header, Segment, Form, Button, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class Login extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  };

  render () {
    // Necessary in order to deal with "Update Blocking". See:
    // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
    const loginPage = this.props.location.pathname === this.props.loginPath;

    return (
      <Grid padded centered columns={2}>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <Header as="h1" textAlign="center">
              <Header.Content>
                Please {loginPage ? "login" : "sign-up"} below!
              </Header.Content>
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <Segment>
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
                <Container textAlign="right">
                  <Button type="submit">{loginPage ? "Login" : "Sign-up"}</Button>
                  <br />
                  <br />
                  <Link
                    to={loginPage ? "/signup" : "/login"}>
                    Click here if you {loginPage ? "need to make" : "already have"} an account.
                  </Link>
                </Container>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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

export default compose(
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),
  graphql(LOGIN_MUTATION, { name: 'loginMutation' }),
)(Login);
