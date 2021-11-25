import React from 'react';
import './suggestionsList.css';

interface SugestionsListProps {
  filteredSuggestions: string[];
  activeSuggestionIndex: number;
  onClick: (event: any) => void;
}

const onkeydown = (e: React.FormEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') console.log('key down');
  if (e.key === 'ArrowUp') console.log('key down');
  if (e.key === 'ArrowDown') console.log('key down');
};

const SuggestionsList = (props: SugestionsListProps) => {
  const { filteredSuggestions, activeSuggestionIndex, onClick } = props;

  //console.log('rendering suggestions');
  return (
    <div onKeyDown={onkeydown} className="suggestions-box">
      {filteredSuggestions.length ? (
        filteredSuggestions.map((suggestion, index) => {
          let className = 'suggestion';
          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = 'suggestion active';
          }
          return (
            <div className={className} key={suggestion} onClick={onClick}>
              {suggestion}
            </div>
          );
        })
      ) : (
        <div className="no-suggestions">
          <em>No suggestions, you're on your own!</em>
        </div>
      )}
    </div>
  );
};

export default SuggestionsList;
