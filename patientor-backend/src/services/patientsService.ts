import patientsData from "../data/patients";
import { v1 as uuid } from "uuid";

import {
  Entry,
  NewEntry,
  NewPatientEntry,
  NonSensitivePatients,
  Patient,
} from "../types/patients";

const patients: NonSensitivePatients[] = patientsData.map(
  ({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries,
  })
);

const getPatients = (): NonSensitivePatients[] => {
  return patients;
};

const getPatient = (patientId: string): NonSensitivePatients | undefined => {
  return patients.find((patient) => patient.id === patientId);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const newId = String(uuid());
  const newEntry = {
    id: newId,
    ...entry,
  };

  const patient = patients.find((p) => p.id === patientId);
  if (patient !== undefined) {
    patient.entries.push(newEntry);
  } else {
    throw new Error("missing patient");
  }
  return newEntry;
};

export default {
  getPatients,
  addPatient,
  getPatient,
  addEntry,
};
