import React, { Component } from 'react';
import Weather from './weather';

export default class App extends Component {
  render() {
    return (
      <div className='row'>
         <Weather />
      </div>
    );
  }
}