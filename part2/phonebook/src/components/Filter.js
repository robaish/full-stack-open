import React from "react";

const Filter = (props) => {
  return (
    <div className="filter">
      <h2>Type name to filter</h2>
      <input onChange={props.filterByName} />
    </div>
  );

}

export default Filter;