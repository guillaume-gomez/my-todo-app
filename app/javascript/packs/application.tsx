import React, { ReactElement, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

import Error from "./components/Error";
import Objective from "./components/Objective";
import Button from "./components/Button";

import { ObjectiveInterface } from "./interfaces";


function Application(): ReactElement {
  const [objectives, setObjectives] = useState<ObjectiveInterface[]>([]);
  const [networkError, setNetworkError] = useState<string|null>(null);
  useEffect(() => {
    axios.get(`/objectives.json`)
      .then((response) => {
        const { data } = response;
        setObjectives(data);
      })
      .catch(({message}) => {
        setNetworkError(message)
      });
  }, [setObjectives])

  function renderObjectives() {
    if(objectives.length === 0) {
      return (<div>No objectives yet :( </div>)
    }
    return (<ul style={{listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '12px'}}>
      {
        objectives.map((objective, index) =>
          <li key={index}>
            <Objective objective={objective} onDestroy={destroyObjective} onChange={editObjective(index)} />
          </li>
         )
      }
      </ul>
    );
  }

  function addObjective() {
    const newObjective = {id: undefined, title: null }
    setObjectives([...objectives, newObjective]);
  }

  function editObjective(position: number) {
    return (modifiedObjective: ObjectiveInterface) => {
      const updatedObjectives = objectives.map((objective, index) => {
        if(index === position) {
          return modifiedObjective;
        }
        return objective;
      })
      setObjectives(updatedObjectives);
    }
  }

  function destroyObjective(objectiveToDestroy) {
    const updatedObjectives = objectives.filter(objective => objective.id !== objectiveToDestroy.id );
    setObjectives(updatedObjectives);
  }


  return (
    <div>
      <h1>My Todo App</h1>
      <Button label={"+ Add obj."} onClick={addObjective} />
      {
        networkError ? <Error message={networkError} /> : null
      }
      {renderObjectives()}
    </div>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Application />,
    document.body.appendChild(document.createElement('div')),
  )
})

