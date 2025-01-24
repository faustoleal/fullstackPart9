interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Values {
  period: number[];
  target: number;
}

const parseArguments = (args: string[]): Values => {
  if (args.length < 10) throw new Error("Not enough arguments");
  if (args.length > 10) throw new Error("Too many arguments");

  let days: number[] = [];

  if (
    !isNaN(Number(args[3])) &&
    !isNaN(Number(args[4])) &&
    !isNaN(Number(args[5])) &&
    !isNaN(Number(args[6])) &&
    !isNaN(Number(args[7])) &&
    !isNaN(Number(args[8])) &&
    !isNaN(Number(args[9]))
  ) {
    days = [
      Number(args[3]),
      Number(args[4]),
      Number(args[5]),
      Number(args[6]),
      Number(args[7]),
      Number(args[8]),
      Number(args[9]),
    ];
  } else {
    throw new Error("Provide values were not numbers");
  }

  if (!isNaN(Number(args[2])) && days.length === 7) {
    return {
      period: days,
      target: Number(args[2]),
    };
  } else {
    throw new Error("Provided values were wrong!");
  }
};

export const calculateExercises = (
  period: number[],
  target: number
): Result => {
  const periodLength = period.length;
  const trainingDays = period.filter((day) => day != 0).length;
  const average = period.reduce((a, b) => a + b) / 7;
  const success = average >= target ? true : false;
  let rating = 0;
  let ratingDescription = "";

  if ((average * 100) / target <= 50) {
    rating = 1;
    ratingDescription = "bad";
  } else if (
    (average * 100) / target >= 50 &&
    (average * 100) / target <= 100
  ) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "good";
  }

  const result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
  return result;
};

try {
  const { period, target } = parseArguments(process.argv);
  console.log(calculateExercises(period, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
