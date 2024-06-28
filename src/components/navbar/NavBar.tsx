import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { DropdownItemData } from "../../utilities/type-aliases/navbar/DropdownProps";
import { NavBarItemWithoutDropdown } from "./NavBarItemWithoutDropdown";
import { NavBarItemWithDropdownData } from "../../utilities/type-aliases/navbar/NavBarItemWithDropdownProps";
import { NavBarItemWithDropdown } from "./NavBarItemWithDropdown";
import { HamburgerMenu } from "./HamburgerMenu";
import "../../css/Navbar.css";
import { useSelector } from "react-redux";
import { RootState } from "../../App";
import { AccountType } from "../../utilities/enums/AccountType";

export function NavBar() {
  const isLoggedIn = useSelector(
    (state: RootState) => state.authentication.isLoggedIn
  );
  const role = useSelector((state: RootState) => state.authentication.role);

  useEffect(() => {
    if (isLoggedIn && role === AccountType.Customer) {
      setShippingData(() => [
        ...initialShippingData,
        { title: "Create a Shipment", navLink: "create-a-shipment" },
      ]);
    } else {
      setShippingData(initialShippingData);
    }
  }, [isLoggedIn]);

  const initialShippingData: DropdownItemData[] = [
    // { title: "Schedule a Collection", navLink: "schedule-a-collection" },
    // { title: "How To Ship a Parcel", navLink: "how-to-ship-a-parcel" },
    // { title: "Collections and Drop-Offs", navLink: "collections-and-drop-offs"},
    // { title: "Find a Location", navLink: "find-a-location" },
    { title: "Calculate Shipping Cost", navLink: "calculate-shipping-cost" },
  ];

  const dashboardLink =
    role === AccountType.Customer
      ? "dashboard/customer"
      : role === AccountType.Courier
      ? "dashboard/courier"
      : "dashboard/admin";

  const [shippingData, setShippingData] =
    useState<DropdownItemData[]>(initialShippingData);

  const trackingData: DropdownItemData[] = [
    { title: "Track a Package", navLink: "track-a-package" },
    // {title: "Change a Delivery", navLink: "change-a-delivery"},
  ];

  const [isNavbarOpen, setIsNavbarOpen] = useState(true);

  const toggleOpenNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const [isShippingDropdownOpen, setIsShippingDropdownOpen] = useState(false);

  const handleMouseEnterShippingDropdown = () => {
    setIsShippingDropdownOpen(true);
  };

  const handleMouseLeaveShippingDropdown = () => {
    setIsShippingDropdownOpen(false);
  };

  const [isTrackingDropdownOpen, setIsTrackingDropdownOpen] = useState(false);

  const handleMouseEnterTrackingDropdown = () => {
    setIsTrackingDropdownOpen(true);
  };

  const handleMouseLeaveTrackingDropdown = () => {
    setIsTrackingDropdownOpen(false);
  };

  // const [isSolutionDropdownOpen, setIsSolutionDropdownOpen] = useState(false);

  // const handleMouseEnterSolutionDropdown = () => {
  //     setIsSolutionDropdownOpen(true);
  // }

  // const handleMouseLeaveSolutionDropdown = () => {
  //     setIsSolutionDropdownOpen(false);
  // }

  // const [isSupportDropdownOpen, setIsSupportDropdownOpen] = useState(false);

  // const handleMouseEnterSupportDropdown = () => {
  //     setIsSupportDropdownOpen(true);
  // }

  // const handleMouseLeaveSupportDropdown = () => {
  //     setIsSupportDropdownOpen(false);
  // }

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
    // {
    //     title: "Support",
    //     dropdownData: supportData,
    //     onMouseEnter: handleMouseEnterSupportDropdown,
    //     onMouseLeave: handleMouseLeaveSupportDropdown,
    //     isDropdownOpen: isSupportDropdownOpen,
    // },
  ];

  return (
    <>
      <nav className="navbar bg-slate-500">
        <div className="container px-4 flex flex-wrap py-2 lg:space-x-4">
          <Logo />
          <HamburgerMenu toggleOpenNavbar={toggleOpenNavbar} />
          {isNavbarOpen && (
            <div
              className={`w-full lg:inline-flex lg:w-auto my-2 ${
                !isNavbarOpen ? "hidden" : ""
              }`}
            >
              <ul className="nav-list w-full lg:w-auto flex flex-col lg:flex-row space-x-2 space-y-2 lg:space-y-0">
                {
                  <NavBarItemWithDropdown
                    navBarItems={navBarItemsWithDropdown}
                  />
                }
                {!isLoggedIn ? (
                  <>
                    <NavBarItemWithoutDropdown
                      navBarItems={[
                        {
                          title: "Register an Account",
                          navLink: "open-an-account",
                        },
                      ]}
                    />
                    <NavBarItemWithoutDropdown
                      navBarItems={[{ title: "Login", navLink: "login" }]}
                    />
                  </>
                ) : (
                  <>
                    <NavBarItemWithoutDropdown
                      navBarItems={[
                        { title: "Dashboard", navLink: dashboardLink },
                      ]}
                    />
                    {role === AccountType.Admin && (
                      <NavBarItemWithoutDropdown
                        navBarItems={[
                          {
                            title: "Register Courier Account",
                            navLink: "regcourier",
                          },
                        ]}
                      />
                    )}
                    <NavBarItemWithoutDropdown
                      navBarItems={[{ title: "Logout", navLink: "logout" }]}
                    />
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
