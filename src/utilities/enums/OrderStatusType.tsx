export enum OrderStatusType {
    OrderCreated = "ORDER_CREATED",
    Processing = "PROCESSING",
    PickedUp = "PICKED_UP",
    Sorting = "SORTING",
    ReadyForDelivery = "READY_FOR_DELIVERY",
    Delivering = "DELIVERING",
    Delivered = "DELIVERED",
    Cancelled = "CANCELLED",
    Other = "OTHER"
}

export namespace OrderStatusType {
    export function valueOf(inputStatus: string) {
        if (Object.values(OrderStatusType).some((status) => status === inputStatus)) {
            return inputStatus as OrderStatusType;
        } else {
            throw TypeError(`Casting error: \"${inputStatus}\" is not of type OrderStatusType`)
        }
    }
}