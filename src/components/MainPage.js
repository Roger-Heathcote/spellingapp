import React,{useState, useContext} from 'react';
import AgeRange from "./AgeRange"
import WordList from "./WordList"
import GamePlay from "./GamePlay"
import SiteContext from "../SiteContext";
function MainPage(){

	const [state, dispatch] = useContext(SiteContext);
	let [progress, updateProgress] = useState(0);
	console.log("PROGRESS IS:", progress);
	let [list] = useState(0);

	const handleAgeEntered = (age) => {
		// TODO validate age
		dispatch({
			type:"Update Age",
			age,
		});

    console.log("AGE:", age);
		updateProgress(progress+1);
	}

	const handleListSelected = (listIndex) => {
		dispatch({
			type:"Update List Index",
			listIndex
		})
		updateProgress(progress+1);
	}

	return (
		(progress===0) ? <AgeRange ageHandler= {handleAgeEntered} /> :
			(progress===1) ? <WordList listHandler= {handleListSelected} /> :
			      <GamePlay></GamePlay>

    )
}

export default MainPage