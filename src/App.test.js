import React from 'react';
import {render, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import TestFixture from './wordLists/TestFixture.js';

const initState = {
	currentLists: TestFixture,
	age: TestFixture[0].minAge,
	selectedListIndex: 0
};

// Fake timers using Jest
beforeEach(() => {
	jest.useFakeTimers();
});

afterEach(() => {
	jest.runOnlyPendingTimers();
	jest.useRealTimers();
});

describe('<App />', () => {
	it('Happy path journey from front page to 1st correct', async () => {
		const {getByText, getByTestId, getByRole, getAllByRole} = render(
			<App initStateOverride={initState} />
		);

		// First page / age selection
		userEvent.type(getByTestId('age-input'), '8');
		userEvent.click(getByRole('button'));

		// Click first item on list selection page
		expect(getByRole('button')).toBeInTheDocument();
		expect(getByRole('button')).toHaveTextContent('Back');
		const firstItem = getAllByRole('listitem')[0];
		userEvent.click(firstItem);

		// Get answer, wait for input enabled, enter answer, verify success
		const firstAnswerNode = getByTestId('word-display');
		const firstAnswer = firstAnswerNode.textContent;
		expect(getByRole('textbox')).toBeDisabled();
		act(() => {
			jest.advanceTimersByTime(5000);
		});
		expect(getByRole('textbox')).toBeEnabled();
		userEvent.type(getByRole('textbox'), firstAnswer);
		expect(getByText('Correct!')).toBeInTheDocument();

		act(() => {
			jest.advanceTimersByTime(3000);
		});
		const secondAnswerNode = getByTestId('word-display');
		const secondAnswer = secondAnswerNode.textContent;
		expect(getByRole('textbox')).toBeDisabled();
		act(() => {
			jest.advanceTimersByTime(5000);
		});
		expect(getByRole('textbox')).toBeEnabled();
		userEvent.type(getByRole('textbox'), secondAnswer);
		expect(getByText('Correct!')).toBeInTheDocument();

		act(() => {
			jest.advanceTimersByTime(5000);
		});

		// Return to list selection page
		const wordListList = getByRole('list', {name: 'list of word lists'});
		expect(wordListList).toBeInTheDocument();
	});
});
