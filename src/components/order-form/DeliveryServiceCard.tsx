import { DeliveryServiceType } from "../../utilities/enums/DeliveryServiceType";
import "../../css/Card.css"

type DeliveryServiceCardData = {
    title: string,
    estimatedTimeArrival: string,
    deliveryCharge: string
}

type DeliveryServiceCardProps = DeliveryServiceCardData & {
    onSelect: (title: string) => void,
    selected: boolean
}

export function DeliveryServiceCard({ title, estimatedTimeArrival, deliveryCharge, onSelect, selected}: DeliveryServiceCardProps) {
    const handleClick = () => {
        onSelect(title.toLowerCase() === DeliveryServiceType.Normal ? DeliveryServiceType.Normal : DeliveryServiceType.Express);
    };
    return (
        <div 
            className={`card ${selected ? 'selected': ''} relative flex flex-col rounded-md h-60 w-60 bg-slate-200 p-4 hover:bg-slate-600 hover:text-white`}
            onClick={handleClick}
        >
            <span className={`hover-inherit text-xl font-semibold ${selected ? 'text-white' : 'text-slate-700'}`}>{title}</span>
            <span className={`hover-inherit ${selected ? 'text-white' : 'text-slate-500'}`}>{estimatedTimeArrival}</span>
            <span className={`hover-inherit ${selected ? 'text-white' : 'text-slate-500'}`}>by End of Day</span>
            <span className={`hover-inherit absolute bottom-0 left-0 p-4 ${selected ? 'text-white' : 'text-slate-700'}`}>${deliveryCharge}</span>
        </div>
    )
}