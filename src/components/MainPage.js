import React, {useState, useContext} from 'react';
import AgeRange from './AgeRange';
import WordList from './WordList';
import GamePlay from './GamePlay';
import SiteContext from '../SiteContext';
import PageFrame from './PageFrame';
function MainPage() {
	const [, dispatch] = useContext(SiteContext);
	let [progress, updateProgress] = useState(0);

	const handleAgeEntered = age => {
		// TODO validate age
		dispatch({
			type: 'Update Age',
			age
		});
		updateProgress(progress + 1);
	};

	const handleListSelected = listId => {
		dispatch({
			type: 'Update List Id',
			listId
		});
		updateProgress(progress + 1);
	};

	const finished = () => {
		updateProgress(1);
	};

	const goBack = () => {
		updateProgress(progress - 1);
	};
	const content =
		progress === 0 ? (
			<AgeRange ageHandler={handleAgeEntered} />
		) : progress === 1 ? (
			<WordList listHandler={handleListSelected} goBack={goBack} />
		) : (
			<GamePlay finished={finished} goBack={goBack}></GamePlay>
		);
	return (
		<PageFrame
			header={<h1>Spelling App!</h1>}
			body={content}
			footer={<h2>Footer.</h2>}
		></PageFrame>
	);
}

export default MainPage;
