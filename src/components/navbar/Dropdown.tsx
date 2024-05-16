import { NavLink } from "react-router-dom"
import { DropdownProps } from "../../utilities/type-aliases/navbar/DropdownProps"
import "../../css/Navbar.css"
export function Dropdown({ dropdownItems }: DropdownProps) {
    return (
        <ul className="dropdown space-y-2 lg:w-max lg:absolute bg-white right-0 rounded-md p-2">
            {dropdownItems.map(dropdownItem => {
                return (
                    <li key={dropdownItem.title} className="dropdown-item">
                        <NavLink 
                            to={dropdownItem.navLink}
                            className="flex p-2 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-black"
                        >
                            {dropdownItem.title}
                        </NavLink>
                    </li>
                )})
            }
        </ul>
    )
}