import React, { Component } from 'react';
import Header from './shared/Header';
import RentalList from './components/rental/RentalList';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className='container'>
          <RentalList />
        </div>
      </div>
    );
  }
}

export default App;
