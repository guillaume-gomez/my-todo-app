import React, { ReactElement, useState, useEffect } from "react";
import { ObjectiveInterface } from "./interfaces";

interface ObjectiveProps {
  objective: ObjectiveInterface;
}

function Objective({objective} : ObjectiveProps ): ReactElement {
  return (
    <div style={{border: "1px solid black", padding: "6px"}}>
      <div style={{display: "flex", alignItems:"space-between"}}>
        <p>{objective.title}</p>
      </div>
    </div>
  )
}

export default Objective;
