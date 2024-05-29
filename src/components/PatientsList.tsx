
import { usePatientStore } from "../store"
import { PatientDetails } from "./PatientDetails"

const PatientsList = () => {
  const { patients } = usePatientStore()
  console.log(patients)

  return (
    <>
      <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">
        { patients.length ? (
            <>
              <p className="font-black text-3xl text-center">Listado de Pacientes</p>
              <p className="text-xl mt-5 mb-10 text-center">
                Administra tus {''}
                <span className="text-indigo-600 font-bold">Pacientes y citas</span>
              </p>
              {
                patients.map(patient => (
                  <PatientDetails
                    key={ patient.id }
                    patient={ patient }
                  />
                ))
              }
            </>
          ) : (
            <>
              <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
              <p className="text-xl mt-5 mb-10 text-center">
                Comienza agregando pacientes {''}
                <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span>
              </p>
            </>
          ) 
        }
      </div>
    </>
  )
}

export { PatientsList }
