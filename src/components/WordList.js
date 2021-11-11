import React from 'react';
import SiteContext from '../SiteContext';

function WordList({listHandler, goBack}) {
	const [state] = React.useContext(SiteContext);

	const shortList = state.currentLists.filter(list => {
		return state.age >= list.minAge && state.age <= list.maxAge;
	});

	return (
		<div>
			<button onClick={goBack}>Back</button>
			<h1>HELLO</h1>
			<ul aria-label="list of word lists">
				{shortList.map((list, index) => (
					<li key={index}>
						<button onClick={e => listHandler(list.id)}>{list.listName}</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default WordList;
