import { FormWrapperProps } from "../../utilities/type-aliases/order-form/FormWrapperProps"

export function FormWrapper({ title, children}: FormWrapperProps) {
    return <>
        <h2 
            className="text-2xl font-bold tracking-wider"
            style={{
                textAlign: "center",
                margin: 0,
                marginBottom: "2rem"
        }}>
            {title}
        </h2>
        <div style={{
            display: "grid",
            gap: "1rem .5rem",
            justifyContent: "flex-start",
            gridTemplateColumns: "auto minmax(auto, 400px)"
        }}>
            {children}
        </div>
    </>
}