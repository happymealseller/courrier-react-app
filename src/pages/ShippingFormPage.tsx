import { FormEvent, useState } from "react"
// import { ParcelInformationForm } from "../components/ParcelInformationForm"
import { ShipFromForm } from "../components/shipping-form-page/ShipFromForm"
import { ShipToForm } from "../components/shipping-form-page/ShipToForm"
import { useMultistepForm } from "../useMultistepForm"

type FormData = {
  fromCompanyName: string,
  fromAddress: string,
  fromContactName: string,
  fromEmail: string,
  fromPhone: string,
  toCompanyName: string,
  toAddress: string,
  toContactName: string,
  toEmail: string,
  toPhone: string
}

const INITIAL_DATA: FormData = {
  fromCompanyName: "",
  fromAddress: "",
  fromContactName: "",
  fromEmail: "",
  fromPhone: "",
  toCompanyName: "",
  toAddress: "",
  toContactName: "",
  toEmail: "",
  toPhone: ""
}

export function ShippingFormPage() {
    const [data, setData] = useState(INITIAL_DATA)

  function updateFields(fields: Partial<FormData>) {
    setData( prev => {
      return { ...prev, ...fields }
    })
  }

  const { currentStepIndex, isFirstStep, isLastStep, step, steps, next, back } = useMultistepForm([
    <ShipFromForm {...data} updateFields={updateFields} />,
    <ShipToForm {...data} updateFields={updateFields} />,
//    <ParcelInformationForm {...data} updateFields={updateFields} />,
    <div>Four</div>
  ])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isLastStep) return next()
    alert("make a POST request to parcels/{orderId} api")
  }

  return (
    <>
      <div style={{
        position: "relative",
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: "0.5rem",
        fontFamily: "Arial",
        maxWidth: "max-content"
      }}>
        <form onSubmit={onSubmit}>
          <div style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem"
          }}>
            {currentStepIndex + 1} / {steps.length}
          </div>
          {step}
          <div style={{
            marginTop: "1rem",
            display: "flex",
            gap: "0.5rem",
            justifyContent: "flex-end"
          }}>
            {!isFirstStep && (
              <button type="button" onClick={back} className="border-2 px-2 py-1 rounded-md hover:bg-violet-300 hover:text-gray-500 hover:border-violet-300">
                Back
              </button>
            )}
            <button type="submit" className="border-2 px-2 py-1 rounded-md hover:bg-violet-300 hover:text-gray-500 hover:border-violet-300">
              {isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}