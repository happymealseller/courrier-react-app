import { FormEvent, useState } from "react"
import { ParcelInformationForm } from "../components/ParcelInformationForm"
import { ShipFromForm } from "../components/ShipFromForm"
import { ShipToForm } from "../components/ShipToForm"
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

  const { currentStepIndex, isFirstStep, isLastStep, step, steps, next, back, goTo} = useMultistepForm([
    <ShipFromForm {...data} updateFields={updateFields} />,
    <ShipToForm {...data} updateFields={updateFields} />,
    <ParcelInformationForm {...data} updateFields={updateFields} />,
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
              <button type="button" onClick={back}>
                Back
              </button>
            )}
            <button type="submit">
              {isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}