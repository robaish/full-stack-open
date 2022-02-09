interface ExerciseTracker {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exerciseHours: number[], target: number): ExerciseTracker => {
  const average = exerciseHours.reduce((acc, prev) => acc + prev) / exerciseHours.length;
  const targetDiff = target - average;
  const numberRating = (targetDiff > 0.25) ? 1 : (targetDiff >= 0) ? 2 : 3;
  const ratings: { [key: string]: any } = {
    1: 'Don\'t beat yourself up, rest is important.',
    2: 'Well done.',
    3: 'Boom, you really crushed it this week!'
  }
  
  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter(h => h !== 0).length,
    success: average >= target,
    rating: numberRating,
    ratingDescription: ratings[numberRating],
    target: target,
    average: average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));