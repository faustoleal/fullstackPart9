import express from "express";

import patientsService from "../services/patientsService";
import { toNewEntry, toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getPatients());
});

router.get("/:id", (req, res) => {
  const patientId = req.params.id;
  res.send(patientsService.getPatient(patientId));
});

router.post("/", (req, res) => {
  try {
    const NewPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientsService.addPatient(NewPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const NewEntry = toNewEntry(req.body);
    const addedEntry = patientsService.addEntry(req.params.id, NewEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
