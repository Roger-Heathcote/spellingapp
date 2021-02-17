import React,{useState} from 'react';


function AgeRange(props){
  
  const [showWarning, setWarning] = useState(false);
	let [age] = useState(0);
  const handleOnChange = (event) => {
        age = event.target.value; 
  }
	const keyHandler = (event) => {
		if(event.key === "Enter" && validateAge()) props.ageHandler(age);
  }
  const validateAge = () => {
    if(age > 150){
      setWarning(true);
      setTimeout(() => setWarning(false), 2000);
      return false;
    }
    return true;
  }
  const submitAge = () => {
    if(validateAge()) props.ageHandler(age);
  }
	return (
        <div>
           
          <div className="warning">{(showWarning)?"Your age must be under 150!":""}</div>
			<label>Enter your age:</label>
			<input
				type="number"
				name="age"
        id="age"
        min="1"
        max="150"
				onChange={(event) => handleOnChange(event)}
				onKeyDown={keyHandler}
			/>
			<button onClick={()=>submitAge()}>Start</button>
		</div>
    )
}

export default AgeRange