import React,{useState} from 'react';


function AgeRange(props){
	
	let [age] = useState(0);
    const handleOnChange = (event) => {
        age = event.target.value;
    }
	const keyHandler = (event) => {
		if(event.key === "Enter") props.ageHandler(age);
	}
	return (
        <div> 
			<label>Enter your age:</label>
			<input
				type="text"
				name="age"
				id="age"
				onChange={(event) => handleOnChange(event)}
				onKeyDown={keyHandler}
			/>
			<button onClick={(event)=>{
				console.log("I fired!")
				props.ageHandler(age)}
			}>Start</button>
		</div>
    )
}

export default AgeRange