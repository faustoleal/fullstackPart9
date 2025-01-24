import { Diagnoses } from "./types/diagnoses";
import {
  Discharge,
  Entry,
  Gender,
  HealthCheckRating,
  NewEntry,
  NewPatientEntry,
  SickLeave,
} from "./types/patients";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === "number" || text instanceof Number;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing description");
  }

  return occupation;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error(`Incorrect or missing entries: ${entries}`);
  }

  entries.forEach((entry) => {
    if (!isEntry(entry)) {
      throw new Error("Invalid entry");
    }
  });

  return entries as Entry[];
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }

  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnoses["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnoses["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnoses["code"]>;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing criteria");
  }
  return criteria;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    !discharge ||
    typeof discharge !== "object" ||
    !("date" in discharge) ||
    !("criteria" in discharge)
  ) {
    throw new Error(`Incorrect or missing data`);
  }
  const newDischarge: Discharge = {
    date: parseDate(discharge.date),
    criteria: parseCriteria(discharge.criteria),
  };
  return newDischarge;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (
    !sickLeave ||
    typeof sickLeave !== "object" ||
    !("startDate" in sickLeave) ||
    !("endDate" in sickLeave)
  ) {
    throw new Error("Incorrect or missing slickSlave");
  }
  const newSickLeave: SickLeave = {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
  return newSickLeave;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => Number(v))
    .includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    !healthCheckRating ||
    !isNumber(healthCheckRating) ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error("Incorrect or missing healthCheckRating");
  }
  return healthCheckRating;
};

const isEntry = (entry: unknown): entry is Entry => {
  if (!entry || typeof entry !== "object" || !("type" in entry)) {
    throw new Error("Incorrect or misssing entry");
  }

  if (!("description" in entry && "specialist" in entry && "date" in entry)) {
    throw new Error("Incorrect or missing data");
  }

  return (
    entry.type === "Hospital" ||
    entry.type === "OccupationalHealthcare" ||
    entry.type === "HealthCheck"
  );
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "occupation" in object &&
    "ssn" in object &&
    "gender" in object &&
    "entries" in object
  ) {
    const newPatient: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };

    return newPatient;
  }
  throw new Error("Incorrect data: a field missing");
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object" || !("type" in object)) {
    throw new Error("Incorrect or missing data");
  }

  if (
    !("description" in object && "date" in object && "specialist" in object)
  ) {
    throw new Error("Incorrect or missing data");
  }

  switch (object.type) {
    case "Hospital":
      if ("discharge" in object) {
        const NewEntry: NewEntry = {
          type: object.type,
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object),
          discharge: parseDischarge(object.discharge),
        };

        return NewEntry;
      } else {
        throw new Error("Incorrect or missing data on Hospital");
      }
    case "OccupationalHealthcare": {
      if ("sickLeave" in object && "employerName" in object) {
        const newEntry: NewEntry = {
          type: object.type,
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          sickLeave: parseSickLeave(object.sickLeave),
          employerName: parseName(object.employerName),
          diagnosisCodes: parseDiagnosisCodes(object),
        };
        return newEntry;
      } else {
        throw new Error("Incorrect or missing on occupationalHealthcare");
      }
    }
    case "HealthCheck":
      if ("healthCheckRating" in object) {
        const newEntry: NewEntry = {
          type: object.type,
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object),
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
        return newEntry;
      } else {
        throw new Error("Incorrect or missing data on healthCheckRating");
      }
    default:
      throw new Error("Incorrect or missing entry type");
  }
};
