import { useState, ChangeEvent } from "react";
import { HandoffType } from "../../utilities/enums/HandoffType";
import { FormWrapper } from "./FormWrapper";
import { DeliveryServiceCard } from "./DeliveryServiceCard";

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
                    <h3 className="font-semibold">When would you like it delivered?</h3>
                    <div className="flex flex-row gap-4 m-2">
                        <DeliveryServiceCard title="Normal" estimatedTimeArrival="Wednesday 01/05" deliveryCharge="20.00"/>
                        <DeliveryServiceCard title="Express" estimatedTimeArrival="Thursday 25/04" deliveryCharge="50.00" />
                    </div>
                </div>
            </div>
        </FormWrapper>
    )
}