import { useState, ChangeEvent } from "react";
import { HandoffType } from "../../utilities/enums/HandoffType";
import { FormWrapper } from "./FormWrapper";
import { DeliveryServiceCardContainer } from "./DeliveryServiceCardContainer";

export function ShippingServiceForm() {

    const [selectedOption, setSelectedOption] = useState(HandoffType.DropOff);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setSelectedOption(event.target.value === HandoffType.DropOff ? HandoffType.DropOff : HandoffType.PickUp);
    }

    return (
        <FormWrapper title="Shipping Service">
            <div>
                <div>
                    <h3 className="font-semibold">Do you need to schedule a collection?</h3>
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
                <br />
                <div>
                    <DeliveryServiceCardContainer />
                </div>
            </div>
        </FormWrapper>
    )
}