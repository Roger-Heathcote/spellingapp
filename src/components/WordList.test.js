import React from 'react';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TestFixture from "../wordLists/TestFixture.js"
import SiteContext from "../SiteContext";
import WordList from './WordList';

const initialState = {
  currentLists: TestFixture,
  age: TestFixture[0].minAge,
  selectedListIndex: 0
}

describe("<WordList />", () => {
  it("Checks proper handlers called when user clicks", () => {
    const listSelectedCallback = jest.fn()
    const backClickedCallback = jest.fn()
    const state = JSON.parse(JSON.stringify(initialState))
    const dispatch = jest.fn
    const { getByRole, getAllByRole } = render(
    <SiteContext.Provider value={[state, dispatch]}>
      <WordList
        listHandler={listSelectedCallback}
        goBack={backClickedCallback}
      />
    </SiteContext.Provider>
  );
  const wordListList = getByRole('list', {name: "list of word lists"})
  const firstItem = within(wordListList).getAllByRole("listitem")[0]
  userEvent.click(firstItem)
  expect(listSelectedCallback).toHaveBeenCalledTimes(1)
  userEvent.click(getByRole('button', { name: "Back" }))
  expect(backClickedCallback).toHaveBeenCalledTimes(1)

  });

});