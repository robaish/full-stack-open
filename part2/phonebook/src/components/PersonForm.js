import React from "react";

const PersonForm = (props) => {
  return (
    <form className="form" onSubmit={props.addPerson}>
      <div className="form-item">
        <label for="name">Name:</label>
        <input value={props.nameValue} onChange={props.handleNameChange} />
      </div>
      <div className="form-item">
        <label for="name">Number:</label>
        <input value={props.numberValue} onChange={props.handleNumberChange} />
      </div>
      <div className="form-button">
        <button className="btn--primary" type="submit">Add</button>
      </div>
    </form>
  );
}

export default PersonForm;