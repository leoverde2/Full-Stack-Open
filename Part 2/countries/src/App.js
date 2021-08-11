import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [collapsed, setCollapsed] = useState({})

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

  const handleCollapse = (country) => {
    const name = country.props.country.name
    const collapsedCopy = {...collapsed}
    if (collapsedCopy[name] === false) {
      collapsedCopy[name] = true
    }
    else {
      collapsedCopy[name] = false
    }
    setCollapsed(collapsedCopy)
  }

  return (
    <div>
      <Filter
        filter={filter}
        handleFilterChange={(event) => setFilter(event.target.value)}
      />
      <Countries countriesToShow={countriesToShow} handleCollapse={handleCollapse} collapsed={collapsed} />
    </div>
  )
}

export default App;
