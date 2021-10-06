import React, { ReactElement, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

import Error from "./components/Error";

import { Objectives } from "./interfaces";


function Application(): ReactElement {
  const [objectives, setObjectives] = useState<Objectives[]>([]);
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

  return (
    <div>
      <h1>My Todo App</h1>
      {
        networkError ? <Error message={networkError} /> : null
      }
    </div>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Application />,
    document.body.appendChild(document.createElement('div')),
  )
})
