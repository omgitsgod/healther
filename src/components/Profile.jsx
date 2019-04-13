import React, { Component } from 'react';
import dummy from '../assets/dummy-data.json'
import {
  isSignInPending,
  loadUserData,
  Person,
  putFile,
} from 'blockstack';
import Container from '../containers/Container.jsx'

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Profile extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  	  person: {
  	  	name() {
          return 'Anonymous';
        },
  	  	avatarUrl() {
  	  	  return avatarFallbackImage;
  	  	},
  	  },
  	};
  }


  render() {
    const { handleSignOut, signedIn } = this.props;
    const { person } = this.state;


    const user = loadUserData().username
    const options = { encrypt: false }
    putFile('results.json', JSON.stringify(dummy), options)
    .then(console.log('Done!'))
    return (
      !isSignInPending() ?
      <div className="panel-welcome" id="section-2">
        <div className="avatar-section">
          <img src={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage } className="img-rounded avatar" id="avatar-image" />
        </div>
        <h1>Hello, <span id="heading-name">{ person.name() ? person.name() : `${user.split('.')[0]}` }</span>!</h1>
        <Container signedIn={signedIn} />

        <p className="lead">
          <button
            className="btn btn-primary btn-lg"
            id="signout-button"
            onClick={ handleSignOut.bind(this) }
          >
            Logout
          </button>

        </p>
      </div> : null
    );
  }

  componentWillMount() {
    this.setState({
      person: new Person(loadUserData().profile),
    });
  }
}
