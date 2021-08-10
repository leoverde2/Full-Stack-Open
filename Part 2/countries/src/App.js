import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = () => {
    const filterLowercased = filter.toLowerCase() //Ignore case
    return (
      countries.filter(country => {
        const countryLowerCased = country.name.toLowerCase() //Ignore case
        return (
          countryLowerCased.includes(filterLowercased)
        )
      })
    )
  }

  return (
    <div>
      <Filter
        filter={filter}
        handleFilterChange={(event) => setFilter(event.target.value)}
      />
      <Countries countriesToShow={countriesToShow} />
    </div>
  )
}

export default App;
