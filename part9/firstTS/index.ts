import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!Number(height) || !Number(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  res.json({
    weight,
    height,
    bmi: calculateBmi(Number(height), Number(weight)),
  });
});

app.post('/exercises', (req, res) => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || daily_exercises.length === 0 || !target) {
    res.status(400).json({ error: 'parameters missing' });
  } else if (
    isNaN(Number(target)) ||
    daily_exercises.some((d: any) => isNaN(Number(d)))
  ) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(daily_exercises, target);
  res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server runnning at port ${PORT}`);
});
