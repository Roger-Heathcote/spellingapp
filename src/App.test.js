import React from 'react';
import {render, act, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import TestFixture from './wordLists/TestFixture.js';

// See first big comment below...
const initState = {
	currentLists: TestFixture,
	age: TestFixture[0].minAge,
	selectedListIndex: 0
};

// Set up fake javascript clock at the start of the test.
beforeEach(() => {
	jest.useFakeTimers();
});

// Replace fake clock with the real one after the test(s) finish.
afterEach(() => {
	jest.runOnlyPendingTimers();
	jest.useRealTimers();
});

describe('<App />', () => {
	/*
		We start out by initiating our main app component. We don't want to give it the same wordlist data as our app though, as that is liable to change. Instead we create a "test fixture", which won't change, containing just enough data for our test - in our case a list of just two words/questions.

		The file is here: ./wordLists/TestFixture.js

		We use that to create an initialState (initState) that we then pass into App as the prop "initStateOverride". I had to modify the useReducer line in App so it uses this prop if it exists, otherwise it uses the initState that already exists in App as usual.

		Note that the render function we are importing from RTL returns an object. We get all the test methods we need (getByText, getByTestId etc) by destructuring them from this object. It's pretty weird API for sure but it works!
	*/
	it('Happy path journey from front page to 1st correct', async () => {
		const {getByText, getByTestId, getByRole, getAllByRole} = render(
			<App initStateOverride={initState} />
		);

		/*
			userEvent is what lets you simulate typing and clicking etc.
			
			In userEvent.type() our first parameter selects the  element with the ID age-input'. The second parameter specifies what to type into it.

			userEvent.click() clicks the first button it sees on the page. If you can use getByRole that is preferable to other ways of selecting as it ignores implementation details such as whether your button is actually a <button> element or a <div> with the aria-role of button.
		*/
		userEvent.type(getByTestId('age-input'), '8');
		userEvent.click(getByRole('button'));

		/*
			All being well, that should move us from the age selection page to the wordlist selection page.

			First we check we have a button on the page, and that it says "back". Next we ask for an array of all the list items. Note we ask for everything with the role of 'listitem' and return the first, we don't explicitly ask for every <li>.

			We then extract the button it contains and click it.
		*/
		expect(getByRole('button', {name: 'Back'})).toBeInTheDocument();
		const firstItem = getAllByRole('listitem')[0];
		const listButton = within(firstItem).getByRole('button');
		userEvent.click(listButton);

		/*
			So now we are on the gameplay page. I gave the <div> that displays the words the name "word-display" using the data-testid attribute. Best practice is to select elements by their roles and/or labels and text content but this element currently has none of that so testid attributes it is for now! .textContent grabs the word from the <div>
		*/
		const firstAnswerNode = getByTestId('word-display');
		const firstAnswer = firstAnswerNode.textContent;

		// Our input textbox should be disabled at this point
		expect(getByRole('textbox')).toBeDisabled();

		/*
			Act is used when you have state that changes outside of react e.g. the state of the javascript clock. Any state changes that React can't see need to be wrapped in this act function. Here we fast forward the clock by 5 seconds so our tests don't have to wait for our setTimeouts to finish.
		*/
		act(() => {
			jest.advanceTimersByTime(5000);
		});

		// Now the input textbox should be enabled
		expect(getByRole('textbox')).toBeEnabled();

		// We type in the answer and check it responds with "Correct"
		userEvent.type(getByRole('textbox'), firstAnswer);
		expect(getByText('Correct!')).toBeInTheDocument();

		// Fast forward 3s for the "Correct" message to go away
		act(() => {
			jest.advanceTimersByTime(3000);
		});

		// Repeat the above process for the second answer
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

		/*
			By now we should be back at the word list selection page.
			
			We can verify that by asking for a list with the name "list of word lists". It will find that list because I gave the <ul> in WordList.js an aria-label with that name. This is better than using data-testid as aria-labels are good for accessibility.
		*/
		const wordListList = getByRole('list', {name: 'list of word lists'});
		expect(wordListList).toBeInTheDocument();
	});
});
