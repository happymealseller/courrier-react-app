import { NavLink } from "react-router-dom"
import { DropdownProps } from "../../utilities/type-aliases/navbar/DropdownProps"

export function Dropdown({ dropdownItems }: DropdownProps) {
    return (
        <div className="lg:absolute bg-white right-0 rounded-md p-2">
            <ul className="space-y-2  lg:w-max">
                {dropdownItems.map(dropdownItem => {
                    return (
                        <li key={dropdownItem.title}>
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
        </div>
    )
}