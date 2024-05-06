import { DropdownItemData } from "../../utilities/type-aliases/DropdownProps"

export type NavBarItemWithDropdownData = {
    title: string,
    dropdownData: DropdownItemData[],
    onClick: () => void,
    isDropdownOpen: boolean,
}

export type NavBarItemWithDropdownProps = {
    navBarItems: NavBarItemWithDropdownData[]
}