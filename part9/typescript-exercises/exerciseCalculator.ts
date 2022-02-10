interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseParams {
  exerciseHours: number[];
  target: number;
}

const parseArgs = (args: string[]): ExerciseParams => {
  if (args.length === 2) throw new Error("Daily target and exercise hours missing.");
  if (args.length === 3) throw new Error("Exercise hours missing.");
  
  const [ , , target, ...exerciseHours ] = args;
  const allInputsAreNumbers = exerciseHours.every(input => !isNaN(Number(input)));
  
  if (!isNaN(Number(target)) && allInputsAreNumbers) {
    const numberArr = exerciseHours.map(input => Number(input));
    return {
      exerciseHours: numberArr,
      target: Number(target)
    }
  } else {
    throw new Error("All input values must be numbers.");
  }
}

const calculateExercises = (exerciseHours: number[], target: number) => {
  const average = exerciseHours.reduce((acc, prev) => acc + prev) / exerciseHours.length;
  const targetDiff = target - average;
  const numberRating = (targetDiff > 0.25) ? 1 : (targetDiff >= 0) ? 2 : 3;
  const ratings: { [key: string]: any } = {
    1: 'Don\'t beat yourself up, rest is important.',
    2: 'Well done.',
    3: 'Boom, you really crushed it!'
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

try {
  const { exerciseHours, target } = parseArgs(process.argv);
  console.log(calculateExercises(exerciseHours, target));
} catch (error) {
  let errorMessage = 'There\'s been an error.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}