import React from 'react';
import './searchResults.css';

interface SearchResultsProps {
  queryResults?: string[] | undefined;
}

const SearchResults = (props: SearchResultsProps) => {
  const { queryResults } = props;
  //console.log('rendering result');

  if (queryResults.length > 0)
    return (
      <div className="results-panel">
        {queryResults.map((value) => (
          <div key={value} className="result-item">
            {value}
          </div>
        ))}
      </div>
    );

  return (
    <div className="no-result">
      <span> No results</span>
    </div>
  );
};

export default SearchResults;
