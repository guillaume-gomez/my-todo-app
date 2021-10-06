import React, { ReactElement, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

import Error from "./components/Error";
import Objective from "./components/Objective";

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
        objectives.map(objective =>
          <li key={objective.id}>
            <Objective objective={objective} />
          </li>
         )
      }
      </ul>
    );
  }

  return (
    <div>
      <h1>My Todo App</h1>
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

