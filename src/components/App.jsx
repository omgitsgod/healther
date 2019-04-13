import React, { Component, Link } from 'react';
import Profile from './Profile.jsx';
import Signin from './Signin.jsx';
import Container from '../containers/Container.jsx'
import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
} from 'blockstack';

export default class App extends Component {

  constructor(props) {
  	super(props);
  }

  handleSignIn(e) {
    e.preventDefault();
    redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  render() {

    return (
      <header className="site-wrapper">
        <div className="site-wrapper-inner">
          { !isUserSignedIn() ?
            <Signin handleSignIn={ this.handleSignIn } />
            : <Profile handleSignOut={this.handleSignOut} signedIn={isUserSignedIn()}/>
          }
          { !isUserSignedIn() ? <Container  /> : null }
        </div>
      </header>
    );
  }

  componentWillMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then((userData) => {
        window.location = window.location.origin;
      });
    }
  }
}
