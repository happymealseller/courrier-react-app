import { FormWrapper } from "./FormWrapper";

export function ShipToForm() {
    return (
        <FormWrapper title="Ship To">
            <label>Full Name or Company Name</label>
            <input autoFocus required type="text" />
            <label>Contact Name</label>
            <input autoFocus required type="text" />
            <label>Address</label>
            <input autoFocus required type="text" />
            <label>Recipient Email</label>
            <input autoFocus required type="email" />
            <label>Recipient Phone</label>
            <input autoFocus required type="number" />
        </FormWrapper>
    )
}