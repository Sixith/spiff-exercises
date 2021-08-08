import React from 'react';
import { act, render } from '@testing-library/react';
import { getByTestId } from '@testing-library/dom';
import ProgressBar from './ProgressBar';

describe('visible tests',() => {
  let progressBar;

  beforeEach(() => {
    jest.useFakeTimers();
    render(<ProgressBar hidden={false}/>);
    progressBar = getByTestId(document.documentElement, 'progress-bar');
  });
  
  afterEach(() => {
    act(() => {
      jest.runAllTimers();
    });
    jest.useRealTimers();
  });
  
  it('should render and be visible', () => {
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle("width: 0%");
    expect(progressBar).toBeVisible();
  });

  //TODO: Test component functions
});

it('should respect hidden state', () => {
  render(<ProgressBar hidden={true}/>);
  let progressBar = getByTestId(document.documentElement, 'progress-bar');

  expect(progressBar).toBeInTheDocument();
  expect(progressBar).toHaveStyle("width: 0%");
  expect(progressBar).not.toBeVisible();
});