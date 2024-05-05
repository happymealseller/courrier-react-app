import { useState, ChangeEvent } from "react";
import { HandoffType } from "../../utilities/enums/HandoffType";
import { FormWrapper } from "./FormWrapper";

export function ShippingServiceForm() {

    const [selectedOption, setSelectedOption] = useState(HandoffType.DropOff);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setSelectedOption(event.target.value === "dropoff" ? HandoffType.DropOff : HandoffType.PickUp);
    }

    return (
        <FormWrapper title="Shipping Service">
            <div>
                <label>
                    <input type="radio" value={HandoffType.DropOff} checked={ selectedOption === HandoffType.DropOff } onChange={handleChange} />
                    <span className="px-2">I'll drop off my shipment.</span>
                </label>
                <br />
                <label>
                    <input type="radio" value={HandoffType.PickUp} checked={ selectedOption === HandoffType.PickUp } onChange={handleChange} />
                    <span className="px-2">Schedule a new collection.</span>
                </label>
                <br />
            </div>
        </FormWrapper>
    )
}