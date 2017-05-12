import React from 'react';
import Autosuggest from 'react-autosuggest';
import {
    Form,
    Input,
    Button,
} from 'reactstrap';
import './SearchBar.css'
const languages = [

  {
    title: '1970s',
    languages: [
      {
        name: 'C',
        year: 1972
      }
    ]
  },
  {
    title: '1980s',
    languages: [
      {
        name: 'C++',
        year: 1983
      },
      {
        name: 'Perl',
        year: 1987
      }
    ]
  },
  {
    title: '1990s',
    languages: [
      {
        name: 'Haskell',
        year: 1990
      },
      {
        name: 'Python',
        year: 1991
      },
      {
        name: 'Java',
        year: 1995
      },
      {
        name: 'Javascript',
        year: 1995
      },
      {
        name: 'PHP',
        year: 1995
      },
      {
        name: 'Ruby',
        year: 1995
      }
    ]
  },
  {
    title: '2000s',
    languages: [
      {
        name: 'C#',
        year: 2000
      },
      {
        name: 'Scala',
        year: 2003
      },
      {
        name: 'Clojure',
        year: 2007
      },
      {
        name: 'Go',
        year: 2009
      }
    ]
  },
  {
    title: '2010s',
    languages: [
      {
        name: 'Elm',
        year: 2012
      }
    ]
  }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return languages
    .map(section => {
      return {
        title: section.title,
        languages: section.languages.filter(language => regex.test(language.name))
      };
    })
    .filter(section => section.languages.length > 0);
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

function renderSectionTitle(section) {
  return (
    <strong>{section.title}</strong>
  );
}

function getSectionSuggestions(section) {
  return section.languages;
}

function shouldRenderSuggestions() {
  return true;
}
export default class SearchBar extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.handleSubmit(event,suggestionValue);
  };

  handleSubmit(e,suggestionValue) {
      e.preventDefault();
      if(e.type==="submit")
        console.log(this.state.value);
      else
        console.log(suggestionValue);
  }

  render() {

    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "美食 地點 隨你搜",
      value,
      onChange: this.onChange
    };

    return (
      <div className='searchbar'>
        <Form className='form-inline justify-content-center' onSubmit={this.handleSubmit}>
          <Autosuggest
            multiSection={true}
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            renderSectionTitle={renderSectionTitle}
            getSectionSuggestions={getSectionSuggestions}
            inputProps={inputProps}
        
  onSuggestionSelected={this.onSuggestionSelected}
          />
        </Form>
      </div>


    );
  }
}
