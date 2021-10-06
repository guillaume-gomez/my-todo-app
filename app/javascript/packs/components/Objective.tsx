import React, { ReactElement, useState, useEffect } from "react";
import axios from 'axios';
import { ObjectiveInterface, KeyResultInterface } from "../interfaces";
import Button from "./Button";
import Error from "./Error";

interface ObjectiveProps {
  objective: ObjectiveInterface;
  onChange: (objective: ObjectiveInterface) => void;
  onDestroy:(objective: ObjectiveInterface) => void;
}

function Objective({objective, onChange, onDestroy} : ObjectiveProps ): ReactElement {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [networkError, setNetworkError] = useState<string|null>(null);
  

  function onBlurTitle(event) {
    const editedObjective = { ...objective, title: event.target.value };
    onChange(editedObjective);
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

  function onBlurKeyResult(position: number) {
    return (event) => {
      const editedKeyResults = objective.key_results.map((keyResult, index) => {
        if(position === index) {
          return {...keyResult, title: event.target.value }
        }
        return keyResult;
      });
      onChange({...objective, key_results: editedKeyResults});
      setIsEditing(false);
    }
  }

  function destroyKeyResult(position: number) {
    return (event) => {
      const editedKeyResults = objective.key_results.filter((_keyResult, index) => index !== position);
      onChange({...objective, key_results: editedKeyResults});
    }
  }

  function addKeyResult() {
    setIsEditing(true);
    const newKeyResult = { objective_id: objective.id, id: undefined, title: null }
    const editedObjective = { ...objective, key_results: [...objective.key_results, newKeyResult ]};
    onChange(editedObjective);
  }

  return (
    <div style={{ backgroundColor: isEditing ? "#EEEEEE" : "white", border: "1px solid black", padding: "6px", display:"flex", flexDirection: "column", gap: "6px"}}>
      {networkError ? <Error message={networkError} /> : null}
      <div style={{display: "flex", justifyContent:"space-between", gap: "12px"}}>
        {isEditing ?
          <input type="text" style={{width: "100%"}} defaultValue={objective.title} onBlur={onBlurTitle}/> :
          <p>{objective.title}</p>
        }
        <Button label="edit" onClick={() => setIsEditing((oldState) => !oldState)}/>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px"}}>
      {
        objective.key_results.map((keyResult, index) => (
          isEditing ?
          <div style={{ paddingLeft: "24px", display: "flex", justifyContent:"space-between", gap: "12px"}}>
            <input style={{width: "100%"}} key={index} type="text" defaultValue={keyResult.title} onBlur={onBlurKeyResult(index)}/>
            <Button label="destroy KR" onClick={destroyKeyResult(index)}/>
          </div>
          :
          <span key={index} >{keyResult.title}</span>
        ))
      }
      </div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <Button label="+ add KR" onClick={addKeyResult} />
        <Button label="destroy" onClick={destroy} />
      </div>
    </div>
  )
}

export default Objective;
