export enum AuthenticationEndpoint {
    REGISTER = "/register",
    LOGIN = "/login"
}

export enum CustomerEndpoint {
    NEW_ORDER = "/orders/create-order",
    UPDATE_ORDER = "/customer/{orderId}",
    TRACK_ORDER = "/track/{orderId}",
    COMPLETE_PAYMENT = "/orders/payment"
}

export enum CourierEndpoint {
    TRIPS = "/courier/trips"
}