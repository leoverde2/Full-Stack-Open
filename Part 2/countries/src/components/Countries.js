import React from "react"

const Countries = ({ countriesToShow }) => {
  const countriesNames = countriesToShow().map(country =>
    <Country key={country.name} country={country} />
  )
  return <Display countriesNames={countriesNames} />
}

const Country = ({ country }) => {
  return (
    <div>
      {country.name}
    </div>
  )
}

const Display = ({ countriesNames }) => {
  if (countriesNames.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  else if (countriesNames.length === 1) {
    const country = countriesNames[0].props.country
    const languagesSpoken = country.languages.map(language => {
      return (
        <li key={language.name}>{language.name}</li>
      )
    })
    return <div>
      <h1>{countriesNames}</h1>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {languagesSpoken}
      </ul>
      <img alt="Country Flag" src={country.flag} width={181.5} height={108.9} ></img>
    </div>
  }
  else {
    return countriesNames
  }
}

export default Countries