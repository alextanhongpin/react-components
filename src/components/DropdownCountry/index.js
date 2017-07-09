import React from 'react'
import './flags.min.css'
import './index.css'

const DropdownCountry = ({ collection, value, show, cursor, placeholder, onToggle, onSelect, onBlur, onClear, onKeyDown }) => {
  // Store the global reference to the element
  let dropdown
  const getReference = (el) => {
    dropdown = el
    if (dropdown) {
      dropdown.scrollTop = cursor * 35
    }
  }

  const lowercaseValue = value.toLowerCase()
  const selectedCountryCode = collection.filter((c) => {
    return c.code.toLowerCase() === lowercaseValue
  })

  const hasValue = selectedCountryCode.length
  const dropdownCountriesClassName = [

    'react-dropdown-country__countries',
    show ? 'is-visible' : ''
  ].join(' ')

  return (
    <div className='react-dropdown-country'>
      <div className='react-dropdown-select'

        onClick={onToggle}>
        { hasValue ? <CountryIcon code={lowercaseValue} /> : null }
        <Space />
        <input
          type='text'
          className='react-dropdown-country__input'
          value={hasValue ? selectedCountryCode[0].name : ''}
          placeholder={placeholder}
          onKeyUp={onKeyDown}
          onBlur={onBlur}
          readOnly
        />
        {/* { hasValue ? selectedCountryCode[0].name : placeholder || 'Select country from dropdown'} */}
      </div>

      <div className={dropdownCountriesClassName} ref={getReference}>
        {
            collection.map((countryCode, index) => {
              const isSelected = countryCode.code.toLowerCase() === lowercaseValue
              const isFocused = index === cursor
              const className = [
                'react-dropdown-country__country',
                isSelected ? 'is-selected' : '',
                isFocused ? 'is-focused' : ''
              ].join(' ')
              return (
                <div
                  key={countryCode.code}
                  className={className}
                  onMouseDown={() => onSelect(countryCode)}
                >
                  <CountryIcon code={countryCode.code.toLowerCase()} />
                  <Space />
                  <span className='react-dropdown-country__country-label'>{countryCode.name}</span>
                </div>
              )
            })
        }
      </div>
      { hasValue ? <span className='react-dropdown-country__button-clear' onClick={onClear}>Clear Selection</span> : null }
    </div>
  )
}

const Space = () => {
  return <span className='react-dropdown-country__separator' />
}

const CountryIcon = ({ code }) => {
  return <span className={'flag flag-' + code} />
}

export default DropdownCountry
