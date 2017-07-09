import React, { Component } from 'react'

import './App.css'

import DropdownCountry from './components/DropdownCountry'

const countryCodes = require('./components/DropdownCountry/country-codes.json')
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // Holds the dropdown country state
      dropdownCountry: {
        collection: countryCodes,
        show: false,
        value: '',
        placeholder: 'Select a country',
        cursor: -1
      }
    }
  }
  onToggleDropdownCountry (evt) {
    const oldState = this.state.dropdownCountry
    const indexOfOldState = oldState.collection.map((c) => c.code.toLowerCase()).indexOf(oldState.value.toLocaleLowerCase())
    const newState = {
      ...oldState,
      show: !oldState.show,
      cursor: oldState.value ? indexOfOldState : -1
    }
    this.setState({
      dropdownCountry: newState
    })
  }

  onSelectDropdownCountry ({ name, code }) {
    const oldState = this.state.dropdownCountry
    const newState = {
      ...oldState,
      show: false,
      value: code
    }
    this.setState({
      dropdownCountry: newState
    })
  }
  onClearDropdownCountry () {
    const oldState = this.state.dropdownCountry
    const newState = {
      ...oldState,
      show: false,
      value: ''
    }
    this.setState({
      dropdownCountry: newState
    })
  }

  onKeyDownDropdownCountry (evt) {
    console.log(evt.keyCode)
    const oldState = this.state.dropdownCountry

    if (!oldState.show) {
      return
    }

    const UP = evt.keyCode === 38
    const DOWN = evt.keyCode === 40
    const ENTER = evt.keyCode === 13
    if (UP) {
      if (oldState.cursor === 0) return
      const nextCursor = oldState.cursor - 1
      const newState = {
        ...oldState,
        cursor: nextCursor
      }
      this.setState({
        dropdownCountry: newState
      })
    }
    if (DOWN) {
      const COUNTRY_CODES_LEN = oldState.collection.length
      if (oldState.cursor === COUNTRY_CODES_LEN - 1) return
      const nextCursor = oldState.cursor + 1
      const newState = {
        ...oldState,
        cursor: nextCursor
      }
      this.setState({
        dropdownCountry: newState
      })
    }

    if (ENTER) {
      const oldCursor = oldState.cursor
      const newCountryCode = oldState.collection[oldCursor]
      const newState = {
        ...oldState,
        value: newCountryCode.code.toLowerCase(),
        show: false
      }
      this.setState({
        dropdownCountry: newState
      })
    }

    const keyword = String.fromCharCode(evt.keyCode)
    const match = keyword.match(/^[A-z]+$/i)
    if (match) {
      const indexOfMatches = oldState.collection.findIndex((e) => {
        return e.name.toLowerCase().indexOf(match[0].toLowerCase()) === 0
      })

      const newCountryCode = oldState.collection[indexOfMatches]
      const newState = {
        ...oldState,
        value: newCountryCode.code.toLowerCase(),
        cursor: indexOfMatches
      }
      this.setState({
        dropdownCountry: newState
      })
    }
  }
  onBlurDropdownCountry () {
    const oldState = this.state.dropdownCountry
    const newState = {
      ...oldState,
      show: false
    }
    this.setState({
      dropdownCountry: newState
    })
  }
  render () {
    return (
      <div className='App'>
        <h1>React Components</h1>

        <br />

        <div className='container'>
          <DropdownCountry
            {...this.state.dropdownCountry}
            onToggle={this.onToggleDropdownCountry.bind(this)}
            onSelect={this.onSelectDropdownCountry.bind(this)}
            onClear={this.onClearDropdownCountry.bind(this)}
            onKeyDown={this.onKeyDownDropdownCountry.bind(this)}
            onBlur={this.onBlurDropdownCountry.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default App
