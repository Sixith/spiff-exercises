import React from 'react';
import { act, render } from '@testing-library/react';
import { getByTestId } from '@testing-library/dom';
import BreakingBar from './BreakingBar';

describe('visible tests',() => {
  let breakingBar;

  beforeEach(() => {
    jest.useFakeTimers();
    render(<BreakingBar hidden={false}/>);
    breakingBar = getByTestId(document.documentElement, 'breaking-bar');
  });
  
  afterEach(() => {
    act(() => {
      jest.runAllTimers();
    });
    jest.useRealTimers();
  });
  
  it('should render and be visible', () => {
    expect(breakingBar).toBeInTheDocument();
    expect(breakingBar).toHaveStyle("width: 0%");
    expect(breakingBar).toBeVisible();
  });

  //TODO: Test component functions
});

it('should respect hidden state', () => {
  render(<BreakingBar hidden={true}/>);
  let breakingBar = getByTestId(document.documentElement, 'breaking-bar');

  expect(breakingBar).toBeInTheDocument();
  expect(breakingBar).toHaveStyle("width: 0%");
  expect(breakingBar).not.toBeVisible();
});