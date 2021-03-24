import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AgeRange from './AgeRange';

describe("<AgeRange />", () => {
  it("Checks there is an enabled input", async () => {
    const { getByRole } = render(<AgeRange />);
    expect(getByRole('spinbutton')).toBeEnabled();
  });
  
  it("Checks that warning is displayed and user cannot proceed if age is too low", async () => {
    const { getByText, getByTestId, getByRole } = render(<AgeRange />);
    userEvent.type(getByTestId('age-input'), '0')
    userEvent.click(getByRole('button'))
    expect(getByText(/your age must be/i)).toBeInTheDocument();

  });

  it("Checks that warning is displayed and user cannot proceed if age is too high", async () => {
    const { getByText, getByTestId, getByRole } = render(<AgeRange />);
    userEvent.type(getByTestId('age-input'), '151')
    userEvent.click(getByRole('button'))
    expect(getByText(/your age must be/i)).toBeInTheDocument();
  });

  // Should we also warn if non-numeric ?

  it("Checks that user can proceed if age is valid", async () => {
    const ageHandlerMock = jest.fn()
    const { queryByText, getByTestId, getByRole } = render(<AgeRange ageHandler={ageHandlerMock} />);
    userEvent.type(getByTestId('age-input'), '10')
    expect(queryByText(/your age must be/i)).toBeNull();
    userEvent.click(getByRole('button'))
    expect(ageHandlerMock).toHaveBeenCalledTimes(1);
  });

});