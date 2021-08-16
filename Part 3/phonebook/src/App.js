import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Form from './components/Form'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const repeated = persons.filter(currentPerson => currentPerson.name === newName)
    if (repeated.length === 1) {
      if (window.confirm(`${repeated[0].name} is already added to phonebook, replace the old number with a new one?`)) {
        const changedNumber = { ...repeated[0], number: newNumber }
        personService
          .replace(repeated[0].id, changedNumber)
          .then(returnedPerson => {
            setNotificationMessage({ content: `Changed ${returnedPerson.name} number`, type: "success" })
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          })
          .catch(error => {
            setNotificationMessage({ content: `Information of ${newName} has already been deleted from the server `, type: "error" })
            setPersons(persons.filter(person => person.name !== newName))
          })
        setNewName("")
        setNewNumber("")
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setNotificationMessage({ content: `Added ${returnedPerson.name}`, type: "success" })
          setPersons(persons.concat(returnedPerson))
        })
        .catch(error => {
          setNotificationMessage({ content: `Input is in wrong format`, type: "error" })
          setPersons(persons.filter(person => person.name !== newName))
        })
      setNewName("")
      setNewNumber("")
    }
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .deleteObject(person.id)
        .then(() => {
          setPersons(persons.filter(object => object.id !== person.id))
        })
    }
  }

  const personToShow = () => {
    const filterLowercased = newFilter.toLowerCase()
    const filtered = persons.filter(person => {
      const personLowercased = person.name.toLowerCase()
      return (
        personLowercased.includes(filterLowercased)
      )
    })
    return filtered
  }

  const setState = (stateFunction) => (event => stateFunction(event.target.value))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter
        newFilter={newFilter}
        handleFilterChange={setState(setNewFilter)}
      />
      <h2>Add a new</h2>
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNameChange={setState(setNewName)}
        newNumber={newNumber}
        handleNumberChange={setState(setNewNumber)}
      />
      <h2>Numbers</h2>
      <Persons
        personToShow={personToShow}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App