interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (h: number, w: number): string => {
  const bmiResult = w / Math.pow(h / 100, 2);
  let printText: string;

  if (bmiResult < 18.5)
    printText = 'Underweight (possible nutritional deficiency)';
  else if (bmiResult >= 18.5 && bmiResult <= 22.9)
    printText = 'Normal (healthy weight)';
  else if (bmiResult >= 23 && bmiResult <= 27.4)
    printText = 'Mild overweight (moderate risk of disease)';
  else printText = 'Very overweight to obese (high risk of disease)';

  return printText;
};

try {
  const { height, weight } = parseArguments(process.argv);
  // console.log(calculateBmi(height, weight))
  calculateBmi(height, weight);
} catch (error: unknown) {
  let errMsg = 'st bad happened.';
  if (error instanceof Error) {
    errMsg += ' Error ' + error.message;
  }
  console.log(errMsg);
}
