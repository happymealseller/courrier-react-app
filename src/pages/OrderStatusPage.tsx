import { useLocation } from "react-router-dom";
import { ClipBoardIcon } from "../components/icons/black-white-icons/ClipBoardIcon";
import { BoxIcon } from "../components/icons/black-white-icons/BoxIcon";
import { TickIcon } from "../components/icons/black-white-icons/TickIcon";
import { TruckIcon } from "../components/icons/black-white-icons/TruckIcon";
import { HouseIcon } from "../components/icons/black-white-icons/HouseIcon";
import { OrderStatusType } from "../utilities/enums/OrderStatusType";
import { ReactNode } from "react";
import { LetterXIcon } from "../components/icons/black-white-icons/LetterXIcon";
import { InformationIcon } from "../components/icons/black-white-icons/InformationIcon";

export { OrderStatusPage };

interface taskProps {
    timestamp: string,
    remarks: string,
    taskCompleted: boolean
}

interface statusProperty {
    status: string,
    remarks: string,
    statusUpdateDate: string
}

const StatusComponentsMap = new Map([
    [OrderStatusType.OrderCreated.toString(), ClipBoardIcon],
    [OrderStatusType.Processing.toString(), BoxIcon],
    [OrderStatusType.PickedUp.toString(), TickIcon],
    [OrderStatusType.Sorting.toString(), TickIcon],
    [OrderStatusType.ReadyForDelivery.toString(), TickIcon],
    [OrderStatusType.Delivering.toString(), TruckIcon],
    [OrderStatusType.Delivered.toString(), HouseIcon],
    [OrderStatusType.Cancelled.toString(), LetterXIcon],
    [OrderStatusType.Other.toString(), InformationIcon]
]);

// different statuses of a given order
function OrderCreated(props: taskProps) {
    const listItemClass: string = props.taskCompleted ? "text-gray-400" : "";
    return (<>
        {/* <li className={`mb-10 ms-6 text-primary-700 dark:text-primary-500 ${listItemClass}`}>
            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800"> */}
                <ClipBoardIcon />
            {/* </span>
            <h4 className="mb-0.5 font-semibold">{props.timestamp}</h4>
            <p className="text-sm">{props.remarks}</p> */}
        {/* </li> */}
    </>);
}

function Processing(props: taskProps) {
    const listItemClass: string = props.taskCompleted ? "text-gray-400" : "";
    return (<>
        {/* <li className={`mb-10 ms-6 text-primary-700 dark:text-primary-500 ${listItemClass}`}>
            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800"> */}
                <BoxIcon />
            {/* </span>
            <h4 className="mb-0.5 font-semibold">{props.timestamp}</h4>
            <p className="text-sm">{props.remarks}</p>
        </li> */}
    </>)
}

function PickedUp(props: taskProps) {
    const listItemClass: string = props.taskCompleted ? "text-gray-400" : "";
    return (<>
        {/* <li className={`mb-10 ms-6 text-primary-700 dark:text-primary-500 ${listItemClass}`}> */}
            {/* <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800"> */}
                <TickIcon />
            {/* </span>
            <h4 className="mb-0.5 text-base font-semibold">{props.timestamp}</h4>
            <p className="text-sm">{props.remarks}</p> */}
        {/* </li> */}
    </>)
}



function Sorting(props: taskProps) {

}

const sampleStatuses = JSON.parse(`[
    {"status": "ORDER_CREATED", "remarks": "Order created", "statusUpdateDate": "2024-05-01T04:00:22.769+00:00"},
    {"status": "PROCESSING", "remarks": "Processing order", "statusUpdateDate": "2024-05-24T05:50:22.769+00:00"},
    {"status": "PICKED_UP", "remarks": "Picked up order", "statusUpdateDate": "2024-05-24T06:15:22.769+00:00"},
    {"status": "SORTING", "remarks": "Sorting order", "statusUpdateDate": "2024-05-24T07:20:22.769+00:00"},
    {"status": "READY_FOR_DELIVERY", "remarks": "Ready for delivery", "statusUpdateDate": "2024-05-24T08:25:22.769+00:00"},
    {"status": "DELIVERING", "remarks": "Delivering order", "statusUpdateDate": "2024-05-24T09:44:22.769+00:00"},
    {"status": "DELIVERED", "remarks": "Delivered order", "statusUpdateDate": "2024-05-24T10:40:22.769+00:00"},
    {"status": "CANCELLED", "remarks": "Cancelled order", "statusUpdateDate": "2024-05-24T11:10:22.769+00:00"},
    {"status": "OTHER", "remarks": "Some kind of remark for other category", "statusUpdateDate": "2024-05-24T04:12:22.769+00:00"}
]`);
sampleStatuses.reverse();



function OrderStatusPage() {
    const { state } = useLocation();
    console.log("[REDIRECT - from TrackSearchBarPage] Response data: ", state);
    const statusesArray = state.orderStatus.reverse();


    const testDate = new Date(state.orderStatus[0].statusUpdateDate);
    const formattedDate = testDate.toLocaleString('default', { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "numeric" });
    console.log(`formatted date: ${formattedDate}`);

    // text-gray-400 for greying out completed items
    // use size-5 for svg className
    // <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700"> is used for the vertical line, 
    //      the border is inlined to display a visible line
    return (
        <>
            <section className="bg-white py-8 px-10 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Track the delivery of order #{state.orderId}</h2>

                    <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
                        <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
                            <div className="space-y-4 p-6">
                                <div className="flex items-center gap-6">
                                    <a href="#" className="h-14 w-14 shrink-0">
                                        <img className="h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                                        <img className="hidden h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                                    </a>

                                    <a href="#" className="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"> PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, macOS Sonoma, Blue, Keyboard layout INT </a>
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400"><span className="font-medium text-gray-900 dark:text-white">Product ID:</span> BJ8364850</p>

                                    <div className="flex items-center justify-end gap-4">
                                        <p className="text-base font-normal text-gray-900 dark:text-white">x1</p>

                                        <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">$1,499</p>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="mt-6 grow sm:mt-8 lg:mt-0">
                            <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Order history</h3>

                                <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700">

                                    // have to change sampleStatuses to statusesArray for the .map method and comparison of length
                                    {sampleStatuses.map((element: statusProperty, index: number) => {
                                        console.log(`status: ${element.status}, remarks: ${element.remarks}, statusUpdateDate: ${element.statusUpdateDate}`);
                                        const isMostRecentTask = (sampleStatuses.length === 1)? true : (index === 0);
                                        const listItemClass: string = isMostRecentTask ? "text-gray-900" : "text-gray-400";

                                        const Component = StatusComponentsMap.get(element.status);
                                        if (!Component) return (<><p>{`Invalid status ${element.status}`}</p></>);

                                        return (<>
                                            <li className={`mb-10 ms-6 text-primary-700 dark:text-primary-500 ${listItemClass}`} >
                                                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                                    <Component />
                                                </span>
                                                <h4 className={`mb-0.5 text-base font-semibold ${listItemClass} dark:text-white`}>{element.statusUpdateDate}</h4>
                                                <p className={`text-sm font-normal ${listItemClass} dark:text-gray-400`}>{element.remarks}</p>
                                            </li>
                                        </>);
                                    })}

                                </ol>

                                <div className="gap-4 sm:flex sm:items-center">
                                    <button type="button" className="w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Cancel the order</button>

                                    <a href="#" className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0">Order details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}