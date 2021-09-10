import React from 'react';
import {render, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TestFixture from '../wordLists/TestFixture.js';
import SiteContext from '../SiteContext';
import GamePlay from './GamePlay.js';

const initialState = {
	currentLists: TestFixture,
	age: TestFixture[0].minAge,
	selectedListIndex: 0
};
beforeEach(() => {
	jest.useFakeTimers();
});
afterEach(() => {
	jest.runOnlyPendingTimers();
	jest.useRealTimers();
});
{/* <GamePlay finished={finished} goBack={goBack}></GamePlay> */}
describe('<Gameplay />', () => {
	it('Initial check: Making sure Back button, Remind me button, input field disabled, first word of the list displayed', async() => {
		const state = JSON.parse(JSON.stringify(initialState));
		const dispatch = jest.fn();
		const {getByRole, getByTestId} = render(
			<SiteContext.Provider value={[state, dispatch]}>
				<GamePlay />
			</SiteContext.Provider>
		);
		
		expect(getByRole('button',{name: "Back"})).toBeInTheDocument();
		expect(getByRole('button',{name: "Remind me"})).toBeInTheDocument();
		expect(getByTestId('word-display')).not.toBeEmptyDOMElement();
		expect(getByRole('textbox')).toBeDisabled();
		
	});

	/** Testing first positive scenario: Type the correct word in the text input */
	it('Type the first word correctly and the word "Correct!" should be displayed', async() => {
		const state = JSON.parse(JSON.stringify(initialState));
		const dispatch = jest.fn();
		const {getByRole, getByTestId, getByText} = render(
			<SiteContext.Provider value={[state, dispatch]}>
				<GamePlay />
			</SiteContext.Provider>
		);
		const firstWordElement = getByTestId('word-display');
		const firstWord = firstWordElement.textContent;
		act(() => {
			jest.advanceTimersByTime(5000);
		});
		
		expect(getByRole('textbox')).toBeEnabled();
		expect(getByText('Now type that!')).toBeInTheDocument();
		userEvent.type(getByRole('textbox'), firstWord);
		expect(getByText('Correct!')).toBeInTheDocument();
	});

	it('Type the first word wrongly and the word "Correct!" should not be displayed', async() => {
		const state = JSON.parse(JSON.stringify(initialState));
		const dispatch = jest.fn();
		const {getByRole, queryByText} = render(
			<SiteContext.Provider value={[state, dispatch]}>
				<GamePlay />
			</SiteContext.Provider>
		);
		act(() => {
			jest.advanceTimersByTime(5000);
		});
		expect(getByRole('textbox')).toBeEnabled();
		userEvent.type(getByRole('textbox'), "wrong text");
		expect(queryByText('Correct!')).toBeNull();
	});
});
