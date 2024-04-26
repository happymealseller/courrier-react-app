import { FormWrapper } from "./FormWrapper";

export function ShipFromForm() {
    return (
        <FormWrapper title="Ship From">
            <label>Full Name or Company Name</label>
            <input autoFocus required type="text" />
            <label>Contact Name</label>
            <input autoFocus required type="text" />
            <label>Address</label>
            <input autoFocus required type="text" />
            <label>Email</label>
            <input autoFocus required type="email" />
            <label>Phone</label>
            <input autoFocus required type="contact" />
        </FormWrapper>
    )
    
}