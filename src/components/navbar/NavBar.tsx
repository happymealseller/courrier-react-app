import { useState } from "react";
import { NavLink } from "react-router-dom";

export function NavBar() {

    const [isNavbarOpen, setIsNavbarOpen] = useState(true);
    
    const toggleOpenNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    }

    const [isShippingDropdownOpen, setIsShippingDropdownOpen] = useState(false);

    const toggleOpenShippingDropdown = () => {
        setIsShippingDropdownOpen(!isShippingDropdownOpen);
    }

    const [isTrackingDropdownOpen, setIsTrackingDropdownOpen] = useState(false);

    const toggleOpenTrackingDropdown = () => {
        setIsTrackingDropdownOpen(!isTrackingDropdownOpen);
    }

    const [isSolutionDropdownOpen, setIsSolutionDropdownOpen] = useState(false);

    const toggleOpenSolutionDropdown = () => {
        setIsSolutionDropdownOpen(!isSolutionDropdownOpen);
    }

    const [isSupportDropdownOpen, setIsSupportDropdownOpen] = useState(false);

    const toggleOpenSupportDropdown = () => {
        setIsSupportDropdownOpen(!isSupportDropdownOpen);
    }

    return (
        <>
            <nav className="bg-slate-500">
                <div className="container px-4 flex flex-wrap mx-auto py-2 lg:space-x-4">
                    <NavLink 
                        to="/"
                        className="inline-flex p-2 text-white text-2xl font-bold uppercase tracking-widest"
                    >
                        FDM Express
                    </NavLink>
                    <button 
                        className="inline-flex items-center justify-center text-white border h-10 w-10 ml-auto rounded-md outline-none focus:outline-none lg:hidden"
                        onClick={toggleOpenNavbar}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    { isNavbarOpen && (
                        <div className={`w-full lg:inline-flex lg:w-auto lg:mt-0 my-2 ${!isNavbarOpen ? 'hidden' : ''}`}>
                            <ul className="w-full lg:w-auto flex flex-col lg:flex-row space-x-2 space-y-2 lg:space-y-0">
                                <li>
                                    <NavLink 
                                        to="about" 
                                        className="flex outline-none focus:outline-none px-4 py-2 rounded-md font-medium text-white hover:bg-slate-800 ml-2">
                                            About FDMx
                                    </NavLink>
                                </li>
                                <li className="relative">
                                    <button 
                                        type="button"
                                        className="flex outline-none focus:outline-none px-4 py-2 rounded-md font-medium text-white hover:bg-slate-800"
                                        onClick={toggleOpenShippingDropdown}
                                    >
                                            Shipping
                                    </button>
                                    { isShippingDropdownOpen && (
                                        <div className="lg:absolute bg-white right-0 rounded-md p-2">
                                            <ul className="space-y-2  lg:w-max">
                                                <li>
                                                    <NavLink 
                                                        to="create-a-shipment"
                                                        className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                                                    >
                                                        Create a Shipment
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink 
                                                        to="schedule-a-collection"
                                                        className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                                                    >
                                                        Schedule a Collection
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink 
                                                        to="how-to-ship-a-parcel"
                                                        className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                                                    >
                                                        How To Ship a Parcel
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink 
                                                        to="calculate-shipping-cost"
                                                        className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                                                    >
                                                        Calculate Shipping Cost
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink 
                                                        to="find-a-location"
                                                        className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                                                    >
                                                        Find a Location
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                                <li className="relative">
                                    <button 
                                        type="button" 
                                        className="flex outline-none focus:outline-none px-4 py-2 rounded-md font-medium text-white hover:bg-slate-800"
                                        onClick={toggleOpenTrackingDropdown}
                                    >
                                            Tracking
                                    </button>
                                    { isTrackingDropdownOpen && (
                                        <div className="lg:absolute bg-white right-0 rounded-md p-2">
                                            <ul className="space-y-2  lg:w-max">
                                                <li>
                                                    <NavLink 
                                                        to="track-a-package"
                                                        className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                                                    >
                                                        Track a Package
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink 
                                                        to="change-a-delivery"
                                                        className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                                                    >
                                                        Change a Delivery
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                                <li className="relative">
                                    <button
                                        type="button"
                                        className="flex outline-none focus:outline-none px-4 py-2 rounded-md font-medium text-white hover:bg-slate-800"
                                        onClick={toggleOpenSolutionDropdown}
                                    >
                                            Business Solutions
                                    </button>
                                    { isSolutionDropdownOpen && (
                                        <div className="lg:absolute bg-white right-0 rounded-md p-2">
                                            <ul className="space-y-2  lg:w-max">
                                                <li>
                                                    <NavLink 
                                                        to="open-an-account"
                                                        className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                                                    >
                                                        Open an Account
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink 
                                                        to="collections-and-drop-offs"
                                                        className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                                                    >
                                                        Collections and Drop-Offs
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                                <li className="relative">
                                    <button 
                                        type="button" 
                                        className="flex outline-none focus:outline-none px-4 py-2 rounded-md font-medium text-white hover:bg-slate-800"
                                        onClick={toggleOpenSupportDropdown}
                                    >
                                            Support
                                    </button>
                                    { isSupportDropdownOpen && (
                                        <div className="lg:absolute bg-white right-0 rounded-md p-2">
                                            <ul className="space-y-2  lg:w-max">
                                                <li>
                                                    <NavLink 
                                                        to="shipping-support"
                                                        className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                                                    >
                                                        Shipping Support
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink 
                                                        to="tracking-support"
                                                        className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                                                    >
                                                        Tracking Support
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink 
                                                        to="contact-us"
                                                        className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                                                    >
                                                        Contact Us
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                    
                                </li>
                                <li className="relative">
                                    <NavLink
                                        to="login"
                                        className="flex outline-none focus:outline-none px-4 py-2 rounded-md font-medium text-white hover:bg-slate-800"
                                    >
                                            Login
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </>
    )
}