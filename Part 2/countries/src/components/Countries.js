import React from "react"

const Countries = ({ countriesToShow, handleCollapse, collapsed }) => {
  const countriesNames = countriesToShow().map(country =>
    <Country country={country} />
  )
  return <Display countriesNames={countriesNames} handleCollapse={handleCollapse} collapsed={collapsed} />
}

const Country = ({ country }) => {
  return (
    <>
      {country.name}
    </>
  )
}

const Display = ({ countriesNames, handleCollapse, collapsed }) => {
  if (countriesNames.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  else if (countriesNames.length === 1) {
    const country = countriesNames[0].props.country
    return <CountryInfo countryName={country} />
  }
  else if (countriesNames.length > 1) {
    const countries = countriesNames.map(country => {
      return (
        <CountryAndButton
        key={country.props.country.name}
        collapsed={collapsed}
        country={country}
        handleCollapse={handleCollapse} />
      )
    })
    return (
      countries
    )
  }
  else {
    return countriesNames
  }
}

const CountryAndButton = ({ country, handleCollapse, collapsed }) => {
  if (collapsed[country.props.country.name] !== false) {
    return (
      <div>
        {country}
        <CollapseButton country={country} handleCollapse={handleCollapse} show={true} />
      </div>
    )
  }
  else {
    const countryInfo = country.props.country
    return (
      <div>
        <CollapseButton country={country} handleCollapse={handleCollapse} show={false} />
        <CountryInfo countryName={countryInfo} />
      </div>
    )
  }
}

const CollapseButton = ({ country, handleCollapse, show }) => {
  return (
    <button onClick={() => handleCollapse(country)}>
      {show ? "show" : "hide"}
    </button>
  )
}

const CountryInfo = ({ countryName }) => {
  const country = countryName
  const languagesSpoken = country.languages.map(language => {
    return (
      <li key={language.name}>{language.name}</li>
    )
  })
  return (
    <div>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {languagesSpoken}
      </ul>
      <img alt="Country Flag" src={country.flag} width={181.5} height={108.9} ></img>
    </div>
  )
}

export default Countries