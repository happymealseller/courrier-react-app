import { useLocation } from "react-router-dom";
import { ClipBoardIcon } from "../components/icons/black-white-icons/ClipBoardIcon";
import { BoxIcon } from "../components/icons/black-white-icons/BoxIcon";
import { TickIcon } from "../components/icons/black-white-icons/TickIcon";
import { TruckIcon } from "../components/icons/black-white-icons/TruckIcon";
import { HouseIcon } from "../components/icons/black-white-icons/HouseIcon";
import { OrderStatusType } from "../utilities/enums/OrderStatusType";
import { LetterXIcon } from "../components/icons/black-white-icons/LetterXIcon";
import { InformationIcon } from "../components/icons/black-white-icons/InformationIcon";
import { DollarSignIcon } from "../components/icons/black-white-icons/DollarSignIcon";

export { OrderStatusPage };

interface statusProperty {
    status: string,
    remarks: string,
    statusUpdateDate: string
}

const statusComponentsRecord: Record<OrderStatusType, () => JSX.Element> = {
    [OrderStatusType.AwaitingPayment]: DollarSignIcon,
    [OrderStatusType.OrderCreated]: ClipBoardIcon,
    [OrderStatusType.Processing]: BoxIcon,
    [OrderStatusType.PickedUp]: TickIcon,
    [OrderStatusType.Sorting]: TickIcon,
    [OrderStatusType.ReadyForDelivery]: TickIcon,
    [OrderStatusType.Delivering]: TruckIcon,
    [OrderStatusType.Delivered]: HouseIcon,
    [OrderStatusType.Cancelled]: LetterXIcon,
    [OrderStatusType.Other]: InformationIcon
};

const hiddenUIStatuses = [
    OrderStatusType.Sorting
];


let sampleStatuses = JSON.parse(`[
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
sampleStatuses.reverse();
sampleStatuses = removeUIStatuses(sampleStatuses, hiddenUIStatuses);

function formatTimestamp(timestamp: string, includeTime: boolean) {
    return includeTime ? (new Date(timestamp)).toLocaleString('default', { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "numeric", hourCycle: "h24" })
        .replace(/AM|PM/, "")
        :
        (new Date(timestamp)).toLocaleString('default', { day: "numeric", month: "short", year: "numeric" });
}

function removeUIStatuses(statuses: statusProperty[], statusesToRemove: string[]) {
    return statuses.filter((statusProperty) =>
        !statusesToRemove.some((status) => statusProperty.status === status))
}

function OrderStatusPage() {
    const { state } = useLocation();
    console.log("[REDIRECT - from TrackSearchBarPage] Response data: ", state);
    const statusesArray = removeUIStatuses(state.orderStatus.reverse(), hiddenUIStatuses);

    return (
        <>
            <section className="bg-white py-8 px-10 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-min px-4 2xl:px-0">
                    <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">Track the delivery of order #{state.orderId}</h2>

                    <div className="mt-6 sm:mt-8 lg:flex lg:gap-8 min-w-full">
                        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Order Details</h3>
                            </div>
                            <div className="flow-root">
                                <ul role="list" className="divide-y min-w-full divide-gray-200 dark:divide-gray-700">
                                    <li className="py-3 sm:py-4" key={state.deliveryDate}>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                                                {`Expected Arrival Date: ${formatTimestamp(state.deliveryDate, false)}`}
                                            </p>
                                            <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                                                {`Order date: ${formatTimestamp(state.orderDate, false)}`}
                                            </p>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4" key={state.fromAddress.id}>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-base font-semibold whitespace-pre-line text-gray-900 dark:text-white">
                                                {`From:`}
                                            </p>
                                            <p className="text-sm font-medium whitespace-pre-line text-gray-500 dark:text-gray-400">
                                                {`Address:\n
                                                           ${state.fromAddress.address}                                                       
                                                           ${state.fromAddress.city}, ${state.fromAddress.country}
                                                           ${state.fromAddress.postalCode}
                                                           \n`}
                                                {`Name: ${state.fromFullName}\n`}
                                                {`Email: ${state.fromEmail}\n`}
                                                {`Phone: ${state.fromPhoneNo}\n`}
                                            </p>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4" key={state.toAddress.id}>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-base font-semibold text-gray-900 dark:text-white">
                                                {`To:`}
                                            </p>
                                            <p className="text-sm font-medium break-words whitespace-pre-line text-gray-500 dark:text-gray-400">
                                                {`Address:\n
                                                           ${state.toAddress.address}                                                       
                                                           ${state.toAddress.city}, ${state.toAddress.country}
                                                           ${state.toAddress.postalCode}
                                                           \n`}
                                                {`Name: ${state.toFullName}\n`}
                                                {`Email: ${state.toEmail}\n`}
                                                {`Phone: ${state.toPhoneNo}\n`}
                                            </p>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4" key={state.weight}>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                                                Parcel Information:
                                            </p>
                                            <p className="text-sm font-medium min-w-full text-nowrap whitespace-pre-line text-gray-500 dark:text-gray-400">
                                                {`Dimensions (W x L x H): ${state.width}cm x ${state.length}cm x ${state.height}cm \n`}
                                                {`Weight (KG): ${state.weight}\n`}
                                                {`Description: ${state.parcelDescription}\n`}
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>


                        <div className="mt-6 grow sm:mt-8 lg:mt-0">
                            <div className="space-y-6 rounded-lg border pb-0 border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Order history</h3>

                                <ol className="relative ms-3 border-s min-w-72 max-w-min border-gray-200 dark:border-gray-700">

                                    {statusesArray.map((element: statusProperty, index: number) => {
                                        const isMostRecentTask = (statusesArray.length === 1) ? true : (index === 0);
                                        const listItemClass: string = isMostRecentTask ? "text-gray-900" : "text-gray-400";
                                        const formattedDatetime = formatTimestamp(element.statusUpdateDate, true);
                                        const orderStatus = OrderStatusType.valueOf(element.status);

                                        const Component = statusComponentsRecord[orderStatus];

                                        return (<>
                                            <li className={`mb-10 ms-6 text-primary-700 dark:text-primary-500 ${listItemClass}`} key={`${element.status}-${element.statusUpdateDate}`}>
                                                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                                    <Component />
                                                </span>
                                                <h4 className={`mb-0.5 text-base font-semibold whitespace-pre-line ${listItemClass} dark:text-white`}>{`${formattedDatetime}\n${OrderStatusType.statusDescriptionRecord[orderStatus]}`}</h4>
                                                <p className={`text-sm font-normal whitespace-pre-line ${listItemClass} dark:text-gray-400`}>{`${element.remarks}`}</p>
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