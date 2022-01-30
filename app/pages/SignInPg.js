import React from 'react';
import { Component } from 'react';
import SignInFormContainer from '../containers/SignInFormContainer.js';

export default class SignInPg extends Component {
  render() {
    console.log('--SignIn page--');
    return (
      <div>
        <SignInFormContainer 
            user= {this.props.user}
          />
      </div>
    );
  }
}

