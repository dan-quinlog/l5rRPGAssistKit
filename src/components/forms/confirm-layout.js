import React from 'react';

export default function ConfirmLayout(props) {
  return(
    <div>
      {props.alertText}
      <button onClick={props.confirm}>Confirm</button><button onClick={props.deny}>Deny</button>
    </div>
  );
}