import React, { ReactElement, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

import { Objectives } from "./interfaces";


function Application(): ReactElement {
  const [objectives, setObjectives] = useState<Objectives[]>([]);
  useEffect(() => {
    axios.get(`/objectives.json`)
      .then((response) => {
        const { data } = response;
        setObjectives(data);
      })
      .catch((error) => {
        // TODO display error
      });
  }, [setObjectives])

  return (
    <div>
      My Todo App
    </div>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Application />,
    document.body.appendChild(document.createElement('div')),
  )
})

