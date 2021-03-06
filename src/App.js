import React, {useReducer} from 'react';
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
	React.useReducer();
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
