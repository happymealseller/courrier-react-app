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
    VIEW_ORDER = "/view/customer",
    CHECKOUT = "/checkout/customer"
}

export enum CourierUrl {
    DASHBOARD = "/dashboard/courier",
    UPDATE_ORDER = "/update/courier",
    VIEW_ORDER = "/view/courier"
}

export enum PublicUrl {
    TRACK_A_PACKAGE = "/track-a-package",
    ORDER_STATUS = "/order-status",
    ABOUT = "/about-us",
    CONTACT = "/contact-us"
}


export enum AdminUrl {
    DASHBOARD = "/dashboard/admin",
    ASSIGN_COURIER = "/assign",
    REGISTER_COURIER = "regcourier"
}
