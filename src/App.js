import React, {useReducer, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import UKEnglish from './wordLists/UKEnglish.js';
import SiteContext from './SiteContext.js';
import Reducer from './Reducer';

const initState = {
	age: 0,
	currentLists: UKEnglish,
	selectedListIndex: 0
};

function App({initStateOverride}) {
	const [state, dispatch] = useReducer(Reducer, initStateOverride || initState);

	const [screenHeight, setScreenHeight] = useState(window.innerHeight);

	// Make app full screen on desktop and mobile
	useEffect(() => {
		const root = document.getElementById('root');
		if (root) root.style.height = `${screenHeight}px`;
		const resizeHandler = () => {
			setScreenHeight(window.innerHeight);
		};
		window.addEventListener('resize', resizeHandler);
		return () => window.removeEventListener('resize', resizeHandler);
	}, [screenHeight]);

	return (
		<SiteContext.Provider value={[state, dispatch]}>
			<Router>
				<Switch>
					<Route path="/" component={MainPage} />
				</Switch>
			</Router>
		</SiteContext.Provider>
	);
}

export default App;
