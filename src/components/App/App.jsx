import { useReducer } from 'react';

import Section from '../Section';
import Feedback from '../Feedback';
import Statistics from '../Statistics';
import Notification from '../Notification';

import AppContainer from './App.styled';

function reducer(prevState, action) {
  return {
    ...prevState,
    [action.type]: prevState[action.type] + action.payload,
  };
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const addFeedback = stat => dispatch({ type: stat, payload: 1 });

  const countTotalFeedback = () => {
    return Object.values(state).reduce((total, value) => {
      return (total += value);
    });
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = state;
    return countTotalFeedback() === 0
      ? 0
      : ((good * 100) / countTotalFeedback()).toFixed(1);
  };

  return (
    <AppContainer>
      <Section title="Please leave Feedback">
        <Feedback stats={Object.keys(state)} addFeedback={addFeedback} />
      </Section>

      <Section title="Statistics">
        {countTotalFeedback() ? (
          <Statistics
            stats={Object.entries(state)}
            countTotalFeedback={countTotalFeedback}
            countPositiveFeedbackPercentage={countPositiveFeedbackPercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </AppContainer>
  );
};

export default App;
