import { DropdownItemData } from "./DropdownProps"

export type NavBarItemWithDropdownData = {
    title: string,
    dropdownData: DropdownItemData[],
    onMouseEnter: () => void,
    onMouseLeave: () => void,
    isDropdownOpen: boolean,
}

export type NavBarItemWithDropdownProps = {
    navBarItems: NavBarItemWithDropdownData[]
}