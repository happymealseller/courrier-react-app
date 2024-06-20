export {AuthenticationEndpoint, 
    CustomerEndpoint, 
    CourierEndpoint,
    PathParams};

enum PathParams {
ORDER_ID = "{orderId}"
}

enum AuthenticationEndpoint {
REGISTER = "/register",
LOGIN = "/login"
}

enum CustomerEndpoint {
NEW_ORDER = "/orders/create-order",
UPDATE_ORDER = `/customer/${PathParams.ORDER_ID}`,
TRACK_ORDER = `/track/${PathParams.ORDER_ID}`
}


enum CourierEndpoint {
TRIPS = "/courier/trips"
}