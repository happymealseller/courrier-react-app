import { ParcelInformationForm } from "./ParcelInformationForm"
import { ShipFromForm } from "./ShipFromForm"
import { ShipToForm } from "./ShipToForm"
import { useMultistepForm } from "./useMultistepForm"

function App() {
  const { currentStepIndex, isFirstStep, isLastStep, step, steps, next, back, goTo} = useMultistepForm([
    <ShipFromForm />,
    <ShipToForm />,
    <ParcelInformationForm />,
    <div>Four</div>
  ])
  return (
    <>
      <div style={{
        position: "relative",
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: "0.5rem",
        fontFamily: "Arial"
      }}>
        <form>
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
            <button type="button" onClick={next}>
              {isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default App
