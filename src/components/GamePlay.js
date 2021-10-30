import React, {useState, useEffect, useContext} from 'react';
import SiteContext from '../SiteContext';
function GamePlay({finished, goBack}) {
	function hideQuestion() {
		setInputDisabled(false);
		setDisplayWord(false);
	}

	const [displayWord, setDisplayWord] = useState(true);
	useEffect(() => {
		const timer = setTimeout(hideQuestion, 5000);
		return () => {
			clearTimeout(timer);
		};
	}, [displayWord]);

	const [state] = useContext(SiteContext);
	const [words, updateWords] = useState([
		...state.currentLists[state.selectedListIndex].listWords
	]);
	const [answer, updateAnswer] = useState('');
	const [displayCorrect, updateDisplayCorrect] = useState(false);
	const [inputDisabled, setInputDisabled] = useState(true);

	let [currentWord, updateCurrentWord] = useState();

	const nextWord = () => {
		updateCurrentWord(words[0]);
		updateWords(words.slice(1));
	};

	if (!currentWord) nextWord();

	const answerHandler = event => {
		updateAnswer(event.target.value);
		if (event.target.value === currentWord) {
			updateDisplayCorrect(true);
			setTimeout(() => {
				// Display "Correct" for 3s then reset.
				updateDisplayCorrect(false);
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
			<div data-testid="result">{displayCorrect ? 'Correct!' : ''}</div>
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
