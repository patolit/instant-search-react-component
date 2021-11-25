# instant-search-react-component
A simple instant search component for react with support for autocomplete and keyboard input

# About
Created this instant search as a excersise for an interview, really liked it and wanted to preserve for teh future


# Technology
Typescript React

#Use
To use this component you only need the search component folder, the rest is to wrap it with a working example.
The Search component

## Input props: 
- Onsubmit: (value) => void expects function so the parent decides what to do with the search value
- Suggestion: string[] | (currentInput) => string[] | (currentInput) => Promise<string[]> - to be used to get suggestions for the search 

### optional inputs: 
- placeHolder: string - what to display in the field
- instant: boolean - if to do OnSubmit on each field change or not


