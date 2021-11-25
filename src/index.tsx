import React, { Component } from 'react';
import { render } from 'react-dom';
import { suggestions } from './components/mockData';
import { Search } from './components/search/search';
import SearchResults from './components/search/searchResults/searchResults';

import './style.css';

interface AppProps {}
interface AppState {
  name: string;
  searchResults: string[];
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      searchResults: [],
    };
  }

  //Ariel added for mocking DB
  mockQuery(params: string) {
    const queryResult = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(params.toLowerCase()) > -1
    );
    this.setState({ searchResults: [...queryResult] });
    console.log('searching', this.state.searchResults);
    return queryResult;
  }

  // add support if sugestions are not provided
  render() {
    return (
      <div>
        <Search suggestions={suggestions} query={this.mockQuery} />
        <SearchResults queryResults={this.state.searchResults} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
