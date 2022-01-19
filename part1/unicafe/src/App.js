import React, { useState } from 'react'
import Buttons from './components/Buttons'
import Statistics from './components/Statistics'
import Title from './components/Title'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveFeedback = category => {
    if (category === 'good') return setGood(good + 1);
    if (category === 'neutral') return setNeutral(neutral + 1);
    if (category === 'bad') return setBad(bad + 1);
  }

  return (
    <div>
      <Title title='give feedback' />
      <Buttons
        options={['good', 'neutral', 'bad']}
        giveFeedback={giveFeedback}
      />

      <Title title='statistics' />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad} 
        all={good + neutral + bad}
      />
    </div>
  )
}

export default App