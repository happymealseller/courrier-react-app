import { useLocation } from "react-router-dom";
import { ClipBoardIcon } from "../components/icons/black-white-icons/ClipBoardIcon";
import { BoxIcon } from "../components/icons/black-white-icons/BoxIcon";
import { TickIcon } from "../components/icons/black-white-icons/TickIcon";
import { TruckIcon } from "../components/icons/black-white-icons/TruckIcon";
import { HouseIcon } from "../components/icons/black-white-icons/HouseIcon";
import { OrderStatusType } from "../utilities/enums/OrderStatusType";
import { LetterXIcon } from "../components/icons/black-white-icons/LetterXIcon";
import { InformationIcon } from "../components/icons/black-white-icons/InformationIcon";

export { OrderStatusPage };

interface statusProperty {
    status: string,
    remarks: string,
    statusUpdateDate: string
}

const StatusComponentsMap = new Map([
    [OrderStatusType.OrderCreated, ClipBoardIcon],
    [OrderStatusType.Processing, BoxIcon],
    [OrderStatusType.PickedUp, TickIcon],
    [OrderStatusType.Sorting, TickIcon],
    [OrderStatusType.ReadyForDelivery, TickIcon],
    [OrderStatusType.Delivering, TruckIcon],
    [OrderStatusType.Delivered, HouseIcon],
    [OrderStatusType.Cancelled, LetterXIcon],
    [OrderStatusType.Other, InformationIcon]
]);

const sampleStatuses = JSON.parse(`[
    {"status": "ORDER_CREATED", "remarks": "Order created", "statusUpdateDate": "2024-05-01T04:00:22.769+00:00"},
    {"status": "PROCESSING", "remarks": "Processing order", "statusUpdateDate": "2024-05-10T05:50:22.769+00:00"},
    {"status": "PICKED_UP", "remarks": "Picked up order", "statusUpdateDate": "2024-05-11T06:15:22.769+00:00"},
    {"status": "SORTING", "remarks": "Sorting order", "statusUpdateDate": "2024-05-12T07:20:22.769+00:00"},
    {"status": "READY_FOR_DELIVERY", "remarks": "Ready for delivery", "statusUpdateDate": "2024-05-13T08:25:22.769+00:00"},
    {"status": "DELIVERING", "remarks": "Delivering order", "statusUpdateDate": "2024-05-14T09:44:22.769+00:00"},
    {"status": "DELIVERED", "remarks": "Delivered order", "statusUpdateDate": "2024-05-15T10:40:22.769+00:00"},
    {"status": "CANCELLED", "remarks": "Cancelled order", "statusUpdateDate": "2024-05-16T11:10:22.769+00:00"},
    {"status": "OTHER", "remarks": "Some kind of remark for other category", "statusUpdateDate": "2024-05-17T04:12:22.769+00:00"}
]`);
sampleStatuses.reverse();

function formatTimestamp(timestamp: string, includeTime: boolean) {
    return includeTime ? (new Date(timestamp)).toLocaleString('default', { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "numeric", hourCycle: "h24" })
        .replace(/AM|PM/, "")
        :
        (new Date(timestamp)).toLocaleString('default', { day: "numeric", month: "short", year: "numeric" });
}

function OrderStatusPage() {
    const { state } = useLocation();
    console.log("[REDIRECT - from TrackSearchBarPage] Response data: ", state);
    const statusesArray = state.orderStatus.reverse();

    //delivery date
    //order date

    //from address
    //from fullname
    //from email
    //from phoneNo

    //to address
    //to fullname
    //to email
    //to phoneNo

    //parcel info
    //W x H x L
    //weight
    //parcel descp

    return (
        <>
            <section className="bg-white py-8 px-10 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">Track the delivery of order #{state.orderId}</h2>

                    <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
                        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Order Details</h3>

                            </div>
                            <div className="flow-root">
                                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <li className="py-3 sm:py-4" key={1}>
                                        <div className="flex items-center">
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {`Expected Arrival Date: ${formatTimestamp(state.deliveryDate, false)}`}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {`Order date: ${formatTimestamp(state.orderDate, false)}`}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4" key={2}>
                                        <div className="flex items-center ">
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {`From:`}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {``}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4" key={3}>
                                        <div className="flex items-center">
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Michael Gough
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    email@windster.com
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4" key={4}>
                                        <div className="flex items-center ">
                                            <div className="flex-shrink-0">
                                                <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-4.jpg" alt="Lana image" />
                                            </div>
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Lana Byrd
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    email@windster.com
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="pt-3 pb-0 sm:pt-4" key={5}>
                                        <div className="flex items-center ">
                                            <div className="flex-shrink-0">
                                                <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Thomas image" />
                                            </div>
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Thomes Lean
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    email@windster.com
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>


                        <div className="mt-6 grow sm:mt-8 lg:mt-0">
                            <div className="space-y-6 rounded-lg border pb-0 border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Order history</h3>

                                <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700">

                                    // have to change sampleStatuses to statusesArray for the .map method and comparison of length
                                    {sampleStatuses.map((element: statusProperty, index: number) => {
                                        const isMostRecentTask = (sampleStatuses.length === 1) ? true : (index === 0);
                                        const listItemClass: string = isMostRecentTask ? "text-gray-900" : "text-gray-400";
                                        const formattedDatetime = formatTimestamp(element.statusUpdateDate, true);

                                        const Component = StatusComponentsMap.get(OrderStatusType.valueOf(element.status));
                                        if (!Component) return (<><p>{`Invalid status ${element.status}`}</p></>);

                                        return (<>
                                            <li className={`mb-10 ms-6 text-primary-700 dark:text-primary-500 ${listItemClass}`} key={index}>
                                                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                                    <Component />
                                                </span>
                                                <h4 className={`mb-0.5 text-base font-semibold ${listItemClass} dark:text-white`}>{formattedDatetime}</h4>
                                                <p className={`text-sm font-normal ${listItemClass} dark:text-gray-400`}>{element.remarks}</p>
                                            </li>
                                        </>);
                                    })}

                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}