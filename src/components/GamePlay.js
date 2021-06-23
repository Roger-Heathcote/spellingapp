import React, {useState, useEffect, useContext} from 'react';
import SiteContext from '../SiteContext';
function GamePlay({finished, goBack}) {
	function hideQuestion() {
		// console.log("I have hidden the word and enabled the text box")
		setInputDisabled(false);
		setDisplayWord(false);
	}

	const [displayWord, setDisplayWord] = useState(true);
	useEffect(() => {
		// console.log("Running useEffect")
		setTimeout(hideQuestion, 5000);
	}, [displayWord]);

	const [state] = useContext(SiteContext);

	// console.log("CURR LISTS:", state.currentLists)
	// console.log("INDEX:", state.selectedListIndex)

	const [words, updateWords] = useState([
		...state.currentLists[state.selectedListIndex].listWords
	]);
	const [answer, updateAnswer] = useState('');
	const [displayCorrect, updateDisplayCorrect] = useState(false);
	const [inputDisabled, setInputDisabled] = useState(true);

	let [currentWord, updateCurrentWord] = useState();

	const nextWord = () => {
		// console.log(`Next word will be ${words[0]}`)
		updateCurrentWord(words[0]);
		updateWords(words.slice(1));
	};

	if (!currentWord) nextWord();

	const answerHandler = event => {
		updateAnswer(event.target.value);
		// console.log("Checking answer", event.target.value)
		if (event.target.value === currentWord) {
			// console.log("Checking answer")
			updateDisplayCorrect(true);
			setTimeout(() => {
				// Display "Correct" for 3s then reset.
				updateDisplayCorrect(false);
				// console.log("words length: ", words.length);
				if (words.length === 0) {
					finished();
					return;
				}
				nextWord();
				setDisplayWord(true);
				setInputDisabled(true);
				updateAnswer('');
			}, 3000);
		}
	};

	const remindHandler = () => {
		setDisplayWord(true);
		setInputDisabled(true);
		setTimeout(hideQuestion, 5000);
	};

	return (
		<>
			<button onClick={goBack}>Back</button>
			<div data-testid="word-display">{displayWord ? currentWord : 'Now type that!'}</div>
			<div id="result">{displayCorrect ? 'Correct!' : ''}</div>
			<input
				type="text"
				id="answer"
				onChange={event => answerHandler(event)}
				disabled={inputDisabled}
				value={answer}
			></input>
			<button onClick={() => remindHandler()}>Remind me</button>
		</>
	);
}

export default GamePlay;
