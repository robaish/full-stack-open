import React from "react";

const PersonList = (props) => {
  return (
    <ul className="contact-list">
      {props.filteredPersons.map(person => 
      <li className="contact-list-item" key={person.id}>
        {`${person.name} ${person.number} `}
        <button value={person.id} onClick={props.removePerson}>Delete</button>
      </li>
      )}
    </ul>
  );
}

export default PersonList;