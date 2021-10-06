import React, { ReactElement, useState, useEffect } from "react";
import { ObjectiveInterface } from "../interfaces";
import Button from "./Button";

interface ObjectiveProps {
  objective: ObjectiveInterface;
  onChangeTitle: (objective: ObjectiveInterface) => void;
}

function Objective({objective, onChangeTitle} : ObjectiveProps ): ReactElement {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  function onBlur(event) {
    onChangeTitle({ ...objective, title: event.target.value });
    setIsEditing(false);
  }

  return (
    <div style={{border: "1px solid black", padding: "6px"}}>
      <div style={{display: "flex", justifyContent:"space-between"}}>
        {isEditing ?
          <input type="text" defaultValue={objective.title} onBlur={onBlur}/> :
          <p>{objective.title}</p>
        }
        <Button label="edit" onClick={() => setIsEditing((oldState) => !oldState)}/>
      </div>
    </div>
  )
}

export default Objective;
