import React from "react";

const Filter = (props) => {
  return (
    <div>
      Type name to filter: <input onChange={props.filterByName} />
    </div>
  );

}

export default Filter;