import React from "react";

const PersonList = (props) => {
  return (
    <ul className="contact-list">
      <h2>All contacts</h2>
      {props.filteredPersons.map(person => 
      <li className="contact-list-item" key={person.id}>
        {`${person.name} — ${person.number} `}
        <button className="btn--secondary" value={person.id} onClick={props.removePerson}>Delete</button>
      </li>
      )}
    </ul>
  );
}

export default PersonList;