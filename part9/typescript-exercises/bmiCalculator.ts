export interface bmiValues {
  height: number;
  weight: number;
}

export const calculateBmi = (height: number, weight: number) => {
  const heightInMeters = height / 100;
  const bmi = weight / Math.pow(heightInMeters, 2);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

/*
Used for command line calculator:

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

const calculateFromCommandLine = () => {
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
}
*/