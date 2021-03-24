import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

// Fake timers using Jest
beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

describe.skip("<App />", () => {
  it("Happy path journey from front page to 1st correct", async () => {
    const { getByText, getByTestId, getByRole, getAllByRole } = render(<App />);

    // First page / age selection
    userEvent.type(getByTestId('age-input'), '8')
    userEvent.click(getByRole('button'))
    
    // Click first item on list selection page
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByRole('button')).toHaveTextContent("Back")
    const firstItem = getAllByRole("listitem")[0]
    userEvent.click(firstItem)
    
    // Get answer, wait for input enabled, enter answer, verify success
    const answerNode = getByTestId("word-display")
    const answer = answerNode.textContent
    expect(getByRole('textbox')).toBeDisabled();
    jest.advanceTimersByTime(5000)
    expect(getByRole('textbox')).toBeEnabled();
    userEvent.type(getByRole('textbox'), answer)
    expect(getByText('Correct!')).toBeInTheDocument()
    
  });
});



