import { statusProperty } from "../../utilities/interfaces/statusProperty";

export {sampleStatuses};

const sampleStatuses: statusProperty[] = JSON.parse(`[
    {"status": "AWAITING_PAYMENT", "remarks": "", "statusUpdateDate": "2024-04-28T04:00:22.769+00:00"},
    {"status": "ORDER_CREATED", "remarks": "", "statusUpdateDate": "2024-05-01T04:00:22.769+00:00"},
    {"status": "PROCESSING", "remarks": "", "statusUpdateDate": "2024-05-10T05:50:22.769+00:00"},
    {"status": "PICKED_UP", "remarks": "some remark", "statusUpdateDate": "2024-05-11T06:15:22.769+00:00"},
    {"status": "SORTING", "remarks": "some remark", "statusUpdateDate": "2024-05-12T07:20:22.769+00:00"},
    {"status": "READY_FOR_DELIVERY", "remarks": "some remark", "statusUpdateDate": "2024-05-13T08:25:22.769+00:00"},
    {"status": "DELIVERING", "remarks": "some remark", "statusUpdateDate": "2024-05-14T09:44:22.769+00:00"},
    {"status": "DELIVERED", "remarks": "some remark", "statusUpdateDate": "2024-05-15T10:40:22.769+00:00"},
    {"status": "CANCELLED", "remarks": "some remark", "statusUpdateDate": "2024-05-16T11:10:22.769+00:00"},
    {"status": "OTHER", "remarks": "Some kind of remark for other category Some kind of remark for other category Some kind of remark for other category Some kind of remark for other category", "statusUpdateDate": "2024-05-17T04:12:22.769+00:00"}
]`);