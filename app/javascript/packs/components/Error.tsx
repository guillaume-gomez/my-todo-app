import React, { ReactElement, useState, useEffect } from "react";

interface ErrorProps {
  message: string;
}

function Error({message} : ErrorProps ): ReactElement {
  return <div style={{color: 'red'}}>{message}</div>
}

export default Error;
