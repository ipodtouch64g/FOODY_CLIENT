import React from 'react';
import Autosuggest from 'react-autosuggest';
import {Form, Input, Button} from 'reactstrap';
import './SearchBar.css'
import {BrowserRouter as Router, Route, Link, } from 'react-router-dom'

const languages = [

  {
    title: '地點',
    languages: [
      {
        name: '台北',
        year: 1972
      }, {
        name: '台中',
        year: 1972
      }, {
        name: '台南',
        year: 1972
      }, {
        name: '高雄',
        year: 1972
      }
    ]
  },
  {
    title: '食物',
    languages: [
      {
        name: '牛排',
        year: 1972
      }, {
        name: '牛肉麵',
        year: 1972
      }, {
        name: '排骨',
        year: 1972
      }, {
        name: '咖哩',
        year: 1972
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

  return languages.map(section => {
    return {
      title: section.title,
      languages: section.languages.filter(language => regex.test(language.name))
    };
  }).filter(section => section.languages.length > 0);
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

  onChange = (event, {newValue, method}) => {
    this.setState({value: newValue},()=>{
      console.log(this.state.value);

    });
  };

  onSuggestionsFetchRequested = ({value}) => {
    this.setState({suggestions: getSuggestions(value)});
  };

  onSuggestionsClearRequested = () => {
    this.setState({suggestions: []});
  };

  onSuggestionSelected = (event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) => {
    this.handleSubmit(event, suggestionValue);
  };

  handleSubmit(e, suggestionValue) {
    e.preventDefault();
    if (this.state.value !== '') {
      if (e.type === "submit") {
        this.props.onSearch(this.state.value);

      } else {
        this.props.onSearch(suggestionValue);

      }
    } else {
      this.setState({value: ''});
    }


  }

  render() {

    const {value, suggestions} = this.state;
    const inputProps = {
      placeholder: "美食 地點 隨你搜",
      value,
      onChange: this.onChange
    };

    return (
      <div className='searchbar'>

        <Form className='form-inline justify-content-center' onSubmit={this.handleSubmit}>
          <Autosuggest multiSection={true} suggestions={suggestions} onSuggestionsFetchRequested={this.onSuggestionsFetchRequested} onSuggestionsClearRequested={this.onSuggestionsClearRequested} getSuggestionValue={getSuggestionValue} renderSuggestion={renderSuggestion} renderSectionTitle={renderSectionTitle} getSectionSuggestions={getSectionSuggestions} inputProps={inputProps} onSuggestionSelected={this.onSuggestionSelected}/>
        </Form>

      </div>

    );
  }
}
