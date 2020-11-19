import React,{useState} from 'react';
import AgeRange from "./AgeRange"
import WordList from "./WordList"
import GamePlay from "./GamePlay"

function MainPage(){

	let [progress, updateProgress] = useState(0);
	console.log("PROGRESS IS:", progress);
	let [list, age] = useState(0);

	const handleAgeEntered = (theAge) => {
		age = theAge;
        // TODO validate age
        console.log("AGE:", age);
		updateProgress(progress+1);
	}

	const handleListSelected = (theList) => {
		list = theList;
        console.log("LIST:", list);
		updateProgress(progress+1);
	}

	return (
		(progress===0) ? <AgeRange ageHandler= {handleAgeEntered} /> :
			(progress===1) ? <WordList listHandler= {handleListSelected} /> :
			      <GamePlay></GamePlay>

    )
}

export default MainPage