import { useLocation } from "react-router-dom";
import { ClipBoardIcon } from "../components/icons/black-white-icons/ClipBoardIcon";
import { BoxIcon } from "../components/icons/black-white-icons/BoxIcon";
import { TickIcon } from "../components/icons/black-white-icons/TickIcon";
import { TruckIcon } from "../components/icons/black-white-icons/TruckIcon";
import { HouseIcon } from "../components/icons/black-white-icons/HouseIcon";

export function OrderStatusPage() {
    const { state } = useLocation();
    console.log("[REDIRECT - from TrackSearchBarPage] Response: ", state);


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
                                    <li className="mb-10 ms-6">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                           <HouseIcon /> 
                                        </span>
                                        <h4 className="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">Estimated delivery in 30 Nov 2023</h4>
                                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered Order</p>
                                    </li>

                                    <li className="mb-10 ms-6">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                            <TruckIcon />
                                        </span>
                                        <h4 className="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">Today</h4>
                                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivering order</p>
                                    </li>

                                    <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500 text-gray-400">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                            <TickIcon />
                                        </span>
                                        <h4 className="mb-0.5 font-semibold">24 Nov 2023, 15:15</h4>
                                        <p className="text-sm">Ready for delivery</p>
                                    </li>

                                    <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500 text-gray-400">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                            <TickIcon />
                                        </span>
                                        <h4 className="mb-0.5 font-semibold">23 Nov 2023, 15:15</h4>
                                        <p className="text-sm">Sorting order</p>
                                    </li>

                                    <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500 text-gray-400">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                            <TickIcon />
                                        </span>
                                        <h4 className="mb-0.5 text-base font-semibold">22 Nov 2023, 12:27</h4>
                                        <p className="text-sm">Picked up order</p>
                                    </li>

                                    <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500 text-gray-400">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                            <BoxIcon />
                                        </span>
                                        <h4 className="mb-0.5 font-semibold">19 Nov 2023, 10:47</h4>
                                        <p className="text-sm">Processing order</p>
                                    </li>

                                    <li className="ms-6 text-primary-700 dark:text-primary-500 text-gray-400">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                            <ClipBoardIcon />
                                        </span>
                                        <h4 className="mb-0.5 font-semibold">19 Nov 2023, 10:45</h4>
                                        <a href="#" className="text-sm font-medium hover:underline">Order created</a>
                                    </li>
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