import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { DropdownItemData } from "../../utilities/type-aliases/navbar/DropdownProps";
import { NavBarItemWithoutDropdown } from "./NavBarItemWithoutDropdown";
import { NavBarItemWithDropdownData } from "../../utilities/type-aliases/navbar/NavBarItemWithDropdownProps";
import { NavBarItemWithDropdown } from "./NavBarItemWithDropdown";
import { HamburgerMenu } from "./HamburgerMenu";
import "../../css/Navbar.css"

type NavBarProps = {
    isCourier: boolean,
    isSender: boolean
}

export function NavBar({ isCourier, isSender}: NavBarProps) {
    const [isLogout, setIsLogout] = useState(true);

    useEffect(() => {
            setIsLogout(!isCourier && !isSender);
    }, [isCourier, isSender])

    const initialShippingData: DropdownItemData[] = [
        { title: "Schedule a Collection", navLink: "schedule-a-collection" },
        { title: "How To Ship a Parcel", navLink: "how-to-ship-a-parcel" },
        { title: "Calculate Shipping Cost", navLink: "calculate-shipping-cost" },
        { title: "Find a Location", navLink: "find-a-location" },
    ];

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

    const [shippingData, setShippingData] = useState<DropdownItemData[]>(initialShippingData);

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwt");
        if (isSender && jwtToken) {
            console.log(jwtToken)
            setShippingData((prevShippingData) => [
                ...prevShippingData,
                { title: "Create a Shipment", navLink: "create-a-shipment" },
            ]);
            console.log("create shipment added")
        }
        
    }, [isSender]);
    
    const [isNavbarOpen, setIsNavbarOpen] = useState(true);
    
    const toggleOpenNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    }

    const [isShippingDropdownOpen, setIsShippingDropdownOpen] = useState(false);

    const handleMouseEnterShippingDropdown = () => {
        setIsShippingDropdownOpen(true);
    }

    const handleMouseLeaveShippingDropdown = () => {
        setIsShippingDropdownOpen(false);
    }

    const [isTrackingDropdownOpen, setIsTrackingDropdownOpen] = useState(false);

    const handleMouseEnterTrackingDropdown = () => {
        setIsTrackingDropdownOpen(true);
    }

    const handleMouseLeaveTrackingDropdown = () => {
        setIsTrackingDropdownOpen(false);
    }

    const [isSolutionDropdownOpen, setIsSolutionDropdownOpen] = useState(false);

    const handleMouseEnterSolutionDropdown = () => {
        setIsSolutionDropdownOpen(true);
    }

    const handleMouseLeaveSolutionDropdown = () => {
        setIsSolutionDropdownOpen(false);
    }

    const [isSupportDropdownOpen, setIsSupportDropdownOpen] = useState(false);

    const handleMouseEnterSupportDropdown = () => {
        setIsSupportDropdownOpen(true);
    }

    const handleMouseLeaveSupportDropdown = () => {
        setIsSupportDropdownOpen(false);
    }

    const navBarItemsWithDropdown: NavBarItemWithDropdownData[] = [
        {
            title: "Shipping",
            dropdownData: shippingData,
            onMouseEnter: handleMouseEnterShippingDropdown,
            onMouseLeave: handleMouseLeaveShippingDropdown,
            isDropdownOpen: isShippingDropdownOpen,
        },
        {
            title: "Tracking",
            dropdownData: trackingData,
            onMouseEnter: handleMouseEnterTrackingDropdown,
            onMouseLeave: handleMouseLeaveTrackingDropdown,
            isDropdownOpen: isTrackingDropdownOpen,
        },
        {
            title: "Business Solutions",
            dropdownData: solutionsData,
            onMouseEnter: handleMouseEnterSolutionDropdown,
            onMouseLeave: handleMouseLeaveSolutionDropdown,
            isDropdownOpen: isSolutionDropdownOpen,
        },
        {
            title: "Support",
            dropdownData: supportData,
            onMouseEnter: handleMouseEnterSupportDropdown,
            onMouseLeave: handleMouseLeaveSupportDropdown,
            isDropdownOpen: isSupportDropdownOpen,
        },
    ]

    return (
        <>
            <nav className="navbar bg-slate-500">
                <div className="container px-4 flex flex-wrap py-2 lg:space-x-4">
                    <Logo />
                    <HamburgerMenu toggleOpenNavbar={toggleOpenNavbar}/>
                    { isNavbarOpen && (
                        <div className={`w-full lg:inline-flex lg:w-auto my-2 ${!isNavbarOpen ? 'hidden' : ''}`}>
                            <ul className="nav-list w-full lg:w-auto flex flex-col lg:flex-row space-x-2 space-y-2 lg:space-y-0">
                                {<NavBarItemWithoutDropdown navBarItems={[{title: "About FDMx", navLink: "about"}]}/>}
                                {<NavBarItemWithDropdown navBarItems={navBarItemsWithDropdown} />}
                                {isLogout ? (
                                    <NavBarItemWithoutDropdown navBarItems={[{title: "Login", navLink: "login"}]}/>
                                ) : (
                                    <NavBarItemWithoutDropdown navBarItems={[{title: "Logout", navLink: "/"}]}/>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </>
    )
}