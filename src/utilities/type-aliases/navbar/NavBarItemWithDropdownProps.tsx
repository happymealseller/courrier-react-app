import { DropdownItemData } from "./DropdownProps"

export type NavBarItemWithDropdownData = {
    title: string,
    dropdownData: DropdownItemData[],
    onClick: () => void,
    isDropdownOpen: boolean,
}

export type NavBarItemWithDropdownProps = {
    navBarItems: NavBarItemWithDropdownData[]
}