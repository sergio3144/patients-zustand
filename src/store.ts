import { create } from "zustand";
import { DrafPatient, Patient } from "./types";
import { devtools, persist } from 'zustand/middleware'

type PatientState = {
  patients: Patient[]
  activeId: Patient['id']
  addPatient: (data: DrafPatient) => void
  deletePatient: (id: Patient['id']) => void
  getPatientById: (id: Patient['id']) => void
  updatePatient: (data: DrafPatient) => void
}

const createPatient = (patient: DrafPatient): Patient => {
  return {
    ...patient, id: window.crypto.randomUUID()
  }
}

export const usePatientStore = create<PatientState>()(devtools(persist((set) => ({
  patients: [],
  activeId: '',
  addPatient: (data) => {
    const newPatient = createPatient(data)
    set((state) => ({
      patients: [...state.patients, newPatient]
    }))
  },
  deletePatient: (id) => {
    set((state) => ({
      patients: state.patients.filter(patient => patient.id !== id)
    }))
  },
  getPatientById: (id) => {
    set(() => ({
      activeId: id
    }))
  },
  updatePatient: (data) => {
    set((state) => ({
      activeId: '',
      patients: state.patients.map(patient => patient.id === state.activeId ? { id: state.activeId, ...data } : patient),
    }))
  }
}),{
  name: 'patient-storage',
},)))