import React from "react"

const Persons = ({ personToShow, deletePerson }) => {
  return (
    personToShow().map(person =>
      <Person key={person.name} person={person} deletePerson={deletePerson} />
    )
  )
}

const Person = ({ person, deletePerson }) => {
  return (
    <div key={person.name}>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person)}>
        Delete
      </button>
    </div>
  )
}

export default Persons