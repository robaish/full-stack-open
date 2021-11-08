import React from "react";

const PersonForm = (props) => {
  return (
    <form className="form" onSubmit={props.addPerson}>
      <div className="form-item">
        Name: <input value={props.nameValue} onChange={props.handleNameChange} />
      </div>
      <div className="form-item">
        Number: <input value={props.numberValue} onChange={props.handleNumberChange} />
      </div>
      <div className="form-button">
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

export default PersonForm;