import { useState } from "react";
import { NavLink } from "react-router-dom";
import { DropdownItemData } from "../../utilities/type-aliases/DropdownProps";
import { NavBarItemWithoutDropdown } from "./NavBarItemWithoutDropdown";
import { NavBarItemWithDropdownData } from "../../utilities/type-aliases/NavBarItemWithDropdownProps";
import { NavBarItemWithDropdown } from "./NavBarItemWithDropdown";

export function NavBar() {

    const shippingData: DropdownItemData[] = [
        {title: "Create a Shipment", navLink: "create-a-shipment"},
        {title: "Schedule a Collection", navLink: "schedule-a-collection"},
        {title: "How To Ship a Parcel", navLink: "how-to-ship-a-parcel"},
        {title: "Calculate Shipping Cost", navLink: "calculate-shipping-cost"},
        {title: "Find a Location", navLink: "find-a-location"},
    ]

    const trackingData: DropdownItemData[] = [
        {title: "Track a Package", navLink: "track-a-package"},
        {title: "Change a Delivery", navLink: "change-a-delivery"},
    ]

    const solutionsData: DropdownItemData[] = [
        {title: "Open an Account", navLink: "open-an-account"},
        {title: "Collections and Drop-Offs", navLink: "collections-and-drop-offs"},
    ]

    const supportData: DropdownItemData[] = [
        {title: "Shipping Support", navLink: "shipping-support"},
        {title: "Tracking Support", navLink: "tracking-support"},
        {title: "Contact Us", navLink: "contact-us"},
    ]

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

    const navBarItemsWithDropdown: NavBarItemWithDropdownData[] = [
        {
            title: "Shipping",
            dropdownData: shippingData,
            onClick: toggleOpenShippingDropdown,
            isDropdownOpen: isShippingDropdownOpen,
        },
        {
            title: "Tracking",
            dropdownData: trackingData,
            onClick: toggleOpenTrackingDropdown,
            isDropdownOpen: isTrackingDropdownOpen,
        },
        {
            title: "Business Solutions",
            dropdownData: solutionsData,
            onClick: toggleOpenSolutionDropdown,
            isDropdownOpen: isSolutionDropdownOpen,
        },
        {
            title: "Support",
            dropdownData: supportData,
            onClick: toggleOpenSupportDropdown,
            isDropdownOpen: isSupportDropdownOpen,
        },
    ]

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
                                {<NavBarItemWithoutDropdown navBarItems={[{title: "About FDMx", navLink: "about"}]}/>}
                                {<NavBarItemWithDropdown navBarItems={navBarItemsWithDropdown} />}
                                {<NavBarItemWithoutDropdown navBarItems={[{title: "Login", navLink: "login"}]}/>}
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </>
    )
}