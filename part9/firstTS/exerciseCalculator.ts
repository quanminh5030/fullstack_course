interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface argsValues {
  targetValue: number;
  dailyExHours: Array<number>;
}

const parseArguments2 = (args: Array<string>): argsValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2])) && !args.slice(3).some((a) => isNaN(Number(a)))) {
    return {
      targetValue: Number(args[2]),
      dailyExHours: args.slice(3).map((a) => Number(a)),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (
  dailyExHours: Array<number>,
  targetDailyHours: number
): Result => {
  if (dailyExHours.length <= 0)
    throw new Error('must provide at least 1 day exercises hours');
  if (targetDailyHours <= 0)
    throw new Error('target exercises hours must be more than or equal 1h');

  const trainingDays = dailyExHours.filter((d) => d !== 0);
  const averageExHours =
    dailyExHours.reduce((prev, cur) => prev + cur) / dailyExHours.length;
  const ratio = (averageExHours / targetDailyHours) * 100;
  let rating: number;
  let ratingDes: string;

  if (ratio < 70) {
    rating = 1;
    ratingDes = 'too bad, need to improve';
  } else if (ratio >= 70 && ratio < 97) {
    rating = 2;
    ratingDes = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDes = 'very good, keep doing!';
  }

  return {
    periodLength: dailyExHours.length,
    trainingDays: trainingDays.length,
    success: averageExHours > targetDailyHours,
    rating: rating,
    ratingDescription: ratingDes,
    target: targetDailyHours,
    average: averageExHours,
  };
};

try {
  const { targetValue, dailyExHours } = parseArguments2(process.argv);
  // console.log(calculateExercises(dailyExHours, targetValue));
  calculateExercises(dailyExHours, targetValue);
} catch (error: unknown) {
  let errorMsg = 'st bad happened.';
  if (error instanceof Error) {
    errorMsg += ' Error ' + error.message;
  }
  console.log(errorMsg);
}
