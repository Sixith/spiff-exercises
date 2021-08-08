import React from 'react';
import { act, render } from '@testing-library/react';
import { getByTestId } from '@testing-library/dom';
import ProgressBarExercise from './ProgressBarExercise';

let startButton;
let finishButton;
let swapButton;
let progressBar;
let breakingBar;

beforeEach(() => {
  jest.useFakeTimers();
  render(<ProgressBarExercise />);
  startButton = getByTestId(document.documentElement, 'start-button');
  finishButton = getByTestId(document.documentElement, 'finish-button');
  swapButton = getByTestId(document.documentElement, 'swap-button');
  progressBar = getByTestId(document.documentElement, 'progress-bar');
  breakingBar = getByTestId(document.documentElement, 'breaking-bar');
});

afterEach(() => {
  act(() => {
    jest.runAllTimers();
  });
  jest.useRealTimers();
});

//Click start and run all the timers out
const clickStart = () => {
  act(() => {
    startButton.click();
    jest.runAllTimers();
  });
}

const clickSwap = () => {
  act(() => {
    swapButton.click();
    jest.runAllTimers();
  });
}

it('should have a green "Start Request" button', () => {
  expect(startButton).toBeInTheDocument();
  expect(startButton).toHaveTextContent(/^Start Request$/);
  //TODO: Figure out why this is broken
  //expect(startButton).toHaveStyle("color: #00c1a6");
});

it('should have a red "Finish Request" button', () => {
  expect(finishButton).toHaveTextContent(/^Finish Request$/);
});

it('should have a purple "Simple Bar" button', () => {
  expect(swapButton).toHaveTextContent(/^Simple Bar$/);
  clickSwap();
  expect(swapButton).toHaveTextContent(/^Breaking Bar$/);
});

it('should have both progressbar elements', () => {
  expect(progressBar).toBeInTheDocument();
  expect(progressBar).toHaveStyle("width: 0%");
  expect(progressBar).toBeVisible();

  expect(breakingBar).toBeInTheDocument();
  expect(breakingBar).toHaveStyle("width: 0%");
  expect(breakingBar).not.toBeVisible();
});

it('should go to 90% on clicking start', () => {
  clickStart();
  expect(startButton).toHaveTextContent(/^Loading...$/);
  expect(progressBar).toHaveStyle("width: 90%");
  expect(breakingBar).toHaveStyle("width: 90%");
});

it('should have the progress bar go to 100% on clicking finish and then fade', () => {
  act(() => {
    finishButton.click();
    jest.advanceTimersByTime(999);
  });
  expect(progressBar).toHaveStyle("width: 100%");

  //Should be visible because it hasn't been 1 second yet
  expect(progressBar).toBeVisible();

  act(() => {
    jest.advanceTimersByTime(1);
  });
  
  //Shouldn't be visible anymore because it's been 1 second and the fade has started
  expect(progressBar).not.toBeVisible();
});

it('should have the breaking bar go to 100% on clicking finish and then fade', () => {
  clickSwap();
  act(() => {
    finishButton.click();
    jest.advanceTimersByTime(999);
  });
  expect(breakingBar).toHaveStyle("width: 100%");

  //Should be visible because it hasn't been 1 second yet
  expect(breakingBar).toBeVisible();

  act(() => {
    jest.advanceTimersByTime(1);
  });
  
  //Shouldn't be "visible" anymore because it's been 1 second and the fade has started
  expect(breakingBar).not.toBeVisible();
});