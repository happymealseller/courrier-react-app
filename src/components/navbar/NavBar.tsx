import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../App";
import { AccountType } from "../../utilities/enums/AccountType";
import { DropdownProps, DropdownItemData } from "../../utilities/type-aliases/navbar/DropdownProps";
import { NavBarItemWithDropdownData, NavBarItemWithDropdownProps } from "../../utilities/type-aliases/navbar/NavBarItemWithDropdownProps";
import { NavBarItemWithoutDropdownProps } from "../../utilities/type-aliases/navbar/NavBarItemWithoutDropdownProps";
import "../../css/Navbar.css";

// Dropdown Component
function Dropdown({ dropdownItems }: DropdownProps) {
    return (
        <ul className="dropdown space-y-2 lg:w-max lg:absolute bg-white right-0 rounded-md p-2">
            {dropdownItems.map(({ title, navLink }) => (
                <li key={title} className="dropdown-item">
                    <NavLink
                        to={navLink}
                        className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                    >
                        {title}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}

// HamburgerMenu Component
function HamburgerMenu({ toggleOpenNavbar }: { toggleOpenNavbar: () => void }) {
    return (
        <button
            className="inline-flex items-center justify-center text-white border h-10 w-10 ml-auto rounded-md outline-none focus:outline-none lg:hidden"
            onClick={toggleOpenNavbar}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>
    );
}

// Logo Component
function Logo() {
    return (
        <NavLink
            to="/"
            className="inline-flex p-2 text-white text-2xl font-bold uppercase tracking-widest items-center"
        >
            FDM Express
        </NavLink>
    );
}

// NavBarItemWithDropdown Component
function NavBarItemWithDropdown({ navBarItems }: NavBarItemWithDropdownProps) {
    return (
        navBarItems.map(({ title, onMouseEnter, onMouseLeave, isDropdownOpen, dropdownData }) => (
            <li key={title}
                className="nav-item relative"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <button
                    type="button"
                    className="flex outline-none focus:outline-none px-4 py-2 rounded-md font-medium text-white hover:bg-slate-800"
                >
                    {title}
                </button>
                {isDropdownOpen && <Dropdown dropdownItems={dropdownData} />}
            </li>
        ))
    );
}

// NavBarItemWithoutDropdown Component
function NavBarItemWithoutDropdown({ navBarItems }: NavBarItemWithoutDropdownProps) {
    return (
        <>
            {navBarItems.map(({ title, navLink }) => (
                <li key={title} className="nav-item relative">
                    <NavLink
                        to={navLink}
                        className="flex outline-none focus:outline-none px-4 py-2 rounded-md font-medium text-white hover:bg-slate-800"
                    >
                        {title}
                    </NavLink>
                </li>
            ))}
        </>
    );
}

// NavBar Component
export function NavBar() {
    const isLoggedIn = useSelector((state: RootState) => state.authentication.isLoggedIn);
    const role = useSelector((state: RootState) => state.authentication.role);

    const initialShippingData: DropdownItemData[] = [
        { title: "Schedule a Collection", navLink: "schedule-a-collection" },
        { title: "How To Ship a Parcel", navLink: "how-to-ship-a-parcel" },
        { title: "Calculate Shipping Cost", navLink: "calculate-shipping-cost" },
        { title: "Find a Location", navLink: "find-a-location" },
    ];

    const [shippingData, setShippingData] = useState<DropdownItemData[]>(initialShippingData);

    useEffect(() => {
        if (isLoggedIn && role === AccountType.Customer) {
            setShippingData((prevShippingData) => [
                ...prevShippingData,
                { title: "Create a Shipment", navLink: "create-a-shipment" },
            ]);
        } else {
            setShippingData(initialShippingData);
        }
    }, [isLoggedIn, role]);

    const trackingData: DropdownItemData[] = [
        { title: "Track a Package", navLink: "track-a-package" },
        { title: "Change a Delivery", navLink: "change-a-delivery" },
    ];

    const solutionsData: DropdownItemData[] = [
        { title: "Open an Account", navLink: "open-an-account" },
        { title: "Collections and Drop-Offs", navLink: "collections-and-drop-offs" },
    ];

    const supportData: DropdownItemData[] = [
        { title: "Shipping Support", navLink: "shipping-support" },
        { title: "Tracking Support", navLink: "tracking-support" },
        { title: "Contact Us", navLink: "contact-us" },
    ];

    const [isNavbarOpen, setIsNavbarOpen] = useState(true);
    const toggleOpenNavbar = () => setIsNavbarOpen(!isNavbarOpen);

    const [dropdownStates, setDropdownStates] = useState({
        shipping: false,
        tracking: false,
        solutions: false,
        support: false,
    });

    const handleMouseEnter = (dropdown: string) => {
        setDropdownStates((prevState) => ({ ...prevState, [dropdown]: true }));
    };

    const handleMouseLeave = (dropdown: string) => {
        setDropdownStates((prevState) => ({ ...prevState, [dropdown]: false }));
    };

    const navBarItemsWithDropdown: NavBarItemWithDropdownData[] = [
        {
            title: "Shipping",
            dropdownData: shippingData,
            onMouseEnter: () => handleMouseEnter("shipping"),
            onMouseLeave: () => handleMouseLeave("shipping"),
            isDropdownOpen: dropdownStates.shipping,
        },
        {
            title: "Tracking",
            dropdownData: trackingData,
            onMouseEnter: () => handleMouseEnter("tracking"),
            onMouseLeave: () => handleMouseLeave("tracking"),
            isDropdownOpen: dropdownStates.tracking,
        },
        {
            title: "Business Solutions",
            dropdownData: solutionsData,
            onMouseEnter: () => handleMouseEnter("solutions"),
            onMouseLeave: () => handleMouseLeave("solutions"),
            isDropdownOpen: dropdownStates.solutions,
        },
        {
            title: "Support",
            dropdownData: supportData,
            onMouseEnter: () => handleMouseEnter("support"),
            onMouseLeave: () => handleMouseLeave("support"),
            isDropdownOpen: dropdownStates.support,
        },
    ];

    return (
        <nav className="h-[10svh] bg-slate-500">
            <div className="container px-4 flex flex-wrap py-2 lg:space-x-4">
                <Logo />
                <HamburgerMenu toggleOpenNavbar={toggleOpenNavbar} />
                {isNavbarOpen && (
                    <div className={`w-full lg:inline-flex lg:w-auto my-2 ${!isNavbarOpen ? 'hidden' : ''}`}>
                        <ul className="nav-list w-full lg:w-auto flex flex-col lg:flex-row space-x-2 space-y-2 lg:space-y-0">
                            <NavBarItemWithoutDropdown navBarItems={[{ title: "About FDMx", navLink: "about" }]} />
                            <NavBarItemWithDropdown navBarItems={navBarItemsWithDropdown} />
                            <NavBarItemWithoutDropdown navBarItems={[{ title: isLoggedIn ? "Logout" : "Login", navLink: isLoggedIn ? "logout" : "login" }]} />
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}
