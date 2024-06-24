import { useState, ChangeEvent } from "react";
import { HandoffType } from "../../utilities/enums/HandoffType";
import { FormWrapper } from "./FormWrapper";
import { DeliveryServiceCardContainer } from "./DeliveryServiceCardContainer";
import { PaymentDataProps } from "../../utilities/type-aliases/order-form/PaymentData";

export function ShippingServiceForm({ price, updateFields }: PaymentDataProps) {

    const [selectedOption, setSelectedOption] = useState(HandoffType.DropOff);
    const handleDeliveryPrice = (deliveryPrice: number) => {
        //stripe price, no decimal, * 100
        updateFields({price: deliveryPrice * 100})
    }

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
                    <DeliveryServiceCardContainer 
                        handleDeliveryPrice={handleDeliveryPrice}/>
                </div>
            </div>
        </FormWrapper>
    )
}