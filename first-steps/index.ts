import express from "express";
import { calculatorBMI } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (req.query.weight === undefined || req.query.height === undefined) {
    res.send({ error: "malformatted parameters" });
  } else if (isNaN(weight) || isNaN(Number(height))) {
    res.send({ error: "Provide values were not numbers" });
  } else {
    const response = {
      weight,
      height,
      bmi: calculatorBMI(height, weight),
    };
    res.send(response);
  }
});

app.post("/excercise", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (target === undefined || daily_exercises === undefined) {
    res.send({ error: "parameters missing" });
  }

  if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
    res.send("malformatted parameters");
  } else if (daily_exercises.length !== 7) {
    res.send("daily_excercise length have to be 7");
  } else if (daily_exercises.every((d) => !isNaN(Number(d)))) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);
    res.send(result);
  } else {
    res.send({ error: "provide values were not numbers" });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
