interface bmiValues {
  height: number;
  weight: number;
}

const parseBmiArgs = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments - you need to give exactly 2.");
  if (args.length > 4) throw new Error("Too many arguments - you need to give exactly 2.");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error("Provided values must be numbers.");
  }
}

const calculateBmi = (height: number, weight: number) => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  if (bmi < 18.5) {
    console.log('Underweight');
  } else if (bmi < 25) {
    console.log('Normal (healthy weight)');
  } else if (bmi < 30) {
    console.log('Overweight');
  } else {
    console.log('Obese');
  }
}

try {
 const { height, weight } = parseBmiArgs(process.argv);
 calculateBmi(height, weight); 
} catch (error) {
  let errorMessage = 'There\'s been an error.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
