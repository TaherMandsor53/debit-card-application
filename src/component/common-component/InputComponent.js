import React from 'react';

export default function InputComponent({ inputVal, classLabel, inputName, onInputChange, errorMsg, inputLabel, type }) {
  const onHandleChange = event => {
    onInputChange(event);
  };
  return (
    <div className="input-main">
      <input
        value={inputVal}
        name={inputName}
        placeholder={inputLabel}
        onChange={onHandleChange}
        className={errorMsg ? `input-comp ${classLabel} error` : `input-comp ${classLabel}`}
        type={type}
      />
      {errorMsg && <div className="input-error">{errorMsg}</div>}
    </div>
  );
}
