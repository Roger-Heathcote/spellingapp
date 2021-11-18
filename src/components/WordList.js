import React from 'react';
import SiteContext from '../SiteContext';
import styles from './WordList.module.css';

function WordList({listHandler, goBack}) {
	const [state] = React.useContext(SiteContext);

	const shortList = state.currentLists.filter(list => {
		return state.age >= list.minAge && state.age <= list.maxAge;
	});

	return (
		<>
			<button className="backButton" onClick={goBack}>
				Back
			</button>
			<br></br>
			<div className="defaultContentFrame">
				<span>Choose a word list...</span>
				<ul className={styles.wordList} aria-label="list of word lists">
					{shortList.map((list, index) => (
						<li key={index}>
							<button onClick={e => listHandler(list.id)}>{list.listName}</button>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default WordList;
