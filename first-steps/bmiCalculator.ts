interface MultiplyValues {
  height: number;
  weight: number;
}

const bmiArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error("Provided values were not numbers!");
  } else {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  }
};

export const calculatorBMI = (height: number, weight: number) => {
  const bmi = weight / (height / 100) ** 2;

  if (bmi <= 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal (helthy weight)";
  } else if (bmi >= 25 && bmi <= 24.9) {
    return "Overweight (Pre-obese)";
  } else {
    return "Obese";
  }
};

try {
  const { height, weight } = bmiArguments(process.argv);
  console.log(calculatorBMI(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
