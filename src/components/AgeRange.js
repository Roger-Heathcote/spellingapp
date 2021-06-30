import React, {useState} from 'react';

//validating age - age should be above 0 and equal to or below 150
const isValidAge = age => {
	return age > 150 || age <= 0 ? false : true;
};

function AgeRange(props) {
	const [showWarning, setWarning] = useState(false);
	const [age, setAge] = useState(1);

	//bind state of age to current input and warn if out of range
	const handleOnChange = event => {
		setAge(event.target.value);
		setWarning(!isValidAge(event.target.value));
	};
	//when 'enter' key is pressed, validate age and pass to provided handler
	const keyHandler = event => {
		if (event.key === 'Enter' && isValidAge()) props.ageHandler(age);
	};

	//when submit button is clicked, validate age and pass to provided handler
	const submitAge = () => {
		if (isValidAge(age)) props.ageHandler(age);
	};

	return (
		<div>
			<label>Please enter your age: </label>
			<input
				type="number"
				name="age"
				id="age"
				min="1"
				max="150"
				onChange={event => handleOnChange(event)}
				onKeyDown={keyHandler}
				data-testid="age-input"
			/>
			<button onClick={() => submitAge()}>Start</button>
			<div className="warning">
				{showWarning ? 'Your age must be under 150 and above 0!' : ''}
			</div>
		</div>
	);
}

export default AgeRange;
