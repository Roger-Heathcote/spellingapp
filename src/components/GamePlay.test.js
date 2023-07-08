import React from 'react';
import {render, act, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SiteContext from '../SiteContext';
import GamePlay from './GamePlay.js';

const initialState = {
	currentLists: [{listWords: ['one']}],
	age: 5,
	selectedListIndex: 0
};
beforeEach(() => {
	jest.useFakeTimers();
});
afterEach(() => {
	jest.runOnlyPendingTimers();
	jest.useRealTimers();
});
const dispatch = jest.fn();
const finished = jest.fn();
const goBack = jest.fn();
const state = JSON.parse(JSON.stringify(initialState));
describe('<Gameplay />', () => {
	/** Testing  UI: Elements of the component */
	it('Initial check: Making sure Back button, Remind me button, input field disabled, first word of the list displayed', async () => {
		const {getByRole, getByTestId} = render(
			<SiteContext.Provider value={[state, dispatch]}>
				<GamePlay />
			</SiteContext.Provider>
		);
		expect(getByRole('button', {name: 'Back'})).toBeInTheDocument();
		expect(getByRole('button', {name: 'Remind me'})).toBeInTheDocument();
		expect(getByTestId('word-display')).not.toBeEmptyDOMElement();
		expect(getByRole('textbox')).toBeDisabled();
	});

	/** Testing  UI: Click on the back button */
	it('Click on "back" button and check the function goBack() is invoked', async () => {
		const {getByRole} = render(
			<SiteContext.Provider value={[state, dispatch]}>
				<GamePlay goBack={goBack} />
			</SiteContext.Provider>
		);
		userEvent.click(getByRole('button', {name: 'Back'}));
		expect(goBack).toHaveBeenCalledTimes(1);
	});

	/** Testing functionality: Type the correct word in the text input */
	it('Type the first word correctly and the word "Correct!" should be displayed', async () => {
		const {getByRole, getByTestId, getByText, queryByText} = render(
			<SiteContext.Provider value={[state, dispatch]}>
				<GamePlay finished={finished} />
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
		await waitFor(() => {
			expect(queryByText('Now type that!')).toBeNull();
		});
		await waitFor(() => {
			expect(getByText('Correct!')).toBeInTheDocument();
		});
		act(() => {
			jest.advanceTimersByTime(3000);
		});
	});

	/** Testing functionality: input field gets focus when enabled */
	it('When word is hidden and input enabled it should have focus', async () => {
		const {getByTestId} = render(
			<SiteContext.Provider value={[state, dispatch]}>
				<GamePlay />
			</SiteContext.Provider>
		);
		act(() => {
			jest.advanceTimersByTime(5000);
		});
		expect(getByTestId('answer')).toBeEnabled();
		await waitFor(() => {
			expect(getByTestId('answer')).toHaveFocus();
		});
	});

	/** Testing functionality: input field gets focus when enabled */
	it('After clicking Remind me button, the input enabled it should have focus', async () => {
		const {getByRole, getByTestId} = render(
			<SiteContext.Provider value={[state, dispatch]}>
				<GamePlay finished={finished} />
			</SiteContext.Provider>
		);
		act(() => {
			jest.advanceTimersByTime(5000);
		});
		userEvent.click(getByRole('button', {name: 'Remind me'}));
		act(() => {
			jest.advanceTimersByTime(3000);
		});
		await waitFor(() => {
			expect(getByTestId('answer')).toHaveFocus();
		});
	});

	/** Testing functionality: Type all the words correct in the input */
	it('Type all the words correctly and check the function finished() is invoked', async () => {
		const {getByRole, getByTestId, getByText} = render(
			<SiteContext.Provider value={[state, dispatch]}>
				<GamePlay finished={finished} />
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
		act(() => {
			jest.advanceTimersByTime(3000);
		});
		expect(finished).toHaveBeenCalledTimes(1);
	});

	/** Testing functionality: Type the wrong word */
	it('Type the first word wrongly and the word "Correct!" should not be displayed', async () => {
		const {getByRole, getByTestId} = render(
			<SiteContext.Provider value={[state, dispatch]}>
				<GamePlay />
			</SiteContext.Provider>
		);
		act(() => {
			jest.advanceTimersByTime(5000);
		});
		expect(getByRole('textbox')).toBeEnabled();
		userEvent.type(getByRole('textbox'), 'wrong text');
		expect(getByTestId('result').textContent).toBe('');
	});

	/** Testing functionality: Reminder button */
	it('Type the first word wrongly and click on "Remind me" button, the textbox should be disabled and the current word in the list must be displayed.', async () => {
		const {getByRole, getByTestId} = render(
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
		userEvent.click(getByRole('button', {name: 'Remind me'}));
		await waitFor(() => expect(getByTestId('word-display').textContent).toBe(firstWord));
		await waitFor(() => expect(getByRole('textbox')).toBeDisabled);
		act(() => {
			jest.advanceTimersByTime(5000);
		});
	});
});
