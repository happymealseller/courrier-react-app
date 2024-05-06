import { useState } from "react";
import { DeliveryServiceCard } from "./DeliveryServiceCard";
import { DeliveryServiceType } from "../../utilities/enums/DeliveryServiceType";

export function DeliveryServiceCardContainer() {
    const [selectedCard, setSelectedCard] = useState(DeliveryServiceType.Normal);

    const handleCardSelect = (title: string) => {
        setSelectedCard(title === DeliveryServiceType.Normal ? DeliveryServiceType.Normal : DeliveryServiceType.Express);
    };

    const cardsData = [
        { title: "Normal", estimatedTimeArrival: "Wednesday 01/05", deliveryCharge: "20.00"},
        { title: "Express", estimatedTimeArrival: "Thursday 25/04", deliveryCharge: "50.00"}
    ];

    return (
        <div>
            <h3 className="font-semibold">When would you like it delivered?</h3>
            <div className="card-container flex flex-row gap-4 m-2">
                {cardsData.map((card, index) => (
                    <DeliveryServiceCard
                        key={index}
                        title={card.title}
                        estimatedTimeArrival={card.estimatedTimeArrival}
                        deliveryCharge={card.deliveryCharge}
                        onSelect={handleCardSelect}
                        selected={selectedCard === card.title.toLowerCase()}
                    />
                ))}
            </div>
        </div>
    );
}