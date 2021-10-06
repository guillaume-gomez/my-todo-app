import React, { ReactElement } from "react";
import ReactDOM from 'react-dom'

function Application(): ReactElement {
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

