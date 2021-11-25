import React, { useState, useRef, useMemo } from 'react';
import SearchResults from './searchResults/searchResults';
import SuggestionsList from './suggestionList/suggestionsList';

import './search.css';
import classNames from 'classnames';

interface SearchProps {
  suggestions: string[];
  query: (params: string) => string[];
}

function Search(props: SearchProps) {
  const { suggestions, query } = props;
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [searchResult, setSearchResult] = useState([]);
  const input = useRef('');

  //console.log('rendering search');

  /** tried to save renders, currently on each keystroke i render all when i should render only if sugestions change */
  const newFilteredSugestions = useMemo(
    () =>
      suggestions.filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(input.current.toLowerCase()) > -1
      ),
    [input.current]
  );
  console.log(newFilteredSugestions);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const userInput = e.target.value;

    // Filter our suggestions that don't contain the user's input
    const unLinked = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    input.current = e.target.value;
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(-1);
    setShowSuggestions(true);
  };

  const onClickSugestion = async (e: React.FormEvent<HTMLInputElement>) => {
    setFilteredSuggestions([]);
    input.current = e.target.innerHTML;
    setSearchResult(query(input.current));
    setActiveSuggestionIndex(-1);
    setShowSuggestions(false);
  };

  const onkeydown = async (e: React.FormEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      activeSuggestionIndex === -1
        ? input.current
        : (input.current = filteredSuggestions[activeSuggestionIndex]);

      setActiveSuggestionIndex(-1);
      setShowSuggestions(false);
      setSearchResult(query(input.current));
    }
    if (e.key === 'ArrowUp') {
      if (activeSuggestionIndex === -1) return;
      setActiveSuggestionIndex((prevIndex) => prevIndex - 1);
    }
    if (e.key === 'ArrowDown') {
      if (activeSuggestionIndex >= filteredSuggestions.length - 1) return;
      setActiveSuggestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const inputClass = `my-input ${showSuggestions && 'with-suggestions'}`;

  return (
    <div className="search-component">
      <div className="search-panel">
        <input
          className={classNames('my-input', {
            'with-suggestions': showSuggestions,
          })}
          type="text"
          onChange={onChange}
          onKeyDown={onkeydown}
          value={input.current}
          placeholder="Type your search or command..."
        />

        {showSuggestions && input && (
          <SuggestionsList
            onClick={onClickSugestion}
            activeSuggestionIndex={activeSuggestionIndex}
            filteredSuggestions={filteredSuggestions}
          />
        )}
      </div>

      <SearchResults queryResults={searchResult} />
    </div>
  );
}

export { Search };
