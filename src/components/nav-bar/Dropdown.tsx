export function Dropdown() {
    return (
        <div className="lg:absolute bg-white right-0 rounded-md p-2">
            <ul className="space-y-2  lg:w-max">
                <li>
                    <a 
                        href="#"
                        className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                    >
                        Create a Shipment
                    </a>
                </li>
                <li>
                    <a 
                        href="#"
                        className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                    >
                        Schedule a Collection
                    </a>
                </li>
                <li>
                    <a 
                        href="#"
                        className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                    >
                        How To Ship a Parcel
                    </a>
                </li>
                <li>
                    <a 
                        href="#"
                        className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                    >
                        Calculate Shipping Cost
                    </a>
                </li>
                <li>
                    <a 
                        href="#"
                        className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                    >
                        Find a Location
                    </a>
                </li>
            </ul>
        </div>
    )
}