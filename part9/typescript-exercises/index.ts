import express = require('express');
const app = express();
app.use(express.json());
import { bmiValues, calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight }: bmiValues = {
    height: Number(req.query.height),
    weight: Number(req.query.weight)
  };

  if (!height || !weight) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
  res.json({ weight, height, bmi: calculateBmi(height, weight)});
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const inputExercises : any = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const inputTarget : any = req.body.target;

  if (!inputExercises || !inputTarget) {
    res.status(400).send({ error: 'parameters missing' });
  } else if (!Array.isArray(inputExercises) || isNaN(Number(inputTarget))) {
    res.status(400).send({ error: 'malformatted parameters' });
  } else if (!inputExercises.every((input: any) => !isNaN(Number(input)))) { // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    res.status(400).send({ error: 'malformatted parameters' });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(inputExercises, inputTarget);
    res.json(result);
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

