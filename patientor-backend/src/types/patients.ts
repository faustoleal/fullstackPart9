import { Diagnoses } from "./diagnoses";

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatients = Omit<Patient, "ssn">;
export type SensitivePatients = Omit<Patient, "ssn" | "entries">;

export type NewPatientEntry = Omit<Patient, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnoses["code"]>;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export interface Discharge {
  date: string;
  criteria: string;
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
export type NewEntry = UnionOmit<Entry, "id">;
