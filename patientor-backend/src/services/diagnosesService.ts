import diagnosesData from "../data/diagnoses";

import { Diagnoses } from "../types/diagnoses";

const diagnoses: Diagnoses[] = diagnosesData;

const getDiagnoses = (): Diagnoses[] => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose,
};
