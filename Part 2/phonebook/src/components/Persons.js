import React from "react"

const Persons = ({ personToShow }) => {
  return (
    personToShow().map(person => 
      <Person key={person.name} person={person} />
    )
  )
}

const Person = ({ person }) => {
  return (
    <div key={person.name}>
      {person.name} {person.number}
    </div>
  )
}

export default Persons