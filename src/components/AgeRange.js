import React, { useState, useEffect } from 'react';

function AgeRange(props) {
  const [showWarning, setWarning] = useState(false);
  const [age, setAge] = useState(1);
  /*
  useEffect is used to check the value of age whenever there is a change in value of age.
  if age < 0 or age > 150
    setWarning(true)
  else
    setWarning(false)
  */
  useEffect(() => {
    if (!isValidAge())
      setWarning(true);
    else
      setWarning(false);
  }, [age])
  //set the entered value to age during onChange event
  const handleOnChange = (event) => {
    setAge(event.target.value);
  }
  //when 'enter' key is pressed, validate the age in the input box
  const keyHandler = (event) => {
    if (event.key === "Enter" && isValidAge())
      props.ageHandler(age)
  }
  //validating age - age should be above 0 and equal to or below 150
  const isValidAge = () => {
    return (age > 150 || age <= 0) ? false : true;
  }
  //when submit button is clicked, validate the age and pass to ageHandler function
  const submitAge = () => {
    if (isValidAge())
      props.ageHandler(age);
  }
  return (
    <div>
      <div className="warning">{(showWarning) ? "Your age must be under 150 and above 0!" : ""}</div>
      <label>Enter your age:</label>
      <input
        type="number"
        name="age"
        id="age"
        min="1"
        max="150"
        onKeyDown={keyHandler}
        onChange={(event) => handleOnChange(event)}
      />
      <button onClick={() => submitAge()}>Start</button>
    </div>
  )
}

export default AgeRange
