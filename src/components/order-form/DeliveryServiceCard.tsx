type DeliveryServiceCardData = {
    title: string,
    estimatedTimeArrival: string,
    deliveryCharge: string
}

export function DeliveryServiceCard({ title, estimatedTimeArrival, deliveryCharge}: DeliveryServiceCardData) {
    return (
        <>
            <div className="relative flex flex-col border-2 rounded-md h-60 w-60 bg-slate-200 border-slate-200 p-4">
                <span className="text-xl font-semibold">{title}</span>
                <span className="text-slate-500">{estimatedTimeArrival}</span>
                <span className="text-slate-500">by End of Day</span>
                <span className="absolute bottom-0 left-0 p-4 text-slate-800">${deliveryCharge}</span>
            </div>
        </>
    )
}