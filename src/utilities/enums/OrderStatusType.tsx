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

const statusConversionRecord: Record<string, OrderStatusType> = {
    [OrderStatusType.OrderCreated.toString()]: OrderStatusType.OrderCreated,
    [OrderStatusType.Processing.toString()]: OrderStatusType.Processing,
    [OrderStatusType.PickedUp.toString()]: OrderStatusType.PickedUp,
    [OrderStatusType.Sorting.toString()]: OrderStatusType.Sorting,
    [OrderStatusType.ReadyForDelivery.toString()]: OrderStatusType.ReadyForDelivery,
    [OrderStatusType.Delivering.toString()]: OrderStatusType.Delivering,
    [OrderStatusType.Delivered.toString()]: OrderStatusType.Delivered,
    [OrderStatusType.Cancelled.toString()]: OrderStatusType.Cancelled,
    [OrderStatusType.Other.toString()]: OrderStatusType.Other
};

export const statusDescriptionRecord: Record<OrderStatusType, string> = {
    [OrderStatusType.OrderCreated]: "Order created",
    [OrderStatusType.Processing]: "Ready for pick up",
    [OrderStatusType.PickedUp]: "Order picked up",
    [OrderStatusType.Sorting]: "Soring order",
    [OrderStatusType.ReadyForDelivery]: "Ready for delivery",
    [OrderStatusType.Delivering]: "Delivering order",
    [OrderStatusType.Delivered]: "Order delivered",
    [OrderStatusType.Cancelled]: "Order cancelled",
    [OrderStatusType.Other]: ""
}

/** Converts string input to OrderStatusType if string corresponds to a valid OrderStatusType 
Otherwise, returns a default OrderStatusType of Other.*/
export namespace OrderStatusType {
    export function valueOf(inputStatus: string) {
        if (Object.values(OrderStatusType).some((status) => status === inputStatus)) {
            return inputStatus as OrderStatusType;
        } else {
            throw TypeError(`Casting error: \"${inputStatus}\" cannot be converted to type OrderStatusType`);
        }
    }
}