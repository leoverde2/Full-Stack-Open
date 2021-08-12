import axios from "axios"
import React, { useEffect, useState } from "react"

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
    return <OneCountry country={country} />
  }
  else {
    const countries = countriesNames.map(country => {
      return (
        <ManyCountries
          key={country.props.country.name}
          collapsed={collapsed}
          country={country}
          handleCollapse={handleCollapse}
        />
      )
    })
    return (
      countries
    )
  }

}

const OneCountry = ({ country }) => {
  return (
    <div>
      <CountryInfo country={country} />
      <Weather country={country} />
    </div>
  )
}

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({request:{}, location:{}, current: {}})

  const access_key = process.env.REACT_APP_API_KEY
  const capital = country.capital
  const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${capital}`

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
      })
  }, )
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>Temperature: {weather.current.temperature} Celcius</div>
      <img alt="Weather" src={weather.current.weather_icons} width={60} height={60} ></img>
      <div>Wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
    </div>
  )
}

const ManyCountries = ({ country, handleCollapse, collapsed }) => {
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
        <CountryInfo country={countryInfo} />
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

const CountryInfo = ({ country }) => {
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