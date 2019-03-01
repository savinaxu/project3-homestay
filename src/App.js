import React, { Component } from 'react';
import {Header} from './shared/Header';
import {RentalCard} from './components/rental/RentalCard';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className='container'>
          <section id='rentalListing'>
            <h1 className='page-title'>Your Home All Around the World</h1>
            <div className='row'>
              <RentalCard />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
