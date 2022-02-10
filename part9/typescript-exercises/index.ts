import express = require('express');
const app = express();
app.use(express.json());
import { bmiValues, calculateBmi } from './bmiCalculator';

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

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

