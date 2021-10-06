import React, { ReactElement, useState, useEffect } from "react";
import axios from 'axios';
import { ObjectiveInterface } from "../interfaces";
import Button from "./Button";
import Error from "./Error";

interface ObjectiveProps {
  objective: ObjectiveInterface;
  onChangeTitle: (objective: ObjectiveInterface) => void;
  onDestroy:(objective: ObjectiveInterface) => void;
}

function Objective({objective, onChangeTitle, onDestroy} : ObjectiveProps ): ReactElement {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [networkError, setNetworkError] = useState<string|null>(null);
  
  function onBlur(event) {
    const editedObjective = { ...objective, title: event.target.value };
    onChangeTitle(editedObjective);
    setIsEditing(false);

    updateOnDatabase(editedObjective);
  }

  function updateOnDatabase(objectiveToSend: ObjectiveInterface) {
    if(!objectiveToSend.id) {
      // make a create API call
      axios.post(`/objectives.json`, objectiveToSend)
      .then((response) => {
        setNetworkError(null)
      })
      .catch(({message}) => {
        setNetworkError(message)
      });
    } else {
      // make an edit API call
      axios.patch(`/objectives/${objectiveToSend.id}.json?`, objectiveToSend)
      .then((response) => {
        setNetworkError(null)
      })
      .catch(({message}) => {
        setNetworkError(message)
      });
    }
  }

  function destroy() {
    onDestroy(objective);
    axios.delete(`/objectives/${objective.id}.json?`)
      .then((response) => {
        setNetworkError(null)
      })
      .catch(({message}) => {
        setNetworkError(message)
      });
  }

  return (
    <div style={{border: "1px solid black", padding: "6px", display:"flex", flexDirection: "column", gap: "6px"}}>
      {networkError ? <Error message={networkError} /> : null}
      <div style={{display: "flex", justifyContent:"space-between"}}>
        {isEditing ?
          <input type="text" defaultValue={objective.title} onBlur={onBlur}/> :
          <p>{objective.title}</p>
        }
        <Button label="edit" onClick={() => setIsEditing((oldState) => !oldState)}/>
      </div>
      <div style={{display: "flex", justifyContent: "flex-end"}}>
        <Button label="destroy" onClick={destroy} />
      </div>
    </div>
  )
}

export default Objective;
