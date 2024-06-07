export enum AuthenticationUrl {
    OPEN_AN_ACCOUNT = "/open-an-account",
    LOGIN = "/login",
    LOGOUT = "/logout"
}

export enum CustomerUrl {
    DASHBOARD = "/dashboard/customer",
    CREATE_A_SHIPMENT = "/create-a-shipment",
    NEW_ORDER_SUMMARY = "/dashboard/customer/new-order-summary",
    UPDATE_ORDER = "/update/customer",
    VIEW_ORDER = "/view/customer"
}

export enum CourierUrl {
    DASHBOARD = "/dashboard/courier",
    UPDATE_ORDER = "/update/courier",
    VIEW_ORDER = "/view/courier"
}

export enum PublicUrl {
    TRACK_A_PACKAGE = "/track-a-package",
    ORDER_STATUS = "/order-status"
}

// Check url again
export enum AdminUrl {
    DASHBOARD = "/dashboard/admin",
    REGISTER_COURIER = "regcourier"
}
