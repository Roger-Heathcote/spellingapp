import React, {useState, useEffect, useContext, useRef} from 'react';
import SiteContext from '../SiteContext';
import styles from './GamePlay.module.css';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

function GamePlay({finished, goBack}) {
	const inputRef = useRef(null);
	function hideQuestion() {
		setInputDisabled(false);
		setDisplayWord(false);
		inputRef.current.focus();
	}
	const [keyboardInstance, setKeyboardInstance] = useState();
	const [altDisplay, setAltDisplay] = useState('Now type that!');
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

	const answerHandler = input => {
		let userInput = input.target ? input.target.value : input;
		keyboardInstance.setInput(userInput);
		updateAnswer(userInput);
		if (userInput === currentWord) {
			setAltDisplay('');
			updateDisplayCorrect(true);
			setTimeout(() => {
				// Display "Correct" for 3s then reset.
				setAltDisplay('Now type that!');
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
	const handleOnInitKeyboard = keyboard => {
		setKeyboardInstance(keyboard);
	};
	return (
		<>
			<button className="backButton" onClick={goBack}>
				Back
			</button>
			<button className={styles.reminderButton} onClick={() => remindHandler()}>
				Remind me
			</button>
			<div className={styles.contentFrame}>
				<div className={styles.output}>
					<div data-testid="word-display">{displayWord ? currentWord : altDisplay}</div>
					<div data-testid="result">{displayCorrect ? 'Correct!' : ''}</div>
				</div>
				<input
					className={styles.input}
					type="text"
					data-testid="answer"
					onChange={event => answerHandler(event)}
					disabled={inputDisabled}
					value={answer}
					name="answer"
					ref={inputRef}
				></input>
				<Keyboard
					onChange={event => answerHandler(event)}
					theme={'hg-theme-default keyboard'}
					layout={{
						default: [
							'q w e r t y u i o p',
							'a s d f g h j k l',
							'z x c v b n m',
							'{bksp}'
						]
					}}
					inputName="keyboard"
					onInit={keyboard => handleOnInitKeyboard(keyboard)}
				/>
			</div>
		</>
	);
}

export default GamePlay;
