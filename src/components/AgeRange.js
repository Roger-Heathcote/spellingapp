import React,{useState} from 'react';


function AgeRange(props){
  
  const [showWarning, setWarning] = useState(false);
  let age = 0;
  const handleOnChange = (event) => {
    age = event.target.value;
    if(!isValidAge())
      setWarning(true);
    else
      setWarning(false);
    // console.log(age)
  }
  const keyHandler = (event) => {
    // console.log('key',age);
    if(event.key === "Enter" && isValidAge())
      props.ageHandler(age)
  }
  const isValidAge = () => {
    return (age > 150 || age <= 0)? false: true;
  }
  const submitAge = () => { 
    if(isValidAge())
       props.ageHandler(age);
      
  }
  return (
    <div>
      <div className="warning">{(showWarning)?"Your age must be under 150 and above 0!":""}</div>
      <label>Enter your age:</label>
      <input
        type="number"
        name="age"
        id="age"
        min="1"
        max="150"
        onChange={(event) => handleOnChange(event)}
        onKeyDown={keyHandler}
        data-testid="age-input"
      />
      <button onClick={()=>submitAge()}>Start</button>
    </div>
    )
}

export default AgeRange